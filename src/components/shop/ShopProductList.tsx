import { useEffect, useState } from "react"
import { apiService } from "../../lib/api.ts";
import { formatNumber, getCartItemsCount, handleErrorToast, shortenText } from "../../utils/helpers.ts";
import { toast } from "react-toastify";
import "./ShopProductList.css";
import { useCart } from "../../utils/hooks.ts";

export default function ShopProductList() {
    const [data, setData] = useState<ProductListResponse[]>([]);
    const cartContext = useCart();

    const isItemIncart = (productId: number) => {
        const cartItems = cartContext.cart?.items;
        return cartItems?.some(i => i.productId === productId);
    }

    useEffect(() => {
        apiService.viewProductList().then(res => {
            setData(res.data);
        }).catch(err => {
            handleErrorToast(err, toast);
        })
    }, []);

    const handleAddToCart = (productId: number) => {
        const cartId = localStorage.getItem("cartId");
        const payload = cartId ? { productId, cartId } : { productId };
        apiService.addItemToCart(payload).then(res => {
            toast.success("added to cart successfully");
            localStorage.setItem("cartId", res.data.uuid);
            cartContext.setCart(res.data);
            cartContext.setCount(getCartItemsCount(res.data.items));
        }).catch(err => {
            console.log(err)
            handleErrorToast(err, toast);
        })
    }

    const handleRemoveFromCart = (productId: number) => {
        const cart = cartContext.cart!;
        apiService.removeItemFromCart({productId, cartId: cart.uuid}).then(res => {
            toast.success("item removed cart successfully");
            cartContext.setCart(res.data);
            cartContext.setCount(getCartItemsCount(res.data.items));
        }).catch(err => {
            console.log(err)
            handleErrorToast(err, toast);
        })
    }

    return <div className="shop-product-list">
        <ul>
            {data.map(product => (
                <li key={product.id}>
                    <div>
                        <img onClick={() => alert(`Product ${product.id} info`)} src={product.images[0].fileUrl} alt={product.name} />
                        <p>{shortenText(product.name, 50)}</p>
                        <p>{formatNumber(product.price)}</p>
                    </div>
                    <div className="buttons">
                        {
                            isItemIncart(product.id)
                            ? <><button onClick={() => handleAddToCart(product.id)}>+</button>100<button onClick={() => handleRemoveFromCart(product.id)}>-</button></>
                            : <button style={{width: "100px"}} onClick={() => handleAddToCart(product.id)}>Add to cart</button>
                        }
                    </div>
                </li>
            ))}
        </ul>
    </div>
}

type ProductListResponse = {
    id: number;
    name: string;
    description: string;
    images: { fileUrl: string }[];
    price: number;
    soldCount: number;
    stock: number;
}

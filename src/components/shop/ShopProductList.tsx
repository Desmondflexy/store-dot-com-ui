import { useEffect, useState } from "react"
import { apiService } from "../../lib/api.service.ts";
import { formatNumber, handleErrorToast, shortenText } from "../../utils/helpers.ts";
import { toast } from "react-toastify";
import "./ShopProductList.css";
import CartButton from "./CartButton.tsx";
import { useCart } from "../../hooks/cart.hook.ts";
import { useCartActions } from "../../hooks/cart-actions.hook.ts";

export default function ShopProductList() {
    const [data, setData] = useState<ProductResponse[]>([]);
    const cartContext = useCart();
    const cartActions = useCartActions();

    useEffect(() => {
        apiService.viewProductList().then(res => {
            setData(res.data);
        }).catch(err => {
            handleErrorToast(err, toast);
        })
    }, []);

    const cart = cartContext.cart;

    const isItemIncart = (productId: number) => {
        if (!cart) return false;
        return cart.items.some(i => i.productId === productId);
    }

    const getItemQty = (productId: number) => {
        if (!cart) return 0;
        const item = cart.items.find(i => i.productId === productId);
        return item ? item.quantity : 0;
    }

    return <div className="shop-product-list">
        <ul>
            {data.map(product => (
                <li key={product.id}>
                    <div>
                        <img onClick={() => alert(`Product ${product.id} info`)} src={product.images[0].fileUrl} alt={product.name} />
                        <p>{shortenText(product.name, 50)}</p>
                        <p>{formatNumber(product.price, 0)}</p>
                    </div>
                    <div className="buttons">
                        {
                            isItemIncart(product.id)
                                ? <CartButton qty={getItemQty(product.id)} onIncrease={() => cartActions.add(product.id)} onDecrease={() => cartActions.remove(product.id)} />
                                : <button style={{ width: "100px" }} onClick={() => cartActions.add(product.id)}>Add to cart</button>
                        }
                    </div>
                </li>
            ))}
        </ul>
    </div>
}

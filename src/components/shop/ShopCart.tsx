import { Link, useNavigate } from "react-router-dom";
import { formatNumber, getCartItemsCount, getCartTotal } from "../../utils/helpers";
import CartButton from "./CartButton";
import "./ShopCart.css";
import { ROUTES_PATH } from "../../utils/routes";
import { useCartActions } from "../../hooks/cart-actions.hook";
import { toast } from "react-toastify";
import { useAuth } from "../../hooks/auth.hook";

export default function ShopCart() {
    const { cart, user } = useAuth();
    const { add, remove} = useCartActions();
    const navigate = useNavigate();

    if (!cart) return <div className="shop-cart">
        <p>Empty cart! <Link to={ROUTES_PATH.SHOP_PRODUCTS}>Go to shop</Link></p>
    </div>

    const itemsCount = getCartItemsCount(cart.items);
    const cartTotal = formatNumber(getCartTotal(cart.items), 0);

    const handleCheckout = () => {
        if (user) {
            navigate(ROUTES_PATH.CHECKOUT);
        } else {
            toast.dark("Pls login to continue");
            navigate(ROUTES_PATH.LOGIN);
        }
    }

    return <div className="shop-cart">
        <h2>Shopping Cart</h2>

        <table>
            <thead>
                <tr>
                    <th>S/N</th>
                    <th>Image</th>
                    <th>Item</th>
                    <th>Unit Price</th>
                    <th>Qty</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
                {
                    cart.items.map((item, sn) => (
                        <tr key={item.id}>
                            <td>{sn + 1}</td>
                            <td><img width={100} src={item.image} alt={item.name} /></td>
                            <td>{item.name}</td>
                            <td>{formatNumber(item.unitPrice, 0)}</td>
                            <td className="buttons">
                                <CartButton
                                    qty={item.quantity}
                                    onIncrease={() => add(item.productId)}
                                    onDecrease={() => remove(item.productId)}
                                />
                            </td>
                            <td>{formatNumber(item.quantity * item.unitPrice, 0)}</td>
                        </tr>
                    ))
                }
            </tbody>
            <tfoot>
                <tr>
                    <th colSpan={4}>Total</th>
                    <td>{itemsCount}</td>
                    <td>{cartTotal}</td>
                </tr>
            </tfoot>
        </table>
        <div>
            <button onClick={handleCheckout}>Checkout</button>
            <button onClick={() => navigate(ROUTES_PATH.SHOP)}>Continue shopping</button>
        </div>
    </div>
}
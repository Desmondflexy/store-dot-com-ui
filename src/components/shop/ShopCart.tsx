import { useNavigate } from "react-router-dom";
import { formatNumber, getCartItemsCount, getCartTotal } from "../../utils/helpers";
import { useCart, useCartActions } from "../../utils/hooks";
import CartButton from "./CartButton";
import "./ShopCart.css";
import { ROUTES_PATH } from "../../utils/constants";
import { apiService } from "../../lib/api.ts";

export default function ShopCart() {
    const cartContext = useCart();
    const cartActions = useCartActions();
    const navigate = useNavigate();

    const cart = cartContext.cart;
    console.log(cart)
    if (!cart) return <p>Empty cart!</p>

    const itemsCount = getCartItemsCount(cart.items);
    const cartTotal = formatNumber(getCartTotal(cart.items), 0);

    const handleCheckout = () => {
        apiService.authMe().then(res => {
            console.log("to be implemented");
        }).catch(err => {
            navigate(ROUTES_PATH.LOGIN);
            console.log(456)
            console.log(err.response)
        })
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
                                    onIncrease={() => cartActions.add(item.productId)}
                                    onDecrease={() => cartActions.remove(item.productId)}
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
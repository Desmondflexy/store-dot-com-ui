import { formatNumber, getCartItemsCount, getCartTotal } from "../../utils/helpers";
import { useCart, useCartActions } from "../../utils/hooks";
import CartButton from "./CartButton";
import "./ShopCart.css";

export default function ShopCart() {
    const cartContext = useCart();
    const cartActions = useCartActions();

    const cart = cartContext.cart;
    if (!cart) return <p>Empty cart!</p>

    const itemsCount = getCartItemsCount(cart.items);
    const cartTotal = formatNumber(getCartTotal(cart.items), 0)

    return <div className="shop-cart">
        <h2>Shopping Cart</h2>

        <table>
            <tr>
                <th>S/N</th>
                <th>Image</th>
                <th>Item</th>
                <th>Unit Price</th>
                <th>Qty</th>
                <th>Total</th>
            </tr>
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
            <tr>
                <td colSpan={4}>Total</td>
                <td>{itemsCount}</td>
                <td>{cartTotal}</td>
            </tr>
        </table>
        <div>
            <button>Checkout</button>
        </div>
    </div>
}
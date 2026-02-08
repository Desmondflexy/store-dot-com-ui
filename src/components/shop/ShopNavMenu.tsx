import "./ShopNavMenu.css";
import { useCart } from "../../utils/hooks";

export default function ShopNavMenu() {
    const cartContext = useCart();
    return <ul className="shop-nav-menu">
        <li>Menu 1</li>
        <li>Menu 2</li>
        <li>Cart ({cartContext.count})</li>
    </ul>
}
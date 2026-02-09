import "./ShopNavMenu.css";
import { useCart } from "../../utils/hooks";
import { NavLink } from "react-router-dom";
import { ROUTES_PATH } from "../../utils/constants";

export default function ShopNavMenu() {
    const cartContext = useCart();
    return <ul className="shop-nav-menu">
        <li>
            <NavLink to={ROUTES_PATH.HOME}>Shop</NavLink>
        </li>
        <li>
            <NavLink to={ROUTES_PATH.SHOPPING_CART}>Cart ({cartContext.count})</NavLink>
        </li>
    </ul>
}
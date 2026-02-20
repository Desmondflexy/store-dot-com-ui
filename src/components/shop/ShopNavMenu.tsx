import "./ShopNavMenu.css";
import { NavLink } from "react-router-dom";
import { ROUTES_PATH } from "../../utils/constants";
import Logout from "../auth/Logout";
import { useCart } from "../../hooks/cart.hook";
import { useUser } from "../../hooks/user.hook";

export default function ShopNavMenu() {
    const cartContext = useCart();
    const userContext = useUser();

    return <ul className="shop-nav-menu">
        <li>
            <NavLink to={ROUTES_PATH.HOME}>Shop</NavLink>
        </li>
        <li>
            <NavLink to={ROUTES_PATH.SHOPPING_CART}>Cart ({cartContext.count})</NavLink>
        </li>
        <li>
            {userContext.user
                ? <><NavLink to={ROUTES_PATH.PROFILE}>{userContext.user.firstName}</NavLink> <Logout/></>
                : <><NavLink to={ROUTES_PATH.LOGIN}>Login</NavLink> | <NavLink to={ROUTES_PATH.SIGNUP}>Register</NavLink></>
            }
        </li>
    </ul>
}
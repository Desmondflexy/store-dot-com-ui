import "./ShopNavMenu.css";
import { NavLink } from "react-router-dom";
import { ROUTES_PATH } from "../../utils/routes";
import Logout from "../auth/Logout";
import { useAuth } from "../../hooks/auth.hook";

export default function ShopNavMenu() {
    const { count, user } = useAuth();

    return <ul className="shop-nav-menu">
        <li>
            <NavLink to={ROUTES_PATH.HOME}>Shop</NavLink>
        </li>
        <li>
            <NavLink to={ROUTES_PATH.SHOPPING_CART}>Cart ({count})</NavLink>
        </li>
        <li>
            {user
                ? <><NavLink to={ROUTES_PATH.PROFILE}>{user.firstName}</NavLink> <Logout /></>
                : <><NavLink to={ROUTES_PATH.LOGIN}>Login</NavLink> | <NavLink to={ROUTES_PATH.SIGNUP}>Register</NavLink></>
            }
        </li>
    </ul>
}
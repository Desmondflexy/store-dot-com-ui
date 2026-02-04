import { NavLink } from "react-router-dom";
import { ROUTES_PATH } from "../../utils/constants";
import "./AdminNavMenu.css";

export default function AdminNavMenu() {
    return <ul className="admin-nav-menu">
        <li>
            <NavLink to={ROUTES_PATH.ADMIN_DASHBOARD}>Dashboard</NavLink>
        </li>
        <li>
            <NavLink to={ROUTES_PATH.ADMIN_INVENTORY}>Inventory</NavLink>
        </li>
        <li>
            <NavLink to={ROUTES_PATH.ADMIN_ADD_PRODUCT}>Add Product</NavLink>
        </li>
        <li>
            <NavLink to={ROUTES_PATH.LOGOUT}>Logout</NavLink>
        </li>
    </ul>
}
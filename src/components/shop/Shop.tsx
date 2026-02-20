import { Outlet } from "react-router-dom";
import ShopNavMenu from "./ShopNavMenu";

export default function Shop() {
    return <div>
        <ShopNavMenu />
        <Outlet />
    </div>
}

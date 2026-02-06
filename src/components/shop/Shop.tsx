import { Navigate, Route, Routes } from "react-router-dom";
import { getRoutePath } from "../../utils/helpers";
import { ROUTES_PATH } from "../../utils/constants";
import ShopProductList from "./ShopProductList";

export default function Shop() {
    return <div>
        <Outlet />
    </div>
}

function Outlet() {
    return (
        <Routes>
            <Route index element={<Navigate to={getRoutePath(ROUTES_PATH.SHOP_PRODUCTS)} />} />
            <Route path={getRoutePath(ROUTES_PATH.SHOP_PRODUCTS)} element={<ShopProductList />} />

            <Route path='*' element={<h1>Page not found!</h1>} />
        </Routes>
    );
}
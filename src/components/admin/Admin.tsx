import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { getRoutePath } from "../../utils/helpers";
import { ROUTES_PATH } from "../../utils/constants";
import AdminDashboard from "./AdminDashboard";
import { useEffect } from "react";
import AdminLogout from "./AdminLogout";
import AddProductForm from "./AddProductForm";
import AdminViewProductList from "./AdminViewProductList";
import AdminNavMenu from "./AdminNavMenu";
import AdminProductInfo from "./AdminProductInfo";

export function Admin() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    useEffect(() => {
        if (!token) navigate(ROUTES_PATH.ADMIN_LOGIN);
    }, [navigate, token])


    return <div>
        <AdminNavMenu />
        <Outlet />
    </div>
}

function Outlet() {
    return (
        <Routes>
            <Route index element={<Navigate to={getRoutePath(ROUTES_PATH.ADMIN_DASHBOARD)} />} />
            <Route path={getRoutePath(ROUTES_PATH.ADMIN_DASHBOARD)} element={<AdminDashboard />} />
            <Route path={getRoutePath(ROUTES_PATH.LOGOUT)} element={<AdminLogout />} />
            <Route path={getRoutePath(ROUTES_PATH.ADMIN_ADD_PRODUCT)} element={<AddProductForm />} />
            <Route path={getRoutePath(ROUTES_PATH.ADMIN_INVENTORY)} element={<AdminViewProductList />} />
            <Route path={getRoutePath(ROUTES_PATH.ADMIN_PRODUCT_DETAILS)} element={<AdminProductInfo />} />

            <Route path='*' element={<h1>Page not found!</h1>} />
        </Routes>
    );
}
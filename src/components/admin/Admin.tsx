import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { getRoutePath, handleErrorToast } from "../../utils/helpers";
import { ROUTES_PATH } from "../../utils/constants";
import AdminDashboard from "./AdminDashboard";
import { useEffect, useState } from "react";
import AdminLogout from "./AdminLogout";
import AddProductForm from "./AddProductForm";
import AdminViewProductList from "./AdminViewProductList";
import AdminNavMenu from "./AdminNavMenu";
import AdminProductInfo from "./AdminProductInfo";
import { apiService } from "../../lib/api.ts";
import { toast } from "react-toastify";

export function Admin() {
    const [state, setState] = useState<"loading" | "success" | "error">("loading");
    const navigate = useNavigate();

    useEffect(() => {
        apiService.authAdminMe().then(() => {
            setState("success");
        }).catch(err => {
            if (err.status === 401) {
                navigate(ROUTES_PATH.ADMIN_LOGIN)
            } else if (err.status === 403) {
                navigate(ROUTES_PATH.HOME);
            } else {
                handleErrorToast(err, toast);
            }
        });
    }, [navigate]);

    if (state === "loading") return <p>Loading...</p>

    return <div>
        <AdminNavMenu />
        <Routes>
            <Route index element={<Navigate to={getRoutePath(ROUTES_PATH.ADMIN_DASHBOARD)} />} />
            <Route path={getRoutePath(ROUTES_PATH.ADMIN_DASHBOARD)} element={<AdminDashboard />} />
            <Route path={getRoutePath(ROUTES_PATH.LOGOUT)} element={<AdminLogout />} />
            <Route path={getRoutePath(ROUTES_PATH.ADMIN_ADD_PRODUCT)} element={<AddProductForm />} />
            <Route path={getRoutePath(ROUTES_PATH.ADMIN_INVENTORY)} element={<AdminViewProductList />} />
            <Route path={getRoutePath(ROUTES_PATH.ADMIN_PRODUCT_DETAILS)} element={<AdminProductInfo />} />

            <Route path='*' element={<h1>Page not found!</h1>} />
        </Routes>
    </div>
}

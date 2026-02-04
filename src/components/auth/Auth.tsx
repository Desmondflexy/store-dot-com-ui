import { Navigate, Route, Routes } from "react-router-dom";
import { getRoutePath } from "../../utils/helpers";
import { ROUTES_PATH } from "../../utils/constants";
import { AdminLogin } from "./AdminLogin";

export function Auth() {
    return <div>
        <Outlet />
    </div>
}

function Outlet() {
    return (
        <Routes>
            <Route index element={<Navigate to={getRoutePath(ROUTES_PATH.ADMIN_LOGIN)} />} />
            <Route path={getRoutePath(ROUTES_PATH.ADMIN_LOGIN)} element={<AdminLogin />} />
            <Route path='*' element={<h1>Page not found!</h1>} />
        </Routes>
    );
}
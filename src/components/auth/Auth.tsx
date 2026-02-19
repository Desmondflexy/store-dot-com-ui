import { Navigate, Route, Routes } from "react-router-dom";
import { getRoutePath } from "../../utils/helpers";
import { ROUTES_PATH } from "../../utils/constants";
import { AdminLogin } from "./AdminLogin";
import { Signup } from "./Signup";
import { Login } from "./Login";

export function Auth() {
    return <div>
        <Routes>
            <Route index element={<Navigate to={getRoutePath(ROUTES_PATH.ADMIN_LOGIN)} />} />
            <Route path={getRoutePath(ROUTES_PATH.ADMIN_LOGIN)} element={<AdminLogin />} />
            <Route path={getRoutePath(ROUTES_PATH.LOGIN)} element={<Login />} />
            <Route path={getRoutePath(ROUTES_PATH.SIGNUP)} element={<Signup />} />
            <Route path='*' element={<h1>Page not found!</h1>} />
        </Routes>
    </div>
}

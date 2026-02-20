import { Outlet, useNavigate } from "react-router-dom";
import { handleErrorToast } from "../../utils/helpers";
import { ROUTES_PATH } from "../../utils/constants";
import { useEffect } from "react";
import AdminNavMenu from "./AdminNavMenu";
import { apiService } from "../../lib/api.service.ts";
import { toast } from "react-toastify";

export function Admin() {
    const navigate = useNavigate();

    useEffect(() => {
        apiService.authAdminMe().then(() => {

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

    return <div>
        <AdminNavMenu />
        <Outlet />
    </div>
}

import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { ROUTES_PATH } from "../../utils/constants";

export default function AdminLogout() {
    const navigate = useNavigate();
    useEffect(() => {
        localStorage.removeItem('token');
        navigate(ROUTES_PATH.ADMIN_LOGIN);
    }, [navigate]);

    return null;
}
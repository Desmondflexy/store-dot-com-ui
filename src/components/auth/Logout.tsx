import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ROUTES_PATH } from "../../utils/routes.ts";
import { useAuth } from "../../hooks/auth.hook.ts";

export default function Logout({ role }: Prop) {
    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
        toast.success("You've been logged out");
        if (role === "admin") {
            navigate(ROUTES_PATH.ADMIN_LOGIN);
        } else {
            navigate(ROUTES_PATH.SHOP_PRODUCTS);
        }
    }

    return <button className="logout-btn" onClick={handleLogout}>Logout</button>
}

type Prop = {
    role: "admin" | "customer";
}
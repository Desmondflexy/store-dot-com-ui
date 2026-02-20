import { toast } from "react-toastify";
import { apiService } from "../../lib/api.service.ts"
import { useNavigate } from "react-router-dom";
import { ROUTES_PATH } from "../../utils/constants.ts";
import { useCart } from "../../hooks/cart.hook.ts";
import { useUser } from "../../hooks/user.hook.ts";

export default function Logout() {
    const navigate = useNavigate();
    const userContext = useUser();
    const cartContext = useCart();
    const handleLogout = () => {
        apiService.logout().then(res => {
            localStorage.removeItem("token");
            localStorage.removeItem("cartId");
            toast.success(res.data.message);
            userContext.setUser(null);
            cartContext.setCart(null);
            cartContext.setCount(0);
            navigate(ROUTES_PATH.SHOP_PRODUCTS);
        });
    }
    return <button className="logout-btn" onClick={handleLogout}>Logout</button>
}
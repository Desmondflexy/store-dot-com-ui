import { useEffect, useState } from "react";
import { apiService } from "../lib/api.service.ts";
import { broadcastLogin, broadcastLogout, getCartItemsCount } from "../utils/helpers.ts";
import { AuthContext } from "../contexts/auth.context.ts";
import { useNavigate } from "react-router-dom";
import { ROUTES_PATH } from "../utils/routes.ts";
import { toast } from "react-toastify";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<UserResponse | null>(null);
    const [cart, setCart] = useState<ICart | null>(null);
    const [count, setCount] = useState(0);
    const navigate = useNavigate();

    const resetState = () => {
        setUser(null);
        setCart(null);
        setCount(0);
    }

    const reloadSession = () => {
        const token = localStorage.getItem("token");
        const guestCartId = localStorage.getItem("cartId");

        if (!token && !guestCartId) {
            resetState();
            return;
        }

        if (token) {
            apiService.getProfile().then(res => {
                setUser(res.data);
                localStorage.removeItem("cartId");
                setCart(res.data.cart);
                setCount(getCartItemsCount(res.data.cart.items));
            }).catch(err => {
                if (err.status === 401) {
                    logout();
                    toast.dark("Session expired, please login again");
                    navigate(ROUTES_PATH.LOGIN);
                    return;
                }
                resetState();
            });
        } else if (guestCartId) {
            apiService.findGuestCart(guestCartId).then(res => {
                setCart(res.data);
                setCount(getCartItemsCount(res.data.items));
                setUser(null);
            }).catch(err => {
                if (err.status === 404) {
                    localStorage.removeItem("cartId");
                }
                resetState()
            });
        }
    };

    const login = (token: string) => {
        localStorage.setItem("token", token);
        localStorage.removeItem("cartId");
        reloadSession();
        broadcastLogin();
    };

    const logout = () => {
        apiService.logout().then().catch();
        localStorage.removeItem("token");
        localStorage.removeItem("cartId");
        resetState();
        broadcastLogout();
    };

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        reloadSession();

        const handleStorage = (event: StorageEvent) => {
            if (event.key === "login-event") {
                reloadSession();
            }

            if (event.key === "logout-event") {
                resetState()
            }
        };

        window.addEventListener("storage", handleStorage);
        return () => window.removeEventListener("storage", handleStorage);
    }, []);

    const providers = {
        user, cart, count,
        login, logout,
        reloadSession,
        setCart, setCount,
    }
    return (
        <AuthContext.Provider value={providers} >
            {children}
        </AuthContext.Provider>
    );
}
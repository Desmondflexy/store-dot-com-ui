import { useEffect, useState } from "react";
import { apiService } from "../lib/api.service.ts";
import { broadcastLogin, broadcastLogout, getCartItemsCount } from "../utils/helpers.ts";
import { AuthContext } from "../contexts/auth.context.ts";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<UserResponse | null>(null);
    const [cart, setCart] = useState<ICart | null>(null);
    const [count, setCount] = useState(0);

    const reloadSession = async () => {
        const token = localStorage.getItem("token");
        const guestCartId = localStorage.getItem("cartId");

        if (!token && !guestCartId) {
            setUser(null);
            setCart(null);
            setCount(0);
            return;
        }

        try {
            if (token) {
                const [profileRes, cartRes] = await Promise.all([
                    apiService.getProfile(),
                    apiService.getMyCart()
                ]);

                setUser(profileRes.data);
                setCart(cartRes.data);
                setCount(getCartItemsCount(cartRes.data.items));

                localStorage.removeItem("cartId");
            }
            else if (guestCartId) {
                const cartRes = await apiService.findGuestCart(guestCartId);
                setCart(cartRes.data);
                setCount(getCartItemsCount(cartRes.data.items));
                setUser(null);
            }
        } catch {
            setUser(null);
            setCart(null);
            setCount(0);
        }
    };

    const login = async (token: string) => {
        localStorage.setItem("token", token);
        await reloadSession();
        broadcastLogin();
    };

    const logout = async () => {
        try {
            await apiService.logout();
        } catch {
            // do nothing
        }

        localStorage.removeItem("token");
        localStorage.removeItem("cartId");

        setUser(null);
        setCart(null);
        setCount(0);

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
                setUser(null);
                setCart(null);
                setCount(0);
            }
        };

        window.addEventListener("storage", handleStorage);
        return () => window.removeEventListener("storage", handleStorage);
    }, []);

    const providerValue = {
        user, cart, count,
        login, logout,
        reloadSession,
        setCart, setCount,
    }
    return (
        <AuthContext.Provider value={providerValue} >
            {children}
        </AuthContext.Provider>
    );
}
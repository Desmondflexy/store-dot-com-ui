import { useEffect, useState } from "react";
import { apiService } from "../lib/api.service.ts";
import { broadcastLogin, broadcastLogout, getCartItemsCount, handleErrorToast, isTokenExpiringSoon } from "../utils/helpers.ts";
import { AuthContext } from "../contexts/auth.context.ts";
import { useNavigate } from "react-router-dom";
import { ROUTES_PATH } from "../utils/routes.ts";
import { toast } from "react-toastify";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<UserResponse | null>(null);
    const [cart, setCart] = useState<ICart | null>(null);
    const [count, setCount] = useState(0);
    const navigate = useNavigate();
    const [isRefreshing, setIsRefreshing] = useState(false);

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
                const cart = res.data.cart;
                setUser(res.data);
                if (guestCartId) {
                    localStorage.removeItem("cartId");
                }
                setCart(cart);
                if (cart) {
                    setCount(getCartItemsCount(cart.items));
                } else {
                    setCount(0);
                }
            }).catch(err => {
                if (err.status === 401) {
                    logout();
                    toast.dark("Session expired, please login again");
                    navigate(ROUTES_PATH.LOGIN);
                    return;
                }
                handleErrorToast(err, toast);
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

    const removeItem = (productId: number) => {
        if (!cart) return;

        const cartUuid = localStorage.getItem("cartId");

        const request = cartUuid
            ? apiService.removeItemFromCart({ productId, cartUuid })
            : apiService.removeItemFromUserCart({ productId });

        request
            .then(res => {
                if (res.data) {
                    const updatedCart = res.data;
                    setCart(updatedCart);
                    setCount(getCartItemsCount(updatedCart.items));
                    toast.success("Item removed successfully");
                } else {
                    setCart(null);
                    setCount(0);
                    toast.success("Last item removed successfully");
                }
            })
            .catch(err => {
                console.error(err)
                handleErrorToast(err, toast);
            });
    };

    const addItem = (productId: number) => {
        const token = localStorage.getItem("token");
        const cartUuid = localStorage.getItem("cartId");

        const payload = cartUuid
            ? { productId, cartUuid }
            : { productId };

        apiService.addItemToCart(payload)
            .then(res => {
                const updatedCart = res.data;

                // Guest cart created for first time
                if (!token && !cartUuid) {
                    localStorage.setItem("cartId", updatedCart.uuid);
                }

                setCart(updatedCart);
                setCount(getCartItemsCount(updatedCart.items));

                toast.success("Added to cart successfully");
            })
            .catch(err => {
                handleErrorToast(err, toast);
            });
    };

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        reloadSession();

        const handleUserActivity = () => {
            const token = localStorage.getItem("token");
            if (!token || isRefreshing) return;

            if (isTokenExpiringSoon(token)) {
                setIsRefreshing(true);
                apiService.getRefreshToken().then(res => {
                    localStorage.setItem("token", res.data.token);
                }).catch(err => {
                    // console.log("error getting refresh token", err.status);
                    if (err.status === 401) {
                        reloadSession();
                    }
                }).finally(() => {
                    setIsRefreshing(false);
                })

            }
        };

        const handleStorage = (event: StorageEvent) => {
            if (event.key === "login-event") {
                reloadSession();
            }

            if (event.key === "logout-event") {
                resetState()
            }
        };

        window.addEventListener("storage", handleStorage);
        window.addEventListener("click", handleUserActivity);
        // window.addEventListener("mousemove", handleUserActivity);
        window.addEventListener("keydown", handleUserActivity);

        return () => {
            window.removeEventListener("storage", handleStorage);
            window.removeEventListener("click", handleUserActivity);
            // window.removeEventListener("mousemove", handleUserActivity);
            window.removeEventListener("keydown", handleUserActivity);
        }

    }, []);

    const providers = {
        user, cart, count,
        login, logout,
        reloadSession,
        setCart, setCount,
        removeItem, addItem,
    }
    return (
        <AuthContext.Provider value={providers} >
            {children}
        </AuthContext.Provider>
    );
}
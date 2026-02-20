import { useEffect, useState } from "react";
import { apiService } from "../lib/api.service.ts";
import { getCartItemsCount, handleErrorToast } from "../utils/helpers.ts";
import { toast } from "react-toastify";
import { useUser } from "../hooks/user.hook.ts";
import { CartContext } from "../contexts/cart.context.ts";

export default function CartProvider({ children }: { children: React.ReactNode }) {
    const [count, setCount] = useState(0);
    const [cart, setCart] = useState<ICart | null>(null)
    const guestCartId = localStorage.getItem("cartId");

    const userContext = useUser();
    useEffect(() => {
        if (userContext.user) {
            apiService.getMyCart().then(res => {
                const itemsCount = getCartItemsCount(res.data.items);
                setCount(itemsCount);
                setCart(res.data);
                localStorage.removeItem("cartId");
            }).catch(err => {
                console.log(err.message)
                handleErrorToast("An error occured", toast);
            })
        } else if (guestCartId) {
            apiService.findGuestCart(guestCartId).then(res => {
                const itemsCount = getCartItemsCount(res.data.items);
                setCount(itemsCount);
                setCart(res.data);
            }).catch(err => {
                if (err.status === 404) {
                    localStorage.removeItem("cartId");
                }
            });
        }
    }, [userContext.user, guestCartId]);

    const providerValue = {
        count, setCount,
        cart, setCart,
    }

    return (
        <CartContext.Provider value={providerValue}>
            {children}
        </CartContext.Provider>
    );
}
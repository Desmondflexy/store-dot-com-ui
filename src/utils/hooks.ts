import { useContext } from "react";
import { CartContext, UserContext } from "./contexts";
import { apiService } from "../lib/api.ts";
import { getCartItemsCount, handleErrorToast } from "./helpers.ts";
import { toast } from "react-toastify";

/**Get authenticated user details and setter function. */
export function useUser() {
    const context = useContext(UserContext);
    if (!context) throw new Error("useUserHook must be used within a UserProvider");
    return context;
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) throw new Error("useCart hook must be used within a CartProvider");
    return context;
}

export function useCartActions() {
    const { cart, setCart, setCount } = useCart();

    const add = (productId: number) => {
        const cartId = localStorage.getItem("cartId");
        const payload = cartId ? { productId, cartId } : { productId };
        apiService.addItemToCart(payload).then(res => {
            toast.success("added to cart successfully");
            localStorage.setItem("cartId", res.data.uuid);
            setCart(res.data);
            setCount(getCartItemsCount(res.data.items));
        }).catch(err => {
            console.log(err)
            handleErrorToast(err, toast);
        })
    };

    const remove = (productId: number) => {
        if (!cart) return;
        const payLoad = {productId, cartId: cart.uuid}
        apiService.removeItemFromCart(payLoad).then(res => {
            setCart(res.data);
            setCount(getCartItemsCount(res.data.items));
            toast.success("Item removed from cart successfully")
        }).catch(err => {
            console.log(err);
            handleErrorToast(err, toast);
        })
    };

    return { add, remove };
}
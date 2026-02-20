import { toast } from "react-toastify";
import { useCart } from "./cart.hook.ts";
import { apiService } from "../lib/api.service.ts";
import { getCartItemsCount, handleErrorToast } from "../utils/helpers.ts";

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
            handleErrorToast(err, toast);
        })
    };

    const remove = (productId: number) => {
        if (!cart) return;
        const payLoad = { productId, cartId: cart.uuid }
        apiService.removeItemFromCart(payLoad).then(res => {
            setCart(res.data);
            setCount(getCartItemsCount(res.data.items));
            toast.success("Item removed from cart successfully")
        }).catch(err => {
            handleErrorToast(err, toast);
        })
    };

    return { add, remove };
}
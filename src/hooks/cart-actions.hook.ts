import { toast } from "react-toastify";
import { apiService } from "../lib/api.service.ts";
import { handleErrorToast } from "../utils/helpers.ts";
import { useAuth } from "./auth.hook.ts";

export function useCartActions() {
    const { cart, reloadSession } = useAuth();

    const add = (productId: number) => {
        const cartUuid = localStorage.getItem("cartId");
        const payload = cartUuid ? { productId, cartUuid } : { productId };
        apiService.addItemToCart(payload).then(res => {
            localStorage.setItem("cartId", res.data.uuid);
            reloadSession();
            toast.success("added to cart successfully");
        }).catch(err => {
            handleErrorToast(err, toast);
        })
    };

    const remove = (productId: number) => {
        if (!cart) return;
        const cartUuid = localStorage.getItem("cartId");

        if (cartUuid) {
            apiService.removeItemFromCart({ productId, cartUuid }).then(() => {
                reloadSession();
                toast.success("Item removed from cart successfully")
            }).catch(err => {
                handleErrorToast(err, toast);
            })
        } else {
            apiService.removeItemFromUserCart({ productId }).then(() => {
                reloadSession();
                toast.success("Item removed from cart successfully")
            }).catch(err => {
                handleErrorToast(err, toast);
            })
        }
    };

    return { add, remove };
}
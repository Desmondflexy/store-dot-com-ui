import { useEffect, useState } from "react";
import { CartContext } from "../utils/contexts";
import { apiService } from "../lib/api.ts";
import { getCartItemsCount } from "../utils/helpers.ts";

export default function CartProvider(props: Props) {
    const [count, setCount] = useState(0);
    const [cart, setCart] = useState<CartResponse | null>(null)
    const cartId = localStorage.getItem("cartId");
    useEffect(() => {
        if (cartId) {
            apiService.getCartByUuid(cartId).then(res => {
                const itemsCount = getCartItemsCount(res.data.items);
                setCount(itemsCount);
                setCart(res.data);
            }).catch((err) => {
                setCount(0);
                console.log(err);
            });
        }
    }, [cartId]);

    const providerValue = {
        count, setCount,
        cart, setCart,
    }

    return (
        <CartContext.Provider value={providerValue}>
            {props.children}
        </CartContext.Provider>
    );
}

type Props = {
    children: React.ReactNode;
}
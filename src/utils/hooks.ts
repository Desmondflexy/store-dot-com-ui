import { useContext } from "react";
import { CartContext, UserContext } from "./contexts";

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
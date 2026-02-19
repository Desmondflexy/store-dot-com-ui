import { createContext } from "react";

// add more contexts here

export const UserContext = createContext<UserContextType | null>(null);

export const CartContext = createContext<CartContextType | null>(null)

type CartContextType = {
    count: number;
    setCount: React.Dispatch<React.SetStateAction<number>>;
    cart: CartResponse | null;
    setCart: React.Dispatch<React.SetStateAction<CartResponse | null>>;
}

type UserContextType = {
    user: UserResponse | null;
    setUser: React.Dispatch<React.SetStateAction<UserResponse | null>>;
}
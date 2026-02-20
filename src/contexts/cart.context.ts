import { createContext } from "react";

export const CartContext = createContext<CartContextType | null>(null)

type CartContextType = {
    count: number;
    setCount: React.Dispatch<React.SetStateAction<number>>;
    cart: ICart | null;
    setCart: React.Dispatch<React.SetStateAction<ICart | null>>;
}
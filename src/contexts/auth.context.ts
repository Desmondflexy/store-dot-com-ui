import { createContext } from "react";

export const AuthContext = createContext<AuthContextType | null>(null)

type AuthContextType = {
    user: UserResponse | null;
    cart: ICart | null;
    count: number;
    login: (token: string) => Promise<void>;
    logout: () => Promise<void>;
    setCount: React.Dispatch<React.SetStateAction<number>>;
    setCart: React.Dispatch<React.SetStateAction<ICart | null>>;
}
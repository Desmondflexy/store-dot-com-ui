import { createContext } from "react";

export const UserContext = createContext<UserContextType | null>(null);

type UserContextType = {
    user: UserResponse | null;
    setUser: React.Dispatch<React.SetStateAction<UserResponse | null>>;
}
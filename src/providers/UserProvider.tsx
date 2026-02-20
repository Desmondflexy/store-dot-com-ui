import { useEffect, useState } from "react";
import { apiService } from "../lib/api.service.ts";
import { UserContext } from "../contexts/user.context.ts";

export default function UserProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<UserResponse | null>(null);
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (token) {
            apiService.getProfile().then(res => {
                setUser(res.data);
            }).catch(err => {
                setUser(null);
                if (err.status === 401) {
                    localStorage.removeItem("token")
                }
            });
        }
    }, [token]);

    const providerValue = {
        user, setUser,
    }

    return (
        <UserContext.Provider value={providerValue}>
            {children}
        </UserContext.Provider>
    );
}
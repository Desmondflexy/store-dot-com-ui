import { useEffect, useState } from "react";
import { UserContext } from "../utils/contexts";
import { apiService } from "../lib/api.ts";

export default function UserProvider(props: Props) {
    const [user, setUser] = useState<UserResponse | null>(null);

    const token = localStorage.getItem("token");
    useEffect(() => {
        apiService.getProfile().then(res => {
            setUser(res.data);
        }).catch(() => {
            setUser(null);
        });
    }, [token]);

    const providerValue = {
        user, setUser,
    }
    return (
        <UserContext.Provider value={providerValue}>
            {props.children}
        </UserContext.Provider>
    );
}

type Props = {
    children: React.ReactNode;
}
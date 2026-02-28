import { useAuth } from "../../hooks/auth.hook";
import { greet } from "../../utils/helpers";

export default function AdminDashboard() {
    const { user } = useAuth();
    if (!user) return <p>Loading...</p>

    return <div className="p-10">
        <h1>{greet().toUpperCase()}, ADMIN {user.firstName}!</h1>
        <p>Welcome to the dashboard</p>
    </div>
}
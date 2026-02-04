import { greet } from "../../utils/helpers";

export default function AdminDashboard() {
    return <div className="p-10">
        <h1>{greet().toUpperCase()}, ADMIN!</h1>
        <p>Welcome to the dashboard</p>
    </div>
}
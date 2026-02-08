import { useForm } from "react-hook-form";
import { apiService } from "../../lib/api.ts";
import { handleErrorToast } from "../../utils/helpers";
import { toast } from "react-toastify";
import { ROUTES_PATH } from "../../utils/constants";
import { Link, useNavigate } from "react-router-dom";
import "./AdminLogin.css";

export function AdminLogin() {
    const { register, handleSubmit } = useForm<LoginInput>();
    const navigate = useNavigate();

    function onSubmit(data: LoginInput) {
        apiService.adminLogin(data.email, data.password).then((res) => {
            localStorage.setItem("token", res.data.token);
            navigate(ROUTES_PATH.ADMIN_DASHBOARD);
        }).catch(err => {
            handleErrorToast(err, toast);
        })
    }

    return <div className="admin-login">
        <h2>Admin Login</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label htmlFor="email">Email</label>
                <input {...register("email")} type="text" placeholder="Email" name="email" id="email" />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input {...register("password")} type="password" placeholder="Password" name="password" id="password" />
            </div>
            <div><button>Login</button></div>
        </form>
        <Link to={ROUTES_PATH.HOME}>Go to main page</Link>
    </div>
}

type LoginInput = { email: string; password: string }
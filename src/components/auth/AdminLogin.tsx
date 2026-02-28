import { useForm } from "react-hook-form";
import { apiService } from "../../lib/api.service.ts";
import { handleErrorToast } from "../../utils/helpers";
import { toast } from "react-toastify";
import { ROUTES_PATH } from "../../utils/routes.ts";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/auth.hook.ts";

export default function AdminLogin() {
    const { register, handleSubmit } = useForm<LoginInput>();
    const navigate = useNavigate();
    const { login } = useAuth();

    function onSubmit(data: LoginInput) {
        apiService.adminLogin(data).then((res) => {
            login(res.data.token);
            navigate(ROUTES_PATH.ADMIN_DASHBOARD);
        }).catch(err => {
            handleErrorToast(err, toast);
        })
    }

    return <div className="login">
        <h2>Admin Login</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
            <label>
                <span>Email</span>
                <input {...register("email")} type="email" name="email" required />
            </label>
            <label>
                <span>Password</span>
                <input {...register("password")} type="password" name="password" required />
            </label>

            <p><button>Login</button></p>
        </form>
        <p><Link to={ROUTES_PATH.HOME}>Go to main page</Link></p>
    </div>
}

type LoginInput = { email: string; password: string }
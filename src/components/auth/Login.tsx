import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";
import { apiService } from "../../lib/api.service.ts";
import { ROUTES_PATH } from "../../utils/routes.ts";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useAuth } from "../../hooks/auth.hook.ts";
import { handleErrorToast } from "../../utils/helpers.ts";

export default function Login() {
    const { register, handleSubmit } = useForm<LoginInput>();
    const navigate = useNavigate();
    const guestCartId = localStorage.getItem("cartId");

    const { login } = useAuth();

    const onSubmit = (data: LoginInput) => {
        const loginData = { ...data, guestCartId: guestCartId || undefined }
        apiService.loginCustomer(loginData).then(res => {
            const { token, cartId } = res.data;
            login(token);

            if (cartId) {
                navigate(ROUTES_PATH.SHOPPING_CART);
            } else {
                navigate(ROUTES_PATH.SHOP);
            }
            toast.success("Login successful!")
        }).catch(err => {
            handleErrorToast(err, toast)
        })
    };

    return <div className="login">
        <h2>Welcome back!</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
            <p>Login to continue</p>

            <div>
                <label htmlFor="email">Email</label>
                <input {...register("email")} type="email" id="email" required />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input {...register("password")} type="password" id="password" required />
            </div>
            <div>
                <button>Login</button>
            </div>
        </form>
        <p>Don't have an account? <Link to={ROUTES_PATH.SIGNUP}>Signup</Link></p>
    </div>
}

type LoginInput = { email: string; password: string }
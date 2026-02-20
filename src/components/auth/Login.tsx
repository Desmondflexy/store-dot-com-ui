import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";
import { apiService } from "../../lib/api.service.ts";
import { ROUTES_PATH } from "../../utils/constants";
import { handleErrorToast } from "../../utils/helpers";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useUser } from "../../hooks/user.hook.ts";

export function Login() {
    const { register, handleSubmit } = useForm<LoginInput>();
    const navigate = useNavigate();
    const guestCartId = localStorage.getItem("cartId");
    const userContext = useUser();

    const onSubmit = async (data: LoginInput) => {
        try {
            const loginResponse = await apiService.loginCustomer({
                ...data,
                guestCartId: guestCartId || undefined
            });

            const { token, cartId } = loginResponse.data;

            localStorage.setItem("token", token);
            localStorage.setItem("cartId", cartId);
            const getProfileResponse = await apiService.getProfile();
            userContext.setUser(getProfileResponse.data);

            if (cartId) {
                navigate(ROUTES_PATH.SHOPPING_CART);
            } else {
                navigate(ROUTES_PATH.SHOP);
            }
            toast.success("Login successful!")

        } catch (err) {
            handleErrorToast(err, toast);
        }
    };

    return <div className="signup">
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
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";
import { apiService } from "../../lib/api.ts";
import { ROUTES_PATH } from "../../utils/constants";
import { handleErrorToast } from "../../utils/helpers";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

export function Login() {
    const { register, handleSubmit } = useForm<LoginInput>();
    const navigate = useNavigate();
    const cartId = localStorage.getItem("cartId");

    const onSubmit = (data: LoginInput) => {
        apiService.loginCustomer({ ...data, cartId: cartId ? cartId : undefined })
            .then(res => {
                const { token, cartId } = res.data;
                localStorage.setItem("token", token);

                if (cartId) {
                    navigate(ROUTES_PATH.SHOPPING_CART);
                } else {
                    localStorage.removeItem("cartId");
                    navigate(ROUTES_PATH.SHOP);
                }
            })
            .catch(err => {
                handleErrorToast(err, toast);
            })
    }
    return <div className="signup">
        <h2>Welcome back!</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
            <p>Login to continue</p>

            <div>
                <label htmlFor="email">Email</label>
                <input {...register("email")} type="email" id="email" />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input {...register("password")} type="password" id="password" />
            </div>
            <div>
                <button>Login</button>
            </div>
        </form>
        <p>Already have an account? <Link to={ROUTES_PATH.SIGNUP}>Signup</Link></p>
    </div>
}

type LoginInput = { email: string; password: string }
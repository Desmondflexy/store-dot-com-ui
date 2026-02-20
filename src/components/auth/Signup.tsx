import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";
import { ROUTES_PATH } from "../../utils/constants";
import { useForm } from "react-hook-form";
import { apiService } from "../../lib/api.service.ts";
import { handleErrorToast } from "../../utils/helpers.ts";
import { toast } from "react-toastify";
import { useUser } from "../../hooks/user.hook.ts";

export function Signup() {
    const { register, handleSubmit } = useForm<RegisterInput>();
    const navigate = useNavigate();
    const localCartId = localStorage.getItem("cartId");
    const userContext = useUser();

    const onSubmit = (data: RegisterInput) => {
        const guestCartId = localCartId ? localCartId : undefined;
        apiService.createCustomer({ ...data, guestCartId })
            .then(res => {
                const { token, cartId, user } = res.data;
                localStorage.setItem("token", token);
                userContext.setUser(user);
                localStorage.removeItem("cartId");

                if (cartId) {
                    navigate(ROUTES_PATH.SHOPPING_CART);
                } else {
                    navigate(ROUTES_PATH.SHOP);
                }
            })
            .catch(err => {
                handleErrorToast(err, toast);
            })
    }
    return <div className="signup">

        <h2>Create an account</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
            <p>Sign up to continue</p>
            <div>
                <label htmlFor="firstName">First Name</label>
                <input {...register("firstName")} type="text" id="firstName" required />
            </div>
            <div>
                <label htmlFor="lastName">Last Name</label>
                <input {...register("lastName")} type="text" id="lastName" required />
            </div>
            <div>
                <label htmlFor="email">Email</label>
                <input {...register("email")} type="email" id="email" required />
            </div>
            <div>
                <label htmlFor="phone">Phone</label>
                <input {...register("phone")} type="tel" id="phone" required />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input {...register("password")} type="password" id="password" required />
            </div>
            <div>
                <label htmlFor="confirm">Confirm Password</label>
                <input {...register("confirm")} type="password" id="confirm" required />
            </div>
            <div>
                <button>Register</button>
            </div>
        </form>
        <p>Already have an account? <Link to={ROUTES_PATH.LOGIN}>Login</Link></p>
    </div>
}

type RegisterInput = {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
    confirm: string;
}
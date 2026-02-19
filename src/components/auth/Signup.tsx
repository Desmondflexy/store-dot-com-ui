import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";
import { ROUTES_PATH } from "../../utils/constants";
import { useForm } from "react-hook-form";
import { apiService } from "../../lib/api.ts";
import { handleErrorToast } from "../../utils/helpers.ts";
import { toast } from "react-toastify";

export function Signup() {
    const { register, handleSubmit } = useForm<RegisterInput>();
    const navigate = useNavigate();
    const cartId = localStorage.getItem("cartId");

    const onSubmit = (data: RegisterInput) => {
        apiService.createCustomer({ ...data, cartId: cartId ? cartId : undefined })
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

        <h2>Create an account</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
            <p>Sign up to continue</p>
            <div>
                <label htmlFor="firstName">First Name</label>
                <input {...register("firstName")} type="text" id="firstName" />
            </div>
            <div>
                <label htmlFor="lastName">Last Name</label>
                <input {...register("lastName")} type="text" id="lastName" />
            </div>
            <div>
                <label htmlFor="email">Email</label>
                <input {...register("email")} type="email" id="email" />
            </div>
            <div>
                <label htmlFor="phone">Phone</label>
                <input {...register("phone")} type="tel" id="phone" />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input {...register("password")} type="password" id="password" />
            </div>
            <div>
                <label htmlFor="confirm">Confirm Password</label>
                <input {...register("confirm")} type="password" id="confirm" />
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
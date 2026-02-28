import { Link, useNavigate } from "react-router-dom";
import { apiService } from "../../lib/api.service.ts";
import { ROUTES_PATH } from "../../utils/routes.ts";
import { toast } from "react-toastify";
import { useAuth } from "../../hooks/auth.hook.ts";
import { handleErrorToast } from "../../utils/helpers.ts";
import { useState } from "react";

export default function Login({ role }: Props) {
    const navigate = useNavigate();
    const guestCartId = localStorage.getItem("cartId");
    const [form, setForm] = useState<LoginInput>({
        email: "",
        password: "",
    });
    const { email, password } = form;

    const { login } = useAuth();

    const loginCustomer = () => {
        const loginData = {
            email, password,
            guestCartId: guestCartId || undefined
        }

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

    const loginAdmin = () => {
        const loginData = { email, password }
        apiService.adminLogin(loginData).then((res) => {
            login(res.data.token);
            navigate(ROUTES_PATH.ADMIN_DASHBOARD);
        }).catch(err => {
            handleErrorToast(err, toast);
        })
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    }

    const isAdmin = role === "admin";
    const title = isAdmin ? "Admin Login" : "Welcome back!";
    const submitHandler = isAdmin ? loginAdmin : loginCustomer;
    const footer = isAdmin ? (
        <p><Link to={ROUTES_PATH.HOME}>Go to main page</Link></p>
    ) : (
        <p>Don't have an account? <Link to={ROUTES_PATH.SIGNUP}>Signup</Link></p>
    );

    return <div className="login">
        <h2>{title}</h2>
        <form action={submitHandler}>
            <p>Login to continue</p>

            <label>
                <span>Email</span>
                <input name="email" value={email} onChange={handleChange} type="email" required />
            </label>

            <label>
                <span>Password</span>
                <input name="password" value={password} onChange={handleChange} type="password" required />
            </label>
            <p>
                <button>Login</button>
            </p>
        </form>
        {footer}
    </div>
}

type LoginInput = {
    email: string;
    password: string;
    guestCartId?: string;
}

type Props = {
    role: "admin" | "customer";
}

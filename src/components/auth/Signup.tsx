import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";
import { ROUTES_PATH } from "../../utils/routes.ts";
import { apiService } from "../../lib/api.service.ts";
import { handleErrorToast } from "../../utils/helpers.ts";
import { toast } from "react-toastify";
import { useAuth } from "../../hooks/auth.hook.ts";
import { useState } from "react";

export default function Signup() {
    const navigate = useNavigate();
    const guestCartId = localStorage.getItem("cartId");
    const { login } = useAuth();

    const [form, setForm] = useState<RegisterInput>({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        confirm: "",
    });
    const {firstName, lastName, email, phone, password, confirm } = form;

    const handleSubmit = () => {
        const createData: RegisterInput = {
            firstName, lastName, email, phone,
            password, confirm,
            guestCartId: guestCartId || undefined,
        }
        apiService.createCustomer(createData).then(res => {
            const { token, cartId } = res.data;
            login(token);

            if (cartId) {
                navigate(ROUTES_PATH.SHOPPING_CART);
            } else {
                navigate(ROUTES_PATH.SHOP);
            }
        }).catch(err => {
            handleErrorToast(err, toast);
        })
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    }

    return <div className="signup">

        <h2>Create an account</h2>
        <form action={handleSubmit}>
            <p>Sign up to continue</p>
            <label>
                <span>First Name</span>
                <input name="firstName" value={firstName} onChange={handleChange} required />
            </label>
            <label>
                <span>Last Name</span>
                <input name="lastName" value={lastName} onChange={handleChange} required />
            </label>
            <label>
                <span>Email</span>
                <input name="email" type="email" value={email} onChange={handleChange} required />
            </label>
            <label>
                <span>Phone</span>
                <input name="phone" type="tel" value={phone} onChange={handleChange} required />
            </label>
            <label>
                <span>Password</span>
                <input name="password" type="password" value={password} onChange={handleChange} required />
            </label>
            <label>
                <span>Confirm Password</span>
                <input name="confirm" type="password" value={confirm} onChange={handleChange} required />
            </label>
            <p>
                <button>Register</button>
            </p>
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
    guestCartId?: string;
}
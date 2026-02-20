import axios from "axios";
import type { AxiosInstance } from "axios";

class ApiService {
    private readonly Api: AxiosInstance;

    constructor() {
        const baseURL = import.meta.env.VITE_SERVER_URL;

        this.Api = axios.create({ baseURL, withCredentials: true });

        this.Api.interceptors.request.use(config => {
            const token = localStorage.getItem("token");
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        });
    }


    adminLogin(email: string, password: string) {
        return this.Api.post("auth/admin-login", { email, password })
    }

    addProduct(productData: any) {
        return this.Api.post("product", productData);
    }

    uploadProductImages(formData: FormData) {
        return this.Api.post("file/upload/multiple", formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    }

    viewProductList() {
        return this.Api.get("product");
    }

    adminViewInventory() {
        return this.Api.get("product/admin");
    }

    viewProductInfo(id: string) {
        return this.Api.get(`product/${id}`);
    }

    addItemToCart(payLoad: { productId: number; cartId?: string | null }) {
        return this.Api.post<ICart>("cart", payLoad);
    }

    removeItemFromCart(payload: { productId: number, cartId: string }) {
        return this.Api.patch<ICart>("cart/remove", payload)
    }

    getCartByUuid(uuid: string) {
        return this.Api.get<ICart>(`cart/${uuid}`);
    }

    findGuestCart(uuid: string) {
        return this.Api.get<ICart>(`cart/${uuid}/guest`);
    }

    authMe() {
        return this.Api.get("auth/me");
    }

    authAdminMe() {
        return this.Api.get("auth/admin-me");
    }

    createCustomer(data: any) {
        return this.Api.post("auth/signup", data);
    }

    loginCustomer(data: any) {
        return this.Api.post("auth/login", data);
    }

    getProfile() {
        return this.Api.get<UserResponse>("user/profile");
    }

    getMyCart() {
        return this.Api.get<ICart>("cart");
    }

    logout() {
        return this.Api.post("auth/logout");
    }
}

export const apiService = new ApiService();

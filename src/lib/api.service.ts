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

    addItemToCart(payLoad: { productId: number; cartUuid?: string | null }) {
        return this.Api.post<ICart>("cart/add-item", payLoad);
    }

    removeItemFromCart(payload: { productId: number, cartUuid: string }) {
        return this.Api.patch<ICart>("cart/remove-item", payload)
    }

    removeItemFromUserCart(payload: { productId: number }) {
        return this.Api.patch<ICart>("cart/user-remove-item", payload)
    }

    findGuestCart(uuid: string) {
        return this.Api.get<ICart>(`cart/${uuid}/guest-cart`);
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
        return this.Api.get<ICart>("cart/user-cart");
    }

    logout() {
        return this.Api.post("auth/logout");
    }

    getUserAddress() {
        return this.Api.get<Address[]>("user/address");
    }

    getShopAddress() {
        return this.Api.get<Address[]>("user/address/shop");
    }
}

export const apiService = new ApiService();

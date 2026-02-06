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

    viewProductInfo(id: string) {
        return this.Api.get(`product/${id}`);
    }

    addItemToCart(payLoad: { productId: string; qty?: number; cartId?: string }) {
        return this.Api.post("cart", payLoad);
    }
}

export const apiService = new ApiService();

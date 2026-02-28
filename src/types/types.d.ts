type ICart = {
    // id: number;
    // userId: number;
    // status: string;
    uuid: string;
    items: IItem[];
}

type IItem = {
    id: number;
    cartId: number;
    productId: number;
    name: string;
    unitPrice: number;
    image: string;
    quantity: number;
}

type UserResponse = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    role: string;
    createdAt: Date;
    cart: ICart | null;
}

type ProductResponse = {
    id: number;
    name: string;
    description: string;
    images: { fileUrl: string }[];
    price: number;
    soldCount: number;
    stock: number;
}

type Address = {
    id: number;
    street: string;
    city: string;
    state: string;
    country: string;
    note: string;
}
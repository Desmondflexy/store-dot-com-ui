declare type CartResponse = {
    id: number;
    userId: number;
    status: string;
    uuid: string;
    items: IItem[];
};

declare type UserResponse = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    role: string;
    createdAt: Date;
}
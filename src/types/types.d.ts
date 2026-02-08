declare type ICart = {
    id: number;
    uuid: string;
    items: IItem[];
}

declare type IItem = {
    id: number;
    cartId: number;
    productId: number;
    name: string;
    unitPrice: number;
    image: string;
    quantity: number;
}
declare type CartResponse = {
    id: number;
    userId: number;
    status: string;
    uuid: string;
    items: IItem[];
};
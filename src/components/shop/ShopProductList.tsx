import { useEffect, useState } from "react"
import { apiService } from "../../lib/api.ts";
import { formatNumber, handleErrorToast, shortenText } from "../../utils/helpers.ts";
import { toast } from "react-toastify";
import "./ShopProductList.css";

export default function ShopProductList() {
    const [data, setData] = useState<dataResponse[]>([])
    useEffect(() => {
        apiService.viewProductList().then(res => {
            setData(res.data);
        }).catch(err => {
            handleErrorToast(err, toast);
        })
    }, []);

    const handleAddToCart = () => {
        alert('added to cart')
    }


    return <div className="shop-product-list">
        <h2>Product Listing</h2>
        <ul>
            {data.map(p => (
                <li key={p.id}>
                    <img onClick={() => alert(`Product ${p.id} info`)} src={p.images[0].fileUrl} alt={p.name} />
                    <p>{shortenText(p.name, 50)}</p>
                    <p>{formatNumber(p.price)}</p>
                    <div className="buttons">
                        <button onClick={() => handleAddToCart()}>Add to cart</button>
                    </div>
                </li>
            ))}
        </ul>
    </div>
}

type dataResponse = {
    id: string;
    name: string;
    description: string;
    images: { fileUrl: string }[];
    price: number;
    soldCount: number;
    stock: number;
}
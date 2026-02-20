import { useEffect, useState } from "react"
import { apiService } from "../../lib/api.service.ts"
import { handleErrorToast } from "../../utils/helpers.ts"
import { toast } from "react-toastify"
import "./AdminViewProductList.css"
import { useNavigate } from "react-router-dom"
import { ROUTES_PATH } from "../../utils/constants.ts"

export default function AdminViewProductList() {
    const [data, setData] = useState<dataResponse[]>([]);

    useEffect(() => {
        apiService.adminViewInventory().then(res => {
            setData(res.data)
        }).catch(err => {
            handleErrorToast(err, toast)
        })
    }, []);

    const navigate = useNavigate();
    function handleViewDetailsClick(id: string) {
        navigate(ROUTES_PATH.ADMIN_PRODUCT_DETAILS.replace(":id", id));
    }

    return <div className="p-10 admin-view-product-list">
        <h2>Stocks and Inventory</h2>
        <ul>
            {data.map(i => (
                <li key={i.id}>
                    <img src={i.images[0].fileUrl} alt={i.name} />
                    <div>
                        <h3>{i.name}</h3>
                        <div>
                            <p>Price - N{i.price}</p>
                            <p>Stock - {i.stock}</p>
                            <p>Sold - {i.soldCount}</p>
                            <button onClick={() => handleViewDetailsClick(i.id)}>View details</button>
                        </div>
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
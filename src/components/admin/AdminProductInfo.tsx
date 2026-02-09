import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { apiService } from "../../lib/api.ts";
import { formatDateTime, formatNumber, handleErrorToast } from "../../utils/helpers";
import { toast } from "react-toastify";
import "./AdminProductInfo.css";

export default function AdminProductInfo() {
    const { id } = useParams();
    const [product, setProduct] = useState<ProductInfo | null>(null);

    useEffect(() => {
        if (!id) return;
        apiService.viewProductInfo(id).then(res => {
            setProduct(res.data);
        }).catch(err => {
            handleErrorToast(err, toast);
        })
    }, [id]);

    if (!product) return <p>Loading...</p>

    return <div className="product-details">
        <div className="product-header">
            <img
                src={product.images[0].fileUrl}
                alt={product.name}
                className="product-image"
            />

            <div className="product-summary">
                <h1 className="product-name">{product.name}</h1>
                <p className="product-price">{formatNumber(product.price, 0)}</p>

                <span className={`status ${product.isPublished ? "published" : ""}`}>{product.isPublished ? "Published" : ""}</span>
            </div>
        </div>

        <div className="product-section product-description">
            <h3>Description</h3>
            <p>{product.description}</p>
        </div>

        <div className="product-section">
            <h3>Image Gallery</h3>

            <div className="gallery">
                {product.images.map(image => (
                    <img key={image.publicId} src={image.fileUrl} alt={product.name} />
                ))}
            </div>
        </div>

        <div className="product-grid">
            <div className="product-card">
                <span>Stock</span>
                <strong>{product.stock}</strong>
            </div>

            <div className="product-card">
                <span>Sold</span>
                <strong>{product.soldCount}</strong>
            </div>

            <div className="product-card">
                <span>Price</span>
                <strong>{formatNumber(product.price, 0)}</strong>
            </div>
        </div>

        <div className="product-section">
            <h3>Admin Info</h3>
            <p>
                Added by <strong>{product.addedByAdmin.firstName} {product.addedByAdmin.lastName}</strong><br />
                <small>{product.addedByAdmin.email}</small>
            </p>
        </div>

        <div className="product-meta">
            <small>Created: {formatDateTime(product.createdAt)}</small><br />
            <small>Last Updated: {formatDateTime(product.updatedAt)}</small>
        </div>
    </div>
}

type ProductInfo = {
    createdAt: string;
    updatedAt: string;
    description: string;
    images: { fileUrl: string; publicId: string }[];
    name: string;
    price: number;
    soldCount: number;
    stock: number;
    addedByAdmin: { firstName: string; lastName: string; email: string };
    isPublished: boolean;
}
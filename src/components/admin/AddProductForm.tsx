import { useForm } from "react-hook-form";
import { useState } from "react";
import { uploadImages } from "../../lib/upload.ts";
import { apiService } from "../../lib/api.ts.ts";
import "./AddProductForm.css";
import { toast } from "react-toastify";
import { handleErrorToast } from "../../utils/helpers.ts";
import { useNavigate } from "react-router-dom";
import { ROUTES_PATH } from "../../utils/constants.ts";

export default function AddProductForm() {
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        reset,
        formState: { isSubmitting },
    } = useForm<ProductForm>({
        defaultValues: {
            images: [],
        },
    });

    const [localFiles, setLocalFiles] = useState<File[]>([]);
    const images = watch("images");

    const onSelectImages = (files: FileList | null) => {
        if (!files) return;
        setLocalFiles((prev) => [...prev, ...Array.from(files)]);
    };

    const removeImage = (index: number) => {
        setLocalFiles((prev) => prev.filter((_, i) => i !== index));
        setValue("images", images.filter((_, i) => i !== index));
    };

    const navigate = useNavigate();

    const onSubmit = async (data: ProductForm) => {
        try {
            const uploaded = await uploadImages(localFiles);

            const payload = {
                ...data,
                images: uploaded,
            };

            await apiService.addProduct(payload);

            reset();
            setLocalFiles([]);
            toast.success("Product added successfully")
        } catch (err: any) {
            handleErrorToast(err, toast);
            if (err.status === 401) {
                navigate(ROUTES_PATH.ADMIN_LOGIN);
            }
        }
    };

    return (
        <form className="product-form p-10" onSubmit={handleSubmit(onSubmit)}>
            <h2>Add Product</h2>

            <input className="input" placeholder="Product name" {...register("name")} required />

            <textarea className="textarea" placeholder="Description" {...register("description")} required />

            <div className="image-field">
                <label className="image-label">Product Images</label>
                <input type="file" accept="image/*" multiple onChange={(e) => onSelectImages(e.target.files)} />

                <ul className="image-list">
                    {localFiles.map((file, index) => (
                        <li key={index} className="image-item">
                            <span>{file.name}</span>
                            <button type="button" className="remove-btn" onClick={() => removeImage(index)} >
                                Remove
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="row">
                <input className="input" type="number" placeholder="Price" {...register("price")} required />
                <input className="input" type="number" placeholder="Stock" {...register("stock")} min={1} required />
            </div>

            <button className="submit-btn" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Add Product"}
            </button>
        </form>
    );
}

type UploadedImage = {
    publicId: string;
    fileUrl: string;
};

type ProductForm = {
    name: string;
    description: string;
    price: number;
    stock: number;
    images: UploadedImage[];
};
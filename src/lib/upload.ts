import { apiService } from "./api.service.ts";

export async function uploadImages(files: File[]) {
    const formData = new FormData();

    files.forEach((file) => {
        formData.append("files", file);
    });

    const res = await apiService.uploadProductImages(formData)

    return res.data.uploadedFiles as {
        publicId: string;
        fileUrl: string;
    }[];
}
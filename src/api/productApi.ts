import { ProductUrl } from "@/constants/apiUrls";
import { apiClient } from "./axiosClient";

const postApi = {
  getAllProducts: () => apiClient.get(ProductUrl),

  addProduct: (formData: FormData) =>
    apiClient.post(`${ProductUrl}/create`, formData),


  editProduct: (id: string, formData: FormData) =>
    apiClient.put(`${ProductUrl}/update/${id}`, formData
    ),

  getSinglePost: ({ id }: { id: string }) =>
    apiClient.get(`${ProductUrl}/${id}`),
};

export default postApi;

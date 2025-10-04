import { useMutation, useQuery } from "@tanstack/react-query";
import productApi from "@/api/productApi";

// Fetch all products
export const useGetProducts = () =>
  useQuery({
    queryKey: ["allProducts"],
    queryFn: () => productApi.getAllProducts(),
  });

// Create new product Accepts Form data
export const useCreateProduct = () =>
  useMutation({
    mutationFn: (formData: FormData) => productApi.addProduct(formData),
  });

// Edit product Accepts Form data
export const useEditProduct = () =>
  useMutation({
    mutationFn: ({ id, formData }: { id: string; formData: FormData }) =>
      productApi.editProduct(id, formData),
  });
// Fetch a single product/post
export const useGetSinglePost = (id: string) =>
  useQuery({
    queryKey: ["singlePost", id],
    queryFn: () => productApi.getSinglePost({ id }),
    enabled: !!id,
  });

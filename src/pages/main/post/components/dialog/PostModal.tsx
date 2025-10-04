import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import FileUpload from "@/components/shared/FileUpload";
import { useCreateProduct, useEditProduct } from "@/query/post/usePost";

// Validation schema
const schema = yup.object().shape({
  name: yup.string().required("Product name is required"),
  price: yup
    .number()
    .typeError("Price must be a number")
    .positive("Price must be positive")
    .required("Price is required"),
});

type FormValues = {
  name: string;
  price: number;
};

type Product = {
  id: number;
  name: string;
  image: string;
  price: number;
};

type PostModalProps = {
  product?: Product;
  mode?: "add" | "edit";
  trigger?: React.ReactNode;
  onSuccess?: () => void;
};

export default function PostModal({
  product,
  mode = "add",
  trigger,
  onSuccess,
}: PostModalProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [open, setOpen] = useState(false);

  const createProduct = useCreateProduct();
  const editProduct = useEditProduct();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: { name: "", price: 0 },
  });

  // Reset form when modal opens
  useEffect(() => {
    if (open) {
      if (product) {
        reset({ name: product.name, price: product.price });
        setSelectedFile(null);
      } else {
        reset({ name: "", price: 0 });
        setSelectedFile(null);
      }
    }
  }, [open, product, reset]);

  const onSubmit = (data: FormValues) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("price", data.price.toString());
    if (selectedFile) formData.append("image", selectedFile);

    if (mode === "add") {
      createProduct.mutate(formData, {
        onSuccess: () => {
          reset();
          setSelectedFile(null);
          if (onSuccess) onSuccess();
          setOpen(false); // ✅ close modal
        },
      });
    } else if (mode === "edit" && product) {
      editProduct.mutate(
        { id: product.id.toString(), formData },
        {
          onSuccess: () => {
            reset();
            setSelectedFile(null);
            if (onSuccess) onSuccess();
            setOpen(false); // ✅ close modal
          },
        }
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger ?? <Button>{mode === "add" ? "+ Add Product" : "Edit"}</Button>}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{mode === "add" ? "Add Product" : "Edit Product"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input placeholder="Product Name" {...register("name")} />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

          <Input
            type="number"
            placeholder="Price"
            {...register("price", { valueAsNumber: true })}
          />
          {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}

          <FileUpload
            initialImage={product?.image}
            onFileSelect={(file) => setSelectedFile(file)}
          />

          <div className="flex justify-end gap-2 mt-4">
            <Button type="submit">{mode === "add" ? "Save" : "Update"}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

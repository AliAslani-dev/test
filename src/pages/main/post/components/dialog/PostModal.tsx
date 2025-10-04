import { useEffect } from "react";
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
import { Textarea } from "@/components/ui/textarea";

// Validation schema
const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  content: yup.string().required("Content is required"),
});

type FormValues = {
  title: string;
  content: string;
};

type PostModalProps = {
  post?: { id: number; title: string; body: string };
  mode?: "add" | "edit";
  trigger?: React.ReactNode;
  onSuccess?: () => void;
};

export default function PostModal({
  post,
  mode = "add",
  trigger,
  onSuccess,
}: PostModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  // Reset form when post changes (edit mode)
  useEffect(() => {
    if (post) {
      reset({
        title: post.title,
        content: post.body,
      });
    }
  }, [post, reset]);

  const onSubmit = async (data: FormValues) => {
    try {
      let response;
      if (mode === "add") {
        response = await fetch("https://dummyjson.com/posts/add", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: data.title,
            body: data.content,
            userId: 5,
          }),
        });
      } else if (mode === "edit" && post) {
        response = await fetch(`https://dummyjson.com/posts/${post.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: data.title,
            body: data.content,
          }),
        });
      }

      const result = await response?.json();
      console.log("API result:", result);

      if (onSuccess) onSuccess();
      reset();
    } catch (error) {
      console.error("API error:", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger ?? <Button>{mode === "add" ? "+ Add Post" : "Edit"}</Button>}
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {mode === "add" ? "Add New Post" : "Edit Post"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Input placeholder="Post Title" {...register("title")} />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </div>

          <div>
            <Textarea placeholder="Post Content" {...register("content")} />
            {errors.content && (
              <p className="text-red-500 text-sm">{errors.content.message}</p>
            )}
          </div>

          <div className="flex justify-end gap-2">
            <Button type="submit">{mode === "add" ? "Save" : "Update"}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

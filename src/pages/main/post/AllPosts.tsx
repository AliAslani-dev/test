import PostCard from "./components/PostCard";
import type { Product } from "./components/PostCard";
import { useGetProducts } from "@/query/post/usePost";
import PostModal from "./components/dialog/PostModal";
import { Button } from "@/components/ui/button";
export default function AllPosts() {
  const { data, isLoading, error, refetch } = useGetProducts();
  console.log(data)
  const products: Product[] = data?.data?.products ?? [];

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong 😢</p>;

  return (
    <div className="p-6">
      {/* Header with Add Post Modal */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">All Posts</h2>
        <PostModal mode="add" onSuccess={refetch} />
      </div>

      {/* Posts grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="relative">
            <PostCard product={product} />
            <div className="absolute top-2 right-2">
              <PostModal
                mode="edit"
                product={{ id: product.id, name: product.name , image : product.image , price : product.price}}
                trigger={<Button size="sm">Edit</Button>}
                onSuccess={refetch}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export type Product = {
  id: number;
  image: string; // base64 or URL
  name: string;
  price: number;
};

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Card
      className="flex items-center gap-5 p-5 rounded-2xl border border-gray-100 
                 hover:border-blue-400 hover:shadow-2xl hover:-translate-y-1 
                 transition-all duration-300 cursor-pointer bg-gradient-to-br from-white to-gray-50"
    >
      {/* Image Thumbnail */}
      <div className="relative flex-shrink-0">
        <img
          src={product.image}
          alt={product.name}
          className="w-24 h-24 object-cover rounded-xl shadow-md transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute inset-0 rounded-xl bg-black/10 opacity-0 hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Product Info */}
      <div className="flex-1 flex flex-col justify-between">
        <CardHeader className="p-0">
          <CardTitle className="text-xl font-bold text-gray-800 tracking-tight line-clamp-1">
            {product.name}
          </CardTitle>
        </CardHeader>

        <CardContent className="p-0 mt-1">
          <p className="text-lg font-semibold text-blue-600">

            {product.price.toLocaleString()}
            <span className="text-gray-500 text-sm">تومان</span>
          </p>
        </CardContent>
      </div>
    </Card>
  );
}

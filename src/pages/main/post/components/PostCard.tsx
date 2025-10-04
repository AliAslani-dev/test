import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, ThumbsUp, ThumbsDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
type Reaction = {
  likes: number;
  dislikes: number;
};

export type Post = {
  id: number;
  title: string;
  body: string;
  tags: string[];
  reactions: Reaction;
  views: number;
  userId: number;
};

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const navigate = useNavigate();
  const navigateToSinglePost = (id: Post["id"]) => {
    navigate(`/posts/${id}`);
  };
  return (
    <Card
      onClick={() => navigateToSinglePost(post?.id)}
      style={{ cursor: "pointer" }}
      className="overflow-hidden rounded-xl border border-transparent hover:border-blue-400 hover:shadow-2xl transition-all duration-300 bg-gradient-to-b from-white to-gray-50"
    >
      {/* Header */}

      <CardHeader className="flex flex-col gap-2 pb-0">
        <CardTitle className="text-base md:text-lg font-bold line-clamp-1 text-gray-800">
          {post.title}
        </CardTitle>
        <div className="flex items-center gap-3 text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <Eye className="w-4 h-4 text-blue-400" /> {post.views}
          </span>
          <span className="flex items-center gap-1">
            <ThumbsUp className="w-4 h-4 text-green-500" />{" "}
            {post.reactions.likes}
          </span>
          <span className="flex items-center gap-1">
            <ThumbsDown className="w-4 h-4 text-red-500" />{" "}
            {post.reactions.dislikes}
          </span>
        </div>
      </CardHeader>

      {/* Content */}
      <CardContent className="pt-2">
        <p className="text-sm text-gray-700 line-clamp-3">{post.body}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Badge
              key={tag}
              className="bg-gradient-to-r from-blue-400 to-purple-500 text-white text-xs px-3 py-1 rounded-full shadow-md"
            >
              #{tag}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

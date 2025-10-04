import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, ThumbsUp, ThumbsDown } from "lucide-react";
import { useGetSinglePost, useGetPostComments } from "@/query/post/usePost";
import { useParams } from "react-router-dom";
import Comments from "./components/Comments";

export default function Post() {
  const { id } = useParams();
  const { data, isLoading, error } = useGetSinglePost(id || "0");
  const {
    data: commentData,
    isLoading: isCommentsLoading,
    error: commentsError,
  } = useGetPostComments(id || "0");

  if (isLoading || isCommentsLoading) return <p>Loading...</p>;
  if (error || commentsError) return <p>Something went wrong 😢</p>;

  const post = data?.data;
  const comments = commentData?.data?.comments || [];

  if (!post) return null;

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8">
      <Card className="overflow-hidden rounded-xl border border-gray-200 shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-800">
            {post.title}
          </CardTitle>
          <div className="flex items-center gap-4 text-sm text-gray-500 mt-2">
            <span className="flex items-center gap-1">
              <Eye className="w-4 h-4 text-blue-500" /> {post.views} views
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
        <CardContent>
          <p className="text-gray-700 leading-relaxed">{post.body}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {post?.tags?.map((tag: string) => (
              <Badge
                key={tag}
                className="bg-gradient-to-r from-blue-400 to-purple-500 text-white text-xs px-3 py-1 rounded-full"
              >
                #{tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Comments Section */}
      <Comments comments={comments} />
    </div>
  );
}

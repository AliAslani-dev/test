import { Card } from "@/components/ui/card";
import { ThumbsUp } from "lucide-react";

type User = {
  fullName: string;
  username: string;
};

type Comment = {
  id: string | number;
  body: string;
  likes: number;
  user: User;
};

type CommentsProps = {
  comments: Comment[];
};

export default function Comments({ comments }: CommentsProps) {
  return (
    <div>
      <div>
        <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
          Comments ({comments.length})
        </h2>
        <div className="space-y-4">
          {comments.map((comment) => (
            <Card
              key={comment.id}
              className="p-4 rounded-lg border border-gray-200 shadow-sm"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-gray-800">
                  {comment.user.fullName}
                </span>
                <span className="text-sm text-gray-500">
                  @{comment.user.username}
                </span>
              </div>
              <p className="text-gray-700">{comment.body}</p>
              <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
                <ThumbsUp className="w-4 h-4 text-green-500" /> {comment.likes}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FC } from "react";
import { dislikeComment, likeComment } from "../shared/api/commentApi";
import Button from "../shared/ui/Button";

interface IComment {
  id: string;
  author: {
    id: string;
    profilePicture: string | null;
    username: string;
  };
  post: {
    id: string;
  };
  content: string;
  likes: number;
  dislikes: number;
  createdAt: Date;
  updatedAt: Date;
}

interface IProps {
  commentData: IComment;
  forwardRef?: (node: HTMLDivElement) => void;
}

const CommentCard: FC<IProps> = ({ commentData, forwardRef }) => {
  const queryClient = useQueryClient();

  const likeMutation = useMutation(
    (data: { postId: string; commentId: string }) => likeComment(data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["comments", commentData.post.id]);
      },
    }
  );

  const dislikeMutation = useMutation(
    (data: { postId: string; commentId: string }) => dislikeComment(data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["comments", commentData.post.id]);
      },
    }
  );

  function handleLike() {
    likeMutation.mutate({ postId: commentData.post.id, commentId: commentData.id });
  }

  function handleDislike() {
    dislikeMutation.mutate({ postId: commentData.post.id, commentId: commentData.id });
  }

  return (
    <div ref={forwardRef}>
      <p>
        <strong>{commentData.author.username}</strong>
        {commentData.content}
      </p>
      <p>
        {commentData.likes} likes {commentData.dislikes} dislikes
      </p>
      <Button type="button" onClick={handleLike}>
        Like
      </Button>
      <Button type="button" onClick={handleDislike}>
        Dislike
      </Button>
    </div>
  );
};
export default CommentCard;

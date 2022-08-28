import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IComment } from "dtos";
import { FC } from "react";
import { dislikeComment, likeComment } from "../../api/commentApi";
import Button from "./Button";

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
    <div ref={forwardRef} className="mb-2 border-black border-2 rounded-lg">
      <p>
        <strong className="block">{commentData.author.username}</strong>
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

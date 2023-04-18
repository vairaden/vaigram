import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { ChangeEvent, FC, FormEvent, useState } from "react";
import { z } from "zod";
import { refreshAccess } from "../api/authApi";
import { createComment } from "../api/commentApi";
import Button from "../../entities/Button";

interface IParams {
  postId: string;
}

const CommentCreator: FC<IParams> = ({ postId }) => {
  const [comment, setComment] = useState("");

  const commentValidator = z.string().max(1000);

  const queryClient = useQueryClient();
  const { data: user } = useQuery(["user"], () => refreshAccess());
  const addCommentMutation = useMutation(
    (data: { postId: string; comment: string }) => createComment(data),
    {
      onSuccess: () => queryClient.invalidateQueries(["comments"]),
    }
  );

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    commentValidator.parse(comment);

    addCommentMutation.mutate({ postId, comment });
    setComment("");
  }

  return (
    <div>
      {user ? (
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <label>
            Add comment
            <textarea
              name="description"
              value={comment}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setComment(e.target.value)}
            />
          </label>
          <Button type="submit">Send</Button>
        </form>
      ) : (
        <div>
          <p>You are not logged in to leave comments</p>
          <Link href="/login">
            <a>Login</a>
          </Link>
        </div>
      )}
    </div>
  );
};
export default CommentCreator;

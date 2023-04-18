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
    <div className="flex flex-col border-black border-2 rounded-lg bg-white overflow-hidden w-[23rem]">
      {user ? (
        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="flex flex-col text-center"
        >
          <label>
            Add comment
            <textarea
              className="block my-2 w-full border-2"
              name="description"
              value={comment}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setComment(e.target.value)}
            />
          </label>
          <Button type="submit" className="w-fit mx-auto my-2">
            Send
          </Button>
        </form>
      ) : (
        <div className="px-4">
          <p>You are not logged in to leave comments</p>
          <Link href="/login">
            <a className="underline text-gray-700">Login</a>
          </Link>
        </div>
      )}
    </div>
  );
};
export default CommentCreator;

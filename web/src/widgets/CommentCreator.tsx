import { ChangeEvent, FormEvent, useState } from "react";
import { z } from "zod";
import { refreshAccess } from "../shared/api/authApi";
import { createComment } from "../shared/api/commentApi";
import Button from "../shared/ui/Button";
import { Link } from "react-router-dom";

export default function CommentCreator({ postId }: { postId: string }) {
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
          <Link to="/login">Login</Link>
        </div>
      )}
    </div>
  );
}

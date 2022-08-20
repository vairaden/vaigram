import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IPost } from "dtos";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { deletePost } from "../../api/postApi";
import Button from "./Button";

interface IProps {
  postData: IPost;
  forwardRef?: (node: HTMLElement) => void;
  allowDeletion?: boolean;
}

const PostCard: FC<IProps> = ({ postData, forwardRef, allowDeletion = false }) => {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation((postId: string) => deletePost(postId), {
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
    },
  });

  async function handleDelete() {
    deleteMutation.mutate(postData.id);
  }

  return (
    <article className="my-4" ref={forwardRef}>
      <Image
        width="400px"
        height="400px"
        src={`${process.env.NEXT_PUBLIC_API_URL}/api/images/${postData.id}`}
        alt={postData.description}
      />
      <div>
        <h2>Author: {postData.author.username}</h2>
        <p>{postData.description}</p>
        <Link href={`/posts/${postData.id}`}>
          <a>Open</a>
        </Link>
        <Button type="button">Like</Button>
        {allowDeletion && (
          <Button type="button" onClick={handleDelete}>
            Delete
          </Button>
        )}
      </div>
    </article>
  );
};

export default PostCard;

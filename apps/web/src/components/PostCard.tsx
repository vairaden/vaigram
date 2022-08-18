import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IPost } from "dtos";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { deletePost } from "../api/postApi";
import Button from "./Button";

interface IProps {
  ref?: (node: HTMLElement) => void;
  postData: IPost;
}

const PostCard: FC<IProps> = ({ ref = null, postData }) => {
  const queryClient = useQueryClient();
  const deleteMutation = useMutation(["posts"], () => deletePost(postData.id), {
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
    },
  });

  async function handleDelete() {
    deleteMutation.mutate();
  }

  return (
    <article className="my-4">
      <Image
        width="400px"
        height="400px"
        src={`${process.env.NEXT_PUBLIC_API_URL}/api/images/${postData.id}`}
        alt={postData.description}
      />
      <div>
        <h3>Author: {postData.author.username}</h3>
        <p>{postData.description}</p>
        <Link href={`/posts/${postData.id}`}>
          <a>Open</a>
        </Link>
        <Button type="button">Like</Button>
        <Button type="button" onClick={handleDelete}>
          Delete
        </Button>
      </div>
    </article>
  );
};

export default PostCard;

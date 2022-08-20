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

  const unixDate = new Date(postData.createdAt);
  const date = `${unixDate.getHours()}:${unixDate.getMinutes()} / ${unixDate.getDate()}.${unixDate.getMonth()}.${unixDate.getFullYear()}`;

  return (
    <article className="my-4" ref={forwardRef}>
      <Link href={`users/${postData.author.id}`}>
        <a className="flex mb-1">
          <Image
            className="rounded-[40px]"
            width="40px"
            height="40px"
            src={`${process.env.NEXT_PUBLIC_API_URL}/api/images/${postData.author.profilePicture}`}
            alt="Profile pic"
          />
          <h2 className="p-2">{postData.author.username}</h2>
          <p className="pt-[14px] text-xs text-gray-600">{date}</p>
        </a>
      </Link>
      <Image
        width="400px"
        height="400px"
        src={`${process.env.NEXT_PUBLIC_API_URL}/api/images/${postData.id}`}
        alt={postData.description}
      />
      <div>
        <p>
          <strong className="pr-2">{postData.author.username}</strong>
          {postData.description}
        </p>
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

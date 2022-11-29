import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { deletePost, dislikePost, likePost } from "../../api/postApi";
import Button from "./Button";

interface IPost {
  id: string;
  author: {
    id: string;
    profilePicture: string | null;
    username: string;
  };
  description: string;
  image: string;
  likes: number;
  dislikes: number;
  createdAt: Date;
  updatedAt: Date;
}

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

  const likeMutation = useMutation((postId: string) => likePost(postId), {
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
    },
  });

  const dislikeMutation = useMutation((postId: string) => dislikePost(postId), {
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
    },
  });

  function handleDelete() {
    deleteMutation.mutate(postData.id);
  }

  function handleLike() {
    likeMutation.mutate(postData.id);
  }

  function handleDislike() {
    dislikeMutation.mutate(postData.id);
  }

  const unixDate = new Date(postData.createdAt);
  const date = `${unixDate.getHours()}:${unixDate.getMinutes()} / ${unixDate.getDate()}.${unixDate.getMonth()}.${unixDate.getFullYear()}`;

  return (
    <article className="mb-4 border-black border-2 rounded-lg" ref={forwardRef}>
      <div className="flex m-1 justify-between">
        <Link href={`/users/${postData.author.id}`}>
          <a className="flex">
            <Image
              className="rounded-[40px]"
              width="40px"
              height="40px"
              src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_PATH}/${postData.author.profilePicture}`}
              alt="Profile pic"
            />
            <h2 className="pt-2 mx-1">{postData.author.username}</h2>
            <p className="pt-[14px] text-xs text-gray-600">{date}</p>
          </a>
        </Link>
        {allowDeletion && (
          <Button type="button" onClick={handleDelete}>
            Delete
          </Button>
        )}
      </div>
      <Image
        width="400px"
        height="400px"
        src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_PATH}/${postData.image}`}
        alt={postData.description}
      />
      <div className="flex justify-between mx-1">
        <p>
          {postData.likes} likes {postData.dislikes} dislikes
        </p>
        <Button type="button" onClick={handleLike}>
          Like
        </Button>
        <Button type="button" onClick={handleDislike}>
          Dislike
        </Button>
      </div>
      <p>
        <strong className="mx-1 font-bold">{postData.author.username}</strong>
        {postData.description}
      </p>

      <Link href={`/posts/${postData.id}`}>
        <a className="m-1">View more...</a>
      </Link>
    </article>
  );
};

export default PostCard;

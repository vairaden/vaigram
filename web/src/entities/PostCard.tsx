import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { deletePost, dislikePost, likePost } from "../shared/api/postApi";
import Button from "../shared/ui/Button";

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
    <article ref={forwardRef}>
      <div>
        <Link href={`/users/${postData.author.id}`}>
          <a>
            {/* // <Image
            //   width="40px"
            //   height="40px"
            //   src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_PATH}/${postData.author.profilePicture}`}
            //   alt="Profile pic"
            // /> */}
            <h2>{postData.author.username}</h2>
            <p>{date}</p>
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
      <div>
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
        <strong>{postData.author.username}</strong>
        {postData.description}
      </p>

      <Link href={`/posts/${postData.id}`}>
        <a>View more...</a>
      </Link>
    </article>
  );
};

export default PostCard;

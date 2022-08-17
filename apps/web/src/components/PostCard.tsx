import { IPost } from "dtos";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

interface IProps {
  ref?: (node: HTMLElement) => void;
  postData: IPost;
}

const PostCard: FC<IProps> = ({ ref = null, postData }) => {
  async function handleDelete() {}

  return (
    <>
      <Image
        src={`${process.env.NEXT_PUBLIC_API_URL}/api/image/${postData.id}`}
        alt={postData.description}
      />
      <div>
        <h3>Author: {postData.author.username}</h3>
        <p>{postData.description}</p>
        <Link href={`/post/${postData.id}`}>Open</Link>
        <button type="button">Like</button>
        <button type="button" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </>
  );
};

export default PostCard;

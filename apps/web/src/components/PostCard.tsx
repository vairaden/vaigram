import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

interface IProps {
  ref?: (node: HTMLElement) => void;
  postData: IPost;
  deleteCallback: () => void;
}

const PostCard: FC<IProps> = ({ ref = null, postData, deleteCallback }) => {
  async function handleDelete() {}

  return (
    <>
      <Image
        src={`${import.meta.env.VITE_BASE_URL}/api/image/${postData.id}`}
        alt={postData.description}
      />
      <div>
        <h3>Author: {postData.author.username}</h3>
        <p>{postData.description}</p>
        <Link href={`/post/${postData.id}`}>Open</Link>
        <button type="button" onClick={handleLike}>
          Like
        </button>
        <button type="button" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </>
  );
};

export default PostCard;

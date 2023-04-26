import { deletePost, dislikePost, likePost } from "../shared/api/postApi";
import Button from "../shared/ui/Button";
import { Link } from "react-router-dom";

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

export default function PostCard({
  postData,
  forwardRef,
  allowDeletion = false,
}: {
  postData: IPost;
  forwardRef?: (node: HTMLElement) => void;
  allowDeletion?: boolean;
}) {
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
        <Link to={`/users/${postData.author.id}`}>
          {/* // <Image
            //   width="40px"
            //   height="40px"
            //   src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_PATH}/${postData.author.profilePicture}`}
            //   alt="Profile pic"
            // /> */}
          <h2>{postData.author.username}</h2>
          <p>{date}</p>
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

      <Link to={`/posts/${postData.id}`}>View more...</Link>
    </article>
  );
}

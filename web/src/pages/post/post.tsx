import { getOnePost } from "../../shared/api/postApi";
import CommentCreator from "../../widgets/CommentCreator";
import CommentList from "../../widgets/CommentList";

const Post = () => {
  const router = useRouter();
  const id = router.query.id as string;

  const { isLoading, error, data } = useQuery(["post", id], () => getOnePost(id), {
    enabled: !!id,
  });

  return (
    <>
      <Head>
        <title>Post</title>
      </Head>
      {isLoading ? (
        <h2>Loading</h2>
      ) : error || !data ? (
        <h2>Error</h2>
      ) : (
        <>
          <article>
            <Image
              width="400px"
              height="400px"
              src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_PATH}/${data.image}`}
              alt={data.description}
            />
          </article>
          <section>
            <CommentCreator postId={id} />
            <CommentList limit={5} postId={id} />
          </section>
        </>
      )}
    </>
  );
};
export default Post;

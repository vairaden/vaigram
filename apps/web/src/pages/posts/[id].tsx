import { useQuery } from "@tanstack/react-query";
import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { getOnePost } from "../../api/postApi";
import CommentCreator from "../../components/ui/CommentCreator";
import CommentList from "../../components/ui/CommentList";

const Post: NextPage = () => {
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
              src={`${process.env.NEXT_PUBLIC_API_URL}/api/images/${data.image}`}
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

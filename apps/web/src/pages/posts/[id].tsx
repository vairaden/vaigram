import { useQuery } from "@tanstack/react-query";
import { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { getOnePost } from "../../api/postApi";

const Post: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const { isLoading, error, data } = useQuery(["post", id], () => getOnePost(id as string), {
    enabled: !!id,
  });

  if (error) return <h2>Error</h2>;
  if (isLoading || !data) return <h2>Loading</h2>;

  return (
    <>
      <Image
        width="400px"
        height="400px"
        src={`${process.env.NEXT_PUBLIC_API_URL}/api/images/${data.id}`}
        alt={data.description}
      />
    </>
  );
};
export default Post;
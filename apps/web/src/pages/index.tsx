import { IPost } from "dtos";
import type { NextPage } from "next";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getMultiplePosts } from "../api/postApi";
import PostCard from "../components/PostCard";
import PostCreator from "../components/PostCreator";
import { logoutUser } from "../api/authApi";

const Home: NextPage = () => {
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const postLimit = 10;

  const { isLoading, error, data } = useQuery(["posts", postLimit, pageNumber], () =>
    getMultiplePosts(postLimit, pageNumber)
  );

  if (isLoading) {
    return <h2>Loading</h2>;
  }

  if (error) {
    return <h2>Error connecting to server</h2>;
  }

  return (
    <>
      <PostCreator />
      <section>
        {data!.map((post: IPost) => (
          <PostCard key={post.id} postData={post} />
        ))}
      </section>
    </>
  );
};

export default Home;

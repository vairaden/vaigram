import { IPost } from "dtos";
import type { NextPage } from "next";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getMultiplePosts } from "../api/postApi";
import PostCard from "../components/PostCard";
import PostCreator from "../components/PostCreator";

const Home: NextPage = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const postLimit = 10;

  const { isLoading, error, data } = useQuery(["posts"], () =>
    getMultiplePosts(postLimit, pageNumber)
  );

  if (error) {
    return <main>Error connecting to server</main>;
  }

  if (isLoading) {
    return <main>Loading</main>;
  }

  return (
    <>
      <PostCreator />
      {posts.map((post: IPost, index: number) => (
        <PostCard key={post.id} postData={post} />
      ))}
    </>
  );
};

export default Home;

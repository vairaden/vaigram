import { IPost } from "dtos";
import type { NextPage } from "next";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getMultiplePosts } from "../api/postApi";
import PostCard from "../components/ui/PostCard";
import PostCreator from "../components/ui/PostCreator";
import Head from "next/head";
import ListItemsAnimation from "../components/animations/ListItemsAnimation";

const Home: NextPage = () => {
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const postLimit = 10;

  const { isLoading, error, data } = useQuery(["posts", postLimit, pageNumber], () =>
    getMultiplePosts(postLimit, pageNumber)
  );
  return (
    <>
      <Head>
        <title>Vaigram</title>
      </Head>
      {isLoading ? (
        <h2>Loading</h2>
      ) : error || !data ? (
        <h2>Error connecting to server</h2>
      ) : (
        <>
          <PostCreator />
          <ul>
            <ListItemsAnimation>
              {data.map((post: IPost) => (
                <PostCard postData={post} key={post.id} />
              ))}
            </ListItemsAnimation>
          </ul>
        </>
      )}
    </>
  );
};

export default Home;

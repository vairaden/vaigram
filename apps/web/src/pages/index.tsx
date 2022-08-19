import { IPost } from "dtos";
import type { NextPage } from "next";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getMultiplePosts } from "../api/postApi";
import PostCard from "../components/PostCard";
import PostCreator from "../components/PostCreator";
import Head from "next/head";
import { AnimatePresence, motion } from "framer-motion";

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
            <AnimatePresence mode="popLayout">
              {data.map((post: IPost) => (
                <motion.li
                  key={post.id}
                  layout
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ type: "spring" }}
                >
                  <PostCard postData={post} />
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        </>
      )}
    </>
  );
};

export default Home;

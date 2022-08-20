import type { NextPage } from "next";
import React from "react";
import PostCreator from "../components/ui/PostCreator";
import Head from "next/head";
import PostList from "../components/ui/PostList";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Vaigram</title>
      </Head>
      <PostCreator />
      <PostList limit={5} pagesToKeep={10} />
    </>
  );
};

export default Home;

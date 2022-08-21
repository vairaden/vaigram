import type { NextPage } from "next";
import React from "react";
import Head from "next/head";
import PostList from "../components/ui/PostList";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Vaigram</title>
      </Head>
      <PostList limit={5} pagesToKeep={4} />
    </>
  );
};

export default Home;

import type { NextPage } from "next";
import React, { useState } from "react";
import Head from "next/head";
import PostList from "../components/ui/PostList";

const Home: NextPage = () => {
  const [queryValue, setQueryValue] = useState("");

  return (
    <>
      <Head>
        <title>Vaigram</title>
      </Head>
      <section>
        <label>
          Filter:
          <input value={queryValue} onChange={(e) => setQueryValue(e.target.value)} />
        </label>
      </section>
      <PostList limit={5} pagesToKeep={4} />
    </>
  );
};

export default Home;

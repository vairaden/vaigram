import type { NextPage } from "next";
import { useState } from "react";
import PostCard from "../components/PostCard";
import PostCreator from "../components/PostCreator";

const Home: NextPage = () => {
  const [isError, setError] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [posts, setPosts] = useState<IPost[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const postLimit = 10;

  if (isError) {
    return <div>Error connecting to server</div>;
  }
  if (isLoading) {
    return <main>Loading</main>;
  }
  return (
    <>
      <PostCreator postAddedCallback={refreshCallback} />

      {posts.map((post: IPost, index: number) =>
        posts.length === index ? (
          <PostCard
            ref={intersectionObserverRef}
            key={post.id}
            postData={post}
            deleteCallback={refreshCallback}
          />
        ) : (
          <PostCard key={post.id} postData={post} deleteCallback={refreshCallback} />
        )
      )}
    </>
  );
};

export default Home;

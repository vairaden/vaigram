import PostList from "../shared/ui/PostList";

const Home = () => {
  return <PostList limit={5} pagesToKeep={4} />;
};

export default Home;

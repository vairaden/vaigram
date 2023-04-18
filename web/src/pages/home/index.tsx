import PostList from "../../widgets/PostList";

const Home = () => {
  return <PostList limit={5} pagesToKeep={4} />;
};

export default Home;

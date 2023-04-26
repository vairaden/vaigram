import PostList from "../../widgets/PostList";

export default function HomePage() {
  return <PostList limit={5} pagesToKeep={4} />;
}

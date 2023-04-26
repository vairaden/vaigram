import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <>
      <h2>Page not found</h2>
      <Link to="/">Return home</Link>
    </>
  );
}

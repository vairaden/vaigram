import { NextPage } from "next";
import Link from "next/link";

const NotFoundPage: NextPage = () => {
  return (
    <>
      <h2>Page not found</h2>
      <Link href="/">
        <a className="underline">Return home</a>
      </Link>
    </>
  );
};

export default NotFoundPage;

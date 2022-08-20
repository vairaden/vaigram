import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { FC } from "react";
import { refreshAccess } from "../../api/authApi";
import useTheme from "../../hooks/useTheme";
import Button from "./Button";

const Navbar: FC = () => {
  const [isDarkTheme, setDarkTheme] = useTheme();

  const { data: user } = useQuery(["user"], () => refreshAccess());

  return (
    <nav className="transition-colors duration-300 bg-orange-400 dark:bg-black">
      <div className="transition-colors duration-300 mx-auto w-96 p-2 flex justify-between bg-orange-400 dark:bg-black">
        <Link href="/">
          <a>
            <h1 className="text-center mr-auto">Vaigram</h1>
          </a>
        </Link>
        <div className="space-x-4">
          <Button onClick={() => setDarkTheme((prev) => !prev)}>
            {isDarkTheme ? "Dark" : "Light"}
          </Button>
          {user ? (
            <Link href={`/users/${user.id}`}>
              <a>{user.username}</a>
            </Link>
          ) : (
            <Link href="/login">
              <a>Login</a>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};
export default Navbar;

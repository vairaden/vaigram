import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import { refreshAccess } from "../../api/authApi";
import useTheme from "../../hooks/useTheme";
import Button from "./Button";
import PostCreator from "./PostCreator";
import { AnimatePresence, motion, useScroll } from "framer-motion";

const Navbar: FC = () => {
  const [isDarkTheme, setDarkTheme] = useTheme();
  const [creatorOpened, setCreatorOpened] = useState(false);

  const { data: user } = useQuery(["user"], () => refreshAccess());
  const { scrollY } = useScroll();
  const [navVisible, setNavVisible] = useState(true);

  const navVariants = {
    hidden: { translateY: "-3rem" },
    visible: { translateY: "0.5rem" },
  };

  useEffect(() => {
    return scrollY.onChange(() => {
      if (scrollY.getVelocity() > 0) {
        setNavVisible(false);
      } else {
        setNavVisible(true);
      }
    });
  });

  return (
    <>
      <AnimatePresence>
        {creatorOpened && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
            exit={{ opacity: 0 }}
            transition={{ type: "tween" }}
            onClick={() => setCreatorOpened(false)}
            className="fixed z-20 w-[100%] h-[100%] left-0 top-0 bg-black"
          ></motion.div>
        )}
      </AnimatePresence>
      <PostCreator
        isOpened={creatorOpened}
        closeCallback={() => setCreatorOpened((prev) => !prev)}
      />
      <motion.nav
        animate={navVisible ? "visible" : "hidden"}
        variants={navVariants}
        initial={{ translateX: "-50%" }}
        className="fixed left-[50%] z-10 w-[23rem] py-2 px-4
      flex justify-between rounded-[200px] bg-orange-400 dark:bg-black transition-colors duration-300"
      >
        <Link href="/">
          <a>
            <h1 className="text-center mr-auto">Vaigram</h1>
          </a>
        </Link>
        <Button onClick={() => setCreatorOpened((prev) => !prev)}>
          {creatorOpened ? "Close" : "New post"}
        </Button>
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
      </motion.nav>
    </>
  );
};
export default Navbar;

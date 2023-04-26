import { FC, useEffect, useState } from "react";
import { refreshAccess } from "../shared/api/authApi";
import useTheme from "../../hooks/useTheme";
import Button from "../shared/ui/Button";
import PostCreator from "./PostCreator";
import PlusButton from "../shared/ui/PlusButton";
import { Link } from "react-router-dom";

export default function Navbar() {
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
      <motion.nav
        animate={navVisible || creatorOpened ? "visible" : "hidden"}
        variants={navVariants}
        initial={{ translateX: "-50%" }}
      >
        <Link to="/">
          <h1>Vaigram</h1>
        </Link>
        <PlusButton onClick={() => setCreatorOpened((prev) => !prev)} isActive={creatorOpened} />
        <div>
          <Button onClick={() => setDarkTheme((prev) => !prev)}>
            {isDarkTheme ? "Dark" : "Light"}
          </Button>
          {user ? (
            <Link to={`/users/${user.id}`}>{user.username}</Link>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </div>
      </motion.nav>
      <div></div>
      <PostCreator
        isOpened={creatorOpened}
        closeCallback={() => setCreatorOpened((prev) => !prev)}
      />
      <AnimatePresence>
        {creatorOpened && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
            exit={{ opacity: 0 }}
            transition={{ type: "tween" }}
            onClick={() => setCreatorOpened(false)}
          ></motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

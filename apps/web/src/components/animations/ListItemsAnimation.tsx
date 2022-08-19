import { AnimatePresence, motion } from "framer-motion";
import React, { FC, ReactNode } from "react";

interface IProps {
  children: ReactNode;
}

const ListItemsAnimation: FC<IProps> = ({ children }) => {
  return (
    <AnimatePresence mode="popLayout">
      {React.Children.map(children, (child) => (
        <motion.li
          layout
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: "spring" }}
        >
          {child}
        </motion.li>
      ))}
    </AnimatePresence>
  );
};
export default ListItemsAnimation;

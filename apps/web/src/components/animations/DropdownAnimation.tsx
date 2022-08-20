import { AnimatePresence, motion } from "framer-motion";
import { FC, ReactNode } from "react";

interface IProps {
  children: ReactNode;
  isOpen: boolean;
}

const DropdownAnimation: FC<IProps> = ({ children, isOpen }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, clipPath: "polygon(0 0, 0 0, 100% 0, 100% 0)" }}
          animate={{
            height: "auto",
            clipPath: "polygon(0 0, 0 100%, 100% 100%, 100% 0)",
          }}
          exit={{ height: 0, clipPath: "polygon(0 0, 0 0, 100% 0, 100% 0)" }}
          transition={{ type: "tween" }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
export default DropdownAnimation;

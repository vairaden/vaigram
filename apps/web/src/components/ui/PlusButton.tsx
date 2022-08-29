import { motion } from "framer-motion";
import Image from "next/image";
import { FC } from "react";

interface IProps {
  onClick: () => void;
  isActive: boolean;
}

const PlusButton: FC<IProps> = ({ onClick, isActive }) => {
  return (
    <motion.div
      onClick={onClick}
      animate={isActive ? { rotate: 45 } : { rotate: 0 }}
      className="cursor-pointer z-50"
    >
      <Image src="/plus-icon.svg" width="32px" height="32px" alt="Add post button" />
    </motion.div>
  );
};
export default PlusButton;

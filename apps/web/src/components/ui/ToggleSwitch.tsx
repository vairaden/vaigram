import { motion } from "framer-motion";
import { FC, ReactNode, useState } from "react";

interface IProps {
  children: ReactNode;
  isOn: boolean;
  onClick: () => void;
  className?: string;
}

const ToggleSwitch: FC<IProps> = ({ children, className, isOn, onClick }) => {
  const switchVariants = {
    on: {
      backgroundColor: "#fb923c",
    },
    off: {
      backgroundColor: "#dddddd",
    },
  };
  const innerVariants = {
    on: {
      x: "20px",
    },
    off: {
      x: "0px",
    },
  };

  return (
    <label className={`flex justify-between ${className}`}>
      {children}
      <motion.div
        animate={isOn ? "on" : "off"}
        variants={switchVariants}
        className="w-[48px] h-[28px] rounded-[24px] p-[4px]"
      >
        <motion.div
          variants={innerVariants}
          className="w-[20px] h-[20px] bg-white rounded-[40px] shadow-md"
        />
      </motion.div>
      <input
        className="hidden"
        type="toggle"
        checked={isOn}
        onChange={() => {
          console.log("kek");
        }}
        onClick={onClick}
      />
    </label>
  );
};

export default ToggleSwitch;

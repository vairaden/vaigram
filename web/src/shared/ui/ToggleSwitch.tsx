import { FC, ReactNode } from "react";

interface IProps {
  children: ReactNode;
  isOn: boolean;
  onClick: () => void;
}

const ToggleSwitch: FC<IProps> = ({ children, isOn, onClick }) => {
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
    <label>
      {children}
      <motion.div animate={isOn ? "on" : "off"} variants={switchVariants}>
        <motion.div variants={innerVariants} />
      </motion.div>
      <input
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

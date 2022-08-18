import { FC, ReactNode } from "react";

interface IProps {
  children: ReactNode;
  type?: "button" | "submit" | "reset" | undefined;
  onClick?: () => void;
}

const Button: FC<IProps> = ({ children, onClick, type }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="px-2 border-2 rounded border-black bg-orange-200 cursor-pointer"
    >
      {children}
    </button>
  );
};
export default Button;

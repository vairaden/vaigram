import { FC, ReactNode } from "react";

interface IProps {
  children: ReactNode;
  type?: "button" | "submit" | "reset" | undefined;
  onClick?: () => void;
}

const Button: FC<IProps> = ({ children, onClick, type }) => {
  return (
    <button type={type} onClick={onClick}>
      {children}
    </button>
  );
};
export default Button;

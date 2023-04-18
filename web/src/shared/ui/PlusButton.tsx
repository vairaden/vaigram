import { FC } from "react";

interface IProps {
  onClick: () => void;
  isActive: boolean;
}

const PlusButton: FC<IProps> = ({ onClick, isActive }) => {
  return (
    <div onClick={onClick}>
      <svg
        width="32"
        height="32"
        viewBox="0 0 72 72"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="plus icon">
          <rect id="horizontal line" y="30" width="72" height="12" rx="4" fill="#ffff" />
          <rect id="vertical line" x="30" width="12" height="72" rx="4" fill="#ffff" />
        </g>
      </svg>
    </div>
  );
};
export default PlusButton;

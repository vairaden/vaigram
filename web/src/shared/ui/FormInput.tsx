import { ChangeEvent, FC, ReactNode } from "react";

interface IProps {
  children: ReactNode;
  name: string;
  type: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  checked?: boolean;
}

const FormInput: FC<IProps> = ({ children, name, type, onChange, value, checked }) => {
  return (
    <label>
      {children}
      <input name={name} type={type} onChange={onChange} value={value} checked={checked} />
    </label>
  );
};
export default FormInput;

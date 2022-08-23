import { FC, ReactNode } from "react";
import Navbar from "./ui/Navbar";

interface IProps {
  children: ReactNode;
}

const Layout: FC<IProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className="p-2 w-96 mx-auto">{children}</main>
    </>
  );
};
export default Layout;

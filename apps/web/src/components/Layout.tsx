import { FC, ReactNode } from "react";
import Navbar from "./ui/Navbar";

interface IProps {
  children: ReactNode;
}

const Layout: FC<IProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="h-14"></div>
      <main className="p-2 w-96 mx-auto">{children}</main>
    </>
  );
};
export default Layout;

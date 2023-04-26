import { Outlet } from "react-router-dom";
import Navbar from "../widgets/Navbar";

export default function DefaultLayout() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </>
  );
}

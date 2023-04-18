import Navbar from "../shared/ui/Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="p-2 w-96 mx-auto">{children}</main>
    </>
  );
}

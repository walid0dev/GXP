import { Outlet } from "react-router-dom";
import NavBar from "./components/Navbar";
const MainLayout = () => {
  return (
    <>
      <NavBar />
      <main className="px-4">
        <Outlet />
      </main>
    </>
  );
};

export default MainLayout;

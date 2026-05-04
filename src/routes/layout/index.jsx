import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <>
      <nav></nav>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default MainLayout;

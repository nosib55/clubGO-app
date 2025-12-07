import { Outlet } from "react-router-dom";
import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer";

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-6xl mx-auto w-full px-3 md:px-0 py-6">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;

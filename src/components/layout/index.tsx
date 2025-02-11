import { Sidebar } from "./Sidebar";
import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Outlet />
      <Sidebar />
      <Toaster position="top-right" />
    </div>
  );
};

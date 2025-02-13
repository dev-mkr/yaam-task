import { Sidebar } from "./Sidebar";
import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <div className="flex flex-col gap-x-5 bg-gray-50 md:flex-row">
      <Sidebar />
      <Outlet />
      <Toaster position="top-right" />
    </div>
  );
};

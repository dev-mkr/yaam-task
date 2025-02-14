import { ErrorBoundary } from "react-error-boundary";
import { Sidebar } from "./Sidebar";
import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
import { GlobalError } from "@/components/shared/GlobalError";

export const Layout = () => {
  return (
    <div className="flex flex-col gap-x-5 bg-gray-50 md:flex-row">
      <Sidebar />
      <ErrorBoundary fallback={<GlobalError />}>
        <Outlet />
      </ErrorBoundary>
      <Toaster position="top-center" />
    </div>
  );
};

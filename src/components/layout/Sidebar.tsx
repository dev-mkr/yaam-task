import { lazy, Suspense } from "react";
import { Home, LoaderCircle, Package, Settings } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";
import { SidebarRoute } from "./layout.type";

const MobileMenu = lazy(() =>
  import("./MobileMenu").then((module) => ({ default: module.MobileMenu }))
);

const routes: SidebarRoute[] = [
  { href: "/", label: "Refunded Orders", icon: Home },
  { href: "/orders", label: "Orders", icon: Package, disabled: true },
  { href: "/settings", label: "Settings", icon: Settings, disabled: true },
];

export const Sidebar = () => {
  const { pathname } = useLocation();

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="sticky start-0 top-0 hidden min-h-screen w-64 bg-black p-4 text-white md:block">
        <div className="mb-8 text-xl font-bold">Dashboard</div>
        <nav className="space-y-4">
          {routes.map(({ href, label, icon: Icon, disabled }) => (
            <Link
              key={href}
              to={disabled ? "" : href}
              className={clsx(
                "flex items-center space-x-2 rounded p-2 hover:bg-gray-800",
                {
                  "bg-gray-800": pathname === href,
                  "cursor-not-allowed opacity-50": disabled,
                }
              )}
            >
              <Icon size={20} />
              <span>{label}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Mobile Menu Button */}
      <Suspense
        fallback={
          <div className="sticky left-4 top-4 z-40 w-fit rounded-lg bg-black p-2 text-white hover:bg-black/70 md:hidden">
            <LoaderCircle size={24} className="animate-spin" />
          </div>
        }
      >
        <MobileMenu routes={routes} selectedPage={pathname} />
      </Suspense>
    </>
  );
};

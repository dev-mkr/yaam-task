import { FC, useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Menu, X } from "lucide-react";
import { SidebarRoute } from "./layout.type";
import { Link } from "react-router-dom";
import clsx from "clsx";

interface Props {
  routes: SidebarRoute[];
  selectedPage: string;
}

export const MobileMenu: FC<Props> = ({ routes, selectedPage }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="z-40 m-4 w-fit rounded-lg bg-black p-2 text-white hover:bg-gray-800 md:hidden"
      >
        <Menu size={24} />
      </button>

      {/* Mobile Menu */}
      <Dialog
        as="div"
        open={isOpen}
        className="relative z-50"
        onClose={() => setIsOpen(false)}
      >
        {/* Overlay */}
        <div className="fixed inset-0 bg-black/50" />

        {/* Sidebar Content */}
        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 left-0 flex max-w-full">
              <DialogPanel className="pointer-events-auto relative w-64 max-w-md">
                <div className="flex h-full flex-col bg-gray-900 p-4 text-white">
                  {/* Close Button */}
                  <div className="mb-8 flex items-center justify-between">
                    <div className="text-xl font-bold">Refund Dashboard</div>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="rounded-lg p-2 hover:bg-gray-800"
                    >
                      <X size={24} />
                    </button>
                  </div>

                  {/* Navigation Links */}
                  <nav className="space-y-4">
                    {routes.map(({ href, label, icon: Icon, disabled }) => (
                      <Link
                        key={href}
                        to={disabled ? "" : href}
                        onClick={() => setIsOpen(false)}
                        className={clsx(
                          "flex items-center space-x-2 rounded p-2 hover:bg-gray-800",
                          {
                            "bg-gray-800": selectedPage === href,
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
              </DialogPanel>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
};

import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  MenuItemsProps,
} from "@headlessui/react";
import { FC, ReactNode } from "react";

interface Props {
  buttonLabel: string;
  items: { id: string; label: string; icon?: ReactNode }[];
  onSelect: (id: string) => void;
  anchor?: MenuItemsProps["anchor"];
  selectedId?: string;
}

export const DropdownMenu: FC<Props> = ({
  buttonLabel,
  items,
  onSelect,
  anchor = "bottom end",
  selectedId,
}) => {
  return (
    <Menu as="div" className="relative">
      <MenuButton className="items-center gap-x-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 shadow-sm hover:bg-gray-50 focus:bg-gray-50 disabled:pointer-events-none disabled:opacity-50">
        {buttonLabel}
      </MenuButton>

      <MenuItems
        transition
        anchor={anchor}
        className="mt-2 w-36 origin-top rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition duration-100 ease-out focus:outline-none"
      >
        <div className="flex flex-col gap-2 p-2">
          {items.map(({ id, label, icon }) => (
            <MenuItem key={id}>
              <button
                onClick={() => onSelect(id)}
                className={
                  "flex w-full items-center justify-between gap-x-3.5 rounded-lg px-3 py-2 text-sm text-gray-800 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none disabled:bg-gray-100"
                }
                disabled={selectedId === id}
              >
                {label} {icon}
              </button>
            </MenuItem>
          ))}
        </div>
      </MenuItems>
    </Menu>
  );
};

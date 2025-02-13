import clsx from "clsx";
import { FC, PropsWithChildren } from "react";

export enum BadgeVariant {
  Default = "default",
  Warning = "warning",
  Error = "error",
  Success = "success",
}

interface BadgeProps {
  variant?: BadgeVariant;
  className?: string;
}

export const Badge: FC<PropsWithChildren<BadgeProps>> = ({
  variant = "default",
  className,
  children,
}) => {
  const classes = clsx(
    "inline-flex items-center rounded-md px-2 py-1 text-xs font-medium  ring-1 ring-inset",
    {
      "bg-gray-50  text-gray-600 ring-gray-500/10": variant === "default",
      "bg-red-50  text-red-700 ring-red-600/10": variant === "error",
      "bg-yellow-50  text-yellow-800 ring-yellow-600/20": variant === "warning",
      "bg-green-50  text-green-700 ring-green-600/20 ": variant === "success",
      className,
    }
  );
  return <span className={classes}>{children}</span>;
};

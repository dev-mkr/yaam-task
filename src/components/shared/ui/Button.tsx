import React from "react";
import { clsx } from "clsx";
import { Loader2 } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  isFullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isIconOnly?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      variant = "ghost",
      size = "md",
      isLoading = false,
      isFullWidth = false,
      leftIcon,
      rightIcon,
      isIconOnly = false,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center rounded-md font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:pointer-events-none";

    // can be divided this into separate variables for color (primary, secondary, error, etc.)
    // and variant (contained,outlined, etc.) for easier customization but for simplicity we keep it as is
    const variants = {
      primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
      secondary:
        "bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500",
      outline:
        "border border-gray-300 bg-transparent hover:bg-gray-100 focus:ring-gray-500",
      ghost:
        "text-gray-700 bg-transparent hover:bg-gray-100 focus:ring-gray-500",
    };

    const iconVariants = {
      primary: "hover:bg-blue-700",
      secondary: "hover:bg-gray-300",
      outline: "border hover:bg-gray-100",
      ghost: "hover:bg-gray-100",
    };

    const sizes = {
      sm: isIconOnly ? "p-1" : "text-xs px-2 py-1",
      md: isIconOnly ? "p-1.5" : "text-sm px-3 py-1.5",
      lg: isIconOnly ? "p-2" : "text-base px-4 py-2",
    };

    const iconSizes = {
      sm: 14,
      md: 16,
      lg: 18,
    };

    return (
      <button
        ref={ref}
        className={clsx(
          baseStyles,
          isIconOnly
            ? ["hover:rounded-lg", iconVariants[variant]]
            : variants[variant],
          sizes[size],
          isFullWidth && "w-full",
          isIconOnly && "aspect-square",
          className
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <Loader2
            className="animate-spin"
            size={iconSizes[size]}
            aria-hidden="true"
          />
        ) : isIconOnly ? (
          <span aria-hidden="true">{children}</span>
        ) : (
          <>
            {leftIcon && (
              <span className="mr-1.5" aria-hidden="true">
                {leftIcon}
              </span>
            )}
            {children}
            {rightIcon && (
              <span className="ml-1.5" aria-hidden="true">
                {rightIcon}
              </span>
            )}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export type { ButtonProps };

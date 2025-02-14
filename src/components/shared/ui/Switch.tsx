import { Field, Label, Switch as SwitchPrimitive } from "@headlessui/react";
import clsx from "clsx";

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  size?: "md";
}

export const Switch = ({
  checked,
  onChange,
  label,
  size = "md",
}: SwitchProps) => {
  const sizes = {
    md: {
      switch: "w-11 h-6",
      dot: "size-4 translate-x-1",
      checked: "group-data-[checked]:translate-x-6",
    },
  };

  return (
    <Field>
      {label && <Label>{label}</Label>}
      <SwitchPrimitive
        checked={checked}
        onChange={onChange}
        className={clsx(
          "group inline-flex items-center rounded-full bg-gray-200 transition data-[checked]:bg-blue-600",
          {
            [sizes[size].switch]: true,
          }
        )}
      >
        <span
          className={clsx("rounded-full bg-white transition", {
            [sizes[size].dot]: true,
            [sizes[size].checked]: true,
          })}
        />
      </SwitchPrimitive>
    </Field>
  );
};

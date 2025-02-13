import { ElementType } from "react";

export interface SidebarRoute {
  href: string;
  label: string;
  icon: ElementType;
  disabled?: boolean;
}

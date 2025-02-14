import { ReactNode } from "react";

export enum SortDirection {
  ASC = "asc",
  DESC = "desc",
}

export interface ColumnDefinition<T> {
  header: string;
  accessor: string;
  cell?: (row: T) => ReactNode;
  align?: "left" | "center" | "right";
  sortable?: boolean;
  className?: string;
}

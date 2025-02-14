import { ReactNode } from "react";
import { ColumnDefinition, SortDirection } from "./Table.type";
import clsx from "clsx";
import { ErrorBoundary } from "react-error-boundary";
import { GlobalError } from "@/components/shared/GlobalError";
import { ArrowUp, ArrowDown } from "lucide-react";

interface Identifiable {
  id: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export interface TableProps<T> {
  columns: ColumnDefinition<T>[];
  data: T[];
  sortBy: string;
  sortDirection: SortDirection | string;
  onSortChange: (sortBy: string, sortDirection: SortDirection) => void;
  onRowClick?: (id: string) => void;
  className?: string;
  emptyTableMessage?: string | ReactNode;
  isLoading?: boolean;
  actions?: (row: T) => ReactNode;
}

export const Table = <T extends Identifiable>({
  data,
  columns,
  sortBy,
  sortDirection,
  onSortChange,
  onRowClick,
  className = "",
  emptyTableMessage,
  actions,
}: TableProps<T>) => {
  const handleRowClick = (id: string, e: React.MouseEvent) => {
    if (!onRowClick) return;
    if ((e.target as HTMLElement).closest("button")) return;
    onRowClick(id);
  };

  return (
    <ErrorBoundary fallback={<GlobalError />}>
      <div
        data-testid="table"
        className={clsx(
          "container mx-auto max-w-7xl overflow-x-auto rounded-lg border border-gray-200 shadow",
          className
        )}
      >
        <table className="h-full w-full min-w-full border-collapse divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.accessor}
                  data-testid={`header-${column.accessor}`}
                  onClick={() =>
                    column.sortable &&
                    onSortChange(
                      column.accessor,
                      sortDirection === SortDirection.ASC
                        ? SortDirection.DESC
                        : SortDirection.ASC
                    )
                  }
                >
                  <div
                    className={clsx(
                      "flex gap-2 px-6 py-3 text-xs font-medium uppercase tracking-wider text-gray-500",
                      {
                        "justify-end": column.align === "right",
                        "justify-start":
                          !column.align || column.align === "left",
                        "justify-center": column.align === "center",
                        "cursor-pointer hover:bg-gray-50": column.sortable,
                        [column.className || ""]: column.className,
                      }
                    )}
                  >
                    <span>{column.header}</span>
                    {column.sortable && sortBy === column.accessor && (
                      <span data-testid="sort-indicator">
                        {sortDirection === SortDirection.ASC ? (
                          <ArrowUp size={16} data-testid="arrow-up" />
                        ) : (
                          <ArrowDown size={16} data-testid="arrow-down" />
                        )}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 bg-white">
            {data.length === 0 ? (
              <tr data-testid="empty-row">
                <td
                  data-testid="empty-state"
                  colSpan={columns.length + (actions ? 1 : 0)}
                  className="px-6 py-4 text-center text-sm text-gray-500"
                >
                  {emptyTableMessage || "No data available"}
                </td>
              </tr>
            ) : (
              data.map((row) => (
                <tr
                  key={row.id}
                  data-testid={`row-${row.id}`}
                  onClick={(e) => handleRowClick(row.id, e)}
                  className={clsx("border-t odd:bg-white even:bg-gray-50", {
                    "cursor-pointer hover:bg-gray-100": !!onRowClick,
                  })}
                >
                  {columns.map((column) => (
                    <td
                      key={column.accessor}
                      data-testid={`cell-${column.accessor}-${row.id}`}
                      className={clsx("min-w-28 max-w-16 px-6 py-4 text-sm", {
                        "text-right": column.align === "right",
                        "text-left": !column.align || column.align === "left",
                        "text-center": column.align === "center",
                        [column.className || ""]: column.className,
                      })}
                    >
                      {column.cell
                        ? column.cell(row)
                        : String(row[column.accessor])}
                    </td>
                  ))}
                  {actions && (
                    <td
                      data-testid={`actions-${row.id}`}
                      className="px-6 py-4 text-right"
                    >
                      {actions(row)}
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </ErrorBoundary>
  );
};

import clsx from "clsx";
import { FC } from "react";

interface Props {
  className?: string;
}
export const TableSkeletonLoading: FC<Props> = ({ className = "" }) => {
  return (
    <div
      className={clsx("w-full animate-pulse", { [className]: !!className })}
      data-testid="table-skeleton"
    >
      <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-800">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-900">
            <tr>
              {[...Array(6)].map((_, index) => (
                <th
                  key={index}
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400"
                >
                  <div className="h-4 rounded bg-gray-300 dark:bg-gray-700"></div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
            {[...Array(15)].map((_, rowIndex) => (
              <tr key={rowIndex}>
                {[...Array(6)].map((_, colIndex) => (
                  <td
                    key={colIndex}
                    className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400"
                  >
                    <div className="h-4 rounded bg-gray-200 dark:bg-gray-700"></div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

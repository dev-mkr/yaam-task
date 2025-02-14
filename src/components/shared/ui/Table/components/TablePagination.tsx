import { FC } from "react";
import clsx from "clsx";
import { Button } from "@/components/shared/ui/Button";

interface Props {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export const TablePagination: FC<Props> = ({
  page,
  totalPages,
  onPageChange,
  className,
}) => {
  return (
    <div
      className={clsx(
        "container mx-auto flex max-w-7xl items-center justify-between px-4 py-3",
        className
      )}
    >
      <p>
        Page {page} of {totalPages}
      </p>
      <div className="flex gap-2">
        <Button onClick={() => onPageChange(page - 1)} disabled={page === 1}>
          Previous
        </Button>
        <Button
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

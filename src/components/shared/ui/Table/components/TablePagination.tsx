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
      data-testid="pagination"
      className={clsx(
        "container mx-auto flex max-w-7xl items-center justify-between px-4 py-3",
        className
      )}
    >
      <p data-testid="page-info">
        Page {page} of {totalPages}
      </p>
      <div className="flex gap-2">
        <Button
          data-testid="pagination-previous"
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
        >
          Previous
        </Button>
        <Button
          data-testid="pagination-next"
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

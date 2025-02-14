import { describe, expect, test, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { TablePagination } from "@/components/shared/ui/Table/components/TablePagination";

describe("TablePagination Component", () => {
  const mockPageChange = vi.fn();

  test("renders current page and total pages", () => {
    render(
      <TablePagination page={2} totalPages={5} onPageChange={mockPageChange} />
    );

    expect(screen.getByTestId("page-info")).toHaveTextContent("Page 2 of 5");
    expect(screen.getByTestId("pagination")).toBeInTheDocument();
  });

  test("disables Previous button on first page", () => {
    render(
      <TablePagination page={1} totalPages={5} onPageChange={mockPageChange} />
    );

    expect(screen.getByTestId("pagination-previous")).toBeDisabled();
    expect(screen.getByTestId("pagination-next")).toBeEnabled();
  });

  test("disables Next button on last page", () => {
    render(
      <TablePagination page={5} totalPages={5} onPageChange={mockPageChange} />
    );

    expect(screen.getByTestId("pagination-next")).toBeDisabled();
    expect(screen.getByTestId("pagination-previous")).toBeEnabled();
  });

  test("calls onPageChange for Previous button", () => {
    render(
      <TablePagination page={3} totalPages={5} onPageChange={mockPageChange} />
    );

    fireEvent.click(screen.getByTestId("pagination-previous"));
    expect(mockPageChange).toHaveBeenCalledWith(2);
  });

  test("calls onPageChange for Next button", () => {
    render(
      <TablePagination page={3} totalPages={5} onPageChange={mockPageChange} />
    );

    fireEvent.click(screen.getByTestId("pagination-next"));
    expect(mockPageChange).toHaveBeenCalledWith(4);
  });

  test("applies custom className", () => {
    render(
      <TablePagination
        page={1}
        totalPages={5}
        onPageChange={mockPageChange}
        className="custom-class"
      />
    );

    expect(screen.getByTestId("pagination")).toHaveClass("custom-class");
  });
});

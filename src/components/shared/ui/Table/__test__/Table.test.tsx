import { describe, expect, test, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Table } from "@/components/shared/ui/Table";
import {
  ColumnDefinition,
  SortDirection,
} from "@/components/shared/ui/Table/Table.type";

interface User {
  id: string;
  name: string;
  email: string;
  age: number;
}

const mockColumns: ColumnDefinition<User>[] = [
  { accessor: "name", header: "Name", sortable: true },
  { accessor: "email", header: "Email", sortable: false },
  { accessor: "age", header: "Age", align: "right" },
];

const mockData: User[] = [
  { id: "1", name: "Alice", email: "alice@example.com", age: 30 },
  { id: "2", name: "Bob", email: "bob@example.com", age: 25 },
];

describe("Table Component", () => {
  test("renders table with data-testid", () => {
    render(
      <Table
        columns={mockColumns}
        data={mockData}
        sortBy="name"
        sortDirection={SortDirection.ASC}
        onSortChange={vi.fn()}
      />
    );
    expect(screen.getByTestId("table")).toBeInTheDocument();
  });

  test("shows correct sort indicators", () => {
    const { rerender } = render(
      <Table
        columns={mockColumns}
        data={mockData}
        sortBy="name"
        sortDirection={SortDirection.ASC}
        onSortChange={vi.fn()}
      />
    );

    expect(screen.getByTestId("arrow-up")).toBeInTheDocument();

    rerender(
      <Table
        columns={mockColumns}
        data={mockData}
        sortBy="name"
        sortDirection={SortDirection.DESC}
        onSortChange={vi.fn()}
      />
    );

    expect(screen.getByTestId("arrow-down")).toBeInTheDocument();
  });

  test("handles sort click on sortable column", () => {
    const handleSort = vi.fn();

    render(
      <Table
        columns={mockColumns}
        data={mockData}
        sortBy="name"
        sortDirection={SortDirection.ASC}
        onSortChange={handleSort}
      />
    );

    fireEvent.click(screen.getByTestId("header-name"));
    expect(handleSort).toHaveBeenCalledWith("name", SortDirection.DESC);
  });

  test("does not sort non-sortable columns", () => {
    const handleSort = vi.fn();

    render(
      <Table
        columns={mockColumns}
        data={mockData}
        sortBy="name"
        sortDirection={SortDirection.ASC}
        onSortChange={handleSort}
      />
    );

    fireEvent.click(screen.getByTestId("header-email"));
    expect(handleSort).not.toHaveBeenCalled();
  });

  test("shows empty state correctly", () => {
    render(
      <Table
        columns={mockColumns}
        data={[]}
        sortBy="name"
        sortDirection={SortDirection.ASC}
        onSortChange={vi.fn()}
      />
    );

    expect(screen.getByTestId("empty-state")).toBeInTheDocument();
    expect(screen.getByTestId("empty-row")).toBeInTheDocument();
  });

  test("renders actions column when provided", () => {
    const actions = vi.fn((row) => <button>Edit {row.name}</button>);

    render(
      <Table
        columns={mockColumns}
        data={mockData}
        sortBy="name"
        sortDirection={SortDirection.ASC}
        onSortChange={vi.fn()}
        actions={actions}
      />
    );

    expect(screen.getByTestId("actions-1")).toBeInTheDocument();
    expect(screen.getByTestId("actions-2")).toBeInTheDocument();
  });

  test("handles row clicks correctly", () => {
    const handleRowClick = vi.fn();

    render(
      <Table
        columns={mockColumns}
        data={mockData}
        sortBy="name"
        sortDirection={SortDirection.ASC}
        onSortChange={vi.fn()}
        onRowClick={handleRowClick}
      />
    );

    fireEvent.click(screen.getByTestId("row-1"));
    expect(handleRowClick).toHaveBeenCalledWith("1");
  });

  test("ignores row clicks when clicking buttons", () => {
    const handleRowClick = vi.fn();
    const actions = () => <button data-testid="action-button">Edit</button>;

    render(
      <Table
        columns={mockColumns}
        data={mockData}
        sortBy="name"
        sortDirection={SortDirection.ASC}
        onSortChange={vi.fn()}
        onRowClick={handleRowClick}
        actions={actions}
      />
    );

    // Click the first action button found
    fireEvent.click(screen.getAllByTestId("action-button")[0]);
    expect(handleRowClick).not.toHaveBeenCalled();
  });
});

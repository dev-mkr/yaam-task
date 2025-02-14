import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

import { httpClient } from "@/services/httpClient";
import { Table } from "@/components/shared/Table";
import { SortDirection } from "@/components/shared/Table/Table.type";
import { refundOrdersTableColumns } from "./RefundOrders.constant";
import {
  PaginatedRecordType,
  RefundOrderType,
} from "@/pages/RefundOrders/type";
import { TablePagination } from "@/components/shared/Table/components/TablePagination";
import { GlobalError } from "@/components/shared/GlobalError";
import { TableSkeletonLoading } from "@/components/shared/Table/components/TableSkeletonLoading";
import { RefundOrdersActions } from "./components/RefundOrdersActions";

export const RefundOrders = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get("_page")) || 1;
  const pageSize = Number(searchParams.get("_per_page")) || 15;
  const sortBy = searchParams.get("_sort") || "id";
  const sortOrder = searchParams.get("_order") || SortDirection.ASC;

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["items", page, pageSize, sortBy, sortOrder],
    queryFn: () => {
      const params = {
        _page: page,
        _per_page: pageSize,
        // _sort: sortBy,
        // _order: sortOrder,
      };
      return httpClient
        .get<
          PaginatedRecordType<RefundOrderType[]>
        >("/refund_orders", { params })
        .then((res) => res.data);
    },
  });

  const memoizedTableColumns = useMemo(() => refundOrdersTableColumns, []);

  const handleParamsUpdate = (params: Record<string, string>) => {
    const newParams = new URLSearchParams(searchParams);
    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        newParams.set(key, value);
      } else {
        newParams.delete(key);
      }
    });
    setSearchParams(newParams);
  };

  const handlePageChange = (newPage: number) => {
    handleParamsUpdate({ _page: String(newPage) });
  };

  const handleSortChange = (newSortBy: string, newSortOrder: SortDirection) => {
    handleParamsUpdate({
      sortBy: newSortBy,
      sortOrder: newSortOrder,
      page: "1",
    });
  };

  if (isLoading || !data)
    return (
      <main className="flex w-full flex-col items-center px-4 md:m-6 md:my-20">
        <TableSkeletonLoading className="container flex w-full max-w-7xl flex-col justify-center px-4 md:m-6" />
      </main>
    );

  if (isError)
    // handle any error as needed
    return <GlobalError error="Something went wrong" />;

  return (
    <main className="flex w-full flex-col items-center px-4 md:m-6 md:my-20">
      <Table
        columns={memoizedTableColumns}
        data={data?.data}
        sortBy={sortBy}
        sortDirection={sortOrder}
        onSortChange={handleSortChange}
        actions={(row) => (
          <RefundOrdersActions record={row} callBack={refetch} />
        )}
      />
      <TablePagination
        page={page}
        totalPages={data?.pages}
        onPageChange={handlePageChange}
      />
    </main>
  );
};

import { Badge, BadgeVariant } from "@/components/shared/ui/Badge";
import { ColumnDefinition } from "@/components/shared/Table/Table.type";
import { RefundOrderType } from "@/pages/RefundOrders/type";

export const refundOrdersTableColumns: ColumnDefinition<RefundOrderType>[] = [
  {
    header: "ID",
    accessor: "id",
    align: "center",
  },
  {
    header: "Store",
    accessor: "store_name",
    cell: ({ store_logo, store_name, store_url }) => (
      <div className="flex items-center gap-2">
        <img src={store_logo} alt={store_name} className="h-12 w-12 rounded" />
        <a
          href={store_url}
          onClick={(e) => e.stopPropagation()}
          className="text-blue-600 hover:underline"
          target="_blank"
        >
          {store_name}
        </a>
      </div>
    ),
  },
  {
    header: "Amount",
    accessor: "amount",
    cell: ({ amount }) => `$${Number(amount).toFixed(2)}`,
    align: "center",
  },
  {
    header: "Items",
    accessor: "items",
    cell: ({ items }) => (
      <span className="rounded bg-gray-100 px-2 py-1 text-sm">
        {items.length > 0 ? items.length : "0 items"}
      </span>
    ),
  },
  {
    header: "Decision",
    accessor: "decision",
    cell: ({ decision }) => {
      let variant;
      if (decision === "accept") variant = BadgeVariant.Success;
      if (decision === "reject") variant = BadgeVariant.Error;
      if (decision === "escalate") variant = BadgeVariant.Warning;
      if (!decision) variant = BadgeVariant.Default;

      return <Badge variant={variant}>{decision || "not yet"}</Badge>;
    },
    align: "center",
  },
  {
    header: "Reason",
    accessor: "reason",

    align: "center",
  },
];

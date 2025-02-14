import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "react-router-dom";
import { RefundOrderType } from "@/pages/RefundOrders/type";
import { httpClient } from "@/services/httpClient";
import { Button } from "@/components/shared/ui/Button";
import { LoaderCircle } from "lucide-react";
import { GlobalError } from "@/components/shared/GlobalError";

export const RefundOrderDetails = () => {
  const { id } = useParams<{ id: string }>();

  const { data, isError, isLoading } = useQuery({
    queryKey: ["refund_order", id],
    queryFn: () => {
      return httpClient
        .get<RefundOrderType>(`/refund_orders/${id}`)
        .then((res) => res.data);
    },
  });

  if (isLoading || !data)
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <LoaderCircle size={50} className="animate-spin text-blue-600" />
      </div>
    );

  if (isError)
    // handle any error as needed
    return <GlobalError error="Something went wrong" />;

  return (
    <main className="flex w-full flex-col items-center gap-5 px-4 md:m-6 md:my-20">
      <Link to="/">
        <Button variant="primary">Go Back</Button>
      </Link>

      <div className="rounded-lg bg-white p-6 shadow-md">
        <h1 className="mb-4 text-2xl font-bold text-gray-800">
          Refund Order Detail
        </h1>

        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-700">
              Order ID: {data.id}
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <p className="text-gray-600">Reason: {data.reason}</p>
              <p className="text-gray-600">Store Name: {data.store_name}</p>
              <p className="text-gray-600">Amount: {data.amount.toFixed(2)}</p>
            </div>

            <div className="flex justify-center">
              <img
                src={data.store_logo}
                alt={`${data.store_name} Logo`}
                className="h-32 w-32 rounded-lg object-contain"
              />
            </div>
          </div>
        </div>

        <h3 className="mb-4 mt-6 text-xl font-semibold text-gray-700">Items</h3>
        <ul className="space-y-4">
          {data.items.map((item) => (
            <li key={item.id} className="rounded-lg bg-gray-50 p-4 shadow-sm">
              <p className="text-gray-600">Name: {item.name}</p>
              <p className="text-gray-600">Price: {item.price.toFixed(2)}</p>
              <p className="text-gray-600">Quantity: {item.quantity}</p>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
};

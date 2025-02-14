import { FC } from "react";
import { Check, Eye, UsersRound, X } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { isAxiosError } from "axios";

import { httpClient } from "@/services/httpClient";
import { DropdownMenu } from "@/components/shared/ui/DropdownMenu";
import { Switch } from "@/components/shared/ui/Switch";
import { Button } from "@/components/shared/ui/Button";
import {
  RefundOrderDecisions,
  RefundOrderType,
} from "@/pages/RefundOrders/type";

interface Props {
  record: RefundOrderType;
  callBack?: () => void;
}

export const RefundOrdersActions: FC<Props> = ({ record, callBack }) => {
  const updateRefundOrder = async (data: Partial<RefundOrderType>) => {
    const response = await httpClient.patch<RefundOrderType>(
      `/refund_orders/${record.id}`,
      data
    );
    return response.data;
  };

  const handleDecisionChange = async (decision: RefundOrderDecisions) => {
    try {
      await toast.promise(updateRefundOrder({ decision: decision }), {
        loading: "Updating decision...",
        success: "Decision updated successfully!",
        error: (err: unknown) => {
          if (isAxiosError(err)) {
            return err.response?.data?.message || "Failed to update decision";
          }
          return "Failed to update decision";
        },
      });
      callBack?.();
    } catch (error) {
      console.error("Error updating decision:", error);
    }
  };

  const handleToggleActive = async (checked: boolean) => {
    try {
      await toast.promise(updateRefundOrder({ active: checked }), {
        loading: "Updating status...",
        success: "Status updated successfully!",
        error: (err: unknown) => {
          if (isAxiosError(err)) {
            return err.response?.data?.message || "Failed to update status";
          }
          return "Failed to update status";
        },
      });
      callBack?.();
    } catch (error) {
      console.error("Error toggling status:", error);
    }
  };

  return (
    <div className="flex items-center justify-between gap-2">
      <DropdownMenu
        buttonLabel="Change Decision"
        selectedId={record.decision || ""}
        items={[
          {
            id: RefundOrderDecisions.ACCEPT,
            label: "Accept",
            icon: <Check size={18} />,
          },
          {
            id: RefundOrderDecisions.ESCALATE,
            label: "Escalate",
            icon: <UsersRound size={18} />,
          },
          {
            id: RefundOrderDecisions.REJECT,
            label: "Reject",
            icon: <X size={18} />,
          },
        ]}
        onSelect={(selectedId) =>
          handleDecisionChange(selectedId as RefundOrderDecisions)
        }
      />
      <Link to={`/refund-orders/${record.id}`}>
        <Button isIconOnly>
          <Eye size={25} className="text-gray-500" />
        </Button>
      </Link>
      <Switch checked={record.active} onChange={handleToggleActive} />
    </div>
  );
};

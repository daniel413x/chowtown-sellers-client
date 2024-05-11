import LoadingSpinner from "@/components/ui/common/LoadingSpinner";
import { Badge } from "@/components/ui/common/shadcn/badge";
import {
  Card, CardContent, CardHeader, CardTitle,
} from "@/components/ui/common/shadcn/card";
import { Label } from "@/components/ui/common/shadcn/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/common/shadcn/select";
import { Separator } from "@/components/ui/common/shadcn/separator";
import { useGetOrderUser } from "@/lib/api/OrdersApi";
import { Order, Status } from "@/lib/types";
import { intToPrice } from "@/lib/utils";
import { format } from "date-fns";
import { ReactNode, useEffect, useState } from "react";
import ChangeStatusModal from "./ChangeStatusModal";

interface HeaderColProps {
  label: string;
  value: ReactNode;
}

function HeaderCol({
  label,
  value,
}: HeaderColProps) {
  return (
    <div className="flex flex-col gap-1">
      {`${label}:`}
      <span className="font-normal">
        {value}
      </span>
    </div>
  );
}

export type OrderStatusInfo = {
    label: string;
    value: Status;
    progressValue: number;
}

export const orderStatus: OrderStatusInfo[] = [
  {
    label: "Placed",
    value: Status.PLACED,
    progressValue: 0,
  },
  {
    label: "Awaiting restaurant confirmation",
    value: Status.PAID,
    progressValue: 25,
  },
  {
    label: "In progress",
    value: Status.IN_PROGRESS,
    progressValue: 50,
  },
  {
    label: "Out for delivery",
    value: Status.OUT_FOR_DELIVERY,
    progressValue: 75,
  },
  {
    label: "Delivered",
    value: Status.DELIVERED,
    progressValue: 100,
  },
];

interface OrderItemCardProps {
  order: Order;
}

function OrderItemCard({
  order,
}: OrderItemCardProps) {
  const [selectedStatus, setSelectedStatus] = useState<Status>(order.status);
  const [showStatusModal, setShowStatusModal] = useState<boolean>(false);
  const {
    user,
    isLoading: isLoadingUser,
  } = useGetOrderUser(order.userId);
  const handleClickSelectItem = (status: Status) => {
    setSelectedStatus(status);
    setShowStatusModal(true);
  };
  const handleCloseChangeStatusModal = () => {
    setShowStatusModal(false);
  };
  const handleCancelChangeStatus = () => {
    setSelectedStatus(order.status);
    setShowStatusModal(false);
  };
  const time = () => format(order.createdAt, "h:mm a (MMM d, yyyy)");
  return (
    <>
      <ChangeStatusModal
        onClose={handleCloseChangeStatusModal}
        onCancel={handleCancelChangeStatus}
        open={showStatusModal}
        statusReq={{
          status: selectedStatus!,
          orderId: order.id,
        }}
      />
      <Card>
        <CardHeader>
          <CardTitle className="grid md:grid-cols-4 gap-4 justify-between mb-3">
            <HeaderCol
              label="Customer name"
              value={isLoadingUser ? <LoadingSpinner /> : (
                <span className="font-normal">
                  {user?.name || "N/A"}
                </span>
              )}
            />
            <HeaderCol
              label="Delivery address"
              value={order.deliveryDetails.addressLineOne}
            />
            <HeaderCol
              label="Time"
              value={time()}
            />
            <HeaderCol
              label="Total cost"
              value={`$${intToPrice(order.totalAmount)}`}
            />
          </CardTitle>
          <Separator />
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <ul className="flex flex-col gap-2">
            {order.cartItems.map((item) => (
              <li key={item.id}>
                <div className="">
                  <Badge variant="outline" className="mr-2">
                    {item.quantity}
                  </Badge>
                  <span className="text-sm uppercase">
                    {item.name}
                  </span>
                </div>
              </li>
            ))}
          </ul>
          <div className="space-y-1">
            <Label htmlFor="status">
              What is the status of this order?
            </Label>
            <Select
              onValueChange={(status: Status) => handleClickSelectItem(status)}
              value={selectedStatus}
            >
              <SelectTrigger id="status">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent position="popper">
                {orderStatus.map((status) => (
                  <SelectItem className="py-3" value={status.value} key={status.value}>
                    {status.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

export default OrderItemCard;

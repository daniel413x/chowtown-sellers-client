import LoadingSpinner from "@/components/ui/common/LoadingSpinner";
import { Card, CardHeader, CardTitle } from "@/components/ui/common/shadcn/card";
import { Separator } from "@/components/ui/common/shadcn/separator";
import { useGetOrderUser } from "@/lib/api/OrdersApi";
import { Order } from "@/lib/types";
import { intToPrice } from "@/lib/utils";
import { format } from "date-fns";
import { ReactNode } from "react";

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

interface OrderItemCardProps {
  order: Order;
}

function OrderItemCard({
  order,
}: OrderItemCardProps) {
  const {
    user,
    isLoading: isLoadingUser,
  } = useGetOrderUser(order.userId);
  const time = () => format(order.createdAt, "h:mm a (MMM d, yyyy)");
  return (
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
    </Card>
  );
}

export default OrderItemCard;

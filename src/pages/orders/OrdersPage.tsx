import { useGetRestaurantOrders } from "@/lib/api/OrdersApi";
import {
  ComputerIcon,
} from "lucide-react";
import Meta from "@/components/misc/Meta";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/common/shadcn/skeleton";
import OrderItemCard, { OrderItemCardSkeleton } from "./components/OrderItemCard";

function OrdersPage() {
  const {
    data,
    isLoading: isLoadingGET,
  } = useGetRestaurantOrders();
  const [q, sq] = useState<boolean>(false);
  useEffect(() => {
    const i = setInterval(() => {
      sq(!q);
    }, 1000);
    return () => {
      clearTimeout(i);
    };
  }, [q]);
  return (
    <Meta title="Orders">
      <main className="p-10">
        <div className="flex space-between items-center mb-10">
          <h1 className="text-2xl font-bold flex-1">
            {isLoadingGET ? (
              <Skeleton
                className="w-24 h-8 flex-1"
              />
            ) : (
              "Orders"
            )}
          </h1>
          <ComputerIcon />
        </div>
        <ul className="flex flex-col gap-5">
          {!isLoadingGET ? null : Array.from({ length: 3 }).map((_, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <li key={i}>
              <OrderItemCardSkeleton />
            </li>
          ))}
          {data?.rows.map((order) => (
            <li key={order.id}>
              <OrderItemCard order={order} />
            </li>
          ))}
        </ul>
      </main>
    </Meta>
  );
}

export default OrdersPage;

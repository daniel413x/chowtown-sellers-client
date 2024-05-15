import { useGetRestaurantOrders } from "@/lib/api/OrdersApi";
import {
  ComputerIcon,
} from "lucide-react";
import Meta from "@/components/misc/Meta";
import { useEffect, useState } from "react";
import PageHeader from "@/components/ui/common/PageHeader";
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
        <PageHeader header="Orders" isLoading={isLoadingGET} icon={<ComputerIcon />} />
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

import { useGetRestaurantOrders } from "@/lib/api/OrdersApi";
import {
  ComputerIcon,
} from "lucide-react";
import OrderItemCard from "./components/OrderItemCard";

function OrdersPage() {
  const {
    data,
  } = useGetRestaurantOrders();
  return (
    <main className="p-10">
      <div className="flex space-between items-center mb-10">
        <h1 className="text-2xl font-bold flex-1">
          Orders
        </h1>
        <ComputerIcon />
      </div>
      <ul>
        {data?.rows.map((order) => (
          <li key={order.id}>
            <OrderItemCard order={order} />
          </li>
        ))}
      </ul>
    </main>
  );
}

export default OrdersPage;

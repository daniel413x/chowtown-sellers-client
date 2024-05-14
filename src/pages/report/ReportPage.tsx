import Meta from "@/components/misc/Meta";
import { useGetRestaurantOrders } from "@/lib/api/OrdersApi";
import {
  DollarSign,
} from "lucide-react";
import SalesInformation, { SalesInformationSkeleton } from "./components/SalesInformation";
import MenuItemsSales, { MenuItemsSalesSkeleton } from "./components/MenuItemsSales";
import MonthlySales, { MonthlySalesSkeleton } from "./components/MonthlySales";

function ReportPage() {
  const {
    data,
    isLoading,
  } = useGetRestaurantOrders();
  const totalOrders = data?.pagination.count;
  return (
    <Meta title="Your Restaurant Report">
      <main className="md:p-10">
        <div className="flex space-between items-center mb-10">
          <h1 className="text-2xl font-bold flex-1">
            My Report
          </h1>
          <DollarSign />
        </div>
        {isLoading ? (
          <>
            <MonthlySalesSkeleton />
            <SalesInformationSkeleton />
            <MenuItemsSalesSkeleton />
          </>
        ) : (
          <>
            <MonthlySales orders={data?.rows || []} />
            <SalesInformation totalOrders={totalOrders || 0} />
            <MenuItemsSales orders={data?.rows || []} />
          </>
        )}
      </main>
    </Meta>
  );
}

export default ReportPage;

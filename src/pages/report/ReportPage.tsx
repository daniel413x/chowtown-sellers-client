import Meta from "@/components/misc/Meta";
import { useGetRestaurantOrders } from "@/lib/api/OrdersApi";
import {
  DollarSign,
} from "lucide-react";
import PageHeader from "@/components/ui/common/PageHeader";
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
        <PageHeader header="Orders" isLoading={isLoading} icon={<DollarSign />} />
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

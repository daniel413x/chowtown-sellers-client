import { ReactNode } from "react";
import { Skeleton } from "./shadcn/skeleton";

interface PageHeaderProps {
  header: string;
  isLoading?: boolean;
  icon?: ReactNode;
}

function PageHeader({
  header,
  isLoading,
  icon,
}: PageHeaderProps) {
  return (
    <div className="flex space-between items-center mb-10">
      <h1 className="text-2xl font-bold flex-1">
        {isLoading ? (
          <Skeleton
            className="w-24 h-8 flex-1"
          />
        ) : header}
      </h1>
      {isLoading ? <Skeleton className="w-6 h-6" /> : icon}
    </div>
  );
}

export default PageHeader;

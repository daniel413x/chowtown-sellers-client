import { useAuth0 } from "@auth0/auth0-react";
import {
  Link, useLocation,
} from "react-router-dom";
import { MANAGE_RESTAURANT_ROUTE, ORDERS_ROUTE, REPORT_ROUTE } from "@/lib/consts";
import {
  Building, Car, ReceiptCent,
} from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  {
    to: `/${REPORT_ROUTE}`,
    label: "Reportings",
    icon: <ReceiptCent className="w-4 h-4" />,
  },
  {
    to: `/${MANAGE_RESTAURANT_ROUTE}`,
    label: "Restaurant",
    icon: <Building className="w-4 h-4" />,
  },
  {
    to: `/${ORDERS_ROUTE}`,
    label: "Orders",
    icon: <Car strokeWidth={2.25} className="w-4 h-4" />,
  },
];

interface MainNavProps {
  mobile?: boolean;
}

function MainNav({
  mobile,
}: MainNavProps) {
  const { isAuthenticated } = useAuth0();
  const location = useLocation();
  const { pathname } = location;
  const py = 2;
  return !isAuthenticated ? null : (
    <ul className={cn("flex", {
      "space-x-2 items-center": !mobile,
      "flex-col": mobile,
    })}
    >
      {links.map(({ to, icon, label }) => (
        <li key={to}>
          <Link
            to={to}
            // don't resize parent
            className={cn(`font-semibold relative group flex items-center gap-1 py-${py} -my-${py} px-3.5 rounded-md w-full`, {
              "bg-orange-500 text-white": to === pathname,
              "text-black hover:text-orange-500": to !== pathname,
            })}
          >
            {icon}
            <span>{label}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default MainNav;

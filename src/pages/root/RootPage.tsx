import { Button } from "@/components/ui/common/shadcn/button";
import { REPORT_ROUTE } from "@/lib/consts";
import { useAuth0 } from "@auth0/auth0-react";
import { KeyRound } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Meta from "@/components/misc/Meta";
import { cn } from "@/lib/utils";
import img from "./cover-img.jpg";

function RootPage() {
  const navigate = useNavigate();
  const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();
  useEffect(() => {
    if (isAuthenticated) {
      navigate(`/${REPORT_ROUTE}`);
    }
  }, [isAuthenticated]);
  return (
    <Meta title="Portal">
      <main
        className={cn("flex flex-1 relative", {
          "opacity-0": isLoading || isAuthenticated,
        })}
      >
        <div
          className="opacity-50 w-full bg-no-repeat bg-cover bg-center"
          style={{ backgroundImage: `url(${img})` }}
        />
        <Button
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white border-amber-600 border-2 px-16 py-5 h-max font-semibold hover:text-orange-400 hover:bg-white text-black rounded-none"
          onClick={async () => {
            await loginWithRedirect();
          }}
          data-testid="login-button"
          id="login-button"
        >
          <KeyRound className="text-yellow-300 mr-2" />
          <span className="text-lg">
            Login
          </span>
        </Button>
      </main>
    </Meta>
  );
}

export default RootPage;

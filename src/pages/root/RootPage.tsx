import { Button } from "@/components/ui/common/shadcn/button";
import { REPORT_ROUTE } from "@/lib/consts";
import { useAuth0 } from "@auth0/auth0-react";
import { KeyRound } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import img from "./cover-img.jpg";

function RootPage() {
  const navigate = useNavigate();
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  useEffect(() => {
    if (isAuthenticated) {
      navigate(`/${REPORT_ROUTE}`);
    }
  }, [isAuthenticated]);
  return (
    <main
      className="flex flex-1 relative"
    >
      <div
        className="opacity-25 w-full bg-no-repeat bg-cover bg-center"
        style={{ backgroundImage: `url(${img})` }}
      />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white border-amber-600 border-2 px-10 py-2 h-max">
        <Button
          className="font-bold hover:text-orange-500 hover:bg-white"
          variant="ghost"
          onClick={async () => {
            await loginWithRedirect();
          }}
          data-testid="login-button"
          id="login-button"
        >
          <KeyRound className="text-yellow-400 mr-2" />
          <span className="text-base">
            Managers
          </span>
        </Button>
      </div>
    </main>
  );
}

export default RootPage;

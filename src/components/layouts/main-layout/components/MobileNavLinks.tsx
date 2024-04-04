import { Button } from "@/components/ui/common/shadcn/button";
import { useAuth0 } from "@auth0/auth0-react";

function MobileNavLinks() {
  const {
    logout,
  } = useAuth0();
  return (
    <Button
      className="flex items-center px-3 font-bold hover:bg-gray-500"
      onClick={() => logout()}
    >
      Logout
    </Button>
  );
}

export default MobileNavLinks;

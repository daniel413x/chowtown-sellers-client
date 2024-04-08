import { useAuth0 } from "@auth0/auth0-react";
import { useCreateMyUser } from "@/lib/api/MyUserApi";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateMyRestaurant } from "@/lib/api/MyRestaurantApi";

function AuthCallbackPage() {
  const navigate = useNavigate();
  const { user, loginWithRedirect } = useAuth0();
  const { createMyUser } = useCreateMyUser();
  const { createMyRestaurant } = useCreateMyRestaurant();
  const hasCreatedUser = useRef(false);
  const hasCreatedRestaurant = useRef(false);
  useEffect(() => {
    // important for cypress
    if (!user) {
      loginWithRedirect();
    }
    if (user?.sub && user?.email && !hasCreatedUser.current) {
      createMyUser({ auth0Id: user.sub, email: user.email });
      hasCreatedUser.current = true;
    }
    if (user?.sub && user?.email && !hasCreatedRestaurant.current) {
      createMyRestaurant();
      hasCreatedRestaurant.current = true;
    }
    navigate("/");
  }, [hasCreatedUser]);
  return (
    <>Loading...</>
  );
}

export default AuthCallbackPage;

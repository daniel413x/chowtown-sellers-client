import { useGetMyRestaurant, useUpdateMyRestaurant } from "@/lib/api/MyRestaurantApi";
import ManageRestaurantForm from "./components/ManageRestaurantForm";

function ManageRestaurantPage() {
  const {
    restaurant,
    isLoading: isLoadingGET,
    isError,
    error,
  } = useGetMyRestaurant();
  const {
    updateMyRestaurant,
    isLoading: isLoadingPUT,
  } = useUpdateMyRestaurant();
  if (!restaurant) {
    if (isLoadingGET) {
      return <>Loading...</>;
    }
    if (isError || error) {
      return <>Error...</>;
    }
    return null;
  }
  return (
    <ManageRestaurantForm
      restaurant={restaurant}
      updateMyRestaurant={updateMyRestaurant}
      isLoading={isLoadingPUT}
    />
  );
}

export default ManageRestaurantPage;

import { useGetMyRestaurant, useUpdateMyRestaurant } from "@/lib/api/MyRestaurantApi";
import Meta from "@/components/misc/Meta";
import ManageRestaurantForm from "./components/ManageRestaurantForm";
import ManageRestaurantFormSkeleton from "./components/ManageRestaurantFormSkeleton";

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
      return <ManageRestaurantFormSkeleton />;
    }
    if (isError || error) {
      return <>Error...</>;
    }
    return null;
  }
  return (
    <Meta title={`Manage My Restaurant | ${restaurant.restaurantName}`}>
      <ManageRestaurantForm
        restaurant={restaurant}
        updateMyRestaurant={updateMyRestaurant}
        isLoading={isLoadingPUT}
      />
    </Meta>
  );
}

export default ManageRestaurantPage;

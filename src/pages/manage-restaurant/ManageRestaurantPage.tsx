import { useCreateMyRestaurant } from "@/lib/api/MyRestaurantApi";
import ManageRestaurantForm from "./components/ManageRestaurantForm";

function ManageRestaurantPage() {
  const { createMyRestaurant, isLoading } = useCreateMyRestaurant();
  return (
    <ManageRestaurantForm onSave={createMyRestaurant} isLoading={isLoading} />
  );
}

export default ManageRestaurantPage;

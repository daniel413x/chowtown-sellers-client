import LoadingButton from "@/components/ui/common/LoadingButton";
import { Button } from "@/components/ui/common/shadcn/button";
import {
  Form,
} from "@/components/ui/common/shadcn/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Separator } from "@/components/ui/common/shadcn/separator";
import { Settings } from "lucide-react";
import { cn, intToPrice, menuItemsWithDecimalPrice } from "@/lib/utils";
import { Restaurant } from "@/lib/types";
import { useEffect } from "react";
import DetailsSection from "./DetailsSection";
import CuisinesSection from "./CuisinesSection";
import MenuItemsSection from "./MenuItemsSection";
import formStyles from "./FormStyles.module.css";
import ImageSection from "./ImageSection";
import SettingsSection from "./SettingsSection";

const formSchema = z.object({
  restaurantName: z.string().min(1, {
    message: "Name is required",
  }),
  imageUrl: z.string().min(1, {
    message: "Image url is required",
  }),
  city: z.string().min(1, {
    message: "City is required",
  }),
  country: z.string().min(1, {
    message: "City is required",
  }),
  deliveryPrice: z.coerce.number({
    required_error: "Delivery price is required",
    invalid_type_error: "Delivery price must be a number",
  }),
  estimatedDeliveryTime: z.coerce.number({
    required_error: "Estimated delivery time is required",
    invalid_type_error: "Estimated delivery time must be a number",
  }),
  cuisines: z.array(z.string()).nonempty({
    message: "Cuisines are required",
  }),
  isActivatedByUser: z.boolean(),
  menuItems: z.array(z.object({
    name: z.string().min(1, {
      message: "Name is required",
    }),
    price: z.coerce.number({
      required_error: "Price is required",
      invalid_type_error: "Price must be a number",
    }),
  })),
});

export type RestaurantFormData = z.infer<typeof formSchema>;

interface ManageRestaurantFormProps {
  updateMyRestaurant: (formData: RestaurantFormData) => void;
  isLoading: boolean;
  restaurant: Restaurant;
}

function ManageRestaurantForm({
  restaurant,
  isLoading,
  updateMyRestaurant,
}: ManageRestaurantFormProps) {
  const form = useForm<RestaurantFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cuisines: [],
      menuItems: [],
      restaurantName: "My Restaurant",
      imageUrl: "",
      city: "Dallas",
      country: "United States",
      deliveryPrice: 10,
      estimatedDeliveryTime: 30,
      isActivatedByUser: false,
    },
  });
  const { handleSubmit } = form;
  const onSubmit = (formData: RestaurantFormData) => {
    updateMyRestaurant(formData);
  };
  useEffect(() => {
    const deliveryPrice = intToPrice(restaurant.deliveryPrice);
    const menuItems = menuItemsWithDecimalPrice(restaurant.menuItems);
    const latestRestaurant = {
      cuisines: restaurant.cuisines,
      menuItems,
      restaurantName: restaurant.restaurantName,
      imageUrl: restaurant.imageUrl,
      city: restaurant.city,
      country: restaurant.country,
      deliveryPrice,
      estimatedDeliveryTime: restaurant.estimatedDeliveryTime,
      isActivatedByUser: restaurant.isActivatedByUser,
    };
    form.reset(latestRestaurant);
  }, [form, restaurant]);
  return (
    <Form
      {...form}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-8 md:p-10 rounded-lg "
      >
        <div className="flex space-between items-center">
          <h1 className={cn(formStyles.sectionHeader, "flex-1")}>
            My Restaurant
          </h1>
          <Settings />
        </div>
        <DetailsSection />
        <Separator />
        <CuisinesSection />
        <Separator />
        <MenuItemsSection />
        <Separator />
        <ImageSection />
        <Separator />
        <SettingsSection />
        {isLoading ? (
          <LoadingButton />
        ) : (
          <Button
            type="submit"
          >
            Submit
          </Button>
        )}
      </form>
    </Form>
  );
}

export default ManageRestaurantForm;

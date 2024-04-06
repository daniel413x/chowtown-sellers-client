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
import { cn } from "@/lib/utils";
import DetailsSection from "./DetailsSection";
import CuisinesSection from "./CuisinesSection";
import formStyles from "./FormStyles.module.css";

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
  onSave: (restaurantFormData: RestaurantFormData) => void;
  isLoading: boolean;
}

function ManageRestaurantForm({
  onSave,
  isLoading,
}: ManageRestaurantFormProps) {
  console.log(onSave);
  const form = useForm<RestaurantFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cuisines: ["Italian", "Mexican"],
      menuItems: [
        {
          name: "Sandwich",
          price: 10,
        },
      ],
      restaurantName: "My restaurant",
      imageUrl: "https://cloudinary.com/",
      city: "Bethesda, Maryland",
      country: "United States",
    },
  });
  const { handleSubmit } = form;
  const onSubmit = () => {
    // TODO - implement
  };
  return (
    <Form
      {...form}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-8  p-10 rounded-lg "
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

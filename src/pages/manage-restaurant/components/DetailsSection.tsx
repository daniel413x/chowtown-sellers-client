import {
  FormControl,
  FormDescription, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/common/shadcn/form";
import { Input } from "@/components/ui/common/shadcn/input";
import { useFormContext } from "react-hook-form";
import { RestaurantFormData } from "./ManageRestaurantForm";

function DetailsSection() {
  const { control } = useFormContext<RestaurantFormData>();
  return (
    <div className="space-y-2">
      <div>
        <h2 className="text-2xl font-bold">
          User Profile Form
        </h2>
        <FormDescription>
          View and change your profile information here
        </FormDescription>
      </div>
      <FormField
        control={control}
        name="restaurantName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Name
            </FormLabel>
            <FormControl>
              <Input
                {...field}
                disabled
                className="bg-white"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="flex gap-4">
        <FormField
          control={control}
          name="city"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>
                City
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  disabled
                  className="bg-white"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="country"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>
                Country
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  disabled
                  className="bg-white"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <FormField
        control={control}
        name="deliveryPrice"
        render={({ field }) => (
          <FormItem className="max-w-[25%]">
            <FormLabel>
              Delivery Price &#40;$&#41;
            </FormLabel>
            <FormControl>
              <Input
                {...field}
                disabled
                className="bg-white"
                placeholder="1.50"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="estimatedDeliveryTime"
        render={({ field }) => (
          <FormItem className="max-w-[25%]">
            <FormLabel>
              Estimated Delivery Time &#40;minutes&#41;
            </FormLabel>
            <FormControl>
              <Input
                {...field}
                disabled
                className="bg-white"
                placeholder="30"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}

export default DetailsSection;

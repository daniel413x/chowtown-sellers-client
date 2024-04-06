import {
  FormControl,
  FormDescription, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/common/shadcn/form";
import { Input } from "@/components/ui/common/shadcn/input";
import { useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";
import { RestaurantFormData } from "./ManageRestaurantForm";
import formStyles from "./FormStyles.module.css";

function DetailsSection() {
  const { control } = useFormContext<RestaurantFormData>();
  return (
    <div className={cn(formStyles, "text-black bg-white")}>
      <div>
        <h2 className={formStyles.sectionHeader}>
          Overview
        </h2>
        <FormDescription className="text-black">
          Provide general information about your restaurant
        </FormDescription>
      </div>
      <div className={formStyles.fields}>
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
                    className="bg-white text-gray-900"
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
                  className="bg-white"
                  placeholder="1.50"
                  type="number"
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
                  className="bg-white"
                  placeholder="30"
                  type="number"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}

export default DetailsSection;

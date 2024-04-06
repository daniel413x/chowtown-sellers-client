import {
  FormControl,
  FormDescription, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/common/shadcn/form";
import { ControllerRenderProps, useFormContext } from "react-hook-form";
import { Checkbox } from "@/components/ui/common/shadcn/checkbox";
import { RestaurantFormData } from "./ManageRestaurantForm";
import formStyles from "./FormStyles.module.css";

interface CuisineCheckboxProps {
  cuisine: string;
  field: ControllerRenderProps<RestaurantFormData, "cuisines">;
}

function CuisineCheckbox({
  cuisine,
  field,
}: CuisineCheckboxProps) {
  return (
    <FormItem className="flex flex-row items-center space-x-1 space-y-0 mt-2">
      <FormControl>
        <Checkbox
          className="bg-white"
          checked={field.value.includes(cuisine)}
          onCheckedChange={(checked) => {
            if (checked) {
              field.onChange([...field.value, cuisine]);
            } else {
              field.onChange(field.value.filter((v: string) => v !== cuisine));
            }
          }}
        />
      </FormControl>
      <FormLabel className="text-sm font-normal">
        {cuisine}
      </FormLabel>
    </FormItem>
  );
}

function CuisinesSection() {
  const { control } = useFormContext<RestaurantFormData>();
  const cuisines = [
    "American",
    "BBQ",
    "Breakfast",
    "Burgers",
    "Cafe",
    "Chinese",
    "Desserts",
    "French",
    "Greek",
    "Healthy",
    "Indian",
    "Italian",
    "Japanese",
    "Mexican",
    "Noodles",
    "Organic",
    "Pasta",
    "Pizza",
    "Salads",
    "Seafood",
    "Spanish",
    "Steak",
    "Sushi",
    "Tacos",
    "Tapas",
    "Vegan",
  ];
  return (
    <div>
      <div>
        <h2 className={formStyles.sectionHeader}>
          Cuisines
        </h2>
        <FormDescription className="text-black">
          Select cuisines served by your restaurant
        </FormDescription>
      </div>
      <FormField
        control={control}
        name="cuisines"
        render={({ field }) => (
          <FormItem
            className={formStyles.fields}
          >
            <ul className="grid md:grid-cols-5 gap-1">
              {cuisines.map((c) => (
                <li key={c}>
                  <CuisineCheckbox cuisine={c} field={field} />
                </li>
              ))}
            </ul>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}

export default CuisinesSection;

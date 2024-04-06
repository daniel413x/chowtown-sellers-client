import {
  FormControl,
  FormDescription, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/common/shadcn/form";
import {
  useFieldArray, useFormContext,
} from "react-hook-form";
import { Button } from "@/components/ui/common/shadcn/button";
import { Input } from "@/components/ui/common/shadcn/input";
import { RestaurantFormData } from "./ManageRestaurantForm";
import formStyles from "./FormStyles.module.css";

interface MenuItemProps {
  index: number;
  removeMenuItem: () => void;
}

function MenuItem({
  index,
  removeMenuItem,
}: MenuItemProps) {
  const { control } = useFormContext<RestaurantFormData>();
  return (
    <div
      className="flex flex-row items-end gap-2"
    >
      <FormField
        control={control}
        name={`menuItems.${index}.name`}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-1">
              Name
              {" "}
              <FormMessage />
            </FormLabel>
            <FormControl>
              <Input
                {...field}
                placeholder="Anchovy Pizza"
                className="bg-white"
              />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name={`menuItems.${index}.price`}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-1">
              Price &#40;$&#41;
              {" "}
              <FormMessage />
            </FormLabel>
            <FormControl>
              <Input
                {...field}
                type="number"
                placeholder="10.50"
                className="bg-white"
              />
            </FormControl>
          </FormItem>
        )}
      />
      <Button
        className="max-h-fit font-semibold"
        variant="destructive"
        onClick={removeMenuItem}
      >
        Remove
      </Button>
    </div>
  );
}

function MenuItemsSection() {
  const { control } = useFormContext<RestaurantFormData>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "menuItems",
  });
  return (
    <div>
      <div>
        <h2 className={formStyles.sectionHeader}>
          Menu
        </h2>
        <FormDescription className="text-black">
          Create your menu and give each item a name and price
        </FormDescription>
      </div>
      <div className={formStyles.fields}>
        <FormField
          control={control}
          name="menuItems"
          render={() => (
            <FormItem>
              <ul className="flex flex-col gap-4 mb-3">
                {fields.map((item, index) => (
                  <li key={item.id}>
                    <MenuItem
                      index={index}
                      removeMenuItem={() => remove(index)}
                    />
                  </li>
                ))}
              </ul>
            </FormItem>
          )}
        />
        <Button
          type="button"
          onClick={() => append({ name: "", price: 0 })}
        >
          Add menu item
        </Button>
      </div>
    </div>
  );
}

export default MenuItemsSection;

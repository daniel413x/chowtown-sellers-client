import {
  FormControl,
  FormDescription, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/common/shadcn/form";
import {
  ControllerRenderProps,
  useFormContext,
} from "react-hook-form";
import { cn } from "@/lib/utils";
import { Switch } from "@/components/ui/common/shadcn/switch";
import { RestaurantFormData } from "./ManageRestaurantForm";
import formStyles from "./FormStyles.module.css";

interface SettingsSectionProps {
  desc: string;
  label: string;
  field: ControllerRenderProps<RestaurantFormData, "isActivatedByUser">;
}

function SettingsItem({
  desc,
  label,
  field,
}: SettingsSectionProps) {
  return (
    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
      <div className="space-y-0.5">
        <FormLabel className="text-base">{label}</FormLabel>
        <FormDescription>
          {desc}
        </FormDescription>
      </div>
      <FormControl>
        <Switch
          checked={field.value}
          onCheckedChange={field.onChange}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  );
}

function SettingsSection() {
  const { control } = useFormContext<RestaurantFormData>();
  return (
    <div>
      <div>
        <h2 className={formStyles.sectionHeader}>
          Settings
        </h2>
        <FormDescription className="text-black">
          Control settings for your shop
        </FormDescription>
      </div>
      <div className={cn(formStyles.fields, "flex flex-col md:w-[50%]")}>
        <FormField
          control={control}
          name="isActivatedByUser"
          render={({ field }) => (
            <SettingsItem
              label="Activate restaurant"
              desc="Index your restaurant publicly and take orders"
              field={field}
            />
          )}
        />
      </div>
    </div>
  );
}

export default SettingsSection;

import {
  FormControl,
  FormDescription, FormField, FormItem, FormMessage,
} from "@/components/ui/common/shadcn/form";
import {
  useFormContext,
} from "react-hook-form";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/common/shadcn/input";
import { useUploadToCloudinary } from "@/lib/api/CloudinaryApi";
import { AspectRatio } from "@/components/ui/common/shadcn/aspect-ratio";
import { RestaurantFormData } from "./ManageRestaurantForm";
import formStyles from "./FormStyles.module.css";

function ImageSection() {
  const { control, watch } = useFormContext<RestaurantFormData>();
  const preview = watch("imageUrl");
  const { uploadToCloudinary } = useUploadToCloudinary();
  return (
    <div>
      <div>
        <h2 className={formStyles.sectionHeader}>
          Image
        </h2>
        <FormDescription className="text-black">
          Add an image that will be displayed on your restaurant listing in the ChowTown index. Adding a new image will overwrite the existing one.
          {" "}
          <br />
          Recommended dimensions:
          {" "}
          <span className="underline">
            1600x400
          </span>
        </FormDescription>
      </div>
      <div className={cn(formStyles.fields, "flex flex-col gap-8 w-[50%]")}>
        <AspectRatio ratio={16 / 9}>
          <img
            src={preview}
            alt="Your restaurant's logo"
            className="rounded-md object-cover h-full w-full"
          />
        </AspectRatio>
        <FormField
          control={control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  className="bg-white"
                  type="file"
                  accept="string"
                  onChange={async (event) => {
                    if (event.target.files) {
                      const img = event.target.files[0];
                      const imgUrl = await uploadToCloudinary(img);
                      field.onChange(imgUrl);
                    }
                    return null;
                  }}
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

export default ImageSection;

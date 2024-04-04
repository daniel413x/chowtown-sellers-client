import {
  Form,
} from "@/components/ui/common/shadcn/form";
import { User } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
});

type UserFormData = z.infer<typeof formSchema>;

interface ManageRestaurantPageProps {
  onSave: (userProfileData: UserFormData) => void;
  user: User;
}

function ManageRestaurantPage({
  onSave,
  user,
}: ManageRestaurantPageProps) {
  const form = useForm<UserFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user.name,
    },
  });
  const { handleSubmit } = form;
  return (
    <Form
      {...form}
    >
      <form
        onSubmit={handleSubmit(onSave)}
        className="space-y-4 bg-gray-50 rounded-lg md:p-10"
      >
        Form
      </form>
    </Form>
  );
}

export default ManageRestaurantPage;

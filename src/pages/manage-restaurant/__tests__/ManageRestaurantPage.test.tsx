import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as RestaurantApiHooks from "@/lib/api/MyRestaurantApi";
import { MemoryRouter } from "react-router-dom";
import QueryClientProvider from "@/components/providers/QueryClientProvider";
import ManageRestaurantPage from "../ManageRestaurantPage";
import "@testing-library/jest-dom";

const restaurant = {
  id: "id",
  userId: "userId",
  restaurantName: "restaurantName",
  imageUrl: "imageUrl",
  city: "city",
  country: "country",
  deliveryPrice: "deliveryPrice",
  estimatedDeliveryTime: "estimatedDeliveryTime",
  cuisines: ["cuisine"],
  menuItems: [
    {
      id: "1",
      name: "ItemOne",
      price: 1000,
    },
    {
      id: "2",
      name: "ItemTwo",
      price: 777,
    },
    {
      id: "3",
      name: "ItemThree",
      price: 1000,
    },
  ],
  lastUpdated: "lastUpdated",
  isActivatedByUser: false,
};

jest.mock("@/lib/api/MyRestaurantApi", () => ({
  useGetMyRestaurant: jest.fn(),
  useUpdateMyRestaurant: jest.fn(),
}));

jest.mocked(RestaurantApiHooks.useGetMyRestaurant).mockReturnValue({
  restaurant,
  isLoading: false,
  isError: false,
  error: undefined,
} as any);

jest.mocked(RestaurantApiHooks.useUpdateMyRestaurant).mockReturnValue({
  updateMyRestaurant: () => Promise.resolve(),
  isLoading: false,
  isSuccess: true,
} as any);

describe("ManageRestaurantPage", () => {
  test("renders an error in the respective field if submit is attempted with a missing field", async () => {
    const { container } = render(
      <QueryClientProvider>
        <MemoryRouter>
          <ManageRestaurantPage />
        </MemoryRouter>
      </QueryClientProvider>,
    );
    const nameField = screen.getByTestId("restaurant-form-name-field");
    await userEvent.clear(nameField);
    const submitBtn = screen.getByTestId("restaurant-form-submit-btn");
    await userEvent.click(submitBtn);
    const errorMessage = container.querySelector("p.text-destructive");
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveTextContent("Name is required");
  });
});

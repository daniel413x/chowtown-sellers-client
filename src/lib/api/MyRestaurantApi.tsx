import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";
import { RestaurantFormData } from "@/pages/manage-restaurant/components/ManageRestaurantForm";
import { errorCatch, menuItemsWithIntPrice, priceToInt } from "../utils";
import { RESTAURANT_ROUTE } from "../consts";
import { Restaurant } from "../types";
import queryClient from "./queryClient";

const API_BASE_URL = import.meta.env.VITE_APP_API_URL;
const GET_MY_RESTAURANT = "getMyRestaurant";

const generateFormDataDto = (formData: RestaurantFormData) => {
  const menuItems = menuItemsWithIntPrice(formData.menuItems);
  const formDataDto = {
    ...formData,
    menuItems,
    deliveryPrice: priceToInt(formData.deliveryPrice),
    estimatedDeliveryTime: formData.estimatedDeliveryTime,
    cuisines: formData.cuisines,
    imageUrl: formData.imageUrl,
    isActivatedByUser: formData.isActivatedByUser,
  };
  return JSON.stringify(formDataDto);
};

export const useGetMyRestaurant = () => {
  const { getAccessTokenSilently, user } = useAuth0();
  const getMyRestaurantReq: () => Promise<Restaurant> = async () => {
    if (!user?.sub) {
      throw new Error("user object was not defined");
    }
    const accessToken = await getAccessTokenSilently();
    const auth0Id = encodeURIComponent(user.sub);
    const res = await fetch(`${API_BASE_URL}/${RESTAURANT_ROUTE}/${auth0Id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error("failed to get restaurant");
    }
    return res.json();
  };
  const {
    data: fetchedRestaurant, isLoading, isError, error,
  } = useQuery(GET_MY_RESTAURANT, getMyRestaurantReq);
  if (error) {
    toast.error(errorCatch(error));
  }
  return {
    restaurant: fetchedRestaurant, isLoading, isError, error,
  };
};

export const useCreateMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();
  const createMyRestaurantReq = async () => {
    const accessToken = await getAccessTokenSilently();
    // there is no body because a restaurant is enthusiastically created in the backend
    // with default values upon user registration
    const res = await fetch(`${API_BASE_URL}/${RESTAURANT_ROUTE}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error("Failed to create restaurant");
    }
  };
  const {
    mutateAsync: createMyRestaurant, isLoading, isError, isSuccess,
  } = useMutation(createMyRestaurantReq);
  return {
    createMyRestaurant, isLoading, isError, isSuccess,
  };
};

export const useUpdateMyRestaurant = () => {
  const { getAccessTokenSilently, user } = useAuth0();
  const updateMyRestaurantReq = async (formData: RestaurantFormData) => {
    if (!user?.sub) {
      throw new Error("user object was not defined");
    }
    const accessToken = await getAccessTokenSilently();
    const body = generateFormDataDto(formData);
    const auth0Id = encodeURIComponent(user.sub);
    const res = await fetch(`${API_BASE_URL}/${RESTAURANT_ROUTE}/${auth0Id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body,
    });
    if (!res.ok) {
      throw new Error("failed to update restaurant");
    }
  };
  const {
    mutateAsync: updateMyRestaurant, isLoading, error, isSuccess,
  } = useMutation(updateMyRestaurantReq, {
    onSuccess: () => {
      queryClient.invalidateQueries(GET_MY_RESTAURANT);
    },
  });
  if (isSuccess) {
    toast.success("Restaurant updated!");
  }
  if (error) {
    toast.error(errorCatch(error));
  }
  return {
    updateMyRestaurant,
    isLoading,
    isSuccess,
  };
};

import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";
import { RestaurantFormData } from "@/pages/manage-restaurant/components/ManageRestaurantForm";
import { errorCatch } from "../utils";
import { RESTAURANT_ROUTE } from "../consts";
import { Restaurant } from "../types";

const API_BASE_URL = import.meta.env.VITE_APP_API_URL;

export const useGetMyRestaurant = () => {
  const { getAccessTokenSilently, user } = useAuth0();
  const getMyRestaurantReq: () => Promise<Restaurant> = async () => {
    if (!user?.sub) {
      throw new Error("user object was not defined");
    }
    const accessToken = await getAccessTokenSilently();
    const id = encodeURIComponent(user.sub);
    const res = await fetch(`${API_BASE_URL}/${RESTAURANT_ROUTE}/${id}`, {
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
  const { data: fetchedUser, isLoading, error } = useQuery("getMyRestaurant", getMyRestaurantReq);
  if (error) {
    toast.error(errorCatch(error));
  }
  return {
    user: fetchedUser, isLoading,
  };
};

export const useCreateMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();
  const createMyRestaurantReq = async (user: RestaurantFormData) => {
    const accessToken = await getAccessTokenSilently();
    const res = await fetch(`${API_BASE_URL}/${RESTAURANT_ROUTE}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    if (!res.ok) {
      throw new Error("failed to create restaurant");
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
    const id = encodeURIComponent(user.sub);
    const res = await fetch(`${API_BASE_URL}/${RESTAURANT_ROUTE}/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    if (!res.ok) {
      throw new Error("failed to update user");
    }
  };
  const {
    mutateAsync: updateUser,
    isLoading,
    isSuccess,
    error,
  } = useMutation(updateMyRestaurantReq);
  if (isSuccess) {
    toast.success("User profile updated!");
  }
  if (error) {
    toast.error(errorCatch(error));
  }
  return {
    updateUser,
    isLoading,
    isSuccess,
  };
};

import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";
import { errorCatch } from "../utils";
import { ORDERS_ROUTE } from "../consts";
import { CustomerUser, OrdersGETManyRes, Status } from "../types";
import queryClient from "./queryClient";

const API_BASE_URL = import.meta.env.VITE_APP_API_URL;

const GET_RESTAURANT_ORDERS = "getOrderOrders";

export const useGetRestaurantOrders = () => {
  const { getAccessTokenSilently, user } = useAuth0();
  const getMyOrderReq: () => Promise<OrdersGETManyRes> = async () => {
    if (!user?.sub) {
      throw new Error("User object was not defined");
    }
    const accessToken = await getAccessTokenSilently();
    const res = await fetch(`${API_BASE_URL}/${ORDERS_ROUTE}/get-restaurant-orders`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error("Failed to get orders");
    }
    const fakeDelay = new Promise((resolve) => {
      setTimeout(resolve, 1250);
    });
    const results = await Promise.all([res, fakeDelay]);
    return results[0].json();
  };
  const {
    data: fetchedOrders, isLoading, isError, error,
  } = useQuery(GET_RESTAURANT_ORDERS, getMyOrderReq);
  if (error) {
    toast.error(errorCatch(error));
  }
  return {
    data: fetchedOrders, isLoading, isError, error,
  };
};

export const useGetOrderUser = (userId: string) => {
  const { getAccessTokenSilently, user } = useAuth0();
  const getOrderUserReq: () => Promise<CustomerUser> = async () => {
    if (!user?.sub) {
      throw new Error("User object was not defined");
    }
    const accessToken = await getAccessTokenSilently();
    const encodedId = encodeURIComponent(userId);
    const res = await fetch(`${API_BASE_URL}/${ORDERS_ROUTE}/get-order-user/${encodedId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error("Failed to get order user");
    }
    return res.json();
  };
  const {
    data: fetchedUser, isLoading, isError, error,
  } = useQuery("getOrderUser", getOrderUserReq);
  if (error) {
    toast.error(errorCatch(error));
  }
  return {
    user: fetchedUser, isLoading, isError, error,
  };
};

export type UpdateOrderStatusReq = {
  status: Status;
  orderId: string;
};

export const useUpdateOrderStatus = () => {
  const { getAccessTokenSilently, user } = useAuth0();
  const updateOrderStatusReq: (data: UpdateOrderStatusReq) => Promise<void> = async (data: UpdateOrderStatusReq) => {
    if (!user?.sub) {
      throw new Error("User object was not defined");
    }
    const accessToken = await getAccessTokenSilently();
    const encodedId = encodeURIComponent(data.orderId);
    const body = JSON.stringify({
      status: data.status,
    });
    const res = await fetch(`${API_BASE_URL}/${ORDERS_ROUTE}/${encodedId}/status`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body,
    });
    if (!res.ok) {
      throw new Error("Failed to get update status");
    }
    toast.message("Order status updated!");
  };
  const {
    mutateAsync: updateOrderStatus, isLoading, isError, error,
  } = useMutation(updateOrderStatusReq, {
    onSuccess: (() => {
      queryClient.invalidateQueries(GET_RESTAURANT_ORDERS);
    }),
  });
  if (isError) {
    toast.error(errorCatch(error));
  }
  return {
    updateOrderStatus, isLoading, isError, error,
  };
};

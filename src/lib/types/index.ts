export interface User {
  id: string;
  email: string;
}

export interface MenuItem {
  name: string;
  price: number;
  id?: string;
}

export interface Restaurant {
  id: string;
  userId: string;
  restaurantName: string;
  imageUrl: string;
  city: string;
  country: string;
  deliveryPrice: number;
  estimatedDeliveryTime: number;
  cuisines: string[];
  menuItems: MenuItem[];
  lastUpdated: string;
  isActivatedByUser: boolean;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface DeliveryDetails {
  email: string;
  name: string;
  addressLineOne: string;
  city: string;
}

// eslint-disable-next-line no-shadow
export enum Status {
  PLACED = "PLACED",
  PAID = "PAID",
  IN_PROGRESS = "IN_PROGRESS",
  OUT_FOR_DELIVERY = "OUT_FOR_DELIVERY",
  DELIVERED = "DELIVERED"
}

export interface Order {
  id: string;
  userId: string;
  restaurantId: string;
  deliveryDetails: DeliveryDetails;
  cartItems: CartItem[];
  totalAmount: number;
  deliveryPrice: number;
  status: Status;
  createdAt: string;
}

interface GETManyRes<T> {
  rows: T[];
  pagination: {
    page: number;
    size: number;
    pages: number;
    count: number;
    pageLimitReached: boolean;
  }
}

export interface OrdersGETManyRes extends GETManyRes<Order> {}

export interface CustomerUser {
  id: string;
  email: string;
  name: string;
  addressLineOne: string;
  city: string;
  country: string;
  auth0Id: string;
}

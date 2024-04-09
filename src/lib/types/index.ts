export interface User {
  _id: string;
  email: string;
}

export interface MenuItem {
  name: string;
  price: number;
}

export interface Restaurant {
  _id: string;
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

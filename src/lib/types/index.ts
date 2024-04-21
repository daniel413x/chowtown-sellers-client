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

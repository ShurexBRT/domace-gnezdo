export interface CartItem {
  id: string;
  name: string;
  pricePerPackage: number;
  quantity: number; // number of packages
  eggsPerPackage: number;
}

export type View = 'home' | 'checkout' | 'confirmation';

export interface OrderData {
  items: CartItem[];
  totalPrice: number;
  totalEggs: number;
  customer: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    note: string;
  };
}

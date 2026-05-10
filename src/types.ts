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
  subtotal: number;
  deliveryFee: number;
  totalPrice: number;
  totalEggs: number;
  totalPackages: number;
  deliveryDate: string;
  deliveryDeadline: string;
  customer: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    note: string;
  };
}

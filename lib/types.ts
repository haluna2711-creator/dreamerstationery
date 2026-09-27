export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  category: string | null;
  image_url: string | null;
  stock: number;
  is_active: boolean;
  created_at: string;
};

export type CartItem = {
  product_id: string;
  name: string;
  price: number;
  image_url: string | null;
  quantity: number;
};

export type Order = {
  id: string;
  order_code: string;
  customer_name: string;
  customer_phone: string;
  customer_address: string;
  amount: number;
  status: "pending" | "paid" | "shipped" | "cancelled";
  created_at: string;
};

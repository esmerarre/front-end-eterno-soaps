const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const ADMIN_TOKEN_KEY = "admin_access_token";

export interface OrderDetail {
  id: number;
  product_variant_id: number | null;
  product_name: string;
  quantity: number;
  price: number;
  stripe_price_id: string;
  total_price: number;
}

export interface Order {
  id: number;
  order_status: string;
  amount: number;
  currency: string;
  order_date: string;
  customer_name: string;
  customer_email: string;
  stripe_session_id: string;
  shipping_address: any;
  details: OrderDetail[];
}

export const getOrders = async (): Promise<Order[]> => {
  const token = localStorage.getItem(ADMIN_TOKEN_KEY);
  const res = await fetch(`${BACKEND_URL}/admins/orders`, {
    method: "GET",
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  if (res.status === 401 || res.status === 403) {
    throw new Error("unauthorized");
  }

  if (!res.ok) throw new Error("Failed to fetch orders");
  return res.json();
};

export const getOrder = async (id: number): Promise<Order> => {
  const token = localStorage.getItem(ADMIN_TOKEN_KEY);
  const res = await fetch(`${BACKEND_URL}/admins/orders/${id}`, {
    method: "GET",
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  if (res.status === 401 || res.status === 403) {
    throw new Error("unauthorized");
  }

  if (!res.ok) throw new Error("Failed to fetch order");
  return res.json();
};

export const fulfillOrder = async (id: number): Promise<void> => {
  const token = localStorage.getItem(ADMIN_TOKEN_KEY);
  const res = await fetch(`${BACKEND_URL}/admins/orders/${id}/fulfill`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  if (res.status === 401 || res.status === 403) {
    throw new Error("unauthorized");
  }

  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg || "Failed to fulfill order");
  }
};

export default {
  getOrders,
  getOrder,
  fulfillOrder,
};

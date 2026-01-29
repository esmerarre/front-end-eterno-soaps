// services/checkout.ts
export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export const createCheckoutSession = async (items: CartItem[]) => {
  // backend URL from your .env
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const response = await fetch(`${BACKEND_URL}/checkout`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items }), // must match your backend Pydantic model
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Failed to create checkout session: ${text}`);
  }

  const data = await response.json();
  return data.url; // URL to redirect to Stripe
};


// services/checkout.ts
export interface CheckoutCartItem {
  id: number
  name: string
  price: number
  quantity: number
}

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL 

export const createCheckoutSession = async (
  items: CheckoutCartItem[]
) => {
  // Save cart ONLY (variants come from backend later)
  localStorage.setItem("checkoutCart", JSON.stringify(items))

  const response = await fetch(`${BACKEND_URL}/api/checkout`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items }),
  })

  if (!response.ok) {
    const text = await response.text()
    throw new Error(text)
  }

  const data = await response.json()
  return data.url
}



const BACKEND_URL =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

export const decreaseStock = async (
  productId: number,
  variantId: number,
  quantityPurchased: number
) => {
  const res = await fetch(
    `${BACKEND_URL}/products/${productId}/variants/${variantId}/stock`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quantity: quantityPurchased }),
    }
  );

  if (!res.ok) {
    throw new Error("Failed to decrease stock");
  }

  return res.json();
};
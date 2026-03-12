const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
const ADMIN_TOKEN_KEY = "admin_access_token";

export const getPresignedUploadUrl = async (
  fileName: string,
  contentType: string
): Promise<{ uploadUrl: string; key: string }> => {
  const token = localStorage.getItem(ADMIN_TOKEN_KEY);
  const res = await fetch(`${BACKEND_URL}/upload/presigned-url`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({ fileName, contentType }),
  });

  if (!res.ok) {
    throw new Error("Failed to get presigned upload URL");
  }

  return res.json();
};

export const uploadImageToS3 = async (
  file: File,
  uploadUrl: string
): Promise<void> => {
  const res = await fetch(uploadUrl, {
    method: "PUT",
    headers: { "Content-Type": file.type },
    body: file,
  });

  if (!res.ok) {
    throw new Error("Failed to upload image to S3");
  }
};

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
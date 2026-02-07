// frontend/services/contact.ts
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export async function sendContactForm(data: { name: string; email: string; message: string }) {
  const res = await fetch(`${BASE_URL}/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to send contact form");

  return res.json();
}

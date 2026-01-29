// frontend/services/contact.ts
export async function sendContactForm(data: { name: string; email: string; message: string }) {
  const res = await fetch("http://localhost:8000/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to send contact form");

  return res.json();
}

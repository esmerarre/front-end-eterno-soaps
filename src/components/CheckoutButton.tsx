// frontend/src/components/CheckoutButton.tsx
import React, { useState } from "react"
import { createCheckoutSession, type CartItem } from "../services/checkout"

interface CheckoutButtonProps {
  items: CartItem[]
}

const CheckoutButton: React.FC<CheckoutButtonProps> = ({ items }) => {
  const [loading, setLoading] = useState(false)

  const handleCheckout = async () => {
    setLoading(true)
    try {
      console.log("🛒 Checkout button clicked!", items)
      const url = await createCheckoutSession(items)
      window.location.href = url
    } catch (err) {
      console.error(err)
      alert("Failed to start checkout. Try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <button onClick={handleCheckout} disabled={loading}>
      {loading ? "Processing..." : "Checkout"}
    </button>
  )
}

export default CheckoutButton

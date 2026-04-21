import React, { useState } from "react"
import { createCheckoutSession} from "../services/checkout"
import type { CartItem } from "../App"

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
  
//add on line 27 diable button when items is empty
  return (
    <button onClick={handleCheckout} className="checkout-btn" disabled={loading || items.length === 0} aria-disabled={loading || items.length === 0} title={items.length === 0 ? "Your cart is empty" : undefined}>
      {loading ? "Processing..." : "Checkout"}
    </button>
  )
}

export default CheckoutButton

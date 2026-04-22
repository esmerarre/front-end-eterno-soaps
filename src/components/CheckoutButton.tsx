import React, { useState } from "react"
import { createCheckoutSession } from "../services/checkout"
import type { CartItem } from "../App"

interface CheckoutButtonProps {
  items: CartItem[]
}

const CheckoutButton: React.FC<CheckoutButtonProps> = ({ items }) => {
  const [loading, setLoading] = useState(false)
  const [showPolicyModal, setShowPolicyModal] = useState(false)

  const handleCheckout = async () => {
    setLoading(true)
    try {
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
    <>
      <button
        onClick={() => setShowPolicyModal(true)}
        className="checkout-btn"
        disabled={loading || items.length === 0}
      >
        {loading ? "Processing..." : "Checkout"}
      </button>

      {showPolicyModal && (
        <div className="policy-modal-overlay" role="dialog" aria-modal="true">
          <div className="policy-modal">
            <button
              className="policy-close"
              aria-label="Close policy"
              onClick={() => setShowPolicyModal(false)}
            >
              ×
            </button>
            <h2 className="policy-title">Store Policy</h2>
            <h3>All sales are final</h3>
            <p>
              We do not offer refunds, exchanges, or returns on any orders once they have been
              placed and payment has been processed. This applies to all soap and products in our
              store.
            </p>
            <h3>Order cancellations</h3>
            <p>
              Orders cannot be cancelled once they have been placed. Since many of our products are
              made to order, production may begin immediately after purchase. Please review your
              cart carefully before completing checkout.
            </p>
            <h3>Production time</h3>
            <p>
              Because each bar of soap is handcrafted in small batches, please allow 1 to 2 weeks
              for your order to be made. Production times may vary slightly depending on order
              volume and product type. We appreciate your patience and want to ensure every product
              meets our quality standards before it ships. Once your order has been completed and
              shipped, you will receive a shipping confirmation email.
            </p>
            <h3>Skin irritation disclaimer</h3>
            <p>
              All of our soaps are crafted with care using quality ingredients; 
              however, every individual's skin is unique and may respond differently to the same product. 
              Some customers may tolerate a formula very well, while others may experience sensitivity 
              or irritation. We are not responsible for any skin reactions that may occur as a result 
              of using our products. We encourage you to review the key ingredients listed on each product page prior to purchasing, 
              especially if you have known sensitivities.
            </p>
            <h3>Contact Us </h3>
            <p>
              If you have any questions about our products, ingredients, or policies, please don't hesitate to reach out. 
              We are here to help and want to ensure you have a positive experience with Eterno Soaps.
            </p>
            <div className="modal-actions">
              <button
                className="btn-secondary"
                onClick={() => setShowPolicyModal(false)}
              >
                Go Back
              </button>
              <button
                className="btn-submit"
                onClick={() => {
                  setShowPolicyModal(false)
                  handleCheckout()
                }}
                disabled={loading}
              >
                Continue to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default CheckoutButton

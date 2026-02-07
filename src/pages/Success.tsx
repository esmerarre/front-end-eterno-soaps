import { decreaseStock } from "../services/product";
import type { CartItem } from "../App";
import { useEffect, useState } from "react";
import "./Success.css";
import Confetti from "react-confetti";
import { useNavigate } from "react-router-dom";


export default function Success() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showConfetti, setShowConfetti] = useState(true);
  const navigate = useNavigate();

  // Load cart once
  useEffect(() => {
    const savedCart = localStorage.getItem("checkoutCart");
    if (!savedCart) return;

    try {
      const parsed = JSON.parse(savedCart) as CartItem[];
      console.log("Parsed checkoutCart:", parsed);
      setCartItems(parsed);
    } catch (err) {
      console.error("Failed to parse checkoutCart:", err);
    }
  }, []);

  // Decrease stock ONCE
  useEffect(() => {
    if (!cartItems.length) return;
    console.log("Decreasing stock for items:", cartItems);

    const updateStock = async () => {
      for (const item of cartItems) {
        await decreaseStock(
          /* productId */ item.productId,
          /* variantId */ item.id,
          /* quantity */ item.quantity
        );
      }

      localStorage.removeItem("checkoutCart");
    };

    updateStock();
  }, [cartItems]);
  // Stop confetti after 4 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, [])

  return (
    <>
      {showConfetti && <Confetti />}
      <div className="success-backdrop" />
      <div className="success-page">
        <button
          className="success-close-btn"
          onClick={() => navigate("/")}
          aria-label="Close"
        >
          ✕
        </button>
        <h1>Thank you for your purchase! 🧼✨</h1>
        <p>Your order has been processed successfully.</p>
        <button
          className="continue-shopping-btn"
          onClick={() => navigate("/#products")}
        >
          Continue Shopping
        </button>
      </div>
    </>
  );
}

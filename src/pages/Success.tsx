import { decreaseStock } from "../services/product";
import type { CartItem } from "../App";
import { useEffect, useState } from "react";
import "./Success.css";

export default function Success() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Load cart once
  useEffect(() => {
    const savedCart = localStorage.getItem("checkoutCart");
    if (!savedCart) return;

    try {
      const parsed = JSON.parse(savedCart) as CartItem[];
      setCartItems(parsed);
    } catch (err) {
      console.error("Failed to parse checkoutCart:", err);
    }
  }, []);

  // Decrease stock ONCE
  useEffect(() => {
    if (!cartItems.length) return;

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

  return (
    <>
      <div className="success-backdrop" />
      <div className="success-page">
        <h1>Thank you for your purchase!</h1>
        <p>Your order has been processed.</p>
      </div>
    </>
  );
}

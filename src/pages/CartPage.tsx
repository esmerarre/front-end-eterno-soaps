import React from "react";
import "./CartPage.css";
import type { CartItem } from "../services/checkout";
import CheckoutButton from "../components/CheckoutButton";

interface CartPageProps {
  items: CartItem[];
  onClose: () => void;
}

const CartPage: React.FC<CartPageProps> = ({ items, onClose }) => {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
      {/* Semi-transparent backdrop */}
      <div className="cart-backdrop" onClick={onClose}></div>

      {/* Cart sidebar */}
      <div className="cart-page">
        <button onClick={onClose} className="close-btn">×</button>
        <h2>Your Cart</h2>

        {items.length === 0 ? (
          <p className="empty-cart">Your cart is empty</p>
        ) : (
          <ul className="cart-items">
            {items.map((item) => (
              <li key={item.id} className="cart-item">
                <span>{item.name}</span>
                <span>
                  {item.quantity} × ${item.price.toFixed(2)}
                </span>
                <span>${(item.quantity * item.price).toFixed(2)}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="cart-footer">
          <p className="subtotal">Subtotal: ${subtotal.toFixed(2)}</p>
          <CheckoutButton items={items}/>

        </div>
      </div>
    </>
  );
};

export default CartPage;

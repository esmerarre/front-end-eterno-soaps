import React from "react";
import "./CartPage.css";
import type { CartItem } from "../App";
import CheckoutButton from "../components/CheckoutButton";

interface CartPageProps {
  items: CartItem[];
  onClose: () => void;
  onRemoveItem: (id: number) => void;
}

const CartPage: React.FC<CartPageProps> = ({ items, onClose, onRemoveItem }) => {
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

        
          <>
          <div className="cart-items-header">
            <span className="header-action"></span>
            <span className="header-product">Product</span>
            <span className="header-quantity">Quantity</span>
            <span className="header-total">Total</span>
          
           
            
          </div> 

          <ul className="cart-items">
            {items.map((item) => (
              <li key={item.id} className="cart-item">
                <span className="item-action">
                    <button className="delete-btn" onClick={() => onRemoveItem(item.id)}> x </button></span>
                <span className="item-name">{item.name}</span>
                <span className="item-quantity">
                  {item.quantity}
                </span>
                <span className="item-total">${(item.quantity * item.price).toFixed(2)}</span>
                
              </li>
            ))}
          </ul>
          </>
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

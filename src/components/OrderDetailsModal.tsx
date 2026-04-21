import React, { useState } from "react";
import type { Order } from "../services/orders";
import "./AdminOrdersPage.css";
import * as ordersApi from "../services/orders";

interface Props {
  order: Order;
  onClose: () => void;
  onFulfilled: (id: number) => void;
}

export default function OrderDetailsModal({ order, onClose, onFulfilled }: Props) {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFulfill = async () => {
    const confirmed = window.confirm(`Mark order #${order.id} as fulfilled?`);
    if (!confirmed) return;
    setIsProcessing(true);
    try {
      await ordersApi.fulfillOrder(order.id);
      onFulfilled(order.id);
      window.alert(`Order #${order.id} marked fulfilled.`);
    } catch (err: any) {
      window.alert(`Error: ${err?.message ?? err}`);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-order-content" role="dialog" aria-modal="true" aria-labelledby="order-title" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose} aria-label="Close">×</button>
        <h3 id="order-title">Order #{order.id}</h3>
        <div className="order-meta">
          <div><strong>Date:</strong> {new Date(order.order_date).toLocaleString()}</div>
          <div><strong>Customer:</strong> {order.customer_name}</div>
          <div><strong>Email:</strong> {order.customer_email}</div>
          <div><strong>Stripe Session:</strong> {order.stripe_session_id}</div>
          <div><strong>Status:</strong> {order.order_status}</div>
          <div><strong>Amount:</strong> {order.amount.toFixed(2)} {order.currency?.toUpperCase()}</div>
        </div>

        <table className="order-details-table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {order.details.map((d) => (
              <tr key={d.id}>
                <td>{d.product_name}</td>
                <td>{d.quantity}</td>
                <td>{d.price.toFixed(2)}</td>
                <td>{d.total_price.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="modal-actions">
          <button onClick={onClose}>Close</button>
          {order.order_status !== "fulfilled" && (
            <button onClick={handleFulfill} disabled={isProcessing} className="fulfill-btn">{isProcessing ? "Processing…" : "Mark Fulfilled"}</button>
          )}
        </div>
      </div>
    </div>
  );
}

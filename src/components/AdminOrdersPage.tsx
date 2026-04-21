import React, { useEffect, useState } from "react";
import * as ordersApi from "../services/orders";
import OrderDetailsModal from "./OrderDetailsModal";
import "./AdminOrdersPage.css";

const PAGE_SIZE = 10;

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<ordersApi.Order[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState<ordersApi.Order | null>(null);

  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await ordersApi.getOrders();
      setOrders(data ?? []);
    } catch (err: any) {
      if (err?.message === "unauthorized") {
        setError("Unauthorized. Please sign in as admin.");
      } else {
        setError(String(err?.message ?? err));
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const onFulfilled = (id: number) => {
    setOrders((prev) =>
      prev
        ? prev.map((o) => (o.id === id ? { ...o, order_status: "fulfilled" } : o))
        : prev
    );
    if (selectedOrder?.id === id) setSelectedOrder({ ...selectedOrder, order_status: "fulfilled" });
  };

  const filtered = (orders ?? []).filter((o) => {
    if (filter === "unfulfilled" && o.order_status === "fulfilled") return false;
    if (filter === "fulfilled" && o.order_status !== "fulfilled") return false;
    if (!search.trim()) return true;
    const s = search.toLowerCase();
    if (String(o.id).includes(s)) return true;
    if (o.customer_name?.toLowerCase().includes(s)) return true;
    if (o.customer_email?.toLowerCase().includes(s)) return true;
    return false;
  });

  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="admin-orders">
      <div className="orders-header">
        <h2>Orders</h2>
        <div className="orders-controls">
          <label>
            Status:
            <select value={filter} onChange={(e) => { setFilter(e.target.value); setPage(1); }}>
              <option value="all">All</option>
              <option value="unfulfilled">Unfulfilled</option>
              <option value="fulfilled">Fulfilled</option>
            </select>
          </label>
          <label>
            Search:
            <input
              aria-label="Search orders"
              placeholder="id, name, or email"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            />
          </label>
        </div>
      </div>

      {loading ? (
        <div className="spinner">Loading orders…</div>
      ) : error ? (
        <div className="error">{error}</div>
      ) : (orders && orders.length === 0) ? (
        <div className="empty">No orders found.</div>
      ) : (
        <>
          <table className="orders-table" aria-live="polite">
            <thead>
              <tr>
                <th>Order #</th>
                <th>Date</th>
                <th>Customer</th>
                <th>Email</th>
                <th>Items</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pageItems.map((order) => (
                <tr key={order.id} className={order.order_status === "fulfilled" ? "fulfilled" : undefined}>
                  <td>{order.id}</td>
                  <td>{new Date(order.order_date).toLocaleString()}</td>
                  <td>{order.customer_name}</td>
                  <td>{order.customer_email}</td>
                  <td>{order.details?.reduce((s, d) => s + d.quantity, 0) ?? 0}</td>
                  <td>{order.amount.toFixed(2)} {order.currency?.toUpperCase()}</td>
                  <td>{order.order_status}</td>
                  <td>
                    <button aria-label={`View order ${order.id}`} onClick={() => setSelectedOrder(order)}>View</button>
                    {order.order_status !== "fulfilled" && (
                      <button
                        className="fulfill-btn"
                        onClick={async () => {
                          const confirmed = window.confirm(`Mark order #${order.id} as fulfilled?`);
                          if (!confirmed) return;
                          try {
                            await ordersApi.fulfillOrder(order.id);
                            onFulfilled(order.id);
                            window.alert(`Order #${order.id} marked fulfilled.`);
                          } catch (err: any) {
                            window.alert(`Failed to fulfill order: ${err?.message ?? err}`);
                          }
                        }}
                      >
                        Fulfill
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="pagination">
            <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page <= 1} aria-label="Previous page">Prev</button>
            <span>Page {page} / {pages}</span>
            <button onClick={() => setPage((p) => Math.min(pages, p + 1))} disabled={page >= pages} aria-label="Next page">Next</button>
          </div>
        </>
      )}

      {selectedOrder && (
        <OrderDetailsModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
          onFulfilled={onFulfilled}
        />
      )}
    </div>
  );
}

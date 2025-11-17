import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

export default function StockPage() {
  // ---------- HOOKS MUST BE AT TOP ----------
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState("all");

  const user = localStorage.getItem("user");
  const isLoggedIn = Boolean(user);

  // Load data
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("items") || "[]");
    setItems(saved);
  }, []);

  // ---------- REDIRECT AFTER HOOKS ----------
  if (!isLoggedIn) return <Navigate to="/login" replace />;

  // ---------- FILTER ----------
  const filteredItems =
    filter === "low"
      ? items.filter((i) => Number(i.quantity) < 5)
      : items;

  return (
    <div className="page-container">
      <h2 className="title">Stock Availability</h2>

      <div className="card">
        <div className="row-between">
          <h3>All Stock Items</h3>

          <select
            className="search"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">Show All</option>
            <option value="low">Low Stock Only</option>
          </select>
        </div>

        {filteredItems.length === 0 ? (
          <p>No items to display.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Quantity</th>
                <th>Category</th>
                <th>Location</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {filteredItems.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>{item.category || "—"}</td>
                  <td>{item.location}</td>
                  <td>
                    {item.quantity < 5 ? (
                      <span className="badge-low">Low Stock</span>
                    ) : (
                      <span className="badge-ok">Available</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

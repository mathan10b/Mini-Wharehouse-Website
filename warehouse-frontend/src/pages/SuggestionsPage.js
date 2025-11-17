import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export default function SuggestionsPage() {
  const [items, setItems] = useState([]);

  const user = localStorage.getItem("user");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("items")) || [];
    setItems(saved);
  }, []);

  if (!user) return <Navigate to="/login" />;

  const lowStock = items.filter((i) => i.quantity < 5);

  return (
    <div className="page-container">
      <h2 className="title">Smart Suggestions</h2>

      <div className="card">
        <ul>
          {lowStock.map((i, idx) => (
            <li key={idx} className="suggestion-item">
              <strong>{i.name}</strong> — Stock is low ({i.quantity})
            </li>
          ))}
        </ul>

        {lowStock.length === 0 && (
          <p>No suggestions — Stock levels are healthy.</p>
        )}
      </div>
    </div>
  );
}

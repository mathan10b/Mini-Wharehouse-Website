import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import ItemForm from "../components/ItemForm";
import ItemList from "../components/ItemList";

export default function ItemsPage() {
  // 🔹 Hooks MUST be at the top — always
  const [items, setItems] = useState([]);
  const [editItem, setEditItem] = useState(null);

  // 🔹 Login check should happen AFTER hooks
  const user = localStorage.getItem("user");
  const isLoggedIn = Boolean(user);

  // 🔹 Load items (always runs first, not conditional)
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("items") || "[]");
    setItems(saved);
  }, []);

  // 🔹 If not logged in → redirect (safe here)
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  // ----------- Item Actions -------------
  const handleSave = (item) => {
    let updated;

    if (editItem) {
      updated = items.map((i) => (i.id === editItem.id ? item : i));
      setEditItem(null);
    } else {
      updated = [...items, { ...item, id: Date.now() }];
    }

    setItems(updated);
    localStorage.setItem("items", JSON.stringify(updated));
  };

  const handleDelete = (id) => {
    const updated = items.filter((i) => i.id !== id);
    setItems(updated);
    localStorage.setItem("items", JSON.stringify(updated));
  };

  const handleEdit = (item) => {
    setEditItem(item);
  };

  return (
    <div className="page-container">
      <h2 className="title">Manage Items</h2>

      <div className="card">
        <ItemForm existing={editItem} onSaved={handleSave} />
      </div>

      <div className="card">
        <ItemList items={items} onEdit={handleEdit} onDelete={handleDelete} />
      </div>
    </div>
  );
}

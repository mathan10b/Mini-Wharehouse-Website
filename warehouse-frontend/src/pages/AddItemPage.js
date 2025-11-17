import React from "react";
import { Navigate } from "react-router-dom";
import ItemForm from "../components/ItemForm";

export default function AddItemPage() {
  const user = localStorage.getItem("user");

  if (!user) return <Navigate to="/login" />;

  function handleSaved() {
    alert("Item saved successfully!");
  }

  return (
    <div className="page-container">
      <h2 className="title">Add Stock</h2>

      <div className="card">
        <ItemForm onSaved={handleSaved} />
      </div>
    </div>
  );
}

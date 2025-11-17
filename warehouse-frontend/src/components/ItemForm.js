import React, { useState, useEffect } from "react";
import { createItem, updateItem } from "./api";

export default function ItemForm({ item = null, editIndex = null, onSaved }) {
  const [form, setForm] = useState({
    name: "",
    quantity: "",
    location: "",
    category: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (item) {
      setForm({
        name: item.name,
        quantity: item.quantity,
        location: item.location,
        category: item.category,
      });
    }
  }, [item]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.name || !form.quantity || !form.location || !form.category) {
      alert("Please fill all fields.");
      return;
    }

    setLoading(true);
    try {
      if (editIndex !== null && item && item.id) {
        // Update existing item
        await updateItem(item.id, form);
      } else {
        // Create new item
        await createItem(form);
      }

      if (typeof onSaved === "function") {
        onSaved();
      }

      if (editIndex === null) {
        setForm({ name: "", quantity: "", location: "", category: "" });
      }
    } catch (error) {
      alert("Error saving item: " + error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="item-form">

      <div className="form-row">
        <input
          type="text"
          name="name"
          value={form.name}
          placeholder="Item Name"
          onChange={handleChange}
        />

        <input
          type="number"
          name="quantity"
          value={form.quantity}
          placeholder="Quantity"
          onChange={handleChange}
        />
      </div>

      <div className="form-row">
        <input
          type="text"
          name="location"
          value={form.location}
          placeholder="Location"
          onChange={handleChange}
        />

        <select
          name="category"
          value={form.category}
          onChange={handleChange}
        >
          <option value="">Select Category</option>
          <option value="Electronics">Electronics</option>
          <option value="Food">Food</option>
          <option value="Clothing">Clothing</option>
          <option value="Hardware">Hardware</option>
          <option value="Mobile">Mobile</option>
        </select>
      </div>

      <button type="submit" className="save-btn" disabled={loading}>
        {loading ? "Saving..." : (editIndex !== null ? "Update Item" : "Add Item")}
      </button>
    </form>
  );
}

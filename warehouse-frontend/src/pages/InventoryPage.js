import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { getItems, createItem, deleteItem } from "../components/api";

export default function InventoryPage() {
  const user = localStorage.getItem("user");
  if (!user) return <Navigate to="/login" />;

  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [qty, setQty] = useState("");
  const [loc, setLoc] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  async function loadItems() {
    setLoading(true);
    const data = await getItems();
    setItems(data);
    setLoading(false);
  }

  useEffect(() => {
    loadItems();
  }, []);

  async function addItem() {
    if (!name || !qty || !loc) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);
    try {
      const newItem = { name, quantity: Number(qty), location: loc, category: "General" };
      await createItem(newItem);
      await loadItems();
      setName(""); setQty(""); setLoc("");
    } catch (error) {
      alert("Error adding item: " + error.message);
    } finally {
      setLoading(false);
    }
  }

  async function deleteItemHandler(id) {
    if (confirm("Are you sure you want to delete this item?")) {
      setLoading(true);
      try {
        await deleteItem(id);
        await loadItems();
      } catch (error) {
        alert("Error deleting item: " + error.message);
      } finally {
        setLoading(false);
      }
    }
  }

  function exportPDF() {
    const doc = new jsPDF();
    doc.text("Warehouse Item Report", 14, 16);

    doc.autoTable({
      startY: 22,
      head: [["Name", "Qty", "Location"]],
      body: items.map((i) => [i.name, i.quantity, i.location]),
    });

    doc.save("Items.pdf");
  }

  return (
    <div className="page-container">

      <h2 className="title">Inventory Management</h2>

      {/* ADD SECTION */}
      <div className="card">
        <h3>Add New Stock</h3>

        <div className="form-row">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Item Name" />
          <input value={qty} onChange={(e) => setQty(e.target.value)} placeholder="Quantity" />
          <input value={loc} onChange={(e) => setLoc(e.target.value)} placeholder="Location" />
          <button onClick={addItem} disabled={loading}>Add</button>
        </div>
      </div>

      {/* SEARCH + EXPORT */}
      <div className="row-between">
        <input className="search" placeholder="Search items..." onChange={(e) => setSearch(e.target.value)} />

        <button className="pdf-btn" onClick={exportPDF}>Export PDF</button>
      </div>

      {/* ITEMS TABLE */}
      <div className="card">
        {loading ? <p>Loading...</p> : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Qty</th>
              <th>Location</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {items
              .filter((i) =>
                i.name.toLowerCase().includes(search.toLowerCase())
              )
              .map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>{item.location}</td>

                  <td>
                    {item.quantity < 5 ? (
                      <span className="badge-low">Low</span>
                    ) : (
                      <span className="badge-ok">Normal</span>
                    )}
                  </td>

                  <td>
                    <button onClick={() => deleteItemHandler(item.id)} className="del-btn" disabled={loading}>Delete</button>
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
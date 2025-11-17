import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Pie, Bar } from "react-chartjs-2";
import "chart.js/auto";

export default function DashboardPage() {
  const [items, setItems] = useState([]);

  const user = localStorage.getItem("user");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("items")) || [];
    setItems(saved);
  }, []);

  if (!user) return <Navigate to="/login" />;

  const categories = [...new Set(items.map((i) => i.name))];

  const pieData = {
    labels: categories,
    datasets: [
      {
        data: categories.map(
          (cat) => items.filter((i) => i.name === cat).length
        ),
        backgroundColor: ["#4e73df", "#1cc88a", "#36b9cc", "#f6c23e"],
      },
    ],
  };

  const barData = {
    labels: items.map((i) => i.name),
    datasets: [
      {
        label: "Stock Qty",
        data: items.map((i) => i.quantity),
        backgroundColor: "#4e73df",
      },
    ],
  };

  return (
    <div className="page-container">
      <h2 className="title">Dashboard</h2>

      <div className="kpi-row">
        <div className="kpi-card">
          <h3>{items.length}</h3>
          <p>Total Items</p>
        </div>

        <div className="kpi-card">
          <h3>{categories.length}</h3>
          <p>Categories</p>
        </div>

        <div className="kpi-card">
          <h3>{items.filter((i) => i.quantity < 5).length}</h3>
          <p>Low Stock</p>
        </div>
      </div>

      <div className="graph-section">
        <div className="graph-card small-graph">
          <h3>Category Distribution</h3>
          <Pie data={pieData} />
        </div>

        <div className="graph-card small-graph">
          <h3>Stock Levels</h3>
          <Bar data={barData} />
        </div>
      </div>
    </div>
  );
}

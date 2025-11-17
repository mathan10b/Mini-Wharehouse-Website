import React, { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import { getItems } from "./api";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend);

export default function Dashboard() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadItems() {
    setLoading(true);
    const data = await getItems();
    setItems(data);
    setLoading(false);
  }

  useEffect(() => { 
    loadItems();
    // Refresh every 5 seconds to see updates
    const interval = setInterval(loadItems, 5000);
    return () => clearInterval(interval);
  }, []);

  const totalItems = items.length;
  const categoryCount = [...new Set(items.map(i => i.category))].length;
  const lowStock = items.filter(i => i.quantity < 10).length;

  return (
    <div>
      <h2>Dashboard</h2>
      
      {loading ? <p>Loading...</p> : (
      <>
      <div className="metrics">
        <div className="metric-box">
          <h3>{totalItems}</h3>
          <p>Total Items</p>
        </div>

        <div className="metric-box">
          <h3>{categoryCount}</h3>
          <p>Categories</p>
        </div>

        <div className="metric-box">
          <h3>{lowStock}</h3>
          <p>Low Stock</p>
        </div>
      </div>

      <h3>Category Distribution</h3>
      <Pie
        data={{
          labels: items.map(i => i.name),
          datasets: [{
            data: items.map(i => i.quantity),
            backgroundColor: ["#007bff", "#ffb700", "#ff4444", "#00c49a"]
          }]
        }}
      />

      <h3 style={{ marginTop: "30px" }}>Stock Levels</h3>
      <Bar
        data={{
          labels: items.map(i => i.name),
          datasets: [{
            label: "Quantity",
            data: items.map(i => i.quantity),
            backgroundColor: "#007bff"
          }]
        }}
      />
      </>
      )}
    </div>
  );
}

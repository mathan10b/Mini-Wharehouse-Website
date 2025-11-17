import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export default function ActivityLogPage() {
  const user = localStorage.getItem("user");
  if (!user) return <Navigate to="/login" />;

  const [logs, setLogs] = useState([]);

  async function loadLogs() {
    const res = await fetch("http://localhost:5000/api/logs");
    setLogs(await res.json());
  }

  useEffect(() => { loadLogs(); }, []);

  return (
    <div className="card">
      <h2>Activity History</h2>
      <ul>
        {logs.map((l, idx) => <li key={idx}>{l}</li>)}
      </ul>
    </div>
  );
}

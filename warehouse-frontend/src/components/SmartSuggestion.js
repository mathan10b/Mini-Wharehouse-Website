import React, { useEffect, useState } from "react";

export default function SmartSuggestion() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/items/predictions/all")
      .then(res => res.json())
      .then(result => setData(result));
  }, []);

  return (
    <div className="card">
      <h2>Suggestions</h2>

      {data.length === 0 && <p>No suggestions available.</p>}

      <ul>
        {data.map(i => (
          <li key={i.id} className="suggestion-item">
            <strong>{i.name}</strong> — {i.suggestion.type}: {i.suggestion.message}
          </li>
        ))}
      </ul>
    </div>
  );
}

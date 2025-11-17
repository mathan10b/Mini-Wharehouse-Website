import React from "react";

export default function ItemList({ items, onDelete, onEdit }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Qty</th>
          <th>Location</th>
          <th>Category</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {items.map((item) => (
          <tr key={item.id}>
            <td>{item.name}</td>
            <td>{item.quantity}</td>
            <td>{item.location}</td>
            <td>{item.category}</td>

            <td>
              <button onClick={() => onEdit(item)} className="edit-btn">
                Edit
              </button>

              <button
                onClick={() => onDelete(item.id)}
                className="del-btn"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const API_BASE_URL = "http://localhost:5000/api";

// Get all items
export const getItems = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/items`);
    if (!response.ok) throw new Error("Failed to fetch items");
    return await response.json();
  } catch (error) {
    console.error("Error fetching items:", error);
    return [];
  }
};

// Create new item
export const createItem = async (item) => {
  try {
    const response = await fetch(`${API_BASE_URL}/items`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    });
    if (!response.ok) throw new Error("Failed to create item");
    return await response.json();
  } catch (error) {
    console.error("Error creating item:", error);
    throw error;
  }
};

// Update item
export const updateItem = async (id, item) => {
  try {
    const response = await fetch(`${API_BASE_URL}/items/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    });
    if (!response.ok) throw new Error("Failed to update item");
    return await response.json();
  } catch (error) {
    console.error("Error updating item:", error);
    throw error;
  }
};

// Delete item
export const deleteItem = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/items/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to delete item");
    return await response.json();
  } catch (error) {
    console.error("Error deleting item:", error);
    throw error;
  }
};

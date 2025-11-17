import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import DashboardPage from "./pages/DashboardPage";
import AddItemPage from "./pages/AddItemPage";
import ItemsPage from "./pages/ItemsPage";
import SuggestionsPage from "./pages/SuggestionsPage";

export default function App() {
  return (
    <>
      <Navbar />

      <div className="container">
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/add-item" element={<AddItemPage />} />
          <Route path="/items" element={<ItemsPage />} />
          <Route path="/suggestions" element={<SuggestionsPage />} />
        </Routes>
      </div>
    </>
  );
}

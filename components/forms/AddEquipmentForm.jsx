"use client";

import { useState, useEffect } from "react";

export default function AddEquipmentForm() {
  const [categories, setCategories] = useState([]); // To store fetched categories
  const [equipment, setEquipment] = useState({
    name: "",
    category: "",
    hourlyRate: "",
    dailyRate: "",
    stock: "",
    studentDiscount: "",
  });

  // Fetch categories when the component loads
  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch("/api/categories");
        const data = await res.json();
        if (data.success) {
          setCategories(data.data);
        } else {
          alert("Failed to fetch categories");
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }
    fetchCategories();
  }, []);

  const handleEquipmentSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/equipment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(equipment),
      });

      const data = await res.json();
      if (data.success) {
        alert("Equipment added successfully!");
        setEquipment({
          name: "",
          category: "",
          hourlyRate: "",
          dailyRate: "",
          stock: "",
          studentDiscount: "",
        });
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error adding equipment:", error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      {/* Add Equipment */}
      <div className="card bg-base-100 shadow-lg p-4">
        <h2 className="text-2xl font-semibold mb-4">Add Equipment</h2>
        <form onSubmit={handleEquipmentSubmit} className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Equipment Name</span>
            </label>
            <input
              type="text"
              placeholder="Equipment Name"
              value={equipment.name}
              onChange={(e) =>
                setEquipment({ ...equipment, name: e.target.value })
              }
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Category</span>
            </label>
            <select
              value={equipment.category}
              onChange={(e) =>
                setEquipment({ ...equipment, category: e.target.value })
              }
              className="select select-bordered w-full"
            >
              <option value="" disabled>
                Select a Category
              </option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Hourly Rate</span>
            </label>
            <input
              type="number"
              placeholder="Hourly Rate"
              value={equipment.hourlyRate}
              onChange={(e) =>
                setEquipment({ ...equipment, hourlyRate: e.target.value })
              }
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Daily Rate</span>
            </label>
            <input
              type="number"
              placeholder="Daily Rate"
              value={equipment.dailyRate}
              onChange={(e) =>
                setEquipment({ ...equipment, dailyRate: e.target.value })
              }
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Stock</span>
            </label>
            <input
              type="number"
              placeholder="Stock"
              value={equipment.stock}
              onChange={(e) =>
                setEquipment({ ...equipment, stock: e.target.value })
              }
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Student Discount (%)</span>
            </label>
            <input
              type="number"
              placeholder="Student Discount"
              value={equipment.studentDiscount}
              onChange={(e) =>
                setEquipment({
                  ...equipment,
                  studentDiscount: e.target.value,
                })
              }
              className="input input-bordered w-full"
            />
          </div>
          <button className="btn btn-primary w-full">Add Equipment</button>
        </form>
      </div>
    </div>
  );
}

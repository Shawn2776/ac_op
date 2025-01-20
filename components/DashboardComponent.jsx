"use client";

import { useState, useEffect } from "react";

export default function DashboardPage() {
  const [categories, setCategories] = useState([]); // To store fetched categories
  const [category, setCategory] = useState({ name: "", description: "" });
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
          setCategories(data.data); // Assuming the API returns categories in `data.data`
        } else {
          alert("Failed to fetch categories");
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }
    fetchCategories();
  }, []);

  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(category),
      });

      const data = await res.json();
      if (data.success) {
        alert("Category added successfully!");
        setCategory({ name: "", description: "" });
        setCategories([...categories, data.data]); // Update dropdown with new category
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

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
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="flex gap-8">
        {/* Add Category */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Add Category</h2>
          <form onSubmit={handleCategorySubmit}>
            <input
              type="text"
              placeholder="Category Name"
              value={category.name}
              onChange={(e) =>
                setCategory({ ...category, name: e.target.value })
              }
              className="block border mb-2 p-2"
            />
            <textarea
              placeholder="Description (Optional)"
              value={category.description}
              onChange={(e) =>
                setCategory({ ...category, description: e.target.value })
              }
              className="block border mb-2 p-2"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Add Category
            </button>
          </form>
        </div>

        {/* Add Equipment */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Add Equipment</h2>
          <form onSubmit={handleEquipmentSubmit}>
            <input
              type="text"
              placeholder="Equipment Name"
              value={equipment.name}
              onChange={(e) =>
                setEquipment({ ...equipment, name: e.target.value })
              }
              className="block border mb-2 p-2"
            />
            <select
              value={equipment.category}
              onChange={(e) =>
                setEquipment({ ...equipment, category: e.target.value })
              }
              className="block border mb-2 p-2"
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
            <input
              type="number"
              placeholder="Hourly Rate"
              value={equipment.hourlyRate}
              onChange={(e) =>
                setEquipment({ ...equipment, hourlyRate: e.target.value })
              }
              className="block border mb-2 p-2"
            />
            <input
              type="number"
              placeholder="Daily Rate"
              value={equipment.dailyRate}
              onChange={(e) =>
                setEquipment({ ...equipment, dailyRate: e.target.value })
              }
              className="block border mb-2 p-2"
            />
            <input
              type="number"
              placeholder="Stock"
              value={equipment.stock}
              onChange={(e) =>
                setEquipment({ ...equipment, stock: e.target.value })
              }
              className="block border mb-2 p-2"
            />
            <input
              type="number"
              placeholder="Student Discount (%)"
              value={equipment.studentDiscount}
              onChange={(e) =>
                setEquipment({
                  ...equipment,
                  studentDiscount: e.target.value,
                })
              }
              className="block border mb-2 p-2"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Add Equipment
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

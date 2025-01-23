"use client";

import { useState, useEffect } from "react";

export default function AddCategoryForm() {
  const [categories, setCategories] = useState([]); // To store fetched categories
  const [category, setCategory] = useState({ name: "", description: "" });

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
        setCategories([...categories, data.data]);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6">Add Categories</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Add Category */}
        <div className="card bg-base-100 shadow-lg p-4">
          <h2 className="text-2xl font-semibold mb-4">Add Category</h2>
          <form onSubmit={handleCategorySubmit} className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Category Name</span>
              </label>
              <input
                type="text"
                placeholder="Category Name"
                value={category.name}
                onChange={(e) =>
                  setCategory({ ...category, name: e.target.value })
                }
                className="input input-bordered w-full"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <textarea
                placeholder="Description (Optional)"
                value={category.description}
                onChange={(e) =>
                  setCategory({ ...category, description: e.target.value })
                }
                className="textarea textarea-bordered w-full"
              ></textarea>
            </div>
            <button className="btn btn-primary w-full">Add Category</button>
          </form>
        </div>
      </div>
    </div>
  );
}

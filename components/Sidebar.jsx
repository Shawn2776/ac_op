"use client";

import { useState } from "react";

export default function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      {/* Mobile Sidebar Toggle */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 btn btn-primary"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? "Close Menu" : "Menu"}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-full w-64 bg-base-200 p-4 shadow-lg transform transition-transform md:relative md:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>
        <nav>
          <ul className="space-y-4">
            <li>
              <a
                href="/dashboard"
                className="block px-4 py-2 rounded hover:bg-base-300"
              >
                Dashboard
              </a>
            </li>
            <li className="dropdown dropdown-hover">
              <div
                tabIndex={0}
                role="button"
                className="block px-4 py-2 rounded hover:bg-base-300 cursor-pointer"
              >
                Add
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
              >
                <li>
                  <a
                    href="/dashboard/add/equipment"
                    className="block px-4 py-2 rounded hover:bg-base-300"
                  >
                    Add Equipment
                  </a>
                </li>
                <li>
                  <a
                    href="/dashboard/add/category"
                    className="block px-4 py-2 rounded hover:bg-base-300"
                  >
                    Add Category
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <a
                href="/dashboard/users"
                className="block px-4 py-2 rounded hover:bg-base-300"
              >
                Users
              </a>
            </li>
            <li>
              <a
                href="/dashboard/rentals"
                className="block px-4 py-2 rounded hover:bg-base-300"
              >
                Rentals
              </a>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Overlay for Mobile Sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-50 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
    </>
  );
}

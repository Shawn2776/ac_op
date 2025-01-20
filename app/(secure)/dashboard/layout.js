import Navbar from "@/components/Navbar";
import "../../../app/globals.css";
import { AuthProvider } from "@/Providers";

export const metadata = {
  title: "NIC Adventure Center",
  description:
    "Outdoor Pursuits exercises both body and mind through wilderness-based, environmentally sound outdoor adventures. Our activities foster educational growth through self-awareness, teamwork and risk-taking. We provide a non-profit outdoor service with trips and rentals available to everyone.",
};

const Layout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Navbar />
          <div className="flex min-h-screen">
            {/* Sidebar */}
            <aside className="w-64 bg-base-200 p-4 shadow-lg">
              <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>
              <nav>
                <ul className="space-y-4">
                  {/* Dashboard Link */}
                  <li>
                    <a
                      href="/dashboard"
                      className="block px-4 py-2 rounded hover:bg-base-300"
                    >
                      Dashboard
                    </a>
                  </li>

                  {/* Add Dropdown */}
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

                  {/* Users Link */}
                  <li>
                    <a
                      href="/dashboard/users"
                      className="block px-4 py-2 rounded hover:bg-base-300"
                    >
                      Users
                    </a>
                  </li>

                  {/* Rentals Link */}
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

            {/* Main Content */}
            <main className="flex-1 p-6 bg-base-100">{children}</main>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
};

export default Layout;

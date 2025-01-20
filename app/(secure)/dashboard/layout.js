import { AuthProvider } from "@/Providers";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/PublicNavbar";
import "../../../app/globals.css";

export const metadata = {
  title: "NIC Adventure Center",
  description:
    "Outdoor Pursuits exercises both body and mind through wilderness-based, environmentally sound outdoor adventures. Our activities foster educational growth through self-awareness, teamwork and risk-taking. We provide a non-profit outdoor service with trips and rentals available to everyone.",
};

export default function DashboardLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Navbar />
          <div className="flex min-h-screen">
            {/* Main Content */}
            <main className="flex-1 p-6 bg-base-100">{children}</main>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}

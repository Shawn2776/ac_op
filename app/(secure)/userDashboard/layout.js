import Navbar from "@/components/PublicNavbar";
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
          {children}
        </AuthProvider>
      </body>
    </html>
  );
};

export default Layout;

import Navbar from "@/components/Navbar";
import "../../../app/globals.css";
import { AuthProvider } from "@/Providers";

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

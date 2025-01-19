import { Geist, Geist_Mono } from "next/font/google";
import "../../app/globals.css";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "NIC Adventure Center",
  description:
    "Outdoor Pursuits exercises both body and mind through wilderness-based, environmentally sound outdoor adventures. Our activities foster educational growth through self-awareness, teamwork and risk-taking. We provide a non-profit outdoor service with trips and rentals available to everyone.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}

import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div className="flex justify-center gap-10 p-4">
      <Link href="/" className="text-xl hover:text-blue-500 font-bold">
        Home
      </Link>
      <Link href="/dashboard" className="text-xl hover:text-blue-500 font-bold">
        Dashboard
      </Link>
    </div>
  );
};

export default Navbar;

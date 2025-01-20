"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { FaUserAlt, FaShoppingCart } from "react-icons/fa";

export default function PublicNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const { data: session } = useSession(); // Get session data
  const pathname = usePathname(); // Get the current route

  // Close mobile menu when clicking outside
  useEffect(() => {
    function handleOutsideClick(event) {
      if (
        !event.target.closest("#mobile-menu") &&
        !event.target.closest("#menu-button")
      ) {
        setIsMobileMenuOpen(false);
      }

      if (!event.target.closest("#sign-in-dropdown")) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  // Define navigation links and their routes
  const navLinks = [
    { name: "Rentals", href: "/rentals" },
    { name: "About", href: "/about" },
    { name: "Projects", href: "/projects" },
    { name: "Calendar", href: "/calendar" },
  ];

  return (
    <nav className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link href="/">
                <img
                  className="h-8 w-auto"
                  src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=500"
                  alt="Your Company"
                />
              </Link>
            </div>
          </div>

          {/* Center Navigation Links */}
          <div className="hidden sm:flex items-center">
            <div className="absolute inset-x-0 flex justify-center space-x-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`rounded-md px-3 py-2 text-sm font-medium ${
                    pathname === link.href
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                  aria-current={pathname === link.href ? "page" : undefined}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Profile, Sign In, and Cart */}
          <div className="relative flex items-center space-x-4">
            {session ? (
              // Profile Dropdown
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className="flex rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  id="user-menu-button"
                  aria-expanded={isProfileMenuOpen}
                  aria-haspopup="true"
                >
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="h-8 w-8 rounded-full"
                    src={
                      session.user.image || "https://via.placeholder.com/150"
                    }
                    alt={session.user.name || "User Avatar"}
                  />
                </button>

                {isProfileMenuOpen && (
                  <div
                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu-button"
                  >
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-sm text-gray-700"
                      role="menuitem"
                    >
                      Your Profile
                    </Link>
                    <Link
                      href="/settings"
                      className="block px-4 py-2 text-sm text-gray-700"
                      role="menuitem"
                    >
                      Settings
                    </Link>
                    <button
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700"
                      onClick={() => signOut()}
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              // Sign In Dropdown
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white flex items-center gap-2"
                  id="sign-in-dropdown"
                >
                  <FaUserAlt /> Sign In
                </button>
                {isDropdownOpen && (
                  <div
                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="sign-in-dropdown"
                  >
                    <button
                      onClick={() => {
                        signIn();
                        setIsDropdownOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Sign In
                    </button>
                    <Link
                      href="/register"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Register
                    </Link>
                  </div>
                )}
              </div>
            )}

            {/* Cart Button */}
            <Link
              href="/cart"
              className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white flex items-center"
            >
              <FaShoppingCart className="mr-1" /> Cart
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="sm:hidden" id="mobile-menu">
          <div className="space-y-1 px-2 pt-2 pb-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block rounded-md px-3 py-2 text-base font-medium ${
                  pathname === link.href
                    ? "bg-gray-900 text-white"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                }`}
              >
                {link.name}
              </Link>
            ))}
            {!session && (
              <button
                onClick={() => {
                  signIn();
                  setIsMobileMenuOpen(false);
                }}
                className="block w-full text-left rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                Sign In
              </button>
            )}
            <Link
              href="/cart"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              Cart
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

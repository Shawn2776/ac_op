import Image from "next/image";
import Link from "next/link";
import { TiThMenu } from "react-icons/ti";

const PublicNavbar = () => {
  return (
    <div>
      {/* Mobile View */}
      <div className="sm:hidden navbar bg-base-100 shadow-md">
        <div className="flex-1">
          <Link className="btn btn-ghost text-xl" href="/">
            <Image
              src="/logo.png"
              width={40}
              height={40}
              className="rounded"
              alt="NIC AC Logo"
            />{" "}
            NIC AC
          </Link>
        </div>
        <div className="flex-none">
          <button className="btn btn-square btn-ghost">
            <TiThMenu size={30} />
          </button>
        </div>
      </div>
      {/* Desktop View */}
      <div className="hidden sm:flex navbar bg-base-100 shadow-md">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <a>Item 1</a>
              </li>
              <li>
                <a>Rentals</a>
                <ul className="p-2">
                  <li>
                    <a>Summer Rentals</a>
                  </li>
                  <li>
                    <a>Winter Rentals</a>
                  </li>
                </ul>
              </li>
              <li>
                <a>Item 3</a>
              </li>
            </ul>
          </div>
          <Link className="btn btn-ghost text-xl" href="/">
            <Image
              src="/logo.png"
              width={40}
              height={40}
              className="rounded"
              alt="NIC AC Logo"
            />{" "}
            NIC AC
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <a>Item 1</a>
            </li>
            <li>
              <details>
                <summary>Rentals</summary>
                <ul className="p-2">
                  <li>
                    <a>Summer Rentals</a>
                  </li>
                  <li>
                    <a>Winter Rentals</a>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <a>Item 3</a>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          <a className="btn">Button</a>
        </div>
      </div>
    </div>
  );
};

export default PublicNavbar;

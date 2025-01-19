import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex h-screen bg-neutral-400">
      <div className="m-auto">
        <div className="card card-compact bg-base-100 p-4 shadow-xl text-2xl">
          <div className="">
            <Link href="/signIn" className="hover:text-blue-500">
              Sign In
            </Link>
            <span> / </span>
            <Link href="/register" className="hover:text-blue-500">
              {" "}
              Register
            </Link>
          </div>
          <div>
            <Link href="/dashboard" className="hover:text-blue-500">
              {" "}
              Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useSession } from "next-auth/react";

export default function UserDashboardPage() {
  const { data: session } = useSession();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">User Dashboard</h1>
      <p>Welcome, {session?.user?.email}</p>
    </div>
  );
}

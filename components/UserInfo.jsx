"use client";

import { signOut, useSession } from "next-auth/react";

const UserInfo = () => {
  const { data: session } = useSession();
  return (
    <div className="grid shadow-md place-items-center bg-neutral-500 rounded-md p-4 w-full h-fit">
      <div className="shadow-md text-white p-8 flex flex-col gap-2 my-6 bg-neutral-900 rounded-md">
        <h1 className="text-2xl font-semibold">User Info</h1>
        <p className="text-lg">Full Name: {session?.user?.name}</p>
        <p className="text-lg">Email: {session?.user?.email}</p>
      </div>
      <div>
        <button onClick={() => signOut()} className="btn">
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserInfo;

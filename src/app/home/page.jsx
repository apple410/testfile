"use client"

import Data from "@/app/taskpost/page";
import { signOut } from "next-auth/react";
import Link from "next/link";
import React from "react";


const page = () => {
  return (
    <div>
      <Link href="/addtask">
        <button  className="w-full bg-blue-500 text-white py-3 rounded-xl font-semibold hover:opacity-90 transition">
        Add task
      </button>
      </Link>
      <button
        onClick={() => signOut({ callbackUrl: "/login" })}
        className="px-2 py-1 bg-red-600 rounded text-white cursor-pointer"
      >
        Yes
      </button>
    </div>
  );
};

export default page;

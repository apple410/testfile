"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const page = () => {
    const route = useRouter();
  const [data, setdata] = useState({
    username: "",
    email: "",
    password: "",
  });

  const inputHandler = async (e) => {
    const { name, value } = e.target;
    setdata((prev) => ({ ...prev, [name]: value }));
  };

  const submitHanlder = async (e) => {
    e.preventDefault();

    try {
      await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      route.push("/login")
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center  px-4">
      <div className="w-full max-w-md  rounded-2xl shadow-lg p-8">
        <Link href={"/"}>
          <ArrowLeft />
        </Link>
        <h1 className="text-3xl font-bold text-center mb-2 ">Welcome Back</h1>
        <p className="text-gray-500 text-center mb-6">
          Register to your account
        </p>

        <form onSubmit={submitHanlder} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-2">Full Name</label>
            <input
              onChange={inputHandler}
              name="username"
              type="text"
              placeholder="example"
              value={data.username}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              onChange={inputHandler}
              name="email"
              type="email"
              placeholder="example@gmail.com"
              value={data.email}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              onChange={inputHandler}
              name="password"
              type="password"
              placeholder="**********"
              value={data.password}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-xl font-semibold hover:opacity-90 transition"
          >
            Register
          </button>
        </form>

        <p className="text-center text-sm  mt-6">
          Already have an account?{" "}
          <Link href={"/login"}>
            <span className="font-semibold cursor-pointer ">Sign in</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default page;

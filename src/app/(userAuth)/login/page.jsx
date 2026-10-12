import { signIn } from "@/auth";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";
import { FcGoogle } from "react-icons/fc";

const Login = async () => {
  return (
    <section className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl shadow-lg hover:shadow-2xl p-8 transition-all duration-300 ">
        <Link href={"/"}>
          <ArrowLeft />
        </Link>
        <h1 className="text-3xl font-bold text-center  mb-2">Welcome Back</h1>
        <p className="text-gray-500 text-center mb-6">Login to your account</p>

        <form
          action={async (formData) => {
            "use server";

            await signIn("credentials", {
              email: formData.get("email"),
              password: formData.get("password"),
            });
          }}
          className="space-y-5"
        >
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              name="email"
              type="email"
              placeholder="example@gmail.com"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black transition-all duration-200"
              suppressHydrationWarning
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              name="password"
              type="password"
              placeholder="**********"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black transition-all duration-200"
            />
          </div>

          <button
            type="submit"
            suppressHydrationWarning
            className="w-full bg-blue-500 text-white py-3 rounded-xl font-semibold hover:opacity-90 active:scale-[0.98] cursor-pointer transition all duration-200"
          >
            Login
          </button>
        </form>
        <form
          action={async () => {
            "use server";
            await signIn("google", { redirectTo: "/" });
          }}
        >
          <button
            type="submit"
            className="w-full flex justify-center text-black items-center p-3 gap-3 bg-white/90 cursor-pointer rounded-xl mt-2"
          >
            <FcGoogle />
            Sign In With Google
          </button>
        </form>

        <p className="text-center text-sm mt-6">
          Don't have an account?{" "}
          <Link href={"register"}>
            <span className="font-semibold cursor-pointer hover:underline decoration-2">
              Sign Up
            </span>
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;

"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res.error) {
        setError("Invalid Credentials");
        return;
      }

      router.replace("/dashboard");
    } catch (error) {
      console.log("Sign In Error: ", error);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signIn("google", { callbackUrl: "/dashboard" });
    } catch (error) {
      console.log("Google Sign In Error: ", error);
    }
  };

  return (
    <div className="card card-compact bg-base-100 w-96 shadow-xl">
      <div className="card-body">
        <h1 className="card-title m-auto text-2xl">Sign in to your account</h1>

        <button className="btn" onClick={() => signIn("google")}>
          <FcGoogle />
          Sign in with Google
        </button>
        <p className="text-center pt-5">or</p>

        <form className="flex flex-col gap-4 mt-4" onSubmit={handleSubmit}>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Email</span>
            </div>
            <input
              type="text"
              placeholder="name@domain.com"
              className="input input-bordered w-full max-w-xs"
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Password</span>
            </div>
            <input
              type="password"
              placeholder="*******"
              className="input input-bordered w-full max-w-xs"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <div className="flex justify-between">
            <div>
              <label className="label cursor-pointer">
                <div className="flex gap-2 items-center">
                  <input type="checkbox" className="checkbox" />
                  <span className="label-text">Remember me</span>
                </div>
              </label>
            </div>
            <div className="flex items-center">
              <Link href="/forgotPassword" className="text-blue-500">
                Forgot Password?
              </Link>
            </div>
          </div>
          <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg">
            Login
          </button>
          <div>
            <span className="text-sm">
              Don't have an account yet?{" "}
              <Link href="/register" className="text-blue-500 hover:underline">
                Sign up
              </Link>
            </span>
          </div>
          {error && (
            <div className="text-xs text-red-500 text-center">{error}</div>
          )}
        </form>
      </div>
    </div>
  );
};

export default LoginForm;

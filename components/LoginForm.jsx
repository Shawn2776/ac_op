"use client";

import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();
  const searchParams = useSearchParams();

  // Check if there's an error in the URL
  React.useEffect(() => {
    const errorParam = searchParams.get("error");
    if (errorParam) {
      setError("Invalid email or password. Please try again.");
    }
  }, [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false, // Prevent automatic redirect
    });

    if (res.error) {
      setError("Invalid email or password. Please try again.");
      return;
    }

    router.push("/dashboard"); // Redirect to dashboard on successful login
  };

  return (
    <div className="bg-coolWhite min-h-screen flex justify-center  w-full">
      <div className="bg-coolWhite p-8 w-full max-w-lg">
        <div className="text-center my-6">
          <h1 className="text-primary text-3xl font-bold">
            Sign in to your Account
          </h1>
          <p className="text-neutral mb-6">
            Welcome back! Please log in to your account to continue.
          </p>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Google Sign In */}
          <button
            type="button"
            className="btn btn-outline w-full flex items-center justify-center gap-2"
            onClick={() => signIn("google")}
          >
            <FcGoogle size={20} />
            Sign in with Google
          </button>

          {/* Divider */}
          <div className="flex w-full items-center gap-2 text-sm text-slate-600">
            <div className="h-px w-full bg-slate-200"></div>
            <span className="text-neutral">OR</span>
            <div className="h-px w-full bg-slate-200"></div>
          </div>

          {/* Email Field */}
          <input
            type="email"
            placeholder="Email Address"
            className="input input-bordered w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* Password Field */}
          <input
            type="password"
            placeholder="Password"
            className="input input-bordered w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* Error Message */}
          {error && (
            <div className="text-xs text-red-500 text-center">{error}</div>
          )}

          {/* Remember Me & Forgot Password */}
          <div className="flex justify-between items-center">
            <label className="label cursor-pointer flex gap-2 items-center">
              <input type="checkbox" className="checkbox" />
              <span className="label-text">Remember me</span>
            </label>
            <Link
              href="/forgotPassword"
              className="text-blue-500 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Login Button */}
          <button type="submit" className="btn btn-primary w-full">
            Sign In
          </button>

          {/* Sign Up Option */}
          <div className="text-center">
            <span className="text-sm">
              Don't have an account?{" "}
              <Link href="/register" className="text-blue-500 hover:underline">
                Register
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;

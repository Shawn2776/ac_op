"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill out all fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const resUserExists = await fetch("api/userExists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const { user } = await resUserExists.json();

      if (user) {
        setError("User already exists.");
        return;
      }

      const res = await fetch("api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      if (res.ok) {
        const form = e.target;
        form.reset();
        router.push("/signIn");
      } else {
        console.log("User registration failed.");
      }
    } catch (error) {
      console.log("Error during registration: ", error);
    }
  };

  return (
    <div className="card card-compact bg-base-100 w-96 shadow-xl">
      <div className="card-body">
        <h1 className="card-title m-auto text-2xl">Sign up for an account</h1>
        <form className="flex flex-col gap-4 mt-4" onSubmit={handleSubmit}>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Full Name</span>
            </div>
            <input
              type="text"
              placeholder="Cecil Cardinal"
              className="input input-bordered w-full max-w-xs"
              onChange={(e) => setName(e.target.value)}
            />
          </label>
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
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Confirm Password</span>
            </div>
            <input
              type="password"
              placeholder="*******"
              className="input input-bordered w-full max-w-xs"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </label>
          <div className="flex justify-between">
            <div>
              <label className="label cursor-pointer">
                <div className="flex gap-2 items-center">
                  <input type="checkbox" className="checkbox" />
                  <span className="label-text">
                    I accept the{" "}
                    <Link href="/terms" className="text-blue-500">
                      Terms and Conditions
                    </Link>
                  </span>
                </div>
              </label>
            </div>
          </div>
          <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg">
            Create an account
          </button>
          <div>
            <span className="text-sm">
              Already have an account?{" "}
              <Link href="/signIn" className="text-blue-500 hover:underline">
                Sign In
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

export default RegisterForm;

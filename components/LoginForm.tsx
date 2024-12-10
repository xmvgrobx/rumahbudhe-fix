"use client";

import { signIn } from "next-auth/react";
import { ChangeEvent, FormEvent, useState } from "react";
import Image from "next/image";

export default function LoginPage() {
  const [formValues, setFormValues] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");

  function handleInput(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormValues((old) => ({ ...old, [name]: value }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const res = await signIn("credentials", {
      email: formValues.email,
      password: formValues.password,
      redirect: false, // Prevent automatic redirect
    });

    if (!res || !res.ok) {
      setErrorMessage("Invalid email or password");
      return;
    }

    window.location.href = "/";
  }

  return (
    <div className="flex min-h-screen">
      {/* Left Side: Login Form */}
      <div className="flex-1 flex flex-col items-center justify-center bg-white p-8">
        <h3 className="text-3xl font-semibold text-gray-800 text-center">Login</h3>
        <p className="text-gray-600 text-center mt-2">
          Welcome back! Please log in to your account.
        </p>
        {errorMessage && (
          <p className="text-red-500 text-sm mt-4">{errorMessage}</p>
        )}
        <form onSubmit={handleSubmit} className="mt-6 space-y-6 w-3/4 max-w-md">
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-gray-700 font-medium">Email</label>
            <input
              className="border border-gray-300 rounded-md py-2 px-4 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              type="email"
              name="email"
              id="email"
              placeholder="example@gmail.com"
              value={formValues.email}
              onChange={handleInput}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-gray-700 font-medium">Password</label>
            <input
              className="border border-gray-300 rounded-md py-2 px-4 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              type="password"
              name="password"
              id="password"
              placeholder="********"
              value={formValues.password}
              onChange={handleInput}
            />
          </div>
          <div className="text-center">
            <button
              className="px-6 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition"
              type="submit"
            >
              Login
            </button>
          </div>
        </form>
      </div>

      {/* Right Side: Image */}
      <div className="flex-1 flex items-center justify-center bg-yellow-200">
        <Image src="/lucuw.png" alt="Illustration" width={400} height={400} className="rounded-md" />
      </div>
    </div>
  );
}

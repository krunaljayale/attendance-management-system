"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { API } from "@/constants/API/api";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!email || !password) {
      setError("Please enter valid credentials.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(API.LOGIN, { email, password });
      const token = response.data.token;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      router.push("/dashboard");
    } catch (err: any) {
      const message =
        err.response?.data?.message || "Login failed. Please try again.";
      setError(message);
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-white dark:bg-primary">
      {/* LEFT SIDE: LOGIN FORM */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 md:px-20 lg:px-24 xl:px-32 py-12 transition-colors duration-300">
        {/* Logo */}
        <div className="flex items-center gap-2 text-2xl font-bold text-primary dark:text-white mb-12 tracking-tight">
          <span className="text-3xl">⚡</span>
          ATTENDED
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary dark:text-white mb-2">
            Welcome Back!
          </h1>
          <p className="text-secondary dark:text-gray-400">
            Enter your credentials to access your account.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          {/* Email Input */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-secondary dark:text-gray-400 uppercase tracking-wide">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                autoFocus
                placeholder="teacher@university.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3.5 text-sm font-medium text-primary dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20 hover:border-gray-300 dark:hover:border-white/20 transition-all pl-11"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute left-4 top-3.5 w-5 h-5 text-gray-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-bold text-secondary dark:text-gray-400 uppercase tracking-wide">
                Password
              </label>
              <Link
                href="#"
                className="text-xs font-bold text-primary dark:text-blue-400 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
            <div className="relative">
              <input
                // Toggle type based on state
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                // Added 'pr-12' to prevent text from overlapping the eye button
                className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3.5 text-sm font-medium text-primary dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20 hover:border-gray-300 dark:hover:border-white/20 transition-all pl-11 pr-12"
              />

              {/* Lock Icon (Left) */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute left-4 top-3.5 w-5 h-5 text-gray-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>

              {/* Show/Hide Password Toggle (Right) */}
              <button
                type="button" // Important: prevents form submission
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors focus:outline-none"
              >
                {showPassword ? (
                  // Eye Off Icon
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                    <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                    <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                    <line x1="2" x2="22" y1="2" y2="22" />
                  </svg>
                ) : (
                  // Eye Icon
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3 rounded-lg bg-red-50 text-red-600 text-sm font-medium text-center animate-in fade-in slide-in-from-top-1">
              {error}
            </div>
          )}

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary dark:bg-white text-white dark:text-primary py-3.5 rounded-xl font-bold text-sm shadow-lg hover:shadow-xl hover:shadow-primary/20 dark:hover:shadow-white/10 active:scale-95 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 dark:border-primary/30 border-t-white dark:border-t-primary rounded-full animate-spin"></div>
                Signing In...
              </>
            ) : (
              "Sign In"
            )}
          </button>

          {/* Divider */}
          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-100 dark:border-white/10"></div>
            </div>
            {/* <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white dark:bg-primary px-2 text-secondary dark:text-gray-500 font-bold">
                Or continue with
              </span>
            </div> */}
          </div>

          {/* Social Login (Google Mock) */}
          {/* <button
            type="button"
            className="w-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-primary dark:text-white py-3.5 rounded-xl font-bold text-sm hover:bg-gray-50 dark:hover:bg-white/10 transition-all flex items-center justify-center gap-3"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                className="text-[#4285F4]"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                className="text-[#34A853]"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                className="text-[#FBBC05]"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                className="text-[#EA4335]"
              />
            </svg>
            Google
          </button> */}
        </form>

        {/* Footer */}
        <p className="text-center text-xs text-secondary dark:text-gray-500 mt-8 font-medium">
          Don't have an account?{" "}
          <Link
            href="#"
            className="text-primary dark:text-blue-400 hover:underline"
          >
            Contact Administration
          </Link>
        </p>
      </div>

      {/* RIGHT SIDE: IMAGE / BANNER (Hidden on small screens) */}
      <div className="hidden lg:block lg:w-1/2 relative bg-[#F3F4F6] dark:bg-black">
        <Image
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1742&auto=format&fit=crop"
          alt="Students Collaboration"
          fill
          className="object-cover opacity-90"
          priority
        />
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-linear-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Manage Attendance Efficiently.
          </h2>
          <p className="text-lg text-gray-200 max-w-md leading-relaxed">
            Streamline your classroom management with our advanced tracking
            system. Save time and focus on what matters most—teaching.
          </p>
        </div>
      </div>
    </div>
  );
}

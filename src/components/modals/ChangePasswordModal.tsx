"use client";

import React, { useState } from "react";
import axios from "axios";
import { API } from "@/constants/API/api";

interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ChangePasswordModal({
  isOpen,
  onClose,
}: ChangePasswordModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (passwords.newPassword !== passwords.confirmPassword) {
      setError("New passwords do not match.");
      return;
    }
    if (passwords.newPassword.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const userString = localStorage.getItem("user");
      const user = JSON.parse(userString || "{}");
      const userId = user.id || user._id;

      await axios.put(
        API.CHANGE_PASSWORD,
        {
          userId: userId,
          oldPassword: passwords.oldPassword,
          newPassword: passwords.newPassword,
        },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      setSuccess("Password changed successfully!");

      setTimeout(() => {
        onClose();
        setPasswords({ oldPassword: "", newPassword: "", confirmPassword: "" });
        setSuccess("");
      }, 2000);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to update password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full max-w-md bg-white dark:bg-[#1E1624] rounded-3xl shadow-2xl p-8 animate-in zoom-in-95 border border-gray-100 dark:border-white/10">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-primary dark:text-white mb-2">
            Change Password
          </h2>
          <p className="text-sm text-secondary dark:text-gray-400">
            Ensure your account is using a long, random password to stay secure.
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 text-red-600 rounded-xl text-sm font-bold border border-red-100 dark:border-red-800">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 rounded-xl text-sm font-bold border border-emerald-100 dark:border-emerald-800">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-secondary dark:text-gray-500 uppercase tracking-wider">
              Current Password
            </label>
            <input
              type="password"
              name="oldPassword"
              value={passwords.oldPassword}
              onChange={handleChange}
              className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm font-medium text-primary dark:text-white focus:outline-none focus:ring-2 focus:ring-magenta/50 transition-all"
              placeholder="••••••••"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-secondary dark:text-gray-500 uppercase tracking-wider">
              New Password
            </label>
            <input
              type="password"
              name="newPassword"
              value={passwords.newPassword}
              onChange={handleChange}
              className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm font-medium text-primary dark:text-white focus:outline-none focus:ring-2 focus:ring-magenta/50 transition-all"
              placeholder="••••••••"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-secondary dark:text-gray-500 uppercase tracking-wider">
              Confirm New Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={passwords.confirmPassword}
              onChange={handleChange}
              className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm font-medium text-primary dark:text-white focus:outline-none focus:ring-2 focus:ring-magenta/50 transition-all"
              placeholder="••••••••"
              required
            />
          </div>

          <div className="pt-4 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-xl font-bold bg-gray-100 dark:bg-white/5 text-secondary dark:text-white hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || success !== ""}
              className="flex-1 py-3 rounded-xl font-bold bg-magenta text-white shadow-lg shadow-magenta/20 hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Updating..." : "Update Password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

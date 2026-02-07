"use client";

import React, { useState } from "react";
import Image from "next/image";
import axios from "axios";
import { API } from "@/constants/API/api";
import { StaffMember } from "@/constants/Types"; // Adjust path as needed

export default function StaffCard({ member }: { member: StaffMember }) {
  const [currentMember, setCurrentMember] = useState(member);
  const [isDeleted, setIsDeleted] = useState(false);
  const [loading, setLoading] = useState(false);

  // --- 1. Handle Status Toggle ---
  // --- 1. Handle Status Toggle ---
  const handleToggleStatus = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const userString = localStorage.getItem("user");

      if (!userString) {
        alert("Authentication error. Please login again.");
        return;
      }

      const currentUser = JSON.parse(userString);
      const currentUserId = currentUser.id || currentUser._id;

      // Determine new status
      const newStatus = !currentMember.isActive;

      await axios.put(
        `${API.TOGGLE_STATUS}/${currentMember._id}`,
        {
          isActive: newStatus,
          adminId: currentUserId, // Sending current admin ID for verification
        },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      // Update local state immediately for UI feedback
      setCurrentMember((prev) => ({ ...prev, isActive: newStatus }));
    } catch (error) {
      console.error("Failed to update status", error);
      alert("Failed to update status");
    } finally {
      setLoading(false);
    }
  };

  // --- 2. Handle Delete ---
  const handleDelete = async () => {
    if (!confirm("Are you sure you want to permanently remove this member?"))
      return;

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const userString = localStorage.getItem("user");

      if (!userString) {
        alert("Authentication error. Please login again.");
        return;
      }

      const currentUser = JSON.parse(userString);
      const currentUserId = currentUser.id || currentUser._id;

      // For DELETE requests, we usually pass data via 'data' property in config
      // OR query parameters depending on your backend setup.
      await axios.delete(`${API.DELETE_ADMIN}/${currentMember._id}`, {
        headers: { Authorization: `Bearer ${token}` },
        data: { adminId: currentUserId }, // passing adminId in body
      });

      // Hide the card
      setIsDeleted(true);
    } catch (error) {
      console.error("Failed to delete member", error);
      alert("Failed to delete member");
      setLoading(false);
    }
  };

  // If deleted, don't render anything
  if (isDeleted) return null;

  // Generate Avatar
  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    currentMember.name,
  )}&background=random&color=fff&bold=true`;

  return (
    <div className="group bg-white dark:bg-[#1E1624] rounded-3xl p-5 border border-gray-100 dark:border-white/5 hover:border-magenta/20 dark:hover:border-magenta/20 hover:shadow-xl hover:shadow-magenta/5 hover:-translate-y-1 transition-all duration-300">
      {/* Top Row: Avatar & Badge */}
      <div className="flex justify-between items-start mb-4">
        <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-white dark:border-[#1E1624] shadow-md group-hover:scale-105 transition-transform">
          <Image
            src={avatarUrl}
            alt={currentMember.name}
            fill
            className="object-cover"
            unoptimized
          />
        </div>
        <div
          className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider border ${
            currentMember.role === "SUPER_ADMIN"
              ? "bg-purple-100 text-purple-600 border-purple-200 dark:bg-purple-900/20 dark:text-purple-300 dark:border-purple-800"
              : "bg-blue-100 text-blue-600 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800"
          }`}
        >
          {currentMember.role === "SUPER_ADMIN" ? "Admin" : "Teacher"}
        </div>
      </div>

      {/* Name & ID */}
      <div className="mb-4">
        <h3 className="font-bold text-lg text-primary dark:text-white truncate">
          {currentMember.name}
        </h3>
        <div className="flex items-center gap-2 mt-1">
          <p className="text-xs font-mono text-secondary/60 dark:text-gray-500 bg-gray-50 dark:bg-white/5 inline-block px-1.5 py-0.5 rounded">
            {currentMember.employeeId ||
              currentMember._id.slice(-6).toUpperCase()}
          </p>
          {/* Status Dot */}
          <span
            className={`w-2 h-2 rounded-full ${
              currentMember.isActive ? "bg-emerald-500" : "bg-red-500"
            }`}
            title={currentMember.isActive ? "Active" : "Inactive"}
          ></span>
        </div>
      </div>

      {/* Contact Details */}
      <div className="space-y-2.5 mb-6">
        <div className="flex items-center gap-3 text-xs font-medium text-secondary/80 dark:text-gray-400">
          <div className="w-6 h-6 rounded-full bg-gray-50 dark:bg-white/5 flex items-center justify-center shrink-0">
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
          <span className="truncate">{currentMember.email}</span>
        </div>
        <div className="flex items-center gap-3 text-xs font-medium text-secondary/80 dark:text-gray-400">
          <div className="w-6 h-6 rounded-full bg-gray-50 dark:bg-white/5 flex items-center justify-center shrink-0">
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
          </div>
          <span>{currentMember.phoneNumber}</span>
        </div>
        <div className="flex items-center gap-3 text-xs font-medium text-secondary/80 dark:text-gray-400">
          <div className="w-6 h-6 rounded-full bg-gray-50 dark:bg-white/5 flex items-center justify-center shrink-0">
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
          <span>{currentMember.department || "General Staff"}</span>
        </div>
      </div>

      {/* Footer Actions: Disable & Delete */}
      <div className="pt-4 border-t border-gray-100 dark:border-white/5 flex gap-3">
        {/* Toggle Status Button */}
        <button
          onClick={handleToggleStatus}
          disabled={loading}
          className={`flex-1 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all border ${
            currentMember.isActive
              ? "bg-red-50 dark:bg-red-900/10 text-red-600 dark:text-red-400 border-red-100 dark:border-red-900/30 hover:bg-red-100 dark:hover:bg-red-900/20"
              : "bg-emerald-50 dark:bg-emerald-900/10 text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-900/30 hover:bg-emerald-100 dark:hover:bg-emerald-900/20"
          } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          {loading ? (
            <span className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin" />
          ) : currentMember.isActive ? (
            <>
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                />
              </svg>
              Disable
            </>
          ) : (
            <>
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Enable
            </>
          )}
        </button>

        {/* Delete Button */}
        <button
          onClick={handleDelete}
          disabled={loading}
          className="px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-white/5 text-gray-400 border border-transparent hover:bg-red-500 hover:text-white hover:shadow-lg hover:shadow-red-500/20 transition-all disabled:opacity-50"
          title="Delete Member"
        >
          {loading ? (
            <span className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin" />
          ) : (
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}

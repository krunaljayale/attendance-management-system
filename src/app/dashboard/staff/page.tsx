"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation"; // Import router for redirection
import { API } from "@/constants/API/api";
import AddTeacherModal from "@/components/modals/AddTeacherModal";
import { StaffMember } from "@/constants/Types";
import StaffCard from "@/components/cards/StaffCard";

export default function StaffPage() {
  const router = useRouter();
  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false); // New state for auth check

  // --- 1. Security Check on Mount ---
  useEffect(() => {
    const userString = localStorage.getItem("user");
    if (!userString) {
      router.push("/");
      return;
    }

    try {
      const user = JSON.parse(userString);
      if (user.role !== "SUPER_ADMIN") {
        // Redirect non-admins immediately
        router.replace("/dashboard");
      } else {
        setIsAuthorized(true);
      }
    } catch (error) {
      router.push("/");
    }
  }, [router]);

  // --- 2. Fetch Data (Only if Authorized) ---
  const fetchStaff = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await axios.get(API.GET_ALL_ADMINS, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStaff(res.data);
    } catch (error) {
      console.error("Failed to load staff", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthorized) {
      fetchStaff();
    }
  }, [isAuthorized]);

  // --- 3. Prevent Rendering if Unauthorized ---
  if (!isAuthorized) {
    return null; // Or return a loading spinner while redirecting
  }

  // --- Search Logic ---
  const filteredStaff = staff.filter(
    (member) =>
      member.name.toLowerCase().includes(search.toLowerCase()) ||
      member.email.toLowerCase().includes(search.toLowerCase()) ||
      member.department?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="min-h-screen w-full bg-[#F7F5F7] dark:bg-[#0F0B13] p-4 md:p-8 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-magenta/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-lavender/10 rounded-full blur-[80px] pointer-events-none" />

      {/* --- HEADER --- */}
      <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-primary dark:text-white mb-1 flex items-center gap-2">
            Staff Management
            <span className="text-sm font-medium bg-white dark:bg-white/10 px-2 py-0.5 rounded-full border border-gray-100 dark:border-white/5 text-secondary dark:text-gray-400">
              {staff.length}
            </span>
          </h1>
          <p className="text-secondary dark:text-gray-400 text-sm">
            Manage teachers, admins, and department heads.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          {/* Search Bar */}
          <div className="relative flex-1 md:w-72">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search by name, email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white dark:bg-primary border border-gray-200 dark:border-gray-800 text-primary dark:text-white rounded-xl text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20 hover:border-gray-300 dark:hover:border-gray-700 transition-all"
            />
          </div>

          {/* Add Button */}
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center justify-center gap-2 bg-primary dark:bg-white text-white dark:text-primary px-6 py-3 rounded-xl text-sm font-bold shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all active:scale-95"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Add Member
          </button>
        </div>
      </div>

      {/* --- GRID --- */}
      {loading ? (
        <div className="flex flex-col items-center justify-center h-64">
          <div className="w-12 h-12 border-4 border-lavender/30 border-t-magenta rounded-full animate-spin mb-4"></div>
          <p className="text-secondary dark:text-gray-500 font-bold text-sm animate-pulse">
            LOADING STAFF...
          </p>
        </div>
      ) : filteredStaff.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 text-center">
          <div className="w-16 h-16 bg-gray-100 dark:bg-white/5 rounded-full flex items-center justify-center mb-4">
            <svg
              className="w-8 h-8 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-primary dark:text-white">
            No members found
          </h3>
          <p className="text-secondary dark:text-gray-400 text-sm">
            Try adjusting your search terms.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 relative z-10 pb-20">
          {filteredStaff.map((member) => (
            <StaffCard key={member._id} member={member} />
          ))}
        </div>
      )}

      {/* Add Modal */}
      <AddTeacherModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSuccess={() => {
          fetchStaff();
        }}
      />
    </div>
  );
}

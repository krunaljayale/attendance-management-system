"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { API } from "@/constants/API/api";
import { AdminProfile } from "@/constants/Types";
import ProfileHeader from "@/components/profile/ProfileHeader";
import {
  PersonalInfoCard,
  WorkDetailsCard,
  AccountMetaCard,
} from "@/components/profile/InfoCards";
import { LoadingState, ErrorState } from "@/components/profile/ProfileStates";

import ChangePasswordModal from "@/components/modals/ChangePasswordModal";

export default function ProfilePage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [profile, setProfile] = useState<AdminProfile | null>(null);
  const [formData, setFormData] = useState<Partial<AdminProfile>>({});
  const [isEditing, setIsEditing] = useState(false);

  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const userString = localStorage.getItem("user");

        if (!userString || !token) {
          router.push("/auth");
          return;
        }

        const user = JSON.parse(userString);
        const userId = user.id || user._id;

        if (!userId) throw new Error("Invalid User Data");

        const res = await axios.get(`${API.GET_PROFILE}/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setProfile(res.data);
        setFormData(res.data);
      } catch (err: any) {
        if (axios.isAxiosError(err) && err.response?.status === 401) {
          localStorage.removeItem("token");
          router.push("/");
          return;
        }
        setError(
          err.response?.data?.message || err.message || "Failed to load",
        );
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [router]);

  const toggleEdit = () => {
    if (isEditing && profile) setFormData(profile);
    setIsEditing(!isEditing);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMsg("");
    setError("");

    try {
      const token = localStorage.getItem("token");
      const payload = {
        name: formData.name,
        phoneNumber: formData.phoneNumber,
        department: formData.department,
        city: formData.city,
      };

      const res = await axios.put(
        `${API.EDIT_PROFILE}/${profile?._id}`,
        payload,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      setProfile(res.data);
      setIsEditing(false);
      setSuccessMsg("Updated successfully");
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (err: any) {
      setError(err.response?.data?.message || "Update failed");
    }
  };

  if (loading) return <LoadingState />;
  if (error && !profile) return <ErrorState error={error} />;
  if (!profile) return null;

  return (
    <div className="min-h-screen w-full bg-[#F7F5F7] dark:bg-[#0F0B13] text-[#1A0F1E] dark:text-white p-4 md:p-8 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-lavender/30 to-transparent dark:from-[#2a1b30] dark:to-transparent pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-magenta/5 rounded-full blur-[120px] pointer-events-none" />

      {successMsg && (
        <div className="fixed top-6 right-6 z-50 bg-emerald-500 text-white px-6 py-3 rounded-2xl shadow-xl shadow-emerald-500/20 font-bold text-sm animate-in slide-in-from-top-4">
          ✨ {successMsg}
        </div>
      )}

      <ProfileHeader
        profile={profile}
        isEditing={isEditing}
        onToggleEdit={toggleEdit}
        onSave={handleSave}
      />

      <div className="relative z-10 max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 pb-20">
        <div className="lg:col-span-2 space-y-6">
          <PersonalInfoCard
            formData={formData}
            originalData={profile}
            isEditing={isEditing}
            onChange={handleChange}
          />
          <WorkDetailsCard
            formData={formData}
            originalData={profile}
            isEditing={isEditing}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-6">
          <AccountMetaCard profile={profile} />

          {profile.role === "SUPER_ADMIN" && !isEditing && (
            <div className="bg-white dark:bg-[#1E1624] p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-white/5">
              <h3 className="font-bold text-lg text-primary dark:text-white mb-4">
                System Settings
              </h3>
              <button
                onClick={() => router.push("/dashboard/holidays")}
                className="w-full py-3 rounded-xl border-2 border-primary/10 dark:border-white/10 text-primary dark:text-white font-bold text-sm hover:bg-primary/5 dark:hover:bg-white/5 transition-colors flex items-center justify-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                Manage Holidays
              </button>
            </div>
          )}

          <div className="bg-white dark:bg-[#1E1624] p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-white/5">
            <h3 className="font-bold text-lg text-primary dark:text-white mb-4">
              Security
            </h3>
            <button
              onClick={() => setIsPasswordModalOpen(true)}
              className="w-full py-3 rounded-xl border-2 border-red-100 dark:border-red-900/30 text-red-600 dark:text-red-400 font-bold text-sm hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors flex items-center justify-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
              Change Password
            </button>
          </div>
        </div>
      </div>

      <ChangePasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
      />
    </div>
  );
}

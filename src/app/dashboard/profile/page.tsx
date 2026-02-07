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

export default function ProfilePage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [profile, setProfile] = useState<AdminProfile | null>(null);
  const [formData, setFormData] = useState<Partial<AdminProfile>>({});
  const [isEditing, setIsEditing] = useState(false);

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
        </div>
      </div>
    </div>
  );
}

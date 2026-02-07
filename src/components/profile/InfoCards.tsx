"use client";

import React, { useState } from "react";
import InputField from "./InputField";
import AddTeacherModal from "../modals/AddTeacherModal";
import { AdminProfile } from "@/constants/Types";

// --- Icons ---
const UserIcon = () => (
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
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    />
  </svg>
);
const PhoneIcon = () => (
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
      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
    />
  </svg>
);
const MailIcon = () => (
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
      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    />
  </svg>
);
const MapIcon = () => (
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
      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
);
const BriefcaseIcon = () => (
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
      d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    />
  </svg>
);
const PlusIcon = () => (
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
      d="M12 4v16m8-8H4"
    />
  </svg>
);

// --- Interface ---
interface CardProps {
  formData: Partial<AdminProfile>;
  originalData?: AdminProfile | null;
  isEditing: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAddSuccess?: () => void; // Added callback for parent notification
}

// --- Components ---

export function PersonalInfoCard({
  formData,
  originalData,
  isEditing,
  onChange,
}: CardProps) {
  return (
    <div className="bg-white dark:bg-[#1E1624] rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 dark:border-white/5">
      <h3 className="text-lg font-bold mb-6 flex items-center gap-2 text-primary dark:text-white">
        <span className="w-1 h-6 bg-magenta rounded-full" />
        Personal Information
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField
          label="Full Name"
          name="name"
          value={formData.name}
          icon={<UserIcon />}
          isEditing={isEditing}
          onChange={onChange}
        />
        <InputField
          label="Phone Number"
          name="phoneNumber"
          value={formData.phoneNumber}
          icon={<PhoneIcon />}
          isEditing={isEditing}
          onChange={onChange}
        />
        <InputField
          label="Email"
          value={originalData?.email}
          icon={<MailIcon />}
          isEditing={false}
          disabled
        />
        <InputField
          label="Location"
          name="city"
          value={formData.city}
          icon={<MapIcon />}
          isEditing={isEditing}
          onChange={onChange}
        />
      </div>
    </div>
  );
}

export function WorkDetailsCard({
  formData,
  originalData,
  isEditing,
  onChange,
  onAddSuccess, // Accept the callback
}: CardProps) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <>
      <div className="bg-white dark:bg-[#1E1624] rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 dark:border-white/5">
        <div className="flex justify-between items-start mb-6">
          <h3 className="text-lg font-bold flex items-center gap-2 text-primary dark:text-white">
            <span className="w-1 h-6 bg-lavender rounded-full" />
            Academic Details
          </h3>

          {/* SUPER ADMIN ACTION BUTTON */}
          {originalData?.role === "SUPER_ADMIN" && !isEditing && (
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-lavender/10 hover:bg-lavender/20 text-primary dark:text-lavender text-xs font-bold uppercase tracking-wider rounded-xl transition-colors border border-lavender/20"
            >
              <PlusIcon />
              Add Teacher
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 gap-6">
          <InputField
            label="Department"
            name="department"
            value={formData.department}
            icon={<BriefcaseIcon />}
            isEditing={isEditing}
            onChange={onChange}
          />

          <div className="space-y-3">
            <label className="text-xs font-bold text-secondary/60 dark:text-gray-500 uppercase tracking-wider pl-1">
              Assigned Classes
            </label>
            <div className="flex flex-wrap gap-2">
              {originalData?.assignedClasses?.length ? (
                originalData.assignedClasses.map((cls, i) => (
                  <span
                    key={i}
                    className="px-4 py-2 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 text-sm font-bold text-secondary dark:text-gray-300"
                  >
                    {cls}
                  </span>
                ))
              ) : (
                <span className="text-sm text-gray-400 italic px-2">
                  No classes assigned
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* RENDER MODAL */}
      <AddTeacherModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSuccess={() => {
          // Trigger the parent's success logic if provided
          if (onAddSuccess) {
            onAddSuccess();
          }
        }}
      />
    </>
  );
}

export function AccountMetaCard({ profile }: { profile: AdminProfile }) {
  const joinDate = new Date(profile.createdAt).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });

  return (
    <div className="bg-primary text-white dark:bg-[#251A2C] rounded-3xl p-6 md:p-8 shadow-xl shadow-primary/10 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-magenta/20 rounded-full blur-3xl -mr-10 -mt-10" />
      <h3 className="text-lg font-bold mb-6 relative z-10">Account Overview</h3>
      <div className="space-y-5 relative z-10">
        <div className="flex justify-between items-center pb-4 border-b border-white/10">
          <span className="text-white/60 text-sm">Joined</span>
          <span className="font-bold">{joinDate}</span>
        </div>
        <div className="flex justify-between items-center pb-4 border-b border-white/10">
          <span className="text-white/60 text-sm">Status</span>
          <span
            className={`px-3 py-1 rounded-lg text-xs font-bold border ${
              profile.isActive
                ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/20"
                : "bg-red-500/20 text-red-300 border-red-500/20"
            }`}
          >
            {profile.isActive ? "Active" : "Inactive"}
          </span>
        </div>
        <div>
          <span className="text-white/60 text-sm block mb-1">User ID</span>
          <code className="text-xs bg-black/30 px-3 py-2 rounded-lg block w-full break-all font-mono text-white/80">
            {profile.employeeId}
          </code>
        </div>
      </div>
    </div>
  );
}

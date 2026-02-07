"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import { StudentFullDetails } from "@/constants/Types";
import { API } from "@/constants/API/api";

const CLOUDINARY_UPLOAD_PRESET =
  process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "";
const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_API_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;

interface EditStudentFormProps {
  student: StudentFullDetails;
  onCancel: () => void;
  onSave: (updatedData: StudentFullDetails) => void;
}

export default function EditStudentForm({
  student,
  onCancel,
  onSave,
}: EditStudentFormProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Helper to format ISO date to YYYY-MM-DD
  const formatDate = (dateString?: string | Date) => {
    if (!dateString) return "";
    return new Date(dateString).toISOString().split("T")[0];
  };

  // Initialize state with existing data + defaults for nested fields
  const [formData, setFormData] = useState({
    ...student,
    // Format dates for input fields
    courseStartDate: formatDate(student.courseStartDate),
    courseEndDate: formatDate(student.courseEndDate),

    // Ensure nested objects exist
    personalInfo: {
      dob: formatDate(student.personalInfo?.dob),
      gender: student.personalInfo?.gender || "Male",
      bloodGroup: student.personalInfo?.bloodGroup || "",
      casteCategory: student.personalInfo?.casteCategory || "General",
      aadharCard: student.personalInfo?.aadharCard || "",
    },
    guardianDetails: {
      fatherName: student.guardianDetails?.fatherName || "",
      motherName: student.guardianDetails?.motherName || "",
      primaryPhone: student.guardianDetails?.primaryPhone || "",
      secondaryPhone: student.guardianDetails?.secondaryPhone || "",
      address: {
        street: student.guardianDetails?.address?.street || "",
        city: student.guardianDetails?.address?.city || "",
        state: student.guardianDetails?.address?.state || "",
        pincode: student.guardianDetails?.address?.pincode || "",
      },
    },
  });

  // Handle Nested Updates
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;

    if (name.includes(".")) {
      const parts = name.split(".");

      if (parts.length === 2) {
        // e.g. personalInfo.dob
        const [parent, child] = parts;
        setFormData((prev: any) => ({
          ...prev,
          [parent]: {
            ...prev[parent],
            [child]: value,
          },
        }));
      } else if (parts.length === 3) {
        // e.g. guardianDetails.address.city
        const [parent, mid, child] = parts;
        setFormData((prev: any) => ({
          ...prev,
          [parent]: {
            ...prev[parent],
            [mid]: {
              ...prev[parent][mid],
              [child]: value,
            },
          },
        }));
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: name === "marks" || name === "rollId" ? Number(value) : value,
      }));
    }

    if (error) setError(null);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!CLOUDINARY_UPLOAD_PRESET) {
      setError("Missing Cloudinary Upload Preset configuration");
      return;
    }

    setIsUploading(true);
    setError(null);
    const uploadData = new FormData();
    uploadData.append("file", file);
    uploadData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    try {
      const response = await axios.post(CLOUDINARY_API_URL, uploadData);
      setFormData((prev) => ({
        ...prev,
        image: response.data.secure_url,
      }));
    } catch (err) {
      console.error(err);
      setError("Failed to upload image. Please check your connection.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);

    try {
      // Assuming API needs ID in URL, otherwise remove `${student._id}`
      const response = await axios.put(API.EDIT_STUDENT_DETAILS, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.status === 200) {
        onSave(response.data);
      }
    } catch (err: any) {
      console.error(err);
      const serverMessage =
        err.response?.data?.message || "Failed to update student details.";
      setError(serverMessage);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 h-full flex flex-col bg-white dark:bg-primary"
    >
      <div className="flex justify-between items-center mb-6 shrink-0">
        <h2 className="text-2xl font-bold text-primary dark:text-white">
          Edit Profile
        </h2>
        <button
          type="button"
          onClick={onCancel}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-secondary dark:text-gray-400"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 space-y-8">
        {/* Profile Image */}
        <div className="flex flex-col items-center gap-4">
          <div className="relative group">
            <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white dark:border-white/10 shadow-lg relative bg-gray-100 flex items-center justify-center">
              {isUploading ? (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-20">
                  <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : (
                <Image
                  src={formData.image || "/placeholder.jpg"}
                  alt="Profile"
                  fill
                  className="object-cover"
                  sizes="112px"
                />
              )}
              <div
                onClick={() => fileInputRef.current?.click()}
                className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer z-10"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-white"
                >
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                  <circle cx="12" cy="13" r="4"></circle>
                </svg>
              </div>
            </div>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </div>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="text-xs font-bold text-primary dark:text-blue-400 hover:underline"
          >
            {isUploading ? "Uploading..." : "Change Photo"}
          </button>
        </div>

        {/* 1. Identity & Academics */}
        <section>
          <SectionHeader
            number="1"
            title="Identity & Academics"
            colorClass="bg-blue-100 text-blue-600"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <InputGroup
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <InputGroup
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-secondary dark:text-gray-500 uppercase">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm font-medium text-primary dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer"
              >
                <option value="Active">Active</option>
                <option value="Completed">Completed</option>
                <option value="Dropped">Dropped</option>
                <option value="Probation">Probation</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <InputGroup
                label="Role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                type="text"
                required
              />
            </div>
          </div>
        </section>

        {/* 2. Personal Information */}
        <section>
          <SectionHeader
            number="2"
            title="Personal Information"
            colorClass="bg-purple-100 text-purple-600"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <InputGroup
              label="Date of Birth"
              name="personalInfo.dob"
              type="date"
              value={formData.personalInfo.dob}
              onChange={handleChange}
              required
            />

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-secondary dark:text-gray-500 uppercase">
                Gender
              </label>
              <select
                name="personalInfo.gender"
                value={formData.personalInfo.gender}
                onChange={handleChange}
                className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm font-medium text-primary dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <InputGroup
              label="Blood Group"
              name="personalInfo.bloodGroup"
              value={formData.personalInfo.bloodGroup}
              onChange={handleChange}
            />

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-secondary dark:text-gray-500 uppercase">
                Category
              </label>
              <select
                name="personalInfo.casteCategory"
                value={formData.personalInfo.casteCategory}
                onChange={handleChange}
                className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm font-medium text-primary dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer"
              >
                <option value="General">General</option>
                <option value="OBC">OBC</option>
                <option value="SC">SC</option>
                <option value="ST">ST</option>
              </select>
            </div>

            <InputGroup
              label="Aadhar Card"
              name="personalInfo.aadharCard"
              value={formData.personalInfo.aadharCard}
              onChange={handleChange}
            />
          </div>
        </section>

        {/* 3. Guardian & Contact Details */}
        <section>
          <SectionHeader
            number="3"
            title="Guardian & Contact"
            colorClass="bg-green-100 text-green-600"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <InputGroup
              label="Father's Name"
              name="guardianDetails.fatherName"
              value={formData.guardianDetails.fatherName}
              onChange={handleChange}
            />
            <InputGroup
              label="Mother's Name"
              name="guardianDetails.motherName"
              value={formData.guardianDetails.motherName}
              onChange={handleChange}
            />
            <InputGroup
              label="Primary Phone"
              name="guardianDetails.primaryPhone"
              value={formData.guardianDetails.primaryPhone}
              onChange={handleChange}
              required
            />
            <InputGroup
              label="Secondary Phone"
              name="guardianDetails.secondaryPhone"
              value={formData.guardianDetails.secondaryPhone}
              onChange={handleChange}
            />
          </div>

          <div className="mt-5 space-y-1.5">
            <label className="text-xs font-bold text-secondary dark:text-gray-500 uppercase">
              Address
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input
                type="text"
                name="guardianDetails.address.street"
                placeholder="Street"
                value={formData.guardianDetails.address.street}
                onChange={handleChange}
                className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm font-medium text-primary dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <input
                type="text"
                name="guardianDetails.address.city"
                placeholder="City"
                value={formData.guardianDetails.address.city}
                onChange={handleChange}
                className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm font-medium text-primary dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <input
                type="text"
                name="guardianDetails.address.state"
                placeholder="State"
                value={formData.guardianDetails.address.state}
                onChange={handleChange}
                className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm font-medium text-primary dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <input
                type="text"
                name="guardianDetails.address.pincode"
                placeholder="Pincode"
                value={formData.guardianDetails.address.pincode}
                onChange={handleChange}
                className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm font-medium text-primary dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>
        </section>

        {/* 4. Course & Performance */}
        <section>
          <SectionHeader
            number="4"
            title="Course & Performance"
            colorClass="bg-amber-100 text-amber-600"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <InputGroup
              label="Start Date"
              name="courseStartDate"
              type="date"
              value={formData.courseStartDate}
              onChange={handleChange}
              required
            />
            <InputGroup
              label="End Date"
              name="courseEndDate"
              type="date"
              value={formData.courseEndDate}
              onChange={handleChange}
            />
            <InputGroup
              label="Marks"
              name="marks"
              type="number"
              value={formData.marks}
              onChange={handleChange}
            />
            <InputGroup
              label="Grade"
              name="grade"
              value={formData.grade}
              onChange={handleChange}
            />
            <InputGroup
              label="Roll ID"
              name="rollId"
              type="number"
              value={formData.rollId}
              onChange={handleChange}
              required
            />
            <InputGroup
              label="Certificate ID"
              name="certificateId"
              value={formData.certificateId || ""}
              onChange={handleChange}
            />
          </div>
        </section>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100 dark:border-white/5 flex gap-3 shrink-0">
        {error && (
          <div className="absolute bottom-20 left-6 right-6 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-sm text-red-600 dark:text-red-400 text-center">
            {error}
          </div>
        )}
        <button
          type="button"
          onClick={onCancel}
          disabled={isUploading}
          className="flex-1 px-6 py-3 border border-gray-200 dark:border-gray-700 text-secondary dark:text-white hover:bg-gray-50 dark:hover:bg-white/5 text-sm font-bold rounded-xl transition-all active:scale-95 disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSaving || isUploading}
          className="flex-1 px-6 py-3 bg-primary dark:bg-white dark:text-primary text-white text-sm font-bold rounded-xl transition-all shadow-lg shadow-primary/20 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSaving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
}

function SectionHeader({
  number,
  title,
  colorClass,
}: {
  number: string;
  title: string;
  colorClass: string;
}) {
  return (
    <h3 className="text-sm font-bold text-primary dark:text-white mb-4 flex items-center gap-2">
      <span
        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${colorClass}`}
      >
        {number}
      </span>
      {title}
    </h3>
  );
}

function InputGroup({
  label,
  name,
  type = "text",
  value,
  onChange,
  required,
  placeholder,
}: any) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-bold text-secondary dark:text-gray-500 uppercase">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm font-medium text-primary dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all placeholder:font-normal placeholder:text-gray-400"
      />
    </div>
  );
}

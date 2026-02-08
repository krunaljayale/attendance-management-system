"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import { StudentFullDetails } from "@/constants/Types";
import { API } from "@/constants/API/api";

const CLOUDINARY_UPLOAD_PRESET =
  process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_API_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;

interface RegisterStudentFormProps {
  onCancel: () => void;
  onSave: (newStudent: StudentFullDetails) => void;
}

export default function RegisterStudentForm({
  onCancel,
  onSave,
}: RegisterStudentFormProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rollId: "" as unknown as number,
    image: "",
    course: "",
    courseStartDate: new Date().toISOString().split("T")[0],
    courseEndDate: "",
    status: "Active",
    registrarId: "",

    personalInfo: {
      dob: "",
      gender: "Male",
      bloodGroup: "",
      casteCategory: "General",
      aadharCard: "",
    },

    guardianDetails: {
      fatherName: "",
      motherName: "",
      primaryPhone: "",
      secondaryPhone: "",
      address: {
        street: "",
        city: "",
        state: "",
        pincode: "",
      },
    },
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        const userId = parsedUser._id || parsedUser.id;
        if (userId) {
          setFormData((prev) => ({ ...prev, registrarId: userId }));
        }
      } catch (e) {
        console.error("Error parsing user from local storage", e);
      }
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;

    if (name.includes(".")) {
      const parts = name.split(".");

      if (parts.length === 2) {
        const [parent, child] = parts;
        setFormData((prev: any) => ({
          ...prev,
          [parent]: {
            ...prev[parent],
            [child]: value,
          },
        }));
      } else if (parts.length === 3) {
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
        [name]: name === "rollId" ? Number(value) : value,
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
      setError("Failed to upload image. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const validateForm = () => {
    if (!formData.image) return "Profile image is required.";
    if (!formData.name) return "Full Name is required.";
    if (!formData.email) return "Email Address is required.";
    if (!formData.rollId) return "Roll Number is required.";
    if (!formData.course) return "Course is required.";
    if (!formData.personalInfo.dob) return "Date of Birth is required.";
    if (!formData.guardianDetails.primaryPhone)
      return "Primary Contact Number is required.";
    if (!formData.courseStartDate) return "Start Date is required.";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsSaving(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(API.REGISTER_NEW_STUDENT, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 201 || response.status === 200) {
        onSave(response.data);
      }
    } catch (err: any) {
      console.error(err);
      const serverMessage =
        err.response?.data?.message ||
        "Failed to register student. Please check your connection.";
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
          Register New Student
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
        <div className="flex flex-col items-center gap-4">
          <div className="relative group">
            <div
              className={`w-32 h-32 rounded-full overflow-hidden border-4 ${!formData.image && error ? "border-red-500" : "border-gray-100 dark:border-white/10"} shadow-lg relative bg-gray-50 flex items-center justify-center transition-colors`}
            >
              {isUploading ? (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-20">
                  <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : formData.image ? (
                <Image
                  src={formData.image}
                  alt="Profile"
                  fill
                  className="object-cover"
                  sizes="128px"
                />
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gray-400"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
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
            className={`text-xs font-bold ${!formData.image && error ? "text-red-500" : "text-primary dark:text-blue-400"} hover:underline`}
          >
            {isUploading
              ? "Uploading..."
              : formData.image
                ? "Change Photo"
                : "Upload Photo *"}
          </button>
        </div>

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
              placeholder="e.g. Rahul Sharma"
            />
            <InputGroup
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="rahul@college.edu"
            />
            <InputGroup
              label="Roll Number"
              name="rollId"
              type="number"
              value={formData.rollId}
              onChange={handleChange}
              required
              placeholder="2405"
            />
            <InputGroup
              label="Course"
              name="course"
              value={formData.course}
              onChange={handleChange}
              required
              placeholder="e.g. B.Tech Computer Science"
            />
          </div>
        </section>

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
              placeholder="e.g. O+"
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
              label="Aadhar Card No."
              name="personalInfo.aadharCard"
              value={formData.personalInfo.aadharCard}
              onChange={handleChange}
              placeholder="XXXX-XXXX-XXXX"
            />
          </div>
        </section>

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
              placeholder="Mr. Rajesh Sharma"
            />
            <InputGroup
              label="Mother's Name"
              name="guardianDetails.motherName"
              value={formData.guardianDetails.motherName}
              onChange={handleChange}
              placeholder="Mrs. Sunita Sharma"
            />
            <InputGroup
              label="Primary Phone"
              name="guardianDetails.primaryPhone"
              value={formData.guardianDetails.primaryPhone}
              onChange={handleChange}
              required
              placeholder="+91 9876543210"
            />
            <InputGroup
              label="Secondary Phone"
              name="guardianDetails.secondaryPhone"
              value={formData.guardianDetails.secondaryPhone}
              onChange={handleChange}
              placeholder="(Optional)"
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
                placeholder="Street / Flat No."
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

        <section>
          <SectionHeader
            number="4"
            title="Course Timeline"
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
              label="End Date (Est.)"
              name="courseEndDate"
              type="date"
              value={formData.courseEndDate}
              onChange={handleChange}
            />
          </div>
        </section>
      </div>

      <div className="mt-4 shrink-0">
        {error && (
          <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl flex items-center gap-2 text-sm text-red-600 dark:text-red-400 animate-in fade-in slide-in-from-bottom-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            {error}
          </div>
        )}

        <div className="pt-2 border-t border-gray-100 dark:border-white/5 flex gap-3">
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
            className="flex-1 px-6 py-3 bg-primary dark:bg-white dark:text-primary text-white text-sm font-bold rounded-xl transition-all shadow-lg shadow-primary/20 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2"
          >
            {isSaving
              ? "Registering..."
              : isUploading
                ? "Uploading Image..."
                : "Complete Registration"}
          </button>
        </div>
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

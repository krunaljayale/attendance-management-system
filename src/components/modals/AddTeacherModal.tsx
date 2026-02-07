"use client";

import React, { useState } from "react";
import axios from "axios";
import { API } from "@/constants/API/api";

interface AddTeacherModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AddTeacherModal({
  isOpen,
  onClose,
  onSuccess,
}: AddTeacherModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    employeeId: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "TEACHER",
    department: "",
    city: "",
    assignedClasses: "",
  });

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");

      const payload = {
        ...formData,
        assignedClasses: formData.assignedClasses
          ? formData.assignedClasses.split(",").map((c) => c.trim())
          : [],
      };

      await axios.post(API.ADD_NEW_TEACHER, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      onSuccess();
      onClose();

      setFormData({
        name: "",
        employeeId: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "TEACHER",
        department: "",
        city: "",
        assignedClasses: "",
      });
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to create account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
        onClick={onClose}
      />

      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white dark:bg-[#1E1624] rounded-3xl shadow-2xl p-5 md:p-8 animate-in zoom-in-95 duration-200 border border-gray-100 dark:border-white/10">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 md:top-6 md:right-6 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/5 text-gray-400 hover:text-gray-600 dark:hover:text-white transition-all z-10"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="mb-6 mt-2 md:mt-0">
          <h2 className="text-xl md:text-2xl font-bold text-primary dark:text-white flex items-center gap-2">
            <span className="w-1.5 h-8 bg-magenta rounded-full"></span>
            Add New Member
          </h2>
          <p className="text-secondary dark:text-gray-400 pl-4 text-sm mt-1">
            Enter details to create a new Teacher or Admin account.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 text-red-600 rounded-xl text-sm font-bold flex items-center gap-2">
            <svg
              className="w-5 h-5 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6"
        >
          <div className="space-y-4">
            <ModalInput
              label="Full Name"
              name="name"
              placeholder="Ex. John Doe"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <ModalInput
              label="Email Address"
              name="email"
              type="email"
              placeholder="john@university.edu"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <ModalInput
              label="Phone Number"
              name="phoneNumber"
              placeholder="+91 98765 43210"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
            <ModalInput
              label="Password"
              name="password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-secondary/60 dark:text-gray-500 uppercase tracking-wider pl-1">
                Role
              </label>
              <div className="relative">
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full bg-gray-50 dark:bg-black/20 border-2 border-transparent focus:border-magenta/30 rounded-2xl px-4 py-3.5 text-sm font-bold text-primary dark:text-white focus:outline-none focus:ring-4 focus:ring-magenta/10 transition-all cursor-pointer appearance-none"
                >
                  <option value="TEACHER">Teacher</option>
                  <option value="SUPER_ADMIN">Super Admin</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>

            <ModalInput
              label="Employee ID"
              name="employeeId"
              placeholder="Ex. TCH-001"
              value={formData.employeeId}
              onChange={handleChange}
            />

            <div className="grid grid-cols-2 gap-4">
              <ModalInput
                label="Department"
                name="department"
                placeholder="CS/IT"
                value={formData.department}
                onChange={handleChange}
              />
              <ModalInput
                label="City"
                name="city"
                placeholder="Pune"
                value={formData.city}
                onChange={handleChange}
              />
            </div>

            <ModalInput
              label="Assigned Classes"
              name="assignedClasses"
              placeholder="Ex. CS-A, CS-B"
              value={formData.assignedClasses}
              onChange={handleChange}
            />
          </div>

          <div className="md:col-span-2 pt-4 flex gap-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3.5 rounded-xl font-bold bg-gray-100 dark:bg-white/5 text-secondary dark:text-white hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-3.5 rounded-xl font-bold bg-magenta text-white shadow-lg shadow-magenta/20 hover:shadow-magenta/40 hover:scale-[1.01] transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function ModalInput({ label, ...props }: any) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-bold text-secondary/60 dark:text-gray-500 uppercase tracking-wider pl-1">
        {label}
      </label>
      <input
        className="w-full bg-gray-50 dark:bg-black/20 border-2 border-transparent focus:border-magenta/30 rounded-2xl px-4 py-3.5 text-sm font-bold text-primary dark:text-white focus:outline-none focus:ring-4 focus:ring-magenta/10 transition-all placeholder:font-normal placeholder:text-gray-400"
        {...props}
      />
    </div>
  );
}

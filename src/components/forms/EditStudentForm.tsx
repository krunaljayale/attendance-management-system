"use client";

import React, { useState } from "react";
import { StudentFullDetails } from "@/components/modals/StudentDetailsModal";

interface EditStudentFormProps {
  student: StudentFullDetails;
  onCancel: () => void;
  onSave: (updatedData: StudentFullDetails) => void;
}

export default function EditStudentForm({ student, onCancel, onSave }: EditStudentFormProps) {
  const [formData, setFormData] = useState<StudentFullDetails>(student);
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "marks" || name === "rollId" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      onSave(formData);
      setIsSaving(false);
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-primary dark:text-white">Edit Profile</h3>
      </div>

      <div className="space-y-5">
        {/* Row 1: Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-secondary dark:text-gray-500 uppercase">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm font-medium text-primary dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-secondary dark:text-gray-500 uppercase">Role / Course</label>
            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm font-medium text-primary dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>
        </div>

        {/* Row 2: Contact & Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-secondary dark:text-gray-500 uppercase">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm font-medium text-primary dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-secondary dark:text-gray-500 uppercase">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm font-medium text-primary dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all appearance-none cursor-pointer"
            >
              <option value="Active">Active</option>
              <option value="Completed">Completed</option>
              <option value="Probation">Probation</option>
              <option value="Dropped">Dropped</option>
            </select>
          </div>
        </div>

        {/* Row 3: Dates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-secondary dark:text-gray-500 uppercase">Start Date</label>
            <input
              type="date"
              name="courseStartDate"
              value={formData.courseStartDate}
              onChange={handleChange}
              className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm font-medium text-primary dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-secondary dark:text-gray-500 uppercase">End Date</label>
            <input
              type="date"
              name="courseEndDate"
              value={formData.courseEndDate}
              onChange={handleChange}
              className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm font-medium text-primary dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>
        </div>

        {/* Row 4: Academic Stats (Optional Edit) */}
        <div className="grid grid-cols-3 gap-5">
           <div className="space-y-1.5">
            <label className="text-xs font-bold text-secondary dark:text-gray-500 uppercase">Grade</label>
            <input
              type="text"
              name="grade"
              value={formData.grade}
              onChange={handleChange}
              className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm font-medium text-primary dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>
           <div className="space-y-1.5">
            <label className="text-xs font-bold text-secondary dark:text-gray-500 uppercase">Marks</label>
            <input
              type="number"
              name="marks"
              value={formData.marks}
              onChange={handleChange}
              className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm font-medium text-primary dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>
           <div className="space-y-1.5">
            <label className="text-xs font-bold text-secondary dark:text-gray-500 uppercase">Roll ID</label>
            <input
              type="number"
              name="rollId"
              value={formData.rollId}
              readOnly // Usually Roll ID shouldn't change
              className="w-full bg-gray-100 dark:bg-white/5 border border-transparent rounded-xl px-4 py-3 text-sm font-medium text-secondary dark:text-gray-500 cursor-not-allowed"
            />
          </div>
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="flex gap-3 mt-8 pt-6 border-t border-gray-100 dark:border-white/5">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 px-6 py-3 border border-gray-200 dark:border-gray-700 text-secondary dark:text-white hover:bg-gray-50 dark:hover:bg-white/5 text-sm font-bold rounded-xl transition-all active:scale-95"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSaving}
          className="flex-1 px-6 py-3 bg-primary dark:bg-white dark:text-primary text-white text-sm font-bold rounded-xl transition-all shadow-lg shadow-primary/20 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2"
        >
          {isSaving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
}
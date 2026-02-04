"use client";

import React, { useState } from "react";
import { StudentFullDetails } from "@/components/modals/StudentDetailsModal";

interface RegisterStudentFormProps {
  onCancel: () => void;
  onSave: (newStudent: StudentFullDetails) => void;
}

export default function RegisterStudentForm({ onCancel, onSave }: RegisterStudentFormProps) {
  const [isSaving, setIsSaving] = useState(false);
  
  // Initial empty state
  const [formData, setFormData] = useState<Partial<StudentFullDetails>>({
    name: "",
    email: "",
    role: "Web Development", // Default
    rollId: 2400, // Default start
    status: "Active",
    courseStartDate: new Date().toISOString().split('T')[0],
    courseEndDate: "",
    marks: 0,
    attendance: "0%",
    grade: "N/A",
    image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=200&fit=crop&q=60", // Default placeholder avatar
    registrarId: "65bf9c1e8d2a4b3f1c9e7d01" // Current Admin ID
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "rollId" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    // Simulate Network Request
    setTimeout(() => {
        // Generate a random ID for frontend demo purposes
        const newStudent = {
            ...formData,
            id: Date.now(), 
        } as StudentFullDetails;

        onSave(newStudent);
        setIsSaving(false);
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 h-full flex flex-col">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-primary dark:text-white">Register New Student</h2>
        <button 
            type="button"
            onClick={onCancel}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-secondary dark:text-gray-400"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto space-y-6 pr-2">
        
        {/* Personal Details */}
        <section>
            <h3 className="text-sm font-bold text-primary dark:text-white mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs">1</span>
                Personal Information
            </h3>
            <div className="grid grid-cols-1 gap-5">
                <div className="space-y-1.5">
                    <label className="text-xs font-bold text-secondary dark:text-gray-500 uppercase">Full Name</label>
                    <input required type="text" name="name" placeholder="e.g. Sarah Connor" onChange={handleChange} className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm font-medium text-primary dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" />
                </div>
                <div className="space-y-1.5">
                    <label className="text-xs font-bold text-secondary dark:text-gray-500 uppercase">Email Address</label>
                    <input required type="email" name="email" placeholder="sarah@university.edu" onChange={handleChange} className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm font-medium text-primary dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" />
                </div>
            </div>
        </section>

        {/* Academic Details */}
        <section>
            <h3 className="text-sm font-bold text-primary dark:text-white mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-xs">2</span>
                Academic Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                    <label className="text-xs font-bold text-secondary dark:text-gray-500 uppercase">Course / Role</label>
                    <select name="role" onChange={handleChange} className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm font-medium text-primary dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer appearance-none">
                        <option value="Web Development">Web Development</option>
                        <option value="App Development">App Development</option>
                        <option value="UI/UX Design">UI/UX Design</option>
                        <option value="Data Science">Data Science</option>
                        <option value="Cyber Security">Cyber Security</option>
                        <option value="Marketing">Marketing</option>
                    </select>
                </div>
                <div className="space-y-1.5">
                    <label className="text-xs font-bold text-secondary dark:text-gray-500 uppercase">Roll Number</label>
                    <input required type="number" name="rollId" placeholder="2400" onChange={handleChange} className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm font-medium text-primary dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" />
                </div>
            </div>
        </section>

        {/* Course Duration */}
        <section>
            <h3 className="text-sm font-bold text-primary dark:text-white mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center text-xs">3</span>
                Course Duration
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                    <label className="text-xs font-bold text-secondary dark:text-gray-500 uppercase">Start Date</label>
                    <input required type="date" name="courseStartDate" value={formData.courseStartDate} onChange={handleChange} className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm font-medium text-primary dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" />
                </div>
                <div className="space-y-1.5">
                    <label className="text-xs font-bold text-secondary dark:text-gray-500 uppercase">End Date (Estimated)</label>
                    <input required type="date" name="courseEndDate" onChange={handleChange} className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm font-medium text-primary dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" />
                </div>
            </div>
        </section>

      </div>

      {/* Footer Actions */}
      <div className="mt-8 pt-6 border-t border-gray-100 dark:border-white/5 flex gap-3">
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
          {isSaving ? "Registering..." : "Complete Registration"}
        </button>
      </div>
    </form>
  );
}
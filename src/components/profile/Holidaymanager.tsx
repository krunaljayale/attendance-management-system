"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { API } from "@/constants/API/api";
import { Holiday } from "@/constants/Types";

export default function HolidayManager() {
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);

  // State for handling messages
  const [alertMessage, setAlertMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    date: "",
    type: "National",
    description: "",
  });

  useEffect(() => {
    fetchHolidays();
  }, []);

  // Clear message after 5 seconds
  useEffect(() => {
    if (alertMessage) {
      const timer = setTimeout(() => setAlertMessage(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [alertMessage]);

  const fetchHolidays = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(API.GET_HOLIDAYS, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setHolidays(res.data);
    } catch (error) {
      console.error("Failed to fetch holidays", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAlertMessage(null);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(API.ADD_HOLIDAY, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setHolidays((prev) => [...prev, res.data]);
      setFormData({ name: "", date: "", type: "National", description: "" });
      setIsAdding(false);
      setAlertMessage({ type: "success", text: "Holiday added successfully." });
    } catch (error: any) {
      console.error("Failed to add holiday", error);
      const msg = error.response?.data?.message || "Failed to add holiday";
      setAlertMessage({ type: "error", text: msg });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this holiday?")) return;
    setAlertMessage(null);

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API.DELETE_HOLIDAY}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setHolidays((prev) => prev.filter((h) => h._id !== id));
      setAlertMessage({
        type: "success",
        text: "Holiday deleted successfully.",
      });
    } catch (error: any) {
      console.error("Failed to delete holiday", error);
      // Extract the specific message from the server response
      const msg = error.response?.data?.message || "Failed to delete holiday.";
      setAlertMessage({ type: "error", text: msg });
    }
  };

  return (
    <div className="w-full bg-white dark:bg-[#1E1624] rounded-3xl shadow-sm border border-gray-100 dark:border-white/5 overflow-hidden">
      <div className="p-6 border-b border-gray-100 dark:border-white/5 flex justify-between items-center">
        <div>
          <h3 className="text-xl font-bold text-primary dark:text-white">
            Academic Calendar & Holidays
          </h3>
          <p className="text-sm text-secondary dark:text-gray-400">
            Manage holidays visible to all admins.
          </p>
        </div>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="px-4 py-2 bg-primary dark:bg-white dark:text-primary text-white text-sm font-bold rounded-xl transition-all active:scale-95 shadow-lg shadow-primary/20"
        >
          {isAdding ? "Cancel" : "+ Add Holiday"}
        </button>
      </div>

      {/* Alert Message Display */}
      {alertMessage && (
        <div
          className={`px-6 py-3 text-sm font-bold text-center ${
            alertMessage.type === "error"
              ? "bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400"
              : "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400"
          }`}
        >
          {alertMessage.text}
        </div>
      )}

      {isAdding && (
        <form
          onSubmit={handleSubmit}
          className="p-6 bg-gray-50 dark:bg-white/5 border-b border-gray-100 dark:border-white/5 animate-in slide-in-from-top-2"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-secondary dark:text-gray-500 uppercase">
                Holiday Name
              </label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-white dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm font-medium text-primary dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20"
                placeholder="e.g. Diwali Vacation"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-secondary dark:text-gray-500 uppercase">
                Date
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="w-full bg-white dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm font-medium text-primary dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-secondary dark:text-gray-500 uppercase">
                Type
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full bg-white dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm font-medium text-primary dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                <option value="National">National</option>
                <option value="Regional">Regional</option>
                <option value="Academic">Academic</option>
                <option value="Optional">Optional</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-secondary dark:text-gray-500 uppercase">
                Description (Optional)
              </label>
              <input
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full bg-white dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm font-medium text-primary dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20"
                placeholder="Brief details..."
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-2.5 bg-emerald-500 text-white text-sm font-bold rounded-xl shadow-lg shadow-emerald-500/20 hover:bg-emerald-600 transition-colors"
          >
            Save Holiday
          </button>
        </form>
      )}

      <div className="p-6">
        {loading ? (
          <div className="flex justify-center py-4">
            <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : holidays.length === 0 ? (
          <div className="text-center text-secondary dark:text-gray-500 py-8">
            No holidays added yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {holidays.map((holiday) => (
              <div
                key={holiday._id}
                className="group relative p-4 rounded-2xl border border-gray-100 dark:border-white/10 bg-gray-50 dark:bg-white/5 hover:border-primary/30 transition-colors"
              >
                <div className="flex justify-between items-start mb-2">
                  <div
                    className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider 
                    ${
                      holiday.type === "National"
                        ? "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300"
                        : holiday.type === "Academic"
                          ? "bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-300"
                          : "bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-300"
                    }`}
                  >
                    {holiday.type}
                  </div>
                  <button
                    onClick={() => handleDelete(holiday._id)}
                    className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
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
                      <path d="M3 6h18" />
                      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                    </svg>
                  </button>
                </div>

                <h4 className="font-bold text-primary dark:text-white mb-1">
                  {holiday.name}
                </h4>
                <div className="flex items-center gap-2 text-sm text-secondary dark:text-gray-400 mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  {new Date(holiday.date).toLocaleDateString(undefined, {
                    weekday: "short",
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </div>
                {holiday.description && (
                  <p className="text-xs text-gray-500 dark:text-gray-500 line-clamp-2">
                    {holiday.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import { API } from "@/constants/API/api";

interface Attendant {
  id: string;
  name: string;
  avatar?: string;
  percentage: number;
  days: number;
}

export default function TopAttendants() {
  const [attendants, setAttendants] = useState<Attendant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopAttendants = async () => {
      try {
        setLoading(true);
        const response = await axios.get(API.GET_TOP_ATTENDANTS, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        // Ensure we always work with an array
        const data = Array.isArray(response.data) ? response.data : [];
        setAttendants(data.slice(0, 5));
      } catch (error) {
        console.error("Failed to fetch top attendants:", error);
        setAttendants([]); // Fallback to empty array on error
      } finally {
        setLoading(false);
      }
    };

    fetchTopAttendants();
  }, []);

  return (
    <div className="bg-white dark:bg-primary p-5 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col h-full transition-colors duration-300">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-primary dark:text-white">
          Top 5 Monthly Attendants
        </h3>
      </div>

      <div className="flex flex-col gap-3 flex-1 justify-start">
        {loading ? (
          Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-2 animate-pulse"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                <div className="flex flex-col gap-1">
                  <div className="w-24 h-3 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div className="w-8 h-2 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </div>
              </div>
              <div className="w-10 h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
          ))
        ) : attendants.length === 0 ? (
          // --- NO DATA STATE ---
          <div className="flex flex-col items-center justify-center h-full py-8 text-center opacity-70">
            <div className="bg-gray-50 dark:bg-white/5 p-4 rounded-full mb-3">
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
                className="text-gray-400 dark:text-gray-500"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <line x1="19" y1="8" x2="19" y2="14" />
                <line x1="22" y1="11" x2="16" y2="11" />
              </svg>
            </div>
            <p className="text-sm font-semibold text-primary dark:text-white">
              No Data Yet
            </p>
            <p className="text-xs text-secondary dark:text-gray-400 mt-1 max-w-[150px]">
              Attendance records for this month will appear here.
            </p>
          </div>
        ) : (
          // --- DATA LIST ---
          attendants.map((student) => (
            <div
              key={student.id}
              className="flex items-center justify-between group cursor-pointer hover:bg-gray-50 dark:hover:bg-white/5 p-2 rounded-xl transition-colors -mx-2"
            >
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden border border-gray-100 dark:border-gray-700 shadow-sm bg-gray-100">
                  <Image
                    src={
                      student.avatar ||
                      `https://ui-avatars.com/api/?name=${student.name}&background=random`
                    }
                    alt={student.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-primary dark:text-white group-hover:text-magenta transition-colors">
                    {student.name}
                  </span>

                  <span className="md:hidden bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400 text-[10px] font-bold px-1.5 py-0.5 rounded-full w-fit mt-0.5">
                    {student.percentage}%
                  </span>
                </div>

                <span className="hidden md:block bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {student.percentage}%
                </span>
              </div>

              <div className="flex items-end gap-1">
                <span className="text-base font-bold text-primary dark:text-white">
                  {student.days}
                </span>
                <span className="text-xs text-secondary dark:text-gray-400 font-medium mb-0.5">
                  Days
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

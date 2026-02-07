"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { API } from "@/constants/API/api";

interface ChartData {
  label: string;
  value: number;
}

type ViewMode = "monthly" | "yearly";

export default function TotalStat() {
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [activeLabel, setActiveLabel] = useState<string>("");
  const [viewMode, setViewMode] = useState<ViewMode>("monthly");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${API.GET_ATTENDANCE_STATS}/${viewMode}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setChartData(response.data);

        if (response.data.length > 0) {
          setActiveLabel(response.data[response.data.length - 1].label);
        }
      } catch (error) {
        console.error("Failed to fetch attendance stats: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [viewMode]);

  return (
    <div className="w-full bg-white dark:bg-primary p-4 md:p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col transition-colors duration-300">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-lg md:text-xl font-bold text-primary dark:text-white">
            Average Attendance
          </h3>
          <p className="text-xs text-secondary dark:text-gray-400 mt-1">
            {viewMode === "monthly"
              ? "Attendance Rate by Month"
              : "Attendance Rate by Year"}
          </p>
        </div>

        <div className="flex bg-gray-100 dark:bg-white/5 p-1 rounded-full text-xs font-medium">
          <button
            onClick={() => setViewMode("monthly")}
            className={`px-3 py-1.5 rounded-full transition-all ${
              viewMode === "monthly"
                ? "bg-white dark:bg-primary text-primary dark:text-white shadow-sm"
                : "text-secondary dark:text-gray-400 hover:text-primary dark:hover:text-white"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setViewMode("yearly")}
            className={`px-3 py-1.5 rounded-full transition-all ${
              viewMode === "yearly"
                ? "bg-white dark:bg-primary text-primary dark:text-white shadow-sm"
                : "text-secondary dark:text-gray-400 hover:text-primary dark:hover:text-white"
            }`}
          >
            Yearly
          </button>
        </div>
      </div>

      {loading ? (
        <div className="w-full h-72 flex flex-col items-center justify-center gap-2 text-secondary dark:text-gray-500 animate-pulse">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
          <span className="text-xs">Loading stats...</span>
        </div>
      ) : (
        <div className="flex gap-2 md:gap-4 h-72 w-full">
          <div className="flex flex-col justify-between text-xs font-medium text-secondary dark:text-gray-500 py-6 pt-12 shrink-0">
            <span>100%</span>
            <span>75%</span>
            <span>50%</span>
            <span>25%</span>
            <span>0%</span>
          </div>

          <div className="flex-1 overflow-x-auto pb-2 pt-10 no-scrollbar">
            <div className="flex items-end justify-between gap-3 h-full min-w-max md:min-w-0 pl-2 pr-2">
              {chartData.map((item) => {
                const isActive = activeLabel === item.label;
                const percentage = Math.min(item.value, 100);

                return (
                  <div
                    key={item.label}
                    className="flex flex-col items-center gap-1 w-full min-w-10 group relative cursor-pointer"
                    onMouseEnter={() => setActiveLabel(item.label)}
                    onClick={() => setActiveLabel(item.label)}
                  >
                    <div
                      className={`absolute -top-10 left-1/2 -translate-x-1/2 transition-all duration-300 z-20 ${
                        isActive
                          ? "opacity-100 -translate-y-1 scale-100"
                          : "opacity-0 translate-y-2 scale-90 pointer-events-none"
                      }`}
                    >
                      <div className="bg-primary dark:bg-white text-white dark:text-primary text-[10px] font-bold py-1.5 px-3 rounded-full shadow-xl whitespace-nowrap relative">
                        {percentage}%
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-primary dark:bg-white rotate-45"></div>
                      </div>
                    </div>

                    <div className="relative w-full max-w-10 h-48 flex items-end rounded-t-xl bg-transparent">
                      <div
                        className={`w-full rounded-t-md md:rounded-t-xl transition-all duration-300 ease-out ${
                          isActive
                            ? "bg-linear-to-t from-magenta to-purple-600 shadow-lg shadow-magenta/40 dark:shadow-magenta/60 scale-[1.05]"
                            : "bg-lavender/40 hover:bg-lavender/60 dark:bg-white/5 dark:hover:bg-white/10"
                        }`}
                        style={{ height: `${percentage}%` }}
                      ></div>
                    </div>

                    <span
                      className={`text-[10px] md:text-xs font-medium text-center transition-colors whitespace-nowrap ${
                        isActive
                          ? "text-primary dark:text-white font-bold"
                          : "text-secondary dark:text-gray-500"
                      }`}
                    >
                      {item.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

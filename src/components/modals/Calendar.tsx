"use client";

import  { useState, useEffect } from "react";
import axios from "axios";
import { API } from "@/constants/API/api";
import MonthGrid from "../cards/MonthGrid";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

interface CalendarProps {
  onDateSelect?: (date: Date) => void;
}

export default function FullYearCalendar({ onDateSelect }: CalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [year, setYear] = useState(new Date().getFullYear());
  const [holidays, setHolidays] = useState<Record<string, "holiday">>({});

  useEffect(() => {
    const fetchHolidays = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(API.GET_HOLIDAYS, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const holidayMap: Record<string, "holiday"> = {};
        if (Array.isArray(response.data)) {
          response.data.forEach((h: any) => {
            if (h.date) {
              const dateStr = new Date(h.date).toISOString().split("T")[0];
              holidayMap[dateStr] = "holiday";
            }
          });
        }
        setHolidays(holidayMap);
      } catch (error) {
        console.error(error);
      }
    };

    fetchHolidays();
  }, []);

  const handlePrevYear = () => setYear((prev) => prev - 1);
  const handleNextYear = () => setYear((prev) => prev + 1);

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    if (onDateSelect) {
      onDateSelect(date);
    }
  };

  return (
    <div className="w-full bg-white dark:bg-[#1A0F1E] p-6 md:p-10 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm transition-colors duration-300">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-primary dark:text-white tracking-tight">
            Attendance Overview
          </h2>

          <div className="flex items-center gap-4 mt-2">
            <button
              onClick={handlePrevYear}
              className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 text-secondary dark:text-gray-400 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>

            <p className="text-secondary dark:text-gray-400 text-lg font-medium min-w-[140px] text-center">
              Academic Year{" "}
              <span className="text-primary dark:text-white font-bold">
                {year}
              </span>
            </p>

            <button
              onClick={handleNextYear}
              className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 text-secondary dark:text-gray-400 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 text-xs font-bold text-secondary dark:text-gray-500 uppercase tracking-wide bg-gray-50 dark:bg-white/5 p-3 rounded-xl border border-gray-100 dark:border-white/5">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
            <span>Holiday / Sunday</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full border border-primary dark:border-white"></span>
            <span>Selected</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-8 gap-y-12">
        {MONTHS.map((monthName, index) => (
          <MonthGrid
            key={`${monthName}-${year}`}
            monthName={monthName}
            monthIndex={index}
            year={year}
            selectedDate={selectedDate}
            onSelectDate={handleDateClick}
            holidays={holidays}
          />
        ))}
      </div>
    </div>
  );
}



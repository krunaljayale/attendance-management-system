"use client";

import React, { useState } from "react";

const DAYS_OF_WEEK = ["M", "T", "W", "T", "F", "S", "S"];
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

// --- 1. Dynamic API Data Simulation ---
const API_HOLIDAYS: Record<string, "holiday"> = {
  "2026-01-26": "holiday", // Republic Day
  "2026-08-15": "holiday", // Independence Day
  "2026-10-02": "holiday", // Gandhi Jayanti
  "2026-12-25": "holiday", // Christmas
  "2026-03-25": "holiday", // Holi
};

interface CalendarProps {
  onDateSelect?: (date: Date) => void;
}

export default function FullYearCalendar({ onDateSelect }: CalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [year, setYear] = useState(2026);

  // Year Navigation Handlers
  const handlePrevYear = () => setYear((prev) => prev - 1);
  const handleNextYear = () => setYear((prev) => prev + 1);

  // Central Handler for Date Selection
  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    if (onDateSelect) {
      onDateSelect(date);
    }
  };

  return (
    <div className="w-full bg-white dark:bg-[#1A0F1E] p-6 md:p-10 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm transition-colors duration-300">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-primary dark:text-white tracking-tight">
            Attendance Overview
          </h2>

          {/* Year Controls */}
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

        {/* Legend */}
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

      {/* Grid of Months */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-8 gap-y-12">
        {MONTHS.map((monthName, index) => (
          <MonthGrid
            key={`${monthName}-${year}`}
            monthName={monthName}
            monthIndex={index}
            year={year}
            selectedDate={selectedDate}
            onSelectDate={handleDateClick}
          />
        ))}
      </div>
    </div>
  );
}

// --- Sub-component: Single Month Block ---

interface MonthGridProps {
  monthName: string;
  monthIndex: number;
  year: number;
  selectedDate: Date | null;
  onSelectDate: (d: Date) => void;
}

function MonthGrid({
  monthName,
  monthIndex,
  year,
  selectedDate,
  onSelectDate,
}: MonthGridProps) {
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const firstDayOfMonth = (new Date(year, monthIndex, 1).getDay() + 6) % 7;

  const calendarDays = [];
  for (let i = 0; i < firstDayOfMonth; i++) calendarDays.push(null);
  for (let i = 1; i <= daysInMonth; i++) calendarDays.push(i);

  return (
    <div className="flex flex-col">
      <h3 className="text-lg font-bold text-primary dark:text-white mb-4 pl-1">
        {monthName}
      </h3>

      <div className="grid grid-cols-7 mb-2 text-center">
        {DAYS_OF_WEEK.map((day, i) => (
          <div
            key={i}
            className="text-[10px] font-bold text-secondary dark:text-gray-600 uppercase"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-y-2 gap-x-1">
        {calendarDays.map((day, i) => {
          if (!day) return <div key={`empty-${i}`} />;

          const currentDayDate = new Date(year, monthIndex, day);
          const dateStr = `${year}-${String(monthIndex + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

          // Check for Sunday
          const isSunday = currentDayDate.getDay() === 0;

          // Check for API Holiday
          const isApiHoliday = API_HOLIDAYS[dateStr] === "holiday";

          // Final Holiday Status
          const isHoliday = isSunday || isApiHoliday;

          const isSelected =
            selectedDate &&
            selectedDate.getDate() === day &&
            selectedDate.getMonth() === monthIndex &&
            selectedDate.getFullYear() === year;

          // Styling Logic
          let bgClass =
            "hover:bg-gray-100 dark:hover:bg-white/10 text-primary dark:text-gray-300 cursor-pointer";

          if (isHoliday) {
            // Added cursor-not-allowed for better UX
            bgClass =
              "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400 font-bold cursor-not-allowed opacity-80";
          } else if (isSelected) {
            bgClass =
              "bg-primary dark:bg-white text-white dark:text-[#1A0F1E] shadow-md scale-110 font-bold z-10 cursor-pointer";
          }

          return (
            <button
              key={day}
              // --- CHANGED: Block click if it is a holiday ---
              onClick={() => {
                if (!isHoliday) {
                  onSelectDate(currentDayDate);
                }
              }}
              className={`
                h-8 w-8 text-xs rounded-full flex items-center justify-center transition-all duration-200
                ${bgClass}
              `}
              // Optional: Disable button attribute for accessibility
              disabled={isHoliday}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}

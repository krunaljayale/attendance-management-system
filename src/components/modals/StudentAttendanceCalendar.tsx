'use client';

import React, { useMemo } from 'react';

const DAYS_OF_WEEK = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export type AttendanceStatus = 'present' | 'absent' | 'leave' | 'holiday';

interface StudentAttendanceCalendarProps {
  data: Record<string, AttendanceStatus>; // Format: "YYYY-MM-DD": "status"
  year: number;
}

export default function StudentAttendanceCalendar({ data, year }: StudentAttendanceCalendarProps) {
  
  // 1. Calculate Stats Dynamically (Including Sundays as Holidays)
  const stats = useMemo(() => {
    const counts = { present: 0, absent: 0, leave: 0, holiday: 0 };
    
    // Iterate through every day of the year
    for (let month = 0; month < 12; month++) {
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      
      for (let day = 1; day <= daysInMonth; day++) {
        const dateObj = new Date(year, month, day);
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        
        // Sunday Check (0 = Sunday in JS)
        const isSunday = dateObj.getDay() === 0;

        // Logic: Data takes precedence, but if no data, check for Sunday
        let status = data[dateStr];

        if (status) {
          // If specific data exists, use it (e.g., student marked absent on a Sunday?)
          // Usually Sunday overrides, but let's assume data is source of truth.
          // If you strictly want Sunday to ALWAYS be holiday, uncomment below:
           if (isSunday) status = 'holiday'; 
          counts[status]++;
        } else {
          // No data: Sunday is Holiday, otherwise Present
          if (isSunday) {
            counts['holiday']++;
          } else {
            counts['present']++;
          }
        }
      }
    }
    return counts;
  }, [data, year]);

  return (
    <div className="w-full animate-in fade-in duration-500">
      
      {/* Summary Header */}
      <div className="flex flex-wrap gap-4 mb-8 bg-gray-50 dark:bg-white/5 p-4 rounded-2xl border border-gray-100 dark:border-white/5">
        <div className="flex items-center gap-2">
           <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
           <span className="text-xs font-bold text-secondary dark:text-gray-400">Present: <span className="text-primary dark:text-white">{stats.present}</span></span>
        </div>
        <div className="flex items-center gap-2">
           <div className="w-3 h-3 rounded-full bg-red-500"></div>
           <span className="text-xs font-bold text-secondary dark:text-gray-400">Absent: <span className="text-primary dark:text-white">{stats.absent}</span></span>
        </div>
        <div className="flex items-center gap-2">
           <div className="w-3 h-3 rounded-full bg-blue-500"></div>
           <span className="text-xs font-bold text-secondary dark:text-gray-400">Leave: <span className="text-primary dark:text-white">{stats.leave}</span></span>
        </div>
        <div className="flex items-center gap-2">
           <div className="w-3 h-3 rounded-full bg-amber-500"></div>
           <span className="text-xs font-bold text-secondary dark:text-gray-400">Holiday: <span className="text-primary dark:text-white">{stats.holiday}</span></span>
        </div>
      </div>

      {/* Grid of Months */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MONTHS.map((monthName, index) => (
          <MonthGrid 
            key={monthName} 
            monthName={monthName}
            monthIndex={index} 
            year={year} 
            data={data}
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
  data: Record<string, AttendanceStatus>;
}

function MonthGrid({ monthName, monthIndex, year, data }: MonthGridProps) {
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const firstDayOfMonth = (new Date(year, monthIndex, 1).getDay() + 6) % 7; // Adjust so Monday is index 0

  const calendarDays = [];
  for (let i = 0; i < firstDayOfMonth; i++) calendarDays.push(null);
  for (let i = 1; i <= daysInMonth; i++) calendarDays.push(i);

  return (
    <div className="flex flex-col bg-gray-50 dark:bg-black/20 p-4 rounded-xl border border-gray-100 dark:border-white/5">
      <h3 className="text-sm font-bold text-primary dark:text-white mb-3">
        {monthName}
      </h3>

      <div className="grid grid-cols-7 mb-2 text-center">
        {DAYS_OF_WEEK.map((day, i) => (
          <div key={i} className="text-[9px] font-bold text-secondary dark:text-gray-600 uppercase">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-y-2 gap-x-1">
        {calendarDays.map((day, i) => {
          if (!day) return <div key={`empty-${i}`} />;

          const dateObj = new Date(year, monthIndex, day);
          const dateStr = `${year}-${String(monthIndex + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
          
          // 2. Check for Sunday (0 in JS Date)
          const isSunday = dateObj.getDay() === 0;

          // Determine Status
          let status = data[dateStr];

          if (!status) {
            // Default Logic
            status = isSunday ? 'holiday' : 'present';
          } else {
             // If data exists but it is a Sunday, force holiday override
             if(isSunday) status = 'holiday';
          }
          
          let bgClass = "bg-gray-200 dark:bg-white/10 text-gray-400"; 

          // Color Logic
          if (status === 'present') bgClass = "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400";
          if (status === 'absent') bgClass = "bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-400 font-bold shadow-sm";
          if (status === 'leave') bgClass = "bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400 font-bold shadow-sm";
          if (status === 'holiday') bgClass = "bg-amber-100 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400";

          return (
            <div
              key={day}
              className={`
                h-6 w-6 text-[10px] rounded-full flex items-center justify-center
                ${bgClass}
              `}
            >
              {day}
            </div>
          );
        })}
      </div>
    </div>
  );
}
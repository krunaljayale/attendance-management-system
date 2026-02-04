'use client';

import React, { useState } from 'react';

const CHART_DATA = [
  { year: '2018', value: 220 },
  { year: '2019', value: 280 },
  { year: '2020', value: 410 },
  { year: '2021', value: 340 },
  { year: '2022', value: 260 },
  { year: '2023', value: 380 },
  { year: '2024', value: 570 }, 
  { year: '2025', value: 430 },
  { year: '2026', value: 320 },
  { year: '2027', value: 410 },
];

const MAX_VALUE = 600;

export default function TotalStat() {
  const [activeYear, setActiveYear] = useState('2024');

  return (
    // 1. Container: Dark background & Border
    <div className="w-full bg-white dark:bg-[#1A0F1E] p-4 md:p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col transition-colors duration-300">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        {/* 2. Title Text */}
        <h3 className="text-lg md:text-xl font-bold text-primary dark:text-white">Total Attendance Report</h3>
        
        <button className="p-2 rounded-full hover:bg-gray-50 dark:hover:bg-white/10 text-secondary dark:text-gray-400 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle cx="5" cy="12" r="1" />
          </svg>
        </button>
      </div>

      {/* Chart Area */}
      <div className="flex gap-2 md:gap-4 h-72 w-full"> 
        
        {/* Y-Axis Labels (Fixed) */}
        {/* 3. Axis Text Color */}
        <div className="flex flex-col justify-between text-xs font-medium text-secondary dark:text-gray-500 py-6 pt-12 shrink-0">
          <span>600</span>
          <span>400</span>
          <span>200</span>
          <span>0</span>
        </div>

        {/* Scrollable Container */}
        <div className="flex-1 overflow-x-auto pb-2 pt-10 no-scrollbar">
          <div className="flex items-end justify-between gap-3 h-full min-w-[500px] md:min-w-0 pl-2">
            {CHART_DATA.map((item) => {
              const isActive = activeYear === item.year;
              const heightPercentage = (item.value / MAX_VALUE) * 100;

              return (
                <div 
                  key={item.year} 
                  className="flex flex-col items-center gap-2 w-full group relative cursor-pointer"
                  onMouseEnter={() => setActiveYear(item.year)}
                  onClick={() => setActiveYear(item.year)}
                >
                  
                  {/* Tooltip */}
                  <div 
                    className={`absolute -top-10 left-1/2 -translate-x-1/2 transition-all duration-300 z-20 ${
                      isActive 
                        ? 'opacity-100 -translate-y-1 scale-100' 
                        : 'opacity-0 translate-y-2 scale-90 pointer-events-none'
                    }`}
                  >
                    {/* 4. Tooltip Colors:
                        - Light Mode: Dark BG (primary) + White Text
                        - Dark Mode: White BG + Dark Text (Inverted for contrast)
                     */}
                    <div className="bg-primary dark:bg-white text-white dark:text-[#1A0F1E] text-[10px] font-bold py-1.5 px-3 rounded-full shadow-xl whitespace-nowrap relative">
                      {item.value}
                      {/* Arrow */}
                      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-primary dark:bg-white rotate-45"></div>
                    </div>
                  </div>

                  {/* Bar Track */}
                  <div className="relative w-full max-w-[40px] h-48 flex items-end rounded-t-xl bg-transparent">
                    {/* The Bar */}
                    <div 
                      className={`w-full rounded-t-md md:rounded-t-xl transition-all duration-300 ease-out ${
                        isActive 
                          ? 'bg-gradient-to-t from-magenta to-purple-600 shadow-lg shadow-magenta/40 dark:shadow-magenta/60 scale-[1.05]' // Added extra shadow for dark mode
                          : 'bg-lavender/40 hover:bg-lavender/60 dark:bg-white/5 dark:hover:bg-white/10' // 5. Inactive Bar Color adjusted for Dark Mode
                      }`}
                      style={{ height: `${heightPercentage}%` }}
                    ></div>
                  </div>

                  {/* X-Axis Label */}
                  <span className={`text-[10px] md:text-xs font-medium transition-colors ${
                    isActive ? 'text-primary dark:text-white font-bold' : 'text-secondary dark:text-gray-500'
                  }`}>
                    {item.year}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
'use client';

import React, { useState } from 'react';

// Data Configuration
const DATA = [
  { label: 'Male', count: 72, color: '#A855F7', percentage: 72 },   // Purple
  { label: 'Female', count: 28, color: '#F002C5', percentage: 28 }, // Magenta
];

const TOTAL_STUDENTS = 100;

export default function StudentGenderChart() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // SVG Config
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  let currentOffset = 0;

  // Determine active data
  const activeItem = hoveredIndex !== null ? DATA[hoveredIndex] : null;

  return (
    // 1. Updated Background & Border for Dark Mode
    <div className="w-full bg-white dark:bg-[#1A0F1E] p-5 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col items-center h-full relative overflow-hidden transition-colors duration-300">
      
      {/* Header */}
      <div className="w-full flex justify-between items-center mb-6 z-10">
        {/* 2. Text Color for Dark Mode */}
        <h3 className="text-lg font-bold text-primary dark:text-white">Students by Gender</h3>
        <button className="p-2 rounded-full hover:bg-gray-50 dark:hover:bg-white/10 text-secondary dark:text-gray-400 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle cx="5" cy="12" r="1" />
          </svg>
        </button>
      </div>

      {/* Content Container (Responsive Row/Col) */}
      <div className="flex flex-col md:flex-row items-center justify-between w-full h-full gap-8 z-10">
        
        {/* LEFT SIDE: Interactive Legend */}
        <div className="w-full md:w-1/2 flex flex-col gap-3 order-2 md:order-1">
          {DATA.map((item, index) => {
            const isHovered = hoveredIndex === index;
            const isDimmed = hoveredIndex !== null && !isHovered;

            return (
              <div 
                key={item.label} 
                className={`
                  group flex items-center justify-between p-3 rounded-2xl cursor-pointer border transition-all duration-300
                  ${isHovered 
                    ? 'bg-gray-50 dark:bg-white/5 border-gray-100 dark:border-white/10 scale-105 shadow-sm' // 3. Hover State for Dark Mode
                    : 'bg-transparent border-transparent'}
                  ${isDimmed ? 'opacity-40 blur-[0.5px]' : 'opacity-100'}
                `}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                // Mobile: Tap to toggle
                onClick={() => setHoveredIndex(isHovered ? null : index)}
              >
                {/* Label + Dot */}
                <div className="flex items-center gap-3">
                  <span 
                    className="w-3 h-3 rounded-full transition-all duration-300 shadow-sm" 
                    style={{ 
                      backgroundColor: item.color,
                      boxShadow: isHovered ? `0 0 10px ${item.color}` : 'none' 
                    }}
                  ></span>
                  {/* 4. Label Colors */}
                  <span className={`text-sm font-medium transition-colors ${isHovered ? 'text-primary dark:text-white font-bold' : 'text-secondary dark:text-gray-400'}`}>
                    {item.label}
                  </span>
                </div>

                {/* Number */}
                <span className={`text-lg font-bold transition-colors ${isHovered ? 'text-primary dark:text-white' : 'text-gray-400 dark:text-gray-600'}`}>
                  {item.count}
                </span>
              </div>
            );
          })}
        </div>

        {/* RIGHT SIDE: The Glowing Chart */}
        <div className="w-full md:w-1/2 flex justify-center items-center relative order-1 md:order-2">
          
          {/* Dynamic Center Text */}
          <div className="absolute flex flex-col items-center justify-center text-center pointer-events-none">
            <span 
              className={`font-bold text-primary dark:text-white transition-all duration-300 ${activeItem ? 'text-4xl scale-110' : 'text-3xl'}`}
            >
              {activeItem ? activeItem.count : TOTAL_STUDENTS}
            </span>
            <span className="text-[10px] md:text-xs text-secondary dark:text-gray-400 font-bold uppercase tracking-wider mt-1">
              {activeItem ? activeItem.label : 'Total Students'}
            </span>
          </div>

          {/* SVG Chart */}
          <svg className="w-48 h-48 md:w-52 md:h-52 transform -rotate-90 overflow-visible" viewBox="0 0 200 200">
            
            {/* 1. Track (Background) - Updated stroke color for dark mode */}
            <circle cx="100" cy="100" r={radius} fill="none" stroke="currentColor" className="text-gray-100 dark:text-gray-800" strokeWidth="14" />

            {/* 2. Segments */}
            {DATA.map((item, index) => {
              const strokeDashoffset = circumference - (item.percentage / 100) * circumference;
              const rotation = currentOffset; 
              currentOffset += (item.percentage / 100) * 360; 
              
              const isHovered = hoveredIndex === index;
              const isDimmed = hoveredIndex !== null && !isHovered;

              return (
                <circle
                  key={index}
                  cx="100"
                  cy="100"
                  r={radius}
                  fill="none"
                  stroke={item.color}
                  strokeWidth={isHovered ? 22 : 14} // Thicker on hover
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  className={`transition-all duration-500 ease-out cursor-pointer ${isDimmed ? 'opacity-20' : 'opacity-100'}`}
                  style={{ 
                    transformBox: 'fill-box',
                    transformOrigin: 'center',
                    transform: `rotate(${rotation}deg) scale(${isHovered ? 1.05 : 1})`, // Gentle pop effect
                    filter: isHovered ? `drop-shadow(0 0 6px ${item.color}80)` : 'none' // The Glow!
                  }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onClick={() => setHoveredIndex(isHovered ? null : index)}
                />
              );
            })}
          </svg>
        </div>

      </div>
    </div>
  );
}
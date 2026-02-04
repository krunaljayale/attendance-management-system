'use client';

import React from 'react';
import Image from 'next/image';

const ATTENDANTS = [
  { id: 1, name: 'Jacob Zachary', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=60', percentage: 100, days: 30 },
  { id: 2, name: 'Hannah Sarah', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=60', percentage: 100, days: 30 },
  { id: 3, name: 'Megan Alyssa', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop&q=60', percentage: 100, days: 30 },
  { id: 4, name: 'Lauren Rachel', avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&auto=format&fit=crop&q=60', percentage: 100, days: 30 },
  { id: 5, name: 'Abby Victoria', avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&auto=format&fit=crop&q=60', percentage: 100, days: 30 },
];

export default function TopAttendants() {
  return (
    // 1. Updated Background & Border
    <div className=" bg-white dark:bg-[#1A0F1E] p-5 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col h-full transition-colors duration-300">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        {/* 2. Header Text */}
        <h3 className="text-lg font-bold text-primary dark:text-white">Top 5 Attendant</h3>
        <button className="p-2 rounded-full hover:bg-gray-50 dark:hover:bg-white/10 text-secondary dark:text-gray-400 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle cx="5" cy="12" r="1" />
          </svg>
        </button>
      </div>

      {/* List */}
      <div className="flex flex-col gap-3 flex-1 justify-center">
        {ATTENDANTS.map((student) => (
          // 3. Row Hover Effect (Subtle white transparency in dark mode)
          <div key={student.id} className="flex items-center justify-between group cursor-pointer hover:bg-gray-50 dark:hover:bg-white/5 p-2 rounded-xl transition-colors -mx-2">
            
            {/* Left Side */}
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full overflow-hidden border border-gray-100 dark:border-gray-700 shadow-sm">
                <Image src={student.avatar} alt={student.name} fill className="object-cover" />
              </div>
              <div className="flex flex-col">
                {/* 4. Name Color */}
                <span className="text-sm font-bold text-primary dark:text-white group-hover:text-magenta transition-colors">
                  {student.name}
                </span>
                
                {/* Mobile Badge - Dark Mode optimized (Green transparent background) */}
                <span className="md:hidden bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400 text-[10px] font-bold px-1.5 py-0.5 rounded-full w-fit mt-0.5">
                  {student.percentage}%
                </span>
              </div>
              
              {/* Desktop Badge - Dark Mode optimized */}
              <span className="hidden md:block bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400 text-[10px] font-bold px-2 py-0.5 rounded-full">
                {student.percentage}%
              </span>
            </div>

            {/* Right Side */}
            <div className="flex items-end gap-1">
              <span className="text-base font-bold text-primary dark:text-white">{student.days}</span>
              <span className="text-xs text-secondary dark:text-gray-400 font-medium mb-0.5">Days</span>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
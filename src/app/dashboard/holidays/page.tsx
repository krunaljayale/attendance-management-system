"use client";

import HolidayManager from "@/components/profile/Holidaymanager";

export default function HolidaysPage() {
  return (
    <div className="min-h-screen w-full bg-[#F7F5F7] dark:bg-[#0F0B13] p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-primary dark:text-white mb-8">
          Holiday Settings
        </h1>
        <HolidayManager />
      </div>
    </div>
  );
}

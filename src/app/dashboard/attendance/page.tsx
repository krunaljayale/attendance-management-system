'use client';

import React, { useState } from 'react';
import FullYearCalendar from "@/components/modals/Calendar"; 
import MarkAttendanceModal from "@/components/modals/MarkAttendanceModal";

function AttendancePage() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // --- AUTHENTICATION MOCK ---
  // In your real app, this comes from your session/database.
  // Change 'role' to 'principal' here to test the Admin view in code.
  const currentUser = {
    name: "Krunal Jayale",
    role: "teacher" as "teacher" | "principal", 
  };
  // ---------------------------

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setIsModalOpen(true);
  };

  return (
    <div className='w-full min-h-screen p-6 md:p-10 flex flex-col items-center animate-in fade-in zoom-in duration-500'>
      
      {/* Header Info (Optional - just to show who is logged in) */}
      <div className="w-full max-w-6xl mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-primary dark:text-white">Attendance Management</h1>
          <p className="text-sm text-secondary dark:text-gray-400">
            Welcome, {currentUser.name} ({currentUser.role === 'principal' ? 'Admin Access' : 'Teacher Access'})
          </p>
        </div>
      </div>

      <div className="w-full max-w-6xl">
        {/* Pass handler to Calendar */}
        <FullYearCalendar onDateSelect={handleDateSelect} />
      </div>

      {/* The Modal automatically knows what to do based on the userRole passed */}
      <MarkAttendanceModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedDate={selectedDate}
        userRole={currentUser.role} 
      />
    </div>
  );
}

export default AttendancePage;
'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { STUDENTS } from '@/utils/dummyData';

interface MarkAttendanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: Date | null;
  userRole: 'TEACHER' | 'SUPER_ADMIN';
}

type AttendanceState = Record<number, 'present' | 'absent' | 'leave'>;

export default function MarkAttendanceModal({ 
  isOpen, 
  onClose, 
  selectedDate, 
  userRole 
}: MarkAttendanceModalProps) {
  const [attendance, setAttendance] = useState<AttendanceState>({});
  const [isSaving, setIsSaving] = useState(false);

  // --- PERMISSION LOGIC FIXED ---
  
  // 1. Get "Today" at midnight (00:00:00) to compare dates purely
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // 2. Get "Selected Date" at midnight
  const targetDate = new Date(selectedDate || new Date());
  targetDate.setHours(0, 0, 0, 0);

  // 3. Comparisons
  const isToday = targetDate.getTime() === today.getTime();
  const isFuture = targetDate.getTime() > today.getTime();
  
  // 4. Permission Rule:
  // Principal: Can always edit.
  // Teacher: Can ONLY edit if it is Today.
  const canEdit = userRole === 'SUPER_ADMIN' || (userRole === 'TEACHER' && isToday);

  // Initialize Data
  useEffect(() => {
    if (isOpen) {
      const initialState: AttendanceState = {};
      STUDENTS.forEach(student => {
        initialState[student.id] = 'present';
      });
      setAttendance(initialState);
    }
  }, [isOpen, selectedDate]);

  const handleStatusChange = (id: number, status: 'present' | 'absent' | 'leave') => {
    if (!canEdit) return; 
    setAttendance(prev => ({ ...prev, [id]: status }));
  };

  const handleSave = () => {
    if (!canEdit) return;
    setIsSaving(true);
    // Simulate API logic
    setTimeout(() => {
      setIsSaving(false);
      onClose();
    }, 1000);
  };

  if (!isOpen) return null;

  const formattedDate = selectedDate?.toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div 
        className="absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      ></div>

      <div className="relative w-full max-w-2xl h-full bg-white dark:bg-[#1A0F1E] shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out animate-slide-in">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-100 dark:border-white/5 flex justify-between items-center bg-white dark:bg-[#1A0F1E] z-10">
          <div>
            <h2 className="text-xl font-bold text-primary dark:text-white">
              {canEdit ? "Mark Attendance" : "View Attendance Details"}
            </h2>
            <div className="flex items-center gap-2 mt-1">
               <p className="text-sm text-secondary dark:text-gray-400 font-medium">
                {formattedDate}
              </p>
              {!canEdit && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
                  Read Only Mode
                </span>
              )}
            </div>
          </div>
          
          <div className="flex gap-2">
            {canEdit && (
              <button 
                onClick={() => {
                  const newState: AttendanceState = {};
                  STUDENTS.forEach(s => newState[s.id] = 'present');
                  setAttendance(newState);
                }}
                className="text-xs font-bold text-primary dark:text-white px-3 py-2 rounded-lg bg-gray-50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
              >
                Mark All Present
              </button>
            )}
            <button 
              onClick={onClose}
              className="p-2 rounded-full hover:bg-red-50 text-secondary dark:text-gray-400 hover:text-red-500 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>
        </div>

        {/* --- DYNAMIC BANNER LOGIC --- */}
        {!canEdit && userRole === 'TEACHER' && (
          <div className="bg-blue-50 dark:bg-blue-900/20 px-6 py-3 text-xs text-blue-600 dark:text-blue-300 font-medium border-b border-blue-100 dark:border-blue-800 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
            
            {/* Logic: If Future -> Cannot mark yet. If Past -> Past records. */}
            {isFuture 
              ? "You cannot mark attendance for future dates. Please wait for the date to arrive." 
              : "You are viewing past records. Only the Principal can edit this data."
            }
          </div>
        )}

        {/* Student List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {STUDENTS.map((student) => {
            const status = attendance[student.id];

            return (
              <div 
                key={student.id} 
                className={`flex flex-col sm:flex-row items-center justify-between p-4 rounded-2xl border transition-all duration-200 ${
                  status === 'absent' 
                    ? 'bg-red-50/50 border-red-100 dark:bg-red-900/10 dark:border-red-900/30' 
                    : status === 'leave'
                    ? 'bg-blue-50/50 border-blue-100 dark:bg-blue-900/10 dark:border-blue-900/30'
                    : 'bg-white dark:bg-white/5 border-gray-100 dark:border-white/5'
                }`}
              >
                <div className="flex items-center gap-4 w-full sm:w-auto mb-4 sm:mb-0">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white dark:border-white/10 shadow-sm">
                    <Image src={student.image} alt={student.name} fill className="object-cover" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-primary dark:text-white">{student.name}</h3>
                    <p className="text-xs text-secondary dark:text-gray-400">Roll ID: {student.rollId}</p>
                  </div>
                </div>

                <div className={`flex p-1 rounded-xl w-full sm:w-auto ${canEdit ? 'bg-gray-100 dark:bg-black/40' : 'bg-transparent opacity-80'}`}>
                  <AttendanceButton 
                    label="P" fullLabel="Present"
                    active={status === 'present'} 
                    disabled={!canEdit}
                    colorClass="bg-white dark:bg-[#1A0F1E] text-emerald-600 shadow-sm"
                    onClick={() => handleStatusChange(student.id, 'present')} 
                  />
                  <AttendanceButton 
                    label="A" fullLabel="Absent"
                    active={status === 'absent'} 
                    disabled={!canEdit}
                    colorClass="bg-white dark:bg-[#1A0F1E] text-red-500 shadow-sm"
                    onClick={() => handleStatusChange(student.id, 'absent')} 
                  />
                  <AttendanceButton 
                    label="L" fullLabel="Leave"
                    active={status === 'leave'} 
                    disabled={!canEdit}
                    colorClass="bg-white dark:bg-[#1A0F1E] text-blue-500 shadow-sm"
                    onClick={() => handleStatusChange(student.id, 'leave')} 
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer (Save Button) */}
        {canEdit && (
          <div className="p-6 border-t border-gray-100 dark:border-white/5 bg-white dark:bg-[#1A0F1E] z-10">
            <button 
              onClick={handleSave}
              disabled={isSaving}
              className="w-full py-3.5 rounded-xl bg-primary dark:bg-white text-white dark:text-primary font-bold text-sm hover:shadow-lg hover:shadow-primary/20 transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2"
            >
              {isSaving ? "Saving..." : "Save Attendance"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function AttendanceButton({ label, fullLabel, active, colorClass, onClick, disabled }: any) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        flex-1 sm:flex-none px-4 py-1.5 rounded-lg text-xs font-bold transition-all duration-200
        ${active ? colorClass : 'text-secondary dark:text-gray-500'}
        ${!disabled && !active ? 'hover:bg-gray-200 dark:hover:bg-white/10' : ''}
        ${disabled ? 'cursor-default' : 'cursor-pointer'}
      `}
    >
      <span className="sm:hidden">{label}</span>
      <span className="hidden sm:inline">{fullLabel}</span>
    </button>
  );
}
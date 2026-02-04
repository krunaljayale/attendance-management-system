"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { STUDENTS } from "@/utils/dummyData";
import StudentAttendanceCalendar, { AttendanceStatus } from "@/components/modals/StudentAttendanceCalendar";
import EditStudentForm from "@/components/forms/EditStudentForm"; // Import the new form

// Define the interface
export interface StudentFullDetails {
  id: number;
  name: string;
  email: string;
  role: string;
  rollId: number;
  attendance: string;
  grade: string;
  marks: number;
  status: string;
  courseStartDate: string;
  courseEndDate: string;
  certificateId: string | null;
  image: string;
  registrarId: string;
}

interface StudentDetailsModalProps {
  studentId: number | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function StudentDetailsModal({
  studentId,
  isOpen,
  onClose,
}: StudentDetailsModalProps) {
  const [loading, setLoading] = useState(false);
  const [student, setStudent] = useState<StudentFullDetails | null>(null);
  const [error, setError] = useState(false);
  
  // State for Tabs, Data, and Edit Mode
  const [activeTab, setActiveTab] = useState<'profile' | 'attendance'>('profile');
  const [isEditing, setIsEditing] = useState(false); // <--- New State
  const [attendanceData, setAttendanceData] = useState<Record<string, AttendanceStatus>>({});

  useEffect(() => {
    if (isOpen) {
      // Reset states
      setStudent(null);
      setError(false);
      setActiveTab('profile'); 
      setIsEditing(false); // Ensure we start in view mode
      
      if (studentId) {
        setLoading(true);
        setTimeout(() => {
          const foundStudent = STUDENTS.find((s) => s.id === studentId);
          if (foundStudent) {
            setStudent(foundStudent as StudentFullDetails);
            setAttendanceData(generateMockData(2026)); 
          } else {
            setError(true);
          }
          setLoading(false);
        }, 500);
      }
    }
  }, [studentId, isOpen]);

  // Handle Updates
  const handleUpdateStudent = (updatedData: StudentFullDetails) => {
    setStudent(updatedData);
    setIsEditing(false);
    // In a real app, you would also update the global STUDENTS list or re-fetch here
    console.log("Updated Student:", updatedData);
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed": return "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400";
      case "Active": return "bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400";
      case "Probation": return "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400";
      default: return "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Drawer */}
      <div className="relative w-full max-w-4xl h-full bg-white dark:bg-primary shadow-2xl overflow-y-auto transform transition-transform duration-300 ease-in-out animate-slide-in">
        
        <div className="absolute top-6 right-6 z-10">
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-gray-100 dark:bg-white/10 hover:bg-red-50 text-secondary dark:text-white hover:text-red-500 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>

        {loading && (
          <div className="flex flex-col items-center justify-center h-full space-y-4">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent dark:border-white dark:border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm font-medium text-secondary dark:text-gray-400">Loading student profile...</p>
          </div>
        )}

        {!loading && (error || !student) && (
          <div className="flex flex-col items-center justify-center h-full text-center p-8">
            <h3 className="text-xl font-bold text-primary dark:text-white mb-2">Student Not Found</h3>
            <p className="text-secondary dark:text-gray-400">The requested data could not be retrieved.</p>
          </div>
        )}

        {!loading && student && !error && (
          <div className="p-8 pt-16 md:pt-8">
            
            {/* Header / Basic Info - Always Visible */}
            <div className="flex flex-col md:flex-row gap-6 mb-8 border-b border-gray-100 dark:border-white/5 pb-8">
              <div className="relative w-24 h-24 md:w-32 md:h-32 shrink-0 rounded-2xl overflow-hidden border-4 border-white dark:border-white/5 shadow-md bg-gray-100">
                <Image src={student.image} alt={student.name} fill className="object-cover" />
              </div>

              <div className="flex-1 space-y-2">
                <div>
                  <h3 className="text-3xl font-bold text-primary dark:text-white">{student.name}</h3>
                  <p className="text-secondary dark:text-gray-400 font-medium">{student.role}</p>
                </div>
                
                <div className="flex flex-wrap gap-4 text-sm text-secondary dark:text-gray-400">
                  <span className="flex items-center gap-1.5">{student.email}</span>
                </div>

                 <div className="flex gap-2 mt-2">
                  <span className={`px-3 py-1 text-[10px] font-bold rounded-full uppercase tracking-wider ${getStatusColor(student.status)}`}>
                    {student.status}
                  </span>
                </div>
              </div>
            </div>

            {/* If Editing, Show Form. Else Show Tabs & Content */}
            {isEditing ? (
              <EditStudentForm 
                student={student} 
                onCancel={() => setIsEditing(false)} 
                onSave={handleUpdateStudent} 
              />
            ) : (
              <>
                {/* TAB NAVIGATION */}
                <div className="flex gap-6 mb-8 border-b border-gray-100 dark:border-white/5">
                    <button 
                        onClick={() => setActiveTab('profile')}
                        className={`pb-3 text-sm font-bold transition-all ${activeTab === 'profile' ? 'text-primary dark:text-white border-b-2 border-primary dark:border-white' : 'text-secondary dark:text-gray-500 hover:text-primary dark:hover:text-gray-300'}`}
                    >
                        Overview
                    </button>
                    <button 
                        onClick={() => setActiveTab('attendance')}
                        className={`pb-3 text-sm font-bold transition-all ${activeTab === 'attendance' ? 'text-primary dark:text-white border-b-2 border-primary dark:border-white' : 'text-secondary dark:text-gray-500 hover:text-primary dark:hover:text-gray-300'}`}
                    >
                        Attendance Record
                    </button>
                </div>

                {/* TAB CONTENT */}
                {activeTab === 'profile' ? (
                    // --- PROFILE VIEW ---
                    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <div className="flex gap-3 mb-8">
                            <button className="flex-1 px-6 py-2.5 bg-primary dark:bg-white dark:text-primary text-white text-sm font-bold rounded-xl transition-all shadow-lg shadow-primary/20 active:scale-95">
                                Generate Report
                            </button>
                            <button 
                                onClick={() => setIsEditing(true)} // <--- Enable Edit Mode
                                className="px-6 py-2.5 border border-gray-200 dark:border-gray-700 text-secondary dark:text-white hover:bg-gray-50 dark:hover:bg-white/5 text-sm font-bold rounded-xl transition-all active:scale-95"
                            >
                                Edit Profile
                            </button>
                        </div>

                        <div className="mb-8">
                            <h4 className="text-lg font-bold text-primary dark:text-white mb-4">Academic Performance</h4>
                            <div className="bg-gray-50 dark:bg-black/20 p-5 rounded-2xl border border-gray-100 dark:border-white/5 grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="bg-white dark:bg-primary border border-gray-200 dark:border-gray-700 p-4 rounded-xl flex flex-col items-center justify-center text-center">
                                    <span className="text-3xl font-black text-primary dark:text-white mb-1">{student.grade}</span>
                                    <span className="text-xs font-bold text-secondary dark:text-gray-500 uppercase tracking-wide">Overall Grade</span>
                                </div>
                                <div className="bg-white dark:bg-primary border border-gray-200 dark:border-gray-700 p-4 rounded-xl flex flex-col items-center justify-center text-center">
                                    <span className="text-3xl font-black text-primary dark:text-white mb-1">{student.marks}</span>
                                    <span className="text-xs font-bold text-secondary dark:text-gray-500 uppercase tracking-wide">Total Score</span>
                                </div>
                                <div className="bg-white dark:bg-primary border border-gray-200 dark:border-gray-700 p-4 rounded-xl flex flex-col items-center justify-center text-center">
                                    <span className="text-3xl font-black text-primary dark:text-white mb-1">{student.rollId}</span>
                                    <span className="text-xs font-bold text-secondary dark:text-gray-500 uppercase tracking-wide">Roll Number</span>
                                </div>
                            </div>
                        </div>

                        <div className="mb-8">
                            <h4 className="text-lg font-bold text-primary dark:text-white mb-4">Course Details</h4>
                            <div className="bg-gray-50 dark:bg-black/20 p-5 rounded-2xl border border-gray-100 dark:border-white/5 space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <ReadOnlyField label="Course Start Date" value={student.courseStartDate} />
                                    <ReadOnlyField label="Course End Date" value={student.courseEndDate} />
                                </div>
                                <ReadOnlyField label="Registered By (Registrar ID)" value={student.registrarId} />
                            </div>
                        </div>
                    </div>
                ) : (
                    // --- ATTENDANCE VIEW ---
                    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <h4 className="text-lg font-bold text-primary dark:text-white mb-4 flex items-center gap-2">
                            Yearly Attendance 
                            <span className="text-sm font-medium text-secondary dark:text-gray-500 bg-gray-100 dark:bg-white/10 px-2 py-0.5 rounded-lg">2026</span>
                        </h4>
                        <StudentAttendanceCalendar data={attendanceData} year={2026} />
                    </div>
                )}
              </>
            )}

          </div>
        )}
      </div>
    </div>
  );
}

function ReadOnlyField({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label className="text-xs font-bold text-secondary dark:text-gray-500 uppercase tracking-wide ml-1">
        {label}
      </label>
      <div className="w-full bg-white dark:bg-primary border border-gray-200 dark:border-gray-700 text-primary dark:text-gray-300 px-4 py-3 rounded-xl text-sm font-medium">
        {value}
      </div>
    </div>
  );
}

function generateMockData(year: number): Record<string, AttendanceStatus> {
    const data: Record<string, AttendanceStatus> = {};
    const statuses: AttendanceStatus[] = ['absent', 'leave', 'holiday', 'present', 'present', 'present', 'present']; 
    
    for (let month = 0; month < 12; month++) {
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        for (let day = 1; day <= daysInMonth; day++) {
            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
            
            if(Math.random() > 0.85) {
                data[dateStr] = randomStatus;
            } else {
                data[dateStr] = 'present';
            }
            if (month === 0 && day === 1) data[dateStr] = 'holiday';
            if (month === 11 && day === 25) data[dateStr] = 'holiday';
        }
    }
    return data;
}
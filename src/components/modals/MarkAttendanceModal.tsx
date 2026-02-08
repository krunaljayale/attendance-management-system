"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  MarkAttendanceModalProps,
  StudentFullDetails,
} from "@/constants/Types";
import { AttendanceButton } from "../elements/AttendanceButton";
import axios from "axios";
import { API } from "@/constants/API/api";

type AttendanceState = Record<string, "present" | "absent" | "leave">;

export default function MarkAttendanceModal({
  isOpen,
  onClose,
  selectedDate,
  userRole,
}: MarkAttendanceModalProps) {
  const [attendance, setAttendance] = useState<AttendanceState>({});
  const [studentsList, setStudentsList] = useState<StudentFullDetails[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [markedBy, setMarkedBy] = useState<string | null>(null);

  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;

  const getIndianDateStr = (date: Date) => {
    return date.toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" });
  };
  const todayStr = getIndianDateStr(new Date());
  const targetStr = selectedDate ? getIndianDateStr(selectedDate) : todayStr;
  const isToday = targetStr === todayStr;
  const isFuture = targetStr > todayStr;

  const canEdit = !isLoading && isToday && !markedBy;

  useEffect(() => {
    if (!isOpen) return;

    const loadData = async () => {
      setIsLoading(true);
      try {
        const studentsRes = await axios.get(API.GET_ALL_STUDENTS, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        const students = studentsRes.data;
        setStudentsList(students);

        try {
          const attendanceRes = await axios.get(
            `${API.GET_ATTENDANCE}/${targetStr}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            },
          );

          const existingRecord = attendanceRes.data;

          if (existingRecord) {
            const savedState: AttendanceState = {};
            existingRecord.records.forEach((r: any) => {
              savedState[r.studentId] = r.status;
            });
            setAttendance(savedState);
            setMarkedBy(existingRecord.attendant?.name || "Unknown Admin");
          } else {
            initializeDefaultAttendance(students);
            setMarkedBy(null);
          }
        } catch (err) {
          initializeDefaultAttendance(students);
          setMarkedBy(null);
        }
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [isOpen, targetStr]);

  const initializeDefaultAttendance = (students: StudentFullDetails[]) => {
    const initialState: AttendanceState = {};
    students.forEach((s) => (initialState[s._id] = "present"));
    setAttendance(initialState);
  };

  const handleStatusChange = (
    id: string,
    status: "present" | "absent" | "leave",
  ) => {
    if (!canEdit) return;
    setAttendance((prev) => ({ ...prev, [id]: status }));
  };

  const handleSave = async () => {
    if (!canEdit) return;
    setIsSaving(true);

    try {
      const records = studentsList.map((student) => ({
        studentId: student._id,
        name: student.name,
        rollNo: student.rollId.toString(),
        status: attendance[student._id] || "absent",
      }));

      const payload = {
        date: targetStr,
        attendantId: user.id,
        records: records,
      };

      const response = await axios.post(API.MARK_ATTENDANCE, payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.status === 200 || response.status === 201) {
        setMarkedBy(user.name);
        onClose();
      }
    } catch (error) {
      console.error("Failed to save attendance:", error);
    } finally {
      setIsSaving(false);
    }
  };

  if (!isOpen) return null;

  const formattedDate = selectedDate?.toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      <div className="relative w-full max-w-2xl h-full bg-white dark:bg-[#1A0F1E] shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out animate-slide-in">
        <div className="px-6 py-5 border-b border-gray-100 dark:border-white/5 flex justify-between items-center bg-white dark:bg-[#1A0F1E] z-10">
          <div>
            <h2 className="text-xl font-bold text-primary dark:text-white">
              {canEdit ? "Mark Attendance" : "View Attendance Details"}
            </h2>
            <div className="flex flex-col gap-1 mt-1">
              <p className="text-sm text-secondary dark:text-gray-400 font-medium">
                {formattedDate}
              </p>

              <div className="flex items-center gap-2">
                {!canEdit && !isLoading && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
                    Read Only
                  </span>
                )}

                {markedBy && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 flex items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
                      height="10"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                    Marked by {markedBy}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            {canEdit && (
              <button
                onClick={() => {
                  const newState: AttendanceState = {};
                  studentsList.forEach((s) => (newState[s._id] = "present"));
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>

        {!canEdit && !isLoading && (
          <div className="bg-amber-50 dark:bg-amber-900/20 px-6 py-3 text-xs text-amber-700 dark:text-amber-400 font-medium border-b border-amber-100 dark:border-amber-800/30 flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
            {markedBy
              ? "Attendance has already been marked for this date."
              : isFuture
                ? "Attendance cannot be marked for future dates."
                : "Attendance can only be marked for the current date."}
          </div>
        )}

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {isLoading ? (
            <div className="flex justify-center items-center h-full">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : (
            studentsList.map((student) => {
              const status = attendance[student._id];

              return (
                <div
                  key={student._id}
                  className={`flex flex-col sm:flex-row items-center justify-between p-4 rounded-2xl border transition-all duration-200 ${
                    status === "absent"
                      ? "bg-red-50/50 border-red-100 dark:bg-red-900/10 dark:border-red-900/30"
                      : status === "leave"
                        ? "bg-blue-50/50 border-blue-100 dark:bg-blue-900/10 dark:border-blue-900/30"
                        : "bg-white dark:bg-white/5 border-gray-100 dark:border-white/5"
                  }`}
                >
                  <div className="flex items-center gap-4 w-full sm:w-auto mb-4 sm:mb-0">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white dark:border-white/10 shadow-sm">
                      <Image
                        src={student.image}
                        alt={student.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-primary dark:text-white">
                        {student.name}
                      </h3>
                      <p className="text-xs text-secondary dark:text-gray-400">
                        Roll ID: {student.rollId}
                      </p>
                    </div>
                  </div>

                  <div
                    className={`flex p-1 rounded-xl w-full sm:w-auto ${canEdit ? "bg-gray-100 dark:bg-black/40" : "bg-transparent opacity-50 grayscale pointer-events-none"}`}
                  >
                    <AttendanceButton
                      label="P"
                      fullLabel="Present"
                      active={status === "present"}
                      disabled={!canEdit}
                      colorClass="bg-white dark:bg-[#1A0F1E] text-emerald-600 shadow-sm"
                      onClick={() => handleStatusChange(student._id, "present")}
                    />
                    <AttendanceButton
                      label="A"
                      fullLabel="Absent"
                      active={status === "absent"}
                      disabled={!canEdit}
                      colorClass="bg-white dark:bg-[#1A0F1E] text-red-500 shadow-sm"
                      onClick={() => handleStatusChange(student._id, "absent")}
                    />
                    <AttendanceButton
                      label="L"
                      fullLabel="Leave"
                      active={status === "leave"}
                      disabled={!canEdit}
                      colorClass="bg-white dark:bg-[#1A0F1E] text-blue-500 shadow-sm"
                      onClick={() => handleStatusChange(student._id, "leave")}
                    />
                  </div>
                </div>
              );
            })
          )}
        </div>

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

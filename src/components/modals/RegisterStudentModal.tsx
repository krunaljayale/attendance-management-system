"use client";

import React, { useEffect } from "react";
import RegisterStudentForm from "@/components/forms/RegisterStudentForm";
import { StudentFullDetails } from "@/constants/Types";

interface RegisterStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (newStudent: StudentFullDetails) => void;
}

export default function RegisterStudentModal({
  isOpen,
  onClose,
  onSave,
}: RegisterStudentModalProps) {
  // Handle Escape Key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Drawer */}
      <div className="relative w-full max-w-md h-full bg-white dark:bg-primary shadow-2xl transform transition-transform duration-300 ease-in-out animate-slide-in">
        <RegisterStudentForm onCancel={onClose} onSave={onSave} />
      </div>
    </div>
  );
}

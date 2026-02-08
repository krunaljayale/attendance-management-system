export interface StudentCardProps {
  name?: string;
  course?: string;
  image?: string;
  rollId?: number;
  attendance?: string;
  onClick?: () => void;
}

export interface StudentFullDetails {
  _id: string;
  name: string;
  email: string;
  rollId: number;
  image: string;

  // Personal Information
  personalInfo: {
    aadharCard: string;
    dob: string; // ISO Date String
    gender: string;
    bloodGroup: string;
    casteCategory: string;
  };

  // Guardian & Contact Details
  guardianDetails: {
    fatherName: string;
    motherName: string;
    primaryPhone: string;
    secondaryPhone: string;
    address: {
      street: string;
      city: string;
      state: string;
      pincode: string;
    };
  };

  // Academic Details
  course: string;
  courseStartDate: string;
  courseEndDate: string;
  status: string;

  // Performance Stats
  attendance: string;
  grade: string;
  marks: number;
  certificateId: string | null;

  // System
  registrarId: string;
}

export interface StatCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
}

export interface AdminProfile {
  _id: string;
  name: string;
  email: string;
  employeeId: string;
  phoneNumber: string;
  role: "SUPER_ADMIN" | "TEACHER";
  department?: string;
  assignedClasses: string[];
  city?: string;
  isActive: boolean;
  createdAt: string;
  // Optional: If your backend sends an image URL, otherwise we use a placeholder
  image?: string;
}

export interface StaffMember {
  _id: string;
  name: string;
  email: string;
  phoneNumber: string;
  role: "SUPER_ADMIN" | "TEACHER";
  department?: string;
  isActive: boolean;
  employeeId?: string;
}

export interface Holiday {
  _id: string;
  name: string;
  date: string;
  type: "National" | "Regional" | "Optional" | "Academic";
  description?: string;
}

export interface MonthGridProps {
  monthName: string;
  monthIndex: number;
  year: number;
  selectedDate: Date | null;
  onSelectDate: (d: Date) => void;
  holidays: Record<string, "holiday">;
}

export interface MarkAttendanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: Date | null;
  userRole: "TEACHER" | "SUPER_ADMIN";
}

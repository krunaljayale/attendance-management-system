export interface StudentCardProps {
  name?: string;
  role?: string;
  image?: string;
  rollId?: number;
  attendance?: string;
  onClick?: () => void;
}

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
"use client";

import { StudentCardProps } from "@/constants/Types";
import Image from "next/image";

export default function StudentCard({
  name = "Undefined",
  course = "Undefined",
  image = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=60",
  rollId = 1111,
  attendance = "Undefined",
  onClick,
}: StudentCardProps) {
  return (
    <div onClick={onClick} className="w-full max-w-70 bg-white dark:bg-primary p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col items-center text-center transition-colors duration-300 cursor-pointer" >
      <div className="relative w-20 h-20 rounded-full overflow-hidden mb-4 border-2 border-white dark:border-primary shadow-sm group cursor-pointer">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-300"
          sizes="112px"
          loading="eager"
        />
      </div>

      <h3 className="text-lg font-bold text-primary dark:text-white tracking-tight">
        {name}
      </h3>
      <p className="text-xs font-medium text-secondary dark:text-gray-400 mt-1 mb-6">
        {course}
      </p>

      {/* <div className="flex items-center gap-4 mb-8">
        <button
          onClick={onEdit}
          className="w-10 h-10 rounded-xl bg-lavender text-white flex items-center justify-center hover:bg-magenta hover:shadow-lg hover:shadow-blue-500/30 transition-all active:scale-95"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
          </svg>
        </button>

        <button
          onClick={onDelete}
          className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-white/5 text-secondary dark:text-gray-400 flex items-center justify-center hover:bg-red-50 dark:hover:bg-red-500/20 hover:text-red-500 dark:hover:text-red-400 transition-all active:scale-95"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
          </svg>
        </button>
      </div> */}

      <div className="flex justify-between items-center w-full px-2">
        <div className="flex flex-col items-center gap-1">
          <span className="text-lg font-bold text-primary dark:text-white">
            {rollId}
          </span>
          <span className="text-[11px] font-medium text-secondary dark:text-gray-500 uppercase tracking-wide">
            Roll ID
          </span>
        </div>

        <div className="w-px h-8 bg-gray-100 dark:bg-gray-800"></div>

        <div className="flex flex-col items-center gap-1">
          <span className="text-lg font-bold text-primary dark:text-white">
            {attendance}
          </span>
          <span className="text-[11px] font-medium text-secondary dark:text-gray-500 uppercase tracking-wide">
            Avg. Attend
          </span>
        </div>
      </div>
    </div>
  );
}

import React from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
}

export default function StatCard({ title, value, icon }: StatCardProps) {
  return (
    <div className="bg-white dark:bg-[#1A0F1E] p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm w-full h-full flex flex-col justify-between md:min-h-[200px] transition-colors duration-300">
      <div className="flex justify-between items-start">
        <h3 className="text-4xl font-bold text-primary dark:text-white tracking-tight">
          {value}
        </h3>

        <div className="w-10 h-10 rounded-full bg-lavender/30 dark:bg-white/10 flex items-center justify-center text-magenta">
          {icon || (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M19.07 4.93L4.93 19.07" />
            </svg>
          )}
        </div>
      </div>

      <div className="flex justify-between items-end mt-4">
        <p className="text-secondary dark:text-gray-400 text-sm font-medium">
          {title}
        </p>

        <div className="flex items-end gap-1.5 h-8">
          <div className="w-2.5 rounded-t-sm bg-gradient-to-t from-lavender/50 to-magenta/40 dark:from-lavender/30 dark:to-magenta/60 h-[40%]"></div>
          <div className="w-2.5 rounded-t-sm bg-gradient-to-t from-lavender/50 to-magenta/60 dark:from-lavender/30 dark:to-magenta/80 h-[70%]"></div>
          <div className="w-2.5 rounded-t-sm bg-gradient-to-t from-lavender/50 to-magenta dark:from-lavender/30 dark:to-magenta h-[100%]"></div>
          <div className="w-2.5 rounded-t-sm bg-gradient-to-t from-lavender/50 to-magenta/50 dark:from-lavender/30 dark:to-magenta/70 h-[50%]"></div>
          <div className="w-2.5 rounded-t-sm bg-gradient-to-t from-lavender/50 to-magenta/30 dark:from-lavender/30 dark:to-magenta/50 h-[60%]"></div>
        </div>
      </div>
    </div>
  );
}
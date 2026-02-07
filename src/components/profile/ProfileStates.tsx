import React from "react";

export function LoadingState() {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center gap-4 bg-[#F7F5F7] dark:bg-[#0F0B13]">
      <div className="relative">
        {/* Outer Ring */}
        <div className="w-16 h-16 border-4 border-lavender/30 border-t-magenta rounded-full animate-spin"></div>
        
        {/* Inner Dot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 bg-white dark:bg-[#1A0F1E] rounded-full shadow-inner"></div>
        </div>
      </div>
      <p className="text-secondary dark:text-gray-400 font-bold tracking-wide animate-pulse text-sm">
        LOADING PROFILE...
      </p>
    </div>
  );
}

interface ErrorStateProps {
  error: string;
}

export function ErrorState({ error }: ErrorStateProps) {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center p-6 bg-[#F7F5F7] dark:bg-[#0F0B13]">
      <div className="w-20 h-20 bg-red-100 dark:bg-red-900/20 text-red-500 rounded-3xl flex items-center justify-center mb-6 shadow-xl shadow-red-500/10">
        <svg
          className="w-10 h-10"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      </div>
      <h2 className="text-2xl font-bold text-primary dark:text-white mb-2">
        Something went wrong
      </h2>
      <p className="text-secondary dark:text-gray-400 mb-8 max-w-md text-center">
        {error}
      </p>
      <button
        onClick={() => window.location.reload()}
        className="px-8 py-3 bg-primary dark:bg-white text-white dark:text-primary rounded-xl font-bold hover:scale-105 transition-transform shadow-lg shadow-primary/20"
      >
        Try Again
      </button>
    </div>
  );
}
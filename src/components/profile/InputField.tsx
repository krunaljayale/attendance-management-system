import React from "react";

interface InputFieldProps {
  label: string;
  value: string | undefined;
  name?: string;
  icon?: React.ReactNode;
  isEditing: boolean;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputField({
  label,
  value,
  name,
  icon,
  isEditing,
  disabled,
  onChange,
}: InputFieldProps) {
  return (
    <div className="group">
      <label className="text-xs font-bold text-secondary/60 dark:text-gray-500 uppercase tracking-wider mb-2 block pl-1">
        {label}
      </label>
      <div className={`relative flex items-center transition-all duration-300 ${isEditing && !disabled ? 'scale-[1.01]' : ''}`}>
        <div className="absolute left-4 text-gray-400 dark:text-gray-600 group-focus-within:text-magenta transition-colors">
          {icon}
        </div>
        
        {isEditing && !disabled ? (
          <input
            type="text"
            name={name}
            value={value || ""}
            onChange={onChange}
            className="w-full bg-gray-50 dark:bg-black/20 border-2 border-transparent focus:border-magenta/30 rounded-2xl pl-11 pr-4 py-3.5 text-sm font-bold text-primary dark:text-white focus:outline-none focus:ring-4 focus:ring-magenta/10 transition-all shadow-sm"
          />
        ) : (
          <div className="w-full bg-gray-50/50 dark:bg-white/5 border border-transparent rounded-2xl pl-11 pr-4 py-3.5 text-sm font-medium text-primary dark:text-white opacity-80 cursor-default truncate">
            {value || "Not Set"}
          </div>
        )}
      </div>
    </div>
  );
}
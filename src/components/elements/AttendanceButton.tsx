export function AttendanceButton({
  label,
  fullLabel,
  active,
  colorClass,
  onClick,
  disabled,
}: any) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type="button"
      className={`
        flex-1 sm:flex-none px-4 py-1.5 rounded-lg text-xs font-bold transition-all duration-200
        ${active ? colorClass : "text-secondary dark:text-gray-500"}
        ${!disabled && !active ? "hover:bg-gray-200 dark:hover:bg-white/10" : ""}
        ${disabled ? "cursor-not-allowed" : "cursor-pointer"}
      `}
    >
      <span className="sm:hidden">{label}</span>
      <span className="hidden sm:inline">{fullLabel}</span>
    </button>
  );
}

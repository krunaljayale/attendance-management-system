import { MonthGridProps } from "@/constants/Types";

const DAYS_OF_WEEK = ["M", "T", "W", "T", "F", "S", "S"];

export default function MonthGrid({
  monthName,
  monthIndex,
  year,
  selectedDate,
  onSelectDate,
  holidays,
}: MonthGridProps) {
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const firstDayOfMonth = (new Date(year, monthIndex, 1).getDay() + 6) % 7;

  const calendarDays = [];
  for (let i = 0; i < firstDayOfMonth; i++) calendarDays.push(null);
  for (let i = 1; i <= daysInMonth; i++) calendarDays.push(i);

  return (
    <div className="flex flex-col">
      <h3 className="text-lg font-bold text-primary dark:text-white mb-4 pl-1">
        {monthName}
      </h3>

      <div className="grid grid-cols-7 mb-2 text-center">
        {DAYS_OF_WEEK.map((day, i) => (
          <div
            key={i}
            className="text-[10px] font-bold text-secondary dark:text-gray-600 uppercase"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-y-2 gap-x-1">
        {calendarDays.map((day, i) => {
          if (!day) return <div key={`empty-${i}`} />;

          const currentDayDate = new Date(year, monthIndex, day);
          const dateStr = `${year}-${String(monthIndex + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

          const isSunday = currentDayDate.getDay() === 0;
          const isApiHoliday = holidays[dateStr] === "holiday";
          const isHoliday = isSunday || isApiHoliday;

          const isSelected =
            selectedDate &&
            selectedDate.getDate() === day &&
            selectedDate.getMonth() === monthIndex &&
            selectedDate.getFullYear() === year;

          let bgClass =
            "hover:bg-gray-100 dark:hover:bg-white/10 text-primary dark:text-gray-300 cursor-pointer";

          if (isHoliday) {
            bgClass =
              "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400 font-bold cursor-not-allowed opacity-80";
          } else if (isSelected) {
            bgClass =
              "bg-primary dark:bg-white text-white dark:text-[#1A0F1E] shadow-md scale-110 font-bold z-10 cursor-pointer";
          }

          return (
            <button
              key={day}
              onClick={() => {
                if (!isHoliday) {
                  onSelectDate(currentDayDate);
                }
              }}
              className={`
                h-8 w-8 text-xs rounded-full flex items-center justify-center transition-all duration-200
                ${bgClass}
              `}
              disabled={isHoliday}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}

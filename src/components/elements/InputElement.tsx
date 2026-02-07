function ReadOnlyField({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label className="text-xs font-bold text-secondary dark:text-gray-500 uppercase tracking-wide ml-1">
        {label}
      </label>
      <div className="w-full bg-white dark:bg-primary border border-gray-200 dark:border-gray-700 text-primary dark:text-gray-300 px-4 py-3 rounded-xl text-sm font-medium">
        {value}
      </div>
    </div>
  );
}

export default ReadOnlyField
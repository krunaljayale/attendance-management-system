import StatCard from "@/components/cards/StatCard";
import TotalStat from "@/components/cards/TotalStat";
import StudentGenderChart from "@/components/cards/StudentGenderChart";
import TopAttendants from "@/components/cards/TopAttendants";
import WeeklyAbsentChart from "@/components/cards/WeeklyAbsentChart";

export default function Dashboard() {
  return (
    <div className="items-center px-8 py-4">
      <h1 className="text-black font-extrabold text-3xl dark:text-white">
        Hello Krunal
      </h1>
      <h6 className="text-gray-700 dark:text-gray-100 mt-1.5 font-medium">
        We hope you're having greate day.
      </h6>

      <div className="lg:flex flex-row lg:py-5 justify-between gap-5">
        <div className="grid md:grid-cols-2 grid-rows-2 gap-4 w-full">
          <StatCard title="Total Students" value="570" />
          <StatCard title="Present Today" value="570" />
          <StatCard title="Absent Today" value="570" />
          <StatCard title="Late Students Today" value="570" />
        </div>
        <div className="my-5 lg:my-0 w-full md:flex">
          <TotalStat />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div>
          <StudentGenderChart/>
        </div>
        <div>
          <TopAttendants/>
        </div>
        <div>
          <WeeklyAbsentChart/>
        </div>
      </div>
    </div>
  );
}

import Image from "next/image";
import { AdminProfile } from "@/constants/Types";

interface ProfileHeaderProps {
  profile: AdminProfile;
  isEditing: boolean;
  onToggleEdit: () => void;
  onSave: (e: React.FormEvent) => void;
}

export default function ProfileHeader({
  profile,
  isEditing,
  onToggleEdit,
  onSave,
}: ProfileHeaderProps) {
  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    profile.name || "User",
  )}&background=FE02C5&color=fff&size=256&bold=true`;

  return (
    <div className="relative z-10 max-w-5xl mx-auto mb-10">
      {/* Cover Photo */}
      <div className="h-64 w-full rounded-3xl relative overflow-hidden shadow-2xl shadow-magenta/5">
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A0F1E] to-[#4a2b57]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
        <div className="absolute bottom-[-50px] left-[-50px] w-48 h-48 bg-magenta rounded-full blur-[80px] opacity-60" />
        <div className="absolute top-[-50px] right-[-50px] w-64 h-64 bg-lavender rounded-full blur-[80px] opacity-40" />
      </div>

      <div className="relative -mt-20 mx-4 md:mx-8 bg-white/80 dark:bg-[#1A0F1E]/80 backdrop-blur-xl border border-white/20 dark:border-white/5 rounded-3xl p-6 md:p-8 shadow-xl flex flex-col md:flex-row items-center md:items-end gap-6 md:gap-8">
        <div className="relative shrink-0">
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full p-1.5 bg-gradient-to-br from-magenta to-lavender shadow-lg shadow-magenta/30">
            <div className="w-full h-full rounded-full overflow-hidden relative bg-white dark:bg-black">
              <Image
                src={avatarUrl}
                alt="Avatar"
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          </div>
          <div
            className={`absolute bottom-3 right-3 w-6 h-6 border-4 border-white dark:border-[#1A0F1E] rounded-full ${profile.isActive ? "bg-emerald-500" : "bg-red-500"}`}
          />
        </div>

        <div className="flex-1 text-center md:text-left mb-2">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2 text-primary dark:text-white">
            {profile.name}
          </h1>
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
            <span className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-magenta/10 text-magenta border border-magenta/20">
              {profile.role?.replace("_", " ")}
            </span>
            <span className="text-secondary dark:text-gray-400 font-medium flex items-center gap-1.5">
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              {profile.city || "Unknown Location"}
            </span>
          </div>
        </div>

        <div className="flex gap-3 w-full md:w-auto">
          {!isEditing ? (
            <button
              onClick={onToggleEdit}
              className="flex-1 md:flex-none py-3 px-8 rounded-xl font-bold text-sm bg-primary dark:bg-white text-white dark:text-primary shadow-lg shadow-primary/20 hover:shadow-xl hover:scale-[1.02] transition-all"
            >
              Edit Profile
            </button>
          ) : (
            <>
              <button
                onClick={onToggleEdit}
                className="flex-1 md:flex-none py-3 px-6 rounded-xl font-bold text-sm bg-gray-100 dark:bg-white/10 text-secondary dark:text-white hover:bg-gray-200 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={onSave}
                className="flex-1 md:flex-none py-3 px-8 rounded-xl font-bold text-sm bg-magenta text-white shadow-lg shadow-magenta/30 hover:shadow-magenta/50 hover:scale-[1.02] transition-all"
              >
                Save
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

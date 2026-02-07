"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import AuthGuard from "../auth/AuthGuard";

const navItems = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Manage Attendance", href: "/dashboard/attendance" },
  { name: "Student’s List", href: "/dashboard/students" },
  { name: "Staff", href: "/dashboard/staff" },
  { name: "Profile", href: "/dashboard/profile" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    try {
      const userString = localStorage.getItem("user");
      if (userString) {
        const user = JSON.parse(userString);
        setUserRole(user.role);
      }
    } catch (error) {
      console.error("Error parsing user data", error);
    }
  }, []);

  const filteredNavItems = navItems.filter((item) => {
    if (item.name === "Staff") {
      return userRole === "SUPER_ADMIN";
    }
    return true;
  });

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/");
  };

  return (
    <AuthGuard>
      <div className="min-h-screen bg-background w-full transition-colors duration-300">
        <div className="bg-white dark:bg-primary p-5 transition-colors duration-300 shadow-sm dark:shadow-none relative z-50">
          <div className="flex justify-between items-center">
            <div className="flex text-2xl items-center gap-2 text-primary dark:text-white font-bold text tracking-tight z-50">
              <span className="text">⚡</span>
              ATTENDED
            </div>

            <nav className="hidden md:flex bg-background dark:bg-black/40 p-2 rounded-full shadow-inner dark:shadow-none gap-2 transition-colors duration-300">
              {filteredNavItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      isActive
                        ? "bg-primary text-white dark:bg-white dark:text-primary shadow-md"
                        : "text-secondary dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-white/10"
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </nav>

            <div className="hidden md:flex items-center gap-2 text-primary font-bold text-2xl tracking-tight">
              <button
                onClick={handleLogout}
                className="px-6 py-2 rounded-full border border-gray-200 dark:border-gray-700 text-sm font-medium text-primary dark:text-white hover:bg-red-50 hover:text-red-600 hover:border-red-100 dark:hover:bg-white/10 hover:shadow-sm transition-all duration-300"
              >
                Logout
              </button>
            </div>

            <button
              className="md:hidden p-2 text-primary dark:text-white focus:outline-none transition-transform active:scale-95"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
              )}
            </button>
          </div>

          <div
            className={`md:hidden absolute left-0 right-0 top-full bg-white dark:bg-primary border-b border-gray-100 dark:border-white/5 shadow-xl transition-all duration-300 ease-in-out overflow-hidden ${
              isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="flex flex-col p-5 space-y-3">
              {filteredNavItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeMobileMenu}
                    className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                      isActive
                        ? "bg-primary text-white dark:bg-white dark:text-primary shadow-sm"
                        : "text-secondary dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5"
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}

              <div className="h-px bg-gray-100 dark:bg-white/10 my-2"></div>

              <button
                onClick={() => {
                  closeMobileMenu();
                  handleLogout();
                }}
                className="w-full px-4 py-3 text-center rounded-xl border border-gray-200 dark:border-gray-700 text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-white/5 transition-all duration-300"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        <main>{children}</main>
      </div>
    </AuthGuard>
  );
}

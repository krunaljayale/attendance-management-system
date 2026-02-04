"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navItems = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Manage Attendance", href: "/dashboard/attendance" },
  { name: "Student’s List", href: "/dashboard/students" },
  // { name: "Reports", href: "/dashboard/reports" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu when a link is clicked
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <div className="min-h-screen bg-background w-full transition-colors duration-300">
      
      {/* Navbar Container */}
      <div className="bg-white dark:bg-primary p-5 transition-colors duration-300 shadow-sm dark:shadow-none relative z-50">
        <div className="flex justify-between items-center">
          
          {/* Logo */}
          <div className="flex text-2xl items-center gap-2 text-primary dark:text-white font-bold text tracking-tight z-50">
            <span className="text">⚡</span>
            ATTENDED
          </div>

          {/* --- DESKTOP NAVIGATION (Hidden on Mobile) --- */}
          <nav className="hidden md:flex bg-background dark:bg-black/40 p-2 rounded-full shadow-inner dark:shadow-none gap-2 transition-colors duration-300">
            {navItems.map((item) => {
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

          {/* --- DESKTOP LOGIN BUTTON (Hidden on Mobile) --- */}
          <div className="hidden md:flex items-center gap-2 text-primary font-bold text-2xl tracking-tight">
            <Link
              href="/dashboard"
              className="px-6 py-2 rounded-full border border-gray-200 dark:border-gray-700 text-sm font-medium text-primary dark:text-white hover:bg-gray-50 dark:hover:bg-white/10 hover:shadow-sm transition-all duration-300"
            >
              Login
            </Link>
          </div>

          {/* --- MOBILE HAMBURGER BUTTON (Visible on Mobile) --- */}
          <button
            className="md:hidden p-2 text-primary dark:text-white focus:outline-none transition-transform active:scale-95"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? (
              // Close Icon (X)
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            ) : (
              // Hamburger Icon (Three Bars)
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
            )}
          </button>
        </div>

        {/* --- MOBILE DROPDOWN MENU --- */}
        <div
          className={`md:hidden absolute left-0 right-0 top-full bg-white dark:bg-primary border-b border-gray-100 dark:border-white/5 shadow-xl transition-all duration-300 ease-in-out overflow-hidden ${
            isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="flex flex-col p-5 space-y-3">
            {navItems.map((item) => {
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
            
            <Link
              href="/dashboard"
              onClick={closeMobileMenu}
              className="px-4 py-3 text-center rounded-xl border border-gray-200 dark:border-gray-700 text-sm font-medium text-primary dark:text-white hover:bg-gray-50 dark:hover:bg-white/5 transition-all duration-300"
            >
              Login
            </Link>
          </div>
        </div>
      </div>

      <main>{children}</main>
    </div>
  );
}
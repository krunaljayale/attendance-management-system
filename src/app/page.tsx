import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-background w-full flex flex-col font-sans transition-colors duration-300">
      <header className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-2 text-primary dark:text-white font-bold text-2xl tracking-tight">
          <span className="text-3xl">⚡</span>
          ATTENDED
        </div>

        <nav className="hidden md:flex gap-8 text-sm font-medium text-secondary dark:text-gray-400">
          <Link
            href="#"
            className="hover:text-primary dark:hover:text-white transition-colors"
          >
            Features
          </Link>
          <Link
            href="#"
            className="hover:text-primary dark:hover:text-white transition-colors"
          >
            Pricing
          </Link>
          <Link
            href="#"
            className="hover:text-primary dark:hover:text-white transition-colors"
          >
            Support
          </Link>
        </nav>

        <Link
          href="/dashboard"
          className="px-6 py-2 rounded-full border border-gray-200 dark:border-gray-700 text-primary dark:text-white text-sm font-medium hover:bg-white dark:hover:bg-white/10 hover:shadow-sm transition-all"
        >
          Login
        </Link>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 mt-10 md:mt-0">
        <div className="mb-6 px-4 py-1.5 rounded-full bg-lavender/30 dark:bg-white/5 border border-lavender dark:border-white/10 text-magenta dark:text-fuchsia-300 text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
          v1.0 is now live
        </div>

        <h1 className="text-5xl md:text-7xl font-bold text-primary dark:text-white tracking-tight mb-6 max-w-4xl">
          Attendance management <br />
          <span className="text-secondary dark:text-gray-500">
            reimagined for speed.
          </span>
        </h1>

        <p className="text-lg text-secondary dark:text-gray-400 max-w-xl mb-10 leading-relaxed">
          Track student presence, generate reports, and manage your classroom
          effortlessly with a system designed for modern education.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/dashboard"
            className="h-12 px-8 rounded-full bg-primary text-white dark:bg-white dark:text-[#1A0F1E] font-medium flex items-center justify-center hover:bg-primary/90 dark:hover:bg-gray-100 transition-transform active:scale-95 shadow-lg shadow-primary/20 dark:shadow-white/10"
          >
            Go to Dashboard
          </Link>

          <button className="h-12 px-8 rounded-full bg-white dark:bg-transparent text-primary dark:text-white border border-gray-200 dark:border-gray-700 font-medium hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
            View Documentation
          </button>
        </div>

        <div className="mt-20 relative w-full max-w-4xl h-64 bg-white dark:bg-[#1A0F1E] rounded-t-3xl border-t border-x border-gray-200 dark:border-gray-800 shadow-sm p-6 overflow-hidden transition-colors duration-300">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/50 dark:to-background/90 z-10"></div>

          <div className="flex gap-8 mb-6 opacity-80">
            <div className="w-1/4 h-full space-y-3">
              <div className="h-8 w-full bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse"></div>
              <div className="h-8 w-full bg-gray-100 dark:bg-gray-800/50 rounded-lg"></div>
              <div className="h-8 w-full bg-gray-100 dark:bg-gray-800/50 rounded-lg"></div>
            </div>
            <div className="w-3/4 h-full space-y-4">
              <div className="h-32 w-full bg-lavender/20 dark:bg-white/5 rounded-xl border border-lavender/30 dark:border-white/5"></div>
              <div className="h-32 w-full bg-gray-100 dark:bg-gray-800 rounded-xl"></div>
            </div>
          </div>
        </div>
      </main>

      <footer className="py-6 text-center text-secondary dark:text-gray-600 text-sm">
        <p>© 2026 Attended System. All rights reserved.</p>
      </footer>
    </div>
  );
}

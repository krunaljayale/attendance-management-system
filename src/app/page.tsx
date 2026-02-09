import Link from "next/link";

const CheckIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const ShieldIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const ChartIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <line x1="12" y1="20" x2="12" y2="10" />
    <line x1="18" y1="20" x2="18" y2="4" />
    <line x1="6" y1="20" x2="6" y2="16" />
  </svg>
);

const ZapIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

const ArrowRightIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

export default function Home() {
  return (
    <div className="min-h-screen bg-background w-full flex flex-col font-sans text-primary dark:text-white transition-colors duration-300 overflow-x-hidden selection:bg-lavender/30">
      {/* Background Gradients */}
      <div className="fixed inset-0 -z-10 h-full w-full bg-white dark:bg-[#0a0a0a] bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#ffffff33_1px,transparent_1px)] [background-size:16px_16px]">
        <div className="absolute inset-0 bg-white/50 dark:bg-black/80 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      </div>
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-magenta/20 blur-[120px] rounded-full pointer-events-none -z-10 opacity-50 dark:opacity-20" />

      <header className="fixed top-0 w-full z-50 border-b border-gray-200/50 dark:border-white/5 bg-white/70 dark:bg-[#0a0a0a]/70 backdrop-blur-xl">
        <div className="flex items-center justify-between px-6 md:px-8 py-4 max-w-7xl mx-auto w-full">
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-xl tracking-tight group"
          >
            <div className="w-8 h-8 rounded-lg bg-primary dark:bg-white text-white dark:text-black flex items-center justify-center group-hover:rotate-12 transition-transform">
              <ZapIcon className="w-5 h-5 fill-current" />
            </div>
            <span>ATTENDED</span>
          </Link>

          <nav className="hidden md:flex gap-8 text-sm font-medium text-secondary dark:text-gray-400">
            <Link
              href="#features"
              className="hover:text-primary dark:hover:text-white transition-colors"
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="hover:text-primary dark:hover:text-white transition-colors"
            >
              How it Works
            </Link>
            <Link
              href="#pricing"
              className="hover:text-primary dark:hover:text-white transition-colors"
            >
              Pricing
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link
              href="/auth"
              className="hidden sm:block text-sm font-medium text-secondary hover:text-primary dark:text-gray-400 dark:hover:text-white transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/dashboard"
              className="px-5 py-2 rounded-full bg-primary text-white dark:bg-white dark:text-black text-sm font-semibold hover:opacity-90 transition-all shadow-lg shadow-primary/20 dark:shadow-white/10"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* --- HERO SECTION --- */}
      <main className="flex-1 flex flex-col items-center pt-32 pb-20 px-4 md:px-6 relative">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lavender/10 border border-lavender/20 text-magenta text-xs font-bold uppercase tracking-wider mb-8 animate-fade-in-up">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-magenta opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-magenta"></span>
          </span>
          v2.0 is now live
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-center tracking-tight mb-6 max-w-5xl leading-[1.1]">
          Attendance <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-magenta to-primary bg-300% animate-gradient">
            Simplified.
          </span>
        </h1>

        <p className="text-lg md:text-xl text-secondary dark:text-gray-400 text-center max-w-2xl mb-10 leading-relaxed">
          Stop using spreadsheets. Track student presence, generate automated
          reports, and manage your institution with a data-driven approach.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto px-4">
          <Link
            href="/dashboard"
            className="h-12 px-8 rounded-full bg-primary text-white dark:bg-white dark:text-black font-semibold flex items-center justify-center gap-2 hover:translate-y-[-2px] transition-all shadow-xl shadow-primary/20 dark:shadow-white/5 w-full sm:w-auto"
          >
            Launch Dashboard <ArrowRightIcon className="w-4 h-4" />
          </Link>
          <button className="h-12 px-8 rounded-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 font-medium hover:bg-gray-50 dark:hover:bg-white/10 transition-colors flex items-center justify-center gap-2 w-full sm:w-auto">
            View Demo
          </button>
        </div>

        <div className="mt-20 relative w-full max-w-6xl mx-auto perspective-1000">
          <div className="absolute -inset-4 bg-gradient-to-r from-primary to-magenta opacity-20 blur-2xl rounded-[3rem] -z-10"></div>

          <div className="relative bg-white dark:bg-[#0F0F11] rounded-2xl border border-gray-200 dark:border-white/10 shadow-2xl overflow-hidden aspect-[16/9] md:aspect-[21/9] transform rotate-x-12 transition-transform duration-500 hover:rotate-x-0 group">
            <div className="absolute top-0 left-0 right-0 h-12 bg-gray-50 dark:bg-[#1A1A1E] border-b border-gray-200 dark:border-white/5 flex items-center px-4 gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
              </div>
              <div className="mx-auto w-1/3 h-6 bg-gray-200 dark:bg-white/5 rounded-md text-[10px] flex items-center justify-center text-gray-400">
                attended.app/dashboard
              </div>
            </div>

            <div className="flex h-full pt-12">
              <div className="w-16 md:w-64 border-r border-gray-200 dark:border-white/5 bg-gray-50/50 dark:bg-[#1A1A1E]/50 hidden sm:flex flex-col p-4 gap-3">
                <div className="h-8 w-3/4 bg-gray-200 dark:bg-white/5 rounded-md"></div>
                <div className="h-8 w-full bg-primary/10 dark:bg-primary/20 rounded-md"></div>
                <div className="h-8 w-5/6 bg-gray-200 dark:bg-white/5 rounded-md"></div>
                <div className="h-8 w-4/5 bg-gray-200 dark:bg-white/5 rounded-md"></div>
              </div>
              <div className="flex-1 p-6 md:p-8 overflow-hidden bg-white dark:bg-[#0F0F11]">
                <div className="flex justify-between items-end mb-8">
                  <div className="space-y-2">
                    <div className="h-8 w-48 bg-gray-200 dark:bg-white/10 rounded-lg"></div>
                    <div className="h-4 w-32 bg-gray-100 dark:bg-white/5 rounded-lg"></div>
                  </div>
                  <div className="h-10 w-32 bg-primary rounded-lg"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="h-32 rounded-xl border border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-[#151518] p-4 flex flex-col justify-between"
                    >
                      <div className="flex justify-between">
                        <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-white/10"></div>
                        <div className="h-4 w-12 bg-gray-200 dark:bg-white/5 rounded"></div>
                      </div>
                      <div className="h-8 w-24 bg-gray-200 dark:bg-white/10 rounded"></div>
                    </div>
                  ))}
                </div>

                <div className="h-64 w-full rounded-xl border border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-[#151518]"></div>
              </div>
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent dark:from-[#0a0a0a] pointer-events-none h-full w-full"></div>
          </div>
        </div>
      </main>

      <section className="py-10 border-y border-gray-200 dark:border-white/5 bg-gray-50/50 dark:bg-white/5">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-6">
            Trusted by innovative institutions
          </p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            {[
              "TechUniversity",
              "DesignInstitute",
              "CodeAcademy",
              "FutureSchool",
              "GlobalCampus",
            ].map((brand) => (
              <div key={brand} className="text-xl font-bold font-serif">
                {brand}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="features" className="py-24 max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Everything you need to manage attendance
          </h2>
          <p className="text-secondary dark:text-gray-400 text-lg">
            Powerful features wrapped in a simple, intuitive interface.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="col-span-1 md:col-span-2 bg-gray-50 dark:bg-white/5 rounded-3xl p-8 border border-gray-200 dark:border-white/10 hover:border-primary/50 transition-colors group">
            <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6 group-hover:scale-110 transition-transform">
              <ChartIcon className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold mb-3">Real-time Analytics</h3>
            <p className="text-secondary dark:text-gray-400 mb-6">
              Get insights into student performance instantly. Visual graphs
              help you identify attendance trends before they become issues.
            </p>
            <div className="h-48 w-full bg-white dark:bg-black/20 rounded-xl border border-dashed border-gray-300 dark:border-white/10 relative overflow-hidden">
              <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-blue-500/10 to-transparent flex items-end justify-around px-4 pb-0">
                {[40, 70, 50, 90, 60, 80].map((h, i) => (
                  <div
                    key={i}
                    style={{ height: `${h}%` }}
                    className="w-8 bg-blue-500 rounded-t-md opacity-80"
                  ></div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-white/5 rounded-3xl p-8 border border-gray-200 dark:border-white/10 hover:border-magenta/50 transition-colors group">
            <div className="h-12 w-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center text-purple-600 dark:text-purple-400 mb-6 group-hover:scale-110 transition-transform">
              <ShieldIcon className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold mb-3">Secure & Private</h3>
            <p className="text-secondary dark:text-gray-400">
              Enterprise-grade security for student data. Role-based access
              ensures only authorized personnel see sensitive info.
            </p>
          </div>

          <div className="bg-gray-50 dark:bg-white/5 rounded-3xl p-8 border border-gray-200 dark:border-white/10 hover:border-green/50 transition-colors group">
            <div className="h-12 w-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center text-green-600 dark:text-green-400 mb-6 group-hover:scale-110 transition-transform">
              <CheckIcon className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold mb-3">Automated Reports</h3>
            <p className="text-secondary dark:text-gray-400">
              Generate weekly or monthly PDFs with a single click. Save hours of
              administrative work.
            </p>
          </div>

          <div className="col-span-1 md:col-span-2 bg-gray-50 dark:bg-white/5 rounded-3xl p-8 border border-gray-200 dark:border-white/10 hover:border-yellow/50 transition-colors flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <div className="h-12 w-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-xl flex items-center justify-center text-yellow-600 dark:text-yellow-400 mb-6">
                <ZapIcon className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Lightning Fast</h3>
              <p className="text-secondary dark:text-gray-400">
                Built on Next.js for speed. No loading spinners, no lag. Mark
                attendance for 100 students in under 30 seconds.
              </p>
            </div>
            <div className="w-full md:w-1/3 aspect-square bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center text-white font-bold text-4xl shadow-lg transform rotate-3">
              A+
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto bg-primary dark:bg-white text-white dark:text-black rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/20 dark:bg-black/10 rounded-full blur-3xl"></div>

          <h2 className="text-4xl md:text-6xl font-bold mb-8 relative z-10">
            Ready to modernize your classroom?
          </h2>
          <p className="text-xl opacity-90 mb-10 max-w-2xl mx-auto relative z-10">
            Join thousands of educators saving time and improving student
            outcomes today.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
            <Link
              href="/dashboard"
              className="h-14 px-10 rounded-full bg-white text-primary dark:bg-black dark:text-white font-bold text-lg flex items-center justify-center hover:scale-105 transition-transform"
            >
              Get Started for Free
            </Link>
            <button className="h-14 px-10 rounded-full bg-transparent border-2 border-white/30 dark:border-black/20 text-white dark:text-black font-bold text-lg hover:bg-white/10 dark:hover:bg-black/5 transition-colors">
              Contact Sales
            </button>
          </div>
        </div>
      </section>

      <footer className="py-12 px-6 border-t border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-[#050505]">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 font-bold text-xl mb-4">
              <ZapIcon className="w-5 h-5 text-primary dark:text-white" />
              ATTENDED
            </div>
            <p className="text-secondary dark:text-gray-500 text-sm">
              Making education management effortless, one classroom at a time.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-secondary dark:text-gray-400">
              <li>
                <a
                  href="#"
                  className="hover:text-primary dark:hover:text-white"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-primary dark:hover:text-white"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-primary dark:hover:text-white"
                >
                  Changelog
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-secondary dark:text-gray-400">
              <li>
                <a
                  href="#"
                  className="hover:text-primary dark:hover:text-white"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-primary dark:hover:text-white"
                >
                  Careers
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-primary dark:hover:text-white"
                >
                  Blog
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-secondary dark:text-gray-400">
              <li>
                <a
                  href="#"
                  className="hover:text-primary dark:hover:text-white"
                >
                  Privacy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-primary dark:hover:text-white"
                >
                  Terms
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-primary dark:hover:text-white"
                >
                  Security
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-sm text-secondary dark:text-gray-500 pt-8 border-t border-gray-200 dark:border-white/5">
          <p>© 2026 Attended System. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a
              href="https://www.linkedin.com/in/krunal-jayale"
              className="hover:text-primary dark:hover:text-white"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/krunaljayale"
              className="hover:text-primary dark:hover:text-white"
            >
              GitHub
            </a>
            <a
              href="https://www.instagram.com/mr__inevitable/"
              className="hover:text-primary dark:hover:text-white"
            >
              Instagram
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

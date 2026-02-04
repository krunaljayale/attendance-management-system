"use client";

import { useState, useRef, useEffect } from "react";
import StudentCard from "@/components/cards/StudentCard";
import StudentDetailsModal, { StudentFullDetails } from "@/components/modals/StudentDetailsModal";
import RegisterStudentModal from "@/components/modals/RegisterStudentModal"; // Import New Modal
import { STUDENTS } from "@/utils/dummyData";

function Students() {
  const [filter, setFilter] = useState("Total Students");
  const [searchQuery, setSearchQuery] = useState("");
  
  // 1. Convert STUDENTS constant to local state so we can add to it dynamically
  const [studentsList, setStudentsList] = useState(STUDENTS);

  const [selectedStudentId, setSelectedStudentId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false); // <--- New State
  
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Filter Logic uses the State 'studentsList' now
  const filteredStudents = studentsList.filter((student) => {
    const matchesCategory =
      filter === "Total Students"
        ? true
        : student.registrarId === "65bf9c1e8d2a4b3f1c9e7d01";

    const query = searchQuery.toLowerCase();
    const matchesSearch =
      student.name.toLowerCase().includes(query) ||
      student.rollId.toString().includes(query);

    return matchesCategory && matchesSearch;
  });

  const handleCardClick = (id: number) => {
    setSelectedStudentId(id);
    setIsModalOpen(true);
  };

  // 2. Handler for adding a new student
  const handleRegisterStudent = (newStudent: StudentFullDetails) => {
    // Add to local state (In real app, this happens after API success)
    // @ts-ignore - Ignoring type mismatch for 'id' if dummyData uses numbers and we passed string, or vice versa
    setStudentsList((prev) => [newStudent, ...prev]); 
    setIsRegisterModalOpen(false);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const options = ["Total Students", "My Registered Students"];

  return (
    <div className="w-full p-4 md:p-10 min-h-screen pb-20">
      
      {/* Header Container */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center mb-8 gap-6 relative z-40">
        
        {/* Title Section */}
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-primary dark:text-white">
            {filter}
          </h1>
          <p className="text-sm text-secondary dark:text-gray-400">
            Showing {filteredStudents.length} results
          </p>
        </div>

        {/* --- CONTROLS SECTION --- */}
        <div className="flex flex-col md:flex-row gap-4 w-full xl:w-auto">
          
          {/* 3. NEW BUTTON: Register Student */}
          <button 
            onClick={() => setIsRegisterModalOpen(true)}
            className="flex items-center justify-center gap-2 bg-primary dark:bg-white text-white dark:text-primary px-6 py-3 rounded-xl text-sm font-bold shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all active:scale-95"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            Add Student
          </button>

          {/* Search Bar */}
          <div className="relative w-full md:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white dark:bg-primary border border-gray-200 dark:border-gray-800 text-primary dark:text-white rounded-xl text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20 hover:border-gray-300 dark:hover:border-gray-700 transition-all"
            />
          </div>

          {/* Filter Dropdown */}
          <div className="relative w-full md:w-64" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full flex items-center justify-between bg-white dark:bg-primary border border-gray-200 dark:border-gray-800 text-primary dark:text-white py-3 px-4 rounded-xl text-sm font-medium shadow-sm hover:border-gray-300 dark:hover:border-gray-700 transition-all"
            >
              <span>{filter}</span>
              <svg
                className={`w-4 h-4 text-secondary dark:text-gray-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-[#1A0F1E] border border-gray-100 dark:border-gray-800 rounded-xl shadow-xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                <ul className="py-1">
                  {options.map((option) => (
                    <li key={option}>
                      <button
                        onClick={() => {
                          setFilter(option);
                          setIsDropdownOpen(false);
                        }}
                        className={`w-full text-left px-4 py-3 text-sm font-medium transition-colors ${
                          filter === option
                            ? "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
                            : "text-secondary dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5"
                        }`}
                      >
                        {option}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Card Grid */}
      <div className="flex flex-wrap gap-5 justify-center sm:justify-start z-0 relative">
        {filteredStudents.map((student) => (
          <StudentCard
            key={student.id}
            name={student.name}
            role={student.role}
            rollId={student.rollId}
            attendance={student.attendance}
            image={student.image}
            onClick={() => handleCardClick(student.id)}
          />
        ))}

        {filteredStudents.length === 0 && (
          <div className="w-full py-20 flex flex-col items-center justify-center text-center text-secondary dark:text-gray-500">
            <p>No students found.</p>
          </div>
        )}
      </div>

      {/* View/Edit Modal */}
      <StudentDetailsModal
        isOpen={isModalOpen}
        studentId={selectedStudentId}
        onClose={() => setIsModalOpen(false)}
      />

      {/* 4. Register New Student Modal */}
      <RegisterStudentModal 
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
        onSave={handleRegisterStudent}
      />
    </div>
  );
}

export default Students;
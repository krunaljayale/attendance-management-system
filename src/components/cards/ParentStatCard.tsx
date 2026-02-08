"use client";

import { useEffect, useState } from "react";
import StatCard from "./StatCard";
import axios from "axios";
import { API } from "@/constants/API/api";

interface Stats {
  title: string;
  value: string;
}

// 1. Helper function to return the correct icon based on the API title
const getIconForTitle = (title: string) => {
  const t = title.toLowerCase();

  if (t.includes("student")) {
    // Icon: Users (Group)
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    );
  } else if (t.includes("present")) {
    // Icon: User Check
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="8.5" cy="7" r="4" />
        <polyline points="17 11 19 13 23 9" />
      </svg>
    );
  } else if (t.includes("absent")) {
    // Icon: User Minus/X
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="8.5" cy="7" r="4" />
        <line x1="23" y1="11" x2="17" y2="11" />
      </svg>
    );
  } else if (t.includes("leave")) {
    // Icon: Calendar / Clock
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    );
  }
  
  // Default fallback if title doesn't match
  return null;
};

function ParentStatCard() {
  const [stats, setStats] = useState<Stats[]>([]);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(API.GET_STATS, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setStats(response.data);
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (stats.length === 0) {
    // Optional: You might want to show a skeleton loader here instead of null
    return null;
  }

  return (
    <div className="grid md:grid-cols-2 grid-rows-2 gap-4 w-full">
      {stats.map((stat, index) => (
        <StatCard 
          key={index} 
          title={stat.title} 
          value={stat.value} 
          // 2. Pass the calculated icon here
          icon={getIconForTitle(stat.title)} 
        />
      ))}
    </div>
  );
}

export default ParentStatCard;
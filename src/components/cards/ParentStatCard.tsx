"use client";

import { useEffect, useState } from "react";
import StatCard from "./StatCard";
import axios from "axios";
import { API } from "@/constants/API/api";

interface Stats {
  title: string;
  value: string;
}

function ParentStatCard() {
  const [stats, setStats] = useState<Stats[]>([]);

  const fetchStats = async () => {
    try {
      // 1. Retrieve the token
      const token = localStorage.getItem("token");

      // 2. Include the Authorization header
      const response = await axios.get(API.GET_STATS, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // 3. Update state (response.data is already the JSON body in axios)
      setStats(response.data);
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (stats.length === 0) {
    return null;
  }
  return (
    <div className="grid md:grid-cols-2 grid-rows-2 gap-4 w-full">
      {stats.map((stat, index) => (
        <StatCard title={stat.title} value={stat.value} key={index} />
      ))}
    </div>
  );
}

export default ParentStatCard;

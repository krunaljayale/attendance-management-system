"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { API } from "@/constants/API/api";

interface GenderData {
  label: string;
  value: number;
  color: string;
  percentage: number;
}

const COLORS: Record<string, string> = {
  male: "#A855F7",
  female: "#F002C5",
};

export default function StudentGenderChart() {
  const [chartData, setChartData] = useState<GenderData[]>([]);
  const [totalStudents, setTotalStudents] = useState(0);
  const [loading, setLoading] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(API.GET_GENDER_STATS,{
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const rawData = response.data;

        const total = rawData.reduce(
          (acc: number, item: any) => acc + item.value,
          0,
        );
        setTotalStudents(total);

        const processedData = rawData.map((item: any) => {
          const normalizedLabel = item.label.toLowerCase();
          return {
            label: item.label,
            value: item.value,
            color: COLORS[normalizedLabel] || "#A855F7",
            percentage: total > 0 ? (item.value / total) * 100 : 0,
          };
        });

        setChartData(processedData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  let currentOffset = 0;

  const activeItem = hoveredIndex !== null ? chartData[hoveredIndex] : null;

  return (
    <div className="w-full bg-white dark:bg-primary p-5 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col items-center h-full relative overflow-hidden transition-colors duration-300">
      <div className="w-full flex justify-between items-center mb-6 z-10">
        <h3 className="text-lg font-bold text-primary dark:text-white">
          Students by Gender
        </h3>
        
      </div>

      {loading ? (
        <div className="w-full h-64 flex flex-col items-center justify-center gap-3 animate-pulse">
          <div className="w-32 h-32 rounded-full border-4 border-gray-100 dark:border-gray-800 border-t-purple-500 animate-spin"></div>
          <span className="text-xs text-gray-400">Loading demographics...</span>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row items-center justify-between w-full h-full gap-8 z-10">
          <div className="w-full md:w-1/2 flex flex-col gap-3 order-2 md:order-1">
            {chartData.map((item, index) => {
              const isHovered = hoveredIndex === index;
              const isDimmed = hoveredIndex !== null && !isHovered;

              return (
                <div
                  key={item.label}
                  className={`
                    group flex items-center justify-between p-3 rounded-2xl cursor-pointer border transition-all duration-300
                    ${
                      isHovered
                        ? "bg-gray-50 dark:bg-white/5 border-gray-100 dark:border-white/10 scale-105 shadow-sm"
                        : "bg-transparent border-transparent"
                    }
                    ${isDimmed ? "opacity-40 blur-[0.5px]" : "opacity-100"}
                  `}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onClick={() => setHoveredIndex(isHovered ? null : index)}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="w-3 h-3 rounded-full transition-all duration-300 shadow-sm"
                      style={{
                        backgroundColor: item.color,
                        boxShadow: isHovered
                          ? `0 0 10px ${item.color}`
                          : "none",
                      }}
                    ></span>
                    <span
                      className={`text-sm font-medium transition-colors ${
                        isHovered
                          ? "text-primary dark:text-white font-bold"
                          : "text-secondary dark:text-gray-400"
                      }`}
                    >
                      {item.label}
                    </span>
                  </div>

                  <span
                    className={`text-lg font-bold transition-colors ${
                      isHovered
                        ? "text-primary dark:text-white"
                        : "text-gray-400 dark:text-gray-600"
                    }`}
                  >
                    {item.value}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="w-full md:w-1/2 flex justify-center items-center relative order-1 md:order-2">
            <div className="absolute flex flex-col items-center justify-center text-center pointer-events-none">
              <span
                className={`font-bold text-primary dark:text-white transition-all duration-300 ${
                  activeItem ? "text-4xl scale-110" : "text-3xl"
                }`}
              >
                {activeItem ? activeItem.value : totalStudents}
              </span>
              <span className="text-[10px] md:text-xs text-secondary dark:text-gray-400 font-bold uppercase tracking-wider mt-1">
                {activeItem ? activeItem.label : "Total Students"}
              </span>
            </div>

            <svg
              className="w-48 h-48 md:w-52 md:h-52 transform -rotate-90 overflow-visible"
              viewBox="0 0 200 200"
            >
              <circle
                cx="100"
                cy="100"
                r={radius}
                fill="none"
                stroke="currentColor"
                className="text-gray-100 dark:text-gray-800"
                strokeWidth="14"
              />

              {chartData.map((item, index) => {
                const strokeDashoffset =
                  circumference - (item.percentage / 100) * circumference;
                const rotation = currentOffset;
                currentOffset += (item.percentage / 100) * 360;

                const isHovered = hoveredIndex === index;
                const isDimmed = hoveredIndex !== null && !isHovered;

                return (
                  <circle
                    key={index}
                    cx="100"
                    cy="100"
                    r={radius}
                    fill="none"
                    stroke={item.color}
                    strokeWidth={isHovered ? 22 : 14}
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    className={`transition-all duration-500 ease-out cursor-pointer ${
                      isDimmed ? "opacity-20" : "opacity-100"
                    }`}
                    style={{
                      transformBox: "fill-box",
                      transformOrigin: "center",
                      transform: `rotate(${rotation}deg) scale(${
                        isHovered ? 1.05 : 1
                      })`,
                      filter: isHovered
                        ? `drop-shadow(0 0 6px ${item.color}80)`
                        : "none",
                    }}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    onClick={() => setHoveredIndex(isHovered ? null : index)}
                  />
                );
              })}
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}

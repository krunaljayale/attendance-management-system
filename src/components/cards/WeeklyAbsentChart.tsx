"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { API } from "@/constants/API/api";

interface WeeklyData {
  day: string;
  value: number;
}

const MAX_VALUE = 100;
const CHART_RADIUS = 90;
const CENTER = 150;

type ViewMode = "absent" | "present";

export default function WeeklyStatChart() {
  const [chartData, setChartData] = useState<WeeklyData[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("absent");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setIsLoaded(false);
        
        const response = await axios.get(`${API.GET_WEEKLY_ATTENDANCE}/${viewMode}`,{
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        
        const formattedData = response.data.map((item: any) => ({
          day: item.day || item.label,
          value: item.value || item.count,
        }));
        
        setChartData(formattedData);
        setTimeout(() => setIsLoaded(true), 100);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [viewMode]);

  const getCoordinates = (value: number, index: number) => {
    if (chartData.length === 0) return { x: CENTER, y: CENTER };
    const angle = (Math.PI * 2 * index) / chartData.length - Math.PI / 2;
    const radius = (value / MAX_VALUE) * CHART_RADIUS;
    return {
      x: CENTER + radius * Math.cos(angle),
      y: CENTER + radius * Math.sin(angle),
    };
  };

  const polygonPoints = chartData
    .map((item, index) => {
      const { x, y } = getCoordinates(item.value, index);
      return `${x},${y}`;
    })
    .join(" ");

  const renderHexagonRing = (percentage: number) => {
    if (chartData.length === 0) return null;
    const ringPoints = chartData
      .map((_, index) => {
        const { x, y } = getCoordinates(percentage, index);
        return `${x},${y}`;
      })
      .join(" ");
    return (
      <polygon
        points={ringPoints}
        fill="none"
        className="stroke-gray-100 dark:stroke-gray-800 transition-colors"
        strokeWidth="1.5"
      />
    );
  };

  const mainColor = viewMode === 'absent' ? '#F002C5' : '#10B981';
  const bgFillColor = viewMode === 'absent' ? 'rgba(240, 2, 197, 0.1)' : 'rgba(16, 185, 129, 0.1)';

  return (
    <div className="bg-white dark:bg-[#1A0F1E] p-5 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col h-full items-center justify-between min-h-[320px] transition-colors duration-300">
      <div className="w-full flex justify-between items-center z-10 mb-4">
        <div>
          <h3 className="text-lg font-bold text-primary dark:text-white">
            Weekly {viewMode === 'absent' ? 'Absent' : 'Present'}
          </h3>
          <p className="text-xs text-secondary dark:text-gray-400">
            vs. Last Week
          </p>
        </div>

        <div className="flex bg-gray-100 dark:bg-white/5 p-1 rounded-full text-xs font-medium">
          <button
            onClick={() => setViewMode("absent")}
            className={`px-3 py-1.5 rounded-full transition-all ${
              viewMode === "absent"
                ? "bg-white dark:bg-primary text-primary dark:text-white shadow-sm"
                : "text-secondary dark:text-gray-400 hover:text-primary dark:hover:text-white"
            }`}
          >
            Absent
          </button>
          <button
            onClick={() => setViewMode("present")}
            className={`px-3 py-1.5 rounded-full transition-all ${
              viewMode === "present"
                ? "bg-white dark:bg-primary text-primary dark:text-white shadow-sm"
                : "text-secondary dark:text-gray-400 hover:text-primary dark:hover:text-white"
            }`}
          >
            Present
          </button>
        </div>
      </div>

      <div className="relative flex-1 w-full flex items-center justify-center py-4">
        {loading ? (
          <div className="w-full h-64 flex flex-col items-center justify-center gap-3 animate-pulse">
            <div className={`w-32 h-32 rounded-full border-4 border-gray-100 dark:border-gray-800 border-t-[${mainColor}] animate-spin`}></div>
            <span className="text-xs text-gray-400">Loading chart...</span>
          </div>
        ) : (
          <svg
            viewBox="0 0 300 300"
            className="w-full h-full max-w-[300px] overflow-visible"
          >
            {renderHexagonRing(100)}
            {renderHexagonRing(75)}
            {renderHexagonRing(50)}
            {renderHexagonRing(25)}

            {chartData.map((_, index) => {
              const { x, y } = getCoordinates(100, index);
              return (
                <line
                  key={index}
                  x1={CENTER}
                  y1={CENTER}
                  x2={x}
                  y2={y}
                  className="stroke-gray-100 dark:stroke-gray-800 transition-colors"
                  strokeWidth="1.5"
                />
              );
            })}

            <polygon
              points={polygonPoints}
              fill={bgFillColor}
              stroke={mainColor}
              strokeWidth="3"
              strokeLinejoin="round"
              className={`transition-all duration-1000 ease-out origin-center ${
                isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-0"
              }`}
              style={{
                filter: `drop-shadow(0 4px 6px ${mainColor}33)`,
              }}
            />

            {chartData.map((item, index) => {
              const { x, y } = getCoordinates(item.value, index);
              const labelPoint = getCoordinates(MAX_VALUE + 35, index);
              const isHovered = hoveredIndex === index;

              return (
                <g
                  key={index}
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onClick={() => setHoveredIndex(isHovered ? null : index)}
                >
                  <text
                    x={labelPoint.x}
                    y={labelPoint.y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className={`text-[12px] md:text-[14px] font-medium transition-all duration-300 ${
                      isHovered
                        ? "fill-primary dark:fill-white font-bold text-[14px]"
                        : "fill-gray-400 dark:fill-gray-500"
                    }`}
                  >
                    {item.day}
                  </text>

                  <circle cx={x} cy={y} r={20} fill="transparent" />

                  <circle
                    cx={x}
                    cy={y}
                    r={isHovered ? 6 : 4}
                    className={`transition-all duration-300 ${
                      isLoaded ? "opacity-100" : "opacity-0"
                    } ${
                      isHovered
                        ? `fill-[${mainColor}]`
                        : "fill-white dark:fill-[#1A0F1E]"
                    }`}
                    stroke={mainColor}
                    strokeWidth="2.5"
                    style={{ transitionDelay: `${index * 100}ms` }}
                  />

                  <g
                    className={`transition-all duration-300 ease-out ${
                      isHovered
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-2 pointer-events-none"
                    }`}
                    transform={`translate(${x}, ${y - 30})`}
                  >
                    <rect
                      x="-24"
                      y="-20"
                      width="48"
                      height="24"
                      rx="12"
                      className="fill-[#1A0F1E] dark:fill-white shadow-xl"
                    />
                    <text
                      x="0"
                      y="-4"
                      textAnchor="middle"
                      className="fill-white dark:fill-[#1A0F1E]"
                      fontSize="11"
                      fontWeight="bold"
                    >
                      {item.value}%
                    </text>
                    <path
                      d="M-4 4 L0 8 L4 4"
                      className="fill-[#1A0F1E] dark:fill-white"
                    />
                  </g>
                </g>
              );
            })}
          </svg>
        )}
      </div>
    </div>
  );
}
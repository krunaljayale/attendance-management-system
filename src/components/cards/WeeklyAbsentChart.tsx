'use client';

import React, { useState, useEffect } from 'react';

const DATA = [
  { day: 'Mon', value: 20 },
  { day: 'Tue', value: 45 },
  { day: 'Wed', value: 13 },
  { day: 'Thu', value: 55 },
  { day: 'Fri', value: 30 },
  { day: 'Sat', value: 40 },
];

const MAX_VALUE = 100;
const CHART_RADIUS = 90;
const CENTER = 150; 

export default function WeeklyAbsentChart() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 100);
  }, []);

  const getCoordinates = (value: number, index: number) => {
    const angle = (Math.PI * 2 * index) / DATA.length - Math.PI / 2; 
    const radius = (value / MAX_VALUE) * CHART_RADIUS;
    return {
      x: CENTER + radius * Math.cos(angle),
      y: CENTER + radius * Math.sin(angle)
    };
  };

  const polygonPoints = DATA.map((item, index) => {
    const { x, y } = getCoordinates(item.value, index);
    return `${x},${y}`;
  }).join(' ');

  const renderHexagonRing = (percentage: number) => {
    const ringPoints = DATA.map((_, index) => {
      const { x, y } = getCoordinates(percentage, index);
      return `${x},${y}`;
    }).join(' ');
    // 1. Updated Stroke for Dark Mode (removed hardcoded stroke color)
    return <polygon points={ringPoints} fill="none" className="stroke-gray-100 dark:stroke-gray-800 transition-colors" strokeWidth="1.5" />;
  };

  return (
    // 2. Container Background & Border
    <div className=" bg-white dark:bg-[#1A0F1E] p-5 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col h-full items-center justify-between min-h-[320px] transition-colors duration-300">
      
      <div className="w-full flex justify-between items-center z-10">
        {/* 3. Header Text */}
        <h3 className="text-lg font-bold text-primary dark:text-white">Weekly Absent</h3>
        <button className="p-2 rounded-full hover:bg-gray-50 dark:hover:bg-white/10 text-secondary dark:text-gray-400 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle cx="5" cy="12" r="1" />
          </svg>
        </button>
      </div>

      <div className="relative flex-1 w-full flex items-center justify-center py-4">
        <svg viewBox="0 0 300 300" className="w-full h-full max-w-[300px] overflow-visible">
          
          {/* Background Grid */}
          {renderHexagonRing(100)}
          {renderHexagonRing(75)}
          {renderHexagonRing(50)}
          {renderHexagonRing(25)}

          {/* Axis Lines */}
          {DATA.map((_, index) => {
            const { x, y } = getCoordinates(100, index);
            // 4. Axis Lines Stroke
            return <line key={index} x1={CENTER} y1={CENTER} x2={x} y2={y} className="stroke-gray-100 dark:stroke-gray-800 transition-colors" strokeWidth="1.5" />;
          })}

          {/* Animated Data Polygon */}
          <polygon
            points={polygonPoints}
            fill="rgba(240, 2, 197, 0.1)"
            stroke="#F002C5"
            strokeWidth="3"
            strokeLinejoin="round"
            className={`transition-all duration-1000 ease-out origin-center ${
              isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
            }`}
            style={{ filter: 'drop-shadow(0 4px 6px rgba(240, 2, 197, 0.2))' }}
          />

          {/* Interactive Points */}
          {DATA.map((item, index) => {
            const { x, y } = getCoordinates(item.value, index);
            const labelPoint = getCoordinates(MAX_VALUE + 30, index);
            const isHovered = hoveredIndex === index;

            return (
              <g 
                key={index} 
                className="cursor-pointer"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => setHoveredIndex(isHovered ? null : index)}
              >
                
                {/* Label */}
                {/* 5. Label Colors: Dark Gray by default, White when active in Dark Mode */}
                <text
                  x={labelPoint.x}
                  y={labelPoint.y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className={`text-[12px] md:text-[14px] font-medium transition-all duration-300 ${
                    isHovered ? 'fill-primary dark:fill-white font-bold text-[14px]' : 'fill-gray-400 dark:fill-gray-500'
                  }`}
                >
                  {item.day}
                </text>

                {/* Hit Area */}
                <circle cx={x} cy={y} r={20} fill="transparent" />

                {/* Dot */}
                {/* 6. Dot Fill: Uses classNames to switch between White (Light) and Dark Purple (Dark) when inactive */}
                <circle
                  cx={x}
                  cy={y}
                  r={isHovered ? 6 : 4}
                  // Removed hardcoded fill prop to use className for theme switching
                  className={`transition-all duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'} ${
                    isHovered ? 'fill-[#F002C5]' : 'fill-white dark:fill-[#1A0F1E]'
                  }`}
                  stroke="#F002C5"
                  strokeWidth="2.5"
                  style={{ transitionDelay: `${index * 100}ms` }}
                />

                {/* Tooltip Badge */}
                <g 
                  className={`transition-all duration-300 ease-out ${
                    isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
                  }`}
                  transform={`translate(${x}, ${y - 30})`}
                >
                  {/* 7. Tooltip Background: Inverted for high contrast */}
                  <rect 
                    x="-24" y="-20" width="48" height="24" rx="12" 
                    className="fill-[#1A0F1E] dark:fill-white shadow-xl"
                  />
                  {/* 8. Tooltip Text: Inverted */}
                  <text 
                    x="0" y="-4" 
                    textAnchor="middle" 
                    className="fill-white dark:fill-[#1A0F1E]"
                    fontSize="11" 
                    fontWeight="bold"
                  >
                    {item.value}%
                  </text>
                  {/* 9. Tooltip Arrow */}
                  <path d="M-4 4 L0 8 L4 4" className="fill-[#1A0F1E] dark:fill-white" /> 
                </g>

              </g>
            );
          })}

        </svg>
      </div>
    </div>
  );
}
"use client";

import React from "react";

interface Voyager2ModelProps {
  size?: number;
  className?: string;
  onClick?: () => void;
}

export const Voyager2Model: React.FC<Voyager2ModelProps> = ({
  size = 200,
  className = "",
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`relative inline-block select-none ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 220 220"
        className="w-full h-full drop-shadow-xl overflow-visible"
      >
        <defs>
          <radialGradient id="v2Dish" cx="45%" cy="45%" r="55%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="70%" stopColor="#E0E7FF" />
            <stop offset="100%" stopColor="#818CF8" />
          </radialGradient>
          <linearGradient id="v2Gold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FDE047" />
            <stop offset="50%" stopColor="#EAB308" />
            <stop offset="100%" stopColor="#CA8A04" />
          </linearGradient>
        </defs>

        {/* Magnetometer Boom */}
        <line x1="85" y1="120" x2="20" y2="45" stroke="#818CF8" strokeWidth="2" strokeDasharray="3 2" />
        <rect x="12" y="38" width="14" height="12" rx="2" fill="#EEF2FF" stroke="#6366F1" strokeWidth="1" />
        <circle cx="19" cy="44" r="3" fill="#818CF8" />

        {/* RTG Power Boom */}
        <line x1="125" y1="130" x2="195" y2="175" stroke="#6366F1" strokeWidth="2.5" />
        <rect x="180" y="160" width="28" height="12" rx="2" fill="#1E1B4B" stroke="#818CF8" strokeWidth="1" />
        <rect x="185" y="174" width="28" height="12" rx="2" fill="#1E1B4B" stroke="#818CF8" strokeWidth="1" />
        <circle cx="205" cy="180" r="3" fill="#C084FC" />

        {/* Bus with Voyager 2 violet styling */}
        <polygon
          points="85,100 135,100 150,135 135,150 85,150 70,135"
          fill="#0F172A"
          stroke="#818CF8"
          strokeWidth="1.5"
        />

        {/* Golden Record on Voyager 2 */}
        <circle cx="100" cy="130" r="16" fill="url(#v2Gold)" stroke="#F59E0B" strokeWidth="1.5" />
        <circle cx="100" cy="130" r="12" fill="none" stroke="#CA8A04" strokeWidth="0.8" strokeDasharray="2 1" />
        <circle cx="100" cy="130" r="4" fill="#78350F" />

        {/* Scan Platform for Neptune/Uranus imaging */}
        <g transform="translate(130, 90)">
          <rect x="0" y="0" width="22" height="18" fill="#312E81" stroke="#818CF8" strokeWidth="1" rx="2" />
          <circle cx="8" cy="9" r="5" fill="#020617" stroke="#38BDF8" strokeWidth="1" />
          <circle cx="8" cy="9" r="2" fill="#38BDF8" />
          <circle cx="17" cy="9" r="3" fill="#020617" stroke="#A855F7" strokeWidth="1" />
        </g>

        {/* 3.7m Antenna Dish */}
        <ellipse cx="110" cy="75" rx="52" ry="30" fill="url(#v2Dish)" stroke="#6366F1" strokeWidth="2" />
        <ellipse cx="110" cy="75" rx="38" ry="20" fill="none" stroke="#C7D2FE" strokeWidth="1" />
        <line x1="110" y1="75" x2="95" y2="40" stroke="#4F46E5" strokeWidth="1.5" />
        <line x1="110" y1="75" x2="125" y2="40" stroke="#4F46E5" strokeWidth="1.5" />
        <line x1="110" y1="75" x2="110" y2="35" stroke="#4F46E5" strokeWidth="1.5" />
        <ellipse cx="110" cy="38" rx="8" ry="4" fill="#1E1B4B" stroke="#818CF8" strokeWidth="1" />
      </svg>
    </div>
  );
};

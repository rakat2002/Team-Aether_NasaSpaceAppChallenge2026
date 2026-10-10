"use client";

import React from "react";

interface SpiritModelProps {
  size?: number;
  className?: string;
  onClick?: () => void;
}

export const SpiritModel: React.FC<SpiritModelProps> = ({
  size = 220,
  className = "",
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`relative inline-block select-none ${className}`}
      style={{ width: size, height: size * 0.85 }}
    >
      <svg viewBox="0 0 300 250" className="w-full h-full drop-shadow-xl overflow-visible">
        <defs>
          <linearGradient id="spiritSolar" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#7F1D1D" />
            <stop offset="50%" stopColor="#991B1B" />
            <stop offset="100%" stopColor="#450A0A" />
          </linearGradient>
          <linearGradient id="spiritWheel" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#374151" />
            <stop offset="50%" stopColor="#4B5563" />
            <stop offset="100%" stopColor="#1F2937" />
          </linearGradient>
        </defs>

        {/* Rocker-Bogie Legs */}
        <g stroke="#6B7280" strokeWidth="4" strokeLinecap="round">
          <path d="M125 155 L75 170 L55 200" />
          <path d="M175 155 L225 170 L245 200" />
        </g>

        {/* Rear Wheels */}
        <rect x="42" y="185" width="22" height="30" rx="6" fill="url(#spiritWheel)" stroke="#9CA3AF" strokeWidth="1.5" />
        <rect x="236" y="185" width="22" height="30" rx="6" fill="url(#spiritWheel)" stroke="#9CA3AF" strokeWidth="1.5" />

        {/* Camera Mast */}
        <line x1="130" y1="120" x2="130" y2="35" stroke="#9CA3AF" strokeWidth="4" />
        <rect x="112" y="26" width="36" height="14" rx="4" fill="#374151" stroke="#F43F5E" strokeWidth="1.5" />
        <circle cx="118" cy="33" r="4.5" fill="#111827" stroke="#F43F5E" strokeWidth="1.5" />
        <circle cx="142" cy="33" r="4.5" fill="#111827" stroke="#F43F5E" strokeWidth="1.5" />

        {/* Antenna Dish */}
        <ellipse cx="188" cy="65" rx="20" ry="12" fill="#E5E7EB" stroke="#6B7280" strokeWidth="1.5" />
        <line x1="188" y1="65" x2="196" y2="50" stroke="#F43F5E" strokeWidth="2" />

        {/* Solar Wings (Dusty pinkish reddish Mars dust layer!) */}
        <polygon points="25,70 110,70 110,126 25,126" fill="url(#spiritSolar)" stroke="#F43F5E" strokeWidth="1.5" />
        <polygon points="190,70 275,70 275,126 190,126" fill="url(#spiritSolar)" stroke="#F43F5E" strokeWidth="1.5" />
        {/* Dust Layer Speckles */}
        <circle cx="60" cy="85" r="8" fill="#F87171" opacity="0.3" />
        <circle cx="230" cy="105" r="10" fill="#F87171" opacity="0.3" />

        {/* Chassis */}
        <polygon points="105,100 195,100 210,160 90,160" fill="#D97706" stroke="#92400E" strokeWidth="1.5" />

        {/* Front Wheels */}
        <rect x="68" y="195" width="22" height="32" rx="6" fill="url(#spiritWheel)" stroke="#9CA3AF" strokeWidth="1.5" />
        <rect x="76" y="210" width="22" height="32" rx="6" fill="url(#spiritWheel)" stroke="#9CA3AF" strokeWidth="1.5" />
        <rect x="210" y="195" width="22" height="32" rx="6" fill="url(#spiritWheel)" stroke="#9CA3AF" strokeWidth="1.5" />

        {/* The Famous Stuck Wheel (Highlighted in pink/gold glow!) */}
        <rect x="202" y="210" width="22" height="32" rx="6" fill="#991B1B" stroke="#FBBF24" strokeWidth="2" />
        {/* Silica trench churned up behind stuck wheel */}
        <path d="M224 235 Q245 238 260 230" stroke="#FFFFFF" strokeWidth="3" strokeDasharray="3 2" />
      </svg>
    </div>
  );
};

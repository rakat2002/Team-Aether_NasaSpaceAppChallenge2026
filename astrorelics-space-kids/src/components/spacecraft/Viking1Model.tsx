"use client";

import React from "react";

interface Viking1ModelProps {
  size?: number;
  className?: string;
  onClick?: () => void;
}

export const Viking1Model: React.FC<Viking1ModelProps> = ({
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
      <svg viewBox="0 0 220 220" className="w-full h-full drop-shadow-xl overflow-visible">
        <defs>
          <linearGradient id="vikingBody" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E2E8F0" />
            <stop offset="60%" stopColor="#94A3B8" />
            <stop offset="100%" stopColor="#475569" />
          </linearGradient>
          <linearGradient id="vikingRTG" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#F97316" />
            <stop offset="50%" stopColor="#C2410C" />
            <stop offset="100%" stopColor="#7C2D12" />
          </linearGradient>
        </defs>

        {/* 3 Landing Legs */}
        <g stroke="#64748B" strokeWidth="3" strokeLinecap="round">
          {/* Left Leg */}
          <line x1="70" y1="130" x2="30" y2="185" />
          <ellipse cx="30" cy="188" rx="14" ry="4" fill="#94A3B8" stroke="#334155" strokeWidth="1" />

          {/* Right Leg */}
          <line x1="150" y1="130" x2="190" y2="185" />
          <ellipse cx="190" cy="188" rx="14" ry="4" fill="#94A3B8" stroke="#334155" strokeWidth="1" />

          {/* Center Leg */}
          <line x1="110" y1="140" x2="110" y2="195" />
          <ellipse cx="110" cy="198" rx="14" ry="4" fill="#94A3B8" stroke="#334155" strokeWidth="1" />
        </g>

        {/* Main Hexagonal Lander Body */}
        <polygon
          points="65,110 155,110 170,145 50,145"
          fill="url(#vikingBody)"
          stroke="#334155"
          strokeWidth="1.5"
        />

        {/* 2 Cylindrical Camera Towers */}
        <rect x="75" y="70" width="14" height="40" rx="3" fill="#334155" stroke="#CBD5E1" strokeWidth="1" />
        <circle cx="82" cy="78" r="3" fill="#00F0FF" />

        <rect x="131" y="70" width="14" height="40" rx="3" fill="#334155" stroke="#CBD5E1" strokeWidth="1" />
        <circle cx="138" cy="78" r="3" fill="#00F0FF" />

        {/* High Gain S-Band Dish Antenna */}
        <ellipse cx="110" cy="85" rx="20" ry="12" fill="#F8FAFC" stroke="#64748B" strokeWidth="1.5" />
        <line x1="110" y1="85" x2="110" y2="70" stroke="#F97316" strokeWidth="2" />
        <circle cx="110" cy="70" r="2.5" fill="#FBBF24" />

        {/* SNAP-19 RTG Nuclear Generator covers on side */}
        <rect x="52" y="115" width="20" height="20" rx="3" fill="url(#vikingRTG)" stroke="#EA580C" strokeWidth="1" />
        <rect x="148" y="115" width="20" height="20" rx="3" fill="url(#vikingRTG)" stroke="#EA580C" strokeWidth="1" />

        {/* Extendable Soil Sampler Boom (scoops Martian dirt!) */}
        <line x1="125" y1="140" x2="175" y2="170" stroke="#E2E8F0" strokeWidth="3" strokeLinecap="round" />
        {/* Sample scoop claw */}
        <path d="M175 170 L185 175 L180 180 Z" fill="#F59E0B" stroke="#B45309" strokeWidth="1" />
      </svg>
    </div>
  );
};

"use client";

import React from "react";

interface Voyager1ModelProps {
  size?: number;
  className?: string;
  onClick?: () => void;
}

export const Voyager1Model: React.FC<Voyager1ModelProps> = ({
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
          <radialGradient id="voyagerDish" cx="45%" cy="45%" r="55%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="70%" stopColor="#E2E8F0" />
            <stop offset="100%" stopColor="#94A3B8" />
          </radialGradient>
          <linearGradient id="goldenRecord" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FDE047" />
            <stop offset="50%" stopColor="#EAB308" />
            <stop offset="100%" stopColor="#CA8A04" />
          </linearGradient>
          <linearGradient id="rtgFins" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#334155" />
            <stop offset="50%" stopColor="#0F172A" />
            <stop offset="100%" stopColor="#334155" />
          </linearGradient>
        </defs>

        {/* ================= MAGNETOMETER BOOM (Extends far left/up) ================= */}
        <g stroke="#94A3B8" strokeWidth="1.5">
          <line x1="85" y1="120" x2="15" y2="40" strokeWidth="2" strokeDasharray="3 2" />
          {/* Magnetometer sensor canister */}
          <rect x="8" y="32" width="14" height="12" rx="2" fill="#E2E8F0" stroke="#475569" strokeWidth="1" />
          <circle cx="15" cy="38" r="3" fill="#00F0FF" />
        </g>

        {/* ================= RTG BOOM (Nuclear Power - Extends right/down) ================= */}
        <g stroke="#64748B" strokeWidth="2.5">
          <line x1="125" y1="130" x2="190" y2="175" />
          {/* 3 RTG Nuclear Cylinders */}
          <rect x="175" y="160" width="28" height="12" rx="2" fill="url(#rtgFins)" stroke="#94A3B8" strokeWidth="1" />
          <rect x="180" y="174" width="28" height="12" rx="2" fill="url(#rtgFins)" stroke="#94A3B8" strokeWidth="1" />
          <rect x="185" y="188" width="28" height="12" rx="2" fill="url(#rtgFins)" stroke="#94A3B8" strokeWidth="1" />
          {/* Radioactive heat glow */}
          <circle cx="205" cy="180" r="3" fill="#F59E0B" />
        </g>

        {/* ================= CENTRAL 10-SIDED BUS ================= */}
        <polygon
          points="85,100 135,100 150,135 135,150 85,150 70,135"
          fill="#1E293B"
          stroke="#00F0FF"
          strokeWidth="1.5"
        />

        {/* ================= THE FAMOUS GOLDEN RECORD ================= */}
        {/* Mounted on the side of the bus */}
        <g className="transition-transform duration-300 hover:scale-110 origin-center cursor-pointer">
          <circle cx="100" cy="130" r="16" fill="url(#goldenRecord)" stroke="#F59E0B" strokeWidth="1.5" />
          <circle cx="100" cy="130" r="12" fill="none" stroke="#CA8A04" strokeWidth="0.8" strokeDasharray="2 1" />
          <circle cx="100" cy="130" r="4" fill="#78350F" />
          {/* Engraved Pulsar Map & Hydrogen atom diagrams */}
          <line x1="92" y1="125" x2="108" y2="135" stroke="#78350F" strokeWidth="0.8" />
          <line x1="92" y1="135" x2="108" y2="125" stroke="#78350F" strokeWidth="0.8" />
          <line x1="96" y1="121" x2="104" y2="139" stroke="#78350F" strokeWidth="0.8" />
        </g>

        {/* ================= SCIENCE SCAN PLATFORM (CAMERAS) ================= */}
        <g transform="translate(130, 90)">
          <rect x="0" y="0" width="22" height="18" fill="#475569" stroke="#CBD5E1" strokeWidth="1" rx="2" />
          {/* Narrow-angle camera lens */}
          <circle cx="8" cy="9" r="5" fill="#0F172A" stroke="#00F0FF" strokeWidth="1" />
          <circle cx="8" cy="9" r="2" fill="#38BDF8" />
          {/* Wide-angle camera lens */}
          <circle cx="17" cy="9" r="3" fill="#0F172A" stroke="#F59E0B" strokeWidth="1" />
        </g>

        {/* ================= 3.7M HIGH GAIN DISH ANTENNA ================= */}
        {/* Main Dish Ellipse */}
        <ellipse
          cx="110"
          cy="75"
          rx="52"
          ry="30"
          fill="url(#voyagerDish)"
          stroke="#475569"
          strokeWidth="2"
        />
        {/* Concentric parabolic contours */}
        <ellipse cx="110" cy="75" rx="38" ry="20" fill="none" stroke="#CBD5E1" strokeWidth="1" />
        <ellipse cx="110" cy="75" rx="22" ry="11" fill="none" stroke="#CBD5E1" strokeWidth="1" />

        {/* Sub-reflector tripod struts */}
        <line x1="110" y1="75" x2="95" y2="40" stroke="#64748B" strokeWidth="1.5" />
        <line x1="110" y1="75" x2="125" y2="40" stroke="#64748B" strokeWidth="1.5" />
        <line x1="110" y1="75" x2="110" y2="35" stroke="#64748B" strokeWidth="1.5" />

        {/* Sub-reflector apex cone */}
        <ellipse cx="110" cy="38" rx="8" ry="4" fill="#1E293B" stroke="#00F0FF" strokeWidth="1" />
        {/* Radio signal emit wave icon */}
        <path d="M102 30 Q110 24 118 30" fill="none" stroke="#00F0FF" strokeWidth="1.5" className="animate-pulse" />
        <path d="M96 22 Q110 14 124 22" fill="none" stroke="#00F0FF" strokeWidth="1" opacity="0.6" className="animate-pulse" />
      </svg>
    </div>
  );
};

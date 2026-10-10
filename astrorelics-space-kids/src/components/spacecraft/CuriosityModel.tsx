"use client";

import React from "react";

interface CuriosityModelProps {
  size?: number;
  className?: string;
  onClick?: () => void;
}

export const CuriosityModel: React.FC<CuriosityModelProps> = ({
  size = 240,
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
          <linearGradient id="curChassis" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F1F5F9" />
            <stop offset="60%" stopColor="#CBD5E1" />
            <stop offset="100%" stopColor="#64748B" />
          </linearGradient>
          <linearGradient id="curWheel" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1E293B" />
            <stop offset="50%" stopColor="#475569" />
            <stop offset="100%" stopColor="#0F172A" />
          </linearGradient>
          <linearGradient id="mmrtgFins" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10B981" />
            <stop offset="50%" stopColor="#047857" />
            <stop offset="100%" stopColor="#064E3B" />
          </linearGradient>
        </defs>

        {/* Rocker-Bogie Suspension */}
        <g stroke="#475569" strokeWidth="4" strokeLinecap="round">
          <path d="M125 155 L65 170 L45 205" />
          <path d="M175 155 L235 170 L255 205" />
        </g>

        {/* Back Wheels */}
        <rect x="35" y="190" width="24" height="34" rx="6" fill="url(#curWheel)" stroke="#94A3B8" strokeWidth="1.5" />
        <rect x="245" y="190" width="24" height="34" rx="6" fill="url(#curWheel)" stroke="#94A3B8" strokeWidth="1.5" />

        {/* MMRTG Nuclear Power Battery (Cylindrical generator at the rear with cooling fins) */}
        <g transform="translate(195, 110) rotate(-20)">
          <rect x="0" y="0" width="40" height="20" rx="4" fill="url(#mmrtgFins)" stroke="#34D399" strokeWidth="1.5" />
          {/* Cooling fin ribs */}
          <line x1="8" y1="0" x2="8" y2="20" stroke="#064E3B" strokeWidth="2" />
          <line x1="16" y1="0" x2="16" y2="20" stroke="#064E3B" strokeWidth="2" />
          <line x1="24" y1="0" x2="24" y2="20" stroke="#064E3B" strokeWidth="2" />
          <line x1="32" y1="0" x2="32" y2="20" stroke="#064E3B" strokeWidth="2" />
          {/* Heat warning glow */}
          <circle cx="20" cy="10" r="3" fill="#10B981" />
        </g>

        {/* ChemCam Mast & Laser Eye */}
        <line x1="110" y1="120" x2="110" y2="25" stroke="#64748B" strokeWidth="5" />
        {/* Remote Sensing Mast Head */}
        <rect x="92" y="15" width="38" height="22" rx="4" fill="#1E293B" stroke="#10B981" strokeWidth="2" />
        {/* ChemCam Laser Aperture (Giant glowing green/cyan eye) */}
        <circle cx="104" cy="26" r="6" fill="#0F172A" stroke="#10B981" strokeWidth="2" />
        <circle cx="104" cy="26" r="2.5" fill="#34D399" />
        {/* Mastcam Left & Right stereo cameras */}
        <circle cx="120" cy="22" r="3" fill="#E2E8F0" />
        <circle cx="120" cy="30" r="3" fill="#E2E8F0" />

        {/* Main Rover Body Box */}
        <polygon
          points="80,110 210,110 220,165 70,165"
          fill="url(#curChassis)"
          stroke="#475569"
          strokeWidth="1.5"
        />
        {/* Deck Equipment covers */}
        <rect x="95" y="125" width="90" height="30" rx="3" fill="#334155" />
        {/* High Gain Hexagonal Dish */}
        <polygon points="160,95 175,95 182,108 175,120 160,120 153,108" fill="#F8FAFC" stroke="#64748B" strokeWidth="1" />

        {/* Heavy Robotic Arm */}
        <g stroke="#94A3B8" strokeWidth="4" strokeLinecap="round">
          <line x1="90" y1="160" x2="70" y2="190" />
          <line x1="70" y1="190" x2="90" y2="225" />
          {/* 30kg Turret head with rock drill */}
          <circle cx="90" cy="225" r="9" fill="#1E293B" stroke="#10B981" strokeWidth="2" />
          <line x1="95" y1="229" x2="105" y2="236" stroke="#F59E0B" strokeWidth="3" />
        </g>

        {/* Front Middle Wheels */}
        <rect x="62" y="195" width="24" height="34" rx="6" fill="url(#curWheel)" stroke="#CBD5E1" strokeWidth="1.5" />
        <rect x="74" y="210" width="24" height="34" rx="6" fill="url(#curWheel)" stroke="#CBD5E1" strokeWidth="1.5" />

        <rect x="215" y="195" width="24" height="34" rx="6" fill="url(#curWheel)" stroke="#CBD5E1" strokeWidth="1.5" />
        <rect x="203" y="210" width="24" height="34" rx="6" fill="url(#curWheel)" stroke="#CBD5E1" strokeWidth="1.5" />
      </svg>
    </div>
  );
};

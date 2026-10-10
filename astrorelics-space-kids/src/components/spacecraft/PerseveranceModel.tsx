"use client";

import React from "react";

interface PerseveranceModelProps {
  size?: number;
  className?: string;
  onClick?: () => void;
}

export const PerseveranceModel: React.FC<PerseveranceModelProps> = ({
  size = 250,
  className = "",
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`relative inline-block select-none ${className}`}
      style={{ width: size, height: size * 0.9 }}
    >
      <svg viewBox="0 0 320 260" className="w-full h-full drop-shadow-xl overflow-visible">
        <defs>
          <linearGradient id="percyChassis" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="50%" stopColor="#E2E8F0" />
            <stop offset="100%" stopColor="#94A3B8" />
          </linearGradient>
          <linearGradient id="ginnySolar" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1E3A8A" />
            <stop offset="100%" stopColor="#0F172A" />
          </linearGradient>
        </defs>

        {/* ================= INGENUITY MARS HELICOPTER (HOVERING ABOVE) ================= */}
        <g transform="translate(230, 20)" className="animate-bounce">
          {/* Helicopter Solar Cell on top */}
          <rect x="-10" y="0" width="20" height="6" rx="1" fill="url(#ginnySolar)" stroke="#38BDF8" strokeWidth="1" />
          {/* Mast */}
          <line x1="0" y1="6" x2="0" y2="35" stroke="#475569" strokeWidth="2" />
          {/* Top Carbon Rotor Blades */}
          <ellipse cx="0" cy="12" rx="30" ry="2" fill="#0F172A" stroke="#38BDF8" strokeWidth="0.8" />
          {/* Bottom Counter-Rotating Rotor Blades */}
          <ellipse cx="0" cy="18" rx="28" ry="2" fill="#0F172A" stroke="#38BDF8" strokeWidth="0.8" />
          {/* Fuselage Cube (Contains battery and phone processor) */}
          <rect x="-8" y="24" width="16" height="14" rx="2" fill="#E2E8F0" stroke="#0284C7" strokeWidth="1.5" />
          <circle cx="0" cy="31" r="2" fill="#EF4444" />
          {/* 4 Carbon Fiber Landing Legs */}
          <line x1="-6" y1="36" x2="-16" y2="48" stroke="#475569" strokeWidth="1.5" />
          <line x1="6" y1="36" x2="16" y2="48" stroke="#475569" strokeWidth="1.5" />
          <line x1="-3" y1="36" x2="-8" y2="46" stroke="#475569" strokeWidth="1" />
          <line x1="3" y1="36" x2="8" y2="46" stroke="#475569" strokeWidth="1" />
        </g>

        {/* ================= PERSEVERANCE ROVER BODY ================= */}
        {/* Rocker-Bogie Legs */}
        <g stroke="#475569" strokeWidth="4" strokeLinecap="round">
          <path d="M125 160 L65 175 L45 210" />
          <path d="M175 160 L235 175 L255 210" />
        </g>

        {/* Back Wheels */}
        <rect x="35" y="195" width="24" height="34" rx="6" fill="#1E293B" stroke="#38BDF8" strokeWidth="1.5" />
        <rect x="245" y="195" width="24" height="34" rx="6" fill="#1E293B" stroke="#38BDF8" strokeWidth="1.5" />

        {/* MMRTG Nuclear Power at rear */}
        <g transform="translate(195, 115) rotate(-20)">
          <rect x="0" y="0" width="38" height="18" rx="3" fill="#334155" stroke="#38BDF8" strokeWidth="1.2" />
          <line x1="10" y1="0" x2="10" y2="18" stroke="#0F172A" strokeWidth="2" />
          <line x1="20" y1="0" x2="20" y2="18" stroke="#0F172A" strokeWidth="2" />
        </g>

        {/* SuperCam Mast with Microphone */}
        <line x1="110" y1="125" x2="110" y2="35" stroke="#64748B" strokeWidth="5" />
        <rect x="92" y="24" width="38" height="22" rx="4" fill="#0F172A" stroke="#38BDF8" strokeWidth="2" />
        <circle cx="104" cy="35" r="6" fill="#0284C7" stroke="#38BDF8" strokeWidth="2" />
        <circle cx="104" cy="35" r="2.5" fill="#FFFFFF" />
        {/* SuperCam Microphone ear */}
        <rect x="88" y="32" width="4" height="6" fill="#F43F5E" rx="1" />

        {/* Main Rover Body */}
        <polygon
          points="80,115 210,115 220,170 70,170"
          fill="url(#percyChassis)"
          stroke="#475569"
          strokeWidth="1.5"
        />

        {/* MOXIE Oxygen Generator Block on deck */}
        <rect x="130" y="125" width="25" height="20" rx="2" fill="#E0F2FE" stroke="#0284C7" strokeWidth="1.2" />
        <line x1="134" y1="130" x2="151" y2="130" stroke="#0284C7" strokeWidth="1" />
        <line x1="134" y1="135" x2="151" y2="135" stroke="#0284C7" strokeWidth="1" />
        <circle cx="148" cy="140" r="1.5" fill="#10B981" />

        {/* Sample Caching Drill Arm with SHERLOC */}
        <g stroke="#94A3B8" strokeWidth="4" strokeLinecap="round">
          <line x1="90" y1="165" x2="70" y2="195" />
          <line x1="70" y1="195" x2="90" y2="230" />
          <circle cx="90" cy="230" r="9" fill="#0F172A" stroke="#F43F5E" strokeWidth="2" />
          {/* Sample test tube carousel */}
          <line x1="95" y1="234" x2="105" y2="242" stroke="#F59E0B" strokeWidth="3" />
        </g>

        {/* Front Wheels */}
        <rect x="62" y="200" width="24" height="34" rx="6" fill="#1E293B" stroke="#94A3B8" strokeWidth="1.5" />
        <rect x="74" y="215" width="24" height="34" rx="6" fill="#1E293B" stroke="#94A3B8" strokeWidth="1.5" />

        <rect x="215" y="200" width="24" height="34" rx="6" fill="#1E293B" stroke="#94A3B8" strokeWidth="1.5" />
        <rect x="203" y="215" width="24" height="34" rx="6" fill="#1E293B" stroke="#94A3B8" strokeWidth="1.5" />
      </svg>
    </div>
  );
};

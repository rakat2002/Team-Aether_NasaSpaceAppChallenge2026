"use client";

import React from "react";

interface Apollo11ModelProps {
  size?: number;
  className?: string;
  onClick?: () => void;
}

export const Apollo11Model: React.FC<Apollo11ModelProps> = ({
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
        viewBox="0 0 200 200"
        className="w-full h-full drop-shadow-xl overflow-visible"
      >
        <defs>
          <linearGradient id="apolloGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FDE047" />
            <stop offset="40%" stopColor="#EAB308" />
            <stop offset="100%" stopColor="#A16207" />
          </linearGradient>
          <linearGradient id="apolloSilver" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#F8FAFC" />
            <stop offset="50%" stopColor="#CBD5E1" />
            <stop offset="100%" stopColor="#64748B" />
          </linearGradient>
          <linearGradient id="apolloBlack" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1E293B" />
            <stop offset="100%" stopColor="#020617" />
          </linearGradient>
        </defs>

        {/* ================= LANDING GEAR (4 LEGS & DISH FOOTPADS) ================= */}
        <g stroke="#94A3B8" strokeWidth="3" strokeLinecap="round">
          {/* Left Outrigger Leg */}
          <line x1="60" y1="120" x2="20" y2="175" />
          <line x1="45" y1="145" x2="20" y2="175" strokeWidth="2" />
          {/* Left Footpad Dish */}
          <ellipse cx="20" cy="178" rx="14" ry="4" fill="url(#apolloGold)" stroke="#A16207" strokeWidth="1" />

          {/* Right Outrigger Leg */}
          <line x1="140" y1="120" x2="180" y2="175" />
          <line x1="155" y1="145" x2="180" y2="175" strokeWidth="2" />
          {/* Right Footpad Dish */}
          <ellipse cx="180" cy="178" rx="14" ry="4" fill="url(#apolloGold)" stroke="#A16207" strokeWidth="1" />

          {/* Front Center-Left Leg with Ladder */}
          <line x1="85" y1="130" x2="65" y2="185" />
          <ellipse cx="65" cy="188" rx="12" ry="4" fill="url(#apolloGold)" stroke="#A16207" strokeWidth="1" />
          {/* Astronaut Ladder Rungs */}
          <line x1="83" y1="135" x2="80" y2="135" stroke="#CBD5E1" strokeWidth="1.5" />
          <line x1="80" y1="145" x2="77" y2="145" stroke="#CBD5E1" strokeWidth="1.5" />
          <line x1="76" y1="155" x2="73" y2="155" stroke="#CBD5E1" strokeWidth="1.5" />
          <line x1="72" y1="165" x2="69" y2="165" stroke="#CBD5E1" strokeWidth="1.5" />
          <line x1="68" y1="175" x2="65" y2="175" stroke="#CBD5E1" strokeWidth="1.5" />

          {/* Front Center-Right Leg */}
          <line x1="115" y1="130" x2="135" y2="185" />
          <ellipse cx="135" cy="188" rx="12" ry="4" fill="url(#apolloGold)" stroke="#A16207" strokeWidth="1" />

          {/* Descent Engine Bell in center underneath */}
          <polygon points="90,135 110,135 116,155 84,155" fill="url(#apolloBlack)" stroke="#475569" strokeWidth="1" />
        </g>

        {/* ================= DESCENT STAGE (GOLD MYLAR OCTAGON) ================= */}
        <polygon
          points="55,100 145,100 155,135 45,135"
          fill="url(#apolloGold)"
          stroke="#B45309"
          strokeWidth="1.5"
        />
        {/* Wrinkled foil texture lines */}
        <line x1="65" y1="105" x2="68" y2="130" stroke="#CA8A04" strokeWidth="1" />
        <line x1="90" y1="102" x2="88" y2="132" stroke="#CA8A04" strokeWidth="1" />
        <line x1="110" y1="102" x2="112" y2="132" stroke="#CA8A04" strokeWidth="1" />
        <line x1="135" y1="105" x2="132" y2="130" stroke="#CA8A04" strokeWidth="1" />

        {/* Plaque on front descent stage leg */}
        <rect x="92" y="115" width="16" height="10" fill="#E2E8F0" stroke="#1E293B" strokeWidth="0.8" rx="1" />
        <line x1="94" y1="118" x2="106" y2="118" stroke="#334155" strokeWidth="0.8" />
        <line x1="94" y1="121" x2="106" y2="121" stroke="#334155" strokeWidth="0.8" />

        {/* ================= ASCENT STAGE (CREW CABIN & COCKPIT) ================= */}
        {/* Main Cabin Geometric Shell */}
        <polygon
          points="62,70 80,48 120,48 138,70 142,98 58,98"
          fill="url(#apolloSilver)"
          stroke="#334155"
          strokeWidth="1.5"
        />

        {/* Front Inward Triangular Windows */}
        <polygon points="85,60 96,60 93,72 82,72" fill="#0F172A" stroke="#00F0FF" strokeWidth="1" />
        <polygon points="104,60 115,60 118,72 107,72" fill="#0F172A" stroke="#00F0FF" strokeWidth="1" />

        {/* Forward Egress Square Hatch (where Neil stepped out!) */}
        <rect x="88" y="78" width="24" height="20" fill="url(#apolloBlack)" stroke="#E2E8F0" strokeWidth="1.2" rx="2" />
        <circle cx="108" cy="88" r="1.5" fill="#EF4444" />

        {/* Reaction Control System (RCS) Quad Thruster Clusters */}
        {/* Left RCS */}
        <g transform="translate(54, 76)">
          <circle cx="0" cy="0" r="3" fill="#475569" />
          <line x1="0" y1="0" x2="-8" y2="0" stroke="#EF4444" strokeWidth="1.5" />
          <line x1="0" y1="0" x2="0" y2="-8" stroke="#EF4444" strokeWidth="1.5" />
          <line x1="0" y1="0" x2="0" y2="8" stroke="#EF4444" strokeWidth="1.5" />
        </g>
        {/* Right RCS */}
        <g transform="translate(146, 76)">
          <circle cx="0" cy="0" r="3" fill="#475569" />
          <line x1="0" y1="0" x2="8" y2="0" stroke="#EF4444" strokeWidth="1.5" />
          <line x1="0" y1="0" x2="0" y2="-8" stroke="#EF4444" strokeWidth="1.5" />
          <line x1="0" y1="0" x2="0" y2="8" stroke="#EF4444" strokeWidth="1.5" />
        </g>

        {/* Top Rendezvous Radar Antenna & Docking Tunnel */}
        <rect x="94" y="40" width="12" height="8" fill="#475569" rx="2" />
        <ellipse cx="114" cy="38" rx="8" ry="5" fill="#E2E8F0" stroke="#64748B" strokeWidth="1" />
        <line x1="114" y1="38" x2="114" y2="48" stroke="#94A3B8" strokeWidth="2" />
      </svg>
    </div>
  );
};

"use client";

import React, { useState } from "react";
import { soundEngine } from "@/lib/audio";

interface OpportunityModelProps {
  size?: number;
  interactive?: boolean;
  onPartClick?: (partId: string, partName: string, description: string) => void;
  onSolarPowerClick?: () => void;
  onClick?: () => void;
  showLabels?: boolean;
  className?: string;
}

export const OpportunityModel: React.FC<OpportunityModelProps> = ({
  size = 280,
  interactive = true,
  onPartClick,
  onSolarPowerClick,
  onClick,
  showLabels = false,
  className = "",
}) => {
  const [hoveredPart, setHoveredPart] = useState<string | null>(null);
  const [hoveredCellIndex, setHoveredCellIndex] = useState<number | null>(null);
  const [activePhotonAnimation, setActivePhotonAnimation] = useState(false);

  // 12 individual solar cells on each wing
  const solarCellsLeft = [
    { x: 30, y: 75, w: 18, h: 22 },
    { x: 50, y: 75, w: 18, h: 22 },
    { x: 70, y: 75, w: 18, h: 22 },
    { x: 90, y: 75, w: 18, h: 22 },
    { x: 30, y: 100, w: 18, h: 22 },
    { x: 50, y: 100, w: 18, h: 22 },
    { x: 70, y: 100, w: 18, h: 22 },
    { x: 90, y: 100, w: 18, h: 22 },
  ];

  const solarCellsRight = [
    { x: 192, y: 75, w: 18, h: 22 },
    { x: 212, y: 75, w: 18, h: 22 },
    { x: 232, y: 75, w: 18, h: 22 },
    { x: 252, y: 75, w: 18, h: 22 },
    { x: 192, y: 100, w: 18, h: 22 },
    { x: 212, y: 100, w: 18, h: 22 },
    { x: 232, y: 100, w: 18, h: 22 },
    { x: 252, y: 100, w: 18, h: 22 },
  ];

  const handleCellHover = (index: number) => {
    setHoveredCellIndex(index);
    soundEngine.playSolarPhoton();
  };

  const handleSolarClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActivePhotonAnimation(true);
    soundEngine.playSuccess();
    if (onSolarPowerClick) {
      onSolarPowerClick();
    } else if (onPartClick) {
      onPartClick(
        "solar_wings",
        "Solar Wings (Photovoltaic Cells)",
        "Sunlight → Electricity → Exploration! These silicon cells soak up sunbeams to power Opportunity's motors and computers."
      );
    }
    setTimeout(() => setActivePhotonAnimation(false), 2500);
  };

  const handlePartClick = (
    e: React.MouseEvent,
    id: string,
    name: string,
    desc: string
  ) => {
    e.stopPropagation();
    soundEngine.playClick();
    if (onPartClick) {
      onPartClick(id, name, desc);
    }
  };

  return (
    <div
      onClick={onClick}
      className={`relative inline-block select-none ${className}`}
      style={{ width: size, height: size * 0.85 }}
    >
      <svg
        viewBox="0 0 300 250"
        className="w-full h-full drop-shadow-2xl overflow-visible"
      >
        <defs>
          {/* Metallic Gradients */}
          <linearGradient id="oppMetalBody" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E2E8F0" />
            <stop offset="50%" stopColor="#94A3B8" />
            <stop offset="100%" stopColor="#64748B" />
          </linearGradient>

          <linearGradient id="oppGoldFoil" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FDE047" />
            <stop offset="40%" stopColor="#EAB308" />
            <stop offset="100%" stopColor="#CA8A04" />
          </linearGradient>

          {/* Solar Panel Deep Silicon Blue */}
          <linearGradient id="oppSolarGlass" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1E3A8A" />
            <stop offset="50%" stopColor="#172554" />
            <stop offset="100%" stopColor="#0B132B" />
          </linearGradient>

          {/* Active Glowing Cell */}
          <linearGradient id="oppActiveCell" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00F0FF" />
            <stop offset="50%" stopColor="#38BDF8" />
            <stop offset="100%" stopColor="#0284C7" />
          </linearGradient>

          {/* Wheel Cleat Pattern */}
          <linearGradient id="oppWheelGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#334155" />
            <stop offset="30%" stopColor="#64748B" />
            <stop offset="70%" stopColor="#475569" />
            <stop offset="100%" stopColor="#1E293B" />
          </linearGradient>

          {/* Antenna Dish Gradient */}
          <radialGradient id="oppDishGrad" cx="40%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="60%" stopColor="#CBD5E1" />
            <stop offset="100%" stopColor="#64748B" />
          </radialGradient>

          {/* Glow Filters */}
          <filter id="solarGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          <filter id="heroAura" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Ambient Hero Glow Aura */}
        <ellipse
          cx="150"
          cy="150"
          rx="125"
          ry="75"
          fill="rgba(0, 240, 255, 0.08)"
          filter="url(#heroAura)"
        />

        {/* ================= BACKGROUND ROCKER-BOGIE LEGS ================= */}
        <g stroke="#475569" strokeWidth="4" strokeLinecap="round">
          {/* Left rear suspension arm */}
          <path d="M125 155 L75 170 L55 200" />
          {/* Right rear suspension arm */}
          <path d="M175 155 L225 170 L245 200" />
          {/* Middle rocker pivots */}
          <circle cx="120" cy="155" r="4" fill="#94A3B8" />
          <circle cx="180" cy="155" r="4" fill="#94A3B8" />
        </g>

        {/* ================= BACK REAR WHEELS (2 of 6) ================= */}
        {/* Left Rear Wheel */}
        <g
          className="cursor-pointer transition-transform duration-200 hover:scale-110"
          onClick={(e) =>
            handlePartClick(
              e,
              "wheels",
              "Aluminum Wheels",
              "Six individually motorized aluminum wheels with spiral flexures allow Opportunity to climb over 30-degree slopes!"
            )
          }
        >
          <rect
            x="42"
            y="185"
            width="22"
            height="30"
            rx="6"
            fill="url(#oppWheelGrad)"
            stroke="#94A3B8"
            strokeWidth="1.5"
          />
          {/* Cleats */}
          <line x1="42" y1="192" x2="64" y2="192" stroke="#1E293B" strokeWidth="2" />
          <line x1="42" y1="200" x2="64" y2="200" stroke="#1E293B" strokeWidth="2" />
          <line x1="42" y1="208" x2="64" y2="208" stroke="#1E293B" strokeWidth="2" />
          <circle cx="53" cy="200" r="4" fill="#E2E8F0" />
        </g>

        {/* Right Rear Wheel */}
        <g
          className="cursor-pointer transition-transform duration-200 hover:scale-110"
          onClick={(e) =>
            handlePartClick(
              e,
              "wheels",
              "Aluminum Wheels",
              "Six wheels, six motors! Even when one motor drew high current, Opportunity kept cruising forward!"
            )
          }
        >
          <rect
            x="236"
            y="185"
            width="22"
            height="30"
            rx="6"
            fill="url(#oppWheelGrad)"
            stroke="#94A3B8"
            strokeWidth="1.5"
          />
          <line x1="236" y1="192" x2="258" y2="192" stroke="#1E293B" strokeWidth="2" />
          <line x1="236" y1="200" x2="258" y2="200" stroke="#1E293B" strokeWidth="2" />
          <line x1="236" y1="208" x2="258" y2="208" stroke="#1E293B" strokeWidth="2" />
          <circle cx="247" cy="200" r="4" fill="#E2E8F0" />
        </g>

        {/* ================= HIGH-GAIN ANTENNA DISH ================= */}
        <g
          className="cursor-pointer transition-transform duration-300 hover:rotate-6 origin-center"
          onClick={(e) =>
            handlePartClick(
              e,
              "antenna",
              "High-Gain Parabolic Dish",
              "This dish tracks Earth as our planet moves across the Martian sky, beaming high-res photos across space."
            )
          }
        >
          {/* Dish Base Gimbal */}
          <rect x="175" y="70" width="8" height="15" fill="#64748B" rx="2" />
          {/* Parabolic Dish Bowl */}
          <ellipse
            cx="188"
            cy="65"
            rx="22"
            ry="14"
            fill="url(#oppDishGrad)"
            stroke="#475569"
            strokeWidth="1.5"
          />
          {/* Sub-reflector feed horn */}
          <path d="M188 65 L196 50" stroke="#0284C7" strokeWidth="2" />
          <circle cx="196" cy="50" r="3" fill="#00F0FF" />
          {/* Small Low-Gain Antenna pole */}
          <line x1="165" y1="75" x2="165" y2="40" stroke="#94A3B8" strokeWidth="2" />
          <circle cx="165" cy="40" r="3" fill="#F59E0B" />
        </g>

        {/* ================= PANCAM & NAVCAM CAMERA MAST ================= */}
        <g
          className="cursor-pointer"
          onClick={(e) =>
            handlePartClick(
              e,
              "camera_mast",
              "Pancam Stereo Camera Mast",
              "Perched 1.5 meters high like eyes on a neck, these twin cameras gave scientists 3D color stereo vision of Mars!"
            )
          }
        >
          {/* Mast Pole with cable wraps */}
          <line x1="130" y1="120" x2="130" y2="35" stroke="#94A3B8" strokeWidth="4" />
          <line x1="128" y1="110" x2="132" y2="100" stroke="#F59E0B" strokeWidth="1.5" />
          <line x1="128" y1="80" x2="132" y2="70" stroke="#F59E0B" strokeWidth="1.5" />

          {/* Camera Bar Head */}
          <rect
            x="112"
            y="26"
            width="36"
            height="14"
            rx="4"
            fill="#334155"
            stroke="#00F0FF"
            strokeWidth="1.5"
          />
          {/* Left Pancam Eye (Cyan glowing lens) */}
          <circle cx="118" cy="33" r="4.5" fill="#0F172A" stroke="#00F0FF" strokeWidth="1.5" />
          <circle cx="118" cy="33" r="2" fill="#38BDF8" />

          {/* Right Pancam Eye */}
          <circle cx="142" cy="33" r="4.5" fill="#0F172A" stroke="#00F0FF" strokeWidth="1.5" />
          <circle cx="142" cy="33" r="2" fill="#38BDF8" />

          {/* Mini Navcam lenses between */}
          <circle cx="127" cy="33" r="2" fill="#E2E8F0" />
          <circle cx="133" cy="33" r="2" fill="#E2E8F0" />

          {/* Top Sun sensor */}
          <rect x="127" y="20" width="6" height="6" fill="#FDE047" rx="1" />
        </g>

        {/* ================= SOLAR WINGS (HERO INTERACTION) ================= */}
        {/* Left Solar Wing Base Plate */}
        <polygon
          points="25,70 110,70 110,126 25,126"
          fill="url(#oppSolarGlass)"
          stroke="#00F0FF"
          strokeWidth="1.5"
          className="cursor-pointer"
          onClick={handleSolarClick}
        />
        {/* Right Solar Wing Base Plate */}
        <polygon
          points="190,70 275,70 275,126 190,126"
          fill="url(#oppSolarGlass)"
          stroke="#00F0FF"
          strokeWidth="1.5"
          className="cursor-pointer"
          onClick={handleSolarClick}
        />

        {/* Individual Left Photovoltaic Solar Cells */}
        {solarCellsLeft.map((cell, idx) => {
          const isCellHovered = hoveredCellIndex === idx;
          return (
            <rect
              key={`solar-l-${idx}`}
              x={cell.x}
              y={cell.y}
              width={cell.w}
              height={cell.h}
              rx="2"
              fill={isCellHovered || activePhotonAnimation ? "url(#oppActiveCell)" : "#1E293B"}
              stroke={isCellHovered || activePhotonAnimation ? "#00F0FF" : "#334155"}
              strokeWidth={isCellHovered ? "2" : "1"}
              className="cursor-pointer transition-colors duration-150"
              onMouseEnter={() => handleCellHover(idx)}
              onMouseLeave={() => setHoveredCellIndex(null)}
              onClick={handleSolarClick}
              filter={isCellHovered || activePhotonAnimation ? "url(#solarGlow)" : undefined}
            />
          );
        })}

        {/* Individual Right Photovoltaic Solar Cells */}
        {solarCellsRight.map((cell, idx) => {
          const actualIdx = idx + 8;
          const isCellHovered = hoveredCellIndex === actualIdx;
          return (
            <rect
              key={`solar-r-${idx}`}
              x={cell.x}
              y={cell.y}
              width={cell.w}
              height={cell.h}
              rx="2"
              fill={isCellHovered || activePhotonAnimation ? "url(#oppActiveCell)" : "#1E293B"}
              stroke={isCellHovered || activePhotonAnimation ? "#00F0FF" : "#334155"}
              strokeWidth={isCellHovered ? "2" : "1"}
              className="cursor-pointer transition-colors duration-150"
              onMouseEnter={() => handleCellHover(actualIdx)}
              onMouseLeave={() => setHoveredCellIndex(null)}
              onClick={handleSolarClick}
              filter={isCellHovered || activePhotonAnimation ? "url(#solarGlow)" : undefined}
            />
          );
        })}

        {/* Animated Photon Particles moving from wings to body when active */}
        {activePhotonAnimation && (
          <g>
            <circle cx="50" cy="90" r="3" fill="#FFB703" className="animate-ping" />
            <circle cx="80" cy="110" r="3" fill="#00F0FF" className="animate-ping" />
            <circle cx="210" cy="90" r="3" fill="#FFB703" className="animate-ping" />
            <circle cx="240" cy="110" r="3" fill="#00F0FF" className="animate-ping" />
            <line x1="60" y1="95" x2="110" y2="130" stroke="#FFB703" strokeWidth="2" strokeDasharray="3 3" />
            <line x1="230" y1="95" x2="190" y2="130" stroke="#FFB703" strokeWidth="2" strokeDasharray="3 3" />
          </g>
        )}

        {/* ================= ROVER CHASSIS (WARM ELECTRONICS BOX) ================= */}
        <g
          className="cursor-pointer"
          onClick={(e) =>
            handlePartClick(
              e,
              "body",
              "Warm Electronics Box (WEB)",
              "Insulated with aerogel and gold blankets, this heated core protects Opportunity's CPU and lithium batteries from freezing -100°C Martian nights."
            )
          }
        >
          {/* Main Body Triangular Deck */}
          <polygon
            points="105,100 195,100 210,160 90,160"
            fill="url(#oppGoldFoil)"
            stroke="#B45309"
            strokeWidth="1.5"
          />
          {/* Top Panel Equipment Cover */}
          <rect
            x="115"
            y="115"
            width="70"
            height="35"
            rx="4"
            fill="url(#oppMetalBody)"
            stroke="#475569"
            strokeWidth="1"
          />
          {/* Radiator vents */}
          <line x1="125" y1="123" x2="175" y2="123" stroke="#1E293B" strokeWidth="1.5" />
          <line x1="125" y1="130" x2="175" y2="130" stroke="#1E293B" strokeWidth="1.5" />
          <line x1="125" y1="137" x2="175" y2="137" stroke="#1E293B" strokeWidth="1.5" />

          {/* NASA Meatball Badge Decal on Front Deck */}
          <circle cx="150" cy="147" r="5" fill="#1D4ED8" />
          <path d="M146 148 Q150 144 154 146" stroke="#EF4444" strokeWidth="1" fill="none" />
          <circle cx="149" cy="146" r="0.8" fill="#FFFFFF" />
        </g>

        {/* ================= ROBOTIC ARM (IDD) ================= */}
        <g
          className="cursor-pointer transition-transform duration-300 hover:rotate-3 origin-top-left"
          onClick={(e) =>
            handlePartClick(
              e,
              "robotic_arm",
              "Instrument Deployment Arm (IDD)",
              "With shoulder, elbow, and wrist joints, this 5-degree-of-freedom robotic arm presses microscopic imagers and grinding tools directly against Martian rocks!"
            )
          }
        >
          {/* Shoulder pivot on front chassis */}
          <circle cx="115" cy="155" r="5" fill="#64748B" stroke="#CBD5E1" strokeWidth="1" />
          {/* Bicep segment */}
          <line x1="115" y1="155" x2="100" y2="185" stroke="#94A3B8" strokeWidth="4" strokeLinecap="round" />
          {/* Elbow joint */}
          <circle cx="100" cy="185" r="4" fill="#334155" />
          {/* Forearm segment */}
          <line x1="100" y1="185" x2="110" y2="215" stroke="#94A3B8" strokeWidth="3" strokeLinecap="round" />
          {/* Instrument Turret (Microscope, RAT grinder, Mossbauer spectrometer) */}
          <circle cx="110" cy="215" r="7" fill="#1E293B" stroke="#00F0FF" strokeWidth="1.5" />
          <circle cx="110" cy="215" r="3" fill="#38BDF8" />
          {/* Grinding bit tip */}
          <line x1="114" y1="218" x2="120" y2="223" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
        </g>

        {/* ================= FOREGROUND ROCKER-BOGIE & FRONT WHEELS ================= */}
        {/* Front Left Suspension Leg */}
        <path d="M105 160 L78 190 L85 220" stroke="#64748B" strokeWidth="4" strokeLinecap="round" fill="none" />
        {/* Front Middle Left Wheel */}
        <g
          className="cursor-pointer transition-transform duration-200 hover:scale-110"
          onClick={(e) =>
            handlePartClick(
              e,
              "wheels",
              "Middle Left Wheel",
              "The rocker-bogie mechanism balances the rover so it never tips over, even climbing boulder fields!"
            )
          }
        >
          <rect x="68" y="195" width="22" height="32" rx="6" fill="url(#oppWheelGrad)" stroke="#CBD5E1" strokeWidth="1.5" />
          <line x1="68" y1="203" x2="90" y2="203" stroke="#0F172A" strokeWidth="2" />
          <line x1="68" y1="211" x2="90" y2="211" stroke="#0F172A" strokeWidth="2" />
          <line x1="68" y1="219" x2="90" y2="219" stroke="#0F172A" strokeWidth="2" />
          <circle cx="79" cy="211" r="4.5" fill="#E2E8F0" />
        </g>

        {/* Front Left Wheel */}
        <g
          className="cursor-pointer transition-transform duration-200 hover:scale-110"
          onClick={(e) =>
            handlePartClick(
              e,
              "wheels",
              "Front Steerable Wheel",
              "Front and rear wheels have steering actuators, allowing Opportunity to spin 360 degrees in place like a dancer!"
            )
          }
        >
          <rect x="76" y="210" width="22" height="32" rx="6" fill="url(#oppWheelGrad)" stroke="#CBD5E1" strokeWidth="1.5" />
          <line x1="76" y1="218" x2="98" y2="218" stroke="#0F172A" strokeWidth="2" />
          <line x1="76" y1="226" x2="98" y2="226" stroke="#0F172A" strokeWidth="2" />
          <circle cx="87" cy="226" r="4.5" fill="#E2E8F0" />
        </g>

        {/* Front Right Suspension Leg */}
        <path d="M195 160 L222 190 L215 220" stroke="#64748B" strokeWidth="4" strokeLinecap="round" fill="none" />
        {/* Front Middle Right Wheel */}
        <g
          className="cursor-pointer transition-transform duration-200 hover:scale-110"
          onClick={(e) =>
            handlePartClick(
              e,
              "wheels",
              "Middle Right Wheel",
              "Rolling across 45 kilometers of Martian sand and rocks for 14 years!"
            )
          }
        >
          <rect x="210" y="195" width="22" height="32" rx="6" fill="url(#oppWheelGrad)" stroke="#CBD5E1" strokeWidth="1.5" />
          <line x1="210" y1="203" x2="232" y2="203" stroke="#0F172A" strokeWidth="2" />
          <line x1="210" y1="211" x2="232" y2="211" stroke="#0F172A" strokeWidth="2" />
          <line x1="210" y1="219" x2="232" y2="219" stroke="#0F172A" strokeWidth="2" />
          <circle cx="221" cy="211" r="4.5" fill="#E2E8F0" />
        </g>

        {/* Front Right Wheel */}
        <g
          className="cursor-pointer transition-transform duration-200 hover:scale-110"
          onClick={(e) =>
            handlePartClick(
              e,
              "wheels",
              "Front Right Wheel",
              "Every wheel is machined from a solid block of aluminum with chevron tread cleats!"
            )
          }
        >
          <rect x="202" y="210" width="22" height="32" rx="6" fill="url(#oppWheelGrad)" stroke="#CBD5E1" strokeWidth="1.5" />
          <line x1="202" y1="218" x2="224" y2="218" stroke="#0F172A" strokeWidth="2" />
          <line x1="202" y1="226" x2="224" y2="226" stroke="#0F172A" strokeWidth="2" />
          <circle cx="213" cy="226" r="4.5" fill="#E2E8F0" />
        </g>
      </svg>

      {/* Floating Interactive Callout Badge */}
      {interactive && (
        <div
          onClick={handleSolarClick}
          className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 bg-space-card/90 backdrop-blur border border-nebula-cyan/50 rounded-full text-[11px] font-mono font-bold text-cyan-300 shadow-glow-cyan hover:scale-105 transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap"
        >
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span>⚡ Click Solar Cells / Parts</span>
        </div>
      )}
    </div>
  );
};

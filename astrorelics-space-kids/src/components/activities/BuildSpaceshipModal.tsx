"use client";

import React, { useState } from "react";
import { soundEngine } from "@/lib/audio";
import {
  X,
  Wrench,
  Rocket,
  Sun,
  Zap,
  Eye,
  CheckCircle2,
  Sparkles,
  Compass,
  Radio,
  Feather,
} from "lucide-react";

interface PartOption {
  id: string;
  name: string;
  desc: string;
  icon: string;
}

const CHASSIS_OPTIONS: PartOption[] = [
  { id: "rover", name: "Martian Rover Body", desc: "Insulated warm electronics box with titanium frame", icon: "Compass" },
  { id: "lander", name: "Apollo Lunar Frame", desc: "Gold foil wrapped stage with descent engine", icon: "Shield" },
  { id: "probe", name: "Interstellar 10-Sided Bus", desc: "Deep space avionics core built for vacuum", icon: "Radio" },
];

const MOBILITY_OPTIONS: PartOption[] = [
  { id: "wheels6", name: "6 Rocker-Bogie Wheels", desc: "Climbs boulders without tipping over on Mars", icon: "Compass" },
  { id: "pads4", name: "4 Lunar Shock Footpads", desc: "Cushions gentle landings in low gravity", icon: "Anchor" },
  { id: "thruster", name: "Ion Plasma Thrusters", desc: "Whisper-quiet continuous thrust across space", icon: "Zap" },
];

const POWER_OPTIONS: PartOption[] = [
  { id: "solar", name: "Photovoltaic Solar Wings", desc: "Converts sunlight into clean electric energy", icon: "Sun" },
  { id: "rtg", name: "RTG Nuclear Battery", desc: "Provides steady heat & power far from the Sun", icon: "Zap" },
  { id: "fusion", name: "Fusion Core Generator", desc: "Futuristic high-output clean energy generator", icon: "Sparkles" },
];

const MAST_OPTIONS: PartOption[] = [
  { id: "pancam", name: "Stereo Pancam Neck", desc: "High-resolution 3D color camera eyes", icon: "Eye" },
  { id: "laser", name: "ChemCam Laser Head", desc: "Zaps rocks with laser bursts to read chemistry", icon: "Zap" },
  { id: "dish", name: "3.7m Parabolic Radio Dish", desc: "Beams deep space data across billions of km", icon: "Radio" },
];

const TOOL_OPTIONS: PartOption[] = [
  { id: "arm", name: "Rock Drill & Microscope", desc: "Grinds rock surfaces and views microscopic grains", icon: "Wrench" },
  { id: "drone", name: "Scout Drone Bay", desc: "Carries a mini flying drone to map terrain ahead", icon: "Feather" },
  { id: "boom", name: "Magnetometer Boom", desc: "Measures magnetic shields and cosmic radiation", icon: "Compass" },
];

const PAINT_SCHEMES = [
  { id: "nasa", name: "NASA White & Cyan", primary: "#FFFFFF", secondary: "#00F0FF", glow: "rgba(0,240,255,0.4)" },
  { id: "mars", name: "Mars Rust & Gold", primary: "#C84B31", secondary: "#FBBF24", glow: "rgba(200,75,49,0.5)" },
  { id: "stealth", name: "Deep Space Obsidian", primary: "#1E293B", secondary: "#818CF8", glow: "rgba(129,140,248,0.4)" },
  { id: "gold", name: "Apollo Golden Mylar", primary: "#EAB308", secondary: "#FDE047", glow: "rgba(234,179,8,0.5)" },
];

interface BuildSpaceshipModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BuildSpaceshipModal: React.FC<BuildSpaceshipModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [shipName, setShipName] = useState("STAR VOYAGER 1");
  const [selectedChassis, setSelectedChassis] = useState(CHASSIS_OPTIONS[0]);
  const [selectedMobility, setSelectedMobility] = useState(MOBILITY_OPTIONS[0]);
  const [selectedPower, setSelectedPower] = useState(POWER_OPTIONS[0]);
  const [selectedMast, setSelectedMast] = useState(MAST_OPTIONS[0]);
  const [selectedTool, setSelectedTool] = useState(TOOL_OPTIONS[0]);
  const [selectedPaint, setSelectedPaint] = useState(PAINT_SCHEMES[0]);

  const [activeTab, setActiveTab] = useState<"chassis" | "mobility" | "power" | "mast" | "tool" | "paint">("chassis");
  const [isTestLaunching, setIsTestLaunching] = useState(false);
  const [launchSuccess, setLaunchSuccess] = useState(false);

  if (!isOpen) return null;

  const handleLaunchTest = () => {
    soundEngine.playWarp();
    setIsTestLaunching(true);
    setLaunchSuccess(false);

    setTimeout(() => {
      setIsTestLaunching(false);
      setLaunchSuccess(true);
      soundEngine.playSuccess();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-space-void/90 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-space-abyss border-2 border-cyan-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl text-white my-auto max-h-[92vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={() => {
            soundEngine.playClick();
            onClose();
          }}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-widest mb-1 font-bold">
          <Wrench className="w-4 h-4" />
          NASA ADVANCED SPACECRAFT WORKSHOP
        </div>
        <h2 className="text-2xl sm:text-3xl font-display font-black text-white mb-2">
          BUILD YOUR OWN SPACECRAFT!
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 mb-6">
          Mix and match parts, configure scientific sensors, paint your spacecraft, and test launch it into space!
        </p>

        {/* Main 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* ================= LEFT: REAL-TIME VEHICLE PREVIEW (5 cols) ================= */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="relative rounded-3xl bg-space-void border-2 border-cyan-500/30 p-6 flex flex-col items-center justify-center overflow-hidden min-h-[280px]">
              {/* Ship Name Badge */}
              <div className="absolute top-3 inset-x-3 flex items-center justify-between z-10">
                <input
                  type="text"
                  value={shipName}
                  onChange={(e) => setShipName(e.target.value.toUpperCase())}
                  className="bg-space-card/80 border border-slate-700 px-3 py-1 rounded-xl text-xs font-mono font-bold text-cyan-300 max-w-[200px]"
                />
                <span className="text-[10px] font-mono text-slate-400">TEST READY</span>
              </div>

              {/* Dynamic SVG Visual of User-Built Craft */}
              <div
                className={`relative w-48 h-48 my-4 flex items-center justify-center transition-all duration-500 ${
                  isTestLaunching ? "scale-110 -translate-y-4 animate-bounce" : ""
                }`}
              >
                <svg viewBox="0 0 200 200" className="w-full h-full overflow-visible drop-shadow-xl">
                  {/* Aura */}
                  <circle cx="100" cy="100" r="70" fill={selectedPaint.glow} />

                  {/* Mobility (Bottom) */}
                  {selectedMobility.id === "wheels6" ? (
                    <g fill="#334155" stroke="#94A3B8" strokeWidth="1.5">
                      <rect x="35" y="145" width="22" height="30" rx="4" />
                      <rect x="89" y="150" width="22" height="30" rx="4" />
                      <rect x="143" y="145" width="22" height="30" rx="4" />
                      <line x1="50" y1="130" x2="150" y2="130" stroke="#64748B" strokeWidth="4" />
                    </g>
                  ) : selectedMobility.id === "pads4" ? (
                    <g stroke="#EAB308" strokeWidth="2.5">
                      <line x1="60" y1="120" x2="35" y2="165" />
                      <line x1="140" y1="120" x2="165" y2="165" />
                      <ellipse cx="35" cy="168" rx="12" ry="4" fill="#FDE047" />
                      <ellipse cx="165" cy="168" rx="12" ry="4" fill="#FDE047" />
                    </g>
                  ) : (
                    /* Ion Thrusters */
                    <g>
                      <polygon points="85,130 115,130 125,155 75,155" fill="#1E293B" stroke="#00F0FF" strokeWidth="1.5" />
                      <polygon points="88,155 112,155 100,185" fill="#00F0FF" className="animate-pulse" />
                    </g>
                  )}

                  {/* Chassis Body (Center) */}
                  <rect
                    x="55"
                    y="75"
                    width="90"
                    height="55"
                    rx="8"
                    fill={selectedPaint.primary}
                    stroke={selectedPaint.secondary}
                    strokeWidth="2.5"
                  />

                  {/* Power System (Wings/Cylinders) */}
                  {selectedPower.id === "solar" ? (
                    <g fill="#1E3A8A" stroke="#00F0FF" strokeWidth="1.5">
                      <rect x="5" y="85" width="45" height="35" rx="3" />
                      <rect x="150" y="85" width="45" height="35" rx="3" />
                      <line x1="20" y1="85" x2="20" y2="120" stroke="#00F0FF" strokeWidth="0.8" />
                      <line x1="35" y1="85" x2="35" y2="120" stroke="#00F0FF" strokeWidth="0.8" />
                      <line x1="165" y1="85" x2="165" y2="120" stroke="#00F0FF" strokeWidth="0.8" />
                      <line x1="180" y1="85" x2="180" y2="120" stroke="#00F0FF" strokeWidth="0.8" />
                    </g>
                  ) : selectedPower.id === "rtg" ? (
                    <g transform="translate(145, 80) rotate(15)">
                      <rect x="0" y="0" width="30" height="20" rx="3" fill="#334155" stroke="#F59E0B" strokeWidth="1.5" />
                      <circle cx="15" cy="10" r="3" fill="#F59E0B" />
                    </g>
                  ) : (
                    /* Fusion Core */
                    <circle cx="100" cy="102" r="14" fill="#00F0FF" stroke="#FFFFFF" strokeWidth="2" className="animate-spin-slow" />
                  )}

                  {/* Mast Head (Top) */}
                  {selectedMast.id === "pancam" ? (
                    <g>
                      <line x1="100" y1="75" x2="100" y2="35" stroke="#94A3B8" strokeWidth="4" />
                      <rect x="85" y="25" width="30" height="14" rx="3" fill="#1E293B" stroke="#00F0FF" strokeWidth="1.5" />
                      <circle cx="92" cy="32" r="3.5" fill="#00F0FF" />
                      <circle cx="108" cy="32" r="3.5" fill="#00F0FF" />
                    </g>
                  ) : selectedMast.id === "laser" ? (
                    <g>
                      <line x1="100" y1="75" x2="100" y2="30" stroke="#64748B" strokeWidth="5" />
                      <rect x="85" y="20" width="30" height="18" rx="4" fill="#1E293B" stroke="#EF4444" strokeWidth="2" />
                      <circle cx="100" cy="29" r="5" fill="#EF4444" className="animate-ping" />
                    </g>
                  ) : (
                    /* Dish */
                    <g>
                      <ellipse cx="100" cy="40" rx="35" ry="18" fill="#F8FAFC" stroke="#64748B" strokeWidth="1.5" />
                      <line x1="100" y1="40" x2="100" y2="65" stroke="#475569" strokeWidth="2.5" />
                    </g>
                  )}

                  {/* Tool / Arm */}
                  {selectedTool.id === "arm" ? (
                    <g stroke="#94A3B8" strokeWidth="3" strokeLinecap="round">
                      <line x1="65" y1="120" x2="40" y2="150" />
                      <circle cx="40" cy="150" r="5" fill="#1E293B" stroke="#F59E0B" strokeWidth="1" />
                    </g>
                  ) : selectedTool.id === "drone" ? (
                    <g transform="translate(40, 45)" className="animate-bounce">
                      <rect x="0" y="0" width="16" height="12" rx="2" fill="#E2E8F0" stroke="#0284C7" strokeWidth="1" />
                      <ellipse cx="8" cy="-2" rx="15" ry="2" fill="#0F172A" />
                    </g>
                  ) : (
                    /* Boom */
                    <line x1="60" y1="90" x2="10" y2="50" stroke="#818CF8" strokeWidth="2" strokeDasharray="3 2" />
                  )}
                </svg>
              </div>

              {/* Status / Test Launch Button */}
              <button
                onClick={handleLaunchTest}
                disabled={isTestLaunching}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-500 via-rose-500 to-cyan-500 text-black font-display font-black text-xs sm:text-sm tracking-wider shadow-glow-gold hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <Rocket className="w-4 h-4" />
                <span>{isTestLaunching ? "LAUNCHING TEST EXPEDITION..." : "TEST LAUNCH SPACECRAFT!"}</span>
              </button>

              {launchSuccess && (
                <div className="mt-3 p-3 rounded-xl bg-emerald-950/80 border border-emerald-500 text-emerald-200 text-xs font-bold text-center animate-fadeIn w-full">
                  🎉 {shipName} is flight-ready! Max Range: 500,000,000 km!
                </div>
              )}
            </div>
          </div>

          {/* ================= RIGHT: PART SELECTOR TABS (7 cols) ================= */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {/* Tab navigation */}
            <div className="flex items-center gap-1 overflow-x-auto pb-1 border-b border-slate-800">
              {(["chassis", "mobility", "power", "mast", "tool", "paint"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    soundEngine.playClick();
                    setActiveTab(tab);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold capitalize transition-all whitespace-nowrap ${
                    activeTab === tab
                      ? "bg-cyan-950 border border-cyan-400 text-cyan-200"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* TAB CONTENT: CHASSIS */}
            {activeTab === "chassis" && (
              <div className="space-y-2.5 animate-fadeIn">
                {CHASSIS_OPTIONS.map((opt) => (
                  <div
                    key={opt.id}
                    onClick={() => {
                      soundEngine.playClick();
                      setSelectedChassis(opt);
                    }}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                      selectedChassis.id === opt.id
                        ? "bg-cyan-950/50 border-cyan-400 shadow-glow-sm-cyan"
                        : "bg-space-card border-slate-800 hover:border-slate-700"
                    }`}
                  >
                    <div>
                      <h4 className="text-sm font-bold text-white mb-0.5">{opt.name}</h4>
                      <p className="text-xs text-slate-400">{opt.desc}</p>
                    </div>
                    {selectedChassis.id === opt.id && (
                      <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* TAB CONTENT: MOBILITY */}
            {activeTab === "mobility" && (
              <div className="space-y-2.5 animate-fadeIn">
                {MOBILITY_OPTIONS.map((opt) => (
                  <div
                    key={opt.id}
                    onClick={() => {
                      soundEngine.playRoverMove();
                      setSelectedMobility(opt);
                    }}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                      selectedMobility.id === opt.id
                        ? "bg-cyan-950/50 border-cyan-400 shadow-glow-sm-cyan"
                        : "bg-space-card border-slate-800 hover:border-slate-700"
                    }`}
                  >
                    <div>
                      <h4 className="text-sm font-bold text-white mb-0.5">{opt.name}</h4>
                      <p className="text-xs text-slate-400">{opt.desc}</p>
                    </div>
                    {selectedMobility.id === opt.id && (
                      <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* TAB CONTENT: POWER */}
            {activeTab === "power" && (
              <div className="space-y-2.5 animate-fadeIn">
                {POWER_OPTIONS.map((opt) => (
                  <div
                    key={opt.id}
                    onClick={() => {
                      soundEngine.playSolarPhoton();
                      setSelectedPower(opt);
                    }}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                      selectedPower.id === opt.id
                        ? "bg-amber-950/50 border-amber-400 shadow-glow-gold"
                        : "bg-space-card border-slate-800 hover:border-slate-700"
                    }`}
                  >
                    <div>
                      <h4 className="text-sm font-bold text-white mb-0.5">{opt.name}</h4>
                      <p className="text-xs text-slate-400">{opt.desc}</p>
                    </div>
                    {selectedPower.id === opt.id && (
                      <CheckCircle2 className="w-5 h-5 text-amber-400 flex-shrink-0" />
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* TAB CONTENT: MAST */}
            {activeTab === "mast" && (
              <div className="space-y-2.5 animate-fadeIn">
                {MAST_OPTIONS.map((opt) => (
                  <div
                    key={opt.id}
                    onClick={() => {
                      soundEngine.playClick();
                      setSelectedMast(opt);
                    }}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                      selectedMast.id === opt.id
                        ? "bg-cyan-950/50 border-cyan-400 shadow-glow-sm-cyan"
                        : "bg-space-card border-slate-800 hover:border-slate-700"
                    }`}
                  >
                    <div>
                      <h4 className="text-sm font-bold text-white mb-0.5">{opt.name}</h4>
                      <p className="text-xs text-slate-400">{opt.desc}</p>
                    </div>
                    {selectedMast.id === opt.id && (
                      <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* TAB CONTENT: TOOL */}
            {activeTab === "tool" && (
              <div className="space-y-2.5 animate-fadeIn">
                {TOOL_OPTIONS.map((opt) => (
                  <div
                    key={opt.id}
                    onClick={() => {
                      soundEngine.playClick();
                      setSelectedTool(opt);
                    }}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                      selectedTool.id === opt.id
                        ? "bg-purple-950/50 border-purple-400 shadow-glow-purple"
                        : "bg-space-card border-slate-800 hover:border-slate-700"
                    }`}
                  >
                    <div>
                      <h4 className="text-sm font-bold text-white mb-0.5">{opt.name}</h4>
                      <p className="text-xs text-slate-400">{opt.desc}</p>
                    </div>
                    {selectedTool.id === opt.id && (
                      <CheckCircle2 className="w-5 h-5 text-purple-400 flex-shrink-0" />
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* TAB CONTENT: PAINT */}
            {activeTab === "paint" && (
              <div className="grid grid-cols-2 gap-3 animate-fadeIn">
                {PAINT_SCHEMES.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => {
                      soundEngine.playClick();
                      setSelectedPaint(p);
                    }}
                    className={`p-3 rounded-2xl border cursor-pointer transition-all flex items-center gap-3 ${
                      selectedPaint.id === p.id
                        ? "border-cyan-400 bg-space-void shadow-glow-sm-cyan"
                        : "border-slate-800 bg-space-card hover:border-slate-700"
                    }`}
                  >
                    <div
                      className="w-8 h-8 rounded-full border border-white/40 flex-shrink-0"
                      style={{ backgroundColor: p.primary, borderColor: p.secondary }}
                    />
                    <div className="text-xs font-bold text-white">{p.name}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

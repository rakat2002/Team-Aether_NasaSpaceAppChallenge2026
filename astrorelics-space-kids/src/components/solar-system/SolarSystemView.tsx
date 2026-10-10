"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { SOLAR_PLANETS, PlanetData } from "@/data/solarSystemData";
import { SPACECRAFT_LIST, SpacecraftInfo } from "@/data/spacecraftData";
import { soundEngine } from "@/lib/audio";
import { Orbit, Rocket, ChevronRight, X, Satellite } from "lucide-react";

interface SolarSystemViewProps {
  onSelectSpacecraft: (spacecraft: SpacecraftInfo) => void;
  onLaunchOpportunity: () => void;
  onOpenSolarPowerExplainer: () => void;
  onOpenQuiz?: () => void;
  onOpenColoringBook?: () => void;
  onOpenBuildSpaceship?: () => void;
  onOpenBadges?: () => void;
  onOpenFlashcards?: () => void;
}

// Which spacecraft belong to each planet (by orbit.planetTarget)
const PLANET_TARGET_MAP: Record<string, string[]> = {
  sun:     ["interstellar"],
  mercury: [],
  venus:   [],
  earth:   ["moon"],
  moon:    ["moon"],
  mars:    ["mars"],
  jupiter: ["jupiter"],
  saturn:  ["saturn"],
};

// Small type badge colour per spacecraft type
const TYPE_COLOR: Record<string, string> = {
  "Rover":               "bg-rose-500/20 border-rose-500/40 text-rose-300",
  "Lander":              "bg-amber-500/20 border-amber-500/40 text-amber-300",
  "Orbiter & Lander":    "bg-orange-500/20 border-orange-500/40 text-orange-300",
  "Interstellar Probe":  "bg-cyan-500/20  border-cyan-500/40  text-cyan-300",
  "Lunar Module":        "bg-yellow-500/20 border-yellow-500/40 text-yellow-300",
};

export const SolarSystemView: React.FC<SolarSystemViewProps> = ({
  onSelectSpacecraft,
  onLaunchOpportunity,
}) => {
  const [hoveredPlanet, setHoveredPlanet] = useState<string | null>(null);
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetData | null>(null);
  const [simTime, setSimTime]   = useState(0);
  const simTimeRef              = useRef(0);
  const hoverTimerRef           = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* ── animation loop ── */
  useEffect(() => {
    let animId: number;
    let last = performance.now();
    const loop = (now: number) => {
      simTimeRef.current += (now - last) / 1000 * 0.5;
      last = now;
      setSimTime(simTimeRef.current);
      animId = requestAnimationFrame(loop);
    };
    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, []);

  /* ── hover (debounced to kill flicker) ── */
  const handlePlanetEnter = useCallback((planet: PlanetData) => {
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    setHoveredPlanet(planet.id);
    soundEngine.playSparkle();
  }, []);

  const handlePlanetLeave = useCallback(() => {
    hoverTimerRef.current = setTimeout(() => setHoveredPlanet(null), 80);
  }, []);

  /* ── click ── */
  const handlePlanetClick = useCallback((planet: PlanetData) => {
    soundEngine.playClick();
    setSelectedPlanet(prev => prev?.id === planet.id ? null : planet);
  }, []);

  const handleCraftClick = useCallback((craft: SpacecraftInfo) => {
    soundEngine.playClick();
    if (craft.id === "opportunity") onLaunchOpportunity();
    else onSelectSpacecraft(craft);
  }, [onLaunchOpportunity, onSelectSpacecraft]);

  /* ── missions for selected planet ── */
  const planetMissions: SpacecraftInfo[] = selectedPlanet
    ? SPACECRAFT_LIST.filter(c =>
        (PLANET_TARGET_MAP[selectedPlanet.id] ?? []).includes(c.orbit.planetTarget)
      )
    : [];

  /* ── hint text per planet ── */
  const HOVER_HINTS: Record<string, string> = {
    mars:    "4 rovers & 1 lander visited here — tap to explore!",
    moon:    "Humans landed here in 1969 — tap to find out more!",
    earth:   "Home! Tap to see Moon missions.",
    jupiter: "Visited by Voyager probes — tap to learn more!",
    saturn:  "Tap to explore Saturn missions!",
    sun:     "Tap to see interstellar probes!",
  };

  return (
    <div className="relative w-full min-h-[92vh] flex items-center justify-center select-none overflow-hidden pt-16 pb-12">

      {/* ── HUD banner ── */}
      <div className="absolute top-20 left-4 sm:left-8 z-20 max-w-sm pointer-events-auto">
        <div className="p-3.5 rounded-2xl bg-space-card/80 border border-cyan-500/30 backdrop-blur-md shadow-xl">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-300 font-bold uppercase mb-1">
            <Orbit className="w-4 h-4 text-cyan-400 animate-spin-slow" />
            <span>SOLAR SYSTEM EXPLORER</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Tap a <strong className="text-amber-400">planet</strong> to see its missions,
            then choose a rover or spacecraft to study it!
          </p>
        </div>
      </div>

      {/* ── hover hint callout (top-right) ── */}
      {hoveredPlanet && HOVER_HINTS[hoveredPlanet] && !selectedPlanet && (
        <div className={`absolute top-20 right-4 sm:right-8 z-20 max-w-xs p-4 rounded-2xl backdrop-blur-lg shadow-2xl animate-fadeIn pointer-events-none border-2 ${
          hoveredPlanet === "mars"
            ? "bg-rose-950/90 border-rose-500/60"
            : "bg-slate-900/90 border-cyan-500/40"
        }`}>
          <div className={`text-[10px] font-mono uppercase tracking-widest mb-1 flex items-center gap-1.5 ${
            hoveredPlanet === "mars" ? "text-rose-300" : "text-cyan-300"
          }`}>
            <span className={`w-2 h-2 rounded-full animate-ping ${
              hoveredPlanet === "mars" ? "bg-rose-500" : "bg-cyan-500"
            }`} />
            {SOLAR_PLANETS.find(p => p.id === hoveredPlanet)?.name?.toUpperCase()}
          </div>
          <p className={`text-xs ${hoveredPlanet === "mars" ? "text-rose-200" : "text-slate-200"}`}>
            {HOVER_HINTS[hoveredPlanet]}
          </p>
        </div>
      )}

      {/* ── mission panel (appears when planet is tapped) ── */}
      {selectedPlanet && (
        <div className="absolute bottom-6 left-4 sm:left-8 z-30 max-w-md w-[calc(100%-2rem)] sm:w-auto rounded-2xl bg-space-void/95 border-2 border-cyan-500/40 backdrop-blur-lg shadow-2xl animate-fadeIn overflow-hidden">

          {/* planet header */}
          <div className="flex items-start justify-between gap-3 p-4 pb-3 border-b border-slate-700/60">
            <div>
              <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest">
                {selectedPlanet.type}
              </span>
              <h3 className="text-xl font-display font-black text-white leading-tight">
                {selectedPlanet.name}
              </h3>
              <p className="text-xs text-amber-300">{selectedPlanet.tagline}</p>
            </div>
            <button
              onClick={() => setSelectedPlanet(null)}
              className="mt-1 flex-shrink-0 text-slate-400 hover:text-white w-7 h-7 flex items-center justify-center rounded-full bg-slate-800 hover:bg-slate-700 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* fun fact */}
          <div className="px-4 pt-3 pb-2">
            <p className="text-xs text-slate-200 leading-relaxed">{selectedPlanet.funFact}</p>
            <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-slate-400 mt-2">
              <div>Distance from Sun: <span className="text-white">{selectedPlanet.distanceFromSun}</span></div>
              <div>Day length: <span className="text-white">{selectedPlanet.dayLength}</span></div>
            </div>
          </div>

          {/* mission list */}
          {planetMissions.length > 0 ? (
            <div className="px-4 pb-4 pt-1">
              <p className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                <Satellite className="w-3.5 h-3.5" />
                {planetMissions.length === 1 ? "1 Mission" : `${planetMissions.length} Missions`} — tap to study
              </p>
              <div className="flex flex-col gap-2 max-h-56 overflow-y-auto pr-1">
                {planetMissions.map(craft => (
                  <button
                    key={craft.id}
                    onClick={() => handleCraftClick(craft)}
                    className="w-full flex items-center gap-3 p-2.5 rounded-xl bg-space-card border border-slate-700 hover:border-cyan-500/60 hover:bg-slate-800 transition-colors text-left group"
                  >
                    {/* coloured icon */}
                    <div
                      className="w-9 h-9 rounded-lg flex-shrink-0 flex items-center justify-center"
                      style={{ background: craft.colorTheme.glow }}
                    >
                      <Rocket className="w-4 h-4" style={{ color: craft.colorTheme.primary }} />
                    </div>

                    {/* name + badges */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                          {craft.name}
                        </span>
                        {/* type badge */}
                        <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded-full border ${TYPE_COLOR[craft.type] ?? "bg-slate-700 border-slate-600 text-slate-300"}`}>
                          {craft.type}
                        </span>
                        {/* hero badge */}
                        {craft.isHero && (
                          <span className="text-[9px] font-mono px-1.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300">
                            HERO
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-400 truncate">{craft.subtitle}</p>
                    </div>

                    <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 flex-shrink-0 transition-colors" />
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="px-4 pb-4 pt-2 text-xs text-slate-400 font-mono italic">
              No spacecraft missions logged for this planet yet.
            </div>
          )}
        </div>
      )}

      {/* ── SVG solar system (planets only — no spacecraft) ── */}
      <div className="relative w-full max-w-6xl aspect-[4/3] sm:aspect-[16/10] max-h-[850px] flex items-center justify-center">
        <svg viewBox="-480 -380 960 760" className="w-full h-full overflow-visible">
          <defs>
            <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%"   stopColor="#FFFBEB" />
              <stop offset="25%"  stopColor="#FDE047" />
              <stop offset="60%"  stopColor="#F59E0B" />
              <stop offset="85%"  stopColor="#EA580C" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
            <radialGradient id="earthGrad" cx="35%" cy="35%" r="65%">
              <stop offset="0%"   stopColor="#60A5FA" />
              <stop offset="50%"  stopColor="#2563EB" />
              <stop offset="100%" stopColor="#1E3A8A" />
            </radialGradient>
            <radialGradient id="marsGrad" cx="35%" cy="35%" r="65%">
              <stop offset="0%"   stopColor="#F87171" />
              <stop offset="50%"  stopColor="#DC2626" />
              <stop offset="100%" stopColor="#7F1D1D" />
            </radialGradient>
            <linearGradient id="jupiterBands" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%"   stopColor="#FDBA74" />
              <stop offset="25%"  stopColor="#EA580C" />
              <stop offset="45%"  stopColor="#FED7AA" />
              <stop offset="65%"  stopColor="#C2410C" />
              <stop offset="100%" stopColor="#9A3412" />
            </linearGradient>
            <linearGradient id="saturnRings" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%"   stopColor="rgba(254,240,138,0.8)" />
              <stop offset="40%"  stopColor="rgba(217,119,6,0.4)"   />
              <stop offset="60%"  stopColor="rgba(254,240,138,0.9)" />
              <stop offset="100%" stopColor="rgba(180,83,9,0.2)"    />
            </linearGradient>
          </defs>

          {/* orbit rings (skip Moon — it orbits Earth) */}
          {SOLAR_PLANETS.map(planet => {
            if (planet.orbitRadius === 0 || planet.id === "moon") return null;
            const isMars = planet.id === "mars";
            return (
              <circle
                key={`orbit-${planet.id}`}
                cx="0" cy="0"
                r={planet.orbitRadius}
                fill="none"
                stroke={isMars ? "rgba(239,68,68,0.35)" : "rgba(148,163,184,0.15)"}
                strokeWidth={isMars ? "2" : "1"}
                strokeDasharray={isMars ? "5 4" : "3 3"}
                className={isMars ? "animate-pulse" : ""}
              />
            );
          })}

          {/* decorative Voyager trajectory line */}
          <path d="M 175 0 Q 300 -120 440 -260" fill="none"
            stroke="#00F0FF" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.35" />
          <text x="340" y="-215" fill="#00F0FF" fontSize="9" fontFamily="monospace" opacity="0.5">
            Voyager trajectory ➔
          </text>

          {/* ── SUN ── */}
          <g
            style={{ cursor: "pointer" }}
            onClick={() => handlePlanetClick(SOLAR_PLANETS[0])}
            onMouseEnter={() => handlePlanetEnter(SOLAR_PLANETS[0])}
            onMouseLeave={handlePlanetLeave}
          >
            <circle cx="0" cy="0" r="80" fill="transparent" />
            <circle cx="0" cy="0" r="75" fill="url(#sunGlow)" opacity="0.6" className="animate-pulse" />
            <circle cx="0" cy="0" r="50" fill="url(#sunGlow)" />
            <circle cx="0" cy="0" r="32" fill="#FDE047" />
            <circle cx="0" cy="0" r="26" fill="#FFFBEB" />
            {/* selected ring */}
            {selectedPlanet?.id === "sun" && (
              <circle cx="0" cy="0" r="58" fill="none" stroke="#00F0FF"
                strokeWidth="2" strokeDasharray="4 3" opacity="0.9" />
            )}
          </g>

          {/* ── PLANETS ── */}
          {SOLAR_PLANETS.map(planet => {
            if (planet.orbitRadius === 0 || planet.id === "moon") return null;

            const angle =
              simTime * (20 / (planet.orbitPeriod || 30)) +
              (planet.id === "mars"    ? 0.8 :
               planet.id === "earth"  ? 2.5 :
               planet.id === "jupiter"? 4.2 : 1.2);
            const px = Math.cos(angle) * planet.orbitRadius;
            const py = Math.sin(angle) * planet.orbitRadius;

            const isMars    = planet.id === "mars";
            const isEarth   = planet.id === "earth";
            const isSaturn  = planet.id === "saturn";
            const isHovered  = hoveredPlanet  === planet.id;
            const isSelected = selectedPlanet?.id === planet.id;

            // count missions for dot badge
            const missionCount = (PLANET_TARGET_MAP[planet.id] ?? []).length > 0
              ? SPACECRAFT_LIST.filter(c =>
                  (PLANET_TARGET_MAP[planet.id] ?? []).includes(c.orbit.planetTarget)
                ).length
              : 0;

            return (
              <g
                key={`planet-${planet.id}`}
                transform={`translate(${px}, ${py})`}
                style={{ cursor: "pointer" }}
                onClick={() => handlePlanetClick(planet)}
                onMouseEnter={() => handlePlanetEnter(planet)}
                onMouseLeave={handlePlanetLeave}
              >
                {/* transparent hit-buffer (keeps hover stable during scale) */}
                <circle cx="0" cy="0" r={planet.size + 16} fill="transparent" />

                {/* selected glow ring */}
                {isSelected && (
                  <circle cx="0" cy="0" r={planet.size + 7}
                    fill="none" stroke="#00F0FF" strokeWidth="2"
                    strokeDasharray="4 3" opacity="0.9" />
                )}

                {/* Mars pulsing aura */}
                {isMars && (
                  <circle cx="0" cy="0" r={planet.size * 2.5}
                    fill="rgba(239,68,68,0.15)" className="animate-ping" />
                )}

                {/* Saturn rings (behind planet) */}
                {isSaturn && (
                  <ellipse cx="0" cy="0" rx={planet.ringsRadius} ry="14"
                    fill="url(#saturnRings)" stroke="#D97706" strokeWidth="0.8"
                    transform="rotate(-22)" />
                )}

                {/* planet body — scaled via inner <g> to avoid hit-area flicker */}
                <g style={{
                  transform: `scale(${isHovered || isSelected ? 1.18 : 1})`,
                  transition: "transform 0.2s ease",
                  transformOrigin: "0px 0px",
                }}>
                  <circle
                    cx="0" cy="0" r={planet.size}
                    fill={
                      isMars   ? "url(#marsGrad)"   :
                      isEarth  ? "url(#earthGrad)"  :
                      planet.id === "jupiter" ? "url(#jupiterBands)" :
                      planet.color
                    }
                    stroke={isMars ? "#F87171" : isSelected ? "#00F0FF" : "#E2E8F0"}
                    strokeWidth="1.5"
                  />

                  {/* Earth details */}
                  {isEarth && (
                    <>
                      <path d="M-8 -6 Q-2 -12 6 -8 Q8 2 2 8 Z" fill="#22C55E" opacity="0.7" />
                      <circle cx="0" cy="0" r={planet.size} fill="none"
                        stroke="#60A5FA" strokeWidth="2" opacity="0.4" />
                    </>
                  )}

                  {/* Moon orbit ring + Moon */}
                  {isEarth && (
                    <>
                      <circle cx="0" cy="0" r="26" fill="none"
                        stroke="rgba(226,232,240,0.2)" strokeWidth="0.8" strokeDasharray="2 2" />
                      <g transform={`translate(${Math.cos(simTime * 4) * 26}, ${Math.sin(simTime * 4) * 26})`}>
                        <circle cx="0" cy="0" r="5.5" fill="#CBD5E1" stroke="#94A3B8" strokeWidth="1" />
                        <text x="0" y="11" textAnchor="middle" fill="#94A3B8"
                          fontSize="5.5" fontFamily="sans-serif" className="pointer-events-none">
                          Moon
                        </text>
                      </g>
                    </>
                  )}
                </g>

                {/* planet name */}
                <text
                  x="0" y={planet.size + 15}
                  textAnchor="middle"
                  fill={isSelected ? "#00F0FF" : "#E2E8F0"}
                  fontSize="10" fontFamily="sans-serif" fontWeight="bold"
                  className="pointer-events-none drop-shadow"
                >
                  {planet.name}
                </text>

                {/* mission count dot badge */}
                {missionCount > 0 && !isSelected && (
                  <g transform={`translate(${planet.size - 2}, ${-planet.size + 2})`}>
                    <circle r="7" fill="#F59E0B" stroke="#000" strokeWidth="1" />
                    <text x="0" y="4" textAnchor="middle"
                      fill="#000" fontSize="7" fontFamily="monospace" fontWeight="bold"
                      className="pointer-events-none">
                      {missionCount}
                    </text>
                  </g>
                )}
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
};

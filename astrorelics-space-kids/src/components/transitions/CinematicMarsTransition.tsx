"use client";

import React, { useEffect, useState } from "react";
import { soundEngine } from "@/lib/audio";
import { Crosshair, Radio, Sparkles, Orbit } from "lucide-react";
import { OpportunityModel } from "../spacecraft/OpportunityModel";

interface CinematicMarsTransitionProps {
  isActive: boolean;
  onComplete: () => void;
}

export const CinematicMarsTransition: React.FC<CinematicMarsTransitionProps> = ({
  isActive,
  onComplete,
}) => {
  const [phase, setPhase] = useState<"lock" | "trajectory" | "warp" | "atmosphere" | "done">("lock");

  useEffect(() => {
    if (!isActive) return;

    setPhase("lock");
    soundEngine.playRadioPing();

    const t1 = setTimeout(() => {
      setPhase("trajectory");
      soundEngine.playSpacecraftActivate();
    }, 700);

    const t2 = setTimeout(() => {
      setPhase("warp");
      soundEngine.playWarp();
    }, 1500);

    const t3 = setTimeout(() => {
      setPhase("atmosphere");
    }, 2800);

    const t4 = setTimeout(() => {
      setPhase("done");
      onComplete();
    }, 3800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [isActive, onComplete]);

  if (!isActive || phase === "done") return null;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center bg-space-void overflow-hidden select-none">
      {/* ================= PHASE 1 & 2: LOCK ON MARS & TRAJECTORY ================= */}
      {(phase === "lock" || phase === "trajectory") && (
        <div className="relative z-10 flex flex-col items-center animate-fadeIn text-center">
          {/* Target Reticle */}
          <div className="relative w-48 h-48 sm:w-64 sm:h-64 flex items-center justify-center mb-6">
            <div className="absolute inset-0 border-2 border-dashed border-rose-500/60 rounded-full animate-spin-slow" />
            <div className="absolute inset-4 border border-cyan-400/50 rounded-full animate-ping" />
            <Crosshair className="w-16 h-16 text-rose-500 animate-pulse" />

            {/* Glowing Red Mars inside reticle */}
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-rose-700 via-rose-500 to-amber-500 shadow-glow-mars" />
          </div>

          <div className="px-4 py-1.5 rounded-full bg-rose-950/80 border border-rose-500 text-rose-300 font-mono text-xs tracking-widest uppercase mb-2 flex items-center gap-2">
            <Radio className="w-4 h-4 animate-ping text-rose-400" />
            <span>TARGET: MARS • MERIDIANI PLANUM</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-display font-black text-white tracking-wider mb-2">
            LET&apos;S GO TO MARS! 🚀
          </h2>
          <p className="text-sm sm:text-base font-mono text-cyan-300">
            {phase === "trajectory" ? "TRAJECTORY CALCULATED: 480,000,000 KM" : "LOCKING IN TRANS-MARS INJECTION..."}
          </p>

          {/* Miniature Opportunity Model tracking along */}
          <div className="mt-6 animate-bounce">
            <OpportunityModel size={120} interactive={false} />
          </div>
        </div>
      )}

      {/* ================= PHASE 3: INTERPLANETARY WARP SPEED ================= */}
      {phase === "warp" && (
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
          {/* Warp streak lines */}
          <div className="absolute inset-0 bg-gradient-radial from-rose-500/20 via-transparent to-space-void animate-pulse" />
          <div className="relative z-10 text-center animate-scaleUp">
            <div className="w-28 h-28 rounded-full border-4 border-cyan-400 border-t-amber-400 animate-spin mx-auto mb-4" />
            <h3 className="text-4xl sm:text-6xl font-display font-black text-cyan-300 tracking-widest uppercase mb-2">
              CROSSING DEEP SPACE
            </h3>
            <p className="text-base font-mono text-amber-300 flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4" /> SPEED: 19,000 KM/H • ARRIVING AT MARS
            </p>
          </div>
        </div>
      )}

      {/* ================= PHASE 4: MARS ATMOSPHERIC ENTRY ================= */}
      {phase === "atmosphere" && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-rose-950 via-space-void to-space-void animate-fadeIn">
          {/* Giant Mars Looming Large */}
          <div className="absolute -bottom-40 w-[600px] h-[600px] sm:w-[900px] sm:h-[900px] rounded-full bg-gradient-to-t from-rose-600 via-amber-600 to-rose-900 shadow-[0_0_120px_rgba(239,68,68,0.8)] animate-scaleUp" />

          {/* Atmospheric Dust Clouds & Heat Sparks */}
          <div className="relative z-10 text-center text-white mb-20 animate-fadeIn">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/60 border border-amber-500 text-amber-300 font-mono text-xs mb-3">
              <Orbit className="w-4 h-4 animate-spin" />
              <span>ATMOSPHERIC ENTRY DETECTED</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-display font-black text-amber-200 tracking-wider">
              WELCOME TO MARS 🔴
            </h2>
            <p className="text-base sm:text-lg font-sans text-rose-200 mt-2">
              Opportunity is arriving at the Red Planet...
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

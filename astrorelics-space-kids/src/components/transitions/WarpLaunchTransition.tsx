"use client";

import React, { useEffect, useState } from "react";
import { Sparkles, Rocket } from "lucide-react";

interface WarpLaunchTransitionProps {
  isActive: boolean;
  onComplete: () => void;
}

export const WarpLaunchTransition: React.FC<WarpLaunchTransitionProps> = ({
  isActive,
  onComplete,
}) => {
  const [phase, setPhase] = useState<"ignite" | "warp" | "settle">("ignite");

  useEffect(() => {
    if (!isActive) return;

    setPhase("ignite");
    const t1 = setTimeout(() => {
      setPhase("warp");
    }, 400);

    const t2 = setTimeout(() => {
      setPhase("settle");
    }, 1800);

    const t3 = setTimeout(() => {
      onComplete();
    }, 2400);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [isActive, onComplete]);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none flex flex-col items-center justify-center overflow-hidden transition-all duration-700 bg-space-void/90 backdrop-blur-sm">
      {/* Central Warp Blast Flash */}
      <div
        className={`w-96 h-96 rounded-full bg-gradient-to-r from-cyan-400 via-sky-300 to-amber-300 blur-3xl transition-all duration-1000 ${
          phase === "warp" ? "scale-[6] opacity-40" : "scale-100 opacity-20"
        }`}
      />

      {/* Warp Tunnel Rings */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className={`w-40 h-40 rounded-full border-2 border-cyan-400 transition-all duration-700 ${
            phase === "warp" ? "scale-[12] opacity-0" : "scale-100 opacity-80"
          }`}
        />
        <div
          className={`w-64 h-64 rounded-full border border-purple-400 transition-all duration-1000 delay-150 ${
            phase === "warp" ? "scale-[14] opacity-0" : "scale-100 opacity-70"
          }`}
        />
        <div
          className={`w-96 h-96 rounded-full border border-amber-400 transition-all duration-1000 delay-300 ${
            phase === "warp" ? "scale-[16] opacity-0" : "scale-100 opacity-60"
          }`}
        />
      </div>

      {/* Center Warp Telemetry */}
      <div className="relative z-10 text-center animate-pulse">
        <div className="w-16 h-16 rounded-full bg-cyan-500/20 border border-cyan-400 mx-auto flex items-center justify-center mb-4 shadow-glow-cyan">
          <Rocket className="w-8 h-8 text-cyan-300 animate-bounce" />
        </div>
        <h2 className="text-3xl sm:text-5xl font-display font-black text-white tracking-widest uppercase mb-2">
          WARP SPEED ENGAGED!
        </h2>
        <p className="text-sm sm:text-base font-mono text-cyan-300 flex items-center justify-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400" />
          ENTERING THE INNER SOLAR SYSTEM
        </p>
      </div>
    </div>
  );
};

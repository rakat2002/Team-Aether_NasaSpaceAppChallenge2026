"use client";

import React, { useState } from "react";
import { soundEngine } from "@/lib/audio";
import { Sun, Zap, Compass, Sparkles, X, Wind } from "lucide-react";

interface SolarPowerExplainerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SolarPowerExplainerModal: React.FC<SolarPowerExplainerModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [photonCount, setPhotonCount] = useState(3);
  const [energyGenerated, setEnergyGenerated] = useState(140); // Watts
  const [isDusty, setIsDusty] = useState(false);

  if (!isOpen) return null;

  const handleSunbeamBoost = () => {
    soundEngine.playSolarPhoton();
    setPhotonCount((prev) => prev + 1);
    setEnergyGenerated((prev) => Math.min(220, prev + 20));
  };

  const handleCleanDust = () => {
    soundEngine.playSparkle();
    setIsDusty(false);
    setEnergyGenerated(200);
  };

  const handleSimulateDust = () => {
    soundEngine.playClick();
    setIsDusty(true);
    setEnergyGenerated(60);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-space-void/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-xl bg-space-abyss border-2 border-amber-500/50 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-amber-950/50 text-white overflow-hidden">
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-gradient-to-b from-amber-500/20 to-transparent pointer-events-none rounded-full blur-2xl" />

        {/* Close Button */}
        <button
          onClick={() => {
            soundEngine.playClick();
            onClose();
          }}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="flex items-center gap-2 mb-2 text-amber-400 font-mono text-xs tracking-widest uppercase">
          <Sun className="w-4 h-4 text-amber-400 animate-spin-slow" />
          HOW MARS ROVERS WORK
        </div>
        <h2 className="text-2xl sm:text-3xl font-display font-black text-white mb-2">
          SOLAR POWER ON MARS
        </h2>
        <div className="flex items-center gap-2 text-sm sm:text-base font-bold text-amber-300 mb-6">
          <span>Sunlight</span>
          <span>→</span>
          <span className="text-cyan-400">Electricity</span>
          <span>→</span>
          <span className="text-emerald-400">Exploration!</span>
        </div>

        {/* Interactive Photon & Silicon Circuit Visualizer */}
        <div className="relative rounded-2xl bg-space-void border border-slate-700/60 p-4 mb-6 overflow-hidden">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-3">
            <span className="flex items-center gap-1.5 text-amber-400">
              <Sun className="w-4 h-4" /> Martian Sunlight
            </span>
            <span className="text-cyan-300 font-bold">
              Current Power: {energyGenerated} Watts
            </span>
          </div>

          {/* Graphical flow */}
          <div className="grid grid-cols-3 gap-3 text-center my-3 relative">
            {/* Step 1: Photons */}
            <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-500/30 flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center mb-2 animate-bounce">
                <Sun className="w-5 h-5 text-amber-400" />
              </div>
              <span className="text-xs font-bold text-amber-300">1. Photons Hit</span>
              <span className="text-[11px] text-slate-400 mt-1">Sunlight particles rain onto solar wings</span>
            </div>

            {/* Step 2: Silicon Cells */}
            <div className="p-3 rounded-xl bg-cyan-950/30 border border-cyan-500/30 flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center mb-2 animate-pulse">
                <Zap className="w-5 h-5 text-cyan-400" />
              </div>
              <span className="text-xs font-bold text-cyan-300">2. Electrons Flow</span>
              <span className="text-[11px] text-slate-400 mt-1">Silicon layers kick loose electrons</span>
            </div>

            {/* Step 3: Exploration */}
            <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/30 flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center mb-2">
                <Compass className="w-5 h-5 text-emerald-400" />
              </div>
              <span className="text-xs font-bold text-emerald-300">3. Wheels Roll!</span>
              <span className="text-[11px] text-slate-400 mt-1">Power drives motors, heaters & cameras</span>
            </div>
          </div>

          {/* Dust Status Bar */}
          <div className="mt-3 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
            <span className="text-slate-300 flex items-center gap-1.5">
              Panel Cleanliness:{" "}
              {isDusty ? (
                <span className="text-rose-400 font-bold">Dusty (30% efficiency)</span>
              ) : (
                <span className="text-emerald-400 font-bold">Pristine (100% efficiency)</span>
              )}
            </span>
          </div>
        </div>

        {/* Educational Story explanation for 8-12 year olds */}
        <p className="text-sm text-slate-300 leading-relaxed mb-6">
          Opportunity does not have a gas tank or plug-in charger on Mars! Instead, its solar wings are packed with thousands of tiny purple-blue silicon squares. When sunlight knocks into them, it shakes electrons loose, creating an electric current that charges two rechargeable lithium batteries inside the rover.
        </p>

        {/* Child-friendly interactive controls */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleSunbeamBoost}
            className="flex-1 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 font-bold text-xs sm:text-sm text-black shadow-glow-gold transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-black" />
            Send Sunbeam! (+20W)
          </button>

          {isDusty ? (
            <button
              onClick={handleCleanDust}
              className="px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 font-bold text-xs sm:text-sm text-white shadow-glow-cyan transition-all active:scale-95 flex items-center gap-2"
            >
              <Wind className="w-4 h-4 text-cyan-200" />
              Dust Devil Cleaning Wind!
            </button>
          ) : (
            <button
              onClick={handleSimulateDust}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 font-medium text-xs sm:text-sm text-slate-300 border border-slate-700 transition-all flex items-center gap-2"
            >
              Dusty Breeze
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

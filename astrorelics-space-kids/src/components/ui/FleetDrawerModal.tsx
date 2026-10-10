"use client";

import React from "react";
import { SPACECRAFT_LIST, SpacecraftInfo } from "@/data/spacecraftData";
import { SpacecraftRenderer } from "../spacecraft/SpacecraftRenderer";
import { soundEngine } from "@/lib/audio";
import { X, Rocket, MapPin, ChevronRight, Award } from "lucide-react";

interface FleetDrawerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSpacecraft: (craft: SpacecraftInfo) => void;
}

export const FleetDrawerModal: React.FC<FleetDrawerModalProps> = ({
  isOpen,
  onClose,
  onSelectSpacecraft,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-space-void/85 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-space-abyss border-2 border-cyan-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl text-white my-auto max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={() => {
            soundEngine.playClick();
            onClose();
          }}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-widest mb-1 font-bold">
          <Rocket className="w-4 h-4" />
          HUMANITY&apos;S COSMIC FLEET
        </div>
        <h2 className="text-2xl sm:text-3xl font-display font-black text-white mb-2">
          MACHINES IN THE SOLAR SYSTEM
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 mb-6">
          Click any robotic pioneer below to inspect its science gear, launch history, and fun facts!
        </p>

        {/* 8 Spacecraft Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SPACECRAFT_LIST.map((craft) => (
            <div
              key={craft.id}
              onClick={() => {
                soundEngine.playClick();
                onClose();
                onSelectSpacecraft(craft);
              }}
              className={`p-4 rounded-2xl bg-space-card/80 border transition-all duration-200 cursor-pointer flex flex-col justify-between group hover:scale-105 ${
                craft.isHero
                  ? "border-amber-500/60 shadow-glow-gold hover:border-amber-400"
                  : "border-slate-800 hover:border-cyan-400/60"
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-1 mb-2">
                  <span
                    className="text-[9px] font-mono px-2 py-0.5 rounded-full uppercase font-bold"
                    style={{
                      color: craft.colorTheme.primary,
                      backgroundColor: "rgba(15, 23, 42, 0.8)",
                      border: `1px solid ${craft.colorTheme.primary}`,
                    }}
                  >
                    {craft.badgeLabel}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">
                    {craft.type}
                  </span>
                </div>

                {/* Miniature SVG Model Preview */}
                <div className="h-28 flex items-center justify-center overflow-hidden my-2 group-hover:scale-110 transition-transform">
                  <SpacecraftRenderer id={craft.id} size={110} interactive={false} />
                </div>

                <h4 className="text-base font-display font-bold text-white mb-1 group-hover:text-cyan-300 transition-colors">
                  {craft.name}
                </h4>
                <p className="text-xs text-slate-400 font-sans line-clamp-2 mb-2">
                  {craft.subtitle}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-cyan-400 font-mono">
                <span className="flex items-center gap-1 text-slate-300">
                  <MapPin className="w-3 h-3 text-cyan-400" />
                  {craft.destination.split("(")[0].trim()}
                </span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

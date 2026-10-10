"use client";

import React from "react";
import { NasaMissionBadge } from "@/data/badgeData";
import {
  Flame,
  Moon,
  Radio,
  Compass,
  Camera,
  Sparkles,
  Heart,
  Search,
  Wind,
  Trophy,
  HelpCircle,
  Palette,
  Wrench,
  Sun,
  Lock,
} from "lucide-react";

interface NasaPatchBadgeProps {
  badge: NasaMissionBadge;
  isUnlocked: boolean;
  size?: "sm" | "md" | "lg" | "hero";
  onClick?: () => void;
  showTooltip?: boolean;
}

const ICON_MAP: Record<string, React.ElementType> = {
  Flame,
  Moon,
  Radio,
  Compass,
  Camera,
  Sparkles,
  Heart,
  Search,
  Wind,
  Trophy,
  HelpCircle,
  Palette,
  Wrench,
  Sun,
};

export const NasaPatchBadge: React.FC<NasaPatchBadgeProps> = ({
  badge,
  isUnlocked,
  size = "md",
  onClick,
  showTooltip = true,
}) => {
  const IconComponent = ICON_MAP[badge.iconName] || Sparkles;

  // Sizing definitions
  const sizeClasses = {
    sm: "w-20 h-24 text-[10px]",
    md: "w-32 h-36 text-xs",
    lg: "w-44 h-48 text-sm",
    hero: "w-60 h-64 text-base",
  };

  const iconSizes = {
    sm: "w-6 h-6",
    md: "w-10 h-10",
    lg: "w-14 h-14",
    hero: "w-20 h-20",
  };

  // Border thread styling
  const borderStyles = {
    "gold-thread": "border-[#F59E0B] shadow-[0_0_15px_rgba(245,158,11,0.4)]",
    "silver-thread": "border-[#E2E8F0] shadow-[0_0_15px_rgba(226,232,240,0.3)]",
    "cyan-glow": "border-[#00F0FF] shadow-[0_0_18px_rgba(0,240,255,0.4)]",
    "ruby-edge": "border-[#F43F5E] shadow-[0_0_15px_rgba(244,63,94,0.4)]",
  };

  // Patch outline shape classes
  const shapeClasses = {
    circle: "rounded-full",
    shield: "rounded-t-3xl rounded-b-[2rem]",
    chevron: "rounded-t-2xl rounded-b-sm [clip-path:polygon(50%_0%,100%_25%,100%_75%,50%_100%,0%_75%,0%_25%)]",
    hexagon: "[clip-path:polygon(50%_0%,100%_25%,100%_75%,50%_100%,0%_75%,0%_25%)]",
    oval: "rounded-[35%]",
  };

  return (
    <div
      onClick={onClick}
      className={`group relative flex flex-col items-center justify-center transition-all duration-300 select-none ${
        onClick ? "cursor-pointer hover:scale-105 active:scale-95" : ""
      } ${sizeClasses[size]}`}
      title={showTooltip ? `${badge.name}: ${badge.subtitle}` : undefined}
    >
      {/* ================= EMBROIDERED FABRIC BASE ================= */}
      <div
        className={`relative w-full h-full flex flex-col items-center justify-between p-3 overflow-hidden border-[3px] sm:border-[4px] border-dashed ${
          isUnlocked
            ? `${borderStyles[badge.borderStyle]} bg-gradient-to-b ${badge.bgGradient}`
            : "border-slate-700/60 bg-slate-900/80 grayscale opacity-40 shadow-none"
        } ${shapeClasses[badge.patchShape]}`}
        style={{
          boxShadow: isUnlocked
            ? "inset 0 0 12px rgba(0,0,0,0.8), 0 6px 18px rgba(0,0,0,0.6)"
            : "none",
        }}
      >
        {/* Subtle fabric weave texture pattern overlay */}
        <div
          className="absolute inset-0 opacity-15 pointer-events-none mix-blend-overlay"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 4px)",
          }}
        />

        {/* NASA-inspired decorative vector arc (swoosh) */}
        {isUnlocked && (
          <div
            className="absolute -top-4 -right-4 w-20 h-20 rounded-full border-t-2 border-r-2 opacity-30 pointer-events-none"
            style={{ borderColor: badge.accentColor }}
          />
        )}

        {/* Top Arc / Space Mission Text */}
        <div className="z-10 text-center uppercase tracking-widest font-mono font-black scale-90 sm:scale-100">
          <span
            className="text-[9px] sm:text-[10px] px-2 py-0.5 rounded-full bg-black/50 backdrop-blur"
            style={{ color: isUnlocked ? badge.accentColor : "#94A3B8" }}
          >
            {isUnlocked ? "NASA • EXPLORER" : "LOCKED RELIC"}
          </span>
        </div>

        {/* Center Embroidered Emblem Icon */}
        <div className="z-10 flex-1 flex items-center justify-center relative my-1">
          {isUnlocked ? (
            <div className="relative flex items-center justify-center">
              {/* Outer decorative ring */}
              <div
                className="absolute inset-0 rounded-full blur-sm opacity-50 scale-125"
                style={{ backgroundColor: badge.accentColor }}
              />
              <div
                className="p-2 sm:p-3 rounded-full bg-space-void/70 border border-white/20 shadow-md transform group-hover:rotate-6 transition-transform"
                style={{ borderColor: badge.accentColor }}
              >
                <IconComponent
                  className={`${iconSizes[size]}`}
                  style={{ color: badge.accentColor }}
                />
              </div>
            </div>
          ) : (
            <div className="p-3 rounded-full bg-slate-800/80 border border-slate-700 text-slate-500">
              <Lock className={`${iconSizes[size]}`} />
            </div>
          )}
        </div>

        {/* Bottom Embroidered Ribbon Banner */}
        <div className="z-10 w-full text-center">
          <div
            className={`w-full py-0.5 sm:py-1 px-1 rounded-md text-[9px] sm:text-[10px] font-display font-black tracking-wide truncate border shadow-sm ${
              isUnlocked
                ? "bg-slate-950/90 text-white border-white/20"
                : "bg-slate-900 text-slate-500 border-slate-800"
            }`}
          >
            {badge.name}
          </div>
        </div>

        {/* Shimmer effect on hover */}
        {isUnlocked && (
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
        )}
      </div>

      {/* XP Reward Pill underneath */}
      {isUnlocked && (
        <div className="mt-1.5 flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-[9px] font-mono font-bold text-amber-300">
          <span>+{badge.xpReward} XP</span>
        </div>
      )}
    </div>
  );
};

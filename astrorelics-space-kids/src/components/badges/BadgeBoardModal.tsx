"use client";

import React, { useState, useEffect } from "react";
import { NASA_MISSION_BADGES, NasaMissionBadge } from "@/data/badgeData";
import { badgeManager } from "@/lib/badgeManager";
import { NasaPatchBadge } from "./NasaPatchBadge";
import { soundEngine } from "@/lib/audio";
import {
  X,
  Award,
  Sparkles,
  Trophy,
  Lock,
  CheckCircle2,
  Calendar,
  Layers,
  Rocket,
  Compass,
} from "lucide-react";

interface BadgeBoardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToSpacecraft?: (spacecraftId: string) => void;
}

export const BadgeBoardModal: React.FC<BadgeBoardModalProps> = ({
  isOpen,
  onClose,
  onNavigateToSpacecraft,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<"all" | "story" | "quiz" | "activity">("all");
  const [selectedBadge, setSelectedBadge] = useState<NasaMissionBadge | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    const unsubscribe = badgeManager.subscribe(() => {
      setRefreshTrigger((prev) => prev + 1);
    });
    return () => unsubscribe();
  }, []);

  if (!isOpen) return null;

  const earnedCount = badgeManager.getEarnedBadgeCount();
  const totalCount = badgeManager.getTotalBadges();
  const totalXP = badgeManager.getTotalXP();
  const completionPercent = Math.round((earnedCount / totalCount) * 100);

  const filteredBadges = NASA_MISSION_BADGES.filter((badge) => {
    if (selectedCategory === "all") return true;
    return badge.category === selectedCategory;
  });

  const activeBadge = selectedBadge || filteredBadges[0] || NASA_MISSION_BADGES[0];
  const isSelectedUnlocked = badgeManager.isUnlocked(activeBadge.id);
  const earnedDate = badgeManager.getEarnedDate(activeBadge.id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-space-void/90 backdrop-blur-md animate-fadeIn select-none overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-space-abyss border-2 border-cyan-500/40 rounded-3xl p-5 sm:p-8 shadow-[0_0_60px_rgba(0,240,255,0.2)] text-white my-auto overflow-hidden flex flex-col max-h-[92vh]">
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-28 bg-gradient-to-b from-cyan-500/20 to-transparent pointer-events-none rounded-full blur-3xl" />

        {/* ================= HEADER SECTION ================= */}
        <div className="flex items-start justify-between gap-4 mb-6 relative z-10 flex-shrink-0">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider mb-1">
              <Award className="w-4 h-4 text-cyan-300" />
              <span>NASA FLIGHT JACKET • EMBROIDERED PATCH BOARD</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-black text-white">
              MY SPACE BADGE COLLECTION 🎖️
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
              Official NASA-inspired mission patches earned by exploring abandoned spacecraft, mastering cosmic quizzes, and restoring space history.
            </p>
          </div>

          <button
            onClick={() => {
              soundEngine.playClick();
              onClose();
            }}
            className="p-2.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors flex-shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ================= PROGRESS & STATS BANNER ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6 p-4 rounded-2xl bg-space-card/80 border border-slate-700/80 backdrop-blur-sm relative z-10 flex-shrink-0">
          {/* Stat 1: Badges Earned */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[11px] font-mono text-slate-400 uppercase">Patches Earned</div>
              <div className="text-xl font-display font-black text-amber-300">
                {earnedCount} <span className="text-xs text-slate-400 font-mono">/ {totalCount}</span>
              </div>
            </div>
          </div>

          {/* Stat 2: Total XP */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[11px] font-mono text-slate-400 uppercase">Explorer Rank XP</div>
              <div className="text-xl font-display font-black text-cyan-300">
                {totalXP} <span className="text-xs text-slate-400 font-mono">XP</span>
              </div>
            </div>
          </div>

          {/* Stat 3: Completion Progress */}
          <div className="flex flex-col justify-center">
            <div className="flex justify-between text-xs font-mono text-slate-300 mb-1.5">
              <span>Collection Progress</span>
              <span className="font-bold text-emerald-400">{completionPercent}%</span>
            </div>
            <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden border border-slate-700">
              <div
                className="bg-gradient-to-r from-cyan-500 via-amber-400 to-emerald-400 h-full transition-all duration-500 rounded-full"
                style={{ width: `${completionPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* ================= CATEGORY FILTER TABS ================= */}
        <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-1 relative z-10 flex-shrink-0">
          {[
            { id: "all", label: "All Patches" },
            { id: "story", label: "Story Missions" },
            { id: "quiz", label: "Cosmic Quizzes" },
            { id: "activity", label: "Creative Studios" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                soundEngine.playClick();
                setSelectedCategory(tab.id as any);
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all whitespace-nowrap ${
                selectedCategory === tab.id
                  ? "bg-cyan-500/20 border border-cyan-500/50 text-cyan-300 shadow-glow-sm-cyan"
                  : "bg-slate-800/60 hover:bg-slate-800 text-slate-400 hover:text-white border border-transparent"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ================= MAIN SPLIT CONTENT: GRID & DETAIL ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 overflow-y-auto pr-1 flex-grow">
          {/* LEFT: PATCH GRID (Cols 1-7) */}
          <div className="lg:col-span-7 grid grid-cols-3 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-space-void/60 border border-slate-800/80 items-start auto-rows-max">
            {filteredBadges.map((b) => {
              const unlocked = badgeManager.isUnlocked(b.id);
              const isSelected = activeBadge.id === b.id;

              return (
                <div
                  key={b.id}
                  onClick={() => {
                    soundEngine.playClick();
                    setSelectedBadge(b);
                  }}
                  className={`p-2 rounded-2xl flex flex-col items-center justify-center transition-all cursor-pointer relative ${
                    isSelected
                      ? "ring-2 ring-cyan-400 bg-cyan-950/30 scale-105"
                      : "hover:bg-slate-800/40"
                  }`}
                >
                  <NasaPatchBadge badge={b} isUnlocked={unlocked} size="sm" showTooltip={false} />
                  {unlocked && (
                    <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-emerald-500 text-black flex items-center justify-center text-[10px] font-bold shadow-md">
                      ✓
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* RIGHT: SELECTED PATCH INSPECTOR (Cols 8-12) */}
          <div className="lg:col-span-5 p-5 rounded-2xl bg-space-card/90 border border-slate-700/80 flex flex-col justify-between shadow-xl">
            <div>
              {/* Top status */}
              <div className="flex items-center justify-between gap-2 mb-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-mono font-bold flex items-center gap-1.5 ${
                    isSelectedUnlocked
                      ? "bg-emerald-950/80 text-emerald-300 border border-emerald-500/40"
                      : "bg-slate-900 text-slate-400 border border-slate-700"
                  }`}
                >
                  {isSelectedUnlocked ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>UNLOCKED & EARNED</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-3.5 h-3.5 text-slate-500" />
                      <span>MISSION LOCKED</span>
                    </>
                  )}
                </span>

                <span className="text-xs font-mono text-amber-300 font-bold">
                  +{activeBadge.xpReward} XP
                </span>
              </div>

              {/* Large Patch Preview */}
              <div className="flex justify-center my-3">
                <NasaPatchBadge badge={activeBadge} isUnlocked={isSelectedUnlocked} size="lg" showTooltip={false} />
              </div>

              {/* Title & Motto */}
              <div className="text-center my-3">
                <h3 className="text-xl font-display font-black text-white">
                  {activeBadge.name}
                </h3>
                <div className="text-xs font-mono text-cyan-300 font-bold">
                  {activeBadge.subtitle}
                </div>
                <div className="text-[11px] font-sans text-slate-400 italic mt-0.5">
                  &ldquo;{activeBadge.motto}&rdquo;
                </div>
              </div>

              {/* Lore & Appreciation Description */}
              <div className="space-y-2.5 text-xs text-slate-200 mt-4 leading-relaxed bg-space-void/80 p-3.5 rounded-xl border border-slate-800">
                <div>
                  <div className="font-mono text-amber-300 font-bold uppercase text-[10px] mb-0.5">
                    Historical Lore:
                  </div>
                  <p>{activeBadge.loreDescription}</p>
                </div>

                {isSelectedUnlocked ? (
                  <div className="pt-2 border-t border-slate-800">
                    <div className="font-mono text-emerald-300 font-bold uppercase text-[10px] mb-0.5">
                      Explorer Commendation:
                    </div>
                    <p className="text-emerald-100 italic">&ldquo;{activeBadge.appreciationMessage}&rdquo;</p>
                  </div>
                ) : (
                  <div className="pt-2 border-t border-slate-800">
                    <div className="font-mono text-cyan-300 font-bold uppercase text-[10px] mb-0.5">
                      How to Earn This Patch:
                    </div>
                    <p className="text-cyan-100">{activeBadge.howToUnlock}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Date Earned or Mission Action */}
            <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
              {isSelectedUnlocked && earnedDate ? (
                <div className="flex items-center gap-1.5 text-slate-400 font-mono text-[11px]">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>Earned on {new Date(earnedDate).toLocaleDateString()}</span>
                </div>
              ) : (
                <span className="text-slate-500 font-mono text-[11px]">Keep exploring to earn!</span>
              )}

              {activeBadge.spacecraftId && onNavigateToSpacecraft && (
                <button
                  onClick={() => {
                    soundEngine.playClick();
                    onClose();
                    onNavigateToSpacecraft(activeBadge.spacecraftId!);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 font-mono font-bold text-xs flex items-center gap-1.5 transition-all"
                >
                  <Rocket className="w-3.5 h-3.5" />
                  <span>View Machine</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

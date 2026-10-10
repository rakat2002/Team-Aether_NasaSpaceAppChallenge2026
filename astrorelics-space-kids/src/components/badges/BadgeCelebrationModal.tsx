"use client";

import React, { useEffect } from "react";
import confetti from "canvas-confetti";
import { NasaMissionBadge } from "@/data/badgeData";
import { NasaPatchBadge } from "./NasaPatchBadge";
import { soundEngine } from "@/lib/audio";
import { Sparkles, Trophy, X, Award, ArrowRight } from "lucide-react";

interface BadgeCelebrationModalProps {
  badge: NasaMissionBadge | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenBadgeBoard?: () => void;
}

export const BadgeCelebrationModal: React.FC<BadgeCelebrationModalProps> = ({
  badge,
  isOpen,
  onClose,
  onOpenBadgeBoard,
}) => {
  useEffect(() => {
    if (isOpen && badge) {
      soundEngine.playSuccess();
      // Multi-stage celebratory confetti burst
      confetti({
        particleCount: 120,
        spread: 90,
        origin: { y: 0.5 },
        colors: ["#F59E0B", "#00F0FF", "#F43F5E", "#E2E8F0", "#A855F7"],
      });

      const timer = setTimeout(() => {
        confetti({
          particleCount: 60,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
        });
        confetti({
          particleCount: 60,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
        });
      }, 350);

      return () => clearTimeout(timer);
    }
  }, [isOpen, badge]);

  if (!isOpen || !badge) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-space-void/90 backdrop-blur-md animate-fadeIn select-none overflow-y-auto">
      <div className="relative w-full max-w-lg bg-space-abyss border-2 border-amber-500/50 rounded-3xl p-6 sm:p-8 shadow-[0_0_50px_rgba(245,158,11,0.3)] text-white text-center my-auto overflow-hidden">
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-gradient-to-b from-amber-500/25 to-transparent pointer-events-none rounded-full blur-2xl" />

        {/* Close Button */}
        <button
          onClick={() => {
            soundEngine.playClick();
            onClose();
          }}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Mini header tag */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 font-mono text-xs font-bold uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" />
          <span>OFFICIAL NASA MISSION PATCH AWARDED</span>
        </div>

        {/* Inspiring Title */}
        <h2 className="text-2xl sm:text-3xl font-display font-black text-white mb-1">
          YOU EARNED A MISSION BADGE! 🎖️
        </h2>
        <p className="text-xs sm:text-sm font-sans text-cyan-300 mb-6">
          Appreciating your curiosity, courage, and dedication to space science!
        </p>

        {/* Center Hero Badge Display */}
        <div className="my-4 flex justify-center transform hover:scale-110 transition-transform duration-300">
          <NasaPatchBadge badge={badge} isUnlocked={true} size="hero" showTooltip={false} />
        </div>

        {/* Motto / Subtitle */}
        <div className="mt-4 mb-2">
          <div className="text-lg font-display font-black text-amber-300">
            &ldquo;{badge.name}&rdquo;
          </div>
          <div className="text-xs font-mono text-slate-400 italic">
            &ldquo;{badge.motto}&rdquo;
          </div>
        </div>

        {/* Personalized Appreciation Message */}
        <div className="p-4 rounded-2xl bg-space-void/80 border border-amber-500/30 text-left my-4 shadow-inner">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400 mb-1.5 uppercase tracking-wider">
            <Award className="w-4 h-4 text-amber-400" />
            <span>Mission Commendation:</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
            {badge.appreciationMessage}
          </p>
          <div className="mt-3 pt-2.5 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono">
            <span className="text-slate-400">XP Earned:</span>
            <span className="font-bold text-amber-400">+{badge.xpReward} XP</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          <button
            onClick={() => {
              soundEngine.playClick();
              onClose();
            }}
            className="flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-rose-500 text-black font-display font-black text-xs sm:text-sm tracking-wider shadow-glow-gold hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <span>PROUDLY WEAR THIS PATCH</span>
            <Sparkles className="w-4 h-4" />
          </button>

          {onOpenBadgeBoard && (
            <button
              onClick={() => {
                soundEngine.playClick();
                onClose();
                onOpenBadgeBoard();
              }}
              className="py-3.5 px-5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-mono text-xs font-bold transition-all flex items-center justify-center gap-1.5"
            >
              <span>VIEW ALL BADGES</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

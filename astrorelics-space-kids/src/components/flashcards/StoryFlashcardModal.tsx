"use client";

import React, { useState } from "react";
import { SpacecraftFlashcard, getFlashcardBySpacecraftId } from "@/data/flashcardData";
import { soundEngine } from "@/lib/audio";
import {
  RotateCcw,
  Sparkles,
  BookOpen,
  X,
  Compass,
  Award,
  ArrowRight,
  Info,
  Calendar,
  MapPin,
  Clock,
  Heart,
} from "lucide-react";

interface StoryFlashcardModalProps {
  spacecraftId: string;
  isOpen: boolean;
  onClose: () => void;
  onClaimBadge?: () => void;
}

export const StoryFlashcardModal: React.FC<StoryFlashcardModalProps> = ({
  spacecraftId,
  isOpen,
  onClose,
  onClaimBadge,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const flashcard = getFlashcardBySpacecraftId(spacecraftId) || getFlashcardBySpacecraftId("opportunity");

  if (!isOpen || !flashcard) return null;

  const handleFlip = () => {
    soundEngine.playClick();
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-space-void/90 backdrop-blur-md animate-fadeIn select-none overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-space-abyss border-2 border-amber-500/50 rounded-3xl p-5 sm:p-8 shadow-[0_0_60px_rgba(245,158,11,0.25)] text-white my-auto overflow-hidden">
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-gradient-to-b from-amber-500/20 to-transparent pointer-events-none rounded-full blur-2xl" />

        {/* Close Button */}
        <button
          onClick={() => {
            soundEngine.playClick();
            onClose();
          }}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors z-20"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Header Tag */}
        <div className="flex items-center justify-between pr-10 mb-4 z-10 relative">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 font-mono text-xs font-bold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5 text-amber-400" />
            <span>MISSION SUMMARY FLASHCARD</span>
          </div>
          <span className="text-xs font-mono text-cyan-300 hidden sm:inline">
            CLICK CARD TO FLIP 🔄
          </span>
        </div>

        {/* ================= 3D FLIPPABLE FLASHCARD CONTAINER ================= */}
        <div
          onClick={handleFlip}
          className="relative w-full min-h-[380px] sm:min-h-[420px] cursor-pointer transition-transform duration-500 perspective-1000 group mb-6"
        >
          <div
            className={`relative w-full h-full rounded-2xl p-5 sm:p-6 border-2 transition-all duration-700 [transform-style:preserve-3d] ${
              isFlipped ? "[transform:rotateY(180deg)]" : ""
            } ${
              isFlipped
                ? "bg-gradient-to-br from-slate-900 via-indigo-950 to-space-void border-cyan-500/50 shadow-glow-cyan"
                : "bg-gradient-to-br from-space-card via-amber-950/40 to-space-void border-amber-500/50 shadow-glow-gold"
            }`}
          >
            {/* ================= FRONT SIDE ================= */}
            <div
              className={`w-full h-full flex flex-col justify-between [backface-visibility:hidden] ${
                isFlipped ? "pointer-events-none opacity-0" : "opacity-100"
              }`}
            >
              <div>
                {/* Status Badge & Mission Name */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <span className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 font-mono text-xs font-bold">
                    {flashcard.missionName}
                  </span>
                  <span className="text-xs font-mono text-slate-300 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    {flashcard.operationalDates}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-display font-black text-white mb-1">
                  {flashcard.name}
                </h3>
                <div className="text-xs sm:text-sm font-mono text-cyan-300 flex items-center gap-1.5 mb-4">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{flashcard.destination}</span>
                </div>

                {/* Hero Photo / Schematic Area */}
                <div className="relative w-full h-44 sm:h-52 rounded-xl overflow-hidden border border-slate-700/80 mb-4 bg-slate-950 group-hover:border-amber-400/60 transition-colors">
                  <img
                    src={flashcard.heroImage}
                    alt={flashcard.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-space-void via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-2 left-3 right-3 text-xs font-mono text-amber-200 bg-space-void/80 px-2.5 py-1 rounded-md border border-amber-500/30 backdrop-blur truncate">
                    STATUS: {flashcard.statusBadge}
                  </div>
                </div>

                {/* 4 Quick Stat Pills */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
                  {flashcard.stats.map((s, idx) => (
                    <div
                      key={idx}
                      className="p-2 rounded-xl bg-space-void/80 border border-slate-800"
                    >
                      <div className="text-[10px] font-mono text-slate-400 uppercase truncate">
                        {s.label}
                      </div>
                      <div className="font-mono font-bold text-amber-300 truncate">
                        {s.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Flip Indicator */}
              <div className="pt-3 mt-3 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
                <span className="flex items-center gap-1.5 text-amber-300">
                  <RotateCcw className="w-3.5 h-3.5 animate-spin" />
                  Click anywhere to flip for Story Summary & Discovery!
                </span>
                <span className="hidden sm:inline">Page 1 of 2</span>
              </div>
            </div>

            {/* ================= BACK SIDE (STORY SUMMARY) ================= */}
            <div
              className={`absolute inset-0 p-5 sm:p-6 w-full h-full flex flex-col justify-between [transform:rotateY(180deg)] [backface-visibility:hidden] ${
                !isFlipped ? "pointer-events-none opacity-0" : "opacity-100"
              }`}
            >
              <div className="space-y-3.5 overflow-y-auto pr-1">
                {/* Top header */}
                <div className="flex items-center justify-between pb-2 border-b border-cyan-500/30">
                  <div className="text-xs font-mono text-cyan-300 font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                    <span>STORY SUMMARY & HISTORICAL ARCHAEOLOGY</span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400">Page 2 of 2</span>
                </div>

                {/* 3-Stage Story Summary Box */}
                <div className="p-3.5 rounded-xl bg-space-void/80 border border-cyan-500/30 text-xs space-y-2 leading-relaxed">
                  <div>
                    <span className="font-mono font-bold text-cyan-300 mr-1.5 uppercase">
                      1. The Birth:
                    </span>
                    <span className="text-slate-200">{flashcard.storySummary.birth}</span>
                  </div>
                  <div>
                    <span className="font-mono font-bold text-amber-300 mr-1.5 uppercase">
                      2. The Mission:
                    </span>
                    <span className="text-slate-200">{flashcard.storySummary.mission}</span>
                  </div>
                  <div>
                    <span className="font-mono font-bold text-rose-300 mr-1.5 uppercase">
                      3. Twilight & Legacy:
                    </span>
                    <span className="text-slate-200">{flashcard.storySummary.goodbye}</span>
                  </div>
                </div>

                {/* Scientific Discovery Box */}
                <div className="p-3 rounded-xl bg-indigo-950/40 border border-indigo-500/30 text-xs">
                  <div className="font-mono font-bold text-indigo-300 uppercase text-[11px] mb-1 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Major Scientific Discovery</span>
                  </div>
                  <p className="text-slate-200 leading-relaxed">{flashcard.keyDiscovery}</p>
                </div>

                {/* Why Left Behind Box */}
                <div className="p-3 rounded-xl bg-space-void/70 border border-slate-700/80 text-xs">
                  <div className="font-mono font-bold text-amber-300 uppercase text-[11px] mb-1">
                    Why Left in Space:
                  </div>
                  <p className="text-slate-300 leading-relaxed">{flashcard.whyLeftBehind}</p>
                </div>

                {/* Inspiring Takeaway Box */}
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs">
                  <div className="font-mono font-bold text-amber-300 uppercase text-[11px] mb-1 flex items-center gap-1.5">
                    <Heart className="w-3.5 h-3.5 text-rose-400" />
                    <span>Inspirational Lesson for You</span>
                  </div>
                  <p className="text-amber-100 font-sans italic">&ldquo;{flashcard.inspirationalTakeaway}&rdquo;</p>
                </div>
              </div>

              {/* Bottom Flip Indicator */}
              <div className="pt-2 mt-2 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
                <span className="text-cyan-300 flex items-center gap-1.5">
                  <RotateCcw className="w-3.5 h-3.5" />
                  Click to flip back to spacecraft photo
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleFlip}
            className="py-3 px-5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-mono text-xs font-bold transition-all flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-4 h-4 text-amber-400" />
            <span>{isFlipped ? "FLIP TO FRONT" : "FLIP TO STORY SUMMARY"}</span>
          </button>

          {onClaimBadge && (
            <button
              onClick={() => {
                soundEngine.playClick();
                onClaimBadge();
              }}
              className="flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 text-white font-display font-black text-xs sm:text-sm tracking-wider shadow-glow-gold hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <Award className="w-4 h-4 text-amber-200" />
              <span>CLAIM MISSION PATCH & CONTINUE</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

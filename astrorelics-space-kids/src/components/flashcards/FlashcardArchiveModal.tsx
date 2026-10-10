"use client";

import React, { useState } from "react";
import { SPACECRAFT_FLASHCARDS, SpacecraftFlashcard } from "@/data/flashcardData";
import { soundEngine } from "@/lib/audio";
import {
  X,
  BookOpen,
  RotateCcw,
  Sparkles,
  MapPin,
  Clock,
  ChevronLeft,
  ChevronRight,
  Heart,
  Award,
} from "lucide-react";

interface FlashcardArchiveModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSpacecraft?: (spacecraftId: string) => void;
}

export const FlashcardArchiveModal: React.FC<FlashcardArchiveModalProps> = ({
  isOpen,
  onClose,
  onSelectSpacecraft,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  if (!isOpen) return null;

  const currentCard = SPACECRAFT_FLASHCARDS[selectedIndex];

  const handleNext = () => {
    soundEngine.playClick();
    setIsFlipped(false);
    setSelectedIndex((prev) => (prev + 1) % SPACECRAFT_FLASHCARDS.length);
  };

  const handlePrev = () => {
    soundEngine.playClick();
    setIsFlipped(false);
    setSelectedIndex((prev) =>
      prev === 0 ? SPACECRAFT_FLASHCARDS.length - 1 : prev - 1
    );
  };

  const handleFlip = () => {
    soundEngine.playClick();
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-space-void/90 backdrop-blur-md animate-fadeIn select-none overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-space-abyss border-2 border-cyan-500/40 rounded-3xl p-5 sm:p-8 shadow-[0_0_60px_rgba(0,240,255,0.25)] text-white my-auto overflow-hidden flex flex-col max-h-[92vh]">
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-28 bg-gradient-to-b from-cyan-500/20 to-transparent pointer-events-none rounded-full blur-3xl" />

        {/* ================= HEADER SECTION ================= */}
        <div className="flex items-start justify-between gap-4 mb-4 relative z-10 flex-shrink-0">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider mb-1">
              <BookOpen className="w-4 h-4 text-cyan-300" />
              <span>SPACE ARCHAEOLOGY REPOSITORY</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-black text-white">
              COSMIC STORY FLASHCARDS 🎴
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
              Permanent summaries of humanity&apos;s bravest spacecraft: their birth, epic missions, twilight, and why they remain preserved across the solar system.
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

        {/* Spacecraft Quick Switcher Strip */}
        <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-1 relative z-10 flex-shrink-0">
          {SPACECRAFT_FLASHCARDS.map((card, idx) => (
            <button
              key={card.id}
              onClick={() => {
                soundEngine.playClick();
                setIsFlipped(false);
                setSelectedIndex(idx);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold whitespace-nowrap transition-all ${
                selectedIndex === idx
                  ? "bg-cyan-500/20 border border-cyan-500/50 text-cyan-300 shadow-glow-sm-cyan"
                  : "bg-slate-800/60 hover:bg-slate-800 text-slate-400 border border-transparent"
              }`}
            >
              {card.name.split(" ")[0]}
            </button>
          ))}
        </div>

        {/* ================= MAIN 3D FLIP CARD VIEW ================= */}
        <div
          onClick={handleFlip}
          className="relative w-full flex-grow min-h-[380px] sm:min-h-[420px] cursor-pointer transition-transform duration-500 perspective-1000 group mb-4 overflow-hidden"
        >
          <div
            className={`relative w-full h-full rounded-2xl p-5 sm:p-6 border-2 transition-all duration-700 [transform-style:preserve-3d] ${
              isFlipped ? "[transform:rotateY(180deg)]" : ""
            } ${
              isFlipped
                ? "bg-gradient-to-br from-slate-900 via-indigo-950 to-space-void border-cyan-500/50 shadow-glow-cyan"
                : "bg-gradient-to-br from-space-card via-slate-900 to-space-void border-amber-500/40 shadow-glow-gold"
            }`}
          >
            {/* FRONT OF CARD */}
            <div
              className={`w-full h-full flex flex-col justify-between [backface-visibility:hidden] ${
                isFlipped ? "pointer-events-none opacity-0" : "opacity-100"
              }`}
            >
              <div className="overflow-y-auto pr-1">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <span className="px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 font-mono text-xs font-bold">
                    {currentCard.missionName}
                  </span>
                  <span className="text-xs font-mono text-slate-300 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    {currentCard.operationalDates}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-display font-black text-white mb-1">
                  {currentCard.name}
                </h3>
                <div className="text-xs sm:text-sm font-mono text-cyan-300 flex items-center gap-1.5 mb-4">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{currentCard.destination}</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center mb-4">
                  <div className="md:col-span-7 h-44 sm:h-52 rounded-xl overflow-hidden border border-slate-700 relative bg-slate-950">
                    <img
                      src={currentCard.heroImage}
                      alt={currentCard.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute bottom-2 left-2 right-2 text-[11px] font-mono text-amber-200 bg-space-void/85 px-2 py-1 rounded border border-amber-500/30 truncate">
                      STATUS: {currentCard.statusBadge}
                    </div>
                  </div>

                  <div className="md:col-span-5 grid grid-cols-2 gap-2 text-xs">
                    {currentCard.stats.map((s, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-space-void/80 border border-slate-800 flex flex-col justify-center"
                      >
                        <div className="text-[10px] font-mono text-slate-400 uppercase truncate">
                          {s.label}
                        </div>
                        <div className="font-mono font-bold text-amber-300 truncate text-sm mt-0.5">
                          {s.value}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
                <span className="flex items-center gap-1.5 text-amber-300 font-bold">
                  <RotateCcw className="w-3.5 h-3.5 animate-spin" />
                  Click to Flip for Story Summary & Discovery
                </span>
                <span>
                  Card {selectedIndex + 1} of {SPACECRAFT_FLASHCARDS.length}
                </span>
              </div>
            </div>

            {/* BACK OF CARD */}
            <div
              className={`absolute inset-0 p-5 sm:p-6 w-full h-full flex flex-col justify-between [transform:rotateY(180deg)] [backface-visibility:hidden] ${
                !isFlipped ? "pointer-events-none opacity-0" : "opacity-100"
              }`}
            >
              <div className="space-y-3 overflow-y-auto pr-1">
                <div className="flex items-center justify-between pb-2 border-b border-cyan-500/30">
                  <div className="text-xs font-mono text-cyan-300 font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{currentCard.name} — SUMMARY & DISCOVERY</span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400">Back Side</span>
                </div>

                <div className="p-3 rounded-xl bg-space-void/80 border border-cyan-500/30 text-xs space-y-1.5 leading-relaxed">
                  <div>
                    <span className="font-mono font-bold text-cyan-300 mr-1.5 uppercase">1. Birth:</span>
                    <span className="text-slate-200">{currentCard.storySummary.birth}</span>
                  </div>
                  <div>
                    <span className="font-mono font-bold text-amber-300 mr-1.5 uppercase">2. Mission:</span>
                    <span className="text-slate-200">{currentCard.storySummary.mission}</span>
                  </div>
                  <div>
                    <span className="font-mono font-bold text-rose-300 mr-1.5 uppercase">3. Twilight:</span>
                    <span className="text-slate-200">{currentCard.storySummary.goodbye}</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-indigo-950/40 border border-indigo-500/30 text-xs">
                  <div className="font-mono font-bold text-indigo-300 uppercase text-[11px] mb-1">
                    Major Scientific Discovery:
                  </div>
                  <p className="text-slate-200">{currentCard.keyDiscovery}</p>
                </div>

                <div className="p-3 rounded-xl bg-space-void/80 border border-slate-700 text-xs">
                  <div className="font-mono font-bold text-amber-300 uppercase text-[11px] mb-1">
                    Why Left Behind in Space:
                  </div>
                  <p className="text-slate-300">{currentCard.whyLeftBehind}</p>
                </div>

                <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs flex items-center gap-2">
                  <Heart className="w-4 h-4 text-rose-400 flex-shrink-0" />
                  <span className="text-amber-100 font-sans italic">&ldquo;{currentCard.inspirationalTakeaway}&rdquo;</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
                <span className="text-cyan-300 flex items-center gap-1.5">
                  <RotateCcw className="w-3.5 h-3.5" />
                  Click to flip back
                </span>
                <span>
                  Card {selectedIndex + 1} of {SPACECRAFT_FLASHCARDS.length}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel Footer Navigation */}
        <div className="flex items-center justify-between gap-3 relative z-10 flex-shrink-0">
          <button
            onClick={handlePrev}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-mono text-xs font-bold transition-all flex items-center gap-1.5"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous Card</span>
          </button>

          <button
            onClick={handleFlip}
            className="px-4 py-2.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/50 font-mono text-xs font-bold transition-all flex items-center gap-1.5"
          >
            <RotateCcw className="w-4 h-4 text-cyan-400" />
            <span>{isFlipped ? "Flip to Photo" : "Flip to Summary"}</span>
          </button>

          <button
            onClick={handleNext}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-mono text-xs font-bold transition-all flex items-center gap-1.5"
          >
            <span>Next Card</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

"use client";

import React, { useState, useEffect } from "react";
import { soundEngine } from "@/lib/audio";
import { badgeManager } from "@/lib/badgeManager";
import {
  Volume2,
  VolumeX,
  Compass,
  Rocket,
  Palette,
  HelpCircle,
  Wrench,
  Award,
  BookOpen,
} from "lucide-react";

interface HeaderProps {
  currentView: "welcome" | "solar" | "story";
  onNavigate: (view: "welcome" | "solar" | "story") => void;
  onOpenFleet?: () => void;
  onOpenQuiz?: () => void;
  onOpenColoringBook?: () => void;
  onOpenBuildSpaceship?: () => void;
  onOpenBadges?: () => void;
  onOpenFlashcards?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  onOpenFleet,
  onOpenQuiz,
  onOpenColoringBook,
  onOpenBuildSpaceship,
  onOpenBadges,
  onOpenFlashcards,
}) => {
  const [isSoundOn, setIsSoundOn] = useState(true);
  const [badgeCount, setBadgeCount] = useState(0);

  useEffect(() => {
    setIsSoundOn(soundEngine.getIsSoundOn());
    setBadgeCount(badgeManager.getEarnedBadgeCount());

    const unsubscribe = badgeManager.subscribe(() => {
      setBadgeCount(badgeManager.getEarnedBadgeCount());
    });
    return () => unsubscribe();
  }, []);

  const toggleSound = () => {
    const nextState = soundEngine.toggleMute();
    setIsSoundOn(nextState);
    if (nextState) soundEngine.playClick();
  };

  const handleNav = (view: "welcome" | "solar" | "story") => {
    soundEngine.playClick();
    onNavigate(view);
  };

  return (
    <header className="fixed top-0 inset-x-0 z-40 px-3 sm:px-6 py-2.5 bg-space-void/85 backdrop-blur-md border-b border-cyan-500/20 flex items-center justify-between text-white select-none">
      {/* Brand & Mission Title */}
      <div
        onClick={() => handleNav("welcome")}
        className="flex items-center gap-2.5 cursor-pointer group"
      >
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500 via-blue-600 to-purple-600 p-[1.5px] shadow-glow-sm-cyan transition-transform group-hover:scale-110 flex-shrink-0">
          <div className="w-full h-full rounded-full bg-space-void flex items-center justify-center">
            <Rocket className="w-4 h-4 text-cyan-300" />
          </div>
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <span className="font-display font-black text-xs sm:text-sm tracking-wider bg-gradient-to-r from-cyan-400 via-sky-300 to-amber-300 bg-clip-text text-transparent">
              ASTRORELICS • SPACE KIDS
            </span>
            <span className="hidden md:inline px-1.5 py-0.2 rounded bg-cyan-950/80 text-[10px] font-mono text-cyan-300 border border-cyan-800">
              NASA SPACE ARCHAEOLOGY
            </span>
          </div>
          <span className="text-[10px] text-slate-400 font-sans hidden sm:block">
            Brave spacecraft stories, NASA badges, and solar system discoveries
          </span>
        </div>
      </div>

      {/* Navigation & Activity Action Buttons */}
      <nav className="flex items-center gap-1 sm:gap-2">
        {/* Solar System Button */}
        <button
          onClick={() => handleNav("solar")}
          className={`px-3 py-1.5 rounded-xl text-xs font-mono font-medium transition-all flex items-center gap-1.5 ${
            currentView === "solar"
              ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-glow-sm-cyan"
              : "text-slate-300 hover:text-white hover:bg-slate-800/60"
          }`}
        >
          <Compass className="w-3.5 h-3.5 text-cyan-400" />
          <span className="hidden sm:inline">Solar System</span>
        </button>

        {/* 1. FLASHCARDS BUTTON (from 2nd option) */}
        {onOpenFlashcards && (
          <button
            onClick={() => {
              soundEngine.playClick();
              onOpenFlashcards();
            }}
            className="px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-mono font-bold bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 transition-all flex items-center gap-1.5 shadow-sm active:scale-95"
            title="Cosmic Story Flashcards"
          >
            <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden md:inline">Flashcards</span>
            <span className="md:hidden">Cards</span>
          </button>
        )}

        {/* 2. NASA MISSION BADGES BUTTON */}
        {onOpenBadges && (
          <button
            onClick={() => {
              soundEngine.playClick();
              onOpenBadges();
            }}
            className="px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-mono font-bold bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/40 transition-all flex items-center gap-1.5 shadow-sm active:scale-95 relative"
            title="My NASA Mission Badges"
          >
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden md:inline">Badges</span>
            <span className="px-1.5 py-0.2 rounded-full bg-amber-500 text-black text-[10px] font-bold">
              {badgeCount}
            </span>
          </button>
        )}

        {/* 3. COLOR BOOK BUTTON (Improved!) */}
        {onOpenColoringBook && (
          <button
            onClick={() => {
              soundEngine.playClick();
              onOpenColoringBook();
            }}
            className="px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-mono font-bold bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/40 transition-all flex items-center gap-1.5 shadow-sm active:scale-95"
            title="Spacecraft Coloring Studio"
          >
            <Palette className="w-3.5 h-3.5 text-rose-400" />
            <span className="hidden md:inline">Color Studio</span>
            <span className="md:hidden">Color</span>
          </button>
        )}

        {/* 4. SPACE QUIZ BUTTON */}
        {onOpenQuiz && (
          <button
            onClick={() => {
              soundEngine.playClick();
              onOpenQuiz();
            }}
            className="px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-mono font-bold bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 border border-purple-500/40 transition-all flex items-center gap-1.5 shadow-sm active:scale-95"
            title="Cosmic Detective Quiz"
          >
            <HelpCircle className="w-3.5 h-3.5 text-purple-400" />
            <span className="hidden md:inline">Space Quiz</span>
            <span className="md:hidden">Quiz</span>
          </button>
        )}

        {/* 5. BUILD SPACESHIP BUTTON */}
        {onOpenBuildSpaceship && (
          <button
            onClick={() => {
              soundEngine.playClick();
              onOpenBuildSpaceship();
            }}
            className="px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-mono font-bold bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-all hidden xl:flex items-center gap-1.5"
            title="Build Your Own Spacecraft"
          >
            <Wrench className="w-3.5 h-3.5 text-amber-400" />
            <span>Workshop</span>
          </button>
        )}

        {/* Spacecraft Fleet Access */}
        {onOpenFleet && (
          <button
            onClick={() => {
              soundEngine.playClick();
              onOpenFleet();
            }}
            className="px-2.5 py-1.5 rounded-xl text-xs font-mono font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 transition-all hidden lg:flex items-center gap-1"
          >
            <Rocket className="w-3.5 h-3.5 text-cyan-400" />
            <span>8 Machines</span>
          </button>
        )}

        {/* Sound Toggle */}
        <button
          onClick={toggleSound}
          title={isSoundOn ? "Sound On (Click to Mute)" : "Muted (Click for Sound)"}
          className={`p-2 rounded-xl border transition-all ${
            isSoundOn
              ? "bg-cyan-950/40 border-cyan-500/40 text-cyan-300 shadow-sm"
              : "bg-slate-900 border-slate-700 text-slate-500"
          }`}
        >
          {isSoundOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        </button>
      </nav>
    </header>
  );
};

"use client";

import React, { useState } from "react";
import { soundEngine } from "@/lib/audio";
import {
  ArrowRight,
  Sparkles,
  Orbit,
  Compass,
  Rocket,
  BookOpen,
  Award,
  Palette,
  HelpCircle,
  Wrench,
} from "lucide-react";
import { OpportunityModel } from "../spacecraft/OpportunityModel";
import { Voyager1Model } from "../spacecraft/Voyager1Model";
import { Apollo11Model } from "../spacecraft/Apollo11Model";

interface WelcomeScreenProps {
  onStartJourney: () => void;
  onOpenSpacecraft?: (id: string) => void;
  onOpenQuiz?: () => void;
  onOpenColoringBook?: () => void;
  onOpenBuildSpaceship?: () => void;
  onOpenBadges?: () => void;
  onOpenFlashcards?: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  onStartJourney,
  onOpenSpacecraft,
  onOpenQuiz,
  onOpenColoringBook,
  onOpenBuildSpaceship,
  onOpenBadges,
  onOpenFlashcards,
}) => {
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [isLaunching, setIsLaunching] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 30;
    const y = (clientY / innerHeight - 0.5) * 30;
    setMouseOffset({ x, y });
  };

  const handleLaunchClick = () => {
    if (isLaunching) return;
    setIsLaunching(true);
    soundEngine.playWarp();
    // Trigger transition sequence
    setTimeout(() => {
      onStartJourney();
    }, 1200);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className={`relative min-h-screen w-full flex flex-col items-center justify-center p-6 text-center select-none overflow-hidden transition-all duration-1000 ${
        isLaunching ? "scale-125 opacity-0 blur-sm pointer-events-none" : "scale-100 opacity-100"
      }`}
    >
      {/* ================= FLOATING BACKGROUND SPACECRAFT ================= */}
      {/* Background Opportunity Rover (Floating bottom-left) */}
      <div
        className="absolute bottom-12 left-6 lg:left-20 pointer-events-auto opacity-75 hover:opacity-100 transition-all duration-700 hover:scale-105 cursor-pointer hidden md:block"
        style={{
          transform: `translate3d(${mouseOffset.x * -0.8}px, ${mouseOffset.y * -0.8}px, 0)`,
        }}
        onClick={() => {
          soundEngine.playSpacecraftActivate();
          if (onOpenSpacecraft) onOpenSpacecraft("opportunity");
        }}
      >
        <OpportunityModel size={170} interactive={false} />
        <div className="text-[11px] font-mono text-cyan-300 bg-space-void/80 px-2.5 py-0.5 rounded-full border border-cyan-500/30 backdrop-blur inline-block mt-1">
          Opportunity Rover
        </div>
      </div>

      {/* Background Voyager 1 (Floating top-right) */}
      <div
        className="absolute top-20 right-6 lg:right-20 pointer-events-auto opacity-75 hover:opacity-100 transition-all duration-700 hover:scale-105 cursor-pointer hidden md:block"
        style={{
          transform: `translate3d(${mouseOffset.x * 1.2}px, ${mouseOffset.y * 1.2}px, 0) rotate(-15deg)`,
        }}
        onClick={() => {
          soundEngine.playSpacecraftActivate();
          if (onOpenSpacecraft) onOpenSpacecraft("voyager-1");
        }}
      >
        <Voyager1Model size={150} />
        <div className="text-[11px] font-mono text-amber-300 bg-space-void/80 px-2.5 py-0.5 rounded-full border border-amber-500/30 backdrop-blur inline-block mt-1">
          Voyager 1 • Interstellar
        </div>
      </div>

      {/* Background Apollo 11 Lunar Module (Floating top-left) */}
      <div
        className="absolute top-24 left-8 lg:left-24 pointer-events-auto opacity-60 hover:opacity-100 transition-all duration-700 hover:scale-105 cursor-pointer hidden lg:block"
        style={{
          transform: `translate3d(${mouseOffset.x * 0.9}px, ${mouseOffset.y * 0.9}px, 0)`,
        }}
        onClick={() => {
          soundEngine.playSpacecraftActivate();
          if (onOpenSpacecraft) onOpenSpacecraft("apollo-11-lm");
        }}
      >
        <Apollo11Model size={130} />
        <div className="text-[10px] font-mono text-slate-300 bg-space-void/80 px-2 py-0.5 rounded-full border border-slate-700 backdrop-blur inline-block mt-1">
          Apollo 11 Eagle
        </div>
      </div>

      {/* ================= MAIN HERO CONTENT ================= */}
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        {/* Top Floating Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/70 border border-cyan-500/40 text-cyan-300 text-xs sm:text-sm font-mono tracking-widest uppercase mb-6 shadow-glow-sm-cyan backdrop-blur animate-float">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>ASTRORELICS • NASA SPACE APPS</span>
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
          <span>AGES 8–12</span>
        </div>

        {/* Big Friendly Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-display font-black tracking-tight text-white mb-4 leading-tight">
          WELCOME, LITTLE{" "}
          <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-amber-300 bg-clip-text text-transparent">
            ASTRONAUTS
          </span>{" "}
          🚀
        </h1>

        {/* Sub-headline */}
        <p className="text-lg sm:text-2xl font-sans text-slate-200 max-w-2xl mx-auto mb-8 leading-relaxed drop-shadow-md">
          Ready to explore the brave machines humans left behind?
        </p>

        {/* Story Intro Card */}
        <div className="mb-8 max-w-xl p-4 sm:p-5 rounded-2xl bg-space-card/75 border border-slate-700/60 backdrop-blur-md text-left text-xs sm:text-sm text-slate-300 leading-relaxed shadow-xl">
          <p className="mb-2">
            Across millions of kilometers of deep space, robotic rovers, landers, and probes are resting on the Moon, climbing red craters on Mars, and sailing past distant stars.
          </p>
          <p className="text-cyan-300 font-bold flex items-center gap-1.5">
            <Orbit className="w-4 h-4 text-cyan-400" />
            They are abandoned... but NEVER forgotten!
          </p>
        </div>

        {/* ================= BIG GLOWING CTA BUTTON ================= */}
        <button
          onClick={handleLaunchClick}
          style={{
            transform: `translate3d(${mouseOffset.x * 0.15}px, ${mouseOffset.y * 0.15}px, 0)`,
          }}
          className={`group relative px-8 sm:px-12 py-4 sm:py-5 rounded-3xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white font-display font-black text-lg sm:text-xl tracking-wider shadow-glow-cyan hover:shadow-glow-gold hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-3 border border-cyan-300/40 cursor-pointer overflow-hidden ${
            isLaunching ? "animate-pulse" : ""
          }`}
        >
          {/* Animated Sheen / Light Sweep */}
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />

          <Rocket className="w-6 h-6 text-amber-300 group-hover:rotate-12 transition-transform duration-300" />
          <span>LET&apos;S EXPLORE SPACE</span>
          <ArrowRight className="w-6 h-6 text-cyan-200 group-hover:translate-x-1.5 transition-transform" />
        </button>

        {/* ================= QUICK ACTIVITY CARDS ROW ================= */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl w-full">
          {/* Card 1: Story Flashcards */}
          {onOpenFlashcards && (
            <button
              onClick={() => {
                soundEngine.playClick();
                onOpenFlashcards();
              }}
              className="p-3 rounded-2xl bg-space-card/80 hover:bg-space-card border border-cyan-500/30 hover:border-cyan-400 transition-all text-left group flex flex-col justify-between shadow-lg"
            >
              <div className="w-8 h-8 rounded-xl bg-cyan-950 text-cyan-400 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                <BookOpen className="w-4 h-4" />
              </div>
              <div>
                <div className="font-display font-black text-xs text-white">Story Flashcards</div>
                <div className="text-[10px] text-slate-400 font-mono">Mission summaries</div>
              </div>
            </button>
          )}

          {/* Card 2: Mission Badges */}
          {onOpenBadges && (
            <button
              onClick={() => {
                soundEngine.playClick();
                onOpenBadges();
              }}
              className="p-3 rounded-2xl bg-space-card/80 hover:bg-space-card border border-amber-500/30 hover:border-amber-400 transition-all text-left group flex flex-col justify-between shadow-lg"
            >
              <div className="w-8 h-8 rounded-xl bg-amber-950 text-amber-400 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                <Award className="w-4 h-4" />
              </div>
              <div>
                <div className="font-display font-black text-xs text-white">Mission Patches</div>
                <div className="text-[10px] text-slate-400 font-mono">Collect cute badges</div>
              </div>
            </button>
          )}

          {/* Card 3: Color Studio */}
          {onOpenColoringBook && (
            <button
              onClick={() => {
                soundEngine.playClick();
                onOpenColoringBook();
              }}
              className="p-3 rounded-2xl bg-space-card/80 hover:bg-space-card border border-rose-500/30 hover:border-rose-400 transition-all text-left group flex flex-col justify-between shadow-lg"
            >
              <div className="w-8 h-8 rounded-xl bg-rose-950 text-rose-400 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                <Palette className="w-4 h-4" />
              </div>
              <div>
                <div className="font-display font-black text-xs text-white">Color Studio</div>
                <div className="text-[10px] text-slate-400 font-mono">Scratch & Drag art</div>
              </div>
            </button>
          )}

          {/* Card 4: Space Quiz */}
          {onOpenQuiz && (
            <button
              onClick={() => {
                soundEngine.playClick();
                onOpenQuiz();
              }}
              className="p-3 rounded-2xl bg-space-card/80 hover:bg-space-card border border-purple-500/30 hover:border-purple-400 transition-all text-left group flex flex-col justify-between shadow-lg"
            >
              <div className="w-8 h-8 rounded-xl bg-purple-950 text-purple-400 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                <HelpCircle className="w-4 h-4" />
              </div>
              <div>
                <div className="font-display font-black text-xs text-white">Space Quiz</div>
                <div className="text-[10px] text-slate-400 font-mono">Earn chief rank</div>
              </div>
            </button>
          )}
        </div>

        {/* Small discovery hint */}
        <div className="mt-8 flex items-center gap-4 text-xs font-mono text-slate-400">
          <span className="flex items-center gap-1">
            <Compass className="w-3.5 h-3.5 text-cyan-400" /> 8 Historic Spacecraft
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Real NASA Imagery
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Orbit className="w-3.5 h-3.5 text-rose-400" /> 11-Scene Mars Adventure
          </span>
        </div>
      </div>
    </div>
  );
};

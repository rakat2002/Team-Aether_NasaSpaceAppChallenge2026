"use client";

import React, { useState } from "react";
import { STORY_SCENES, StoryScene } from "@/data/storyData";
import { NasaImageCard } from "../ui/NasaImageCard";
import { SceneMicroInteraction } from "./SceneMicroInteraction";
import { soundEngine } from "@/lib/audio";
import { badgeManager } from "@/lib/badgeManager";
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  BookOpen,
  Award,
  RotateCcw,
  CheckCircle,
  HelpCircle,
  Compass,
} from "lucide-react";

interface StoryExperienceProps {
  onReturnToSolarSystem: () => void;
  onSelectOtherSpacecraft?: () => void;
  onOpenFlashcard?: (spacecraftId: string) => void;
  onOpenBadgeCelebration?: (badgeId: string) => void;
}

export const StoryExperience: React.FC<StoryExperienceProps> = ({
  onReturnToSolarSystem,
  onSelectOtherSpacecraft,
  onOpenFlashcard,
  onOpenBadgeCelebration,
}) => {
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [completedInteractions, setCompletedInteractions] = useState<Set<number>>(new Set());
  const [hasAwardedStoryBadge, setHasAwardedStoryBadge] = useState(false);

  const scene: StoryScene = STORY_SCENES[currentSceneIndex];
  const isFirstScene = currentSceneIndex === 0;
  const isLastScene = currentSceneIndex === STORY_SCENES.length - 1;

  const handleNext = () => {
    if (isLastScene) {
      soundEngine.playSuccess();
      handleTriggerStoryFinish();
      return;
    }
    soundEngine.playClick();
    setCurrentSceneIndex((prev) => prev + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Check if next is last scene
    if (currentSceneIndex + 1 === STORY_SCENES.length - 1) {
      handleTriggerStoryFinish();
    }
  };

  const handleTriggerStoryFinish = () => {
    if (!hasAwardedStoryBadge) {
      setHasAwardedStoryBadge(true);
      badgeManager.unlockBadge("badge-opportunity-marathoner");
      if (onOpenBadgeCelebration) {
        onOpenBadgeCelebration("badge-opportunity-marathoner");
      }
    }
  };

  const handlePrev = () => {
    if (isFirstScene) return;
    soundEngine.playClick();
    setCurrentSceneIndex((prev) => prev - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleJumpToScene = (idx: number) => {
    soundEngine.playClick();
    setCurrentSceneIndex(idx);
    if (idx === STORY_SCENES.length - 1) {
      handleTriggerStoryFinish();
    }
  };

  const markInteractionComplete = (id: number) => {
    setCompletedInteractions((prev) => new Set([...Array.from(prev), id]));
  };

  return (
    <div className="relative w-full min-h-screen pt-20 pb-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto text-white select-none">
      {/* ================= TOP STORY PROGRESS NAV ================= */}
      <div className="mb-6 p-4 rounded-3xl bg-space-card/80 border border-cyan-500/30 backdrop-blur-md shadow-xl">
        <div className="flex items-center justify-between gap-2 mb-3">
          <button
            onClick={onReturnToSolarSystem}
            className="flex items-center gap-1.5 text-xs font-mono text-cyan-400 hover:text-cyan-200 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Solar System</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-amber-300 font-bold">
              SCENE {scene.id} OF 11
            </span>
            <span className="text-slate-500">•</span>
            <span className="text-xs font-mono text-slate-300">
              {scene.chapter}
            </span>
          </div>
        </div>

        {/* 11-Step Progress Dots Bar */}
        <div className="grid grid-cols-11 gap-1.5 sm:gap-2">
          {STORY_SCENES.map((s, idx) => {
            const isActive = idx === currentSceneIndex;
            const isCompleted = idx < currentSceneIndex || completedInteractions.has(s.id);
            return (
              <button
                key={s.id}
                onClick={() => handleJumpToScene(idx)}
                title={`Scene ${s.id}: ${s.title}`}
                className={`h-2 sm:h-2.5 rounded-full transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-r from-amber-400 to-rose-500 shadow-glow-gold scale-y-125"
                    : isCompleted
                    ? "bg-cyan-500/80"
                    : "bg-slate-800 hover:bg-slate-700"
                }`}
              />
            );
          })}
        </div>
      </div>

      {/* ================= MAIN SCENE CONTENT CARD ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: BIG NASA VISUAL (Cols 1-7) */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <NasaImageCard sceneId={scene.id} className="w-full" />

          {/* MICRO-INTERACTION BLOCK (Below Image) */}
          <div className="mt-1">
            <SceneMicroInteraction
              sceneId={scene.id}
              onInteractionComplete={() => markInteractionComplete(scene.id)}
            />
          </div>
        </div>

        {/* RIGHT COLUMN: STORY TEXT & FUN FACT (Cols 8-12) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Chapter & Title */}
          <div>
            <div className="inline-block px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 font-mono text-xs tracking-wider uppercase mb-2">
              {scene.chapter}
            </div>
            <h2 className="text-2xl sm:text-4xl font-display font-black text-white leading-tight mb-2">
              {scene.title}
            </h2>
            <p className="text-sm font-sans text-cyan-300 font-medium">
              {scene.subtitle}
            </p>
          </div>

          {/* Short Story Narrative Paragraphs (Max a few sentences, large readable font) */}
          <div className="space-y-3 font-sans text-slate-200 text-sm sm:text-base leading-relaxed">
            {scene.storyText.map((paragraph, pIdx) => (
              <p
                key={pIdx}
                className="p-3 rounded-2xl bg-space-card/60 border border-slate-800/80 backdrop-blur"
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* Interactive Fun Fact Card */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-950/30 to-purple-950/30 border border-amber-500/30 text-xs sm:text-sm text-slate-200 shadow-md">
            <div className="flex items-center gap-1.5 text-amber-300 font-mono uppercase tracking-wider font-bold mb-1.5">
              <Sparkles className="w-4 h-4 text-amber-300" />
              {scene.funFact.title}
            </div>
            <p className="font-sans leading-relaxed text-amber-100">
              {scene.funFact.fact}
            </p>
          </div>

          {/* ================= NAVIGATION FOOTER ================= */}
          <div className="pt-2 flex items-center justify-between gap-3">
            <button
              onClick={handlePrev}
              disabled={isFirstScene}
              className={`px-4 py-3 rounded-2xl border font-bold text-xs sm:text-sm transition-all flex items-center gap-2 ${
                isFirstScene
                  ? "opacity-30 cursor-not-allowed border-slate-800 text-slate-600"
                  : "bg-space-card hover:bg-slate-800 border-slate-700 text-slate-200"
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            <button
              onClick={handleNext}
              className="flex-1 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-amber-500 hover:opacity-95 text-black font-display font-black text-xs sm:text-sm tracking-wider shadow-glow-cyan hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <span>{isLastScene ? "VIEW FLASHCARD & BADGE" : "NEXT CHAPTER"}</span>
              <ArrowRight className="w-4 h-4 text-black" />
            </button>
          </div>
        </div>
      </div>

      {/* ================= FINAL SCENE CELEBRATION (SCENE 11) ================= */}
      {isLastScene && (
        <div className="mt-12 p-8 rounded-3xl bg-gradient-to-b from-space-card to-space-abyss border-2 border-amber-500/50 text-center shadow-2xl animate-fadeIn">
          <div className="w-16 h-16 rounded-full bg-amber-500/20 border-2 border-amber-400 mx-auto flex items-center justify-center mb-4 shadow-glow-gold animate-bounce">
            <Award className="w-8 h-8 text-amber-300" />
          </div>

          <h3 className="text-3xl sm:text-4xl font-display font-black text-white mb-2">
            THANK YOU, OPPORTUNITY. ❤️
          </h3>
          <p className="text-base text-slate-300 max-w-xl mx-auto mb-6 leading-relaxed">
            You completed the journey across 14 years and 45 kilometers on Mars. What will YOU explore next?
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            {onOpenFlashcard && (
              <button
                onClick={() => {
                  soundEngine.playClick();
                  onOpenFlashcard("opportunity");
                }}
                className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-display font-black text-sm tracking-wider shadow-glow-cyan hover:scale-105 transition-all flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4 text-cyan-200" />
                <span>VIEW STORY SUMMARY FLASHCARD 🎴</span>
              </button>
            )}

            <button
              onClick={() => {
                soundEngine.playClick();
                handleTriggerStoryFinish();
                if (onOpenBadgeCelebration) {
                  onOpenBadgeCelebration("badge-opportunity-marathoner");
                }
              }}
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-rose-500 text-black font-display font-black text-sm tracking-wider shadow-glow-gold hover:scale-105 transition-all flex items-center gap-2"
            >
              <Award className="w-4 h-4" />
              <span>VIEW MY EARNED BADGE 🎖️</span>
            </button>

            <button
              onClick={() => {
                soundEngine.playClick();
                setCurrentSceneIndex(0);
              }}
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono font-bold flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" /> Replay Story
            </button>

            <button
              onClick={onReturnToSolarSystem}
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono font-bold flex items-center gap-2"
            >
              <Compass className="w-4 h-4 text-cyan-400" /> Solar System
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

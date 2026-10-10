"use client";

import React, { useState } from "react";
import { SpacecraftInfo } from "@/data/spacecraftData";
import { SpacecraftRenderer } from "@/components/spacecraft/SpacecraftRenderer";
import { soundEngine } from "@/lib/audio";
import {
  X,
  Sparkles,
  MapPin,
  Calendar,
  Zap,
  CheckCircle,
  HelpCircle,
  ArrowRight,
  ShieldCheck,
  Compass,
  BookOpen,
} from "lucide-react";

interface SpacecraftDetailModalProps {
  spacecraft: SpacecraftInfo | null;
  isOpen: boolean;
  onClose: () => void;
  onLaunchOpportunityStory?: () => void;
  onOpenFlashcard?: (spacecraftId: string) => void;
}

export const SpacecraftDetailModal: React.FC<SpacecraftDetailModalProps> = ({
  spacecraft,
  isOpen,
  onClose,
  onLaunchOpportunityStory,
  onOpenFlashcard,
}) => {
  const [selectedPart, setSelectedPart] = useState<string | null>(null);
  const [quizAnswered, setQuizAnswered] = useState<number | null>(null);
  const [quizResult, setQuizResult] = useState<boolean | null>(null);

  if (!isOpen || !spacecraft) return null;

  const handleClose = () => {
    soundEngine.playClick();
    setSelectedPart(null);
    setQuizAnswered(null);
    setQuizResult(null);
    onClose();
  };

  const handleQuizSelect = (idx: number) => {
    if (quizAnswered !== null) return;
    setQuizAnswered(idx);
    const isCorrect = idx === spacecraft.quizQuestion?.correctIndex;
    setQuizResult(isCorrect);
    if (isCorrect) {
      soundEngine.playSuccess();
    } else {
      soundEngine.playClick();
    }
  };

  const handleLaunchHero = () => {
    soundEngine.playWarp();
    onClose();
    if (onLaunchOpportunityStory) {
      onLaunchOpportunityStory();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-space-void/90 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-space-abyss border-2 border-cyan-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-cyan-950/60 text-white my-auto overflow-hidden">
        {/* Ambient Top Glow */}
        <div
          className="absolute -top-12 left-1/2 -translate-x-1/2 w-3/4 h-32 rounded-full blur-3xl pointer-events-none"
          style={{ background: spacecraft.colorTheme.glow }}
        />

        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 z-20 p-2.5 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Badges */}
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span
            className="px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider uppercase border"
            style={{
              borderColor: spacecraft.colorTheme.primary,
              color: spacecraft.colorTheme.primary,
              backgroundColor: "rgba(15, 23, 42, 0.7)",
            }}
          >
            {spacecraft.badgeLabel}
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-mono text-slate-400 bg-slate-800/60 border border-slate-700">
            {spacecraft.type}
          </span>
          <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-cyan-400" /> Launched: {spacecraft.launchDate}
          </span>
        </div>

        {/* Title */}
        <h2 className="text-2xl sm:text-4xl font-display font-black text-white mb-1">
          {spacecraft.name}
        </h2>
        <p className="text-sm sm:text-base font-sans text-cyan-300 mb-6">
          {spacecraft.subtitle}
        </p>

        {/* Spacecraft Geometric SVG Model Display */}
        <div className="relative rounded-2xl bg-gradient-to-b from-space-void/90 to-space-card/70 border border-slate-800 p-4 mb-6 flex flex-col items-center justify-center">
          <SpacecraftRenderer
            id={spacecraft.id}
            size={220}
            interactive={true}
            onPartClick={(id, name, desc) => {
              setSelectedPart(`${name}: ${desc}`);
            }}
          />
          {selectedPart && (
            <div className="mt-2 p-2.5 rounded-xl bg-space-void/90 border border-cyan-500/40 text-xs text-cyan-200 text-center animate-fadeIn w-full">
              {selectedPart}
            </div>
          )}
        </div>

        {/* Core Educational Story Q&A Cards */}
        <div className="space-y-4 mb-6">
          {/* WHERE DID IT GO? */}
          <div className="p-4 rounded-2xl bg-space-void/60 border border-slate-800/80">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-cyan-400 mb-1 font-bold">
              <MapPin className="w-4 h-4 text-cyan-400" />
              WHERE DID IT GO?
            </div>
            <p className="text-sm text-slate-200 leading-relaxed font-sans">
              {spacecraft.whereDidItGo}
            </p>
          </div>

          {/* WHAT DID IT DO? */}
          <div className="p-4 rounded-2xl bg-space-void/60 border border-slate-800/80">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-400 mb-1 font-bold">
              <Compass className="w-4 h-4 text-amber-400" />
              WHAT DID IT DO?
            </div>
            <p className="text-sm text-slate-200 leading-relaxed font-sans">
              {spacecraft.whatDidItDo}
            </p>
          </div>

          {/* FUN FACT ⭐ */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-950/30 to-purple-950/30 border border-amber-500/30">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-300 mb-1 font-bold">
              <Sparkles className="w-4 h-4 text-amber-300" />
              FUN FACT ⭐
            </div>
            <p className="text-sm text-amber-100 font-sans leading-relaxed">
              {spacecraft.funFact}
            </p>
          </div>

          {/* WHY IT MATTERS */}
          <div className="p-4 rounded-2xl bg-space-void/60 border border-slate-800/80">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-400 mb-1 font-bold">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              WHY IT MATTERS
            </div>
            <p className="text-sm text-slate-200 leading-relaxed font-sans">
              {spacecraft.whyItMatters}
            </p>
          </div>
        </div>

        {/* Spacecraft Quick Specs Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-mono text-slate-300 mb-6">
          <div className="p-2.5 rounded-xl bg-space-void border border-slate-800">
            <span className="text-slate-500 block text-[10px]">DISTANCE</span>
            <span className="text-white font-bold">{spacecraft.distanceFromEarth}</span>
          </div>
          <div className="p-2.5 rounded-xl bg-space-void border border-slate-800">
            <span className="text-slate-500 block text-[10px]">POWER SOURCE</span>
            <span className="text-amber-400 font-bold">{spacecraft.powerSource}</span>
          </div>
          <div className="p-2.5 rounded-xl bg-space-void border border-slate-800 col-span-2 sm:col-span-1">
            <span className="text-slate-500 block text-[10px]">LIFETIME</span>
            <span className="text-cyan-400 font-bold">{spacecraft.activePeriod}</span>
          </div>
        </div>

        {/* Child-Friendly Interactive Science Quiz */}
        {spacecraft.quizQuestion && (
          <div className="p-4 rounded-2xl bg-indigo-950/30 border border-indigo-500/30 mb-6">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-indigo-300 mb-2 font-bold">
              <HelpCircle className="w-4 h-4 text-indigo-400" />
              COSMIC DETECTIVE CHALLENGE
            </div>
            <h4 className="text-sm font-bold text-white mb-3">
              {spacecraft.quizQuestion.question}
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
              {spacecraft.quizQuestion.options.map((option, idx) => {
                const isSelected = quizAnswered === idx;
                const isCorrect = idx === spacecraft.quizQuestion?.correctIndex;

                let btnStyle = "bg-slate-800/80 hover:bg-slate-700/80 border-slate-700 text-slate-200";
                if (quizAnswered !== null) {
                  if (isCorrect) {
                    btnStyle = "bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold";
                  } else if (isSelected) {
                    btnStyle = "bg-rose-950/80 border-rose-500 text-rose-200";
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={quizAnswered !== null}
                    onClick={() => handleQuizSelect(idx)}
                    className={`p-2.5 rounded-xl border text-xs text-left transition-all ${btnStyle}`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>

            {quizAnswered !== null && (
              <div
                className={`p-3 rounded-xl text-xs font-sans animate-fadeIn ${
                  quizResult
                    ? "bg-emerald-950/50 border border-emerald-500 text-emerald-200"
                    : "bg-slate-800 border border-slate-700 text-slate-300"
                }`}
              >
                <div className="font-bold flex items-center gap-1.5 mb-1">
                  {quizResult ? (
                    <>
                      <CheckCircle className="w-4 h-4 text-emerald-400" /> Awesome Job, Astronaut!
                    </>
                  ) : (
                    "Almost! Here is how it worked:"
                  )}
                </div>
                {spacecraft.quizQuestion.explanation}
              </div>
            )}
          </div>
        )}

        {/* Action Button: Opportunity triggers Mars Journey, others close or explore */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800">
          {onOpenFlashcard && (
            <button
              onClick={() => {
                soundEngine.playClick();
                onClose();
                onOpenFlashcard(spacecraft.id);
              }}
              className="px-4 py-2.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-mono font-bold flex items-center gap-1.5 transition-all"
            >
              <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
              <span>View Story Flashcard 🎴</span>
            </button>
          )}

          <div className="flex items-center gap-2 ml-auto">
            {spacecraft.isHero ? (
              <button
                onClick={handleLaunchHero}
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-rose-500 to-cyan-500 hover:opacity-95 text-black font-display font-black text-sm tracking-wider shadow-glow-gold hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <span>EXPLORE OPPORTUNITY&apos;S JOURNEY TO MARS</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleClose}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs sm:text-sm transition-all"
              >
                Back to Solar System
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

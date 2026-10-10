"use client";

import React, { useState } from "react";
import { soundEngine } from "@/lib/audio";
import { badgeManager } from "@/lib/badgeManager";
import {
  X,
  HelpCircle,
  Sparkles,
  CheckCircle2,
  XCircle,
  Award,
  RotateCcw,
  Rocket,
  ChevronRight,
  Trophy,
} from "lucide-react";

interface QuizQuestion {
  id: number;
  question: string;
  category: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  funTip: string;
}

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    category: "OPPORTUNITY ROVER",
    question: "How long was Opportunity originally designed to last on Mars?",
    options: [
      "90 Martian Days (Sols)",
      "10 Full Years",
      "Only 1 Single Day",
      "50 Earth Years",
    ],
    correctIndex: 0,
    explanation:
      "NASA engineers only guaranteed Opportunity for 90 days because they feared Martian dust would choke its solar panels. Instead, it lasted for over 5,000 sols (nearly 15 years)!",
    funTip: "That is over 55 times longer than its warranty!",
  },
  {
    id: 2,
    category: "MARTIAN DETECTIVE",
    question: "What did Opportunity's discovery of tiny round 'blueberries' prove?",
    options: [
      "Martian volcanoes made of blueberry jam",
      "Ancient liquid water once flowed on Mars!",
      "Aliens dropped metal marbles",
      "Mars is made of blue cheese",
    ],
    correctIndex: 1,
    explanation:
      "These spherical hematite beads could only have grown inside wet, mineral-rich liquid water billions of years ago!",
    funTip: "This proved ancient Mars was once warm and wet enough for life!",
  },
  {
    id: 3,
    category: "SOLAR POWER ON MARS",
    question: "What natural event regularly cleaned the dust off Opportunity's solar wings?",
    options: [
      "Rain showers on Mars",
      "NASA astronauts with mops",
      "Swirling Martian dust devils (mini-tornadoes)!",
      "Robotic windshield wipers",
    ],
    correctIndex: 2,
    explanation:
      "Mars is too cold and dry for rain, but spinning dust devils blew across the plains and swept the solar panels squeaky clean, giving the rover fresh boosts of energy!",
    funTip: "Scientists called them 'cleaning events'!",
  },
  {
    id: 4,
    category: "DEEP SPACE PROBES",
    question: "What is the farthest human-made machine in the entire universe?",
    options: [
      "Voyager 1 (carrying the Golden Record)",
      "The Space Shuttle",
      "The International Space Station",
      "Apollo 11",
    ],
    correctIndex: 0,
    explanation:
      "Voyager 1 was launched in 1977 and is now over 24 billion kilometers from Earth, cruising through the dark space between stars!",
    funTip: "Its radio signals take over 22 hours to reach Earth traveling at the speed of light!",
  },
  {
    id: 5,
    category: "VIKING 1 MARS MISSION",
    question: "On which Martian plain did Viking 1 successfully touch down in July 1976?",
    options: [
      "Chryse Planitia ('Plain of Gold')",
      "Gale Crater",
      "Olympus Mons Volcano",
      "Valles Marineris Canyon",
    ],
    correctIndex: 0,
    explanation:
      "Viking 1 landed safely in Chryse Planitia ('Plain of Gold') on July 20, 1976, beaming back humanity's first color panoramic photos of Martian red soil!",
    funTip: "It operated for 2,238 Martian sols!",
  },
  {
    id: 6,
    category: "CASSINI SATURN MISSION",
    question: "Why did NASA deliberately plunge Cassini into Saturn's atmosphere in 2017?",
    options: [
      "It ran out of fuel and they wanted to celebrate with fireworks",
      "To protect pristine ocean moons like Enceladus from any Earth germs!",
      "An asteroid accidentally bumped it into Saturn",
      "It got lost in Saturn's rings",
    ],
    correctIndex: 1,
    explanation:
      "NASA intentionally burned Cassini up in Saturn's thick clouds so that its decaying battery could never crash onto and contaminate pristine ocean moons like Enceladus or Titan!",
    funTip: "Scientists call this planetary protection!",
  },
  {
    id: 7,
    category: "APOLLO 11 MOON LANDING",
    question: "What famous words are inscribed on the plaque attached to the Apollo 11 lunar ladder?",
    options: [
      "Property of the United States",
      "Here men from planet Earth set foot... We came in peace for all mankind.",
      "See you on Mars next time!",
      "Beware of moon dust",
    ],
    correctIndex: 1,
    explanation:
      "The commemorative stainless steel plaque reads: 'Here men from the planet Earth first set foot upon the Moon July 1969, A.D. We came in peace for all mankind.'",
    funTip: "It is signed by Neil Armstrong, Buzz Aldrin, and Michael Collins!",
  },
];

interface CosmicQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAwardBadge?: (badgeId: string) => void;
}

export const CosmicQuizModal: React.FC<CosmicQuizModalProps> = ({
  isOpen,
  onClose,
  onAwardBadge,
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [badgeClaimed, setBadgeClaimed] = useState(false);

  if (!isOpen) return null;

  const currentQ = QUIZ_QUESTIONS[currentQuestionIndex];
  const isCorrect = selectedOption === currentQ.correctIndex;

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);

    if (idx === currentQ.correctIndex) {
      soundEngine.playSuccess();
      setScore((prev) => prev + 1);
    } else {
      soundEngine.playClick();
    }
  };

  const handleNextQuestion = () => {
    soundEngine.playClick();
    if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setShowResults(true);
      soundEngine.playSuccess();
    }
  };

  const handleRestartQuiz = () => {
    soundEngine.playClick();
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setShowResults(false);
    setBadgeClaimed(false);
  };

  const handleClaimQuizBadge = () => {
    soundEngine.playSuccess();
    setBadgeClaimed(true);
    const badgeId = score >= 5 ? "badge-quiz-master-sleuth" : "badge-quiz-cadet-inquirer";
    badgeManager.unlockBadge(badgeId);
    if (onAwardBadge) {
      onAwardBadge(badgeId);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-space-void/90 backdrop-blur-md animate-fadeIn select-none overflow-y-auto">
      <div className="relative w-full max-w-xl bg-space-abyss border-2 border-purple-500/50 rounded-3xl p-5 sm:p-8 shadow-2xl text-white my-auto overflow-hidden">
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-gradient-to-b from-purple-500/20 to-transparent pointer-events-none rounded-full blur-2xl" />

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

        {!showResults ? (
          <div>
            {/* Header */}
            <div className="flex items-center justify-between text-xs font-mono text-purple-300 mb-2">
              <span className="font-bold flex items-center gap-1.5 uppercase tracking-widest">
                <HelpCircle className="w-4 h-4 text-purple-400" />
                COSMIC DETECTIVE QUIZ
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-purple-950 border border-purple-500/40 text-purple-200">
                Question {currentQuestionIndex + 1} of {QUIZ_QUESTIONS.length}
              </span>
            </div>

            {/* Topic pill */}
            <div className="text-[11px] font-mono text-amber-300 uppercase tracking-wider mb-2">
              TOPIC: {currentQ.category}
            </div>

            <h3 className="text-xl sm:text-2xl font-display font-black text-white mb-6 leading-snug">
              {currentQ.question}
            </h3>

            {/* Options */}
            <div className="space-y-3 mb-6">
              {currentQ.options.map((option, idx) => {
                const isSelected = selectedOption === idx;
                const isTargetCorrect = idx === currentQ.correctIndex;

                let btnClass = "bg-space-card hover:bg-slate-800/80 border-slate-700 text-slate-200";
                if (isAnswered) {
                  if (isTargetCorrect) {
                    btnClass = "bg-emerald-950/80 border-emerald-400 text-emerald-200 font-bold shadow-glow-sm-cyan";
                  } else if (isSelected) {
                    btnClass = "bg-rose-950/80 border-rose-500 text-rose-200";
                  } else {
                    btnClass = "opacity-40 border-slate-800 text-slate-500";
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={isAnswered}
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full p-4 rounded-2xl border text-left text-xs sm:text-sm transition-all flex items-center justify-between gap-3 ${btnClass}`}
                  >
                    <span>{option}</span>
                    {isAnswered && isTargetCorrect && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    )}
                    {isAnswered && isSelected && !isTargetCorrect && (
                      <XCircle className="w-5 h-5 text-rose-400 flex-shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Answer Explanation Box */}
            {isAnswered && (
              <div
                className={`p-4 rounded-2xl mb-6 text-xs leading-relaxed animate-fadeIn ${
                  isCorrect
                    ? "bg-emerald-950/40 border border-emerald-500/50 text-emerald-100"
                    : "bg-slate-800/90 border border-slate-700 text-slate-200"
                }`}
              >
                <div className="font-bold flex items-center gap-1.5 mb-1.5 text-sm">
                  {isCorrect ? (
                    <>
                      <Sparkles className="w-4 h-4 text-emerald-400" />
                      Awesome Job, Astronaut!
                    </>
                  ) : (
                    "Good try! Here is the science behind it:"
                  )}
                </div>
                <p className="mb-2">{currentQ.explanation}</p>
                <div className="text-[11px] font-mono text-amber-300 font-bold">
                  ⭐ Fun Fact: {currentQ.funTip}
                </div>
              </div>
            )}

            {/* Next / Submit Button */}
            {isAnswered && (
              <button
                onClick={handleNextQuestion}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-purple-500 via-blue-600 to-cyan-500 font-display font-black text-sm tracking-wider text-white shadow-glow-purple hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <span>
                  {currentQuestionIndex < QUIZ_QUESTIONS.length - 1
                    ? "NEXT QUESTION"
                    : "VIEW FINAL SCORE & BADGES"}
                </span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        ) : (
          /* ================= FINAL SCORE & CERTIFICATE ================= */
          <div className="text-center py-4 animate-fadeIn">
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-500 to-purple-600 p-[2px] mx-auto mb-4 shadow-glow-gold animate-bounce">
              <div className="w-full h-full rounded-full bg-space-void flex items-center justify-center">
                <Trophy className="w-10 h-10 text-amber-300" />
              </div>
            </div>

            <h3 className="text-3xl font-display font-black text-white mb-1">
              QUIZ COMPLETED! 🎓
            </h3>
            <p className="text-sm font-mono text-cyan-300 mb-6">
              You scored <span className="text-amber-400 font-bold text-lg">{score}</span> out of {QUIZ_QUESTIONS.length}!
            </p>

            {/* Astronaut Badge Rank */}
            <div className="p-5 rounded-2xl bg-space-void border border-purple-500/40 mb-6 text-left">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-slate-400">ASSIGNED RANK:</span>
                <span className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400 text-amber-300 font-mono font-bold text-xs uppercase">
                  {score >= 5
                    ? "NASA Chief Scientist 🚀"
                    : score >= 3
                    ? "Mission Commander ⭐"
                    : "Junior Space Cadet 🛸"}
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                {score >= 5
                  ? "Outstanding! You know the machines humans left across the solar system like a veteran NASA engineer!"
                  : score >= 3
                  ? "Great mission knowledge! You are ready to explore the red sands of Mars and beyond!"
                  : "Good start, cadet! Keep exploring the spacecraft in the solar system to learn more space secrets!"}
              </p>

              {/* Claim Badge Button */}
              <button
                onClick={handleClaimQuizBadge}
                className={`w-full py-3 rounded-xl font-display font-black text-xs tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg ${
                  badgeClaimed
                    ? "bg-emerald-500 text-black shadow-glow-sm-cyan"
                    : "bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 text-white shadow-glow-gold hover:scale-[1.02] active:scale-95"
                }`}
              >
                <Award className="w-4 h-4 text-amber-200" />
                <span>
                  {badgeClaimed
                    ? "QUIZ BADGE CLAIMED! 🎖️"
                    : score >= 5
                    ? "CLAIM 'MASTER COSMIC SLEUTH' BADGE (+300 XP)"
                    : "CLAIM 'STAR CADET INQUIRER' BADGE (+200 XP)"}
                </span>
              </button>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={handleRestartQuiz}
                className="flex-1 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono text-xs font-bold transition-all flex items-center justify-center gap-1.5"
              >
                <RotateCcw className="w-4 h-4" /> Try Again
              </button>
              <button
                onClick={() => {
                  soundEngine.playClick();
                  onClose();
                }}
                className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-display font-bold text-xs tracking-wider shadow-glow-cyan hover:scale-[1.02] transition-all flex items-center justify-center gap-1.5"
              >
                <Rocket className="w-4 h-4" /> Back to Space
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

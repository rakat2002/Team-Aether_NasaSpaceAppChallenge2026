"use client";

import React, { useState } from "react";
import { soundEngine } from "@/lib/audio";
import {
  Sparkles,
  Rocket,
  ShieldAlert,
  Droplets,
  HelpCircle,
  CheckCircle2,
  Clock,
  Zap,
  Award,
  Radio,
  Heart,
  Wind,
  Sun,
  Flame,
  Footprints,
} from "lucide-react";

interface SceneMicroInteractionProps {
  sceneId: number;
  onInteractionComplete?: () => void;
}

export const SceneMicroInteraction: React.FC<SceneMicroInteractionProps> = ({
  sceneId,
  onInteractionComplete,
}) => {
  // Scene 1: Trajectory Connect
  const [trajectoryConnected, setTrajectoryConnected] = useState(false);

  // Scene 2: Drag Spacecraft
  const [dragProgress, setDragProgress] = useState(15);

  // Scene 3: Airbag Landing Stages
  const [landingStage, setLandingStage] = useState<"parachute" | "retro" | "airbag" | "safe">("parachute");

  // Scene 4: Rover Tire Tracks
  const [tracks, setTracks] = useState<{ x: number; y: number }[]>([]);

  // Scene 5: Rock Detective Game
  const [rockGuess, setRockGuess] = useState<string | null>(null);

  // Scene 6: Sol Timeline Slider
  const [solValue, setSolValue] = useState(1);

  // Scene 7: Exploding Sol Counter
  const [burstSol, setBurstSol] = useState(90);
  const [hasExploded, setHasExploded] = useState(false);

  // Scene 8: Marathon Route Drag
  const [marathonDistance, setMarathonDistance] = useState(10);

  // Scene 9: Dust Storm Intensity
  const [stormSeverity, setStormSeverity] = useState(1);

  // Scene 10: Deep Space Signal Ping
  const [signalStrength, setSignalStrength] = useState(6);
  const [hasSentPing, setHasSentPing] = useState(false);

  // Scene 11: Junior Astronaut Name & Pledge
  const [explorerName, setExplorerName] = useState("");
  const [badgeClaimed, setBadgeClaimed] = useState(false);

  // ---------------- SCENE 1: TRAJECTORY CONNECT ----------------
  if (sceneId === 1) {
    return (
      <div className="p-4 rounded-2xl bg-space-card border border-cyan-500/30">
        <div className="flex items-center justify-between text-xs font-mono text-cyan-300 mb-3">
          <span className="font-bold flex items-center gap-1.5">
            <Rocket className="w-4 h-4 text-amber-400" />
            MISSION PLANNER: EARTH ➔ MARS
          </span>
          <span>DISTANCE: 480,000,000 KM</span>
        </div>

        {/* Visual Map */}
        <div className="relative h-24 rounded-xl bg-space-void border border-slate-800 flex items-center justify-between px-6 mb-3 overflow-hidden">
          {/* Earth */}
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-blue-500 border-2 border-cyan-300 flex items-center justify-center text-xs font-bold shadow-glow-cyan">
              🌍
            </div>
            <span className="text-[10px] font-mono text-slate-300 mt-1">Earth</span>
          </div>

          {/* Trajectory Arc */}
          <div className="flex-1 px-4 relative flex items-center justify-center">
            <div
              className={`w-full h-1 transition-all duration-700 ${
                trajectoryConnected
                  ? "bg-gradient-to-r from-blue-400 via-amber-400 to-rose-500 shadow-glow-gold"
                  : "bg-slate-800 border-b border-dashed border-slate-600"
              }`}
            />
            {trajectoryConnected && (
              <div className="absolute top-1/2 -translate-y-1/2 animate-bounce">
                <Rocket className="w-5 h-5 text-amber-300 -rotate-45" />
              </div>
            )}
          </div>

          {/* Mars */}
          <div className="flex flex-col items-center">
            <div className="w-9 h-9 rounded-full bg-rose-600 border-2 border-rose-400 flex items-center justify-center text-xs font-bold shadow-glow-mars">
              🔴
            </div>
            <span className="text-[10px] font-mono text-slate-300 mt-1">Mars</span>
          </div>
        </div>

        <button
          onClick={() => {
            soundEngine.playSuccess();
            setTrajectoryConnected(true);
            if (onInteractionComplete) onInteractionComplete();
          }}
          className={`w-full py-2.5 rounded-xl font-bold text-xs tracking-wider transition-all flex items-center justify-center gap-2 ${
            trajectoryConnected
              ? "bg-emerald-950/80 border border-emerald-500 text-emerald-300"
              : "bg-cyan-600 hover:bg-cyan-500 text-white shadow-glow-cyan"
          }`}
        >
          {trajectoryConnected ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              TRAJECTORY LOCKED! ALL SYSTEMS GO!
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              CALCULATE FLIGHT PATH TO MARS
            </>
          )}
        </button>
      </div>
    );
  }

  // ---------------- SCENE 2: DRAG SPACECRAFT THROUGH SPACE ----------------
  if (sceneId === 2) {
    return (
      <div className="p-4 rounded-2xl bg-space-card border border-cyan-500/30">
        <div className="flex items-center justify-between text-xs font-mono text-cyan-300 mb-2">
          <span className="font-bold flex items-center gap-1.5">
            <Rocket className="w-4 h-4 text-cyan-400" />
            STEER OPPORTUNITY ACROSS DEEP SPACE
          </span>
          <span>{dragProgress}% OF JOURNEY COMPLETE</span>
        </div>

        <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-1">
          <span>🌍 EARTH (Launch)</span>
          <span>SPACE HIGHWAY</span>
          <span>🔴 MARS (Target)</span>
        </div>

        <input
          type="range"
          min="0"
          max="100"
          value={dragProgress}
          onChange={(e) => {
            const val = Number(e.target.value);
            setDragProgress(val);
            if (val % 20 === 0) soundEngine.playClick();
            if (val >= 98 && onInteractionComplete) {
              soundEngine.playSuccess();
              onInteractionComplete();
            }
          }}
          className="w-full h-3 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400 mb-3"
        />

        <div className="p-2.5 rounded-xl bg-space-void border border-slate-800 text-xs text-slate-300 flex items-center justify-between">
          <span>Speed: <strong className="text-amber-400">19,000 km/h</strong></span>
          <span>
            Status:{" "}
            {dragProgress < 30 ? (
              <span className="text-cyan-300">Leaving Earth Orbit</span>
            ) : dragProgress < 85 ? (
              <span className="text-amber-300">Interplanetary Cruise</span>
            ) : (
              <span className="text-rose-400 font-bold">Approaching Mars!</span>
            )}
          </span>
        </div>
      </div>
    );
  }

  // ---------------- SCENE 3: BOUNCING AIRBAG LANDING ----------------
  if (sceneId === 3) {
    return (
      <div className="p-4 rounded-2xl bg-space-card border border-rose-500/30">
        <div className="flex items-center justify-between text-xs font-mono text-rose-300 mb-2">
          <span className="font-bold flex items-center gap-1.5">
            <ShieldAlert className="w-4 h-4 text-amber-400" />
            DESCENT SEQUENCE CONTROL
          </span>
          <span className="text-amber-300 uppercase">STAGE: {landingStage}</span>
        </div>

        <div className="grid grid-cols-4 gap-2 mb-3">
          <button
            onClick={() => {
              soundEngine.playClick();
              setLandingStage("parachute");
            }}
            className={`p-2 rounded-xl text-[11px] font-bold border transition-all ${
              landingStage === "parachute"
                ? "bg-rose-950 border-rose-400 text-rose-200"
                : "bg-slate-800 border-slate-700 text-slate-400"
            }`}
          >
            1. Parachute 🪂
          </button>
          <button
            onClick={() => {
              soundEngine.playClick();
              setLandingStage("retro");
            }}
            className={`p-2 rounded-xl text-[11px] font-bold border transition-all ${
              landingStage === "retro"
                ? "bg-amber-950 border-amber-400 text-amber-200"
                : "bg-slate-800 border-slate-700 text-slate-400"
            }`}
          >
            2. Rockets 🔥
          </button>
          <button
            onClick={() => {
              soundEngine.playClick();
              setLandingStage("airbag");
            }}
            className={`p-2 rounded-xl text-[11px] font-bold border transition-all ${
              landingStage === "airbag"
                ? "bg-cyan-950 border-cyan-400 text-cyan-200"
                : "bg-slate-800 border-slate-700 text-slate-400"
            }`}
          >
            3. Airbags ⚪
          </button>
          <button
            onClick={() => {
              soundEngine.playSuccess();
              setLandingStage("safe");
              if (onInteractionComplete) onInteractionComplete();
            }}
            className={`p-2 rounded-xl text-[11px] font-bold border transition-all ${
              landingStage === "safe"
                ? "bg-emerald-950 border-emerald-400 text-emerald-200"
                : "bg-slate-800 border-slate-700 text-slate-400"
            }`}
          >
            4. Touchdown! 🎉
          </button>
        </div>

        <div className="p-3 rounded-xl bg-space-void border border-slate-800 text-xs text-slate-200 text-center">
          {landingStage === "parachute" && "Supersonic chute inflates at 1,500 km/h, snapping against Mars's thin atmosphere!"}
          {landingStage === "retro" && "Radar altimeter fires retro-rockets to bring speed down to nearly zero!"}
          {landingStage === "airbag" && "Giant 24-lobe Kevlar airbags inflate around the rover like a giant beach ball cocoon!"}
          {landingStage === "safe" && "BOING! Bounced 26 times across Meridiani Planum and safely rolled into Eagle Crater!"}
        </div>
      </div>
    );
  }

  // ---------------- SCENE 4: SURFACE WHEEL TRACKS ----------------
  if (sceneId === 4) {
    const handleAddTrack = (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      soundEngine.playRoverMove();
      setTracks((prev) => [...prev.slice(-15), { x, y }]);
      if (tracks.length >= 5 && onInteractionComplete) onInteractionComplete();
    };

    return (
      <div className="p-4 rounded-2xl bg-space-card border border-amber-500/30">
        <div className="flex items-center justify-between text-xs font-mono text-amber-300 mb-2">
          <span className="font-bold">CLICK THE MARTIAN SAND TO DRIVE & MAKE TIRE TRACKS</span>
          <span>Tracks: {tracks.length}</span>
        </div>

        <div
          onClick={handleAddTrack}
          className="relative h-28 rounded-xl bg-gradient-to-b from-rose-950 to-amber-950 border border-amber-600/40 cursor-crosshair overflow-hidden p-2 select-none"
        >
          <div className="text-[10px] font-mono text-amber-300/60 pointer-events-none">
            [Click anywhere to lay JPL Morse-code rover tire tracks]
          </div>

          {tracks.map((t, i) => (
            <div
              key={i}
              className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center gap-0.5 pointer-events-none animate-fadeIn"
              style={{ left: t.x, top: t.y }}
            >
              <div className="w-2.5 h-1 bg-amber-400 rounded-sm shadow-sm" />
              <div className="w-1.5 h-1 bg-amber-400 rounded-sm shadow-sm" />
              <div className="w-3.5 h-1 bg-amber-400 rounded-sm shadow-sm" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ---------------- SCENE 5: ROCK DETECTIVE GAME ----------------
  if (sceneId === 5) {
    return (
      <div className="p-4 rounded-2xl bg-space-card border border-cyan-500/40">
        <div className="flex items-center justify-between text-xs font-mono text-cyan-300 mb-2">
          <span className="font-bold flex items-center gap-1.5">
            <HelpCircle className="w-4 h-4 text-cyan-400" />
            DETECTIVE CHALLENGE: WHAT MADE THESE SPHERES?
          </span>
          <span className="text-amber-300">MERIDIANI OUTCROP</span>
        </div>

        <div className="grid grid-cols-3 gap-2 mb-3">
          <button
            onClick={() => {
              soundEngine.playClick();
              setRockGuess("volcano");
            }}
            className={`p-2.5 rounded-xl border text-xs font-bold transition-all flex flex-col items-center gap-1 ${
              rockGuess === "volcano"
                ? "bg-rose-950 border-rose-500 text-rose-200"
                : "bg-slate-800 border-slate-700 text-slate-300"
            }`}
          >
            <Flame className="w-4 h-4 text-orange-400" />
            Volcano Lava
          </button>
          <button
            onClick={() => {
              soundEngine.playClick();
              setRockGuess("aliens");
            }}
            className={`p-2.5 rounded-xl border text-xs font-bold transition-all flex flex-col items-center gap-1 ${
              rockGuess === "aliens"
                ? "bg-purple-950 border-purple-500 text-purple-200"
                : "bg-slate-800 border-slate-700 text-slate-300"
            }`}
          >
            <Footprints className="w-4 h-4 text-purple-400" />
            Alien Footprints
          </button>
          <button
            onClick={() => {
              soundEngine.playSuccess();
              setRockGuess("water");
              if (onInteractionComplete) onInteractionComplete();
            }}
            className={`p-2.5 rounded-xl border text-xs font-bold transition-all flex flex-col items-center gap-1 ${
              rockGuess === "water"
                ? "bg-cyan-950 border-cyan-400 text-cyan-200 shadow-glow-cyan"
                : "bg-slate-800 border-slate-700 text-slate-300"
            }`}
          >
            <Droplets className="w-4 h-4 text-cyan-400" />
            Liquid Water! 💧
          </button>
        </div>

        {rockGuess && (
          <div
            className={`p-3 rounded-xl text-xs leading-relaxed animate-fadeIn ${
              rockGuess === "water"
                ? "bg-cyan-950/80 border border-cyan-400 text-cyan-100"
                : "bg-slate-800 border border-slate-700 text-slate-300"
            }`}
          >
            {rockGuess === "water" ? (
              <span className="font-bold flex items-center gap-1 text-emerald-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                CORRECT! WATER ON MARS! These hematite &quot;blueberries&quot; precipitated out of soaking mineral groundwater billions of years ago!
              </span>
            ) : (
              "Good guess, but scientists analyzed the chemistry with Opportunity's Mossbauer spectrometer and discovered they formed in soaking liquid water!"
            )}
          </div>
        )}
      </div>
    );
  }

  // ---------------- SCENE 6: 90 DAYS SOL TIMELINE ----------------
  if (sceneId === 6) {
    return (
      <div className="p-4 rounded-2xl bg-space-card border border-amber-500/30">
        <div className="flex items-center justify-between text-xs font-mono text-amber-300 mb-2">
          <span className="font-bold flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-amber-400" />
            PRIMARY MISSION WARRANTY TIMELINE
          </span>
          <span className="text-white font-bold text-sm">SOL {solValue} / 90</span>
        </div>

        <input
          type="range"
          min="1"
          max="90"
          value={solValue}
          onChange={(e) => {
            const val = Number(e.target.value);
            setSolValue(val);
            if (val % 15 === 0) soundEngine.playClick();
            if (val >= 90 && onInteractionComplete) {
              soundEngine.playSuccess();
              onInteractionComplete();
            }
          }}
          className="w-full h-3 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400 mb-3"
        />

        <div className="grid grid-cols-3 gap-2 text-center text-[11px] font-mono text-slate-400">
          <span className={solValue >= 1 ? "text-cyan-300 font-bold" : ""}>Day 1: Landing</span>
          <span className={solValue >= 45 ? "text-amber-300 font-bold" : ""}>Day 45: Halfway</span>
          <span className={solValue >= 90 ? "text-emerald-400 font-bold" : ""}>Day 90: Warranty Over!</span>
        </div>
      </div>
    );
  }

  // ---------------- SCENE 7: EXPLODING SOL COUNTER ----------------
  if (sceneId === 7) {
    const handlePowerBlast = () => {
      soundEngine.playSuccess();
      setHasExploded(true);
      let count = 90;
      const timer = setInterval(() => {
        count += Math.floor(Math.random() * 320 + 200);
        if (count >= 5111) {
          count = 5111;
          clearInterval(timer);
          if (onInteractionComplete) onInteractionComplete();
        }
        setBurstSol(count);
      }, 50);
    };

    return (
      <div className="p-4 rounded-2xl bg-space-card border border-purple-500/40 text-center">
        <div className="text-xs font-mono text-purple-300 mb-2 font-bold flex items-center justify-center gap-1.5">
          <Zap className="w-4 h-4 text-yellow-300" />
          WATCH OPPORTUNITY OUTLAST ITS WARRANTY!
        </div>

        <div className="my-2">
          <div className="text-4xl sm:text-5xl font-display font-black text-white tracking-widest bg-gradient-to-r from-amber-400 via-rose-400 to-purple-400 bg-clip-text text-transparent">
            {burstSol} SOLS
          </div>
          <p className="text-xs text-slate-300 font-mono mt-1">
            {burstSol >= 5000
              ? "OVER 55 TIMES LONGER THAN EXPECTED! 🤯"
              : "Expected to stop at 90 Sols..."}
          </p>
        </div>

        {!hasExploded ? (
          <button
            onClick={handlePowerBlast}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-amber-500 hover:opacity-90 font-bold text-xs text-black shadow-glow-purple flex items-center justify-center gap-2 mx-auto"
          >
            <Sparkles className="w-4 h-4" />
            BLAST THE SOL COUNTER!
          </button>
        ) : (
          <div className="inline-flex items-center gap-1 text-xs font-bold text-emerald-300 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-500">
            <CheckCircle2 className="w-4 h-4" /> Opportunity just wouldn&apos;t quit!
          </div>
        )}
      </div>
    );
  }

  // ---------------- SCENE 8: MARTIAN MARATHON DRIVER ----------------
  if (sceneId === 8) {
    return (
      <div className="p-4 rounded-2xl bg-space-card border border-amber-500/40">
        <div className="flex items-center justify-between text-xs font-mono text-amber-300 mb-2">
          <span className="font-bold flex items-center gap-1.5">
            <Award className="w-4 h-4 text-amber-400" />
            DRIVE THE OFF-WORLD MARATHON
          </span>
          <span className="font-bold text-white">{marathonDistance} / 45.16 KM</span>
        </div>

        <input
          type="range"
          min="1"
          max="45"
          value={marathonDistance}
          onChange={(e) => {
            const val = Number(e.target.value);
            setMarathonDistance(val);
            if (val % 8 === 0) soundEngine.playRoverMove();
            if (val >= 42 && onInteractionComplete) {
              soundEngine.playSuccess();
              onInteractionComplete();
            }
          }}
          className="w-full h-3 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400 mb-3"
        />

        <div className="flex items-center justify-between text-xs font-mono text-slate-300">
          <span>Earth Marathon: 42.2 KM</span>
          <span>
            {marathonDistance >= 42 ? (
              <strong className="text-amber-400 flex items-center gap-1">
                <Award className="w-4 h-4" /> GOLD MEDAL UNLOCKED!
              </strong>
            ) : (
              `Keep Driving (${42 - marathonDistance} km to Olympic line)`
            )}
          </span>
        </div>
      </div>
    );
  }

  // ---------------- SCENE 9: DUST STORM INTENSITY ----------------
  if (sceneId === 9) {
    return (
      <div className="p-4 rounded-2xl bg-space-card border border-rose-500/40">
        <div className="flex items-center justify-between text-xs font-mono text-rose-300 mb-2">
          <span className="font-bold flex items-center gap-1.5">
            <Wind className="w-4 h-4 text-rose-400" />
            PLANETARY DUST STORM INTENSITY
          </span>
          <span className="font-bold">
            Solar Energy: {Math.max(10, 600 - stormSeverity * 120)} Watts
          </span>
        </div>

        <input
          type="range"
          min="1"
          max="5"
          value={stormSeverity}
          onChange={(e) => {
            const val = Number(e.target.value);
            setStormSeverity(val);
            soundEngine.playClick();
            if (val === 5 && onInteractionComplete) onInteractionComplete();
          }}
          className="w-full h-3 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-rose-500 mb-3"
        />

        <div className="flex items-center justify-between text-xs font-mono text-slate-300">
          <span className="flex items-center gap-1">
            <Sun className="w-4 h-4 text-amber-400" />
            Energy:{" "}
            {Array.from({ length: 6 - stormSeverity }).map((_, i) => (
              <span key={i}>☀️</span>
            ))}
          </span>
          <span className="text-rose-400 font-bold">
            {stormSeverity === 5 ? "Total Darkness" : stormSeverity > 2 ? "Severe Storm" : "Clear Sky"}
          </span>
        </div>
      </div>
    );
  }

  // ---------------- SCENE 10: DEEP SPACE RADIO PING ----------------
  if (sceneId === 10) {
    return (
      <div className="p-4 rounded-2xl bg-space-card border border-cyan-500/40 text-center">
        <div className="text-xs font-mono text-cyan-300 font-bold mb-2 flex items-center justify-center gap-1.5">
          <Radio className="w-4 h-4 text-cyan-400" />
          DEEP SPACE NETWORK • LISTENING FOR SIGNAL
        </div>

        {/* Signal meter */}
        <div className="font-mono text-sm tracking-widest my-2 text-cyan-300">
          SIGNAL:{" "}
          <span className="text-slate-600">
            {hasSentPing ? "..." : "████████ ➔ ████ ➔ █ ➔ ..."}
          </span>
        </div>

        <p className="text-xs text-slate-300 mb-3">
          Over 1,000 wake-up calls were beamed toward Mars from Earth&apos;s giant dishes.
        </p>

        <button
          onClick={() => {
            soundEngine.playRadioPing();
            setHasSentPing(true);
            setSignalStrength(1);
            if (onInteractionComplete) onInteractionComplete();
          }}
          className="px-6 py-2.5 rounded-xl bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-500 text-cyan-200 text-xs font-bold transition-all shadow-glow-sm-cyan flex items-center justify-center gap-2 mx-auto"
        >
          <Radio className="w-4 h-4 text-cyan-400" />
          BEAM RADIO WAKE-UP TRANSMISSION
        </button>
      </div>
    );
  }

  // ---------------- SCENE 11: JUNIOR ASTRONAUT PLEDGE ----------------
  if (sceneId === 11) {
    return (
      <div className="p-4 rounded-2xl bg-space-card border border-amber-500/40">
        <div className="flex items-center justify-between text-xs font-mono text-amber-300 mb-2">
          <span className="font-bold flex items-center gap-1.5">
            <Heart className="w-4 h-4 text-rose-400" />
            JUNIOR ASTRONAUT HONOR ROLL
          </span>
          <span>MISSION CERTIFICATION</span>
        </div>

        <p className="text-xs text-slate-300 mb-3">
          Sign your name to salute Opportunity and become an official Junior Space Explorer!
        </p>

        <div className="flex gap-2 mb-3">
          <input
            type="text"
            placeholder="Enter your name..."
            value={explorerName}
            onChange={(e) => setExplorerName(e.target.value)}
            className="flex-1 px-3 py-2 rounded-xl bg-space-void border border-slate-700 text-white text-xs font-mono focus:outline-none focus:border-amber-400"
          />
          <button
            onClick={() => {
              if (!explorerName.trim()) return;
              soundEngine.playSuccess();
              setBadgeClaimed(true);
              if (onInteractionComplete) onInteractionComplete();
            }}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 text-black font-bold text-xs shadow-glow-gold hover:opacity-95"
          >
            Claim Wings! 🚀
          </button>
        </div>

        {badgeClaimed && (
          <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-500 text-emerald-200 text-xs font-bold text-center animate-fadeIn">
            🎉 Congratulations, Astronaut {explorerName}! You have mastered Opportunity&apos;s story!
          </div>
        )}
      </div>
    );
  }

  return null;
};

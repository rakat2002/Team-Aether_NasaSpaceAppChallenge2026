"use client";

import React, { useState, useEffect } from "react";
import { getSceneNASAImage, NASAImageItem, SCENE_CURATED_NASA_ASSETS } from "@/services/nasaImages";
import { soundEngine } from "@/lib/audio";
import { Info, ExternalLink, Sparkles, Radio, CheckCircle, ChevronDown, ChevronUp } from "lucide-react";

interface NasaImageCardProps {
  sceneId: number;
  className?: string;
  onImageLoaded?: () => void;
}

export const NasaImageCard: React.FC<NasaImageCardProps> = ({
  sceneId,
  className = "",
  onImageLoaded,
}) => {
  const [imageItem, setImageItem] = useState<NASAImageItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [showDetails, setShowDetails] = useState(false);
  const [telemetryPercent, setTelemetryPercent] = useState(12);
  const [mouseParallax, setMouseParallax] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setTelemetryPercent(12);

    // Simulated telemetry progress ticker during acquisition
    const interval = setInterval(() => {
      setTelemetryPercent((prev) => {
        if (prev >= 95) return prev;
        return prev + Math.floor(Math.random() * 18 + 8);
      });
    }, 180);

    getSceneNASAImage(sceneId)
      .then((data) => {
        if (!isMounted) return;
        setImageItem(data);
        setTelemetryPercent(100);
        setTimeout(() => {
          if (isMounted) {
            setLoading(false);
            if (onImageLoaded) onImageLoaded();
          }
        }, 500);
      })
      .catch(() => {
        if (!isMounted) return;
        const fallback = SCENE_CURATED_NASA_ASSETS[sceneId]?.fallback || SCENE_CURATED_NASA_ASSETS[1].fallback;
        setImageItem(fallback);
        setTelemetryPercent(100);
        setLoading(false);
      })
      .finally(() => {
        clearInterval(interval);
      });

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [sceneId, onImageLoaded]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMouseParallax({ x: x * 15, y: y * 15 });
  };

  const handleMouseLeave = () => {
    setMouseParallax({ x: 0, y: 0 });
  };

  const toggleDetails = (e: React.MouseEvent) => {
    e.stopPropagation();
    soundEngine.playClick();
    setShowDetails(!showDetails);
  };

  const data = imageItem?.data;
  const currentImageUrl = imageItem?.imageUrl || SCENE_CURATED_NASA_ASSETS[sceneId]?.fallback?.imageUrl;

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative rounded-3xl overflow-hidden border border-cyan-500/30 bg-space-abyss/80 shadow-2xl shadow-cyan-950/40 backdrop-blur group ${className}`}
      style={{ minHeight: "360px" }}
    >
      {/* ================= LOADING STATE ================= */}
      {loading && (
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-space-void/95 p-6 text-center">
          {/* Scanning line animation */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-25">
            <div className="w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-scanline" />
          </div>

          {/* Tiny orbiting indicator */}
          <div className="relative w-20 h-20 mb-5">
            <div className="absolute inset-0 rounded-full border border-cyan-500/30 border-t-cyan-400 animate-spin" />
            <div className="absolute inset-2 rounded-full border border-purple-500/30 border-b-purple-400 animate-spin-reverse" />
            {/* Pulsing center star */}
            <div className="absolute inset-0 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-yellow-300 animate-pulse" />
            </div>
            {/* Tiny orbiting satellite dot */}
            <div className="absolute inset-0 animate-spin-slow">
              <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-glow-cyan" />
            </div>
          </div>

          <div className="font-display tracking-widest text-xs uppercase text-cyan-400 mb-1 flex items-center gap-1.5">
            <Radio className="w-3.5 h-3.5 text-cyan-400 animate-ping" />
            ACQUIRING NASA IMAGERY...
          </div>
          <div className="font-mono text-[11px] text-slate-400 tracking-wider mb-3">
            DOWNLINK: {Math.min(100, telemetryPercent)}% • X-BAND DEEP SPACE LINK
          </div>

          {/* Telemetry Progress Bar */}
          <div className="w-48 h-1.5 bg-slate-800 rounded-full overflow-hidden border border-cyan-900/60">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 to-amber-400 transition-all duration-200"
              style={{ width: `${Math.min(100, telemetryPercent)}%` }}
            />
          </div>
        </div>
      )}

      {/* ================= ALIVE NASA IMAGE CONTAINER ================= */}
      <div className="relative w-full h-full min-h-[360px] overflow-hidden flex items-center justify-center">
        {/* Atmospheric Floating Martian Dust Particles */}
        <div className="absolute inset-0 z-10 pointer-events-none opacity-40">
          <div className="absolute w-2 h-2 rounded-full bg-amber-400/60 top-1/4 left-1/5 animate-float" />
          <div className="absolute w-1.5 h-1.5 rounded-full bg-rose-400/50 top-2/3 left-3/4 animate-float" style={{ animationDelay: "1s" }} />
          <div className="absolute w-2.5 h-2.5 rounded-full bg-cyan-400/40 top-1/2 left-1/3 animate-float" style={{ animationDelay: "2s" }} />
        </div>

        {/* Ken Burns slow zoom & gentle mouse parallax */}
        {currentImageUrl && (
          <div
            className="w-full h-full absolute inset-0 transition-transform duration-700 ease-out"
            style={{
              transform: `scale(1.08) translate3d(${mouseParallax.x}px, ${mouseParallax.y}px, 0)`,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={currentImageUrl}
              alt={data?.title || "NASA Mars Imagery"}
              className="w-full h-full object-cover object-center filter brightness-95 contrast-105 transition-all duration-1000"
              loading="lazy"
              onError={(e) => {
                // Graceful fallback to verified fallback if image url fails
                const target = e.currentTarget as HTMLImageElement;
                target.src = SCENE_CURATED_NASA_ASSETS[sceneId]?.fallback.imageUrl || SCENE_CURATED_NASA_ASSETS[1].fallback.imageUrl;
              }}
            />
          </div>
        )}

        {/* Cinematic Vignette & Ambient Glow Layer */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-space-void via-transparent to-space-void/40" />
        <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_60px_rgba(0,0,0,0.7)]" />

        {/* Subtle Light Sweep effect */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-cyan-500/10 via-transparent to-amber-500/10 mix-blend-screen" />
      </div>

      {/* ================= SUBTLE NASA ATTRIBUTION BADGE ================= */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
        <div className="px-3 py-1 rounded-full bg-space-void/85 border border-cyan-500/40 backdrop-blur text-[11px] font-mono tracking-wider text-cyan-300 shadow-md flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-bold">NASA</span>
          <span className="text-slate-400">/</span>
          <span>{data?.center || "JPL"}</span>
        </div>

        {/* Expandable Image Details Button */}
        <button
          onClick={toggleDetails}
          className="px-2.5 py-1 rounded-full bg-space-card/85 hover:bg-space-card border border-white/20 hover:border-cyan-400/50 backdrop-blur text-[11px] font-sans text-slate-300 hover:text-white transition-all flex items-center gap-1 shadow-sm"
        >
          <Info className="w-3.5 h-3.5 text-cyan-400" />
          <span className="hidden sm:inline">Details</span>
          {showDetails ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
        </button>
      </div>

      {/* ================= EXPANDABLE IMAGE DETAILS TELEMETRY DRAWER ================= */}
      {showDetails && (
        <div className="absolute inset-x-0 bottom-0 z-30 bg-space-void/95 border-t border-cyan-500/40 p-4 sm:p-5 backdrop-blur-md transition-all animate-fadeIn">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 text-[10px] font-mono border border-cyan-800">
                  ID: {data?.nasa_id || "PIA04856"}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {data?.date_created ? new Date(data.date_created).toLocaleDateString() : "Mars Exploration Rover"}
                </span>
              </div>
              <h4 className="text-sm font-bold text-white mb-1.5 leading-snug">
                {data?.title || "NASA Opportunity Surface Telemetry"}
              </h4>
              <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed max-w-2xl">
                {data?.description || "Authentic official photographic capture retrieved directly from the NASA Images and Video Library Archive."}
              </p>
            </div>
            <button
              onClick={() => setShowDetails(false)}
              className="text-xs font-mono text-cyan-400 hover:text-cyan-200 px-2 py-1 bg-cyan-950/50 rounded border border-cyan-800"
            >
              ✕ Close
            </button>
          </div>

          <div className="mt-3 pt-2.5 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
            <span className="flex items-center gap-1 text-emerald-400">
              <CheckCircle className="w-3.5 h-3.5" />
              Verified NASA Scientific Archive Asset
            </span>
            <a
              href={`https://images.nasa.gov/details/${data?.nasa_id || "PIA04856"}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 hover:text-cyan-300 hover:underline flex items-center gap-1"
            >
              Official NASA Archive <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

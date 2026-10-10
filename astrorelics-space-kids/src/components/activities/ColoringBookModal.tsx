"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { soundEngine } from "@/lib/audio";
import { badgeManager } from "@/lib/badgeManager";
import {
  X,
  Palette,
  Eraser,
  RotateCcw,
  Download,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Brush,
  Undo2,
  Award,
  Flame,
  Sun,
  Check,
} from "lucide-react";

interface ColoringPage {
  id: string;
  title: string;
  subtitle: string;
  theme: string;
  spacecraftType: string;
}

const COLORING_PAGES: ColoringPage[] = [
  {
    id: "opportunity",
    title: "Opportunity Rover on Mars",
    subtitle: "Color the brave 6-wheeled rover rolling across the red dunes of Meridiani Planum!",
    theme: "#F59E0B",
    spacecraftType: "Mars Exploration Rover",
  },
  {
    id: "apollo",
    title: "Apollo 11 Lunar Module (Eagle)",
    subtitle: "Color Neil Armstrong's historic lunar lander standing in the Sea of Tranquility!",
    theme: "#E2E8F0",
    spacecraftType: "Lunar Landing Craft",
  },
  {
    id: "voyager",
    title: "Voyager 1 Deep Space Probe",
    subtitle: "Color the Golden Record probe sailing silently through the interstellar stars!",
    theme: "#00F0FF",
    spacecraftType: "Interstellar Explorer",
  },
  {
    id: "viking",
    title: "Viking 1 Lander on Mars",
    subtitle: "Color the first successful Mars lander with its soil scoop digging in Martian rust!",
    theme: "#EF4444",
    spacecraftType: "Martian Surface Station",
  },
  {
    id: "cassini",
    title: "Cassini Orbiter at Saturn",
    subtitle: "Color the majestic Cassini spacecraft weaving through Saturn's glowing icy rings!",
    theme: "#FBBF24",
    spacecraftType: "Saturn Ring Explorer",
  },
  {
    id: "perseverance",
    title: "Perseverance & Ingenuity Helicopter",
    subtitle: "Color the high-tech rover and its flying twin-rotor helicopter companion!",
    theme: "#F43F5E",
    spacecraftType: "Mars 2020 Dual Mission",
  },
];

const PALETTE = [
  { name: "Mars Red", color: "#EF4444" },
  { name: "Martian Rust", color: "#EA580C" },
  { name: "Solar Gold", color: "#F59E0B" },
  { name: "Sun Yellow", color: "#FEF08A" },
  { name: "Electric Cyan", color: "#00F0FF" },
  { name: "Deep Space Blue", color: "#2563EB" },
  { name: "Cosmic Violet", color: "#9333EA" },
  { name: "Alien Lime", color: "#10B981" },
  { name: "Pink Nebula", color: "#EC4899" },
  { name: "Moon Silver", color: "#94A3B8" },
  { name: "Star White", color: "#FFFFFF" },
  { name: "Dark Shadow", color: "#020617" },
];

interface ColoringBookModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBadgeAwarded?: (badgeId: string) => void;
}

export const ColoringBookModal: React.FC<ColoringBookModalProps> = ({
  isOpen,
  onClose,
  onBadgeAwarded,
}) => {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(PALETTE[0].color);
  const [brushMode, setBrushMode] = useState<"brush" | "glow" | "sparkles" | "eraser">("brush");
  const [brushSize, setBrushSize] = useState(12);
  const [history, setHistory] = useState<ImageData[]>([]);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const paintCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const outlineCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDrawing = useRef(false);
  const lastPos = useRef<{ x: number; y: number } | null>(null);

  const currentPage = COLORING_PAGES[currentPageIndex];

  // Helper: Draw crisp, high-detail spacecraft outlines onto the TOP outline canvas
  const drawPageOutline = useCallback((pageId: string) => {
    const canvas = outlineCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = "#CBD5E1";
    ctx.fillStyle = "transparent";
    ctx.lineWidth = 2.5;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    if (pageId === "opportunity") {
      // Mars horizon line & craters
      ctx.beginPath();
      ctx.moveTo(0, 260);
      ctx.quadraticCurveTo(180, 240, 360, 270);
      ctx.quadraticCurveTo(460, 290, 600, 260);
      ctx.stroke();

      // Distant crater rim
      ctx.beginPath();
      ctx.moveTo(50, 250);
      ctx.quadraticCurveTo(110, 220, 190, 245);
      ctx.stroke();

      // Martian Sun with rays
      ctx.beginPath();
      ctx.arc(500, 70, 25, 0, Math.PI * 2);
      ctx.stroke();
      [0, 45, 90, 135, 180, 225, 270, 315].forEach((deg) => {
        const rad = (deg * Math.PI) / 180;
        ctx.beginPath();
        ctx.moveTo(500 + Math.cos(rad) * 32, 70 + Math.sin(rad) * 32);
        ctx.lineTo(500 + Math.cos(rad) * 42, 70 + Math.sin(rad) * 42);
        ctx.stroke();
      });

      // Distant swirling dust devil
      ctx.beginPath();
      ctx.moveTo(420, 180);
      ctx.bezierCurveTo(430, 140, 410, 110, 425, 80);
      ctx.stroke();

      // Rover Body Chassis
      ctx.strokeRect(200, 140, 180, 65);
      ctx.strokeRect(215, 148, 150, 48); // inner panel

      // Mast Neck & Pancam Eyes
      ctx.beginPath();
      ctx.moveTo(250, 140);
      ctx.lineTo(250, 65);
      ctx.stroke();
      ctx.strokeRect(230, 48, 40, 18);
      // Twin camera eyes
      ctx.beginPath();
      ctx.arc(240, 57, 5, 0, Math.PI * 2);
      ctx.arc(260, 57, 5, 0, Math.PI * 2);
      ctx.stroke();

      // Solar Wing Panels (Left & Right)
      ctx.strokeRect(140, 130, 60, 30);
      ctx.strokeRect(380, 130, 60, 30);
      // Solar cell grid lines
      ctx.beginPath();
      ctx.moveTo(170, 130);
      ctx.lineTo(170, 160);
      ctx.moveTo(410, 130);
      ctx.lineTo(410, 160);
      ctx.stroke();

      // Rocker-Bogie Suspension & 6 Wheels
      ctx.beginPath();
      ctx.moveTo(220, 195);
      ctx.lineTo(170, 235);
      ctx.lineTo(240, 235);
      ctx.moveTo(360, 195);
      ctx.lineTo(410, 235);
      ctx.lineTo(340, 235);
      ctx.stroke();

      [150, 220, 280, 340, 400].forEach((wx) => {
        ctx.strokeRect(wx, 215, 28, 42);
        ctx.beginPath();
        ctx.moveTo(wx, 228);
        ctx.lineTo(wx + 28, 228);
        ctx.moveTo(wx, 242);
        ctx.lineTo(wx + 28, 242);
        ctx.stroke();
      });

      // Robotic Arm
      ctx.beginPath();
      ctx.moveTo(220, 185);
      ctx.lineTo(160, 200);
      ctx.lineTo(120, 245);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(120, 245, 8, 0, Math.PI * 2);
      ctx.stroke();
    } else if (pageId === "apollo") {
      // Moon surface & craters
      ctx.beginPath();
      ctx.moveTo(0, 250);
      ctx.quadraticCurveTo(300, 230, 600, 255);
      ctx.stroke();

      // Large Moon Crater
      ctx.beginPath();
      ctx.ellipse(450, 290, 70, 22, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.ellipse(120, 280, 45, 14, 0, 0, Math.PI * 2);
      ctx.stroke();

      // Earth in the sky
      ctx.beginPath();
      ctx.arc(500, 80, 32, 0, Math.PI * 2);
      ctx.stroke();
      // Earth continents suggestion
      ctx.beginPath();
      ctx.arc(495, 75, 12, 0, Math.PI * 1.2);
      ctx.stroke();

      // Apollo 11 Lunar Module Descent Stage
      ctx.strokeRect(210, 140, 180, 65);
      // Gold foil facets pattern
      ctx.beginPath();
      ctx.moveTo(210, 140);
      ctx.lineTo(260, 205);
      ctx.moveTo(390, 140);
      ctx.lineTo(340, 205);
      ctx.stroke();

      // 4 Landing Gear Legs & Footpads
      ctx.beginPath();
      ctx.moveTo(210, 185);
      ctx.lineTo(130, 255);
      ctx.moveTo(390, 185);
      ctx.lineTo(470, 255);
      ctx.moveTo(260, 205);
      ctx.lineTo(230, 260);
      ctx.moveTo(340, 205);
      ctx.lineTo(370, 260);
      ctx.stroke();

      [130, 470, 230, 370].forEach((fx) => {
        ctx.beginPath();
        ctx.ellipse(fx, 258, 16, 5, 0, 0, Math.PI * 2);
        ctx.stroke();
      });

      // Ladder on Left Leg
      for (let y = 190; y <= 245; y += 10) {
        ctx.beginPath();
        ctx.moveTo(150 + (y - 190) * 0.4, y);
        ctx.lineTo(165 + (y - 190) * 0.4, y);
        ctx.stroke();
      }

      // Ascent Cabin
      ctx.strokeRect(240, 80, 120, 60);
      // Triangular Cockpit Windows
      ctx.beginPath();
      ctx.moveTo(255, 95);
      ctx.lineTo(285, 95);
      ctx.lineTo(270, 115);
      ctx.closePath();
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(315, 95);
      ctx.lineTo(345, 95);
      ctx.lineTo(330, 115);
      ctx.closePath();
      ctx.stroke();

      // RCS Thruster Quads
      ctx.strokeRect(220, 100, 20, 15);
      ctx.strokeRect(360, 100, 20, 15);
    } else if (pageId === "voyager") {
      // Big Parabolic High-Gain Dish Antenna
      ctx.beginPath();
      ctx.ellipse(300, 120, 110, 50, 0, 0, Math.PI * 2);
      ctx.stroke();

      // Feed horn tripod
      ctx.beginPath();
      ctx.moveTo(300, 120);
      ctx.lineTo(300, 60);
      ctx.stroke();
      ctx.strokeRect(290, 50, 20, 12);

      // Decagonal Equipment Bus Body
      ctx.strokeRect(260, 165, 80, 60);

      // Golden Record on the side
      ctx.beginPath();
      ctx.arc(300, 195, 24, 0, Math.PI * 2);
      ctx.stroke();
      // Record sound grooves
      ctx.beginPath();
      ctx.arc(300, 195, 14, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(300, 195, 5, 0, Math.PI * 2);
      ctx.stroke();

      // Long Magnetometer Boom
      ctx.beginPath();
      ctx.moveTo(260, 180);
      ctx.lineTo(80, 60);
      ctx.stroke();
      ctx.strokeRect(65, 50, 18, 14);

      // RTG Power Boom
      ctx.beginPath();
      ctx.moveTo(340, 180);
      ctx.lineTo(490, 250);
      ctx.stroke();
      // 3 RTG Cylinders
      [0, 18, 36].forEach((offset) => {
        ctx.strokeRect(480 + offset, 240, 14, 26);
      });

      // Distant stars & planetary crescents
      [
        [100, 240],
        [480, 80],
        [180, 40],
        [420, 140],
        [520, 290],
      ].forEach(([sx, sy]) => {
        ctx.beginPath();
        ctx.arc(sx, sy, 4, 0, Math.PI * 2);
        ctx.stroke();
      });
    } else if (pageId === "viking") {
      // Martian horizon
      ctx.beginPath();
      ctx.moveTo(0, 245);
      ctx.quadraticCurveTo(240, 230, 600, 255);
      ctx.stroke();

      // Viking Triangular Main Body
      ctx.beginPath();
      ctx.moveTo(300, 130);
      ctx.lineTo(400, 210);
      ctx.lineTo(200, 210);
      ctx.closePath();
      ctx.stroke();

      // 3 Tripod Landing Legs
      ctx.beginPath();
      ctx.moveTo(210, 210);
      ctx.lineTo(150, 260);
      ctx.moveTo(390, 210);
      ctx.lineTo(450, 260);
      ctx.moveTo(300, 210);
      ctx.lineTo(300, 265);
      ctx.stroke();

      [150, 450, 300].forEach((fx) => {
        ctx.beginPath();
        ctx.ellipse(fx, 263, 16, 5, 0, 0, Math.PI * 2);
        ctx.stroke();
      });

      // High Gain Antenna Dish
      ctx.beginPath();
      ctx.arc(300, 100, 24, Math.PI, 0);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(300, 130);
      ctx.lineTo(300, 100);
      ctx.stroke();

      // Surface Sampler Boom & Soil Scoop
      ctx.beginPath();
      ctx.moveTo(240, 190);
      ctx.lineTo(140, 210);
      ctx.lineTo(90, 255);
      ctx.stroke();
      ctx.strokeRect(75, 250, 20, 14); // scoop

      // Soil trench
      ctx.beginPath();
      ctx.moveTo(70, 265);
      ctx.lineTo(120, 265);
      ctx.stroke();

      // Twin Camera Housings
      ctx.strokeRect(260, 115, 14, 25);
      ctx.strokeRect(325, 115, 14, 25);
    } else if (pageId === "cassini") {
      // Saturn & Majestic Rings in Background
      ctx.beginPath();
      ctx.arc(460, 100, 40, 0, Math.PI * 2);
      ctx.stroke();
      // Saturn Rings Ellipse
      ctx.beginPath();
      ctx.ellipse(460, 100, 95, 25, -0.3, 0, Math.PI * 2);
      ctx.stroke();

      // Cassini Main Cylinder Body
      ctx.strokeRect(250, 120, 100, 90);

      // 4-Meter High Gain Antenna Dish at top
      ctx.beginPath();
      ctx.ellipse(300, 120, 75, 30, 0, 0, Math.PI * 2);
      ctx.stroke();

      // Huygens Titan Probe Disc mounted on side
      ctx.beginPath();
      ctx.ellipse(230, 160, 24, 38, 0, 0, Math.PI * 2);
      ctx.stroke();

      // Magnetometer Boom
      ctx.beginPath();
      ctx.moveTo(350, 160);
      ctx.lineTo(480, 230);
      ctx.stroke();

      // Rocket Engine Nozzle at base
      ctx.beginPath();
      ctx.moveTo(270, 210);
      ctx.lineTo(260, 240);
      ctx.lineTo(340, 240);
      ctx.lineTo(330, 210);
      ctx.stroke();
    } else {
      // Perseverance & Ingenuity
      // Mars horizon
      ctx.beginPath();
      ctx.moveTo(0, 250);
      ctx.quadraticCurveTo(300, 235, 600, 260);
      ctx.stroke();

      // Perseverance Body
      ctx.strokeRect(180, 140, 190, 70);

      // Mast with SuperCam & Navcam
      ctx.beginPath();
      ctx.moveTo(230, 140);
      ctx.lineTo(230, 60);
      ctx.stroke();
      ctx.strokeRect(215, 45, 35, 18);
      ctx.beginPath();
      ctx.arc(232, 54, 6, 0, Math.PI * 2);
      ctx.stroke();

      // 6 Big Wheels
      [150, 210, 270, 330, 390].forEach((wx) => {
        ctx.strokeRect(wx, 215, 28, 42);
        // Cleat treads
        ctx.beginPath();
        ctx.moveTo(wx, 230);
        ctx.lineTo(wx + 28, 230);
        ctx.moveTo(wx, 244);
        ctx.lineTo(wx + 28, 244);
        ctx.stroke();
      });

      // Robotic Arm with Turret Drill
      ctx.beginPath();
      ctx.moveTo(370, 180);
      ctx.lineTo(430, 195);
      ctx.lineTo(460, 245);
      ctx.stroke();
      ctx.strokeRect(450, 240, 20, 16);

      // Ingenuity Drone Helicopter Flying in Sky!
      ctx.strokeRect(440, 80, 30, 25);
      // Twin Rotors
      ctx.beginPath();
      ctx.ellipse(455, 68, 45, 5, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.ellipse(455, 75, 45, 5, 0, 0, Math.PI * 2);
      ctx.stroke();
      // 4 Copter Legs
      ctx.beginPath();
      ctx.moveTo(442, 105);
      ctx.lineTo(430, 125);
      ctx.moveTo(468, 105);
      ctx.lineTo(480, 125);
      ctx.stroke();
    }
  }, []);

  // Initialize Canvas Layers
  const initCanvases = useCallback(() => {
    const paintCanvas = paintCanvasRef.current;
    if (paintCanvas) {
      const pCtx = paintCanvas.getContext("2d");
      if (pCtx) {
        // Space paper background
        pCtx.fillStyle = "#070B1E";
        pCtx.fillRect(0, 0, paintCanvas.width, paintCanvas.height);

        // Subtle background star dots
        pCtx.fillStyle = "rgba(255, 255, 255, 0.4)";
        for (let i = 0; i < 40; i++) {
          const rx = (i * 97) % paintCanvas.width;
          const ry = (i * 61) % paintCanvas.height;
          pCtx.fillRect(rx, ry, 1.5, 1.5);
        }
      }
    }

    drawPageOutline(currentPage.id);
  }, [currentPage.id, drawPageOutline]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        initCanvases();
        setHistory([]);
      }, 50);
    }
  }, [isOpen, currentPageIndex, initCanvases]);

  if (!isOpen) return null;

  // Save current state to history before drawing
  const pushHistory = () => {
    const canvas = paintCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    setHistory((prev) => [...prev.slice(-10), ctx.getImageData(0, 0, canvas.width, canvas.height)]);
  };

  const handleUndo = () => {
    if (history.length === 0) return;
    const canvas = paintCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    soundEngine.playClick();
    const previous = history[history.length - 1];
    ctx.putImageData(previous, 0, 0);
    setHistory((prev) => prev.slice(0, prev.length - 1));
  };

  const handleClear = () => {
    soundEngine.playClick();
    pushHistory();
    initCanvases();
  };

  // Coordinates helper
  const getCoordinates = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = paintCanvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    if ("touches" in e) {
      return {
        x: (e.touches[0].clientX - rect.left) * scaleX,
        y: (e.touches[0].clientY - rect.top) * scaleY,
      };
    }
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  };

  // Drawing Handlers
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    pushHistory();
    isDrawing.current = true;
    const { x, y } = getCoordinates(e);
    lastPos.current = { x, y };

    const canvas = paintCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (brushMode === "sparkles") {
      drawSparkle(ctx, x, y, selectedColor);
    } else {
      ctx.beginPath();
      ctx.arc(x, y, brushSize / 2, 0, Math.PI * 2);
      ctx.fillStyle = brushMode === "eraser" ? "#070B1E" : selectedColor;
      ctx.fill();
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing.current || !lastPos.current) return;
    const canvas = paintCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { x, y } = getCoordinates(e);

    ctx.save();
    ctx.lineWidth = brushSize;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    if (brushMode === "eraser") {
      ctx.strokeStyle = "#070B1E";
      ctx.beginPath();
      ctx.moveTo(lastPos.current.x, lastPos.current.y);
      ctx.lineTo(x, y);
      ctx.stroke();
    } else if (brushMode === "glow") {
      ctx.shadowBlur = 15;
      ctx.shadowColor = selectedColor;
      ctx.strokeStyle = selectedColor;
      ctx.beginPath();
      ctx.moveTo(lastPos.current.x, lastPos.current.y);
      ctx.lineTo(x, y);
      ctx.stroke();
    } else if (brushMode === "sparkles") {
      drawSparkle(ctx, x, y, selectedColor);
    } else {
      // Standard smooth brush
      ctx.strokeStyle = selectedColor;
      ctx.beginPath();
      ctx.moveTo(lastPos.current.x, lastPos.current.y);
      ctx.lineTo(x, y);
      ctx.stroke();
    }

    ctx.restore();
    lastPos.current = { x, y };
  };

  const stopDrawing = () => {
    isDrawing.current = false;
    lastPos.current = null;
  };

  // Draw cute 4-point sparkle star stamp
  const drawSparkle = (ctx: CanvasRenderingContext2D, cx: number, cy: number, color: string) => {
    ctx.save();
    ctx.fillStyle = color;
    ctx.shadowBlur = 8;
    ctx.shadowColor = color;
    const r = brushSize * 1.2;

    ctx.beginPath();
    ctx.moveTo(cx, cy - r);
    ctx.quadraticCurveTo(cx, cy, cx + r, cy);
    ctx.quadraticCurveTo(cx, cy, cx, cy + r);
    ctx.quadraticCurveTo(cx, cy, cx - r, cy);
    ctx.quadraticCurveTo(cx, cy, cx, cy - r);
    ctx.fill();
    ctx.restore();
  };

  // Download Artwork as combined PNG
  const handleDownload = () => {
    soundEngine.playSuccess();
    const pCanvas = paintCanvasRef.current;
    const oCanvas = outlineCanvasRef.current;
    if (!pCanvas || !oCanvas) return;

    // Create an offscreen merge canvas
    const exportCanvas = document.createElement("canvas");
    exportCanvas.width = pCanvas.width;
    exportCanvas.height = pCanvas.height;
    const eCtx = exportCanvas.getContext("2d");
    if (!eCtx) return;

    // 1. Draw paint layer
    eCtx.drawImage(pCanvas, 0, 0);
    // 2. Draw outline layer on top
    eCtx.drawImage(oCanvas, 0, 0);

    // Watermark
    eCtx.font = "bold 14px sans-serif";
    eCtx.fillStyle = "#00F0FF";
    eCtx.fillText("NASA Space Archaeology Academy • My Spacecraft Artwork", 20, exportCanvas.height - 20);

    const link = document.createElement("a");
    link.download = `${currentPage.id}-spacecraft-artwork.png`;
    link.href = exportCanvas.toDataURL("image/png");
    link.click();
  };

  // Save Artwork & Unlock "Galactic Artist" Badge
  const handleFinishArtwork = () => {
    soundEngine.playSuccess();
    setSaveSuccess(true);
    const { isNewlyUnlocked, badge } = badgeManager.unlockBadge("badge-galactic-artist");
    if (onBadgeAwarded) {
      onBadgeAwarded("badge-galactic-artist");
    }
    setTimeout(() => {
      setSaveSuccess(false);
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-space-void/90 backdrop-blur-md animate-fadeIn select-none overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-space-abyss border-2 border-rose-500/40 rounded-3xl p-4 sm:p-6 shadow-[0_0_60px_rgba(244,63,94,0.2)] text-white my-auto overflow-hidden flex flex-col max-h-[95vh]">
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-gradient-to-b from-rose-500/20 to-transparent pointer-events-none rounded-full blur-3xl" />

        {/* ================= TOP HEADER BAR ================= */}
        <div className="flex items-center justify-between gap-3 mb-3 relative z-10 flex-shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-300">
              <Palette className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-black text-sm sm:text-base text-white">
                  SPACE COLORING STUDIO 🎨
                </span>
                <span className="hidden sm:inline px-2 py-0.5 rounded-full bg-rose-950/80 text-[10px] font-mono text-rose-300 border border-rose-500/40">
                  SCRATCH & DRAG BRUSH
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-sans hidden sm:block">
                Choose a colour and drag/scratch freely — the spacecraft outlines stay crisp on top!
              </p>
            </div>
          </div>

          {/* Close Button */}
          <button
            onClick={() => {
              soundEngine.playClick();
              onClose();
            }}
            className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Spacecraft Page Selector Strip */}
        <div className="flex items-center justify-between gap-2 mb-3 bg-space-card/70 p-2 rounded-2xl border border-slate-700/80 relative z-10 flex-shrink-0">
          <button
            onClick={() => {
              soundEngine.playClick();
              setCurrentPageIndex((prev) =>
                prev === 0 ? COLORING_PAGES.length - 1 : prev - 1
              );
            }}
            className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
            title="Previous Spacecraft"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="text-center overflow-hidden">
            <div className="font-display font-black text-xs sm:text-sm text-white truncate">
              {currentPage.title}
            </div>
            <div className="text-[10px] font-mono text-cyan-300 truncate">
              {currentPage.subtitle}
            </div>
          </div>

          <button
            onClick={() => {
              soundEngine.playClick();
              setCurrentPageIndex((prev) => (prev + 1) % COLORING_PAGES.length);
            }}
            className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
            title="Next Spacecraft"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* ================= MAIN WORKSPACE: CANVAS & TOOLS ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 flex-grow overflow-y-auto pr-1">
          {/* LEFT: MULTI-LAYER PAINT CANVAS (Cols 1-8) */}
          <div className="lg:col-span-8 flex flex-col items-center justify-center relative">
            <div className="relative w-full max-w-[600px] aspect-[4/3] rounded-2xl overflow-hidden border-2 border-slate-700 shadow-2xl bg-[#070B1E] touch-none cursor-crosshair">
              {/* Bottom Canvas: Paint Layer */}
              <canvas
                ref={paintCanvasRef}
                width={600}
                height={450}
                className="absolute inset-0 w-full h-full"
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                onTouchStart={startDrawing}
                onTouchMove={draw}
                onTouchEnd={stopDrawing}
              />

              {/* Top Canvas: Crisp Spacecraft Line Art (Protected on top!) */}
              <canvas
                ref={outlineCanvasRef}
                width={600}
                height={450}
                className="absolute inset-0 w-full h-full pointer-events-none"
              />
            </div>
          </div>

          {/* RIGHT: BRUSHES & PALETTE CONTROLS (Cols 9-12) */}
          <div className="lg:col-span-4 flex flex-col justify-between gap-4 p-4 rounded-2xl bg-space-card/90 border border-slate-700/80">
            {/* 1. BRUSH MODE TOOLS */}
            <div>
              <div className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider mb-2">
                1. Select Brush Tool
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs font-mono font-bold">
                <button
                  onClick={() => {
                    soundEngine.playClick();
                    setBrushMode("brush");
                  }}
                  className={`p-2.5 rounded-xl border flex items-center gap-2 transition-all ${
                    brushMode === "brush"
                      ? "bg-rose-500/20 border-rose-500 text-rose-300 shadow-sm"
                      : "bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-800"
                  }`}
                >
                  <Brush className="w-4 h-4 text-rose-400" />
                  <span>Smooth Pen</span>
                </button>

                <button
                  onClick={() => {
                    soundEngine.playClick();
                    setBrushMode("glow");
                  }}
                  className={`p-2.5 rounded-xl border flex items-center gap-2 transition-all ${
                    brushMode === "glow"
                      ? "bg-cyan-500/20 border-cyan-500 text-cyan-300 shadow-sm"
                      : "bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-800"
                  }`}
                >
                  <Flame className="w-4 h-4 text-cyan-400" />
                  <span>Neon Glow</span>
                </button>

                <button
                  onClick={() => {
                    soundEngine.playClick();
                    setBrushMode("sparkles");
                  }}
                  className={`p-2.5 rounded-xl border flex items-center gap-2 transition-all ${
                    brushMode === "sparkles"
                      ? "bg-amber-500/20 border-amber-500 text-amber-300 shadow-sm"
                      : "bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-800"
                  }`}
                >
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Star Stamp</span>
                </button>

                <button
                  onClick={() => {
                    soundEngine.playClick();
                    setBrushMode("eraser");
                  }}
                  className={`p-2.5 rounded-xl border flex items-center gap-2 transition-all ${
                    brushMode === "eraser"
                      ? "bg-purple-500/20 border-purple-500 text-purple-300 shadow-sm"
                      : "bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-800"
                  }`}
                >
                  <Eraser className="w-4 h-4 text-purple-400" />
                  <span>Eraser</span>
                </button>
              </div>
            </div>

            {/* 2. BRUSH SIZE SLIDER */}
            <div>
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-1.5">
                <span>2. Brush Size</span>
                <span className="text-cyan-300 font-bold">{brushSize}px</span>
              </div>
              <input
                type="range"
                min="4"
                max="36"
                value={brushSize}
                onChange={(e) => setBrushSize(parseInt(e.target.value, 10))}
                className="w-full accent-rose-500 cursor-pointer"
              />
            </div>

            {/* 3. COLOR PALETTE */}
            <div>
              <div className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center justify-between">
                <span>3. Cosmic Palette</span>
                <label className="text-[10px] text-cyan-300 flex items-center gap-1 cursor-pointer">
                  <span>Custom:</span>
                  <input
                    type="color"
                    value={selectedColor}
                    onChange={(e) => {
                      setSelectedColor(e.target.value);
                      if (brushMode === "eraser") setBrushMode("brush");
                    }}
                    className="w-5 h-5 rounded cursor-pointer border-0 bg-transparent"
                  />
                </label>
              </div>
              <div className="grid grid-cols-6 gap-2">
                {PALETTE.map((p) => {
                  const isSelected = selectedColor === p.color && brushMode !== "eraser";
                  return (
                    <button
                      key={p.color}
                      onClick={() => {
                        soundEngine.playClick();
                        setSelectedColor(p.color);
                        if (brushMode === "eraser") setBrushMode("brush");
                      }}
                      style={{ backgroundColor: p.color }}
                      title={p.name}
                      className={`w-full aspect-square rounded-xl shadow-md transition-transform relative ${
                        isSelected
                          ? "ring-2 ring-white scale-110 shadow-lg"
                          : "hover:scale-105 opacity-90 hover:opacity-100"
                      }`}
                    >
                      {isSelected && (
                        <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-black drop-shadow">
                          ✓
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 4. ACTIONS: UNDO, CLEAR, DOWNLOAD, FINISH */}
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <div className="grid grid-cols-2 gap-2 text-xs font-mono font-bold">
                <button
                  onClick={handleUndo}
                  disabled={history.length === 0}
                  className="py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed text-slate-200 border border-slate-700 flex items-center justify-center gap-1.5 transition-all"
                >
                  <Undo2 className="w-3.5 h-3.5" />
                  <span>Undo</span>
                </button>

                <button
                  onClick={handleClear}
                  className="py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center justify-center gap-1.5 transition-all"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Clear</span>
                </button>
              </div>

              <button
                onClick={handleDownload}
                className="w-full py-2.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/50 font-mono text-xs font-bold transition-all flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Save Artwork to Computer (PNG)</span>
              </button>

              <button
                onClick={handleFinishArtwork}
                className={`w-full py-3 rounded-xl font-display font-black text-xs tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg ${
                  saveSuccess
                    ? "bg-emerald-500 text-black shadow-glow-sm-cyan"
                    : "bg-gradient-to-r from-rose-500 to-amber-500 text-white shadow-glow-gold hover:scale-[1.02] active:scale-95"
                }`}
              >
                <Award className="w-4 h-4" />
                <span>
                  {saveSuccess
                    ? "ARTIST BADGE UNLOCKED! 🎖️"
                    : "I FINISHED MY PAINTING! (EARN BADGE)"}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

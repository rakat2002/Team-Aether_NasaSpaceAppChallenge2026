"use client";

import React, { useEffect, useRef } from "react";
import { soundEngine } from "@/lib/audio";

interface StarfieldCanvasProps {
  interactive?: boolean;
  warpSpeed?: boolean;
  starCount?: number;
  className?: string;
  onStarClick?: () => void;
}

interface Star {
  x: number;
  y: number;
  z: number;
  size: number;
  color: string;
  alpha: number;
  twinkleSpeed: number;
}

interface ShootingStar {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  opacity: number;
  active: boolean;
}

export const StarfieldCanvas: React.FC<StarfieldCanvasProps> = ({
  interactive = true,
  warpSpeed = false,
  starCount = 180,
  className = "",
  onStarClick,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mousePos = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!interactive) return;
      const rect = canvas.getBoundingClientRect();
      mousePos.current.targetX = (e.clientX - rect.left - width / 2) * 0.05;
      mousePos.current.targetY = (e.clientY - rect.top - height / 2) * 0.05;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);

    // Initialize stars
    const colors = ["#FFFFFF", "#E0F2FE", "#BAE6FD", "#FDE047", "#F472B6", "#C084FC"];
    const stars: Star[] = Array.from({ length: starCount }, () => ({
      x: (Math.random() - 0.5) * width * 1.5,
      y: (Math.random() - 0.5) * height * 1.5,
      z: Math.random() * width,
      size: Math.random() * 2 + 0.6,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: Math.random() * 0.8 + 0.2,
      twinkleSpeed: Math.random() * 0.03 + 0.01,
    }));

    // Shooting stars
    const shootingStars: ShootingStar[] = [];
    const spawnShootingStar = () => {
      if (Math.random() > 0.985 && shootingStars.length < 3) {
        shootingStars.push({
          x: Math.random() * width,
          y: Math.random() * (height * 0.5),
          length: Math.random() * 120 + 80,
          speed: Math.random() * 18 + 12,
          angle: Math.PI / 4 + (Math.random() - 0.5) * 0.3,
          opacity: 1,
          active: true,
        });
      }
    };

    let tick = 0;

    const render = () => {
      tick++;
      // Smooth mouse lerp
      mousePos.current.x += (mousePos.current.targetX - mousePos.current.x) * 0.05;
      mousePos.current.y += (mousePos.current.targetY - mousePos.current.y) * 0.05;

      ctx.clearRect(0, 0, width, height);

      // Draw faint colorful cosmic nebula clouds
      const grad1 = ctx.createRadialGradient(
        width * 0.2 + mousePos.current.x * 2,
        height * 0.3 + mousePos.current.y * 2,
        20,
        width * 0.2,
        height * 0.3,
        width * 0.45
      );
      grad1.addColorStop(0, "rgba(121, 40, 202, 0.15)");
      grad1.addColorStop(0.6, "rgba(79, 70, 229, 0.06)");
      grad1.addColorStop(1, "transparent");
      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, width, height);

      const grad2 = ctx.createRadialGradient(
        width * 0.8 - mousePos.current.x * 2,
        height * 0.7 - mousePos.current.y * 2,
        10,
        width * 0.8,
        height * 0.7,
        width * 0.5
      );
      grad2.addColorStop(0, "rgba(0, 240, 255, 0.12)");
      grad2.addColorStop(0.5, "rgba(200, 75, 49, 0.05)");
      grad2.addColorStop(1, "transparent");
      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, width, height);

      // Render stars
      const speed = warpSpeed ? 35 : 0.8;
      const cx = width / 2;
      const cy = height / 2;

      stars.forEach((star) => {
        star.z -= speed;
        if (star.z <= 0) {
          star.z = width;
          star.x = (Math.random() - 0.5) * width * 1.5;
          star.y = (Math.random() - 0.5) * height * 1.5;
        }

        const k = 250 / star.z;
        const px = (star.x - mousePos.current.x) * k + cx;
        const py = (star.y - mousePos.current.y) * k + cy;

        if (px >= 0 && px < width && py >= 0 && py < height) {
          const currentAlpha =
            star.alpha * (0.6 + 0.4 * Math.sin(tick * star.twinkleSpeed));

          if (warpSpeed) {
            // Hyperdrive star streak lines!
            const prevK = 250 / (star.z + speed * 3);
            const prevPx = (star.x - mousePos.current.x) * prevK + cx;
            const prevPy = (star.y - mousePos.current.y) * prevK + cy;

            ctx.beginPath();
            ctx.moveTo(prevPx, prevPy);
            ctx.lineTo(px, py);
            ctx.strokeStyle = star.color;
            ctx.lineWidth = Math.max(1, (1 - star.z / width) * 3);
            ctx.stroke();
          } else {
            // Twinkling round star
            ctx.beginPath();
            ctx.arc(px, py, star.size * (1 - star.z / width) * 1.8, 0, Math.PI * 2);
            ctx.fillStyle = star.color;
            ctx.globalAlpha = Math.max(0.1, Math.min(1, currentAlpha));
            ctx.fill();
            ctx.globalAlpha = 1;
          }
        }
      });

      // Spawn and draw shooting stars
      spawnShootingStar();
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const s = shootingStars[i];
        s.x += Math.cos(s.angle) * s.speed;
        s.y += Math.sin(s.angle) * s.speed;
        s.opacity -= 0.015;

        if (s.opacity <= 0 || s.x > width + 100 || s.y > height + 100) {
          shootingStars.splice(i, 1);
          continue;
        }

        const tailX = s.x - Math.cos(s.angle) * s.length;
        const tailY = s.y - Math.sin(s.angle) * s.length;

        const sGrad = ctx.createLinearGradient(tailX, tailY, s.x, s.y);
        sGrad.addColorStop(0, "transparent");
        sGrad.addColorStop(0.7, `rgba(255, 255, 255, ${s.opacity * 0.6})`);
        sGrad.addColorStop(1, `rgba(0, 240, 255, ${s.opacity})`);

        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(s.x, s.y);
        ctx.strokeStyle = sGrad;
        ctx.lineWidth = 2.5;
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [interactive, warpSpeed, starCount]);

  const handleCanvasClick = () => {
    soundEngine.playSparkle();
    if (onStarClick) onStarClick();
  };

  return (
    <canvas
      ref={canvasRef}
      onClick={handleCanvasClick}
      className={`fixed inset-0 pointer-events-auto select-none ${className}`}
      style={{ zIndex: 0 }}
    />
  );
};

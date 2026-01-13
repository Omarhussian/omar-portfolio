"use client";

import { useEffect, useRef, useState } from "react";

interface Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  size: number;
  color: string;
  vx: number;
  vy: number;
}

export default function HeroScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const animationRef = useRef<number>(0);
  const [isIntroComplete, setIsIntroComplete] = useState(false);
  const introProgressRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const colors = ["#a855f7", "#8b5cf6", "#7c3aed", "#6d28d9", "#c084fc"];

    const setupCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      
      return { width: rect.width, height: rect.height };
    };

    const createParticles = (width: number, height: number) => {
      const particles: Particle[] = [];
      const text = "</>";
      const fontSize = Math.min(width * 0.2, 160);

      const offscreen = document.createElement("canvas");
      offscreen.width = width;
      offscreen.height = height;
      const offCtx = offscreen.getContext("2d");
      if (!offCtx) return particles;

      offCtx.font = `bold ${fontSize}px "Inter", system-ui, -apple-system, sans-serif`;
      offCtx.fillStyle = "#a855f7";
      offCtx.textAlign = "center";
      offCtx.textBaseline = "middle";
      offCtx.fillText(text, width / 2, height / 2);

      const imageData = offCtx.getImageData(0, 0, width, height);
      const data = imageData.data;
      const gap = 4;

      for (let y = 0; y < height; y += gap) {
        for (let x = 0; x < width; x += gap) {
          const index = (y * width + x) * 4;
          if (data[index + 3] > 128) {
            // Start particles from random positions around the canvas
            const startX = Math.random() * width;
            const startY = Math.random() * height;
            
            particles.push({
              x: startX,
              y: startY,
              originX: x,
              originY: y,
              size: Math.random() * 2 + 1.5,
              color: colors[Math.floor(Math.random() * colors.length)],
              vx: 0,
              vy: 0,
            });
          }
        }
      }

      return particles;
    };

    const init = () => {
      const { width, height } = setupCanvas();
      particlesRef.current = createParticles(width, height);
      introProgressRef.current = 0;
      setIsIntroComplete(false);
    };

    const animate = () => {
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      const particles = particlesRef.current;
      const mouse = mouseRef.current;
      const mouseRadius = 100;

      // Intro animation progress (0 to 1 over ~2.5 seconds)
      if (introProgressRef.current < 1) {
        introProgressRef.current += 0.008;
        if (introProgressRef.current >= 1) {
          introProgressRef.current = 1;
          setIsIntroComplete(true);
        }
      }

      const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
      const introEase = easeOut(introProgressRef.current);

      for (const p of particles) {
        if (introProgressRef.current < 1) {
          // During intro: smoothly move to origin position
          p.x += (p.originX - p.x) * 0.02 * introEase;
          p.y += (p.originY - p.y) * 0.02 * introEase;
        } else {
          // After intro: full interactivity
          // Mouse repulsion
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouseRadius && dist > 0) {
            const force = (mouseRadius - dist) / mouseRadius;
            p.vx -= (dx / dist) * force * 8;
            p.vy -= (dy / dist) * force * 8;
          }

          // Spring back to origin
          p.vx += (p.originX - p.x) * 0.06;
          p.vy += (p.originY - p.y) * 0.06;

          // Friction
          p.vx *= 0.88;
          p.vy *= 0.88;

          // Update position
          p.x += p.vx;
          p.y += p.vy;
        }

        // Draw with fade-in during intro
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.min(introProgressRef.current * 1.5, 1);
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    init();
    animate();

    const handleResize = () => {
      init();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isIntroComplete) return; // Disable mouse interaction during intro
    
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    }
  };

  const handleMouseLeave = () => {
    mouseRef.current = { x: -1000, y: -1000 };
  };

  return (
    <div
      className="absolute inset-0 z-0"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/50 via-zinc-900 to-zinc-950" />
      
      {/* Ambient glow */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-violet-600/15 rounded-full blur-[100px] pointer-events-none" />

      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />

      {/* Top/bottom gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-zinc-950/50 pointer-events-none" />
    </div>
  );
}

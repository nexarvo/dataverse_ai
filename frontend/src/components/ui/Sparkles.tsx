"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface SparklesProps {
  density?: number;
  className?: string;
}

export function Sparkles({ density = 100, className }: SparklesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const sparkles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      life: number;
      maxLife: number;
    }> = [];

    // Initialize sparkles
    for (let i = 0; i < density; i++) {
      sparkles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.5,
        life: Math.random() * 100,
        maxLife: 100 + Math.random() * 100,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      sparkles.forEach((sparkle) => {
        // Update position
        sparkle.x += sparkle.vx;
        sparkle.y += sparkle.vy;

        // Update life
        sparkle.life++;

        // Reset sparkle if it goes off screen or dies
        if (
          sparkle.x < 0 ||
          sparkle.x > canvas.width ||
          sparkle.y < 0 ||
          sparkle.y > canvas.height ||
          sparkle.life > sparkle.maxLife
        ) {
          sparkle.x = Math.random() * canvas.width;
          sparkle.y = Math.random() * canvas.height;
          sparkle.life = 0;
          sparkle.opacity = Math.random() * 0.5 + 0.5;
        }

        // Calculate opacity based on life
        const lifeRatio = sparkle.life / sparkle.maxLife;
        const currentOpacity = sparkle.opacity * (1 - lifeRatio);

        // Draw sparkle
        ctx.save();
        ctx.globalAlpha = currentOpacity;
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(sparkle.x, sparkle.y, sparkle.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [density]);

  return (
    <canvas ref={canvasRef} className={cn("pointer-events-none", className)} />
  );
}

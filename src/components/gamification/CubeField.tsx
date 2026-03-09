"use client";

import { useEffect, useRef } from "react";

export function CubeField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const cubes: Array<{
      x: number;
      y: number;
      size: number;
      speed: number;
      rotation: number;
      rotSpeed: number;
      opacity: number;
      color: string;
    }> = [];

    const colors = ["#2563eb", "#ea580c", "#06b6d4", "#22c55e", "#a855f7"];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    const initCubes = () => {
      cubes.length = 0;
      const count = Math.floor((canvas.width * canvas.height) / 15000);
      for (let i = 0; i < count; i++) {
        cubes.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: 4 + Math.random() * 12,
          speed: 0.2 + Math.random() * 0.8,
          rotation: Math.random() * Math.PI * 2,
          rotSpeed: (Math.random() - 0.5) * 0.02,
          opacity: 0.05 + Math.random() * 0.15,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      cubes.forEach((c) => {
        c.y -= c.speed;
        c.rotation += c.rotSpeed;
        if (c.y + c.size < 0) {
          c.y = canvas.height + c.size;
          c.x = Math.random() * canvas.width;
        }
        ctx.save();
        ctx.translate(c.x, c.y);
        ctx.rotate(c.rotation);
        ctx.globalAlpha = c.opacity;
        ctx.fillStyle = c.color;
        ctx.fillRect(-c.size / 2, -c.size / 2, c.size, c.size);
        ctx.restore();
      });
      animId = requestAnimationFrame(draw);
    };

    resize();
    initCubes();
    draw();

    window.addEventListener("resize", () => {
      resize();
      initCubes();
    });

    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      aria-hidden="true"
    />
  );
}

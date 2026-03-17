/* ============================================================
   DESIGN: "Collision Event" — Animated particle canvas
   Simulates LHC particle collision trajectories
   ============================================================ */

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
}

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);
  const lastBurstRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const colors = ["#f5c842", "#4d9fff", "#ff6b6b", "#a78bfa", "#34d399"];

    const spawnBurst = () => {
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const count = 12 + Math.floor(Math.random() * 8);
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + Math.random() * 0.3;
        const speed = 0.5 + Math.random() * 2;
        particlesRef.current.push({
          x: cx,
          y: cy,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 0,
          maxLife: 120 + Math.random() * 80,
          size: 1 + Math.random() * 2,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    };

    const draw = (timestamp: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Spawn burst every 3 seconds
      if (timestamp - lastBurstRef.current > 3000) {
        spawnBurst();
        lastBurstRef.current = timestamp;
      }

      // Update and draw particles
      particlesRef.current = particlesRef.current.filter((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life++;
        const alpha = 1 - p.life / p.maxLife;
        if (alpha <= 0) return false;

        ctx.save();
        ctx.globalAlpha = alpha * 0.7;
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Draw trail
        ctx.globalAlpha = alpha * 0.2;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x - p.vx * 8, p.y - p.vy * 8);
        ctx.strokeStyle = p.color;
        ctx.lineWidth = p.size * 0.5;
        ctx.stroke();
        ctx.restore();

        return true;
      });

      animFrameRef.current = requestAnimationFrame(draw);
    };

    // Initial burst
    spawnBurst();
    animFrameRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.6 }}
    />
  );
}

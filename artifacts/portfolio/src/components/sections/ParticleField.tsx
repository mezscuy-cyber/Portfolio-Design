import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  twinkleSpeed: number;
  twinklePhase: number;
  color: string;
}

export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const starsRef = useRef<Star[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = canvas.offsetWidth;
    const H = canvas.offsetHeight;
    canvas.width = W;
    canvas.height = H;

    // Elegant star colors — dim greens, whites, soft teals
    const COLORS = [
      "180,255,200",   // mint white
      "160,255,160",   // soft green
      "200,255,220",   // pale green-white
      "220,255,230",   // near white green
      "140,220,180",   // muted teal
    ];

    const spawn = (): Star => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.12,
      vy: (Math.random() - 0.5) * 0.12,
      radius: 0.5 + Math.random() * 1.5,
      alpha: 0.3 + Math.random() * 0.5,
      twinkleSpeed: 0.008 + Math.random() * 0.02,
      twinklePhase: Math.random() * Math.PI * 2,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    });

    starsRef.current = Array.from({ length: 90 }, spawn);

    let animId: number;
    let t = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };
    canvas.addEventListener("mousemove", handleMouseMove);

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const stars = starsRef.current;

      // Draw constellation connections first
      for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
          const dx = stars[i].x - stars[j].x;
          const dy = stars[i].y - stars[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 85) {
            const fade = 1 - d / 85;
            ctx.beginPath();
            ctx.moveTo(stars[i].x, stars[i].y);
            ctx.lineTo(stars[j].x, stars[j].y);
            ctx.strokeStyle = `rgba(100,220,140,${fade * 0.12})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Draw stars
      stars.forEach((star) => {
        // Gentle drift
        star.x += star.vx;
        star.y += star.vy;

        // Wrap
        if (star.x < 0) star.x = W;
        if (star.x > W) star.x = 0;
        if (star.y < 0) star.y = H;
        if (star.y > H) star.y = 0;

        // Subtle mouse repulsion — gentle push away
        const dx = star.x - mx;
        const dy = star.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100 && dist > 0) {
          const force = (1 - dist / 100) * 0.04;
          star.vx += (dx / dist) * force;
          star.vy += (dy / dist) * force;
        }

        // Speed clamp
        const speed = Math.sqrt(star.vx * star.vx + star.vy * star.vy);
        if (speed > 0.5) {
          star.vx = (star.vx / speed) * 0.5;
          star.vy = (star.vy / speed) * 0.5;
        }

        // Damping back to base drift
        star.vx = star.vx * 0.98 + (Math.random() - 0.5) * 0.002;
        star.vy = star.vy * 0.98 + (Math.random() - 0.5) * 0.002;

        // Twinkling alpha
        const twinkle = star.alpha * (0.6 + 0.4 * Math.sin(t * star.twinkleSpeed + star.twinklePhase));

        // Soft glow halo
        const glow = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.radius * 5);
        glow.addColorStop(0, `rgba(${star.color},${twinkle * 0.6})`);
        glow.addColorStop(1, `rgba(${star.color},0)`);
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius * 5, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        // Core star dot
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${star.color},${twinkle})`;
        ctx.fill();
      });

      // Mouse cursor halo — ethereal green ring
      if (mx > 0 && mx < W && my > 0 && my < H) {
        const halo = ctx.createRadialGradient(mx, my, 0, mx, my, 60);
        halo.addColorStop(0, "rgba(100,220,140,0.06)");
        halo.addColorStop(0.6, "rgba(100,220,140,0.02)");
        halo.addColorStop(1, "rgba(100,220,140,0)");
        ctx.beginPath();
        ctx.arc(mx, my, 60, 0, Math.PI * 2);
        ctx.fillStyle = halo;
        ctx.fill();
      }

      t += 1;
      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animId);
      canvas.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-auto"
      style={{ zIndex: 2 }}
    />
  );
}

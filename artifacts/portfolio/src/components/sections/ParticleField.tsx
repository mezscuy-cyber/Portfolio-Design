import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  color: string;
  life: number;
  maxLife: number;
}

export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = canvas.offsetWidth;
    const H = canvas.offsetHeight;
    canvas.width = W;
    canvas.height = H;

    const COLORS = [
      "204,255,0",    // neon lime
      "0,102,255",    // cobalt blue
      "180,255,200",  // mint
      "255,255,255",  // white
      "140,255,100",  // light green
    ];

    const particles: Particle[] = [];
    let animId: number;

    const spawnParticle = (mx?: number, my?: number) => {
      const cx = W / 2;
      const cy = H / 2;
      const angle = Math.random() * Math.PI * 2;
      const dist = Math.random() * Math.min(W, H) * 0.45;
      const x = mx !== undefined ? mx : cx + Math.cos(angle) * dist;
      const y = my !== undefined ? my : cy + Math.sin(angle) * dist;
      const speed = 0.2 + Math.random() * 0.8;
      const dir = Math.random() * Math.PI * 2;
      const maxLife = 80 + Math.random() * 120;
      particles.push({
        x,
        y,
        vx: Math.cos(dir) * speed,
        vy: Math.sin(dir) * speed - 0.4,
        radius: 1.5 + Math.random() * 3,
        alpha: 0,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        life: 0,
        maxLife,
      });
    };

    // Spawn initial particles
    for (let i = 0; i < 120; i++) spawnParticle();

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
      // Spawn burst on move
      if (Math.random() < 0.4) spawnParticle(mouseRef.current.x, mouseRef.current.y);
    };

    canvas.addEventListener("mousemove", handleMouseMove);

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      // Spawn ambient particles continuously
      if (particles.length < 200 && Math.random() < 0.3) spawnParticle();

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      particles.forEach((p, i) => {
        p.life++;
        const progress = p.life / p.maxLife;
        p.alpha = progress < 0.2
          ? progress / 0.2
          : progress > 0.8
          ? (1 - progress) / 0.2
          : 1;

        // Mouse attraction within 120px
        const dx = mx - p.x;
        const dy = my - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120 && dist > 0) {
          p.vx += (dx / dist) * 0.08;
          p.vy += (dy / dist) * 0.08;
        }

        // Drag
        p.vx *= 0.97;
        p.vy *= 0.97;

        p.x += p.vx;
        p.y += p.vy;

        if (p.life >= p.maxLife) {
          particles.splice(i, 1);
          spawnParticle();
          return;
        }

        // Draw glow
        const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 4);
        glow.addColorStop(0, `rgba(${p.color},${p.alpha * 0.9})`);
        glow.addColorStop(0.5, `rgba(${p.color},${p.alpha * 0.3})`);
        glow.addColorStop(1, `rgba(${p.color},0)`);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 4, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color},${p.alpha})`;
        ctx.fill();
      });

      // Connection lines between close particles
      for (let i = 0; i < Math.min(particles.length, 80); i++) {
        for (let j = i + 1; j < Math.min(particles.length, 80); j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 60) {
            const opacity = (1 - d / 60) * 0.15;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(204,255,0,${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

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

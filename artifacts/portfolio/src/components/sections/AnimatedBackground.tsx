import { useEffect, useRef } from "react";

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Orbs: position, velocity, radius, color
    const orbs = [
      { x: 0.15, y: 0.25, vx: 0.00018, vy: 0.00012, r: 0.38, color: "72,100%,50%" },   // neon lime
      { x: 0.75, y: 0.6,  vx: -0.00014, vy: 0.00016, r: 0.42, color: "215,100%,45%" },  // cobalt blue
      { x: 0.5,  y: 0.85, vx: 0.00012, vy: -0.0001,  r: 0.28, color: "260,90%,55%" },   // violet
      { x: 0.88, y: 0.15, vx: -0.0001, vy: 0.00013,  r: 0.32, color: "180,100%,40%" },  // cyan
      { x: 0.35, y: 0.7,  vx: 0.00016, vy: -0.00014, r: 0.24, color: "72,100%,50%" },   // neon lime small
    ];

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;

      ctx.clearRect(0, 0, w, h);

      // Deep dark base
      ctx.fillStyle = "hsl(0,0%,4%)";
      ctx.fillRect(0, 0, w, h);

      // Animated orbs
      orbs.forEach((orb) => {
        orb.x += orb.vx;
        orb.y += orb.vy;
        if (orb.x < -0.1 || orb.x > 1.1) orb.vx *= -1;
        if (orb.y < -0.1 || orb.y > 1.1) orb.vy *= -1;

        const cx = orb.x * w;
        const cy = orb.y * h;
        const r = orb.r * Math.min(w, h);

        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
        grad.addColorStop(0, `hsla(${orb.color},0.18)`);
        grad.addColorStop(0.5, `hsla(${orb.color},0.07)`);
        grad.addColorStop(1, `hsla(${orb.color},0)`);

        ctx.beginPath();
        ctx.ellipse(cx, cy, r, r * 0.7, t * 0.3, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      });

      // Scanline overlay (subtle holographic)
      for (let y = 0; y < h; y += 4) {
        ctx.fillStyle = "rgba(0,0,0,0.025)";
        ctx.fillRect(0, y, w, 1);
      }

      // Grid lines (very faint)
      ctx.strokeStyle = "rgba(204,255,0,0.03)";
      ctx.lineWidth = 1;
      const gridSize = 80;
      for (let x = 0; x < w; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      t += 0.005;
      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}

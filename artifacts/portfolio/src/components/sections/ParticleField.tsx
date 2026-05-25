import { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  alpha: number;
  pulse: number;
  pulseSpeed: number;
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

    const COLS = 9;
    const ROWS = 12;
    const gapX = W / (COLS + 1);
    const gapY = H / (ROWS + 1);

    const nodes: Node[] = [];
    for (let r = 1; r <= ROWS; r++) {
      for (let c = 1; c <= COLS; c++) {
        const bx = gapX * c;
        const by = gapY * r;
        nodes.push({
          x: bx,
          y: by,
          baseX: bx,
          baseY: by,
          alpha: 0.15 + Math.random() * 0.35,
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: 0.012 + Math.random() * 0.02,
        });
      }
    }

    let animId: number;
    let t = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const handleMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      // Update nodes — subtle float + mouse repulsion
      nodes.forEach((n) => {
        n.pulse += n.pulseSpeed;
        const floatX = Math.sin(t * 0.004 + n.pulse) * 3;
        const floatY = Math.cos(t * 0.003 + n.pulse * 0.7) * 3;

        const dx = n.baseX + floatX - mx;
        const dy = n.baseY + floatY - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const repulse = dist < 80 ? (1 - dist / 80) * 18 : 0;

        n.x = n.baseX + floatX + (dist > 0 ? (dx / dist) * repulse : 0);
        n.y = n.baseY + floatY + (dist > 0 ? (dy / dist) * repulse : 0);
      });

      // Draw horizontal & vertical grid lines between neighboring nodes
      ctx.lineWidth = 0.5;
      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          const idx = r * COLS + c;
          const n = nodes[idx];
          const pulse = (Math.sin(n.pulse) + 1) * 0.5;

          // Horizontal line to right neighbor
          if (c < COLS - 1) {
            const right = nodes[idx + 1];
            const dist = Math.hypot(n.x - mx, n.y - my);
            const glow = dist < 120 ? (1 - dist / 120) * 0.4 : 0;
            const lineAlpha = 0.06 + pulse * 0.06 + glow;
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(right.x, right.y);
            ctx.strokeStyle = `rgba(60,200,100,${lineAlpha})`;
            ctx.stroke();
          }
          // Vertical line to bottom neighbor
          if (r < ROWS - 1) {
            const below = nodes[idx + COLS];
            const dist = Math.hypot(n.x - mx, n.y - my);
            const glow = dist < 120 ? (1 - dist / 120) * 0.4 : 0;
            const lineAlpha = 0.06 + pulse * 0.06 + glow;
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(below.x, below.y);
            ctx.strokeStyle = `rgba(60,200,100,${lineAlpha})`;
            ctx.stroke();
          }
        }
      }

      // Draw corner squares at each node
      nodes.forEach((n) => {
        const dx = n.x - mx;
        const dy = n.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const proximity = dist < 100 ? (1 - dist / 100) : 0;
        const pulse = (Math.sin(n.pulse) + 1) * 0.5;
        const alpha = n.alpha * (0.5 + pulse * 0.5) + proximity * 0.6;
        const size = 2 + proximity * 3;

        // Outer square
        ctx.strokeStyle = `rgba(80,210,120,${alpha})`;
        ctx.lineWidth = 0.8;
        ctx.strokeRect(n.x - size, n.y - size, size * 2, size * 2);

        // Inner dot on bright nodes
        if (proximity > 0.3 || pulse > 0.7) {
          ctx.fillStyle = `rgba(140,255,160,${alpha * 0.8})`;
          ctx.fillRect(n.x - 1, n.y - 1, 2, 2);
        }
      });

      // Mouse cursor glow ring
      if (mx > 0 && mx < W) {
        const halo = ctx.createRadialGradient(mx, my, 0, mx, my, 70);
        halo.addColorStop(0, "rgba(60,200,100,0.08)");
        halo.addColorStop(0.5, "rgba(60,200,100,0.03)");
        halo.addColorStop(1, "rgba(60,200,100,0)");
        ctx.beginPath();
        ctx.arc(mx, my, 70, 0, Math.PI * 2);
        ctx.fillStyle = halo;
        ctx.fill();
      }

      t++;
      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animId);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
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

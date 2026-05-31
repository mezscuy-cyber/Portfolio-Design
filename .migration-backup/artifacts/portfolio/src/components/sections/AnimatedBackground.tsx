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

    // Aurora wave bands — deep dark greens
    const bands = [
      { speed: 0.0004, amplitude: 0.08, freq: 1.2, y: 0.3,  color: [10, 40, 20],  alpha: 0.55 },
      { speed: 0.0003, amplitude: 0.06, freq: 0.9, y: 0.55, color: [5, 60, 25],   alpha: 0.4  },
      { speed: 0.0005, amplitude: 0.07, freq: 1.5, y: 0.75, color: [15, 30, 15],  alpha: 0.35 },
      { speed: 0.0002, amplitude: 0.05, freq: 0.7, y: 0.15, color: [8, 55, 22],   alpha: 0.3  },
    ];

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;

      // Very dark base — near black with slight green tint
      ctx.fillStyle = "#040a06";
      ctx.fillRect(0, 0, w, h);

      // Aurora bands — sweeping gradient waves
      bands.forEach((band) => {
        const cy = band.y * h + Math.sin(t * band.speed * 1000 + band.freq) * band.amplitude * h;
        const bandH = h * 0.35;

        const grad = ctx.createLinearGradient(0, cy - bandH, 0, cy + bandH);
        const [r, g, b] = band.color;
        grad.addColorStop(0, `rgba(${r},${g},${b},0)`);
        grad.addColorStop(0.4, `rgba(${r},${g},${b},${band.alpha})`);
        grad.addColorStop(0.6, `rgba(${r},${g},${b},${band.alpha * 0.7})`);
        grad.addColorStop(1, `rgba(${r},${g},${b},0)`);

        // Wavy horizontal distortion
        ctx.beginPath();
        ctx.moveTo(0, cy - bandH);
        for (let x = 0; x <= w; x += 8) {
          const waveY = cy + Math.sin(x * 0.008 + t * band.speed * 800 + band.freq) * 30;
          ctx.lineTo(x, waveY - bandH * 0.5);
        }
        for (let x = w; x >= 0; x -= 8) {
          const waveY = cy + Math.sin(x * 0.008 + t * band.speed * 800 + band.freq + Math.PI) * 30;
          ctx.lineTo(x, waveY + bandH * 0.5);
        }
        ctx.closePath();
        ctx.fillStyle = grad;
        ctx.fill();
      });

      // Deep green radial glow — bottom left ambient
      const glowBL = ctx.createRadialGradient(w * 0.1, h * 0.9, 0, w * 0.1, h * 0.9, w * 0.5);
      glowBL.addColorStop(0, "rgba(0,60,20,0.25)");
      glowBL.addColorStop(1, "rgba(0,60,20,0)");
      ctx.fillStyle = glowBL;
      ctx.fillRect(0, 0, w, h);

      // Subtle emerald glow — top right
      const glowTR = ctx.createRadialGradient(w * 0.85, h * 0.15, 0, w * 0.85, h * 0.15, w * 0.4);
      glowTR.addColorStop(0, "rgba(10,80,30,0.18)");
      glowTR.addColorStop(1, "rgba(10,80,30,0)");
      ctx.fillStyle = glowTR;
      ctx.fillRect(0, 0, w, h);

      // Faint horizontal scan texture
      for (let y = 0; y < h; y += 3) {
        ctx.fillStyle = "rgba(0,0,0,0.018)";
        ctx.fillRect(0, y, w, 1);
      }

      t += 1;
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

"use client";

import React, { useEffect, useRef } from "react";

interface Body {
  x: number;
  y: number;
  vx: number;
  vy: number;
  mass: number;
  radius: number;
  color: string;
  trail: { x: number; y: number }[];
}

export default function ManyBodyCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener("resize", handleResize);

    // Initial 3-body system in a stable chaotic figure-8 / Lagrange orbit
    const bodies: Body[] = [
      {
        x: width / 2 - 120,
        y: height / 2 - 40,
        vx: 0.8,
        vy: -0.6,
        mass: 300,
        radius: 5,
        color: "#60a5fa", // Blue
        trail: [],
      },
      {
        x: width / 2 + 120,
        y: height / 2 + 40,
        vx: -0.8,
        vy: 0.6,
        mass: 300,
        radius: 5,
        color: "#a78bfa", // Purple
        trail: [],
      },
      {
        x: width / 2,
        y: height / 2,
        vx: 0.3,
        vy: 0.9,
        mass: 250,
        radius: 4,
        color: "#34d399", // Emerald
        trail: [],
      },
    ];

    // Mouse interaction gravity well
    let mouse = { x: -1000, y: -1000, active: false };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    const G = 0.4;
    const dt = 0.8;
    const maxTrailLength = 45;

    const render = () => {
      // Semi-transparent fade for motion blur
      ctx.fillStyle = "rgba(10, 10, 15, 0.22)";
      ctx.fillRect(0, 0, width, height);

      // Compute gravitational pairwise forces
      for (let i = 0; i < bodies.length; i++) {
        let fx = 0;
        let fy = 0;

        for (let j = 0; j < bodies.length; j++) {
          if (i === j) continue;
          const dx = bodies[j].x - bodies[i].x;
          const dy = bodies[j].y - bodies[i].y;
          const distSq = dx * dx + dy * dy + 400; // Softening parameter
          const dist = Math.sqrt(distSq);
          const force = (G * bodies[i].mass * bodies[j].mass) / distSq;

          fx += (force * dx) / dist;
          fy += (force * dy) / dist;
        }

        // Pull toward mouse if active
        if (mouse.active) {
          const mdx = mouse.x - bodies[i].x;
          const mdy = mouse.y - bodies[i].y;
          const mdistSq = mdx * mdx + mdy * mdy + 600;
          const mforce = (G * bodies[i].mass * 400) / mdistSq;
          fx += (mforce * mdx) / Math.sqrt(mdistSq);
          fy += (mforce * mdy) / Math.sqrt(mdistSq);
        }

        // Gentle central restoring potential to keep in frame
        const cx = width / 2 - bodies[i].x;
        const cy = height / 2 - bodies[i].y;
        fx += cx * 0.0003 * bodies[i].mass;
        fy += cy * 0.0003 * bodies[i].mass;

        bodies[i].vx += (fx / bodies[i].mass) * dt;
        bodies[i].vy += (fy / bodies[i].mass) * dt;

        // Velocity damping for stability
        bodies[i].vx *= 0.999;
        bodies[i].vy *= 0.999;

        bodies[i].x += bodies[i].vx * dt;
        bodies[i].y += bodies[i].vy * dt;

        bodies[i].trail.push({ x: bodies[i].x, y: bodies[i].y });
        if (bodies[i].trail.length > maxTrailLength) {
          bodies[i].trail.shift();
        }
      }

      // Draw trails
      for (const b of bodies) {
        if (b.trail.length < 2) continue;
        ctx.beginPath();
        ctx.moveTo(b.trail[0].x, b.trail[0].y);
        for (let k = 1; k < b.trail.length; k++) {
          ctx.lineTo(b.trail[k].x, b.trail[k].y);
        }
        ctx.strokeStyle = b.color + "33";
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      // Draw bodies & connecting force lines
      for (let i = 0; i < bodies.length; i++) {
        for (let j = i + 1; j < bodies.length; j++) {
          ctx.beginPath();
          ctx.moveTo(bodies[i].x, bodies[i].y);
          ctx.lineTo(bodies[j].x, bodies[j].y);
          ctx.strokeStyle = "rgba(148, 163, 184, 0.07)";
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        // Body glow
        const glow = ctx.createRadialGradient(
          bodies[i].x,
          bodies[i].y,
          1,
          bodies[i].x,
          bodies[i].y,
          bodies[i].radius * 4
        );
        glow.addColorStop(0, bodies[i].color);
        glow.addColorStop(1, "transparent");
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(bodies[i].x, bodies[i].y, bodies[i].radius * 4, 0, Math.PI * 2);
        ctx.fill();

        // Core
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(bodies[i].x, bodies[i].y, bodies[i].radius, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-auto">
      <canvas
        ref={canvasRef}
        className="w-full h-full block opacity-70 cursor-crosshair"
      />
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";

export default function CursorGuide() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Raw mouse coordinates
  const mouseRef = useRef({ x: -100, y: -100, isMoved: false });
  // Interpolated smoothed coordinates (Lerp)
  const posRef = useRef({ x: -100, y: -100 });

  const idleTimerRef = useRef<NodeJS.Timeout | null>(null);
  const opacityRef = useRef(0); // Smooth fade in/out target
  const targetOpacityRef = useRef(0);

  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Detect touch device
    if (typeof window !== "undefined") {
      const touch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
      setIsTouchDevice(touch);
      if (touch) return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animFrameId: number;

    const handleResize = () => {
      if (!canvas) return;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    const resetIdleTimer = () => {
      targetOpacityRef.current = 1;
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      idleTimerRef.current = setTimeout(() => {
        targetOpacityRef.current = 0;
      }, 2500);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const target = e.target instanceof Element ? e.target : null;
      const isOverSuppressedArea = Boolean(target?.closest("#skills .skill-tilt-card, .glass-dock"));

      if (isOverSuppressedArea) {
        targetOpacityRef.current = 0;
        opacityRef.current = 0;
        return;
      }

      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      if (!mouseRef.current.isMoved) {
        mouseRef.current.isMoved = true;
        posRef.current.x = e.clientX;
        posRef.current.y = e.clientY;
      }
      resetIdleTimer();
    };

    const handleMouseLeave = () => {
      targetOpacityRef.current = 0;
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    // Animation Loop
    const render = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      ctx.clearRect(0, 0, width, height);

      // Interpolate opacity for smooth fade in/out
      opacityRef.current += (targetOpacityRef.current - opacityRef.current) * 0.1;

      if (opacityRef.current > 0.01 && mouseRef.current.isMoved) {
        // Lerp position for liquid-smooth motion
        const lerpFactor = 0.2;
        posRef.current.x += (mouseRef.current.x - posRef.current.x) * lerpFactor;
        posRef.current.y += (mouseRef.current.y - posRef.current.y) * lerpFactor;

        const curX = posRef.current.x;
        const curY = posRef.current.y;
        const globalAlpha = opacityRef.current;

        // 1. Draw Horizontal Dotted Line with Radial Gradient Mask
        ctx.save();
        ctx.lineWidth = 1;

        // Create a horizontal gradient focused at the cursor position
        const gradRadius = Math.max(350, width * 0.45);
        const horizGrad = ctx.createLinearGradient(
          Math.max(0, curX - gradRadius),
          curY,
          Math.min(width, curX + gradRadius),
          curY
        );

        horizGrad.addColorStop(0, "rgba(255, 255, 255, 0)");
        horizGrad.addColorStop(0.3, `rgba(161, 161, 170, ${0.15 * globalAlpha})`);
        horizGrad.addColorStop(0.5, `rgba(255, 255, 255, ${0.45 * globalAlpha})`);
        horizGrad.addColorStop(0.7, `rgba(161, 161, 170, ${0.15 * globalAlpha})`);
        horizGrad.addColorStop(1, "rgba(255, 255, 255, 0)");

        ctx.strokeStyle = horizGrad;
        ctx.setLineDash([4, 6]);

        ctx.beginPath();
        ctx.moveTo(0, curY);
        ctx.lineTo(width, curY);
        ctx.stroke();

        // 2. Draw Subtle Vertical Alignment Line
        const vertGrad = ctx.createLinearGradient(
          curX,
          Math.max(0, curY - 150),
          curX,
          Math.min(height, curY + 150)
        );
        vertGrad.addColorStop(0, "rgba(255, 255, 255, 0)");
        vertGrad.addColorStop(0.5, `rgba(255, 255, 255, ${0.2 * globalAlpha})`);
        vertGrad.addColorStop(1, "rgba(255, 255, 255, 0)");

        ctx.strokeStyle = vertGrad;
        ctx.setLineDash([3, 5]);
        ctx.beginPath();
        ctx.moveTo(curX, Math.max(0, curY - 150));
        ctx.lineTo(curX, Math.min(height, curY + 150));
        ctx.stroke();

        ctx.restore();

        // 3. Crisp Center Reticle Dot
        ctx.save();
        ctx.fillStyle = `rgba(255, 255, 255, ${0.9 * globalAlpha})`;
        ctx.beginPath();
        ctx.arc(curX, curY, 2.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = `rgba(255, 255, 255, ${0.35 * globalAlpha})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(curX, curY, 6, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      animFrameId = requestAnimationFrame(render);
    };

    animFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, []);

  if (isTouchDevice) return null;

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[9999] h-full w-full"
    />
  );
}

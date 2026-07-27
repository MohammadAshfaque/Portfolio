"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { GitHubCalendar } from "react-github-calendar";

export default function ShippingGraph() {
  const [viewport, setViewport] = useState<"mobile" | "tablet" | "desktop">("desktop");
  const [canTilt, setCanTilt] = useState(false);

  useEffect(() => {
    const updateViewport = () => {
      const width = window.innerWidth;
      setViewport(width < 520 ? "mobile" : width < 900 ? "tablet" : "desktop");
      setCanTilt(window.matchMedia("(hover: hover) and (pointer: fine)").matches && width >= 640);
    };

    updateViewport();
    window.addEventListener("resize", updateViewport);
    return () => window.removeEventListener("resize", updateViewport);
  }, []);

  const isMobile = viewport === "mobile";
  const isTablet = viewport === "tablet";

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);
  const glareOpacity = useTransform(y, [-0.5, 0.5], [0, 0.22]);
  const glareY = useTransform(y, [-0.5, 0.5], ["-20%", "100%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!canTilt) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / rect.width - 0.5);
    y.set(mouseY / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const explicitTheme = {
    dark: ["#18181b", "#3f3f46", "#71717a", "#d4d4d8", "#ffffff"],
  };

  const calendarSizing = {
    blockSize: isMobile ? 8 : isTablet ? 9 : 11,
    blockMargin: isMobile ? 3 : 4,
    fontSize: isMobile ? 10 : isTablet ? 11 : 12,
  };

  return (
    <section id="shipping" className="mb-14" style={{ perspective: 1200 }}>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-[#f0f0f0] font-sans">
          Shipping Momentum
        </h2>
        <span className="text-[10.5px] sm:text-xs text-zinc-500 font-mono">Continuous Execution</span>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={canTilt ? { rotateX, rotateY, transformStyle: "preserve-3d" } : { transformStyle: "preserve-3d" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileHover={canTilt ? { scale: 1.02, y: -4 } : undefined}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="group relative flex flex-col items-center justify-center overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 p-4 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.8)] sm:p-6 sm:cursor-crosshair"
      >
        <motion.div
          className="pointer-events-none absolute inset-0 z-10 h-[150%] w-full -translate-y-1/2 bg-gradient-to-b from-white/20 via-transparent to-transparent"
          style={{ opacity: canTilt ? glareOpacity : 0, top: glareY }}
        />

        <div className="pointer-events-none absolute inset-0 z-20 rounded-2xl shadow-[inset_0px_0px_15px_0px_rgba(0,0,0,0.7)]" />

        <div
          style={{ transform: canTilt ? "translateZ(30px)" : "none" }}
          className="relative z-30 flex min-h-[118px] w-full max-w-full items-center justify-start overflow-x-auto overflow-y-hidden pb-3 sm:min-h-[140px] sm:justify-center sm:pb-4"
        >
          <GitHubCalendar
            username="MohammadAshfaque"
            colorScheme="dark"
            year={new Date().getFullYear()}
            theme={explicitTheme as any}
            blockSize={calendarSizing.blockSize}
            blockMargin={calendarSizing.blockMargin}
            fontSize={calendarSizing.fontSize}
          />
        </div>
      </motion.div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 px-1 text-[10px] font-mono text-zinc-500 sm:px-2 sm:text-[11px]">
        <span>Less shipping</span>
        <div className="flex items-center gap-1">
          <div className="size-2 rounded-sm bg-[#18181b] sm:size-2.5" />
          <div className="size-2 rounded-sm bg-[#3f3f46] sm:size-2.5" />
          <div className="size-2 rounded-sm bg-[#71717a] sm:size-2.5" />
          <div className="size-2 rounded-sm bg-[#d4d4d8] sm:size-2.5" />
          <div className="size-2 rounded-sm bg-[#ffffff] sm:size-2.5" />
        </div>
        <span>More shipping</span>
      </div>
    </section>
  );
}

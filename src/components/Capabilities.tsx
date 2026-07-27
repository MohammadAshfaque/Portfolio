"use client";

import { type CSSProperties, type ReactNode, useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutGrid, Monitor, RotateCcw, Smartphone } from "lucide-react";

interface SkillItem {
  name: string;
  rot?: number;
  x?: number;
  y?: number;
}
type PassportThemeName = "design" | "web" | "native" | "ai";
type SkillIllustrationName = "design" | "web" | "native" | "ai";

const PASSPORT_THEMES: Record<
  PassportThemeName,
  {
    accent: string;
    chipClass: string;
    activeClass: string;
    svg: "lotus" | "globe" | "sun" | "falcon";
  }
> = {
  design: {
    accent: "text-amber-300",
    chipClass: "border-amber-500/35 bg-amber-950/15 text-amber-100/90 hover:border-amber-300/70 hover:text-white",
    activeClass: "border-amber-300/80 bg-amber-900/25 text-white ring-1 ring-amber-300/35",
    svg: "lotus",
  },
  web: {
    accent: "text-teal-300",
    chipClass: "border-teal-500/35 bg-teal-950/15 text-teal-100/90 hover:border-teal-300/70 hover:text-white",
    activeClass: "border-teal-300/80 bg-teal-900/25 text-white ring-1 ring-teal-300/35",
    svg: "globe",
  },
  native: {
    accent: "text-rose-300",
    chipClass: "border-rose-500/35 bg-rose-950/15 text-rose-100/90 hover:border-rose-300/70 hover:text-white",
    activeClass: "border-rose-300/80 bg-rose-900/25 text-white ring-1 ring-rose-300/35",
    svg: "sun",
  },
  ai: {
    accent: "text-indigo-300",
    chipClass: "border-indigo-500/35 bg-indigo-950/15 text-indigo-100/90 hover:border-indigo-300/70 hover:text-white",
    activeClass: "border-indigo-300/80 bg-indigo-900/25 text-white ring-1 ring-indigo-300/35",
    svg: "falcon",
  },
};

function PassportIcon({ variant, className = "" }: { variant: PassportThemeName; className?: string }) {
  const icon = PASSPORT_THEMES[variant].svg;

  return (
    <svg
      aria-hidden="true"
      className={`size-3.5 shrink-0 ${PASSPORT_THEMES[variant].accent} ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {icon === "lotus" && (
        <>
          <polygon points="12 3, 20 8, 20 16, 12 21, 4 16, 4 8" strokeDasharray="2 1" />
          <circle cx="12" cy="12" r="4" />
        </>
      )}
      {icon === "globe" && (
        <>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 3v18M3 12h18M5.5 5.5l13 13M18.5 5.5l-13 13" strokeDasharray="1.5 1.5" />
        </>
      )}
      {icon === "sun" && (
        <>
          <circle cx="12" cy="12" r="9" strokeDasharray="2 2" />
          <ellipse cx="12" cy="12" rx="7" ry="3" />
          <ellipse cx="12" cy="12" rx="3" ry="7" />
          <circle cx="12" cy="12" r="1.5" fill="currentColor" />
        </>
      )}
      {icon === "falcon" && (
        <>
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 12l10 5 10-5M2 17l10 5 10-5" />
        </>
      )}
    </svg>
  );
}

function passportRotation(index: number) {
  const rotations = ["-rotate-2", "rotate-1", "-rotate-1", "rotate-2", "rotate-0"];
  return rotations[index % rotations.length];
}


function TiltStackCard({
  children,
  className = "",
  delay = 0,
  illustration,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  illustration?: SkillIllustrationName;
}) {
  return (
    <div className="relative [perspective:1000px]">
      <motion.div
        initial={{ opacity: 0, y: 12, rotateX: 0, rotateY: 0 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.38, delay, type: "spring", stiffness: 180, damping: 22 }}
        style={{ transformStyle: "preserve-3d" }}
        className={`skill-tilt-card ${className}`}
      >
        {illustration && <NeonSkillIllustration variant={illustration} />}
        <div className="relative z-10 flex h-full flex-col" style={{ transform: "translateZ(26px)" }}>
          {children}
        </div>
      </motion.div>
    </div>
  );
}

function NeonSkillIllustration({ variant }: { variant: SkillIllustrationName }) {
  const markMap: Record<
    SkillIllustrationName,
    { color: string; label: string; rotate: string; symbol: "compass" | "server" | "device" | "network" }
  > = {
    design: { color: "#d8c957", label: "DESIGN", rotate: "-rotate-6", symbol: "compass" },
    web: { color: "#6dbf7a", label: "STACK", rotate: "rotate-4", symbol: "server" },
    native: { color: "#df6a9c", label: "NATIVE", rotate: "-rotate-3", symbol: "device" },
    ai: { color: "#45acd8", label: "MODEL", rotate: "rotate-6", symbol: "network" },
  };
  const mark = markMap[variant];

  return (
    <motion.div
      aria-hidden="true"
      whileHover={{ scale: 1.04, y: -2 }}
      transition={{ type: "spring", stiffness: 460, damping: 28 }}
      className={`skill-corner-mark absolute bottom-2.5 right-2.5 z-[11] size-[50px] origin-bottom-right cursor-pointer sm:bottom-3 sm:right-3 sm:size-[64px] ${mark.rotate}`}
      style={{ "--mark-color": mark.color, transform: "translateZ(34px)" } as CSSProperties}
    >
      <svg viewBox="0 0 100 100" fill="none" className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="43" stroke="currentColor" strokeWidth="2.2" strokeDasharray="5 4" />
        <circle cx="50" cy="50" r="35" stroke="currentColor" strokeWidth="1.5" opacity="0.58" />
        <path d="M19 50h11M70 50h11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" opacity="0.58" />
        <text x="50" y="84" fill="currentColor" fontFamily="monospace" fontSize="8" fontWeight="900" textAnchor="middle" letterSpacing="0.8">
          {mark.label}
        </text>

        {mark.symbol === "compass" && (
          <g stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M50 31l10 33M50 31L40 64M39 60h22" />
            <circle cx="50" cy="45" r="7" />
            <path d="M33 64h34M38 69h24" opacity="0.74" />
          </g>
        )}
        {mark.symbol === "server" && (
          <g stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="32" y="34" width="36" height="11" rx="3" />
            <rect x="32" y="48" width="36" height="11" rx="3" />
            <circle cx="39" cy="39.5" r="1.8" fill="currentColor" stroke="none" />
            <circle cx="39" cy="53.5" r="1.8" fill="currentColor" stroke="none" />
            <path d="M51 39.5h10M51 53.5h10M50 59v10M41 69h18" />
          </g>
        )}
        {mark.symbol === "device" && (
          <g stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="31" y="43" width="18" height="28" rx="4" />
            <path d="M36 49h8M38 66h4" />
            <path d="M51 34h25a4 4 0 0 1 4 4v23a4 4 0 0 1-4 4H52" />
            <path d="M52 56h28M62 65l-3 8M71 65l3 8M56 73h22" />
          </g>
        )}
        {mark.symbol === "network" && (
          <g stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M35 42l17 10M35 42l-7 17M52 52l18-10M52 52l18 17M28 59l14 16M42 75l28-6M70 42v27" />
            <circle cx="35" cy="42" r="5" />
            <circle cx="52" cy="52" r="5" />
            <circle cx="28" cy="59" r="5" />
            <circle cx="42" cy="75" r="5" />
            <circle cx="70" cy="42" r="5" />
            <circle cx="70" cy="69" r="5" />
          </g>
        )}
      </svg>
    </motion.div>
  );
}
function PassportSkillChip({
  children,
  variant,
  index,
  active,
  className = "",
}: {
  children: ReactNode;
  variant: PassportThemeName;
  index: number;
  active?: boolean;
  className?: string;
}) {
  const theme = PASSPORT_THEMES[variant];

  return (
    <span
      className={`skill-chip inline-flex items-center gap-1.5 border-dashed px-2 py-1 font-mono uppercase tracking-[0.08em] ${passportRotation(
        index
      )} ${active ? theme.activeClass : theme.chipClass} ${className}`}
    >
      <PassportIcon variant={variant} />
      <span className="min-w-0 break-words normal-case tracking-normal">{children}</span>
    </span>
  );
}

// 4x4 Bayer Dither Matrix Thresholds (Razgraf-style ordered dither)
const BAYER_4X4 = [
  [0 / 16, 8 / 16, 2 / 16, 10 / 16],
  [12 / 16, 4 / 16, 14 / 16, 6 / 16],
  [3 / 16, 11 / 16, 1 / 16, 9 / 16],
  [15 / 16, 7 / 16, 13 / 16, 5 / 16],
];

// Inter-connected stack relationships for clean full-stack micro-interactions
const FULLSTACK_CONNECTIONS: Record<string, string[]> = {
  "React": ["Next.js", "Zustand", "TypeScript"],
  "Next.js": ["React", "Node.js", "TypeScript"],
  "TypeScript": ["React", "Next.js", "Node.js", "TanStack Query", "Zustand", "Axios"],
  "TanStack Query": ["Axios", "Zustand", "React"],
  "Zustand": ["React", "TanStack Query"],
  "Axios": ["TanStack Query", "REST APIs"],
  "Node.js": ["REST APIs", "PostgreSQL", "Next.js"],
  "PostgreSQL": ["Node.js"],
  "REST APIs": ["Axios", "Node.js"],
};

const fullstackSkills: SkillItem[] = [
  { name: "React" },
  { name: "Next.js" },
  { name: "TypeScript" },
  { name: "Node.js" },
  { name: "PostgreSQL" },
  { name: "REST APIs" },
  { name: "TanStack Query" },
  { name: "Zustand" },
  { name: "Axios" },
];

const designEngineeringSkills: SkillItem[] = [
  { name: "Framer Motion", rot: 8, x: -6, y: 16 },
  { name: "shadcn/ui", rot: -10, x: 8, y: 22 },
  { name: "GSAP", rot: 12, x: -4, y: 26 },
  { name: "Tailwind CSS", rot: -8, x: 12, y: 14 },
  { name: "Design Systems", rot: 6, x: -10, y: 20 },
  { name: "Figma to Code", rot: -12, x: 6, y: 24 },
  { name: "Micro-interactions", rot: 10, x: -12, y: 18 },
  { name: "CSS Animations", rot: -6, x: 8, y: 28 },
];

const mobileDesktopSkills: SkillItem[] = [
  { name: "React Native" },
  { name: "Expo" },
  { name: "Tauri" },
  { name: "Rust" },
  { name: "SvelteKit" },
  { name: "Cross-Platform" },
];

const aiMlSkills: SkillItem[] = [
  { name: "LLM Evaluation" },
  { name: "Model Datasets" },
  { name: "Python" },
  { name: "Prompt Engineering" },
  { name: "Benchmark Testing" },
];

// High-Precision Razgraf-Grade Interactive Dither Shader & Composition Engine (Framed Viewport)
function MobileDesktopCard() {
  const [deviceMode, setDeviceMode] = useState<"mobile" | "desktop">("mobile");
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvasContainerRef = useRef<HTMLDivElement | null>(null);

  // Smooth mouse coordinates relative to canvas viewport
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({
    x: -1000,
    y: -1000,
    active: false,
  });

  // Auto-cycle mode if user is not actively hovering skills or device toggle
  useEffect(() => {
    if (hoveredSkill) return;
    const interval = setInterval(() => {
      setDeviceMode((prev) => (prev === "mobile" ? "desktop" : "mobile"));
    }, 4500);
    return () => clearInterval(interval);
  }, [hoveredSkill]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animFrame: number;
    let morphProgress = deviceMode === "mobile" ? 0 : 1;
    let time = 0;

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    const render = () => {
      time += 0.035;
      const targetProgress = deviceMode === "mobile" ? 0 : 1;
      morphProgress += (targetProgress - morphProgress) * 0.07;

      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      const step = 3; // Fine Razgraf dither grid step
      const bayerSize = 4;

      const isTransitioning = Math.abs(targetProgress - morphProgress) > 0.02;
      const curMouse = mouseRef.current;

      // Centered Mobile View Composition inside framed viewport
      const mobW = Math.min(w * 0.34, 140);
      const mobH = h * 0.82;
      const mobX = w * 0.58;
      const mobY = (h - mobH) / 2;

      // Centered Desktop View Composition inside framed viewport
      const deskW = Math.min(w * 0.72, 360);
      const deskH = h * 0.66;
      const deskX = (w - deskW) / 2;
      const deskY = h * 0.10;

      // Mobile Intensity Evaluator
      const getMobileIntensity = (px: number, py: number): number => {
        let val = 0;

        // 1. Mobile Phone Device (Right-Center)
        const rx = mobX + mobW / 2;
        const ry = mobY + mobH / 2;
        const mobDist =
          Math.hypot(
            Math.max(0, Math.abs(px - rx) - mobW / 2 + 14),
            Math.max(0, Math.abs(py - ry) - mobH / 2 + 14)
          ) - 14;

        const screenBevel = 6;
        const mobInner =
          Math.hypot(
            Math.max(0, Math.abs(px - rx) - (mobW - screenBevel * 2) / 2 + 10),
            Math.max(0, Math.abs(py - ry) - (mobH - screenBevel * 2) / 2 + 10)
          ) - 10;

        if (mobDist <= 1.5 && mobDist >= -3) val = 0.95;

        if (mobInner <= 0) {
          // Dynamic Island Notch
          const notchW = 28;
          const notchH = 8;
          if (Math.abs(px - rx) < notchW / 2 && py >= mobY + 9 && py <= mobY + 9 + notchH) {
            return 0.95;
          }

          // Home Gesture Bar
          if (Math.abs(px - rx) < 22 && py >= mobY + mobH - 11 && py <= mobY + mobH - 8) {
            return 0.9;
          }

          const relY = py - (mobY + screenBevel);
          const relX = px - (mobX + screenBevel);

          // Hero App Chart
          if (relY >= 16 && relY <= 44 && relX >= 6 && relX <= mobW - 18) {
            const graphY = 30 + Math.sin(relX * 0.14 + time * 2.2) * 6;
            if (Math.abs(relY - graphY) <= 2) val = 0.85;
            else if (relY > graphY && relY < 42) val = 0.25;
            else if (relY === 16 || relY === 44 || relX === 6 || relX === mobW - 18) val = 0.45;
          }

          // UI Grid Items
          if (relY >= 50 && relY <= 76) {
            const card1X = 6;
            const card1W = (mobW - 24) / 2;
            const card2X = card1X + card1W + 4;
            if ((relX >= card1X && relX <= card1X + card1W) || (relX >= card2X && relX <= card2X + card1W)) {
              val = 0.35;
            }
          }
        }

        // 2. Left Side Mobile App Stack Widget (React Native & Expo Emblem)
        const leftBoxX = w * 0.08;
        const leftBoxY = h * 0.16;
        const leftBoxW = w * 0.40;
        const leftBoxH = h * 0.68;

        const lDist =
          Math.hypot(
            Math.max(0, Math.abs(px - (leftBoxX + leftBoxW / 2)) - leftBoxW / 2 + 8),
            Math.max(0, Math.abs(py - (leftBoxY + leftBoxH / 2)) - leftBoxH / 2 + 8)
          ) - 8;
        if (lDist <= 1.2 && lDist >= -2) val = 0.75;

        if (lDist < 0) {
          // React Native Orbit Atom Icon
          const atomX = leftBoxX + 26;
          const atomY = leftBoxY + 24;
          const aDist = Math.hypot(px - atomX, py - atomY);
          if (aDist <= 12 && aDist >= 9) val = 0.85;
          if (aDist <= 3) val = 0.95;

          // Dither Code Lines inside left box
          const lineY = py - leftBoxY;
          if (lineY >= 44 && lineY <= 85 && (lineY % 10 === 0 || lineY % 10 === 1)) {
            if (px >= leftBoxX + 14 && px <= leftBoxX + leftBoxW - 14) {
              val = 0.45;
            }
          }
        }

        return val;
      };

      // Desktop Intensity Evaluator
      const getDesktopIntensity = (px: number, py: number): number => {
        let val = 0;

        const rx = deskX + deskW / 2;
        const ry = deskY + deskH / 2;

        const deskDist =
          Math.hypot(
            Math.max(0, Math.abs(px - rx) - deskW / 2 + 10),
            Math.max(0, Math.abs(py - ry) - deskH / 2 + 10)
          ) - 10;

        const titleH = 16;
        const deskInner =
          Math.hypot(
            Math.max(0, Math.abs(px - rx) - (deskW - 8) / 2 + 6),
            Math.max(0, Math.abs(py - ry) - (deskH - 8) / 2 + 6)
          ) - 6;

        // Desktop Stand Neck & Base
        const standX = rx - w * 0.04;
        const standY = deskY + deskH;
        const standW = w * 0.08;
        const standH = h * 0.12;
        const isStand = px >= standX && px <= standX + standW && py >= standY && py <= standY + standH;

        const baseX = rx - w * 0.16;
        const baseY = standY + standH;
        const baseW = w * 0.32;
        const baseH = h * 0.035;
        const isBase = px >= baseX && px <= baseX + baseW && py >= baseY && py <= baseY + baseH;

        if (deskDist <= 1.5 && deskDist >= -2.5) val = 0.95;
        if (isStand || isBase) val = 0.65;

        if (deskInner <= 0 && deskDist < 0) {
          // Window Title Bar Line
          if (Math.abs(py - (deskY + titleH)) <= 1) val = 0.7;

          // Window Control Dots (Close, Min, Max)
          const dotY = deskY + 8;
          if (Math.abs(py - dotY) <= 2) {
            if (
              Math.abs(px - (deskX + 14)) <= 2 ||
              Math.abs(px - (deskX + 22)) <= 2 ||
              Math.abs(px - (deskX + 30)) <= 2
            ) {
              return 0.95;
            }
          }

          // Address pill
          if (py >= deskY + 4 && py <= deskY + 12 && px >= deskX + 46 && px <= deskX + deskW - 46) {
            if (py === deskY + 4 || py === deskY + 12 || px === deskX + 46 || px === deskX + deskW - 46) {
              val = 0.35;
            }
          }

          // Sidebar Layout
          const sideW = deskW * 0.24;
          const isSidebar = px >= deskX + 4 && px <= deskX + 4 + sideW && py > deskY + titleH + 2;
          if (isSidebar) {
            const rowIdx = Math.floor((py - (deskY + titleH + 6)) / 11);
            if (rowIdx >= 0 && rowIdx < 5 && Math.abs(px - (deskX + 12)) <= sideW - 16) {
              val = 0.45;
            }
          } else {
            // Main Code Dashboard
            // Code Brackets Artwork ( </ > )
            const codeX = deskX + sideW + (deskW - sideW) / 2;
            const codeY = deskY + titleH + (deskH - titleH) / 2 - 2;

            // Left Angle Bracket <
            if (px < codeX - 6) {
              const bDist = Math.abs(Math.abs(py - codeY) - (codeX - 6 - px));
              if (bDist <= 1.5 && px > codeX - 22) val = 0.9;
            }
            // Right Angle Bracket >
            if (px > codeX + 6) {
              const bDist = Math.abs(Math.abs(py - codeY) - (px - (codeX + 6)));
              if (bDist <= 1.5 && px < codeX + 22) val = 0.9;
            }
            // Center Slash /
            if (Math.abs((px - codeX) + (py - codeY) * 0.75) <= 1.5 && Math.abs(py - codeY) < 13) {
              val = 0.95;
            }
          }
        }

        return val;
      };

      // Dither Grid Loop
      for (let y = 0; y < h; y += step) {
        for (let x = 0; x < w; x += step) {
          const mobVal = getMobileIntensity(x, y);
          const deskVal = getDesktopIntensity(x, y);

          let intensity = mobVal * (1 - morphProgress) + deskVal * morphProgress;

          // Dissolve Noise during Morphing
          if (isTransitioning) {
            const dissolveNoise = (Math.sin(x * 0.1 + y * 0.1 + time * 8) * 0.5 + 0.5) * 0.35;
            intensity = Math.min(1, Math.max(0, intensity + (Math.random() > 0.45 ? dissolveNoise : -dissolveNoise)));
          }

          // Interactive Mouse Spotlight Energy Lens Physics (PURE MONOCHROME)
          if (curMouse.active) {
            const dx = x - curMouse.x;
            const dy = y - curMouse.y;
            const distToMouse = Math.hypot(dx, dy);
            const spotlightRadius = w * 0.32;

            if (distToMouse < spotlightRadius) {
              const spotlightBoost = Math.pow(1 - distToMouse / spotlightRadius, 2.2);

              if (intensity < 0.15 && Math.random() < spotlightBoost * 0.70) {
                intensity = 0.22 + spotlightBoost * 0.45;
              } else {
                intensity = Math.min(1, intensity + spotlightBoost * 0.5);
              }
            }
          }

          // Skill Chip Hover Reactive Overrides
          if (hoveredSkill) {
            const isMobileSkill = hoveredSkill === "React Native" || hoveredSkill === "Expo";
            const isDesktopSkill = hoveredSkill === "Tauri" || hoveredSkill === "Rust";
            const isCrossSkill = hoveredSkill === "SvelteKit" || hoveredSkill === "Cross-Platform";

            if ((isMobileSkill && morphProgress < 0.5) || (isDesktopSkill && morphProgress >= 0.5) || isCrossSkill) {
              const pulse = Math.sin(time * 6 + (x + y) * 0.05) * 0.5 + 0.5;
              intensity = Math.min(1, intensity + pulse * 0.3);
            }
          }

          if (intensity > 0.03) {
            const gridX = Math.floor(x / step) % bayerSize;
            const gridY = Math.floor(y / step) % bayerSize;
            const threshold = BAYER_4X4[gridY][gridX];

            if (intensity >= threshold) {
              const alpha = Math.min(0.95, intensity * 0.9);
              ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
              ctx.fillRect(x, y, step - 0.8, step - 0.8);
            }
          } else {
            const gridX = Math.floor(x / step) % bayerSize;
            const gridY = Math.floor(y / step) % bayerSize;
            if (BAYER_4X4[gridY][gridX] < 0.08) {
              ctx.fillStyle = "rgba(255, 255, 255, 0.05)";
              ctx.fillRect(x, y, 1.2, 1.2);
            }
          }
        }
      }

      animFrame = requestAnimationFrame(render);
    };

    animFrame = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener("resize", handleResize);
    };
  }, [deviceMode, hoveredSkill]);

  // Track mouse movements inside canvas viewport container
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    mouseRef.current = {
      x: (e.clientX - rect.left) * dpr,
      y: (e.clientY - rect.top) * dpr,
      active: true,
    };
  };

  const handleMouseLeave = () => {
    mouseRef.current.active = false;
  };

  return (
    <TiltStackCard delay={0.1} illustration="native" className="p-4 sm:p-5 rounded-xl border border-zinc-800/80 bg-zinc-900/50 overflow-hidden relative group flex flex-col justify-between">
      {/* 1. Header & Mode Toggle - Crisp Foreground Section */}
      <div className="relative z-10 mb-3">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2.5">
            <h3 className="text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.14em] text-zinc-400 font-sans">
              Mobile & Native Desktop
            </h3>
          </div>

          <button
            onClick={() => setDeviceMode((prev) => (prev === "mobile" ? "desktop" : "mobile"))}
            className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-zinc-800 bg-zinc-950/90 text-[10.5px] font-mono text-zinc-300 hover:text-white hover:border-zinc-700 transition cursor-pointer shadow-md backdrop-blur-md group/btn"
            title="Toggle Mobile ⇄ Desktop Dither Morph"
          >
            <AnimatePresence mode="wait">
              {deviceMode === "mobile" ? (
                <motion.span
                  key="mob-mode"
                  initial={{ opacity: 0, y: -2 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 2 }}
                  className="flex items-center gap-1 text-zinc-200 font-medium"
                >
                  <Smartphone className="size-3 text-zinc-200" />
                  <span>Mobile View</span>
                </motion.span>
              ) : (
                <motion.span
                  key="desk-mode"
                  initial={{ opacity: 0, y: 2 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -2 }}
                  className="flex items-center gap-1 text-zinc-200 font-medium"
                >
                  <Monitor className="size-3 text-zinc-200" />
                  <span>Desktop View</span>
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>

        {/* Skill Chips Row */}
        <div className="flex flex-wrap gap-1.5 overflow-hidden">
          {mobileDesktopSkills.map((skill, sIdx) => (
            <motion.span
              key={sIdx}
              onHoverStart={() => {
                setHoveredSkill(skill.name);
                if (skill.name === "React Native" || skill.name === "Expo") {
                  setDeviceMode("mobile");
                } else if (skill.name === "Tauri" || skill.name === "Rust") {
                  setDeviceMode("desktop");
                }
              }}
              onHoverEnd={() => setHoveredSkill(null)}
              whileHover={{
                scale: 1.06,
                y: -2,
                borderColor: "rgba(255, 255, 255, 0.7)",
                boxShadow: "0 4px 14px -2px rgba(0, 0, 0, 0.8), 0 0 10px 0 rgba(255, 255, 255, 0.15)",
              }}
              whileTap={{ scale: 0.95 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 22,
              }}
              className="inline-flex select-none cursor-pointer"
            >
              <PassportSkillChip variant="native" index={sIdx} active={hoveredSkill === skill.name}>
                {skill.name}
              </PassportSkillChip>
            </motion.span>
          ))}
        </div>
      </div>

      {/* 2. Dedicated Framed Dither Canvas Viewport Box - ZERO OVERLAP with Header & Chips! */}
      <div
        ref={canvasContainerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative mt-2 h-40 w-full overflow-hidden rounded-lg border border-zinc-800/90 bg-zinc-950 sm:h-48 md:h-44 lg:h-48 cursor-crosshair group/canvas"
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none opacity-85 group-hover/canvas:opacity-100 transition-opacity duration-300"
        />
        {/* Subtle Framed Matrix Vignette & Corner Accents */}
        <div className="absolute inset-0 pointer-events-none border border-zinc-800/40 rounded-lg shadow-inner" />
      </div>
    </TiltStackCard>
  );
}

// Isolated Fullstack Card Component
function FullstackCard() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  return (
    <TiltStackCard delay={0.05} illustration="web" className="p-4 sm:p-5 rounded-xl border border-zinc-800/80 bg-zinc-900/50 overflow-hidden relative group">
      <div className="relative z-20 mb-3 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <h3 className="text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.14em] text-zinc-500 font-sans">
            Full-Stack & Web
          </h3>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5 relative z-10 overflow-hidden">
        {fullstackSkills.map((skill, sIdx) => {
          const name = skill.name;
          const isHovered = hoveredSkill === name;
          const isConnected = hoveredSkill
            ? hoveredSkill === name ||
            FULLSTACK_CONNECTIONS[hoveredSkill]?.includes(name)
            : true;

          return (
            <motion.span
              key={sIdx}
              onHoverStart={() => setHoveredSkill(name)}
              onHoverEnd={() => setHoveredSkill(null)}
              animate={{
                opacity: isConnected ? 1 : 0.4,
                scale: isHovered ? 1.06 : isConnected && hoveredSkill ? 1.02 : 1,
                y: isHovered ? -2 : 0,
                borderColor: isHovered
                  ? "rgba(224, 224, 224, 0.7)"
                  : isConnected && hoveredSkill
                    ? "rgba(113, 113, 122, 0.6)"
                    : "#27272a",
                boxShadow: isHovered
                  ? "0 4px 14px -2px rgba(0, 0, 0, 0.6), 0 0 10px 0 rgba(255, 255, 255, 0.12)"
                  : isConnected && hoveredSkill
                    ? "0 2px 8px -2px rgba(0, 0, 0, 0.4)"
                    : "none",
              }}
              whileTap={{ scale: 0.95 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 22,
              }}
              className="inline-flex select-none cursor-pointer"
            >
              <PassportSkillChip variant="web" index={sIdx} active={isHovered || (!!hoveredSkill && isConnected)}>
                {name}
              </PassportSkillChip>
            </motion.span>
          );
        })}
      </div>
    </TiltStackCard>
  );
}

// Isolated Design Engineering Card Component
function DesignEngineeringCard() {
  const [isTidy, setIsTidy] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  return (
    <TiltStackCard delay={0} illustration="design" className="p-4 sm:p-5 rounded-xl border border-zinc-700/80 bg-gradient-to-br from-zinc-900/95 via-zinc-900/70 to-zinc-950/95 min-h-[195px] flex flex-col justify-between overflow-hidden relative group">
      <div className="relative z-20 mb-3 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <h3 className="text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.14em] text-zinc-500 font-sans">
            Design Engineering
          </h3>
        </div>

        <div className="flex items-center gap-2">
          {/* Compact Tidy Grid / Fallen Stack Button */}
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsTidy(!isTidy)}
            className="flex items-center gap-1 px-2 py-0.5 rounded border border-zinc-800 bg-zinc-950/90 text-[9.5px] font-mono text-zinc-400 hover:text-white hover:border-zinc-700 cursor-pointer shadow-xs"
            title="Toggle layout mode"
          >
            <AnimatePresence mode="wait">
              {isTidy ? (
                <motion.span
                  key="reset-btn"
                  initial={{ opacity: 0, y: -2 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 2 }}
                  className="flex items-center gap-1 text-amber-400 font-medium"
                >
                  <RotateCcw className="size-2.5 text-amber-400" />
                  <span>Fallen</span>
                </motion.span>
              ) : (
                <motion.span
                  key="align-btn"
                  initial={{ opacity: 0, y: 2 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -2 }}
                  className="flex items-center gap-1 text-emerald-400 font-medium"
                >
                  <LayoutGrid className="size-2.5 text-emerald-400" />
                  <span>Tidy</span>
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      <div
        ref={containerRef}
        className="flex flex-wrap gap-1.5 relative z-10 overflow-hidden py-2 min-h-[120px] items-start"
      >
        {designEngineeringSkills.map((skill, sIdx) => {
          const name = skill.name;
          const rot = skill.rot || 0;
          const xOff = skill.x || 0;
          const yOff = skill.y || 0;

          return (
            <motion.span
              key={sIdx}
              layout="position"
              initial={false}
              animate={
                isTidy
                  ? { rotate: 0, x: 0, y: 0, scale: 1 }
                  : { rotate: rot, x: xOff, y: yOff, scale: 1 }
              }
              whileHover={{ scale: 1.08, rotate: 0, zIndex: 30 }}
              whileTap={{ scale: 0.95 }}
              drag={!isTidy}
              dragConstraints={containerRef}
              dragElastic={0.1}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
              }}
              className="inline-flex select-none cursor-pointer"
            >
              <PassportSkillChip variant="design" index={sIdx} active={!isTidy}>
                {name}
              </PassportSkillChip>
            </motion.span>
          );
        })}
      </div>
    </TiltStackCard>
  );
}

// Standard Static Skill Card Component
function StandardCard({ title, skills, delay }: { title: string; skills: SkillItem[]; delay: number }) {
  return (
    <TiltStackCard delay={delay} illustration="ai" className="p-4 sm:p-5 rounded-xl border border-zinc-800/80 bg-zinc-900/50 overflow-hidden relative group">
      <div className="relative z-20 mb-3 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <h3 className="text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.14em] text-zinc-500 font-sans">
            {title}
          </h3>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5 relative z-10 overflow-hidden">
        {skills.map((skill, sIdx) => (
          <motion.span
            key={sIdx}
            whileHover={{ scale: 1.04, y: -1 }}
            transition={{ duration: 0.15 }}
            className="inline-flex cursor-default"
          >
            <PassportSkillChip variant="ai" index={sIdx}>
              {skill.name}
            </PassportSkillChip>
          </motion.span>
        ))}
      </div>
    </TiltStackCard>
  );
}

export default function Capabilities() {
  return (
    <section id="skills" className="mb-14">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-[#f0f0f0] font-sans">
          Capabilities & Stack
        </h2>
        <span className="text-[10.5px] sm:text-xs text-zinc-500 font-mono">Interactive Workshop</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <DesignEngineeringCard />
        <FullstackCard />
        <MobileDesktopCard />
        <StandardCard title="AI & Machine Learning" skills={aiMlSkills} delay={0.15} />
      </div>
    </section>
  );
}


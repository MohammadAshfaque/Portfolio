"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { MapPin, Mail, ArrowRight, Check, Copy, RefreshCw } from "lucide-react";
import RealTimeAge from "./RealTimeAge";

export default function Hero() {
  const [tooltip, setTooltip] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);
  const [statusIndex, setStatusIndex] = useState(0);
  const [showStatusToast, setShowStatusToast] = useState(false);

  const roles = [
    "Indie Developer & Design Engineer",
    "Mobile Developer (React Native & Expo)",
    "Full-Stack Product Architect",
    "Rust & Tauri Desktop Specialist",
    "AI & LLM Trainer / Evaluator",
  ];

  const statuses = [
    { label: "Available for Remote & Contract", color: "bg-emerald-500", ping: "bg-emerald-400" },
    { label: "Building Pastily Desktop App", color: "bg-amber-500", ping: "bg-amber-400" },
    { label: "Deep Focus Engineering Mode", color: "bg-cyan-500", ping: "bg-cyan-400" },
  ];

  // 3D Magnetic Motion for PFP Box
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
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

  // Copy Email Micro-interaction
  const copyEmail = () => {
    navigator.clipboard.writeText("ashfaque@pastily.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  // Cycle Roles Automatically
  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [roles.length]);

  // Keyboard shortcut listener ('c' to copy email)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "c" && !["INPUT", "TEXTAREA"].includes((e.target as HTMLElement).tagName)) {
        copyEmail();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const socialLinks = [
    {
      name: "X (Twitter)",
      href: "https://x.com/ashfaque_dev",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
        </svg>
      ),
    },
    {
      name: "GitHub",
      href: "https://github.com/MohammadAshfaque",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path>
        </svg>
      ),
    },
    {
      name: "Email",
      href: "mailto:ashfaque@pastily.com",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="20" height="16" x="2" y="4" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
        </svg>
      ),
    },
  ];

  // Live IST Time for Location Micro-Interaction
  const [istTime, setIstTime] = useState("");
  const [showLocationToast, setShowLocationToast] = useState(false);

  useEffect(() => {
    const updateIst = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      };
      setIstTime(new Intl.DateTimeFormat("en-US", options).format(now));
    };
    updateIst();
    const interval = setInterval(updateIst, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hero" className="mb-14 relative">
      {/* Toast Notification Micro-Interaction for Clipboard Copy */}
      <AnimatePresence>
        {copied && (
          <div className="fixed top-4 sm:top-6 inset-x-0 z-50 pointer-events-none flex justify-center px-4">
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 450, damping: 28 }}
              className="pointer-events-auto flex items-center gap-2 rounded-full border border-emerald-500/40 bg-zinc-900/95 px-3.5 py-2 text-[11px] sm:text-xs font-mono text-emerald-400 shadow-[0_10px_35px_-5px_rgba(16,185,129,0.3)] backdrop-blur-xl max-w-full"
            >
              <Check className="size-3.5 shrink-0 text-emerald-400" />
              <span className="hidden sm:inline truncate">Copied ashfaque@pastily.com to clipboard!</span>
              <span className="sm:hidden truncate">Copied ashfaque@pastily.com</span>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Top Title & PFP Row (PFP on the Right side) */}
        <div className="flex items-start justify-between gap-4 sm:gap-6 mb-7">
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl sm:text-3xl md:text-[2rem] font-sans font-semibold tracking-tight text-[#f0f0f0] leading-tight">
              Mohammad Ashfaque
            </h1>
            
            {/* Dynamic Micro-Interaction Role Switcher */}
            <div className="min-h-6 flex items-start gap-2 mt-1">
              <AnimatePresence mode="wait">
                <motion.button
                  key={roleIndex}
                  initial={{ y: 8, opacity: 0, filter: "blur(4px)" }}
                  animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                  exit={{ y: -8, opacity: 0, filter: "blur(4px)" }}
                  transition={{ duration: 0.25 }}
                  onClick={() => setRoleIndex((prev) => (prev + 1) % roles.length)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="min-w-0 text-left text-sm sm:text-[15px] leading-snug text-zinc-400 font-sans font-medium hover:text-white transition-colors flex items-start gap-1.5 group cursor-pointer"
                  title="Click to cycle role"
                >
                  <span className="min-w-0">{roles[roleIndex]}</span>
                  <RefreshCw className="mt-1 size-3 shrink-0 text-zinc-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.button>
              </AnimatePresence>
            </div>
          </div>

          {/* Small PFP Pic Box with 3D Tilt & Interactive Status Dot */}
          <div className="relative shrink-0" style={{ perspective: 700 }}>
            <motion.div
              style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              whileHover={{ y: -3, scale: 1.03 }}
              transition={{ type: "spring", stiffness: 280, damping: 18 }}
              className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl border border-zinc-800 bg-zinc-900/90 shadow-[0_18px_45px_-26px_rgba(0,0,0,0.95)] overflow-hidden p-1 flex items-center justify-center group hover:border-zinc-600 transition duration-300 cursor-pointer"
              onClick={() => {
                setStatusIndex((prev) => (prev + 1) % statuses.length);
                setShowStatusToast(true);
                setTimeout(() => setShowStatusToast(false), 2600);
              }}
            >
              <div className="pointer-events-none absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-br from-white/12 via-transparent to-black/25 opacity-70" />
              <motion.div
                className="relative w-full h-full rounded-lg overflow-hidden bg-zinc-950 shadow-inner"
                style={{ transform: "translateZ(24px)" }}
              >
                <Image
                  src="/avatar.png"
                  alt="Mohammad Ashfaque"
                  fill
                  className="object-cover p-0.5 group-hover:scale-105 transition-transform duration-300 ease-out"
                  priority
                />
              </motion.div>
            </motion.div>

            {/* Interactive Status Indicator Toggle */}
            <button
              onClick={() => {
                setStatusIndex((prev) => (prev + 1) % statuses.length);
                setShowStatusToast(true);
                setTimeout(() => setShowStatusToast(false), 2600);
              }}
              aria-label="Toggle Status"
              className="absolute -bottom-0.5 -right-0.5 z-20 flex size-3.5 cursor-pointer group"
              title="Click to change status"
            >
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${statuses[statusIndex].ping}`} />
              <span className={`relative inline-flex rounded-full size-3.5 ${statuses[statusIndex].color} border-2 border-[#070709] shadow-sm`} />
            </button>

            {/* Status Hover / Click Toast Overlay */}
            <AnimatePresence>
              {showStatusToast && (
                <motion.div
                  initial={{ opacity: 0, y: 6, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 4, scale: 0.9 }}
                  className="absolute top-full right-0 mt-2 max-w-[calc(100vw-3rem)] px-2.5 py-1 rounded-md bg-zinc-800 border border-zinc-700 text-[11px] font-mono text-zinc-200 shadow-xl z-40 flex items-center gap-1.5"
                >
                  <span className={`size-2 shrink-0 rounded-full ${statuses[statusIndex].color}`} />
                  <span className="truncate">{statuses[statusIndex].label}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Live Signature Row */}
        <div className="mb-6 mt-6 flex flex-wrap items-center gap-2 sm:gap-2.5 text-[11px] sm:text-[13px]">
          <RealTimeAge />

          <div className="relative">
            <motion.button
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                setShowLocationToast(true);
                setTimeout(() => setShowLocationToast(false), 2800);
              }}
              className="inline-flex items-center gap-1.5 rounded-full border border-zinc-800 bg-zinc-950/70 px-2.5 sm:px-3 py-1 sm:py-1.5 font-mono text-zinc-400 transition-colors hover:border-zinc-700 hover:text-zinc-200"
            >
              <MapPin className="size-3.5 shrink-0 text-zinc-500" />
              <span>Patna, IN</span>
              {istTime && <span className="text-zinc-600 hidden xs:inline">/ {istTime}</span>}
            </motion.button>

            <AnimatePresence>
              {showLocationToast && (
                <motion.div
                  initial={{ opacity: 0, y: 6, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 4, scale: 0.9 }}
                  className="absolute top-full left-0 z-30 mt-2 flex max-w-[calc(100vw-3rem)] items-center gap-1.5 rounded-md border border-zinc-700 bg-zinc-800 px-2.5 py-1 text-[11px] font-mono text-zinc-200 shadow-xl"
                >
                  <span className="size-2 shrink-0 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="truncate">IST / UTC+5:30</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <motion.button
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.97 }}
            onClick={copyEmail}
            className={`inline-flex min-w-[96px] sm:min-w-[104px] items-center justify-center rounded-full border px-3 py-1 sm:py-1.5 font-mono text-center transition-colors cursor-pointer ${
              copied
                ? "border-emerald-500/30 bg-emerald-950/40 text-emerald-300"
                : "border-zinc-800 bg-zinc-950/70 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200"
            }`}
          >
            <AnimatePresence mode="wait" initial={false}>
              {copied ? (
                <motion.div
                  key="copied-state"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.15 }}
                  className="inline-flex items-center gap-1.5"
                >
                  <Check className="size-3.5 shrink-0 text-emerald-400" />
                  <span>copied</span>
                </motion.div>
              ) : (
                <motion.div
                  key="hello-state"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.15 }}
                  className="inline-flex items-center gap-1.5"
                >
                  <Mail className="size-3.5 shrink-0 text-zinc-500" />
                  <span>say hello</span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Bio Paragraph */}
        <p className="text-[#b2b2b2] dark:text-[#a0a0a0] font-sans font-[450] leading-[1.85] text-[13.5px] sm:text-[15px] mb-8">
          I build full-stack web applications, mobile apps (React Native & Expo), and native desktop products end-to-end, obsessing over small details that make software feel right to use. Creator of{" "}
          <a
            href="https://pastily.app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-200 hover:underline underline-offset-[2px] decoration-zinc-600 font-medium"
          >
            Pastily
          </a>{" "}
          built with Rust & Tauri. Currently engineering with{" "}
          <a
            href="https://reactnative.dev/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-200 hover:underline underline-offset-[2px] decoration-zinc-600 font-medium"
          >
            React Native
          </a>
          ,{" "}
          <a
            href="https://expo.dev/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-200 hover:underline underline-offset-[2px] decoration-zinc-600 font-medium"
          >
            Expo
          </a>
          ,{" "}
          <a
            href="https://www.typescriptlang.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-200 hover:underline underline-offset-[2px] decoration-zinc-600 font-medium"
          >
            TypeScript
          </a>
          ,{" "}
          <a
            href="https://react.dev/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-200 hover:underline underline-offset-[2px] decoration-zinc-600 font-medium"
          >
            React
          </a>
          ,{" "}
          <a
            href="https://nextjs.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-200 hover:underline underline-offset-[2px] decoration-zinc-600 font-medium"
          >
            Next.js
          </a>
          , and{" "}
          <a
            href="https://tailwindcss.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-200 hover:underline underline-offset-[2px] decoration-zinc-600 font-medium"
          >
            Tailwind CSS
          </a>
          .
        </p>

        {/* Action CTAs & Social Bar */}
        <div className="flex flex-col items-stretch gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
          {/* Social Icons Bar with Tooltips */}
          <div className="flex items-center justify-center gap-4 sm:justify-start">
            {socialLinks.map((link) => (
              <div key={link.name} className="relative inline-flex">
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.name}
                  onMouseEnter={() => setTooltip(link.name)}
                  onMouseLeave={() => setTooltip(null)}
                  className="text-zinc-400 hover:text-white transition-colors duration-150 p-1"
                >
                  {link.icon}
                </a>

                {tooltip === link.name && (
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1 text-[11.5px] font-medium font-sans rounded-md whitespace-nowrap bg-zinc-800 text-zinc-100 shadow-lg pointer-events-none z-50">
                    {link.name}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center">
            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              href="#product"
              className="inline-flex w-full items-center justify-center gap-1.5 rounded-lg bg-zinc-100 px-4 py-2 text-xs font-semibold text-zinc-950 shadow-sm transition hover:bg-white sm:w-auto sm:text-sm"
            >
              <span>Explore Pastily</span>
              <ArrowRight className="size-3.5" />
            </motion.a>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={copyEmail}
              className="inline-flex w-full items-center justify-center gap-1.5 rounded-lg border border-zinc-800 bg-zinc-900 px-3.5 py-2 text-xs font-medium text-zinc-300 transition hover:border-zinc-700 hover:text-white sm:w-auto sm:text-sm cursor-pointer min-w-[140px]"
            >
              <Copy className="size-3.5 text-zinc-400 shrink-0" />
              <span>
                {copied ? (
                  "Copied!"
                ) : (
                  <>
                    <span className="hidden sm:inline">Copy Email (Press 'C')</span>
                    <span className="sm:hidden">Copy Email</span>
                  </>
                )}
              </span>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

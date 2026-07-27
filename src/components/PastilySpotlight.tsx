"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useMotionValue, useMotionTemplate } from "framer-motion";
import { ExternalLink, ShieldCheck, Zap, Cpu } from "lucide-react";

export default function PastilySpotlight() {
  const [activeTab, setActiveTab] = useState(0);

  // Radial Spotlight Cursor Follow
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const spotlightBg = useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, rgba(255, 255, 255, 0.05), transparent 80%)`;

  const features = [
    {
      id: "rust",
      title: "Native Rust Architecture",
      icon: Cpu,
      desc: "Built with Rust and Tauri for zero bloat, instant startup, and near-zero RAM usage.",
    },
    {
      id: "hotkeys",
      title: "Instant Global Hotkeys",
      icon: Zap,
      desc: "Trigger clipboard history anywhere on your system with a customizable hotkey.",
    },
    {
      id: "privacy",
      title: "Encrypted & Offline",
      icon: ShieldCheck,
      desc: "All data stays 100% encrypted on your local drive with zero cloud tracking.",
    },
  ];

  return (
    <section id="product" className="mb-14">
      {/* Minimalist Section Header Matching Hero */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-5">
        <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-[#f0f0f0] font-sans">
          Featured Product
        </h2>
        <span className="text-xs text-zinc-500 font-mono">Flagship Desktop App</span>
      </div>

      {/* Main Spotlight Card Container with Radial Cursor Glow */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.35 }}
        onMouseMove={handleMouseMove}
        className="relative rounded-xl sm:rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-5 sm:p-6 overflow-hidden transition-all duration-300 backdrop-blur-xl group hover:border-zinc-700/80 hover:bg-zinc-900/60"
      >
        {/* Dynamic Cursor Spotlight Layer */}
        <motion.div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-100"
          style={{ background: spotlightBg }}
        />

        <div className="relative z-10 flex flex-col gap-5">
          {/* Top Info Row */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            
            {/* Native 3D App Icon Container - Clean app icon fit */}
            <div className="flex items-center gap-3.5">
              <div className="relative shrink-0">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl overflow-hidden shadow-lg border border-zinc-800/80 bg-zinc-900 group-hover:border-zinc-700/80 transition duration-300 flex items-center justify-center p-0.5">
                  <Image
                    src="/pastily-logo.png"
                    alt="Pastily App Icon"
                    width={64}
                    height={64}
                    className="w-full h-full object-contain rounded-lg sm:rounded-xl group-hover:scale-105 transition-transform duration-300 ease-out"
                    priority
                  />
                </div>
                <span className="absolute -bottom-1 -right-1 px-1.5 py-0.2 text-[9px] font-mono text-zinc-400 bg-zinc-900 border border-zinc-800 rounded shadow-sm">
                  v2.0
                </span>
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-xl sm:text-2xl font-semibold text-[#f0f0f0] tracking-tight font-sans">
                    Pastily
                  </h3>
                  <span className="px-2 py-0.5 text-[10px] font-mono text-zinc-400 bg-zinc-800/80 rounded border border-zinc-700">
                    Tauri + Rust
                  </span>
                </div>
                <p className="text-xs text-zinc-500 font-mono mt-0.5">
                  Native Clipboard Manager & Developer Utility
                </p>
              </div>
            </div>

            {/* CTA Link Button */}
            <div className="flex items-center gap-2 self-stretch sm:self-auto">
              <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
                href="https://pastily.app"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-zinc-100 text-zinc-950 font-semibold text-xs hover:bg-white transition shadow-sm"
              >
                <span>pastily.app</span>
                <ExternalLink className="size-3" />
              </motion.a>
            </div>
          </div>

          {/* Description */}
          <p className="text-[13.5px] sm:text-sm text-[#b2b2b2] leading-relaxed font-sans">
            A lightning-fast, privacy-first desktop application designed to streamline daily developer workflow and clipboard history management with near-zero memory footprint.
          </p>

          {/* Senior Design Engineer Micro-Interaction: Interactive Feature Tabs */}
          <div className="space-y-3 pt-1 border-t border-zinc-800/60">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
              {features.map((feat, idx) => {
                const IconComponent = feat.icon;
                const isActive = activeTab === idx;

                return (
                  <button
                    key={feat.id}
                    onClick={() => setActiveTab(idx)}
                    className={`relative px-3 py-1.5 rounded-lg text-xs font-sans font-medium transition-colors flex items-center gap-1.5 shrink-0 cursor-pointer ${
                      isActive ? "text-white" : "text-zinc-400 hover:text-zinc-200"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeFeatureTab"
                        className="absolute inset-0 rounded-lg bg-zinc-800/90 border border-zinc-700/80 z-0"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                    <IconComponent className={`size-3.5 relative z-10 ${isActive ? "text-emerald-400" : "text-zinc-500"}`} />
                    <span className="relative z-10">{feat.title}</span>
                  </button>
                );
              })}
            </div>

            {/* Active Feature Callout Card with Layout Animation */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col gap-2 rounded-lg border border-zinc-800/80 bg-zinc-950/60 p-3 text-xs text-zinc-400 font-sans sm:flex-row sm:items-center sm:justify-between"
              >
                <span>{features[activeTab].desc}</span>
                <span className="self-start text-[10px] font-mono text-zinc-500 shrink-0 sm:ml-2 sm:self-auto">Feature 0{activeTab + 1}/03</span>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Tech Stack Pills */}
          <div className="flex flex-wrap gap-1.5">
            <span className="skill-chip">Tauri (Rust)</span>
            <span className="skill-chip">SvelteKit</span>
            <span className="skill-chip">TypeScript</span>
            <span className="skill-chip">Tailwind CSS</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}




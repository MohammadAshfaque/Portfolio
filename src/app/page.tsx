"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import PastilySpotlight from "@/components/PastilySpotlight";
import Experience from "@/components/Experience";
import Capabilities from "@/components/Capabilities";
import ShippingGraph from "@/components/ShippingGraph";
import GlassDock from "@/components/GlassDock";
import CmdKModal from "@/components/CmdKModal";

export default function Home() {
  const [isCmdOpen, setIsCmdOpen] = useState(false);

  return (
    <div className="relative z-10 mx-auto max-w-3xl px-4 pb-36 pt-4 sm:px-6">
      <div className="relative z-10">
        <Header onOpenCmdK={() => setIsCmdOpen(true)} />
        <Hero />
        <PastilySpotlight />
        <Experience />
        <Capabilities />
        <ShippingGraph />

        {/* CONTACT SECTION */}
        <section id="contact" className="mb-14 flex flex-col items-center overflow-hidden rounded-2xl border border-zinc-800/50 bg-zinc-950 p-5 text-center font-sans sm:rounded-3xl sm:p-8 md:p-12">
          
          <div className="relative z-10 max-w-xl bg-zinc-950 px-1 pb-2 sm:px-4">
            <h2 className="mb-3 text-2xl font-semibold tracking-tight text-[#f0f0f0] sm:text-3xl">Let's Build Something Great</h2>
            <p className="text-sm sm:text-[15px] text-[#b2b2b2] max-w-lg mx-auto leading-relaxed">
              Open for Remote roles (Full-Time or Contract), Freelance Design Engineering, or Product Collaboration.
            </p>
          </div>
          {/* CONTACT CIRCUIT */}
          <div className="relative h-16 w-full max-w-xl" aria-hidden="true">
            <svg className="absolute inset-0 hidden h-full w-full sm:block overflow-visible" viewBox="0 0 640 64" fill="none" preserveAspectRatio="none">
              <path d="M320 0V28" stroke="rgb(39 39 42)" strokeWidth="1" />
              <path d="M320 28H160V64" stroke="rgb(39 39 42)" strokeWidth="1" />
              <path d="M320 28H480V64" stroke="rgb(39 39 42)" strokeWidth="1" />
              <motion.path
                d="M320 0V28H160V64"
                stroke="url(#contactPulseLeft)"
                strokeWidth="1.5"
                strokeLinecap="round"
                pathLength={1}
                initial={{ pathLength: 0, opacity: 0.25 }}
                animate={{ pathLength: [0, 1, 1], opacity: [0.2, 1, 0.2] }}
                transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut", times: [0, 0.72, 1] }}
              />
              <motion.path
                d="M320 0V28H480V64"
                stroke="url(#contactPulseRight)"
                strokeWidth="1.5"
                strokeLinecap="round"
                pathLength={1}
                initial={{ pathLength: 0, opacity: 0.25 }}
                animate={{ pathLength: [0, 1, 1], opacity: [0.2, 1, 0.2] }}
                transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut", times: [0, 0.72, 1] }}
              />
              <defs>
                <linearGradient id="contactPulseLeft" x1="320" y1="0" x2="160" y2="64" gradientUnits="userSpaceOnUse">
                  <stop stopColor="transparent" />
                  <stop offset="0.35" stopColor="#a1a1aa" />
                  <stop offset="1" stopColor="#e4e4e7" />
                </linearGradient>
                <linearGradient id="contactPulseRight" x1="320" y1="0" x2="480" y2="64" gradientUnits="userSpaceOnUse">
                  <stop stopColor="transparent" />
                  <stop offset="0.35" stopColor="#a1a1aa" />
                  <stop offset="1" stopColor="#e4e4e7" />
                </linearGradient>
              </defs>
            </svg>

          </div>

          <div className="relative w-full max-w-xl mx-auto">
             <svg className="pointer-events-none absolute inset-x-0 -top-16 z-0 block h-[calc(100%+4rem)] w-full overflow-visible sm:hidden" viewBox="0 0 320 176" fill="none" preserveAspectRatio="none" aria-hidden="true">
               <path d="M160 0V176" stroke="rgb(39 39 42)" strokeWidth="1" />
               <motion.path
                 d="M160 0V176"
                 stroke="#a1a1aa"
                 strokeWidth="1.5"
                 strokeLinecap="round"
                 pathLength={1}
                 initial={{ pathLength: 0, opacity: 0.25 }}
                 animate={{ pathLength: [0, 1, 1], opacity: [0.2, 1, 0.2] }}
                 transition={{ repeat: Infinity, duration: 2.35, ease: "easeInOut", times: [0, 0.78, 1] }}
               />
             </svg>
             {/* 2-Column Symmetric Grid */}
             <div className="relative z-10 grid w-full grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-8">
                <div className="flex justify-center sm:justify-end">
                   <a href="mailto:ashfaque@pastily.com" className="inline-block w-full max-w-full rounded-2xl bg-zinc-950 px-0 py-1 sm:w-auto sm:px-3">
                      <div className="w-full rounded-xl border border-zinc-800 bg-zinc-900/90 px-4 py-3 text-center text-xs font-medium text-zinc-300 shadow-md transition-all hover:border-zinc-500 hover:text-white sm:w-auto sm:px-5 sm:text-sm">
                         ashfaque@pastily.com
                      </div>
                   </a>
                </div>

                <div className="flex justify-center sm:justify-start">
                   <a href="https://x.com/ashfaque_dev" target="_blank" rel="noopener noreferrer" className="inline-block w-full max-w-full rounded-2xl bg-zinc-950 px-0 py-1 sm:w-auto sm:px-3">
                      <div className="w-full rounded-xl border border-zinc-800 bg-zinc-900/90 px-4 py-3 text-center text-xs font-medium text-zinc-300 shadow-md transition-all hover:border-zinc-500 hover:text-white sm:w-auto sm:px-5 sm:text-sm">
                         DM on 𝕏 (@ashfaque_dev)
                      </div>
                   </a>
                </div>
             </div>

          </div>

        </section>

        <footer className="px-2 pb-4 text-center text-[11px] font-mono leading-relaxed text-zinc-500 sm:text-xs">
          <p>© 2026 Mohammad Ashfaque. Engineered with precision & craft.</p>
        </footer>
      </div>

      {/* Dock & Modal */}
      <GlassDock onOpenCmdK={() => setIsCmdOpen(true)} />
      <CmdKModal isOpen={isCmdOpen} onClose={() => setIsCmdOpen(false)} />
    </div>
  );
}


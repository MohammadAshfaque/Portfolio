"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Hourglass, Sparkles } from "lucide-react";

interface RealTimeAgeProps {
  birthDate?: string;
}

export default function RealTimeAge({ birthDate = "2003-01-01T00:00:00.000Z" }: RealTimeAgeProps) {
  const [ageStr, setAgeStr] = useState<string>("");
  const [isDetailed, setIsDetailed] = useState<boolean>(false);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const birthTimestamp = new Date(birthDate).getTime();
    const msPerYear = 1000 * 60 * 60 * 24 * 365.2425;

    const updateAge = () => {
      const now = Date.now();
      const diffMs = now - birthTimestamp;
      const ageYears = diffMs / msPerYear;
      setAgeStr(ageYears.toFixed(8));
      animFrameRef.current = requestAnimationFrame(updateAge);
    };

    animFrameRef.current = requestAnimationFrame(updateAge);

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [birthDate]);

  if (!ageStr) {
    return (
      <div className="inline-flex items-center gap-1.5 rounded-full border border-zinc-800 bg-zinc-950/80 px-2.5 sm:px-3 py-1 sm:py-1.5 font-mono text-[11px] text-zinc-500 sm:text-[12px]">
        <Hourglass className="size-3.5 shrink-0 text-amber-500/80" />
        <span>23.00000000 yrs old</span>
      </div>
    );
  }

  const [integerPart, decimalPart] = ageStr.split(".");

  return (
    <motion.button
      whileHover={{ y: -1, scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      onClick={() => setIsDetailed((prev) => !prev)}
      className="group inline-flex max-w-full items-center gap-1.5 rounded-full border border-zinc-800 bg-zinc-950/80 px-2.5 sm:px-3 py-1 sm:py-1.5 font-mono text-[11px] sm:text-[12px] text-zinc-400 transition-colors hover:border-zinc-700 hover:text-zinc-200 cursor-pointer shadow-sm"
      title="Click to toggle detailed mode"
    >
      <Hourglass className="size-3.5 shrink-0 text-amber-500/80 transition-transform duration-700 group-hover:rotate-180" />
      
      {!isDetailed ? (
        <span className="inline-flex items-center tabular-nums min-w-0">
          <span className="font-semibold text-zinc-100">{integerPart}</span>
          <span className="text-zinc-500">.</span>
          <span className="text-zinc-400 font-mono tracking-tighter truncate max-w-[90px] sm:max-w-none">{decimalPart}</span>
          <span className="ml-1 text-[10px] sm:text-[11px] font-sans text-zinc-500 group-hover:text-zinc-400 transition-colors shrink-0">yrs old</span>
        </span>
      ) : (
        <span className="inline-flex items-center gap-1 tabular-nums text-emerald-400 font-medium truncate">
          <span>{integerPart} years ongoing</span>
          <Sparkles className="size-3 shrink-0 text-emerald-400 animate-pulse" />
        </span>
      )}
    </motion.button>
  );
}

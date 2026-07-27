"use client";

import { useState, useEffect } from "react";

interface HeaderProps {
  onOpenCmdK: () => void;
}

export default function Header({ onOpenCmdK }: HeaderProps) {
  const [timeString, setTimeString] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      setTimeString(new Intl.DateTimeFormat("en-GB", options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 py-4 mb-8 sm:mb-10 border-b border-zinc-800/60 font-sans">
      <div className="flex min-w-0 items-center gap-2.5">
        <div className="relative flex size-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full size-2.5 bg-emerald-500"></span>
        </div>
        <span className="min-w-0 text-[10.5px] sm:text-xs font-mono text-zinc-400 tracking-wide uppercase">
          Open for Remote & Freelance
        </span>
      </div>

      <div className="ml-auto flex shrink-0 items-center gap-3 sm:gap-4 text-[10.5px] sm:text-xs font-mono text-zinc-500">
        <span>Patna, IN {timeString || "--:--:--"}</span>
        <button
          onClick={onOpenCmdK}
          className="hidden sm:flex items-center gap-1.5 px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 transition cursor-pointer"
        >
          <span className="text-[10px]">⌘</span>K
        </button>
      </div>
    </header>
  );
}


"use client";

import { useEffect, useRef, useState } from "react";
import { Briefcase, Home, LayoutGrid, Send } from "lucide-react";

interface GlassDockProps {
  onOpenCmdK: () => void;
}

export default function GlassDock({ onOpenCmdK: _onOpenCmdK }: GlassDockProps) {
  const [activeLamp, setActiveLamp] = useState<string | null>(null);
  const litAtRef = useRef(0);
  const ignoreScrollUntilRef = useRef(0);

  useEffect(() => {
    if (!activeLamp) return;

    const clearLamp = () => {
      if (Date.now() < ignoreScrollUntilRef.current) return;
      setActiveLamp(null);
    };

    window.addEventListener("scroll", clearLamp, { passive: true });
    return () => window.removeEventListener("scroll", clearLamp);
  }, [activeLamp]);

  const lightLamp = (id: string) => {
    litAtRef.current = Date.now();
    ignoreScrollUntilRef.current = Date.now() + 2200;
    setActiveLamp(id);
  };

  const dockLampClass = (id: string) =>
    `dock-btn dock-lamp-btn ${activeLamp === id ? "is-lit" : ""}`;

  return (
    <div className="fixed bottom-5 inset-x-0 z-40 flex justify-center pointer-events-none px-4">
      <nav className="pointer-events-auto glass-dock flex items-center gap-1 sm:gap-2 px-3 py-2 rounded-full">
        <a href="#hero" title="Home" onClick={() => lightLamp("home")} className={dockLampClass("home")}>
          <Home className="size-4" />
        </a>

        <a
          href="#experience"
          title="Work & Experience"
          onClick={() => lightLamp("experience")}
          className={dockLampClass("experience")}
        >
          <Briefcase className="size-4" />
        </a>

        <a
          href="#skills"
          title="Capabilities & Stack"
          onClick={() => lightLamp("skills")}
          className={dockLampClass("skills")}
        >
          <LayoutGrid className="size-4" />
        </a>

        <a
          href="#contact"
          title="Let's Build Together"
          onClick={() => lightLamp("contact")}
          className={dockLampClass("contact")}
        >
          <Send className="size-4" />
        </a>
      </nav>
    </div>
  );
}

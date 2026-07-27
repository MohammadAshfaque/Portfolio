"use client";

import { useEffect, useState } from "react";
import { Search, X } from "lucide-react";

interface CmdKModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CmdKModal({ isOpen, onClose }: CmdKModalProps) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        isOpen ? onClose() : null;
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const commands = [
    {
      label: "🚀 Explore Pastily Desktop App",
      category: "Product",
      href: "#product",
    },
    {
      label: "✉️ Send Email (ashfaque@pastily.com)",
      category: "Contact",
      href: "mailto:ashfaque@pastily.com",
    },
    {
      label: "𝕏 Follow @ashfaque_dev",
      category: "Social",
      href: "https://x.com/ashfaque_dev",
      external: true,
    },
    {
      label: "💼 LinkedIn Profile (mohammad-ashfaque01)",
      category: "Social",
      href: "https://linkedin.com/in/mohammad-ashfaque01",
      external: true,
    },
    {
      label: "⚡ View Tech Capabilities & Stack",
      category: "Stack",
      href: "#skills",
    },
    {
      label: "💼 Remote Work Availability",
      category: "Status",
      href: "#contact",
    },
  ];

  const filteredCommands = commands.filter((cmd) =>
    cmd.label.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/80 px-3 pt-16 backdrop-blur-md sm:px-4 sm:pt-24"
      onClick={onClose}
    >
      <div
        className="max-h-[calc(100vh-5rem)] w-full max-w-lg overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-3.5 border-b border-zinc-800 flex items-center gap-3">
          <Search className="size-4 text-zinc-400 ml-1" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or search..."
            className="w-full bg-transparent text-sm text-white placeholder-zinc-500 focus:outline-none"
            autoFocus
          />
          <button
            onClick={onClose}
            className="text-[10px] font-mono text-zinc-400 hover:text-white px-2 py-1 rounded bg-zinc-800"
          >
            ESC
          </button>
        </div>

        <div className="p-2 max-h-72 overflow-y-auto text-xs space-y-1">
          {filteredCommands.length > 0 ? (
            filteredCommands.map((cmd, idx) => (
              <a
                key={idx}
                href={cmd.href}
                target={cmd.external ? "_blank" : undefined}
                rel={cmd.external ? "noopener noreferrer" : undefined}
                onClick={onClose}
                className="flex items-start justify-between gap-3 rounded-lg p-2.5 text-zinc-300 transition hover:bg-zinc-800 hover:text-white"
              >
                <span className="min-w-0 break-words">{cmd.label}</span>
                <span className="text-[10px] font-mono text-zinc-500">
                  {cmd.category}
                </span>
              </a>
            ))
          ) : (
            <p className="text-center text-zinc-500 py-6 text-xs font-mono">
              No matching commands found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { Eye } from "lucide-react";
import { motion } from "framer-motion";

export default function VisitorCounter() {
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    const hasVisited = sessionStorage.getItem("has_visited_portfolio");
    const endpoint = hasVisited
      ? "https://api.counterapi.dev/v1/mohammadashfaque-portfolio/visits"
      : "https://api.counterapi.dev/v1/mohammadashfaque-portfolio/visits/up";

    fetch(endpoint)
      .then((res) => res.json())
      .then((data) => {
        if (data && typeof data.count === "number") {
          setViews(data.count);
          sessionStorage.setItem("has_visited_portfolio", "true");
        }
      })
      .catch(() => {
        setViews(1);
      });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-2.5 inline-flex items-center gap-1.5 rounded-full border border-zinc-800/80 bg-zinc-950/80 px-2.5 py-1 font-mono text-[11px] text-zinc-400 shadow-sm transition-colors hover:border-zinc-700 hover:text-zinc-200"
      title="Live Total Visitors"
    >
      <Eye className="size-3.5 text-zinc-400 shrink-0" />
      <span className="tabular-nums font-semibold text-zinc-200">
        {views !== null ? views.toLocaleString() : "..."}
      </span>
      <span className="text-[10px] text-zinc-500">views</span>
    </motion.div>
  );
}

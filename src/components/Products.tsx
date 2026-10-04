"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface Product {
  name: string;
  tagline: string;
  stack?: string[];
  logo?: string;
  status: "Sold" | "Building";
}

const PRODUCTS: Product[] = [
  {
    name: "Pastily",
    tagline: "Native clipboard manager. Started in July, sold in October.",
    stack: ["Tauri", "Rust", "SvelteKit"],
    logo: "/pastily-logo.png",
    status: "Sold",
  },
  {
    name: "Mac apps",
    tagline: "Building native macOS apps in Swift. Coming soon.",
    status: "Building",
  },
];

export default function Products() {
  const sold = PRODUCTS.filter((p) => p.status === "Sold").length;

  return (
    <section id="product" className="mb-14">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-2">
        <h2 className="font-sans text-xl font-semibold tracking-tight text-[#f0f0f0] sm:text-2xl">
          Apps I've Built
        </h2>
        <span className="font-mono text-xs text-zinc-500">
          {sold.toString().padStart(2, "0")} sold · Mac apps in progress
        </span>
      </div>

      <ul className="divide-y divide-zinc-800/60 overflow-hidden rounded-xl border border-zinc-800/80 bg-zinc-900/40 sm:rounded-2xl">
        {PRODUCTS.map((app, i) => (
          <motion.li
            key={app.name}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
            className="flex items-center gap-3.5 p-4 sm:gap-4 sm:p-5"
          >
            <div className="flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-zinc-800/80 bg-zinc-900 p-0.5 sm:size-12">
              {app.logo ? (
                <Image
                  src={app.logo}
                  alt={`${app.name} app icon`}
                  width={48}
                  height={48}
                  className="h-full w-full rounded-[10px] object-contain"
                />
              ) : (
                <span className="font-mono text-lg text-zinc-600">+</span>
              )}
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-sans text-[15px] font-semibold tracking-tight text-[#f0f0f0]">
                  {app.name}
                </h3>
                <span
                  className={`rounded border px-1.5 py-0.5 font-mono text-[10px] ${
                    app.status === "Sold"
                      ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                      : "border-amber-500/30 bg-amber-500/10 text-amber-400"
                  }`}
                >
                  {app.status}
                </span>
              </div>
              <p className="mt-0.5 font-sans text-xs text-[#b2b2b2] sm:text-[13px]">{app.tagline}</p>
              {app.stack && (
                <p className="mt-1 font-mono text-[10px] text-zinc-500">{app.stack.join(" · ")}</p>
              )}
            </div>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}

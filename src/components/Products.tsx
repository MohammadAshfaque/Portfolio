"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

interface Product {
  name: string;
  tagline: string;
  stack: string[];
  logo: string;
  href: string;
  status: "Sold" | "Live";
}

const PRODUCTS: Product[] = [
  {
    name: "Pastily",
    tagline: "Native clipboard manager for developers",
    stack: ["Tauri", "Rust", "SvelteKit"],
    logo: "/pastily-logo.png",
    href: "https://pastily.app",
    status: "Sold",
  },
];

export default function Products() {
  return (
    <section id="product" className="mb-14">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-2">
        <h2 className="font-sans text-xl font-semibold tracking-tight text-[#f0f0f0] sm:text-2xl">
          Apps I've Built
        </h2>
        <span className="font-mono text-xs text-zinc-500">
          {PRODUCTS.length.toString().padStart(2, "0")} shipped
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
          >
            <a
              href={app.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3.5 p-4 transition-colors hover:bg-zinc-900/70 sm:gap-4 sm:p-5"
            >
              <div className="size-11 shrink-0 overflow-hidden rounded-xl border border-zinc-800/80 bg-zinc-900 p-0.5 sm:size-12">
                <Image
                  src={app.logo}
                  alt={`${app.name} app icon`}
                  width={48}
                  height={48}
                  className="h-full w-full rounded-[10px] object-contain"
                />
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
                        : "border-zinc-700 bg-zinc-800/80 text-zinc-400"
                    }`}
                  >
                    {app.status}
                  </span>
                </div>
                <p className="mt-0.5 truncate font-sans text-xs text-[#b2b2b2] sm:text-[13px]">
                  {app.tagline}
                </p>
                <p className="mt-1 font-mono text-[10px] text-zinc-500">{app.stack.join(" · ")}</p>
              </div>

              <ArrowUpRight className="size-4 shrink-0 text-zinc-600 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-zinc-200" />
            </a>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}

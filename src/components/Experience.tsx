"use client";

import { motion } from "framer-motion";

export default function Experience() {
  const experiences = [
    {
      title: "Indie Developer & Founder",
      company: "Pastily",
      period: "2024 — Present",
      type: "Product",
      description:
        "Architecting and shipping end-to-end consumer software. Built Pastily using Rust, Tauri, SvelteKit, and TypeScript to solve real daily workflow bottlenecks.",
    },
    {
      title: "AI & LLM Trainer / Evaluator",
      company: "Top AI Research Labs",
      period: "2024 — Present",
      type: "AI / ML",
      description:
        "Collaborating with leading LLM companies to evaluate, benchmark, and train frontier artificial intelligence models across complex coding, reasoning, and system architecture tasks.",
    },
    {
      title: "Freelancer",
      company: "Global Clients",
      period: "Freelance / Contract",
      type: "Freelance",
      description:
        "Building custom Web apps (React, Next.js, Node.js) and Mobile applications (React Native, Expo) for clients globally with a heavy focus on UI craftsmanship and micro-interactions.",
    },
    {
      title: "B.Tech Computer Science & Engineering",
      company: "AI & Machine Learning Specialization",
      period: "2022 — 2026",
      type: "Education",
      description:
        "Specialized in AI/ML algorithms, data structures, full-stack software development, and software design principles.",
    },
  ];

  return (
    <section id="experience" className="mb-14">
      <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-[#f0f0f0] font-sans mb-6">
        What I Do
      </h2>

      {/* Siddz.com Style Vertical Timeline Container */}
      <div className="relative pl-5 sm:pl-6 border-l border-zinc-800/90 space-y-6">
        {experiences.map((exp, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: index * 0.07 }}
            className="group relative"
          >
            {/* Timeline Dot Indicator on Left Line */}
            <div className="absolute -left-[25px] sm:-left-[29px] top-1.5 size-2 sm:size-2.5 rounded-full bg-[#070709] border border-zinc-700 group-hover:border-zinc-400 group-hover:bg-zinc-300 transition-all duration-200" />

            <div className="flex flex-col items-start justify-between gap-2 sm:flex-row sm:gap-3">
              <div>
                <h3 className="text-base font-semibold text-[#f0f0f0] font-sans group-hover:text-white transition-colors">
                  {exp.title}
                </h3>
                <p className="text-xs text-zinc-500 font-mono mt-0.5">
                  {exp.company} • {exp.period}
                </p>
              </div>
              <span className="shrink-0 rounded border border-zinc-800 bg-zinc-900 px-2 py-0.5 text-[11px] font-mono text-zinc-400 transition-colors group-hover:border-zinc-700 group-hover:text-zinc-300 sm:self-start">
                {exp.type}
              </span>
            </div>

            <p className="text-[13.5px] sm:text-sm text-[#b2b2b2] font-sans mt-2 leading-relaxed">
              {exp.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}




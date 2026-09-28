"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Library } from "lucide-react";
import { ShowcaseBadge } from "./ShowcaseBadge";

const headline = ["Un endroit", "calme pour", "vos textes."];

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

const line = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

export function Hero() {
  return (
    <section className="relative overflow-hidden px-5 pb-28 pt-20 sm:pt-24">
      <div className="mx-auto max-w-3xl">
        <motion.h1
          variants={container}
          initial="hidden"
          animate="show"
          className="font-display text-5xl leading-[1.05] tracking-tight text-paper-50 sm:text-6xl md:text-7xl"
        >
          {headline.map((part) => (
            <motion.span key={part} variants={line} className="block text-balance">
              {part.split(" ").map((word, i) =>
                word === "calme" ? (
                  <span key={i} className="relative mr-[0.3ch] inline-block italic text-ember-400">
                    {word}
                    <svg
                      viewBox="0 0 120 12"
                      className="absolute -bottom-2 left-0 w-full text-ember-500/70"
                      preserveAspectRatio="none"
                    >
                      <motion.path
                        d="M2 8 C 30 2, 90 2, 118 8"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.9, delay: 0.7, ease: "easeInOut" }}
                      />
                    </svg>
                  </span>
                ) : (
                  <span key={i}>{word} </span>
                )
              )}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-7 max-w-xl text-lg leading-relaxed text-paper-400"
        >
          Verso est un carnet d&rsquo;écriture minimal : posez une idée, un
          extrait de code ou une note, donnez-lui un nom, et retrouvez-la
          d&rsquo;un lien. Simple comme une page qu&rsquo;on tourne.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.72 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <Link
            href="/creer"
            className="group inline-flex items-center gap-2 rounded-full bg-ember-500 px-6 py-3.5 text-sm font-semibold text-ink-950 transition hover:bg-ember-400 active:scale-[0.98]"
          >
            Commencer à écrire
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" strokeWidth={2} />
          </Link>
          <a
            href="#exemples"
            className="inline-flex items-center gap-2 rounded-full border border-ink-600 px-6 py-3.5 text-sm font-semibold text-paper-200 transition hover:border-ink-500 hover:text-paper-50"
          >
            <Library className="h-4 w-4" strokeWidth={2} />
            Voir des exemples
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.95 }}
          className="mt-8"
        >
          <ShowcaseBadge />
        </motion.div>
      </div>

      <HeroCards />
    </section>
  );
}

function HeroCards() {
  const cards = [
    { rotate: -7, x: "-10%", delay: 1.0, label: "haiku.txt", corner: "left" as const },
    { rotate: 5, x: "8%", delay: 1.15, label: "palette.css", corner: "right" as const },
  ];

  return (
    <div className="pointer-events-none absolute inset-x-0 -bottom-20 hidden justify-center opacity-70 lg:flex">
      <div className="relative h-44 w-full max-w-3xl">
        {cards.map((c) => (
          <motion.div
            key={c.label}
            className="absolute left-1/2 top-0 w-72 border border-ink-600 bg-ink-900/85 p-5 shadow-2xl shadow-black/40"
            style={{
              marginLeft: c.x,
              borderRadius:
                c.corner === "left" ? "2px 20px 20px 20px" : "20px 2px 20px 20px",
            }}
            initial={{ opacity: 0, y: 40, rotate: 0 }}
            animate={{ opacity: 1, y: 0, rotate: c.rotate }}
            transition={{ duration: 0.9, delay: c.delay, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="font-display text-sm italic text-paper-500">{c.label}</p>
            <div className="mt-3 space-y-1.5">
              <span className="block h-1 w-4/5 rounded-full bg-ink-700" />
              <span className="block h-1 w-3/5 rounded-full bg-ink-700" />
              <span className="block h-1 w-2/3 rounded-full bg-ink-700" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { DEMO_PASTES } from "@/lib/demoPastes";
import { languageLabel } from "@/lib/languages";
import { CodeBlock } from "./CodeBlock";

export function DemoGallery() {
  return (
    <section id="exemples" className="mx-auto max-w-6xl px-5 py-24">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-display text-lg italic text-ember-400/90">Aperçu</p>
          <h2 className="mt-2 font-display text-3xl text-paper-50 sm:text-4xl">
            Quelques extraits d&rsquo;exemple
          </h2>
        </div>
        <p className="max-w-sm text-sm leading-relaxed text-paper-600">
          Pré-remplis pour montrer le rendu — ils ne sont pas stockés dans
          votre navigateur tant que vous n&rsquo;écrivez pas les vôtres.
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {DEMO_PASTES.map((paste, i) => (
          <motion.div
            key={paste.code}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: (i % 2) * 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link
              href={`/p/${paste.code}`}
              className="group block overflow-hidden rounded-2xl border border-ink-700 bg-ink-900/60 transition hover:-translate-y-1 hover:border-ember-500/40 hover:shadow-xl hover:shadow-black/30"
            >
              <div className="flex items-center justify-between border-b border-ink-700/70 px-6 py-4">
                <div>
                  <p className="font-display text-lg text-paper-50">{paste.title}</p>
                  <p className="mt-0.5 text-xs font-mono text-paper-600">
                    {languageLabel(paste.language)}
                  </p>
                </div>
                <ArrowUpRight
                  className="h-4.5 w-4.5 text-paper-600 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ember-400"
                  strokeWidth={2}
                />
              </div>
              <div className="max-h-44 overflow-hidden">
                <CodeBlock code={paste.content} language={paste.language} showLineNumbers={false} />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

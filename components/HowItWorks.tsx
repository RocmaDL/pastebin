"use client";

import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Écrivez",
    text: "Collez ou tapez votre texte, choisissez un langage si besoin pour la coloration syntaxique.",
    offset: "sm:mr-16",
  },
  {
    number: "02",
    title: "Nommez",
    text: "Donnez un code personnalisé à votre extrait, ou laissez Verso lui en trouver un.",
    offset: "sm:ml-16",
  },
  {
    number: "03",
    title: "Retrouvez",
    text: "Rouvrez-le depuis votre historique local ou son lien direct, à tout moment.",
    offset: "sm:mr-16",
  },
];

export function HowItWorks() {
  return (
    <section className="border-y border-ink-700/60 bg-ink-900/40">
      <div className="mx-auto max-w-3xl px-5 py-24 sm:py-28">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="font-display text-3xl italic text-paper-50 sm:text-4xl"
        >
          Trois gestes, rien de plus.
        </motion.p>

        <div className="relative mt-16">
          <div className="absolute bottom-0 left-1/2 top-0 hidden w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-ink-600 to-transparent sm:block" />

          <div className="space-y-14">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className={`relative max-w-sm ${step.offset} ${
                  i % 2 === 1 ? "sm:ml-auto sm:text-right" : ""
                }`}
              >
                <span className="font-display text-6xl italic text-ink-600">
                  {step.number}
                </span>
                <h3 className="mt-1 font-display text-2xl text-paper-50">{step.title}</h3>
                <p className="mt-2.5 text-[15px] leading-relaxed text-paper-400">{step.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { NotebookPen, ArrowUpRight } from "lucide-react";
import type { Paste } from "@/lib/types";
import { getAllPastes } from "@/lib/storage";
import { DEMO_PASTES } from "@/lib/demoPastes";
import { languageLabel } from "@/lib/languages";
import { formatRelative } from "@/lib/utils";

function PasteRow({ paste, index }: { paste: Paste; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.4) }}
    >
      <Link
        href={`/p/${paste.code}`}
        className="group flex items-center justify-between gap-4 rounded-2xl border border-ink-700 bg-ink-900/50 px-5 py-4 transition hover:border-ember-500/40 hover:bg-ink-900"
      >
        <div className="min-w-0">
          <p className="truncate font-display text-lg text-paper-50">{paste.title}</p>
          <p className="mt-0.5 truncate text-xs text-paper-600">
            <span className="font-mono">{paste.code}</span> · {languageLabel(paste.language)} ·{" "}
            {formatRelative(paste.createdAt)}
          </p>
        </div>
        <ArrowUpRight
          className="h-4 w-4 shrink-0 text-paper-600 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ember-400"
          strokeWidth={2}
        />
      </Link>
    </motion.div>
  );
}

export function LocalHistoryList() {
  const [pastes, setPastes] = useState<Paste[] | null>(null);

  useEffect(() => {
    setPastes(getAllPastes());
  }, []);

  if (pastes === null) {
    return <div className="h-40" />;
  }

  if (pastes.length === 0) {
    return (
      <div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center rounded-3xl border border-dashed border-ink-600 px-8 py-16 text-center"
        >
          <NotebookPen className="h-9 w-9 text-paper-600" strokeWidth={1.5} />
          <h2 className="mt-4 font-display text-xl text-paper-50">
            Votre carnet est vide, pour l&rsquo;instant.
          </h2>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-paper-500">
            Les extraits que vous écrivez sur cet appareil apparaîtront ici.
          </p>
          <Link
            href="/creer"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-ember-500 px-5 py-2.5 text-sm font-semibold text-ink-950 transition hover:bg-ember-400"
          >
            Écrire mon premier extrait
          </Link>
        </motion.div>

        <DemoLibrarySection />
      </div>
    );
  }

  return (
    <div>
      <div className="space-y-3">
        {pastes.map((paste, i) => (
          <PasteRow key={paste.code} paste={paste} index={i} />
        ))}
      </div>

      <DemoLibrarySection />
    </div>
  );
}

function DemoLibrarySection() {
  return (
    <div className="mt-16">
      <p className="font-display text-lg italic text-paper-500">Bibliothèque d&rsquo;exemples</p>
      <div className="mt-4 space-y-3">
        {DEMO_PASTES.map((paste, i) => (
          <PasteRow key={paste.code} paste={paste} index={i} />
        ))}
      </div>
    </div>
  );
}

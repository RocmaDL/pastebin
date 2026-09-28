"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, Copy, FileX, Trash2 } from "lucide-react";
import type { Paste } from "@/lib/types";
import { getPaste, deletePaste } from "@/lib/storage";
import { getDemoPaste } from "@/lib/demoPastes";
import { languageLabel } from "@/lib/languages";
import { formatDate } from "@/lib/utils";
import { CodeBlock } from "./CodeBlock";

export function PasteViewer({ code }: { code: string }) {
  const [paste, setPaste] = useState<Paste | null | undefined>(undefined);
  const [isDemo, setIsDemo] = useState(false);
  const [copied, setCopied] = useState(false);
  const [deleted, setDeleted] = useState(false);

  useEffect(() => {
    const demo = getDemoPaste(code);
    if (demo) {
      setPaste(demo);
      setIsDemo(true);
      return;
    }
    setPaste(getPaste(code));
  }, [code]);

  function handleCopy() {
    if (!paste) return;
    navigator.clipboard.writeText(paste.content).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  }

  function handleDelete() {
    if (!paste || isDemo) return;
    deletePaste(paste.code);
    setDeleted(true);
  }

  if (paste === undefined) {
    return <div className="h-64" />;
  }

  if (!paste || deleted) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center rounded-3xl border border-dashed border-ink-600 px-8 py-20 text-center"
      >
        <FileX className="h-10 w-10 text-paper-600" strokeWidth={1.5} />
        <h1 className="mt-5 font-display text-2xl text-paper-50">
          {deleted ? "Extrait supprimé" : "Introuvable ici"}
        </h1>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-paper-500">
          {deleted
            ? "Cet extrait a été retiré de votre stockage local."
            : "Aucun extrait avec ce code n'existe dans ce navigateur. Il a peut-être été créé ailleurs, ou n'a jamais existé."}
        </p>
        <Link
          href="/creer"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-ember-500 px-5 py-2.5 text-sm font-semibold text-ink-950 transition hover:bg-ember-400"
        >
          Écrire un nouvel extrait
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          {isDemo && (
            <p className="mb-1.5 font-display text-sm italic text-ember-400/90">
              Extrait d&rsquo;exemple
            </p>
          )}
          <h1 className="font-display text-3xl text-paper-50 sm:text-4xl">{paste.title}</h1>
          <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-paper-600">
            <span className="font-mono">{paste.code}</span>
            <span>·</span>
            <span>{languageLabel(paste.language)}</span>
            <span>·</span>
            <span>{formatDate(paste.createdAt)}</span>
          </p>
        </div>

        <div className="flex shrink-0 gap-2">
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 rounded-full border border-ink-600 px-4 py-2 text-xs font-semibold text-paper-200 transition hover:border-ink-500 hover:text-paper-50"
          >
            {copied ? (
              <Check className="h-3.5 w-3.5 text-moss-400" strokeWidth={2.25} />
            ) : (
              <Copy className="h-3.5 w-3.5" strokeWidth={2} />
            )}
            {copied ? "Copié" : "Copier"}
          </button>
          {!isDemo && (
            <button
              onClick={handleDelete}
              className="inline-flex items-center gap-1.5 rounded-full border border-ink-600 px-4 py-2 text-xs font-semibold text-paper-400 transition hover:border-red-500/40 hover:text-red-300"
            >
              <Trash2 className="h-3.5 w-3.5" strokeWidth={2} />
              Supprimer
            </button>
          )}
        </div>
      </div>

      <div className="overflow-hidden rounded-3xl border border-ink-700 bg-ink-900/60">
        <CodeBlock code={paste.content} language={paste.language} />
      </div>
    </motion.div>
  );
}

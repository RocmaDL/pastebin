"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Shuffle, AlertCircle } from "lucide-react";
import { LANGUAGES } from "@/lib/languages";
import type { PasteLanguage } from "@/lib/types";
import { generateCode, sanitizeCode } from "@/lib/utils";
import { PasteExistsError, savePaste } from "@/lib/storage";
import { getDemoPaste } from "@/lib/demoPastes";

export function PasteEditor() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [language, setLanguage] = useState<PasteLanguage>("plaintext");
  const [code, setCode] = useState("");
  const [codeTouched, setCodeTouched] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setCode(generateCode());
  }, []);

  const charCount = content.length;
  const overLimit = charCount > 20_000;

  const previewUrl = useMemo(() => `verso.app/p/${code || "…"}`, [code]);

  function handleShuffle() {
    setCode(generateCode());
    setCodeTouched(false);
    setError("");
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const cleanCode = sanitizeCode(code);
    if (!cleanCode) {
      setError("Choisissez un code valide (lettres, chiffres, tirets).");
      return;
    }
    if (!content.trim()) {
      setError("Votre extrait est vide.");
      return;
    }
    if (overLimit) {
      setError("Votre extrait dépasse la limite de 20 000 caractères.");
      return;
    }
    if (getDemoPaste(cleanCode)) {
      setError("Ce code est réservé à un exemple. Essayez-en un autre.");
      return;
    }

    setSubmitting(true);
    try {
      savePaste({
        code: cleanCode,
        title: title.trim() || "Sans titre",
        content,
        language,
        createdAt: Date.now(),
      });
      router.push(`/p/${cleanCode}`);
    } catch (err) {
      if (err instanceof PasteExistsError) {
        setError(err.message);
      } else {
        setError("Une erreur est survenue. Réessayez.");
      }
      setSubmitting(false);
    }
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      onSubmit={handleSubmit}
      className="rounded-3xl border border-ink-700 bg-ink-900/60 p-6 sm:p-8"
    >
      <div className="grid gap-6 sm:grid-cols-[1fr_auto]">
        <div>
          <label className="mb-2 block text-sm font-medium text-paper-300">Titre</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Un titre pour vous y retrouver"
            maxLength={80}
            className="w-full rounded-xl border border-ink-600 bg-ink-950/60 px-4 py-2.5 font-display text-lg text-paper-50 placeholder:text-paper-600 focus:border-ember-500/60 focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-paper-300">Langage</label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as PasteLanguage)}
            className="h-[46px] rounded-xl border border-ink-600 bg-ink-950/60 px-4 text-sm text-paper-100 focus:border-ember-500/60 focus:outline-none"
          >
            {LANGUAGES.map((l) => (
              <option key={l.value} value={l.value}>
                {l.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-6">
        <div className="mb-2 flex items-center justify-between">
          <label className="text-sm font-medium text-paper-300">Contenu</label>
          <span className={`text-xs ${overLimit ? "text-red-400" : "text-paper-600"}`}>
            {charCount.toLocaleString("fr-FR")} / 20 000
          </span>
        </div>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={14}
          placeholder="Écrivez ou collez votre texte ici…"
          className="w-full resize-y rounded-xl border border-ink-600 bg-ink-950/60 px-4 py-3 font-mono text-sm leading-relaxed text-paper-100 placeholder:text-paper-600 focus:border-ember-500/60 focus:outline-none"
        />
      </div>

      <div className="mt-6">
        <label className="mb-2 block text-sm font-medium text-paper-300">
          Code de l&rsquo;extrait
        </label>
        <div className="flex flex-wrap items-center gap-3">
          <input
            value={code}
            onChange={(e) => {
              setCode(e.target.value);
              setCodeTouched(true);
            }}
            className="w-56 rounded-xl border border-ink-600 bg-ink-950/60 px-4 py-2.5 font-mono text-sm text-paper-100 focus:border-ember-500/60 focus:outline-none"
          />
          <button
            type="button"
            onClick={handleShuffle}
            className="inline-flex items-center gap-1.5 rounded-full border border-ink-600 px-3.5 py-2 text-xs font-medium text-paper-300 transition hover:border-ink-500 hover:text-paper-50"
          >
            <Shuffle className="h-3.5 w-3.5" strokeWidth={2} />
            {codeTouched ? "Régénérer" : "Un autre"}
          </button>
          <span className="font-mono text-xs text-paper-600">{previewUrl}</span>
        </div>
      </div>

      {error && (
        <div className="mt-5 flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          <AlertCircle className="h-4 w-4 shrink-0" strokeWidth={2} />
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="mt-8 w-full rounded-xl bg-ember-500 py-3.5 text-sm font-semibold text-ink-950 transition hover:bg-ember-400 active:scale-[0.99] disabled:opacity-60"
      >
        {submitting ? "Publication…" : "Publier l'extrait"}
      </button>
    </motion.form>
  );
}

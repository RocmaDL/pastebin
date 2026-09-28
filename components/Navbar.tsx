"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { PenLine, Search, Library } from "lucide-react";
import { sanitizeCode } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [query, setQuery] = useState("");

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const code = sanitizeCode(query);
    if (code) {
      router.push(`/p/${code}`);
      setQuery("");
    }
  }

  return (
    <header className="sticky top-0 z-50 border-b border-ink-700/60 bg-ink-950">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5">
        <Link
          href="/"
          className="font-display text-xl italic tracking-tight text-paper-50 transition hover:text-ember-400"
        >
          Verso
        </Link>

        <form
          onSubmit={handleSearch}
          className="hidden flex-1 max-w-sm items-center gap-2 rounded-full border border-ink-600 bg-ink-900 px-4 py-2 text-sm transition focus-within:border-ember-500/60 sm:flex"
        >
          <Search className="h-4 w-4 shrink-0 text-paper-600" strokeWidth={1.75} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ouvrir un extrait par son code…"
            className="w-full bg-transparent text-paper-100 placeholder:text-paper-600 focus:outline-none"
          />
        </form>

        <nav className="flex items-center gap-2">
          <Link
            href="/mes-extraits"
            className={`hidden items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-medium transition sm:flex ${
              pathname === "/mes-extraits"
                ? "bg-ink-800 text-paper-50"
                : "text-paper-400 hover:bg-ink-900 hover:text-paper-100"
            }`}
          >
            <Library className="h-4 w-4" strokeWidth={1.75} />
            Mes extraits
          </Link>
          <Link
            href="/creer"
            className="inline-flex items-center gap-1.5 rounded-full bg-ember-500 px-4 py-2 text-sm font-semibold text-ink-950 transition hover:bg-ember-400 active:scale-[0.98]"
          >
            <PenLine className="h-4 w-4" strokeWidth={2} />
            Écrire
          </Link>
        </nav>
      </div>
    </header>
  );
}

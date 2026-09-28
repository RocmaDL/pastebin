"use client";

import type { Paste } from "./types";

const STORAGE_KEY = "verso:pastes";

type Store = Record<string, Paste>;

function readStore(): Store {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Store) : {};
  } catch {
    return {};
  }
}

function writeStore(store: Store) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
}

export class PasteExistsError extends Error {
  constructor(code: string) {
    super(`Un extrait existe déjà avec le code "${code}".`);
    this.name = "PasteExistsError";
  }
}

export function getAllPastes(): Paste[] {
  const store = readStore();
  return Object.values(store).sort((a, b) => b.createdAt - a.createdAt);
}

export function getPaste(code: string): Paste | null {
  const store = readStore();
  return store[code] ?? null;
}

export function savePaste(paste: Paste): void {
  const store = readStore();
  if (store[paste.code]) {
    throw new PasteExistsError(paste.code);
  }
  store[paste.code] = paste;
  writeStore(store);
}

export function deletePaste(code: string): void {
  const store = readStore();
  delete store[code];
  writeStore(store);
}

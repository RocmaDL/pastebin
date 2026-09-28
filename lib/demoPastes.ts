import type { Paste } from "./types";

/**
 * Extraits de démonstration, affichés sur la page d'accueil et consultables
 * comme n'importe quel extrait. Ils ne sont jamais écrits dans le
 * localStorage : ils vivent uniquement ici, en dur.
 */
export const DEMO_PASTES: Paste[] = [
  {
    code: "demo-haiku",
    title: "Trois lignes, un matin",
    language: "plaintext",
    content: `Brume sur le toit —
la ville n'a pas encore
choisi son bruit`,
    createdAt: new Date("2026-01-14T08:12:00Z").getTime(),
  },
  {
    code: "demo-palette",
    title: "Palette d'interface",
    language: "css",
    content: `:root {
  --ink-950: #08070a;
  --paper-50: #faf8f5;
  --ember-500: #e8873a;
  --moss-500: #7fb586;
}

.card {
  background: var(--ink-900);
  border: 1px solid var(--ink-700);
  border-radius: 1.25rem;
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.card:hover {
  transform: translateY(-4px);
}`,
    createdAt: new Date("2026-02-02T17:40:00Z").getTime(),
  },
  {
    code: "demo-config",
    title: "Configuration d'un thème",
    language: "json",
    content: `{
  "nom": "verso",
  "mode": "sombre",
  "accent": "ember",
  "typographie": {
    "titre": "Fraunces",
    "texte": "General Sans"
  },
  "mouvement": "discret"
}`,
    createdAt: new Date("2026-02-20T09:05:00Z").getTime(),
  },
  {
    code: "demo-script",
    title: "Petit générateur de citation",
    language: "python",
    content: `import random

citations = [
    "Écrire, c'est choisir.",
    "La page blanche n'existe pas, elle attend.",
    "Un bon texte se relit à voix basse.",
]

def citation_du_jour() -> str:
    return random.choice(citations)

if __name__ == "__main__":
    print(citation_du_jour())`,
    createdAt: new Date("2026-03-03T11:30:00Z").getTime(),
  },
];

export function getDemoPaste(code: string): Paste | null {
  return DEMO_PASTES.find((p) => p.code === code) ?? null;
}

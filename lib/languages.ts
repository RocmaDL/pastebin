import type { PasteLanguage } from "./types";

export const LANGUAGES: { value: PasteLanguage; label: string }[] = [
  { value: "plaintext", label: "Texte brut" },
  { value: "markdown", label: "Markdown" },
  { value: "javascript", label: "JavaScript" },
  { value: "typescript", label: "TypeScript" },
  { value: "jsx", label: "JSX" },
  { value: "tsx", label: "TSX" },
  { value: "python", label: "Python" },
  { value: "json", label: "JSON" },
  { value: "css", label: "CSS" },
  { value: "bash", label: "Bash" },
  { value: "sql", label: "SQL" },
  { value: "yaml", label: "YAML" },
  { value: "go", label: "Go" },
  { value: "rust", label: "Rust" },
  { value: "java", label: "Java" },
];

export function languageLabel(value: PasteLanguage): string {
  return LANGUAGES.find((l) => l.value === value)?.label ?? "Texte brut";
}

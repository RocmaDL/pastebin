export type PasteLanguage =
  | "plaintext"
  | "markdown"
  | "javascript"
  | "typescript"
  | "jsx"
  | "tsx"
  | "python"
  | "json"
  | "css"
  | "bash"
  | "sql"
  | "yaml"
  | "go"
  | "rust"
  | "java";

export interface Paste {
  code: string;
  title: string;
  content: string;
  language: PasteLanguage;
  createdAt: number;
}

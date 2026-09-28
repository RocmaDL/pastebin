"use client";

import { Highlight, themes, type PrismTheme } from "prism-react-renderer";
import type { PasteLanguage } from "@/lib/types";

const versoTheme: PrismTheme = {
  ...themes.nightOwl,
  plain: {
    color: "#f1ece4",
    backgroundColor: "transparent",
  },
  styles: [
    ...themes.nightOwl.styles,
    { types: ["comment"], style: { color: "#6b6478", fontStyle: "italic" } },
    { types: ["keyword", "operator"], style: { color: "#f2a65a" } },
    { types: ["string", "char"], style: { color: "#9ecb9e" } },
    { types: ["function", "class-name"], style: { color: "#e8c988" } },
    { types: ["number", "boolean"], style: { color: "#c9a6f5" } },
    { types: ["punctuation"], style: { color: "#8a7f74" } },
  ],
};

const PRISM_ALIAS: Record<PasteLanguage, string> = {
  plaintext: "plaintext",
  markdown: "markdown",
  javascript: "javascript",
  typescript: "typescript",
  jsx: "jsx",
  tsx: "tsx",
  python: "python",
  json: "json",
  css: "css",
  bash: "bash",
  sql: "sql",
  yaml: "yaml",
  go: "go",
  rust: "rust",
  java: "java",
};

export function CodeBlock({
  code,
  language,
  showLineNumbers = true,
}: {
  code: string;
  language: PasteLanguage;
  showLineNumbers?: boolean;
}) {
  return (
    <Highlight theme={versoTheme} code={code} language={PRISM_ALIAS[language]}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre
          className={`${className} scrollbar-thin overflow-x-auto p-6 font-mono text-[13px] leading-relaxed`}
          style={{ ...style, backgroundColor: "transparent" }}
        >
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line })} className="table-row">
              {showLineNumbers && (
                <span className="table-cell select-none pr-5 text-right text-paper-600/50">
                  {i + 1}
                </span>
              )}
              <span className="table-cell whitespace-pre-wrap break-words">
                {line.map((token, j) => (
                  <span key={j} {...getTokenProps({ token })} />
                ))}
              </span>
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
}

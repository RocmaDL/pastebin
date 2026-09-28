export function ShowcaseBadge({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-baseline gap-2 border-l-2 border-ember-500/50 pl-3 text-[13px] leading-snug text-paper-500 ${className}`}
    >
      <span className="font-display italic text-ember-400">Démonstration</span>
      — vos extraits restent dans ce navigateur, rien n&rsquo;est envoyé ailleurs.
    </span>
  );
}

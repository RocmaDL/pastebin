export function Footer() {
  return (
    <footer className="border-t border-ink-700/60">
      <div className="mx-auto max-w-6xl px-5 py-10">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <p className="font-display text-lg italic text-paper-200">Verso</p>
          <p className="max-w-md text-sm leading-relaxed text-paper-600">
            Site de démonstration. Chaque extrait est conservé uniquement dans
            le stockage local de votre navigateur — rien n&rsquo;est envoyé ni
            partagé au-delà de cet appareil.
          </p>
        </div>
      </div>
    </footer>
  );
}

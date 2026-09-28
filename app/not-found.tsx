import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-2xl flex-col items-center px-5 py-28 text-center">
      <p className="font-display text-7xl text-ink-600">404</p>
      <h1 className="mt-4 font-display text-3xl text-paper-50">Cette page n&rsquo;existe pas.</h1>
      <p className="mt-3 max-w-sm text-sm leading-relaxed text-paper-500">
        Vérifiez le lien, ou repartez de l&rsquo;accueil.
      </p>
      <Link
        href="/"
        className="mt-7 inline-flex items-center gap-2 rounded-full bg-ember-500 px-5 py-2.5 text-sm font-semibold text-ink-950 transition hover:bg-ember-400"
      >
        Retour à l&rsquo;accueil
      </Link>
    </section>
  );
}

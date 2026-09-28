import { LocalHistoryList } from "@/components/LocalHistoryList";
import { ShowcaseBadge } from "@/components/ShowcaseBadge";

export default function MesExtraitsPage() {
  return (
    <section className="mx-auto max-w-3xl px-5 py-16 sm:py-20">
      <ShowcaseBadge />
      <h1 className="mt-4 font-display text-4xl text-paper-50 sm:text-5xl">Mes extraits</h1>
      <p className="mt-3 max-w-lg text-[15px] leading-relaxed text-paper-400">
        L&rsquo;historique de ce que vous avez écrit sur cet appareil, le plus
        récent en premier.
      </p>

      <div className="mt-10">
        <LocalHistoryList />
      </div>
    </section>
  );
}

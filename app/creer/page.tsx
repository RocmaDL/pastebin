import { PasteEditor } from "@/components/PasteEditor";

export default function CreerPage() {
  return (
    <section className="mx-auto max-w-3xl px-5 py-16 sm:py-20">
      <p className="font-display text-lg italic text-ember-400/90">Nouvel extrait</p>
      <h1 className="mt-2 font-display text-4xl text-paper-50 sm:text-5xl">
        Posez vos mots.
      </h1>
      <p className="mt-3 max-w-lg text-[15px] leading-relaxed text-paper-400">
        Ce que vous écrivez ici reste sur cet appareil, dans le stockage
        local de votre navigateur.
      </p>

      <div className="mt-10">
        <PasteEditor />
      </div>
    </section>
  );
}

import { PasteViewer } from "@/components/PasteViewer";

export default async function PastePage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  return (
    <section className="mx-auto max-w-3xl px-5 py-16 sm:py-20">
      <PasteViewer code={code} />
    </section>
  );
}

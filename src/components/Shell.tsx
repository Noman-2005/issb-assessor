import Link from "next/link";

export default function Shell({
  title,
  back,
  backLabel = "Back",
  children,
}: {
  title: string;
  back?: string;
  backLabel?: string;
  children: React.ReactNode;
}) {
  return (
    <main className="mx-auto max-w-3xl px-5 pb-20 pt-8 sm:pt-12">
      {back && (
        <Link href={back} className="text-sm font-medium text-stone-500 transition hover:text-black">
          ← {backLabel}
        </Link>
      )}
      <h1 className="mb-6 mt-3 font-serif text-3xl font-bold sm:text-4xl">{title}</h1>
      {children}
    </main>
  );
}
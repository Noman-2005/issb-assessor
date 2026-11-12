import Link from "next/link";

export default function Shell({
  title,
  subtitle,
  eyebrow,
  back,
  backLabel = "Back",
  children,
}: {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  back?: string;
  backLabel?: string;
  children: React.ReactNode;
}) {
  return (
    <main className="mx-auto max-w-2xl px-4 pb-16 pt-5 sm:px-5 sm:pt-8">
      {back && (
        <Link
          href={back}
          className="inline-flex items-center gap-1.5 rounded-full border border-stone-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-stone-600 transition hover:-translate-x-0.5 hover:border-black hover:text-black"
        >
          ← {backLabel}
        </Link>
      )}

      <header className="rise mt-5">
        {eyebrow && (
          <div className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.25em] text-stone-500">
            <span className="flex gap-1">
              <i className="h-1.5 w-1.5 rounded-full bg-[#e11d2e]" />
              <i className="h-1.5 w-1.5 rounded-full bg-[#0b1f5c]" />
              <i className="h-1.5 w-1.5 rounded-full bg-[#4da6ff]" />
            </span>
            {eyebrow}
          </div>
        )}
        <h1 className="font-serif text-3xl font-bold leading-tight sm:text-4xl">{title}</h1>
        {subtitle && <p className="mt-1.5 text-sm text-stone-500">{subtitle}</p>}
        <div className="mt-4 h-[3px] w-20 rounded bg-gradient-to-r from-[#e11d2e] via-[#0b1f5c] to-[#4da6ff]" />
      </header>

      <div className="mt-6">{children}</div>
    </main>
  );
}
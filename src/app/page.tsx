import Link from "next/link";
import Image from "next/image";

const logos = [
  { src: "/logos/swords.jpg", c: "#e11d2e", alt: "Swords" },
  { src: "/logos/anchor.jpg", c: "#0b1f5c", alt: "Anchor" },
  { src: "/logos/eagle.jpg", c: "#4da6ff", alt: "Eagle" },
];

export default function Landing() {
  return (
    <main className="mx-auto flex min-h-[100dvh] max-w-3xl flex-col items-center justify-center px-5 py-14 text-center">
                  <Link
        href="/about-issb"
        className="group fixed right-4 top-4 z-20 rounded-full bg-gradient-to-r from-[#e11d2e] via-[#0b1f5c] to-[#4da6ff] p-[1.5px] shadow-[0_10px_24px_-12px_rgba(11,31,92,.7)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_28px_-12px_rgba(225,29,46,.6)] active:scale-95 sm:right-6 sm:top-6"
      >
        <span className="flex items-center gap-1.5 rounded-full bg-white px-4 py-1.5 text-[11px] font-bold uppercase tracking-[.16em] text-[#0b1f5c] transition duration-300 group-hover:bg-[#0b1f5c] group-hover:text-white">
          About ISSB
          
        </span>
      </Link>
      <h1 className="font-serif text-6xl font-extrabold leading-none tracking-tight sm:text-8xl">
        ISSB
        <span className="mt-3 block text-lg font-semibold uppercase tracking-[.45em] text-stone-500 sm:text-2xl sm:tracking-[.5em]">
          Assessor
        </span>
      </h1>

      <div className="my-7 h-[3px] w-40 rounded bg-gradient-to-r from-[#e11d2e] via-[#0b1f5c] to-[#4da6ff]" />

      <div className="my-10 flex items-center justify-center gap-4 sm:my-12 sm:gap-10">
        {logos.map((l) => (
          <div
            key={l.alt}
            className="relative grid h-24 w-24 place-items-center rounded-full p-5 transition duration-500 hover:-translate-y-2 hover:scale-105 sm:h-36 sm:w-36 sm:p-6"
            style={{
              background: `radial-gradient(circle at 50% 38%, ${l.c}38, transparent 68%)`,
              boxShadow: `inset 0 0 0 1px ${l.c}73, 0 30px 50px -28px ${l.c}`,
            }}
          >
            <span
              className="pointer-events-none absolute -inset-2 animate-[spin_40s_linear_infinite] rounded-full border border-dashed"
              style={{ borderColor: `${l.c}66` }}
            />
            <Image src={l.src} alt={l.alt} width={110} height={110} className="object-contain mix-blend-multiply" priority />
          </div>
        ))}
      </div>

      <p className="text-[11px] font-semibold uppercase tracking-[.22em] text-stone-500 sm:text-xs sm:tracking-[.28em]">
        Preparation for the ISSB with <b className="font-extrabold text-[#e11d2e]">Precision</b>
      </p>

      <Link
        href="/dashboard"
        className="mt-8 rounded-full bg-black px-9 py-4 text-sm font-semibold uppercase tracking-[.18em] text-white transition hover:-translate-y-0.5 hover:shadow-[0_0_0_5px_rgba(77,166,255,.35)] active:scale-95"
      >
        Get Started →
      </Link>

      <p className="mx-auto mt-9 max-w-md text-[11px] leading-relaxed text-stone-500">
        ISSB Assessor is an independent practice tool. It is not affiliated with, endorsed by, or connected to the Bangladesh Armed Forces or the ISSB.
      </p>
    </main>
  );
}
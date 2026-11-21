import Link from "next/link";
import Image from "next/image";

const logos = [
  { src: "/logos/swords.jpg", c: "#e11d2e", alt: "Swords" },
  { src: "/logos/anchor.jpg", c: "#0b1f5c", alt: "Anchor" },
  { src: "/logos/eagle.jpg", c: "#4da6ff", alt: "Eagle" },
];

const silhouettes = [
  {
    src: "/silhouettes/bma.png",
    alt: "BMA silhouette",
    w: 1212,
    h: 566,
    cls: "w-[24%]",
  },
  {
    src: "/silhouettes/bna.png",
    alt: "BNA silhouette",
    w: 1908,
    h: 362,
    cls: "w-[40%]",
  },
  {
    src: "/silhouettes/bafa.png",
    alt: "BAFA silhouette",
    w: 2000,
    h: 982,
    cls: "w-[24%]",
  },
];

function CornerMark() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 490 465"
      className="pointer-events-none absolute left-0 top-0 z-20 h-auto w-14 sm:w-24"
    >
      <g
        transform="translate(4 4)"
        fill="#3b8a2e"
        stroke="#111"
        strokeWidth="8"
        strokeLinejoin="miter"
      >
        <polygon points="0,0 391,0 300,91 80,91 80,323 0,403" />
        <polygon points="36,36 466,36 355,147 166,147 166,314 36,444" />
      </g>
    </svg>
  );
}

export default function Landing() {
  return (
    <div className="relative">
      <CornerMark />
      <Link
        href="/about-issb"
        className="group absolute right-3 top-3 z-20 rounded-full bg-gradient-to-r from-[#e11d2e] via-[#0b1f5c] to-[#4da6ff] p-[1.5px] shadow-[0_8px_20px_-12px_rgba(11,31,92,.7)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_24px_-12px_rgba(225,29,46,.6)] active:scale-95 sm:right-5 sm:top-5"
      >
        <span className="flex items-center rounded-full bg-white px-2.5 py-[3px] text-[8.5px] font-bold uppercase tracking-[.12em] text-[#0b1f5c] transition duration-300 group-hover:bg-[#0b1f5c] group-hover:text-white">
          About ISSB
        </span>
      </Link>

      <main className="mx-auto flex min-h-[100dvh] max-w-3xl flex-col items-center justify-center px-5 py-14 text-center">
        <h1 className="font-serif text-6xl font-extrabold leading-none tracking-tight sm:text-8xl">
          ISSB
          <span className="mt-3 block text-lg font-semibold uppercase tracking-[.45em] text-stone-500 sm:text-2xl sm:tracking-[.5em]">
            Assessor
          </span>
        </h1>

        <p className="mt-7 text-[11px] font-bold uppercase tracking-[.36em] text-[#0b1f5c] sm:mt-8 sm:text-sm sm:tracking-[.5em]">
          Shaping Future <span className="text-[#e11d2e]">Leaders</span>
        </p>

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
          className="mt-8 rounded-full bg-black px-5 py-2 text-[10.5px] font-semibold uppercase tracking-[.14em] text-white transition hover:-translate-y-0.5 hover:shadow-[0_0_0_4px_rgba(77,166,255,.35)] active:scale-95"
        >
          Get Started →
        </Link>

        <div className="rise mt-14 flex w-full max-w-xl items-end justify-between sm:mt-20">
          {silhouettes.map((s) => (
            <Image
              key={s.alt}
              src={s.src}
              alt={s.alt}
              width={s.w}
              height={s.h}
              sizes="(min-width: 640px) 240px, 40vw"
              className={`block h-auto select-none ${s.cls}`}
              draggable={false}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
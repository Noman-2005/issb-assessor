import Image from "next/image";

const forces = [
  {
    name: "Army",
    src: "/forces/army.jpeg",
    color: "#e11d2e",
    w: 1600,
    h: 914,
  },
  {
    name: "Navy",
    src: "/forces/navy.jpeg",
    color: "#0b1f5c",
    w: 1600,
    h: 1017,
  },
  {
    name: "Air Force",
    src: "/forces/airforce.jpeg",
    color: "#4da6ff",
    w: 1600,
    h: 1066,
  },
];

export default function OathSection() {
  return (
    <section className="mt-16 sm:mt-24">
      <h2 className="text-center font-serif uppercase">
        <span className="block text-[11px] font-semibold tracking-[.55em] text-stone-500 sm:text-sm">
          Are you ready
        </span>

        <span className="mt-5 block text-[26px] font-semibold leading-[1.3] tracking-[.16em] text-[#0b1f5c] sm:mt-7 sm:text-5xl sm:tracking-[.2em]">
          to take the
          <br />
          <span className="relative mt-1 inline-block sm:mt-2">
            oath?
                        <span className="absolute -bottom-2 left-0 flex h-[3px] w-full overflow-hidden rounded-full sm:-bottom-3">
              <i className="h-full flex-1 bg-[#e11d2e]" />
              <i className="h-full flex-1 bg-[#0b1f5c]" />
              <i className="h-full flex-1 bg-[#4da6ff]" />
            </span>
          </span>
        </span>
      </h2>

      <div className="mt-14 space-y-8 sm:mt-20 sm:space-y-10">
        {forces.map((f) => (
          <figure
            key={f.name}
            className="group overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-[0_22px_48px_-28px_rgba(0,0,0,.6)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_30px_60px_-28px_rgba(0,0,0,.7)]"
          >
            <div className="relative">
              <Image
                src={f.src}
                alt={`${f.name} passing out parade`}
                width={f.w}
                height={f.h}
                sizes="(max-width: 672px) 100vw, 672px"
                className="block h-auto w-full"
                draggable={false}
              />
              <span
                className="absolute inset-x-0 bottom-0 h-1"
                style={{ background: f.color }}
              />
            </div>

            <figcaption className="flex items-center gap-2.5 px-4 py-3">
                            <i
                className="h-2.5 w-2.5 rounded-full"
                style={{ background: f.color }}
              />
              <span className="text-[11px] font-bold uppercase tracking-[.28em] text-stone-700">
                {f.name}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
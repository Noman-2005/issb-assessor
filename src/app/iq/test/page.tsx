import Shell from "@/components/Shell";

const parts = [
  { n: "01", t: "Verbal IQ", d: "100 questions · 60 minutes", c: "#0b1f5c" },
  { n: "02", t: "Non-Verbal IQ", d: "36 questions · 18 minutes", c: "#4da6ff" },
];

export default function TakeTest() {
  return (
    <Shell
      eyebrow="Mock assessment"
      title="Take Test"
      subtitle="Full timed test with a review panel at the end."
      back="/iq"
      backLabel="IQ"
    >
      <div className="grid gap-3">
        {parts.map((p, i) => (
          <div
            key={p.n}
            className="rise flex items-center gap-4 rounded-2xl border border-stone-200 bg-white p-4"
            style={{ animationDelay: `${0.08 + i * 0.07}s` }}
          >
            <span className="font-serif text-3xl font-bold" style={{ color: p.c }}>{p.n}</span>
            <div>
              <b className="block font-serif text-lg leading-snug">{p.t}</b>
              <p className="text-xs text-stone-500 sm:text-sm">{p.d}</p>
            </div>
          </div>
        ))}
        <p className="rise rounded-2xl border border-dashed border-[#e11d2e]/40 bg-white p-4 text-sm text-stone-600" style={{ animationDelay: ".25s" }}>
          <b className="text-[#e11d2e]">Coming soon.</b> The review panel will show your score and a short explanation for every wrong answer.
        </p>
      </div>
    </Shell>
  );
}
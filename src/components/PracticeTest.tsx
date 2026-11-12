"use client";
import { useState } from "react";
import Link from "next/link";

type Question = { q: string; options: string[]; answer: number; explanation: string };
const L = ["A", "B", "C", "D", "E", "F"];

export default function PracticeTest({
  title,
  questions,
  back,
}: {
  title: string;
  questions: Question[];
  back: string;
}) {
  const [ans, setAns] = useState<Record<number, number>>({});
  const [done, setDone] = useState(false);
  const [onlyWrong, setOnlyWrong] = useState(false);

  const total = questions.length;
  const answered = Object.keys(ans).length;
  const score = questions.filter((q, i) => ans[i] === q.answer).length;
  const pct = Math.round((score / total) * 100);
  const circ = 2 * Math.PI * 18;

  const top = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const check = () => { setDone(true); top(); };
  const retry = () => { setAns({}); setDone(false); setOnlyWrong(false); top(); };

  const visible = questions.map((_, i) => i).filter((i) => !(done && onlyWrong) || ans[i] !== questions[i].answer);

  return (
    <main className="mx-auto max-w-3xl px-4 pb-32 sm:px-5">
      {/* sticky top bar */}
      <div className="sticky top-0 z-10 -mx-4 bg-[#fafaf9]/90 pt-[env(safe-area-inset-top)] backdrop-blur sm:-mx-5">
        <div className="h-1 bg-stone-200">
          <div
            className="h-full bg-gradient-to-r from-[#e11d2e] via-[#2547b8] to-[#4da6ff] transition-all duration-300"
            style={{ width: `${done ? 100 : (answered / total) * 100}%` }}
          />
        </div>
        <div className="flex items-center justify-between px-4 py-2 text-xs sm:px-5">
          <Link href={back} className="font-semibold text-stone-500 transition hover:text-black">← Model Tests</Link>
          <span className="rounded-full bg-black px-3 py-1 font-semibold text-white">
            {done ? `${score}/${total}` : `${answered}/${total}`}
          </span>
        </div>
      </div>

      <h1 className="mb-4 mt-4 font-serif text-3xl font-bold sm:text-4xl">{title}</h1>

           {/* compact scoreboard */}
      {done && (
        <div className="rise relative mb-5 overflow-hidden rounded-2xl bg-[#0b1f5c] p-4 text-white shadow-[0_20px_40px_-24px_#0b1f5c]">
          <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#e11d2e] via-white/70 to-[#4da6ff]" />
          <div className="flex items-center gap-4">
            <div className="relative h-14 w-14 shrink-0">
              <svg viewBox="0 0 44 44" className="h-14 w-14 -rotate-90">
                <circle cx="22" cy="22" r="18" fill="none" stroke="rgba(255,255,255,.18)" strokeWidth="4" />
                <circle cx="22" cy="22" r="18" fill="none" stroke="#4da6ff" strokeWidth="4" strokeLinecap="round"
                  strokeDasharray={circ} strokeDashoffset={circ - (circ * pct) / 100} />
              </svg>
              <span className="absolute inset-0 grid place-items-center text-[11px] font-bold">{pct}%</span>
            </div>

            <div className="min-w-0 flex-1">
              <div className="text-[10px] font-semibold uppercase tracking-[.25em] text-white/60">Your Score</div>
              <div className="leading-none">
                <span className="font-serif text-3xl font-bold">{score}</span>
                <span className="text-sm text-white/60"> / {total}</span>
              </div>
              <div className="mt-1.5 flex gap-2 text-[11px] font-semibold">
                <span className="rounded-full bg-green-500/25 px-2 py-0.5 text-green-300">✓ {score}</span>
                <span className="rounded-full bg-[#e11d2e]/35 px-2 py-0.5 text-red-200">✗ {total - score}</span>
              </div>
            </div>

            <div className="flex shrink-0 flex-col gap-2">
              <button
                onClick={retry}
                className="rounded-full bg-[#4da6ff] px-4 py-2 text-[11px] font-bold uppercase tracking-[.15em] text-[#0b1f5c] transition hover:brightness-110 active:scale-95"
              >
                Retry
              </button>
              <button
                onClick={() => setOnlyWrong(!onlyWrong)}
                className={`rounded-full bg-[#e11d2e] px-4 py-2 text-[11px] font-bold uppercase tracking-[.15em] text-white transition hover:brightness-110 active:scale-95 ${
                  onlyWrong ? "ring-2 ring-white ring-offset-2 ring-offset-[#0b1f5c]" : ""
                }`}
              >
                Wrong only
              </button>
            </div>
          </div>
        </div>
      )}

      {visible.length === 0 && (
        <div className="rounded-2xl border border-green-600 bg-green-50 p-6 text-center font-semibold text-green-700">
          Perfect score. No wrong answers!
        </div>
      )}

      {visible.map((i) => {
        const q = questions[i];
        const correct = ans[i] === q.answer;
        const skipped = ans[i] === undefined;
        return (
          <section
            key={i}
            className={`mb-4 rounded-2xl border bg-white p-4 shadow-[0_10px_30px_-22px_rgba(0,0,0,.5)] transition sm:p-5 ${
              done ? (correct ? "border-green-600" : "border-[#e11d2e]") : "border-stone-200"
            }`}
          >
            <div className="mb-4 flex gap-3">
              <span
                className={`grid h-8 min-w-8 place-items-center rounded-lg px-2 text-xs font-bold text-white ${
                  done ? (correct ? "bg-green-600" : "bg-[#e11d2e]") : "bg-black"
                }`}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="pt-0.5 font-semibold leading-relaxed">{q.q}</p>
            </div>

            {q.options.map((o, j) => {
              const picked = ans[i] === j;
              let cls = "border-stone-200 hover:border-[#4da6ff] hover:bg-sky-50/60";
              let badge = "bg-stone-100 text-stone-600";
              if (!done && picked) { cls = "border-[#0b1f5c] bg-[#0b1f5c] text-white shadow-[0_10px_24px_-12px_#0b1f5c]"; badge = "bg-[#4da6ff] text-black"; }
              if (done && j === q.answer) { cls = "border-green-600 bg-green-50"; badge = "bg-green-600 text-white"; }
              if (done && picked && j !== q.answer) { cls = "border-[#e11d2e] bg-red-50"; badge = "bg-[#e11d2e] text-white"; }
              return (
                <button
                  key={j}
                  disabled={done}
                  onClick={() => setAns({ ...ans, [i]: j })}
                  className={`mt-2 flex min-h-12 w-full items-center gap-3 rounded-xl border px-3 py-2.5 text-left transition active:scale-[.99] ${cls}`}
                >
                  <b className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs ${badge}`}>{L[j]}</b>
                  <span className="flex-1">{o}</span>
                  {done && j === q.answer && <span className="font-bold text-green-600">✓</span>}
                  {done && picked && j !== q.answer && <span className="font-bold text-[#e11d2e]">✗</span>}
                </button>
              );
            })}

            {/* explanation only for wrong or unanswered */}
            {done && !correct && (
              <div className="mt-3 overflow-hidden rounded-xl border border-[#4da6ff]/40 bg-sky-50 text-sm leading-relaxed">
                <div className="h-[3px] bg-gradient-to-r from-[#e11d2e] via-[#2547b8] to-[#4da6ff]" />
                <div className="p-3">
                  {skipped && <p className="mb-1 text-xs font-bold uppercase tracking-wider text-[#e11d2e]">Not answered</p>}
                  <b className="text-[#0b1f5c]">Explanation:</b> {q.explanation}
                </div>
              </div>
            )}
          </section>
        );
      })}

      {!done && (
        <div className="fixed inset-x-0 bottom-0 z-20 border-t border-stone-200 bg-white/90 px-4 pb-[max(env(safe-area-inset-bottom),12px)] pt-3 backdrop-blur">
          <div className="mx-auto max-w-3xl">
            <button
              onClick={check}
              className="w-full rounded-full bg-black py-4 text-sm font-semibold uppercase tracking-[.18em] text-white transition hover:shadow-[0_0_0_5px_rgba(77,166,255,.35)] active:scale-[.99]"
            >
              Check Answers · {answered}/{total}
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
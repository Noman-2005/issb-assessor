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

  const answered = Object.keys(ans).length;
  const score = questions.filter((q, i) => ans[i] === q.answer).length;
  const pct = (answered / questions.length) * 100;

  const top = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const check = () => { setDone(true); top(); };
  const retry = () => { setAns({}); setDone(false); top(); };

  return (
    <main className="mx-auto max-w-3xl px-4 pb-28 sm:px-5">
      <div className="sticky top-0 z-10 -mx-4 bg-[#fafaf9]/90 pt-[env(safe-area-inset-top)] backdrop-blur sm:-mx-5">
        <div className="h-1 bg-stone-200">
          <div
            className="h-full bg-gradient-to-r from-[#e11d2e] via-[#0b1f5c] to-[#4da6ff] transition-all duration-300"
            style={{ width: `${done ? 100 : pct}%` }}
          />
        </div>
        <div className="flex items-center justify-between px-4 py-2 text-xs text-stone-500 sm:px-5">
          <Link href={back} className="font-medium hover:text-black">← Model Tests</Link>
          <span>{done ? `Score ${score}/${questions.length}` : `${answered}/${questions.length} answered`}</span>
        </div>
      </div>

      <h1 className="mb-5 mt-4 font-serif text-3xl font-bold sm:text-4xl">{title}</h1>

      {done && (
        <div className="mb-6 rounded-2xl bg-black p-7 text-center text-white">
          <div className="text-xs uppercase tracking-[.25em] opacity-70">Your Score</div>
          <div className="mt-1 font-serif text-5xl font-bold">
            {score}/{questions.length}
          </div>
          <div className="mt-2 text-sm opacity-70">
            <span className="text-green-400">{score} correct</span> · <span className="text-red-400">{questions.length - score} wrong</span>
          </div>
          <button onClick={retry} className="mt-5 rounded-full border border-white/30 px-6 py-2.5 text-xs font-semibold uppercase tracking-[.18em] transition hover:bg-white hover:text-black">
            Try Again
          </button>
        </div>
      )}

      {questions.map((q, i) => {
        const correct = ans[i] === q.answer;
        const skipped = ans[i] === undefined;
        return (
          <section
            key={i}
            className={`mb-4 rounded-2xl border bg-white p-4 shadow-[0_10px_30px_-22px_rgba(0,0,0,.5)] sm:p-5 ${
              done ? (correct ? "border-green-600" : "border-[#e11d2e]") : "border-stone-200"
            }`}
          >
            <p className="mb-3 font-semibold leading-relaxed">
              <span className="mr-2 text-stone-400">{String(i + 1).padStart(2, "0")}</span>
              {q.q}
            </p>

            {q.options.map((o, j) => {
              let cls = "border-stone-200 hover:border-[#0b1f5c]";
              if (!done && ans[i] === j) cls = "border-[#0b1f5c] bg-[#0b1f5c] text-white";
              if (done && j === q.answer) cls = "border-green-600 bg-green-50";
              if (done && ans[i] === j && j !== q.answer) cls = "border-[#e11d2e] bg-red-50";
              return (
                <button
                  key={j}
                  disabled={done}
                  onClick={() => setAns({ ...ans, [i]: j })}
                  className={`mt-2 flex min-h-12 w-full items-center gap-3 rounded-xl border px-4 py-3 text-left transition active:scale-[.99] ${cls}`}
                >
                  <b className="w-5 shrink-0">{L[j]}</b>
                  <span className="flex-1">{o}</span>
                  {done && j === q.answer && <span className="font-bold text-green-600">✓</span>}
                  {done && ans[i] === j && j !== q.answer && <span className="font-bold text-[#e11d2e]">✗</span>}
                </button>
              );
            })}

            {done && (
              <div className="mt-3 rounded-xl bg-sky-50 p-3 text-sm leading-relaxed">
                {skipped && <p className="mb-1 font-semibold text-[#e11d2e]">Not answered</p>}
                <b>Explanation:</b> {q.explanation}
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
              Check Answers
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
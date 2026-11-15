"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Shell from "@/components/Shell";
import { createAudioContext, playBlast } from "@/lib/blastSound";
import { pickWatWords, WAT_WORD_COUNT } from "@/lib/wat";
import { WAT_WORDS } from "@/data/wat/words";

const WORD_SECONDS = 10;
const READY_SECONDS = 3; // set to 0 to remove the "Get ready" countdown
const FINAL_SECONDS = 10;
const RING = 276.5; // circumference of the timer ring (r = 44)

type Stage = "ready" | "word" | "final";
type View = { stage: Stage; index: number; remaining: number };

const instructions = [
  "Words appear on the screen one at a time, for 10 seconds each.",
  "Write one meaningful sentence for every word on your own answer sheet, in serial order.",
  "If you cannot finish in time, leave that serial number blank and move on to the next word.",
  "Do not overthink. Write your first, natural and honest reaction as a sentence.",
  "Keep it short and simple, so you can finish within the time.",
  "A blast sound marks every new word. It also means your time for the previous word is over.",
  "After the last word you get 10 more seconds, then the test ends.",
];

const badgeColors = ["#e11d2e", "#0b1f5c", "#4da6ff"];

export default function WordAssociationTest() {
  const [phase, setPhase] = useState<"intro" | "running" | "done">("intro");
  const [words, setWords] = useState<string[]>([]);
  const [view, setView] = useState<View>({
    stage: "ready",
    index: -1,
    remaining: READY_SECONDS,
  });
  const [soundOn, setSoundOn] = useState(true);

  const audioRef = useRef<AudioContext | null>(null);
  const soundRef = useRef(true);
  const startRef = useRef(0);
  const timerRef = useRef<number | null>(null);
  const lastKeyRef = useRef("");
  const wakeRef = useRef<WakeLockSentinel | null>(null);

  useEffect(() => {
    soundRef.current = soundOn;
  }, [soundOn]);

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) window.clearInterval(timerRef.current);
      wakeRef.current?.release().catch(() => {});
    };
  }, []);

  // Audio must be created inside a click so the browser allows sound.
  function ensureAudio() {
    if (!audioRef.current) audioRef.current = createAudioContext();
    const ctx = audioRef.current;
    if (ctx && ctx.state === "suspended") void ctx.resume();
    return ctx;
  }

  function blast() {
    if (!soundRef.current) return;
    if (audioRef.current) playBlast(audioRef.current);
  }

  function stopTimer() {
    if (timerRef.current !== null) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }

  async function lockScreen() {
    try {
      if ("wakeLock" in navigator) {
        wakeRef.current = await navigator.wakeLock.request("screen");
      }
    } catch {
      /* not supported, ignore */
    }
  }

  function unlockScreen() {
    wakeRef.current?.release().catch(() => {});
    wakeRef.current = null;
  }

  function testSound() {
    ensureAudio();
    if (audioRef.current) playBlast(audioRef.current);
  }

  function startTest() {
    const list = pickWatWords();
    if (list.length === 0) return;

    ensureAudio();
    stopTimer();

    const total = READY_SECONDS + list.length * WORD_SECONDS + FINAL_SECONDS;

    setWords(list);
    lastKeyRef.current = "";
    startRef.current = performance.now();
    setView({ stage: "ready", index: -1, remaining: READY_SECONDS });
    setPhase("running");
    void lockScreen();

    timerRef.current = window.setInterval(() => {
      const e = (performance.now() - startRef.current) / 1000;

      if (e >= total) {
        blast();
        stopTimer();
        unlockScreen();
        setPhase("done");
        return;
      }

      let stage: Stage;
      let index = -1;
      let remaining: number;

      if (e < READY_SECONDS) {
        stage = "ready";
        remaining = Math.ceil(READY_SECONDS - e);
      } else if (e < READY_SECONDS + list.length * WORD_SECONDS) {
        stage = "word";
        index = Math.floor((e - READY_SECONDS) / WORD_SECONDS);
        remaining = Math.ceil(READY_SECONDS + (index + 1) * WORD_SECONDS - e);
      } else {
        stage = "final";
        remaining = Math.ceil(total - e);
      }

      const key = `${stage}-${index}`;
      if (key !== lastKeyRef.current) {
        if (stage !== "ready") blast(); // sound on every new word
        lastKeyRef.current = key;
      }

      setView((prev) =>
        prev.stage === stage && prev.index === index && prev.remaining === remaining
          ? prev
          : { stage, index, remaining }
      );
    }, 50);
  }

  function endTest() {
    if (!window.confirm("End the test now?")) return;
    stopTimer();
    unlockScreen();
    setPhase("intro");
  }

  /* ---------------------------- RUNNING ---------------------------- */
  if (phase === "running") {
    const total = words.length;
    const isWord = view.stage === "word";
    const urgent = view.stage !== "ready" && view.remaining <= 3;
    const ringColor = urgent ? "#e11d2e" : "#4da6ff";
    const duration =
      view.stage === "ready" ? READY_SECONDS : view.stage === "word" ? WORD_SECONDS : FINAL_SECONDS;
    const progress = isWord ? ((view.index + 1) / total) * 100 : view.stage === "final" ? 100 : 0;

    return (
      <div className="fixed inset-0 z-50 flex flex-col overflow-hidden bg-[#fafaf9] pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]">
        <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[#4da6ff]/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-[#e11d2e]/10 blur-3xl" />

        {/* top bar */}
        <div className="relative flex items-center justify-between px-4 py-3 sm:px-8">
          <span className="rounded-full bg-black px-3 py-1 text-[10px] font-bold uppercase tracking-[0.25em] text-white">
            WAT
          </span>

          <span className="text-xs font-semibold tracking-wide text-stone-500">
            {isWord ? `${view.index + 1} / ${total}` : view.stage === "final" ? "Final" : ""}
          </span>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setSoundOn((v) => !v)}
              className="rounded-full border border-stone-300 bg-white px-3 py-1 text-[11px] font-semibold text-stone-600 transition hover:border-black"
            >
              {soundOn ? "Sound on" : "Sound off"}
            </button>
            <button
              type="button"
              onClick={endTest}
              className="rounded-full border border-[#e11d2e]/40 bg-white px-3 py-1 text-[11px] font-semibold text-[#e11d2e] transition hover:bg-[#e11d2e] hover:text-white"
            >
              End
            </button>
          </div>
        </div>

        {/* progress */}
        <div className="relative h-1 bg-stone-200">
          <div
            className="h-full bg-gradient-to-r from-[#e11d2e] via-[#0b1f5c] to-[#4da6ff] transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* stage */}
        <div className="relative flex flex-1 flex-col items-center justify-center px-5 text-center">
          <div key={`${view.stage}-${view.index}`} style={{ animation: "wat-in .45s cubic-bezier(.2,.7,.2,1) both" }}>
            {view.stage === "ready" && (
              <>
                <p className="text-[11px] font-extrabold uppercase tracking-[0.35em] text-[#e11d2e]">
                  Get ready
                </p>
                <p className="mt-3 text-sm text-stone-500">Pen and answer sheet in hand.</p>
              </>
            )}

            {isWord && (
              <>
                <p className="text-[11px] font-extrabold uppercase tracking-[0.35em] text-[#e11d2e]">
                  No. {view.index + 1}
                </p>
                <h1 className="mt-4 break-words font-serif text-[clamp(2.8rem,14vw,6.5rem)] font-extrabold uppercase leading-none tracking-tight text-[#0b1f5c]">
                  {words[view.index]}
                </h1>
              </>
            )}

            {view.stage === "final" && (
              <>
                <p className="text-[11px] font-extrabold uppercase tracking-[0.35em] text-[#e11d2e]">
                  Last chance
                </p>
                <h1 className="mt-4 font-serif text-[clamp(1.8rem,8vw,3rem)] font-extrabold leading-tight text-[#0b1f5c]">
                  Finish your last sentence
                </h1>
              </>
            )}
          </div>

          {/* timer ring */}
          <div className="relative mt-10 h-28 w-28 sm:h-32 sm:w-32">
            <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
              <circle cx="50" cy="50" r="44" fill="none" stroke="#e7e5e4" strokeWidth="5" />
              <circle
                key={`${view.stage}-${view.index}`}
                cx="50"
                cy="50"
                r="44"
                fill="none"
                stroke={ringColor}
                strokeWidth="5"
                strokeLinecap="round"
                strokeDasharray={RING}
                style={{
                  animation: `wat-ring ${duration}s linear forwards`,
                  transition: "stroke .3s",
                }}
              />
            </svg>
            <span className="absolute inset-0 grid place-items-center font-serif text-4xl font-bold text-[#0b1f5c]">
              {view.remaining}
            </span>
          </div>
        </div>

        <p className="relative pb-6 text-center text-[11px] font-medium tracking-wide text-stone-400">
          Write your sentence now
        </p>
      </div>
    );
  }

  /* ----------------------------- DONE ------------------------------ */
  if (phase === "done") {
    return (
      <Shell
        eyebrow="Word Association Test"
        title="Test complete"
        subtitle="Put your pen down and review your answer sheet."
        back="/personality"
        backLabel="Personality"
      >
        <div className="relative overflow-hidden rounded-[28px] border border-stone-200 bg-white shadow-[0_30px_80px_-40px_rgba(11,31,92,0.35)]">
          <div className="h-[3px] w-full bg-gradient-to-r from-[#e11d2e] via-[#0b1f5c] to-[#4da6ff]" />

          <div className="px-5 py-9 text-center sm:px-10">
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[#4da6ff]/15 text-2xl text-[#0b1f5c]">
              ✓
            </div>
            <p className="mt-4 font-serif text-4xl font-black text-[#0b1f5c]">
              {words.length}
              <span className="text-lg font-semibold text-stone-400"> words</span>
            </p>
            <p className="mt-1 text-sm text-stone-500">All words have been shown.</p>

            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => setPhase("intro")}
                className="w-full rounded-full bg-[#e11d2e] px-8 py-3.5 text-sm font-extrabold uppercase tracking-[0.18em] text-white shadow-[0_14px_30px_-12px_rgba(225,29,46,0.6)] transition hover:-translate-y-0.5 active:scale-[.98] sm:w-auto"
              >
                Take again
              </button>
              <Link
                href="/personality"
                className="w-full rounded-full border border-stone-300 px-8 py-3.5 text-center text-sm font-bold uppercase tracking-[0.18em] text-stone-600 transition hover:border-black hover:text-black sm:w-auto"
              >
                Back
              </Link>
            </div>

            <details className="mx-auto mt-8 max-w-sm text-left">
              <summary className="cursor-pointer text-center text-xs font-semibold uppercase tracking-[0.2em] text-stone-400">
                Review words shown
              </summary>
              <ol className="mt-4 grid grid-cols-2 gap-x-6 gap-y-1.5 text-sm text-stone-600">
                {words.map((w, i) => (
                  <li key={`${w}-${i}`}>
                    <span className="mr-2 text-xs font-bold text-[#4da6ff]">{i + 1}.</span>
                    {w}
                  </li>
                ))}
              </ol>
            </details>
          </div>
        </div>
      </Shell>
    );
  }

  /* ---------------------------- INSTRUCTIONS ---------------------------- */
  const count = Math.min(WAT_WORD_COUNT, WAT_WORDS.length);
  const minutes = Math.ceil((READY_SECONDS + count * WORD_SECONDS + FINAL_SECONDS) / 60);

  const stats = [
    { value: count, label: "Words", color: "#0b1f5c" },
    { value: WORD_SECONDS, label: "Seconds each", color: "#4da6ff" },
    { value: `~${minutes}`, label: "Minutes", color: "#e11d2e" },
  ];

  return (
    <Shell
      eyebrow="Personality Test"
      title="Word Association Test"
      subtitle="Sentence formation under time pressure."
      back="/personality"
      backLabel="Personality"
    >
      <div className="relative overflow-hidden rounded-[28px] border border-stone-200 bg-white shadow-[0_30px_80px_-40px_rgba(11,31,92,0.35)]">
        <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-[#4da6ff]/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-28 -left-20 h-64 w-64 rounded-full bg-[#e11d2e]/[0.06] blur-3xl" />
        <div className="h-[3px] w-full bg-gradient-to-r from-[#e11d2e] via-[#0b1f5c] to-[#4da6ff]" />

        <div className="relative px-5 py-8 sm:px-10 sm:py-10">
          <p className="text-center text-[10px] font-extrabold uppercase tracking-[0.3em] text-[#e11d2e]">
            Instructions
          </p>

          {/* stats */}
          <div className="mt-6 grid grid-cols-3 divide-x divide-stone-200 rounded-2xl border border-stone-200">
            {stats.map((s) => (
              <div key={s.label} className="px-2 py-5 text-center">
                <p className="font-serif text-3xl font-black leading-none sm:text-4xl" style={{ color: s.color }}>
                  {s.value}
                </p>
                <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-stone-400">
                  {s.label}
                </p>
              </div>
            ))}
          </div>

          {/* steps */}
          <ol className="mx-auto mt-8 max-w-lg space-y-4">
            {instructions.map((text, i) => (
              <li key={text} className="flex items-start gap-3.5">
                <span
                  className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full text-[11px] font-bold text-white"
                  style={{ background: badgeColors[i % badgeColors.length] }}
                >
                  {i + 1}
                </span>
                <p className="text-[14px] leading-relaxed text-stone-600">{text}</p>
              </li>
            ))}
          </ol>

          {/* actions */}
          <div className="mt-10 text-center">
            <button
              type="button"
              onClick={startTest}
              className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#e11d2e] px-9 py-4 text-sm font-extrabold uppercase tracking-[0.18em] text-white shadow-[0_14px_30px_-12px_rgba(225,29,46,0.6)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#c81727] active:translate-y-0 active:scale-[.98] sm:w-auto sm:min-w-[260px]"
            >
              <span>Start</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </button>

            <div className="mt-5 flex flex-col items-center gap-1.5">
              <button
                type="button"
                onClick={testSound}
                className="rounded-full border border-stone-300 px-4 py-1.5 text-[11px] font-semibold text-stone-500 transition hover:border-black hover:text-black"
              >
                Test sound
              </button>
              <p className="text-[10px] font-medium tracking-wide text-stone-400">
                Keep your pen and answer sheet ready. Turn the volume up.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Shell>
  );
}
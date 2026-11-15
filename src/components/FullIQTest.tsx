"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";

import { mt1 } from "@/data/verbal/mt1";
import { mt2 } from "@/data/verbal/mt2";
import {
  nonVerbalQuestions,
  type NonVerbalQuestion,
} from "@/data/nonverbal/assessment";
import { preloadImages, preloadWhenIdle } from "@/lib/preloadImages";

type VerbalQuestion = {
  q: string;
  options: string[];
  answer: number;
  explanation: string;
};

type Phase = "ready" | "verbal" | "break" | "nonverbal" | "done";

const VERBAL_TIME = 60 * 60;
const BREAK_TIME = 30;
const NONVERBAL_TIME = 18 * 60;

function shuffle<T>(array: T[]): T[] {
  const result = [...array];

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
}

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;

  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

const optionPositions = [
  { left: "9.8%", top: "45.2%" },
  { left: "37.6%", top: "45.2%" },
  { left: "65.2%", top: "45.2%" },
  { left: "9.8%", top: "61.2%" },
  { left: "37.6%", top: "61.2%" },
  { left: "65.2%", top: "61.2%" },
  { left: "9.8%", top: "77.7%" },
  { left: "37.6%", top: "77.7%" },
];

export default function FullIQTest() {
  const [phase, setPhase] = useState<Phase>("ready");

  const [verbalQuestions, setVerbalQuestions] = useState<
    VerbalQuestion[]
  >([]);

  const [verbalAnswers, setVerbalAnswers] = useState<
    Record<number, number>
  >({});

  const [nonVerbalAnswers, setNonVerbalAnswers] = useState<
    Record<number, number>
  >({});

  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [remaining, setRemaining] = useState(VERBAL_TIME);

  const [timerStarted, setTimerStarted] = useState(false);

  // Randomize all available verbal questions once the page mounts.
  useEffect(() => {
    const pool: VerbalQuestion[] = [
      ...mt1,
      ...mt2,
    ];

    setVerbalQuestions(shuffle(pool));
  }, []);
    // Download every non-verbal figure in the background while the candidate
  // is still working on the verbal section.
  const testStarted = phase !== "ready";

  useEffect(() => {
    if (!testStarted) return;
    preloadWhenIdle(nonVerbalQuestions.map((q) => q.image));
  }, [testStarted]);

  // Safety net: make sure the next few figures are ready during non-verbal.
  useEffect(() => {
    if (phase !== "nonverbal") return;

    preloadImages(
      nonVerbalQuestions
        .slice(currentQuestion + 1, currentQuestion + 4)
        .map((q) => q.image)
    );
  }, [phase, currentQuestion]);

  // Phase-based countdown.
  useEffect(() => {
    if (!timerStarted || phase === "done") return;

    const duration =
      phase === "verbal"
        ? VERBAL_TIME
        : phase === "break"
        ? BREAK_TIME
        : NONVERBAL_TIME;

    const deadline = Date.now() + duration * 1000;

    setRemaining(duration);

    const interval = window.setInterval(() => {
      const seconds = Math.max(
        0,
        Math.ceil((deadline - Date.now()) / 1000)
      );

      setRemaining(seconds);

      if (seconds <= 0) {
        window.clearInterval(interval);

        if (phase === "verbal") {
          setPhase("break");
        } else if (phase === "break") {
          setCurrentQuestion(0);
          setPhase("nonverbal");
        } else if (phase === "nonverbal") {
          setPhase("done");
        }
      }
    }, 250);

    return () => window.clearInterval(interval);
  }, [phase, timerStarted]);

  const verbalScore = useMemo(() => {
    return verbalQuestions.filter(
      (q, index) => verbalAnswers[index] === q.answer
    ).length;
  }, [verbalQuestions, verbalAnswers]);

  const nonVerbalScore = useMemo(() => {
    return nonVerbalQuestions.filter(
      (q, index) => nonVerbalAnswers[index] === q.answer
    ).length;
  }, [nonVerbalAnswers]);

  const answeredVerbal = Object.keys(verbalAnswers).length;
  const answeredNonVerbal = Object.keys(nonVerbalAnswers).length;
  const nonVerbalTotal = nonVerbalQuestions.length;

  // Selecting the already-selected option again clears the answer.
  function selectVerbalAnswer(optionIndex: number) {
    setVerbalAnswers((previous) => {
      const next = { ...previous };

      if (previous[currentQuestion] === optionIndex) {
        delete next[currentQuestion];
      } else {
        next[currentQuestion] = optionIndex;
      }

      return next;
    });
  }

  function selectNonVerbalAnswer(option: number) {
    setNonVerbalAnswers((previous) => {
      const next = { ...previous };

      if (previous[currentQuestion] === option) {
        delete next[currentQuestion];
      } else {
        next[currentQuestion] = option;
      }

      return next;
    });
  }

  function finishTest() {
    setPhase("done");
  }

  // Start the assessment only after the user clicks Start Test.
  function startTest() {
    setCurrentQuestion(0);
    setRemaining(VERBAL_TIME);
    setTimerStarted(true);
    setPhase("verbal");
  }

  // Loading state.
  if (verbalQuestions.length === 0) {
    return (
      <div className="rounded-3xl border border-stone-200 bg-white p-10 text-center">
        <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-stone-200 border-t-[#e11d2e]" />

        <h2 className="font-serif text-xl font-bold">
          Preparing Your Test
        </h2>

        <p className="mt-2 text-sm text-stone-500">
          Please wait...
        </p>
      </div>
    );
  }

   // Premium instructions screen.
  if (phase === "ready") {
    const parts = [
      {
        no: "01",
        name: "Verbal IQ",
        count: verbalQuestions.length,
        time: 60,
        color: "#0b1f5c",
      },
      {
        no: "02",
        name: "Non-Verbal IQ",
        count: nonVerbalTotal,
        time: 18,
        color: "#4da6ff",
      },
    ];

    const rules = [
      { text: "A 30-second break separates the two sections.", color: "#0b1f5c" },
      { text: "You can change your answers until a section ends.", color: "#4da6ff" },
      {
        text: "Each section submits automatically when time runs out. The timer cannot be paused.",
        color: "#e11d2e",
      },
    ];

    return (
      <div className="relative overflow-hidden rounded-[28px] border border-stone-200 bg-white shadow-[0_30px_80px_-40px_rgba(11,31,92,0.35)]">
        {/* soft theme glow */}
        <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-[#4da6ff]/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-28 -left-20 h-64 w-64 rounded-full bg-[#e11d2e]/[0.06] blur-3xl" />

        {/* top accent */}
        <div className="h-[3px] w-full bg-gradient-to-r from-[#e11d2e] via-[#0b1f5c] to-[#4da6ff]" />

        <div className="relative px-5 py-9 sm:px-10 sm:py-12">
          {/* intro */}
          <div className="text-center">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.3em] text-[#e11d2e]">
              Before you begin
            </p>
            <h2 className="mt-3 font-serif text-3xl font-bold tracking-tight text-[#0b1f5c] sm:text-4xl">
              Ready when you are
            </h2>
            <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-stone-500">
              Two timed sections. Once you begin, the clock keeps running.
            </p>
          </div>

          {/* the two sections */}
          <div className="mt-9 grid overflow-hidden rounded-2xl border border-stone-200 bg-white sm:grid-cols-2">
            {parts.map((p, i) => (
              <div
                key={p.no}
                className={`relative p-6 sm:p-7 ${
                  i === 1 ? "border-t border-stone-200 sm:border-l sm:border-t-0" : ""
                }`}
              >
                <span
                  className="absolute inset-y-0 left-0 w-[3px]"
                  style={{ background: p.color }}
                />

                <p
                  className="text-[10px] font-extrabold uppercase tracking-[0.25em]"
                  style={{ color: p.color }}
                >
                  Part {p.no}
                </p>

                <h3 className="mt-2 font-serif text-xl font-bold text-[#0b1f5c]">
                  {p.name}
                </h3>

                <div className="mt-6 flex items-end gap-6">
                  <div>
                    <p
                      className="font-serif text-4xl font-black leading-none"
                      style={{ color: p.color }}
                    >
                      {p.count}
                    </p>
                    <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-stone-400">
                      Questions
                    </p>
                  </div>

                  <div className="h-10 w-px bg-stone-200" />

                  <div>
                    <p
                      className="font-serif text-4xl font-black leading-none"
                      style={{ color: p.color }}
                    >
                      {p.time}
                    </p>
                    <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-stone-400">
                      Minutes
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* rules */}
          <ul className="mx-auto mt-8 max-w-md space-y-3.5">
            {rules.map((r) => (
              <li key={r.text} className="flex items-start gap-3">
                <span
                  className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full"
                  style={{ background: r.color }}
                />
                <p className="text-[13px] leading-relaxed text-stone-600">{r.text}</p>
              </li>
            ))}
          </ul>

          {/* start */}
          <div className="mt-10 text-center">
            <button
              type="button"
              onClick={startTest}
              className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#e11d2e] px-9 py-4 text-sm font-extrabold uppercase tracking-[0.18em] text-white shadow-[0_14px_30px_-12px_rgba(225,29,46,0.6)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#c81727] hover:shadow-[0_18px_36px_-12px_rgba(225,29,46,0.65)] active:translate-y-0 active:scale-[.98] sm:w-auto sm:min-w-[260px]"
            >
              <span>Start Test</span>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  d="M5 12H19M12 5L19 12L12 19"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <p className="mt-4 text-[10px] font-medium tracking-wide text-stone-400">
              Your timer starts only after you press Start Test.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Header shared by the test phases.
  const Header = ({
    title,
    subtitle,
  }: {
    title: string;
    subtitle: string;
  }) => (
    <div className="mb-5 rounded-2xl border border-stone-200 bg-white p-4 sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">

        <div>
          <p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#e11d2e]">
            ISSB Assessment
          </p>

          <h2 className="mt-1 font-serif text-xl font-bold sm:text-2xl">
            {title}
          </h2>

          <p className="mt-1 text-xs text-stone-500 sm:text-sm">
            {subtitle}
          </p>
        </div>

        <div className="rounded-xl border border-stone-200 bg-stone-50 px-4 py-2 text-center">
          <p className="text-[9px] font-bold uppercase tracking-widest text-stone-500">
            Time Remaining
          </p>

          <p
            className={`font-mono text-2xl font-bold ${
              remaining <= 60
                ? "text-red-600"
                : "text-[#0b1f5c]"
            }`}
          >
            {formatTime(remaining)}
          </p>
        </div>
      </div>
    </div>
  );

  // VERBAL TEST
  if (phase === "verbal") {
    const question = verbalQuestions[currentQuestion];

    return (
      <div>
        <Header
          title="Verbal IQ Test"
          subtitle={`${verbalQuestions.length} Questions · 60 Minutes`}
        />

        <div className="mb-4 flex items-center justify-between text-xs font-semibold text-stone-500">
          <span>
            Question {currentQuestion + 1} of {verbalQuestions.length}
          </span>

          <span>
            Answered {answeredVerbal}/{verbalQuestions.length}
          </span>
        </div>

        <div className="h-2 overflow-hidden rounded-full bg-stone-200">
          <div
            className="h-full rounded-full bg-[#e11d2e] transition-all"
            style={{
              width: `${
                (answeredVerbal / verbalQuestions.length) * 100
              }%`,
            }}
          />
        </div>

        <div className="mt-5 rounded-2xl border border-stone-200 bg-white p-5 sm:p-7">

          <div className="mb-5 flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#0b1f5c] text-sm font-bold text-white">
              {currentQuestion + 1}
            </span>

            <span className="text-xs font-bold uppercase tracking-widest text-stone-400">
              Verbal Reasoning
            </span>
          </div>

          <h3 className="text-base font-semibold leading-relaxed sm:text-lg">
            {question.q}
          </h3>

          <div className="mt-6 grid gap-3">
            {question.options.map((option, index) => {
              const selected =
                verbalAnswers[currentQuestion] === index;

              return (
                <button
                  key={index}
                  onClick={() => selectVerbalAnswer(index)}
                  className={`flex items-center gap-3 rounded-xl border p-4 text-left transition ${
                    selected
                      ? "border-[#e11d2e] bg-red-50 text-[#e11d2e]"
                      : "border-stone-200 bg-white hover:border-[#0b1f5c] hover:bg-stone-50"
                  }`}
                >
                  <span
                    className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg text-xs font-bold ${
                      selected
                        ? "bg-[#e11d2e] text-white"
                        : "bg-stone-100 text-stone-600"
                    }`}
                  >
                    {String.fromCharCode(65 + index)}
                  </span>

                  <span className="text-sm font-medium">
                    {option}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between gap-3">
          <button
            disabled={currentQuestion === 0}
            onClick={() =>
              setCurrentQuestion((v) => Math.max(0, v - 1))
            }
            className="rounded-full border border-stone-300 bg-white px-5 py-3 text-sm font-semibold transition hover:border-[#0b1f5c] disabled:opacity-30"
          >
            ← Previous
          </button>

          {currentQuestion < verbalQuestions.length - 1 ? (
            <button
              onClick={() =>
                setCurrentQuestion((v) =>
                  Math.min(verbalQuestions.length - 1, v + 1)
                )
              }
              className="rounded-full bg-[#0b1f5c] px-7 py-3 text-sm font-semibold text-white transition hover:bg-[#172f75]"
            >
              Next →
            </button>
          ) : (
            <button
              onClick={() => setPhase("break")}
              className="rounded-full bg-[#e11d2e] px-7 py-3 text-sm font-semibold text-white transition hover:bg-[#c81727]"
            >
              Submit Verbal Test →
            </button>
          )}
        </div>

                {/* Verbal Question Navigation */}
        <div className="mt-5 rounded-xl border border-stone-200 bg-white p-3">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400">
              Questions
            </p>
            <p className="text-[10px] font-semibold text-stone-400">
              {answeredVerbal}/{verbalQuestions.length}
            </p>
          </div>

          <div className="grid grid-cols-10 gap-1 sm:grid-cols-[repeat(20,minmax(0,1fr))]">
            {verbalQuestions.map((_, index) => {
              const answered = verbalAnswers[index] !== undefined;

              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => setCurrentQuestion(index)}
                  className={`h-7 rounded-md text-[10px] font-bold transition sm:text-[11px] ${
                    currentQuestion === index
                      ? "bg-[#0b1f5c] text-white"
                      : answered
                      ? "bg-[#4da6ff]/20 text-[#0b1f5c]"
                      : "bg-stone-100 text-stone-500 hover:bg-stone-200"
                  }`}
                >
                  {index + 1}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // TRANSITION SCREEN
  if (phase === "break") {
    return (
      <div className="flex min-h-[65vh] flex-col items-center justify-center rounded-3xl border border-stone-200 bg-white p-8 text-center">

        <div className="mb-5 grid h-20 w-20 place-items-center rounded-full bg-[#4da6ff]/15 text-4xl text-[#0b1f5c]">
          ✈
        </div>

        <p className="text-xs font-bold uppercase tracking-[.25em] text-[#4da6ff]">
          Verbal Test Completed
        </p>

        <h2 className="mt-3 font-serif text-3xl font-extrabold sm:text-4xl">
          Get Ready for the
          <span className="mt-1 block text-[#0b1f5c]">
            Non-Verbal Test!
          </span>
        </h2>

        <p className="mt-4 max-w-md text-sm leading-relaxed text-stone-500">
          Your Verbal Test has been submitted.
          Prepare yourself for the Non-Verbal IQ assessment.
        </p>

        <div className="mt-8 grid h-24 w-24 place-items-center rounded-full border-4 border-[#4da6ff] bg-[#4da6ff]/10">
          <span className="font-mono text-4xl font-extrabold text-[#0b1f5c]">
            {remaining}
          </span>
        </div>

        <p className="mt-3 text-xs font-bold uppercase tracking-widest text-stone-400">
          Starting in seconds
        </p>
      </div>
    );
  }

  // NON-VERBAL TEST
  if (phase === "nonverbal") {
    const question: NonVerbalQuestion | undefined =
      nonVerbalQuestions[currentQuestion];

    if (!question) {
      return (
        <div className="rounded-2xl border border-[#4da6ff]/30 bg-white p-8 text-center">
          <h2 className="font-serif text-2xl font-bold text-[#0b1f5c]">
            Test Data Unavailable
          </h2>

          <p className="mt-3 text-sm text-stone-500">
            The next question could not be loaded. Please check the test question data.
          </p>

          <button
            onClick={() => setCurrentQuestion(0)}
            className="mt-5 rounded-full bg-[#0b1f5c] px-6 py-3 text-sm font-semibold text-white"
          >
            Return to First Question
          </button>
        </div>
      );
    }

    return (
      <div>
        <Header
          title="Non-Verbal IQ Test"
          subtitle={`${nonVerbalTotal} Questions · 18 Minutes`}
        />

        <div className="mb-4 flex flex-wrap items-center justify-between gap-2 text-xs font-semibold text-stone-500">
          <span>
            Question {currentQuestion + 1} of {nonVerbalTotal}
          </span>

          <span>
            Answered {answeredNonVerbal}/{nonVerbalTotal}
          </span>
        </div>

        <div className="h-2 overflow-hidden rounded-full bg-stone-200">
          <div
            className="h-full rounded-full bg-[#4da6ff] transition-all"
            style={{
              width: `${
                nonVerbalTotal > 0
                  ? (answeredNonVerbal / nonVerbalTotal) * 100
                  : 0
              }%`,
            }}
          />
        </div>

        <div className="mt-5 overflow-hidden rounded-2xl border border-stone-200 bg-white p-2 sm:p-4">

          <div className="mb-3 flex items-center justify-between px-2">
            <span className="text-xs font-bold uppercase tracking-widest text-stone-500">
              Figure Reasoning
            </span>

            <span className="rounded-lg bg-[#4da6ff]/15 px-3 py-1 text-xs font-bold text-[#0b1f5c]">
              Question {question.no}
            </span>
          </div>

          <div className="relative mx-auto w-full max-w-[720px]">
                        <Image
              src={question.image}
              alt={`Non-Verbal Question ${question.no}`}
              width={1024}
              height={1448}
              unoptimized
              priority
              decoding="async"
              className="block h-auto w-full select-none"
              draggable={false}
            />

            {optionPositions.map((position, index) => {
              const option = index + 1;

              const selected =
                nonVerbalAnswers[currentQuestion] === option;

              return (
                <button
                  key={option}
                  type="button"
                  aria-label={`Select option ${option}`}
                  aria-pressed={selected}
                  onClick={() => selectNonVerbalAnswer(option)}
                  className={`absolute z-10 rounded-md transition ${
                    selected
                      ? "border-[4px] border-[#e11d2e] bg-red-500/15 shadow-[0_0_0_2px_white]"
                      : "border-2 border-transparent hover:border-[#4da6ff]/80 hover:bg-blue-400/10"
                  }`}
                  style={{
                    ...position,
                    width: "25%",
                    height: "11.9%",
                  }}
                >
                  <span className="sr-only">
                    Option {option}
                  </span>
                </button>
              );
            })}
          </div>

          <p className="mt-3 text-center text-xs text-stone-400">
            Click directly on any of the eight options in the image.
          </p>
        </div>

        <div className="mt-5 flex items-center justify-between gap-3">
          <button
            disabled={currentQuestion === 0}
            onClick={() =>
              setCurrentQuestion((v) => Math.max(0, v - 1))
            }
            className="rounded-full border border-stone-300 bg-white px-5 py-3 text-sm font-semibold transition hover:border-[#0b1f5c] disabled:opacity-30"
          >
            ← Previous
          </button>

          {currentQuestion < nonVerbalTotal - 1 ? (
            <button
              onClick={() =>
                setCurrentQuestion((v) =>
                  Math.min(nonVerbalTotal - 1, v + 1)
                )
              }
              className="rounded-full bg-[#0b1f5c] px-7 py-3 text-sm font-semibold text-white transition hover:bg-[#172f75]"
            >
              Next →
            </button>
          ) : (
            <button
              onClick={finishTest}
              className="rounded-full bg-[#e11d2e] px-7 py-3 text-sm font-semibold text-white transition hover:bg-[#c81727]"
            >
              Submit Test
            </button>
          )}
        </div>

                {/* Non-Verbal Question Navigation */}
        <div className="mt-5 rounded-xl border border-stone-200 bg-white p-3">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400">
              Questions
            </p>
            <p className="text-[10px] font-semibold text-stone-400">
              {answeredNonVerbal}/{nonVerbalTotal}
            </p>
          </div>

          <div className="grid grid-cols-9 gap-1 sm:grid-cols-12">
            {nonVerbalQuestions.map((_, index) => {
              const answered = nonVerbalAnswers[index] !== undefined;

              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => setCurrentQuestion(index)}
                  className={`h-7 rounded-md text-[10px] font-bold transition sm:text-[11px] ${
                    currentQuestion === index
                      ? "bg-[#0b1f5c] text-white"
                      : answered
                      ? "bg-[#4da6ff]/20 text-[#0b1f5c]"
                      : "bg-stone-100 text-stone-500 hover:bg-stone-200"
                  }`}
                >
                  {index + 1}
                </button>
              );
            })}
          </div>

          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[10px] font-medium text-stone-400">
            <span className="flex items-center gap-1.5">
              <i className="h-2 w-2 rounded-sm bg-[#0b1f5c]" />
              Current
            </span>
            <span className="flex items-center gap-1.5">
              <i className="h-2 w-2 rounded-sm bg-[#4da6ff]/40" />
              Answered
            </span>
            <span className="flex items-center gap-1.5">
              <i className="h-2 w-2 rounded-sm bg-stone-200" />
              Pending
            </span>
          </div>
        </div>
      </div>
    );
  }

  // FINAL RESULT
  return (
    <div className="rounded-3xl border border-stone-200 bg-white p-5 sm:p-8">

      <div className="text-center">
        <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full bg-[#4da6ff]/15 text-3xl text-[#0b1f5c]">
          ✓
        </div>

        <p className="text-xs font-bold uppercase tracking-[.25em] text-[#e11d2e]">
          Assessment Completed
        </p>

        <h2 className="mt-2 font-serif text-3xl font-extrabold">
          Your Test Result
        </h2>

        <p className="mt-2 text-sm text-stone-500">
          Both sections have been submitted successfully.
        </p>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">

        <div className="rounded-2xl border border-stone-200 bg-stone-50 p-5 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-stone-500">
            Verbal IQ
          </p>

          <p className="mt-3 font-serif text-4xl font-extrabold text-[#0b1f5c]">
            {verbalScore}
            <span className="text-xl text-stone-400">
              /{verbalQuestions.length}
            </span>
          </p>

          <p className="mt-2 text-xs text-stone-500">
            {answeredVerbal} Questions Answered
          </p>
        </div>

        <div className="rounded-2xl border border-stone-200 bg-stone-50 p-5 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-stone-500">
            Non-Verbal IQ
          </p>

          <p className="mt-3 font-serif text-4xl font-extrabold text-[#4da6ff]">
            {nonVerbalScore}
            <span className="text-xl text-stone-400">
              /{nonVerbalTotal}
            </span>
          </p>

          <p className="mt-2 text-xs text-stone-500">
            {answeredNonVerbal} Questions Answered
          </p>
        </div>
      </div>

      <div className="mt-5 rounded-2xl bg-[#0b1f5c] p-6 text-center text-white">
        <p className="text-xs font-bold uppercase tracking-widest text-[#4da6ff]">
          Total Score
        </p>

        <p className="mt-2 font-serif text-5xl font-extrabold">
          {verbalScore + nonVerbalScore}
          <span className="text-2xl text-[#4da6ff]">
            /{verbalQuestions.length + nonVerbalTotal}
          </span>
        </p>

        <p className="mt-2 text-xs text-blue-200">
          Combined Verbal and Non-Verbal Score
        </p>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-stone-200 p-4">
          <p className="text-xs font-bold text-stone-500">
            VERBAL ACCURACY
          </p>

          <p className="mt-1 text-2xl font-bold text-[#0b1f5c]">
            {verbalQuestions.length > 0
              ? Math.round((verbalScore / verbalQuestions.length) * 100)
              : 0}
            %
          </p>
        </div>

        <div className="rounded-xl border border-stone-200 p-4">
          <p className="text-xs font-bold text-stone-500">
            NON-VERBAL ACCURACY
          </p>

          <p className="mt-1 text-2xl font-bold text-[#0b1f5c]">
            {nonVerbalTotal > 0
              ? Math.round((nonVerbalScore / nonVerbalTotal) * 100)
              : 0}
            %
          </p>
        </div>
      </div>

      <button
        onClick={() => (window.location.href = "/iq")}
        className="mt-7 w-full rounded-full bg-[#e11d2e] px-6 py-4 text-sm font-bold text-white transition hover:bg-[#c81727]"
      >
        Back to IQ Dashboard →
      </button>
    </div>
  );
}
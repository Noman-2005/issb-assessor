"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";

import { mt1 } from "@/data/verbal/mt1";
import { mt2 } from "@/data/verbal/mt2";
import {
  nonVerbalQuestions,
  type NonVerbalQuestion,
} from "@/data/nonverbal/assessment";

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

  function selectVerbalAnswer(optionIndex: number) {
    setVerbalAnswers((previous) => ({
      ...previous,
      [currentQuestion]: optionIndex,
    }));
  }

  function selectNonVerbalAnswer(option: number) {
    setNonVerbalAnswers((previous) => ({
      ...previous,
      [currentQuestion]: option,
    }));
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
    return (
      <div className="relative isolate overflow-hidden rounded-[28px] border border-[#dce5f2] bg-white shadow-[0_24px_80px_rgba(11,31,92,0.12)]">

        {/* Decorative Background */}
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -right-24 -top-28 h-80 w-80 rounded-full bg-[#4da6ff]/10 blur-3xl" />
          <div className="absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-[#e11d2e]/[0.07] blur-3xl" />
        </div>

        {/* Top Accent */}
        <div className="h-1.5 w-full bg-gradient-to-r from-[#0b1f5c] via-[#4da6ff] to-[#e11d2e]" />

        <div className="p-5 sm:p-8 lg:p-10">

          {/* Heading */}
          <div className="mx-auto max-w-3xl text-center">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-[#4da6ff]/25 bg-[#4da6ff]/10 text-[#0b1f5c] shadow-sm">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-8 w-8"
                stroke="currentColor"
                strokeWidth="1.7"
              >
                <path
                  d="M12 3L20 7V12C20 17 16.5 20 12 22C7.5 20 4 17 4 12V7L12 3Z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9 12L11 14L15.5 9.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <p className="mt-5 text-[10px] font-extrabold uppercase tracking-[0.28em] text-[#e11d2e]">
              ISSB · FULL IQ ASSESSMENT
            </p>

            <h2 className="mt-3 font-serif text-3xl font-black tracking-tight text-[#0b1f5c] sm:text-4xl lg:text-5xl">
              Test Instructions
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-500 sm:text-base">
              Welcome to your Full IQ Assessment. Review the test
              structure and instructions carefully before starting.
            </p>
          </div>

          {/* Test Overview Cards */}
          <div className="mt-9 grid gap-4 md:grid-cols-2">

            {/* Verbal Card */}
            <div className="group relative overflow-hidden rounded-2xl border border-[#0b1f5c]/15 bg-gradient-to-br from-[#0b1f5c]/[0.07] to-white p-5 transition duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-6">

              <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-[#0b1f5c]/[0.06] transition-transform duration-500 group-hover:scale-150" />

              <div className="relative flex items-start justify-between gap-3">

                <div>
                  <span className="inline-flex rounded-full border border-[#0b1f5c]/15 bg-white px-3 py-1 text-[9px] font-extrabold uppercase tracking-[0.2em] text-[#0b1f5c]">
                    Part 01
                  </span>

                  <h3 className="mt-4 font-serif text-2xl font-bold text-[#0b1f5c]">
                    Verbal IQ Test
                  </h3>

                  <p className="mt-2 text-xs leading-6 text-slate-500">
                    Evaluate your verbal reasoning, vocabulary,
                    comprehension and logical thinking.
                  </p>
                </div>

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#0b1f5c] text-white shadow-lg shadow-[#0b1f5c]/20">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="h-6 w-6"
                    stroke="currentColor"
                    strokeWidth="1.7"
                  >
                    <path
                      d="M5 4.5H19V16H9L5 20V4.5Z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M9 9H15M9 12.5H15"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>

              <div className="relative mt-6 grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-[#0b1f5c]/10 bg-white/90 p-3">
                  <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400">
                    Questions
                  </p>
                  <p className="mt-1 text-2xl font-black text-[#0b1f5c]">
                    {verbalQuestions.length}
                  </p>
                </div>

                <div className="rounded-xl border border-[#0b1f5c]/10 bg-white/90 p-3">
                  <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400">
                    Time Limit
                  </p>
                  <p className="mt-1 text-2xl font-black text-[#0b1f5c]">
                    60 <span className="text-xs font-semibold">MIN</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Non-Verbal Card */}
            <div className="group relative overflow-hidden rounded-2xl border border-[#4da6ff]/25 bg-gradient-to-br from-[#4da6ff]/[0.12] to-white p-5 transition duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-6">

              <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-[#4da6ff]/10 transition-transform duration-500 group-hover:scale-150" />

              <div className="relative flex items-start justify-between gap-3">

                <div>
                  <span className="inline-flex rounded-full border border-[#4da6ff]/30 bg-white px-3 py-1 text-[9px] font-extrabold uppercase tracking-[0.2em] text-[#0b1f5c]">
                    Part 02
                  </span>

                  <h3 className="mt-4 font-serif text-2xl font-bold text-[#0b1f5c]">
                    Non-Verbal IQ Test
                  </h3>

                  <p className="mt-2 text-xs leading-6 text-slate-500">
                    Assess your visual reasoning, pattern recognition
                    and analytical problem-solving skills.
                  </p>
                </div>

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#4da6ff] text-[#0b1f5c] shadow-lg shadow-[#4da6ff]/25">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="h-6 w-6"
                    stroke="currentColor"
                    strokeWidth="1.7"
                  >
                    <rect x="3" y="3" width="7" height="7" rx="1" />
                    <rect x="14" y="3" width="7" height="7" rx="1" />
                    <rect x="3" y="14" width="7" height="7" rx="1" />
                    <path
                      d="M14 17.5H21M17.5 14V21"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>

              <div className="relative mt-6 grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-[#4da6ff]/20 bg-white/90 p-3">
                  <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400">
                    Questions
                  </p>
                  <p className="mt-1 text-2xl font-black text-[#0b1f5c]">
                    {nonVerbalTotal}
                  </p>
                </div>

                <div className="rounded-xl border border-[#4da6ff]/20 bg-white/90 p-3">
                  <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400">
                    Time Limit
                  </p>
                  <p className="mt-1 text-2xl font-black text-[#0b1f5c]">
                    18 <span className="text-xs font-semibold">MIN</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="mt-7 rounded-2xl border border-slate-200 bg-white/90 p-5 sm:p-7">

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#4da6ff]/15 text-[#0b1f5c]">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-5 w-5"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <circle cx="12" cy="12" r="9" />
                  <path
                    d="M12 11V16M12 8H12.01"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              <div>
                <h3 className="font-serif text-lg font-bold text-[#0b1f5c]">
                  Important Instructions
                </h3>
                <p className="mt-0.5 text-[11px] text-slate-400">
                  Please read before proceeding
                </p>
              </div>
            </div>

            <div className="mt-5 grid gap-x-8 gap-y-4 sm:grid-cols-2">
              {[
                "The assessment begins with the Verbal IQ Test.",
                "A 30-second break will be provided after the Verbal Test.",
                "The Non-Verbal Test starts automatically after the break.",
                "Use the Previous, Next and question navigation buttons to move between questions.",
                "You can change your answers anytime before the section ends.",
                "Each section is automatically submitted when its timer reaches zero.",
                "The assessment timer cannot be paused once the test begins.",
                "Make sure you are ready before starting the assessment.",
              ].map((instruction, index) => (
                <div
                  key={instruction}
                  className="flex items-start gap-3"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#0b1f5c]/[0.07] text-[10px] font-extrabold text-[#0b1f5c]">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <p className="pt-1 text-xs leading-6 text-slate-600">
                    {instruction}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Start Button */}
          <div className="mt-8 text-center">

            <button
              type="button"
              onClick={startTest}
              className="group inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-[#e11d2e] px-8 py-4 text-sm font-extrabold uppercase tracking-[0.16em] text-white shadow-[0_10px_25px_rgba(225,29,46,0.22)] transition duration-300 hover:-translate-y-1 hover:bg-[#c81727] hover:shadow-[0_15px_35px_rgba(225,29,46,0.30)] active:translate-y-0 sm:w-auto sm:min-w-[260px]"
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

            <p className="mt-4 text-[10px] font-medium tracking-wide text-slate-400">
              Your timer will only begin after clicking Start Test.
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
        <div className="mt-6 rounded-2xl border border-stone-200 bg-white p-4">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-stone-500">
            Question Navigation
          </p>

          <div className="grid grid-cols-6 gap-2 sm:grid-cols-10">
            {verbalQuestions.map((_, index) => {
              const answered =
                verbalAnswers[index] !== undefined;

              return (
                <button
                  key={index}
                  onClick={() => setCurrentQuestion(index)}
                  className={`h-9 rounded-lg text-xs font-bold transition ${
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
              priority={currentQuestion === 0}
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
        <div className="mt-6 rounded-2xl border border-stone-200 bg-white p-4">

          <div className="mb-3 flex items-center justify-between">
            <p className="text-xs font-bold uppercase tracking-widest text-stone-500">
              Question Navigation
            </p>

            <p className="text-xs text-stone-400">
              {nonVerbalTotal} Questions
            </p>
          </div>

          <div className="grid grid-cols-6 gap-2 sm:grid-cols-9">
            {nonVerbalQuestions.map((_, index) => {
              const answered =
                nonVerbalAnswers[index] !== undefined;

              return (
                <button
                  key={index}
                  onClick={() => setCurrentQuestion(index)}
                  className={`h-10 rounded-lg text-xs font-bold transition ${
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

          <div className="mt-4 flex flex-wrap gap-4 text-[10px] font-semibold text-stone-500">
            <span className="flex items-center gap-2">
              <i className="h-3 w-3 rounded bg-[#0b1f5c]" />
              Current
            </span>

            <span className="flex items-center gap-2">
              <i className="h-3 w-3 rounded bg-[#4da6ff]/20" />
              Answered
            </span>

            <span className="flex items-center gap-2">
              <i className="h-3 w-3 rounded bg-stone-100" />
              Not Answered
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
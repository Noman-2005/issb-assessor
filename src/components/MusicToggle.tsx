"use client";

import { useEffect, useRef, useState } from "react";

export default function MusicToggle({ src }: { src: string }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const mutedByUser = useRef(false);
  const resumeOnShow = useRef(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    let alive = true;

    const tryPlay = () => {
      if (mutedByUser.current) return Promise.resolve(false);
      return audio
        .play()
        .then(() => {
          if (alive) setPlaying(true);
          return true;
        })
        .catch(() => false);
    };

    // 1) try to start right away
    tryPlay();

    // 2) if the browser blocked it, start on the first tap/click/key
    const events = ["click", "touchend", "keydown"] as const;
    const onFirstInteraction = () => {
      tryPlay().then((ok) => {
        if (ok) events.forEach((e) => window.removeEventListener(e, onFirstInteraction));
      });
    };
    events.forEach((e) => window.addEventListener(e, onFirstInteraction));

    // 3) pause when the tab/app is hidden, resume when it comes back
    const onVisibility = () => {
      if (document.hidden) {
        resumeOnShow.current = !audio.paused;
        audio.pause();
      } else if (resumeOnShow.current && !mutedByUser.current) {
        audio.play().catch(() => {});
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    // Keep the button in sync with the real audio state
    const onPlay = () => alive && setPlaying(true);
    const onPause = () => alive && setPlaying(false);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);

    return () => {
      alive = false;
      events.forEach((e) => window.removeEventListener(e, onFirstInteraction));
      document.removeEventListener("visibilitychange", onVisibility);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.pause();
    };
  }, []);

  function toggle() {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      mutedByUser.current = false;
      audio.play().catch(() => {});
    } else {
      mutedByUser.current = true;
      audio.pause();
    }
  }

  return (
    <>
      <audio ref={audioRef} src={src} loop preload="auto" playsInline />

      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Turn music off" : "Turn music on"}
        className="fixed right-3 top-3 z-30 grid h-9 w-9 place-items-center rounded-full border border-stone-200 bg-white/90 text-[#0b1f5c] shadow-[0_8px_20px_-12px_rgba(11,31,92,.7)] backdrop-blur transition duration-300 hover:bg-[#0b1f5c] hover:text-white active:scale-95 sm:right-5 sm:top-5"
      >
        {playing ? (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M11 5 6 9H3v6h3l5 4V5z" fill="currentColor" />
            <path d="M15.5 8.5a5 5 0 0 1 0 7" />
            <path d="M18.5 5.5a9 9 0 0 1 0 13" />
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M11 5 6 9H3v6h3l5 4V5z" fill="currentColor" />
            <path d="m16 9 5 6" />
            <path d="m21 9-5 6" />
          </svg>
        )}
      </button>
    </>
  );
}
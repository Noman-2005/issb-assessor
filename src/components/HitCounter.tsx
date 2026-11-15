"use client";

import { useEffect, useState } from "react";

export default function HitCounter() {
  const [hits, setHits] = useState<number | null | undefined>(undefined);

  useEffect(() => {
    let alive = true;

    fetch("/api/hits", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        if (alive) setHits(typeof data.hits === "number" ? data.hits : null);
      })
      .catch(() => {
        if (alive) setHits(null);
      });

    return () => {
      alive = false;
    };
  }, []);

  return (
    <div className="mt-16 flex justify-start">
      <div className="inline-flex items-center gap-3 rounded-xl border border-stone-200 bg-white px-3.5 py-2 shadow-[0_8px_20px_-16px_rgba(0,0,0,.5)]">
        <span className="h-9 w-1 rounded-full bg-gradient-to-b from-[#e11d2e] via-[#0b1f5c] to-[#4da6ff]" />
        <div>
          <div className="text-[9px] font-bold uppercase tracking-[.2em] text-stone-500">
            Total Hits Till Now
          </div>
          <div className="font-serif text-lg font-bold leading-tight tabular-nums text-[#0b1f5c]">
            {hits === undefined
              ? "…"
              : hits === null
              ? "—"
              : hits.toLocaleString("en-US")}
          </div>
        </div>
      </div>
    </div>
  );
}
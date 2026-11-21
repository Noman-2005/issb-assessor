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
    <div className="mt-10 flex justify-start">
      <div className="inline-flex items-center gap-2 rounded-lg border border-stone-200 bg-white px-2.5 py-1.5 shadow-[0_6px_16px_-14px_rgba(0,0,0,.5)]">
        <span className="h-6 w-[3px] rounded-full bg-gradient-to-b from-[#e11d2e] via-[#0b1f5c] to-[#4da6ff]" />
        <div>
          <div className="text-[8px] font-bold uppercase tracking-[.18em] text-stone-500">
            Total Hits
          </div>
          <div className="font-serif text-sm font-bold leading-tight tabular-nums text-[#0b1f5c]">
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
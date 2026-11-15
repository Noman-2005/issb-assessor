"use client";

import { useState } from "react";

export default function ExpandableText({ paragraphs }: { paragraphs: string[] }) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div className="relative">
        <div
          className={`space-y-4 text-[15px] leading-relaxed text-stone-700 ${
            open ? "" : "max-h-72 overflow-hidden"
          }`}
        >
          {paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        {!open && (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#fafaf9] to-transparent" />
        )}
      </div>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="mt-3 text-sm font-semibold text-[#0b1f5c] underline-offset-4 transition hover:text-[#e11d2e] hover:underline"
      >
        {open ? "See less ↑" : "See more ↓"}
      </button>
    </div>
  );
}
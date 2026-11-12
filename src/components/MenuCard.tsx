import Link from "next/link";
import type { CSSProperties } from "react";

export default function MenuCard({
  title,
  desc,
  href,
  color,
  tag,
  i = 0,
  disabled,
}: {
  title: string;
  desc: string;
  href?: string;
  color: string;
  tag?: string;
  i?: number;
  disabled?: boolean;
}) {
  const body = (
    <div
      className={`group rise relative flex items-center gap-4 overflow-hidden rounded-2xl border border-stone-200 bg-white p-4 shadow-[0_8px_24px_-20px_rgba(0,0,0,.5)] transition duration-300 ${
        disabled ? "opacity-55" : "hover:-translate-y-0.5 hover:border-[var(--c)] hover:shadow-[0_18px_36px_-22px_var(--c)] active:scale-[.985]"
      }`}
      style={{ "--c": color, animationDelay: `${0.08 + i * 0.07}s` } as CSSProperties}
    >
      <span className="h-11 w-1 shrink-0 rounded-full" style={{ background: color }} />

      <div className="min-w-0 flex-1">
        <div className="text-[10px] font-bold uppercase tracking-[.2em]" style={{ color }}>
          {disabled ? "Coming soon" : tag ?? "Open"}
        </div>
        <b className="block truncate font-serif text-lg leading-snug">{title}</b>
        <p className="truncate text-xs text-stone-500 sm:text-sm">{desc}</p>
      </div>

      {!disabled && (
        <span
          className="grid h-8 w-8 shrink-0 place-items-center rounded-full border text-sm transition duration-300 group-hover:translate-x-1 group-hover:text-white"
          style={{ borderColor: `${color}55`, color }}
        >
          →
        </span>
      )}
    </div>
  );

  if (disabled || !href) return <div className="cursor-default">{body}</div>;
  return <Link href={href}>{body}</Link>;
}
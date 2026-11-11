import Link from "next/link";

export default function MenuCard({
  title,
  desc,
  href,
  color,
  disabled,
}: {
  title: string;
  desc: string;
  href?: string;
  color: string;
  disabled?: boolean;
}) {
  const body = (
    <div
      className={`rounded-2xl border border-t-[3px] border-stone-200 bg-white p-6 shadow-[0_10px_30px_-22px_rgba(0,0,0,.5)] transition ${
        disabled ? "opacity-55" : "hover:-translate-y-1 hover:shadow-[0_18px_36px_-18px_rgba(0,0,0,.45)] active:scale-[.98]"
      }`}
      style={{ borderTopColor: color }}
    >
      <b className="block text-lg">{title}</b>
      <span className="text-sm text-stone-500">{desc}</span>
    </div>
  );
  if (disabled || !href) return <div className="cursor-default">{body}</div>;
  return <Link href={href}>{body}</Link>;
}
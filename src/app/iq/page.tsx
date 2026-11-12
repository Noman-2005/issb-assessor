import Shell from "@/components/Shell";
import MenuCard from "@/components/MenuCard";

export default function IQ() {
  return (
    <Shell
      eyebrow="IQ"
      title="Intelligence Quotient"
      subtitle="Sharpen your verbal and non-verbal reasoning."
      back="/dashboard"
      backLabel="Dashboard"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <MenuCard i={0} tag="Self study" title="Practice" desc="Solve model tests at your own pace with instant checking." href="/iq/practice" color="#e11d2e" />
        <MenuCard i={1} tag="Timed" title="Take Test" desc="100 Verbal (60 min) followed by 36 Non-Verbal (18 min)." href="/iq/test" color="#4da6ff" />
      </div>
    </Shell>
  );
}
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
        <MenuCard
          i={0}
          tag="Self Study"
          title="Practice"
          desc="Solve model tests at your own pace with instant checking."
          href="/iq/practice"
          color="#e11d2e"
        />

        <MenuCard
          i={1}
          tag="100 Verbal + 36 Non-Verbal"
          title="Full IQ Test"
          desc="Complete the full timed assessment in one session."
          href="/iq/test"
          color="#4da6ff"
        />
      </div>
    </Shell>
  );
}
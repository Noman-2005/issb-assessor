import Shell from "@/components/Shell";
import MenuCard from "@/components/MenuCard";

export default function Practice() {
  return (
    <Shell
      eyebrow="Practice"
      title="Choose your section"
      subtitle="Pick a type of reasoning to practice."
      back="/iq"
      backLabel="IQ"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <MenuCard i={0} tag="Words and logic" title="Verbal IQ" desc="Series, coding, analogies, spelling, direction and more." href="/iq/practice/verbal" color="#2547b8" />
        <MenuCard i={1} tag="Patterns" title="Non-Verbal IQ" desc="Figure and pattern based reasoning questions." href="/iq/practice/non-verbal" color="#4da6ff" />
      </div>
    </Shell>
  );
}
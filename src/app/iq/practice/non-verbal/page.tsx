import Shell from "@/components/Shell";
import MenuCard from "@/components/MenuCard";

export default function NonVerbalList() {
  return (
    <Shell
      eyebrow="Non-Verbal IQ"
      title="Model Tests"
      subtitle="Pattern and figure based practice."
      back="/iq/practice"
      backLabel="Practice"
    >
      <div className="grid gap-3">
        <MenuCard i={0} tag="26 questions" title="Model Test 1" desc="Start practicing now." href="/iq/practice/non-verbal/1" color="#4da6ff" />
      </div>
    </Shell>
  );
}
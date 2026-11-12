import Shell from "@/components/Shell";
import MenuCard from "@/components/MenuCard";

export default function VerbalList() {
  return (
    <Shell
      eyebrow="Verbal IQ"
      title="Model Tests"
      subtitle="Select an option, check your answers and learn from the explanations."
      back="/iq/practice"
      backLabel="Practice"
    >
      <div className="grid gap-3">
        <MenuCard i={0} tag="50 questions" title="Model Test 1" desc="Start practicing now." href="/iq/practice/verbal/1" color="#e11d2e" />
        <MenuCard i={1} tag="50 questions" title="Model Test 2" desc="Start practicing now." href="/iq/practice/verbal/2" color="#0b1f5c" />
      </div>
    </Shell>
  );
}
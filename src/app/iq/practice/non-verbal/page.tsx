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
      <div className="grid gap-4 sm:grid-cols-2">
        <MenuCard i={0} title="Model Test 1" desc="Questions will be added soon." color="#4da6ff" disabled />
      </div>
    </Shell>
  );
}
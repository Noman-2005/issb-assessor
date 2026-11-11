import Shell from "@/components/Shell";
import MenuCard from "@/components/MenuCard";

export default function VerbalList() {
  return (
    <Shell title="Verbal Model Tests" back="/iq/practice" backLabel="Practice">
      <div className="grid gap-4 sm:grid-cols-2">
        <MenuCard title="Model Test 1" desc="50 questions" href="/iq/practice/verbal/1" color="#e11d2e" />
      </div>
    </Shell>
  );
}
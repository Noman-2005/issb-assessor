import Shell from "@/components/Shell";
import MenuCard from "@/components/MenuCard";

export default function NonVerbalList() {
  return (
    <Shell title="Non-Verbal Model Tests" back="/iq/practice" backLabel="Practice">
      <div className="grid gap-4 sm:grid-cols-2">
        <MenuCard title="Model Test 1" desc="Coming soon" color="#4da6ff" disabled />
      </div>
    </Shell>
  );
}
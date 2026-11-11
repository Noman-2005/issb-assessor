import Shell from "@/components/Shell";
import MenuCard from "@/components/MenuCard";

export default function Practice() {
  return (
    <Shell title="Practice" back="/iq" backLabel="IQ">
      <div className="grid gap-4 sm:grid-cols-2">
        <MenuCard title="Verbal IQ" desc="Model Tests" href="/iq/practice/verbal" color="#0b1f5c" />
        <MenuCard title="Non-Verbal IQ" desc="Model Tests" href="/iq/practice/non-verbal" color="#4da6ff" />
      </div>
    </Shell>
  );
}
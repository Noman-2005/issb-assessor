import Shell from "@/components/Shell";
import MenuCard from "@/components/MenuCard";

export default function IQ() {
  return (
    <Shell title="Intelligence Quotient" back="/dashboard" backLabel="Dashboard">
      <div className="grid gap-4 sm:grid-cols-2">
        <MenuCard title="Practice" desc="Self-study model tests with instant check" href="/iq/practice" color="#e11d2e" />
        <MenuCard title="Take Test" desc="100 Verbal (60 min) + 36 Non-Verbal (18 min)" href="/iq/test" color="#4da6ff" />
      </div>
    </Shell>
  );
}
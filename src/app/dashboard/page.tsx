import Shell from "@/components/Shell";
import MenuCard from "@/components/MenuCard";

export default function Dashboard() {
  return (
    <Shell
      eyebrow="Dashboard"
      title="Train with precision."
      subtitle="Choose a module and start preparing for the ISSB."
      back="/"
      backLabel="Home"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <MenuCard i={0} tag="Module" title="Intelligence Quotient" desc="Practice model tests and take the full timed assessment." href="/iq" color="#e11d2e" />
        <MenuCard i={1} tag="Module" title="Personality Test" desc="Word Association Test and more." href="/personality" color="#0b1f5c" />
        <MenuCard i={2} title="More modules" desc="New preparation modules are on the way." color="#4da6ff" disabled />
      </div>
    </Shell>
  );
}
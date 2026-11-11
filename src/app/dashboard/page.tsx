import Shell from "@/components/Shell";
import MenuCard from "@/components/MenuCard";

export default function Dashboard() {
  return (
    <Shell title="Dashboard" back="/" backLabel="Home">
      <div className="grid gap-4 sm:grid-cols-2">
        <MenuCard title="Intelligence Quotient (IQ)" desc="Practice and full mock test" href="/iq" color="#0b1f5c" />
        <MenuCard title="More modules" desc="Coming soon" color="#d6d3d1" disabled />
      </div>
    </Shell>
  );
}
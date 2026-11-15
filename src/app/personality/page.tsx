import Shell from "@/components/Shell";
import MenuCard from "@/components/MenuCard";

export default function Personality() {
  return (
    <Shell
      eyebrow="Personality"
      title="Personality Test"
      subtitle="Practice the psychology tests of the selection process."
      back="/dashboard"
      backLabel="Dashboard"
    >
      <div className="grid gap-3">
        <MenuCard
          i={0}
          tag="80 words"
          title="Word Association Test"
          desc="Form a sentence for each word within 10 seconds."
          href="/personality/wat"
          color="#e11d2e"
        />
        <MenuCard
          i={1}
          title="More tests"
          desc="New personality tests are on the way."
          color="#0b1f5c"
          disabled
        />
      </div>
    </Shell>
  );
}
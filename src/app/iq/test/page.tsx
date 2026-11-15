import Shell from "@/components/Shell";
import FullIQTest from "@/components/FullIQTest";

export default function TakeTest() {
  return (
    <Shell
      eyebrow="Full IQ Assessment"
      title="IQ Test"
      subtitle="100 Verbal Questions followed by 50 Non-Verbal Questions."
      back="/iq"
      backLabel="IQ"
    >
      <FullIQTest />
    </Shell>
  );
}
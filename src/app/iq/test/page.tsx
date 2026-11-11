import Shell from "@/components/Shell";

export default function TakeTest() {
  return (
    <Shell title="Take Test" back="/iq" backLabel="IQ">
      <div className="rounded-2xl border border-stone-200 bg-white p-7">
        <p className="font-semibold">Full mock assessment — coming soon</p>
        <ul className="mt-3 space-y-1 text-sm text-stone-600">
          <li>Part 1: Verbal IQ — 100 questions, 60 minutes</li>
          <li>Part 2: Non-Verbal IQ — 36 questions, 18 minutes</li>
          <li>Review panel with score and short explanations for wrong answers</li>
        </ul>
      </div>
    </Shell>
  );
}
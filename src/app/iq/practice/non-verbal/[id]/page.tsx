import PracticeTest from "@/components/PracticeTest";
import { nv1 } from "@/data/nonverbal/nv1";

const tests: Record<string, typeof nv1> = { "1": nv1 };

export async function generateStaticParams() {
  return Object.keys(tests).map((id) => ({ id }));
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const qs = tests[id];
  if (!qs) return <p className="p-10">Test not found.</p>;
  return <PracticeTest title={`Non-Verbal Test ${id}`} questions={qs} back="/iq/practice/non-verbal" />;
}
import PracticeTest from "@/components/PracticeTest";
import { mt1 } from "@/data/verbal/mt1";
import { mt2 } from "@/data/verbal/mt2";

const tests: Record<string, typeof mt1> = { "1": mt1, "2": mt2 };

export async function generateStaticParams() {
  return Object.keys(tests).map((id) => ({ id }));
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const qs = tests[id];

  if (!qs) return <p className="p-10">Test not found.</p>;

  return <PracticeTest title={`Model Test ${id}`} questions={qs} back="/iq/practice/verbal" />;
}
import PracticeTest from "@/components/PracticeTest";
import { mt1 } from "@/data/verbal/mt1";

const tests: Record<string, typeof mt1> = { "1": mt1 };

export async function generateStaticParams() {
  return [{ id: "1" }];
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const qs = tests[id];

  if (!qs) return <p className="p-10">Test not found.</p>;

  return <PracticeTest title={`Model Test ${id}`} questions={qs} back="/iq/practice/verbal" />;
}
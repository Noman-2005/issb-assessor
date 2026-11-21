import Shell from "@/components/Shell";
import ExpandableText from "@/components/ExpandableText";
import HitCounter from "@/components/HitCounter";
import OathSection from "@/components/OathSection";
import { issbHistory } from "@/data/issb-history";
import MusicToggle from "@/components/MusicToggle";

export const metadata = {
  title: "History of ISSB | ISSB Assessor",
};

export default function AboutISSB() {
  return (
    <Shell
      title="History of ISSB"
      subtitle="INTER SERVICES SELECTION BOARD"
      back="/"
      backLabel="Home"
    >
      <ExpandableText paragraphs={issbHistory} />
      <OathSection />
      <HitCounter />

      <p className="mx-auto mt-9 max-w-md text-center text-[11px] leading-relaxed text-stone-500">
        ISSB Assessor is an independent practice tool. It is not affiliated with, endorsed by, or connected to the Bangladesh Armed Forces or the ISSB.
      </p>

      <MusicToggle src="/audio/chol-chol-chol.mp3" />
    </Shell>
  );
}
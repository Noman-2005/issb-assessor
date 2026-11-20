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
      <MusicToggle src="/audio/chol-chol-chol.mp3" />
    </Shell>
  );
}
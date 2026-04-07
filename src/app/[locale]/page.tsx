import { HeroSection } from "@/components/homepage/HeroSection";
import { ProblemFraming } from "@/components/homepage/ProblemFraming";
import { SystemBoard } from "@/components/homepage/SystemBoard";
import { SolutionPath } from "@/components/homepage/SolutionPath";
import { IndustrialBreak } from "@/components/homepage/IndustrialBreak";
import { CredibilityGrid } from "@/components/homepage/CredibilityGrid";
import { PhilosophyBlock } from "@/components/homepage/PhilosophyBlock";
import { ClosingCTAs } from "@/components/homepage/ClosingCTAs";
import { ArtDivider } from "@/components/visuals/ArtDivider";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ProblemFraming />
      <SystemBoard />

      {/* Serra — Fulcrum: gravity pulling you through stages */}
      <ArtDivider
        src="/art/serra-fulcrum.jpg"
        alt="Richard Serra, Fulcrum, 1987. Photo: Matt Brown, CC BY 2.0"
        artist="Richard Serra"
        title="Fulcrum"
        year="1987"
        photographer="Matt Brown"
        license="CC BY 2.0"
        height={35}
        opacity={0.1}
      />

      <SolutionPath />
      <IndustrialBreak />
      <CredibilityGrid />
      <PhilosophyBlock />
      <ClosingCTAs />
    </>
  );
}

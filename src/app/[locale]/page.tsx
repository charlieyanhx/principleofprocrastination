import { HeroSection } from "@/components/homepage/HeroSection";
import { ProblemFraming } from "@/components/homepage/ProblemFraming";
import { SystemBoard } from "@/components/homepage/SystemBoard";
import { SolutionPath } from "@/components/homepage/SolutionPath";
import { IndustrialBreak } from "@/components/homepage/IndustrialBreak";
import { CredibilityGrid } from "@/components/homepage/CredibilityGrid";
import { PhilosophyBlock } from "@/components/homepage/PhilosophyBlock";
import { ClosingCTAs } from "@/components/homepage/ClosingCTAs";
import { ArtDivider } from "@/components/visuals/ArtDivider";
import { GenerativeDivider } from "@/components/visuals/GenerativeDivider";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ProblemFraming />
      <SystemBoard />

      {/* Brutalist concrete columns — visual weight between dark board and solution steps */}
      <ArtDivider
        src="/art/brutalist-4.jpg"
        alt="Brutalist concrete architecture with massive columns"
        height={30}
        opacity={0.08}
      />

      <SolutionPath />

      {/* Industrial ceiling beams — transition into industrial break */}
      <ArtDivider
        src="/art/brutalist-5.jpg"
        alt="Industrial concrete ceiling with steel beams"
        height={30}
        opacity={0.08}
      />

      <IndustrialBreak />

      {/* Brutalist interior — transition to credibility */}
      <ArtDivider
        src="/art/brutalist-2.jpg"
        alt="Interior brutalist concrete structure"
        height={25}
        opacity={0.06}
      />

      <CredibilityGrid />
      <PhilosophyBlock />

      {/* Generative flow — final movement into CTAs */}
      <GenerativeDivider variant="flow" height={100} />

      <ClosingCTAs />
    </>
  );
}

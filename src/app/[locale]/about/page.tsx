"use client";

import { useTranslations, useLocale } from "next-intl";
import { FadeUp } from "@/components/motion/FadeUp";
import { StaggerGroup, StaggerItem } from "@/components/motion/StaggerGroup";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Divider } from "@/components/ui/Divider";
import { BlueprintGrid } from "@/components/visuals/BlueprintGrid";
import { ArtBackground } from "@/components/visuals/ArtBackground";
import { BalanceIcon, WrenchIcon, NetworkIcon } from "@/components/visuals/TechnicalIcons";

interface ValueCard {
  title: string;
  body: string;
}

interface OfficeLocation {
  city: string;
  country: string;
  role: string;
  flag: string;
}

export default function AboutPage() {
  const t = useTranslations("about");
  const locale = useLocale();
  const isZh = locale === "zh";
  const cards = t.raw("cards") as ValueCard[];
  const offices = t.raw("offices") as {
    label: string;
    description: string;
    locations: OfficeLocation[];
    note: string;
  };

  return (
    <main>
      <section className="pt-32 pb-12 max-w-6xl mx-auto px-6">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          body={t("intro")}
        />
      </section>

      <ArtBackground
        src="/art/brutalist-2.jpg"
        alt="Interior brutalist concrete structure"
        opacity={0.05}
        position="center"
      >
        <section className="py-20 max-w-3xl mx-auto px-6 text-center">
          <BlueprintGrid className="py-4">
            <FadeUp>
              <span className="text-xs uppercase tracking-[0.2em] text-accent font-medium mb-6 block">
                {t("manifesto.label")}
              </span>
              <p className={`${isZh ? "text-2xl md:text-3xl" : "text-xl md:text-2xl"} font-light leading-relaxed text-foreground`}>
                {t("manifesto.text")}
              </p>
            </FadeUp>
          </BlueprintGrid>
        </section>
      </ArtBackground>

      <Divider className="my-12 max-w-6xl mx-auto" />

      <section className="py-16 max-w-6xl mx-auto px-6">
        <StaggerGroup className="grid md:grid-cols-3 gap-8">
          {cards.map((card, i) => (
            <StaggerItem key={i} className="h-full">
              <div className="p-8 text-center h-full">
                <div className="mb-3 flex justify-center">
                  {i === 0 && <NetworkIcon />}
                  {i === 1 && <BalanceIcon />}
                  {i === 2 && <WrenchIcon />}
                </div>
                <h3 className="text-lg font-semibold mb-3">{card.title}</h3>
                <p className="text-muted text-sm leading-relaxed">
                  {card.body}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </section>

      <Divider className="my-4 max-w-6xl mx-auto" />

      <section className="py-16 max-w-6xl mx-auto px-6">
        <FadeUp>
          <span className="text-xs uppercase tracking-[0.2em] text-accent font-medium mb-3 block">
            {offices.label}
          </span>
          <p className="text-muted text-sm leading-relaxed max-w-2xl mb-12">
            {offices.description}
          </p>
        </FadeUp>

        <StaggerGroup className="grid md:grid-cols-2 gap-8 mb-10">
          {offices.locations.map((loc, i) => (
            <StaggerItem key={i} className="h-full">
              <div className="border border-border rounded-xl p-8 h-full">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">{loc.flag}</span>
                  <div>
                    <h3 className="text-lg font-semibold">{loc.city}</h3>
                    <p className="text-muted text-xs uppercase tracking-wider">{loc.country}</p>
                  </div>
                </div>
                <p className="text-muted text-sm leading-relaxed">{loc.role}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>

        <FadeUp>
          <p className="text-muted text-xs leading-relaxed max-w-3xl border-l-2 border-accent pl-4">
            {offices.note}
          </p>
        </FadeUp>
      </section>
    </main>
  );
}

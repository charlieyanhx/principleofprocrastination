"use client";

import { useTranslations } from "next-intl";
import { FadeUp } from "@/components/motion/FadeUp";
import { StaggerGroup, StaggerItem } from "@/components/motion/StaggerGroup";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";

interface ServiceCard {
  title: string;
  scope: string;
  body: string;
  method: string;
  deliverable: string;
  timeline: string;
}

export default function ServicesPage() {
  const t = useTranslations("services");
  const cards = t.raw("cards") as ServiceCard[];

  return (
    <main>
      <section className="pt-32 pb-20 max-w-5xl mx-auto px-6">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          body={t("intro")}
        />
      </section>

      <section className="py-8 max-w-4xl mx-auto px-6">
        <StaggerGroup className="grid gap-6">
          {cards.map((card, i) => (
            <StaggerItem key={i}>
              <div className="border border-border rounded-xl p-8 md:p-10 hover:border-accent/30 transition-colors">
                {/* Header: number + title + scope */}
                <div className="flex items-baseline gap-4 mb-6">
                  <span className="text-3xl font-light text-border">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold tracking-tight">
                      {card.title}
                    </h3>
                    <p className="text-accent text-sm mt-0.5">{card.scope}</p>
                  </div>
                  <span className="ml-auto text-xs text-muted border border-border rounded-md px-2.5 py-1 shrink-0">
                    {card.timeline}
                  </span>
                </div>

                {/* Body */}
                <p className="text-foreground/80 text-[15px] leading-relaxed mb-6">
                  {card.body}
                </p>

                {/* Method + Deliverable grid */}
                <div className="grid md:grid-cols-2 gap-5">
                  <div className="bg-surface rounded-lg p-5">
                    <p className="text-xs uppercase tracking-[0.12em] text-muted mb-2 font-medium">
                      {t("methodLabel")}
                    </p>
                    <p className="text-sm text-foreground/70 leading-relaxed">
                      {card.method}
                    </p>
                  </div>
                  <div className="bg-surface rounded-lg p-5">
                    <p className="text-xs uppercase tracking-[0.12em] text-accent mb-2 font-medium">
                      {t("deliverableLabel")}
                    </p>
                    <p className="text-sm text-foreground/70 leading-relaxed">
                      {card.deliverable}
                    </p>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </section>

      {/* Timeline summary */}
      <section className="max-w-4xl mx-auto px-6 py-12">
        <FadeUp>
          <div className="flex items-center justify-center gap-0">
            {cards.map((card, i) => (
              <div key={i} className="flex items-center">
                <div className="text-center px-4 md:px-8">
                  <p className="text-xs text-accent font-medium uppercase tracking-wide">
                    {card.title}
                  </p>
                  <p className="text-lg font-semibold mt-1">{card.timeline}</p>
                </div>
                {i < cards.length - 1 && (
                  <div className="text-muted mx-1">→</div>
                )}
              </div>
            ))}
          </div>
          <p className="text-center text-muted text-sm mt-6">
            10–18 {t("totalTimeline")}
          </p>
        </FadeUp>
      </section>

      <section className="py-12 text-center">
        <FadeUp>
          <Button variant="solid" size="lg" href="/contact">
            {t("cta")}
          </Button>
        </FadeUp>
      </section>
    </main>
  );
}

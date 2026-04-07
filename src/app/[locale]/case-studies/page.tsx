"use client";

import { useTranslations } from "next-intl";
import { FadeUp } from "@/components/motion/FadeUp";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { HydraulicPiston } from "@/components/visuals/HydraulicPiston";

interface CaseCard {
  title: string;
  body: string;
}

export default function CaseStudiesPage() {
  const t = useTranslations("cases");
  const cards = t.raw("cards") as CaseCard[];

  return (
    <main>
      <section className="pt-32 pb-20 max-w-6xl mx-auto px-6">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          body={t("intro")}
        />
      </section>

      <section className="py-20 max-w-5xl mx-auto px-6">
        <FadeUp>
          {/* Desktop: horizontal flow with arrows */}
          <div className="hidden md:grid grid-cols-3 gap-0 relative">
            {cards.map((card, i) => {
              const isFirst = i === 0;
              const isLast = i === cards.length - 1;
              const isMiddle = !isFirst && !isLast;

              return (
                <div key={i} className="relative">
                  <div
                    className={`p-8 border border-border h-full ${
                      isFirst ? "rounded-l-xl" : ""
                    } ${isLast ? "rounded-r-xl" : ""} ${
                      isMiddle ? "bg-surface" : "bg-background"
                    } ${!isFirst ? "border-l-0" : ""}`}
                  >
                    <h3 className="font-semibold mb-3">{card.title}</h3>
                    <p className="text-muted text-sm leading-relaxed">
                      {card.body}
                    </p>
                  </div>

                  {/* Arrow between cards */}
                  {!isLast && (
                    <div className="absolute top-1/2 -right-5 -translate-y-1/2 z-10"><HydraulicPiston /></div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Mobile: vertical stack with down arrows */}
          <div className="md:hidden flex flex-col gap-0">
            {cards.map((card, i) => {
              const isMiddle = i === 1;
              const isLast = i === cards.length - 1;

              return (
                <div key={i}>
                  <div
                    className={`p-8 border border-border ${
                      isMiddle ? "bg-surface" : "bg-background"
                    } ${i === 0 ? "rounded-t-xl" : ""} ${
                      isLast ? "rounded-b-xl" : ""
                    } ${i > 0 ? "border-t-0" : ""}`}
                  >
                    <h3 className="font-semibold mb-3">{card.title}</h3>
                    <p className="text-muted text-sm leading-relaxed">
                      {card.body}
                    </p>
                  </div>

                  {!isLast && (
                    <div className="flex justify-center py-2"><HydraulicPiston className="rotate-90" /></div>
                  )}
                </div>
              );
            })}
          </div>
        </FadeUp>
      </section>

      <div className="mt-16 text-center pb-24">
        <FadeUp delay={0.2}>
          <p className="text-muted italic">{t("status")}</p>
          <div className="mx-auto mt-3 w-12 h-px bg-accent" />
        </FadeUp>
      </div>
    </main>
  );
}

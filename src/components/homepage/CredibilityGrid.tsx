"use client";

import { useTranslations, useLocale } from "next-intl";
import { FadeUp } from "@/components/motion/FadeUp";
import { StaggerGroup, StaggerItem } from "@/components/motion/StaggerGroup";
import { CrosshairMark, ConcentricMark, SectionCutMark } from "@/components/visuals/BlueprintWatermarks";

export function CredibilityGrid() {
  const t = useTranslations("home.institution");
  const locale = useLocale();
  const isZh = locale === "zh";
  const resources = t.raw("resources") as Array<{
    title: string;
    body: string;
  }>;

  return (
    <section className="py-24 md:py-32 bg-surface">
      <div className="max-w-6xl mx-auto px-6">
        <p className="text-xs uppercase tracking-[0.2em] text-accent font-medium mb-4">
          {t("label")}
        </p>

        <FadeUp>
          <h2 className={`${isZh ? "text-3xl md:text-4xl" : "text-2xl md:text-3xl"} font-semibold tracking-tight mb-12 max-w-2xl`}>
            {t("title")}
          </h2>
        </FadeUp>

        {/* Authority statement — full width, left accent border */}
        <FadeUp delay={0.1}>
          <div className="border-l-2 border-accent pl-8 md:pl-10 mb-16 max-w-3xl">
            <h3 className={`${isZh ? "text-xl md:text-2xl" : "text-lg md:text-xl"} font-semibold mb-4`}>
              {t("authority.subtitle")}
            </h3>
            <p className="text-muted text-base md:text-lg leading-relaxed">
              {t("authority.body")}
            </p>
          </div>
        </FadeUp>

        {/* Three proof-point cards — equal width */}
        <StaggerGroup className="grid md:grid-cols-3 gap-6">
          {resources.map((resource, index) => (
            <StaggerItem key={index} className="h-full">
              <div className="border border-border rounded-xl p-8 h-full relative overflow-hidden">
                <div className="absolute top-4 right-4">
                  {index === 0 && <ConcentricMark />}
                  {index === 1 && <CrosshairMark />}
                  {index === 2 && <SectionCutMark />}
                </div>
                <h3 className="font-semibold mb-3">{resource.title}</h3>
                <p className="text-muted text-sm leading-relaxed">
                  {resource.body}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}

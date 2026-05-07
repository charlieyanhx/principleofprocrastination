"use client";

import { useTranslations, useLocale } from "next-intl";
import { FadeUp } from "@/components/motion/FadeUp";
import { StaggerGroup, StaggerItem } from "@/components/motion/StaggerGroup";
import { ScatteredSignalsIcon, TangledRoutesIcon, ManualHandoffIcon } from "@/components/visuals/ProblemIcons";

export function ProblemFraming() {
  const t = useTranslations("home.problem");
  const locale = useLocale();
  const isZh = locale === "zh";
  const items = t.raw("items") as string[];

  return (
    <section className="py-24 border-t border-border">
      <div className="max-w-6xl mx-auto px-6">
        <FadeUp>
          <p className="text-xs uppercase tracking-[0.2em] text-accent font-medium mb-8">
            {t("label")}
          </p>
        </FadeUp>
      </div>

      {/* Desktop: staggered grid with animated icons */}
      <div className="hidden lg:block">
        <StaggerGroup className="max-w-6xl mx-auto px-6 flex gap-6">
          {items.map((item: string, i: number) => (
            <StaggerItem key={i} className="flex-1">
              <div className="border-t-2 border-accent pt-6">
                <div className="mb-4">
                  {i === 0 && <ScatteredSignalsIcon />}
                  {i === 1 && <TangledRoutesIcon />}
                  {i === 2 && <ManualHandoffIcon />}
                </div>
                <p className={`${isZh ? "text-lg" : "text-base"} font-medium leading-relaxed text-foreground`}>
                  {item}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>

      {/* Mobile: horizontal scroll with animated icons */}
      <div className="lg:hidden">
        <div className="overflow-x-auto flex gap-4 px-6 snap-x snap-mandatory">
          {items.map((item: string, i: number) => (
            <FadeUp key={i} delay={i * 0.1}>
              <div className="min-w-[300px] snap-center border-t-2 border-accent pt-6">
                <div className="mb-4">
                  {i === 0 && <ScatteredSignalsIcon />}
                  {i === 1 && <TangledRoutesIcon />}
                  {i === 2 && <ManualHandoffIcon />}
                </div>
                <p className={`${isZh ? "text-lg" : "text-base"} font-medium leading-relaxed text-foreground`}>
                  {item}
                </p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 mt-12">
        <FadeUp delay={0.2}>
          <div className="flex gap-8">
            <p className="text-xs text-muted uppercase tracking-wide">
              {t("noteA")}
            </p>
            <p className="text-xs text-muted uppercase tracking-wide">
              {t("noteB")}
            </p>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

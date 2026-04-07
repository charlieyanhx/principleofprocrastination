"use client";

import { useTranslations } from "next-intl";
import { FadeUp } from "@/components/motion/FadeUp";
import { StaggerGroup, StaggerItem } from "@/components/motion/StaggerGroup";

export function ProblemFraming() {
  const t = useTranslations("home.problem");
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

      {/* Desktop: staggered grid */}
      <div className="hidden lg:block">
        <StaggerGroup className="max-w-6xl mx-auto px-6 flex gap-6">
          {items.map((item: string, i: number) => (
            <StaggerItem key={i} className="flex-1">
              <div className="border-t-2 border-accent pt-6">
                <p className="text-lg font-medium leading-relaxed text-foreground">
                  {item}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>

      {/* Mobile: horizontal scroll */}
      <div className="lg:hidden">
        <div className="overflow-x-auto flex gap-4 px-6 snap-x snap-mandatory">
          {items.map((item: string, i: number) => (
            <FadeUp key={i} delay={i * 0.1}>
              <div className="min-w-[300px] snap-center border-t-2 border-accent pt-6">
                <p className="text-lg font-medium leading-relaxed text-foreground">
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

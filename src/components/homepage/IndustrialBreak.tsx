"use client";

import { useTranslations, useLocale } from "next-intl";
import { FadeUp } from "@/components/motion/FadeUp";
import { StaggerGroup, StaggerItem } from "@/components/motion/StaggerGroup";
import { Divider } from "@/components/ui/Divider";
import { ChainReaction } from "@/components/visuals/ChainReaction";

export function IndustrialBreak() {
  const t = useTranslations("home.industrial");
  const locale = useLocale();
  const isZh = locale === "zh";
  const outcomes = t.raw("outcomes") as Array<{
    title: string;
    body: string;
  }>;

  return (
    <section className="pt-12 md:pt-16 pb-32 md:pb-40">
      <div className="max-w-6xl mx-auto px-6">
        <ChainReaction className="" />

        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-accent font-medium mb-6">
            {t("label")}
          </p>

          <FadeUp>
            <h2 className={`${isZh ? "text-3xl md:text-4xl lg:text-5xl" : "text-2xl md:text-3xl lg:text-4xl"} font-semibold tracking-tight leading-tight max-w-4xl mx-auto whitespace-pre-line`}>
              {t("title")}
            </h2>
          </FadeUp>

          <Divider className="my-12 max-w-xs mx-auto" />

          <FadeUp delay={0.15}>
            <p className={`text-muted ${isZh ? "text-lg" : "text-base"} max-w-2xl mx-auto`}>
              {t("body")}
            </p>
          </FadeUp>
        </div>

        <StaggerGroup className="mt-20 grid md:grid-cols-3 gap-8">
          {outcomes.map((outcome, index) => (
            <StaggerItem key={index} className="h-full">
              <div className="text-center h-full">
                <h3 className="font-semibold mb-2">{outcome.title}</h3>
                <p className="text-muted text-sm leading-relaxed">
                  {outcome.body}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}

"use client";

import { useTranslations } from "next-intl";
import { FadeUp } from "@/components/motion/FadeUp";
import { StaggerGroup, StaggerItem } from "@/components/motion/StaggerGroup";
import { Divider } from "@/components/ui/Divider";
import { ChainReaction } from "@/components/visuals/ChainReaction";

export function IndustrialBreak() {
  const t = useTranslations("home.industrial");
  const outcomes = t.raw("outcomes") as Array<{
    title: string;
    body: string;
  }>;

  return (
    <section className="py-32 md:py-40">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-accent font-medium mb-6">
            {t("label")}
          </p>

          <FadeUp>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight leading-tight max-w-4xl mx-auto">
              {t("title")}
            </h2>
          </FadeUp>

          <Divider className="my-12 max-w-xs mx-auto" />

          <FadeUp delay={0.15}>
            <p className="text-muted text-lg max-w-2xl mx-auto">
              {t("body")}
            </p>
          </FadeUp>
        </div>

        <ChainReaction className="" />

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

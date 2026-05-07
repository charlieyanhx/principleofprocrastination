"use client";

import { useTranslations, useLocale } from "next-intl";
import { FadeUp } from "@/components/motion/FadeUp";
import { JansenLinkage } from "@/components/visuals/JansenLinkage";
export function PhilosophyBlock() {
  const t = useTranslations("home.philosophy");
  const locale = useLocale();
  const isZh = locale === "zh";

  return (
    <section className="py-24 md:py-32">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <FadeUp>
          <p className="text-xs uppercase tracking-[0.2em] text-accent font-medium mb-8">
            {t("label")}
          </p>

          <JansenLinkage className="mx-auto mb-8" />

          <p
            className={
              isZh
                ? "text-5xl md:text-6xl text-foreground/20 mb-12"
                : "text-3xl md:text-4xl text-foreground/20 mb-12 tracking-wide"
            }
            style={{ fontFamily: "var(--font-serif)" }}
          >
            {t("name")}
          </p>

          <p className={
            isZh
              ? "text-lg md:text-xl text-muted leading-relaxed font-light"
              : "text-base md:text-lg text-muted leading-relaxed font-light"
          }>
            {t("text")}
          </p>
        </FadeUp>
      </div>
    </section>
  );
}

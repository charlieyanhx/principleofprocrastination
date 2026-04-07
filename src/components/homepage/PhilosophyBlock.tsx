"use client";

import { useTranslations } from "next-intl";
import { FadeUp } from "@/components/motion/FadeUp";
import { JansenLinkage } from "@/components/visuals/JansenLinkage";
export function PhilosophyBlock() {
  const t = useTranslations("home.philosophy");

  return (
    <section className="py-24 md:py-32">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <FadeUp>
          <p className="text-xs uppercase tracking-[0.2em] text-accent font-medium mb-6">
            {t("label")}
          </p>

          <JansenLinkage className="mx-auto mb-6" />

          <p
            className="text-5xl md:text-6xl text-foreground/25 mb-10"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            懒人原则
          </p>

          <p className="text-xl md:text-2xl text-muted leading-relaxed font-light">
            {t("text")}
          </p>
        </FadeUp>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { FadeUp } from "@/components/motion/FadeUp";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";
import { HeroKineticMachine } from "@/components/visuals/HeroKineticMachine";

export function HeroSection() {
  const t = useTranslations("home.hero");
  const locale = useLocale();
  const isZh = locale === "zh";

  return (
    <section className="min-h-screen flex items-center relative pt-20">
      {/* Brutalist concrete texture — subtle industrial backdrop */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <Image
          src="/art/brutalist-1.jpg"
          alt="Brutalist concrete architecture"
          fill
          sizes="100vw"
          priority
          className="object-cover"
          style={{ opacity: 0.04, filter: "grayscale(100%)" }}
        />
      </div>
      <HeroKineticMachine className="absolute inset-0 pointer-events-none" />
      <div className="max-w-6xl mx-auto px-6 w-full relative z-10">
        <div className="max-w-2xl">
          <FadeUp>
            <p className="text-xs uppercase tracking-[0.2em] text-accent font-medium">
              {t("eyebrow")}
            </p>
          </FadeUp>

          <FadeUp delay={0.1}>
            <h1
              className={
                isZh
                  ? "text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.1] mt-8"
                  : "text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.1] mt-8"
              }
            >
              {t("title")}
            </h1>
          </FadeUp>

          <FadeUp delay={0.2}>
            <p
              className={
                isZh
                  ? "text-xl md:text-2xl text-muted font-light mt-8"
                  : "text-lg md:text-xl text-muted font-light mt-8"
              }
            >
              {t("subtitle")}
            </p>
          </FadeUp>

          <FadeUp delay={0.3}>
            <p className="text-muted text-base leading-relaxed mt-6 max-w-xl">
              {t("body")}
            </p>
          </FadeUp>

          <FadeUp delay={0.4}>
            <div className="flex gap-4 mt-12">
              <Button variant="solid" size="lg" href="/contact">
                {t("cta.primary")}
              </Button>
              <Button variant="ghost" size="lg" href="/resources">
                {t("cta.secondary")}
              </Button>
            </div>
          </FadeUp>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-px h-8 bg-border"
        />
      </div>
    </section>
  );
}

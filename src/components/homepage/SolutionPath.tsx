"use client";

import { useTranslations, useLocale } from "next-intl";
import { FadeUp } from "@/components/motion/FadeUp";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ChainDrive } from "@/components/visuals/ChainDrive";

interface Step {
  title: string;
  body: string;
}

const stepNumbers = ["01", "02", "03"] as const;

export function SolutionPath() {
  const t = useTranslations("home.path");
  const locale = useLocale();
  const isZh = locale === "zh";
  const steps = t.raw("steps") as Step[];

  return (
    <section className="py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading eyebrow={t("label")} title={t("title")} />

        {/* Steps area */}
        <div className="mt-16 relative">
          {/* Vertical line — desktop only */}
          <ChainDrive className="absolute left-[108px] top-0 bottom-0" />

          {steps.map((step: Step, i: number) => (
            <FadeUp key={i} delay={0.15 * i}>
              <div
                className={`flex gap-8 md:gap-16 items-start ${
                  i < steps.length - 1 ? "mb-16" : ""
                }`}
              >
                {/* Step number */}
                <span className={`${isZh ? "text-6xl md:text-7xl" : "text-5xl md:text-6xl"} font-bold text-border/50 leading-none min-w-[80px] md:min-w-[120px] text-right`}>
                  {stepNumbers[i]}
                </span>

                {/* Step content */}
                <div className="flex-1 pt-4">
                  <h3 className={`${isZh ? "text-xl md:text-2xl" : "text-lg md:text-xl"} font-semibold mb-3`}>
                    {step.title}
                  </h3>
                  <p className="text-muted text-base leading-relaxed max-w-2xl">
                    {step.body}
                  </p>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

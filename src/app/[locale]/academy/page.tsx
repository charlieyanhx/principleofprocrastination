"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { FadeUp } from "@/components/motion/FadeUp";
import { StaggerGroup, StaggerItem } from "@/components/motion/StaggerGroup";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Divider } from "@/components/ui/Divider";

interface Module {
  title: string;
  body: string;
  hours: number;
}

interface Program {
  id: string;
  title: string;
  audience: string;
  duration: string;
  description: string;
  modules: Module[];
}

export default function AcademyPage() {
  const t = useTranslations("academy");
  const programs = t.raw("programs") as Program[];
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <main>
      {/* Header */}
      <section className="pt-32 pb-12 max-w-5xl mx-auto px-6">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          body={t("intro")}
        />
      </section>

      {/* Format + enrollment meta */}
      <section className="max-w-5xl mx-auto px-6 pb-12">
        <FadeUp delay={0.1}>
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-12">
            <div>
              <span className="text-xs uppercase tracking-[0.15em] text-accent font-medium">
                {t("formatLabel")}
              </span>
              <p className="text-sm text-muted mt-1">{t("formatOptions")}</p>
            </div>
            <div>
              <span className="text-xs uppercase tracking-[0.15em] text-accent font-medium">
                {t("enrollLabel")}
              </span>
              <p className="text-sm text-muted mt-1">{t("enrollOptions")}</p>
            </div>
          </div>
        </FadeUp>
      </section>

      <Divider className="max-w-5xl mx-auto mb-8" />

      {/* Program cards */}
      <section className="max-w-5xl mx-auto px-6 pb-8">
        <StaggerGroup className="grid gap-6">
          {programs.map((program) => {
            const isExpanded = expandedId === program.id;
            const totalHours = program.modules.reduce(
              (sum, m) => sum + m.hours,
              0
            );

            return (
              <StaggerItem key={program.id}>
                <div className="border border-border rounded-xl overflow-hidden hover:border-accent/30 transition-colors">
                  {/* Card header — always visible */}
                  <button
                    onClick={() =>
                      setExpandedId(isExpanded ? null : program.id)
                    }
                    className="w-full text-left p-8 group"
                  >
                    <div className="flex items-start justify-between gap-6">
                      <div className="flex-1">
                        {/* Title row */}
                        <h3 className="text-xl md:text-2xl font-semibold tracking-tight group-hover:text-accent transition-colors">
                          {program.title}
                        </h3>

                        {/* Meta row */}
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-3">
                          <span className="text-xs text-accent uppercase tracking-[0.12em] font-medium">
                            {program.audience}
                          </span>
                          <span className="text-xs text-muted">
                            {program.duration}
                          </span>
                          <span className="text-xs text-muted">
                            {totalHours}h
                          </span>
                        </div>

                        {/* Description */}
                        <p className="text-muted text-sm leading-relaxed mt-4 max-w-3xl">
                          {program.description}
                        </p>
                      </div>

                      {/* Expand chevron */}
                      <div className="shrink-0 mt-1">
                        <motion.div
                          animate={{ rotate: isExpanded ? 180 : 0 }}
                          transition={{ duration: 0.25 }}
                          className="w-6 h-6 flex items-center justify-center text-muted group-hover:text-accent transition-colors"
                        >
                          <svg
                            width="12"
                            height="8"
                            viewBox="0 0 12 8"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M1 1.5L6 6.5L11 1.5" />
                          </svg>
                        </motion.div>
                      </div>
                    </div>
                  </button>

                  {/* Expanded module list */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          duration: 0.35,
                          ease: [0.25, 0.1, 0.25, 1],
                        }}
                        className="overflow-hidden"
                      >
                        <div className="px-8 pb-8">
                          <div className="border-t border-border pt-6">
                            <div className="grid gap-0">
                              {program.modules.map((mod, mi) => (
                                <div
                                  key={mi}
                                  className="flex gap-6 py-5 border-b border-border/50 last:border-b-0"
                                >
                                  {/* Module number */}
                                  <div className="shrink-0 w-10 pt-0.5">
                                    <span className="text-2xl font-light text-border">
                                      {String(mi + 1).padStart(2, "0")}
                                    </span>
                                  </div>

                                  {/* Module content */}
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-baseline justify-between gap-4">
                                      <h4 className="text-base font-semibold">
                                        {mod.title}
                                      </h4>
                                      <span className="text-xs text-muted shrink-0">
                                        {mod.hours}h
                                      </span>
                                    </div>
                                    <p className="text-muted text-sm leading-relaxed mt-2">
                                      {mod.body}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </section>

      {/* CTA */}
      <section className="text-center py-20">
        <FadeUp delay={0.2}>
          <Button variant="solid" size="lg" href="/contact">
            {t("cta")}
          </Button>
        </FadeUp>
      </section>
    </main>
  );
}

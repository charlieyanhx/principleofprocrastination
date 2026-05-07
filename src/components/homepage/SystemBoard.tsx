"use client";

import { useTranslations, useLocale } from "next-intl";
import { FadeUp } from "@/components/motion/FadeUp";
import { StaggerGroup, StaggerItem } from "@/components/motion/StaggerGroup";
import { Link } from "@/i18n/navigation";
import { GearTrainIcon, CamMechanismIcon, PistonIcon } from "@/components/visuals/SystemBoardIcons";

interface Column {
  title: string;
  items: string[];
}

interface LinkCard {
  title: string;
  body: string;
  cta: string;
}

const linkHrefs = ["/services", "/resources", "/about"] as const;

export function SystemBoard() {
  const t = useTranslations("home.system");
  const locale = useLocale();
  const isZh = locale === "zh";
  const columns = t.raw("columns") as Column[];
  const links = t.raw("links") as LinkCard[];

  return (
    <section className="bg-surface-dark text-white py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <FadeUp>
          <p className="text-xs uppercase tracking-[0.2em] text-accent font-medium mb-4">
            {t("label")}
          </p>
        </FadeUp>

        <FadeUp delay={0.1}>
          <h2 className={`${isZh ? "text-3xl md:text-4xl" : "text-2xl md:text-3xl"} font-semibold tracking-tight mb-4`}>
            {t("title")}
          </h2>
        </FadeUp>

        <FadeUp delay={0.15}>
          <p className={`text-surface-dark-muted ${isZh ? "text-lg" : "text-base"} mb-16 max-w-2xl`}>
            {t("body")}
          </p>
        </FadeUp>

        {/* 3-column grid */}
        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {columns.map((col: Column, i: number) => (
            <FadeUp key={i} delay={0.1 * i}>
              <div className="border-t border-white/20 pt-6">
                <div className="mb-5">
                  {i === 0 && <GearTrainIcon />}
                  {i === 1 && <CamMechanismIcon />}
                  {i === 2 && <PistonIcon />}
                </div>
                <p className="text-sm uppercase tracking-[0.15em] text-accent font-medium mb-6">
                  {col.title}
                </p>
                <StaggerGroup>
                  {col.items.map((item: string, j: number) => (
                    <StaggerItem key={j}>
                      <p className="text-surface-dark-muted text-base mb-4">
                        {item}
                      </p>
                    </StaggerItem>
                  ))}
                </StaggerGroup>
              </div>
            </FadeUp>
          ))}
        </div>

        {/* Link cards */}
        <div className="mt-16 grid md:grid-cols-3 gap-6">
          {links.map((link: LinkCard, i: number) => (
            <FadeUp key={i} delay={0.1 * i} className="h-full">
              <Link
                href={linkHrefs[i]}
                className="h-full flex flex-col border border-white/10 rounded-xl p-6 hover:border-accent/40 transition-colors"
              >
                <p className="text-white font-medium mb-2">{link.title}</p>
                <p className="text-surface-dark-muted text-sm mb-4 flex-1">
                  {link.body}
                </p>
                <span className="text-accent text-sm font-medium">
                  {link.cta}
                </span>
              </Link>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

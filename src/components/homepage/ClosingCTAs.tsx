"use client";

import { useTranslations } from "next-intl";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StaggerGroup, StaggerItem } from "@/components/motion/StaggerGroup";
import Link from "next/link";

const pathHrefs = ["/contact", "/resources", "/contact"];

export function ClosingCTAs() {
  const t = useTranslations("home.closing");
  const paths = t.raw("paths") as Array<{
    title: string;
    body: string;
    cta: string;
  }>;

  return (
    <section className="py-24 md:py-32 border-t border-border">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading
          eyebrow={t("label")}
          title={t("title")}
          align="center"
        />

        <StaggerGroup className="mt-16 grid md:grid-cols-3 gap-6">
          {paths.map((path, index) => (
            <StaggerItem key={index} className="h-full">
              <Link href={pathHrefs[index]} className="block h-full">
                <div className="border border-border rounded-xl p-8 group hover:border-accent/40 transition-all hover:-translate-y-1 duration-300 h-full flex flex-col">
                  <h3 className="text-xl font-semibold mb-3">
                    {path.title}
                  </h3>
                  <p className="text-muted text-sm leading-relaxed mb-6 flex-1">
                    {path.body}
                  </p>
                  <span className="text-accent text-sm font-medium group-hover:underline">
                    {path.cta}
                  </span>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}

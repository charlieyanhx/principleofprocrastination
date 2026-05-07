"use client";

import { useTranslations, useLocale } from "next-intl";
import { FadeUp } from "@/components/motion/FadeUp";
import { StaggerGroup, StaggerItem } from "@/components/motion/StaggerGroup";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Divider } from "@/components/ui/Divider";

interface RoleItem {
  title: string;
  body: string;
}

export default function CareersPage() {
  const t = useTranslations("careers");
  const locale = useLocale();
  const isZh = locale === "zh";
  const roles = t.raw("roles.items") as RoleItem[];

  const inputClasses =
    "w-full border border-border rounded-lg px-4 py-3 text-sm bg-background focus:outline-none focus:border-accent transition-colors";

  return (
    <main>
      {/* Hero */}
      <section className="pt-32 pb-12 max-w-6xl mx-auto px-6">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          body={t("intro")}
        />
      </section>

      {/* Open roles */}
      <section className="py-10 max-w-6xl mx-auto px-6">
        <FadeUp>
          <p className="text-sm font-medium tracking-wide uppercase text-muted mb-6">
            {t("roles.label")}
          </p>
        </FadeUp>
        <StaggerGroup className="grid md:grid-cols-3 gap-6">
          {roles.map((role, i) => (
            <StaggerItem key={i} className="h-full">
              <div className="border border-border rounded-xl p-6 h-full">
                <h3 className="font-semibold mb-2">{role.title}</h3>
                <p className="text-muted text-sm">{role.body}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </section>

      <Divider />

      {/* Application form */}
      <section className="py-20 max-w-xl mx-auto px-6">
        <FadeUp>
          <p className="text-sm font-medium tracking-wide uppercase text-muted mb-2">
            {t("apply.label")}
          </p>
          <h2 className={`${isZh ? "text-2xl" : "text-xl"} font-semibold mb-3`}>{t("apply.title")}</h2>
          <p className="text-muted text-sm mb-10">{t("apply.body")}</p>

          <form action="https://formspree.io/f/xpwzgkpr" method="POST" encType="multipart/form-data">
            <div className="mb-6">
              <label className="text-sm font-medium mb-2 block">
                {t("apply.name")}
              </label>
              <input type="text" name="name" required className={inputClasses} />
            </div>

            <div className="mb-6">
              <label className="text-sm font-medium mb-2 block">
                {t("apply.email")}
              </label>
              <input type="email" name="email" required className={inputClasses} />
            </div>

            <div className="mb-6">
              <label className="text-sm font-medium mb-2 block">
                {t("apply.message")}
              </label>
              <textarea
                name="message"
                className={`${inputClasses} h-32 resize-none`}
              />
            </div>

            <div className="mb-8">
              <label className="inline-flex items-center gap-2 cursor-pointer bg-[#b98b55] hover:bg-[#a67a48] text-white text-sm font-medium px-5 py-3 rounded-lg transition-colors">
                {t("apply.resume")}
                <input
                  type="file"
                  name="resume"
                  accept=".pdf,.doc,.docx"
                  className="sr-only"
                />
              </label>
            </div>

            <Button variant="solid" size="lg" className="w-full">
              {t("apply.submit")}
            </Button>
          </form>
        </FadeUp>
      </section>
    </main>
  );
}

"use client";

import { useTranslations } from "next-intl";
import { FadeUp } from "@/components/motion/FadeUp";
import { StaggerGroup, StaggerItem } from "@/components/motion/StaggerGroup";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { DiagnosticIcon, GearsIcon, DraftingIcon } from "@/components/visuals/TechnicalIcons";

interface InquiryCard {
  title: string;
  body: string;
}

type TypeOption = string;

export default function ContactPage() {
  const t = useTranslations("contact");
  const cards = t.raw("cards") as InquiryCard[];
  const typeOptions = t.raw("form.typeOptions") as TypeOption[];

  const inputClasses =
    "w-full border border-border rounded-lg px-4 py-3 text-sm bg-background focus:outline-none focus:border-accent transition-colors";

  return (
    <main>
      <section className="pt-32 pb-12 max-w-6xl mx-auto px-6">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          body={t("intro")}
        />
      </section>

      <section className="py-10 max-w-6xl mx-auto px-6">
        <StaggerGroup className="grid md:grid-cols-3 gap-6">
          {cards.map((card, i) => (
            <StaggerItem key={i} className="h-full">
              <div className="border border-border rounded-xl p-6 h-full">
                <div className="mb-3">
                  {i === 0 && <GearsIcon />}
                  {i === 1 && <DiagnosticIcon />}
                  {i === 2 && <DraftingIcon />}
                </div>
                <h3 className="font-semibold mb-2">{card.title}</h3>
                <p className="text-muted text-sm">{card.body}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </section>

      <section className="py-20 max-w-xl mx-auto px-6">
        <FadeUp>
          <form action="#" method="POST">
            <div className="mb-6">
              <label className="text-sm font-medium mb-2 block">
                {t("form.name")}
              </label>
              <input type="text" name="name" className={inputClasses} />
            </div>

            <div className="mb-6">
              <label className="text-sm font-medium mb-2 block">
                {t("form.email")}
              </label>
              <input type="email" name="email" className={inputClasses} />
            </div>

            <div className="mb-6">
              <label className="text-sm font-medium mb-2 block">
                {t("form.company")}
              </label>
              <input type="text" name="company" className={inputClasses} />
            </div>

            <div className="mb-6">
              <label className="text-sm font-medium mb-2 block">
                {t("form.type")}
              </label>
              <select name="type" className={inputClasses}>
                {typeOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-6">
              <label className="text-sm font-medium mb-2 block">
                {t("form.message")}
              </label>
              <textarea
                name="message"
                className={`${inputClasses} h-32 resize-none`}
              />
            </div>

            <Button variant="solid" size="lg" className="w-full">
              {t("form.submit")}
            </Button>
          </form>
        </FadeUp>
      </section>
    </main>
  );
}

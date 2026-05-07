"use client";

import { useTranslations } from "next-intl";
import { LangSwitch } from "./LangSwitch";

export function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="max-w-6xl mx-auto px-6 py-20">
      <div className="border-t border-[#e5e5e5] pt-12">
        {/* Top row */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <span className="text-sm font-medium tracking-wide text-[#0a0a0a]">
            {t("brand")}
          </span>
          <p className="text-sm text-[#737373]">{t("tagline")}</p>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <span className="text-xs text-[#737373]">
            &copy; 2025 {t("brand")}
          </span>
          <LangSwitch />
        </div>
      </div>
    </footer>
  );
}

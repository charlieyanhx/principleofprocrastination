"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";

export function LangSwitch() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  function switchTo(target: "en" | "zh") {
    if (target === locale) return;
    router.replace(pathname, { locale: target });
  }

  return (
    <div className="inline-flex items-center gap-2 text-sm">
      <button
        onClick={() => switchTo("en")}
        className={`transition ${
          locale === "en"
            ? "text-[#0a0a0a] font-medium"
            : "text-[#737373] hover:text-[#0a0a0a]"
        }`}
      >
        EN
      </button>
      <span className="text-[#e5e5e5]">|</span>
      <button
        onClick={() => switchTo("zh")}
        className={`transition ${
          locale === "zh"
            ? "text-[#0a0a0a] font-medium"
            : "text-[#737373] hover:text-[#0a0a0a]"
        }`}
      >
        中
      </button>
    </div>
  );
}

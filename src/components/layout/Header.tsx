"use client";

import { useState } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LangSwitch } from "./LangSwitch";
import { MobileNav } from "./MobileNav";

const navLinks = [
  { href: "/", key: "home" },
  { href: "/services", key: "services" },
  { href: "/resources", key: "resources" },
  { href: "/academy", key: "academy" },
  { href: "/case-studies", key: "caseStudies" },
  { href: "/about", key: "about" },
  { href: "/contact", key: "contact" },
] as const;

export function Header() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const [mobileOpen, setMobileOpen] = useState(false);

  const logoSrc =
    locale === "zh" ? "/logo-authentic-zh.png" : "/logo-authentic.png";

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#fafafa]/80 backdrop-blur-sm border-b border-[#e5e5e5]">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-3">
          {/* Logo */}
          <Link href="/" className="shrink-0">
            <Image
              src={logoSrc}
              alt="Logo"
              width={140}
              height={40}
              className="h-auto w-[140px]"
              priority
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                className="text-sm tracking-wide text-[#737373] hover:text-[#0a0a0a] transition"
              >
                {t(link.key)}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="hidden lg:flex items-center gap-5">
            <LangSwitch />
            <Link
              href="/contact"
              className="bg-[#0a0a0a] text-[#fafafa] px-5 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition"
            >
              {t("cta")}
            </Link>
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden flex flex-col justify-center items-center gap-1.5 w-10 h-10"
            aria-label="Open menu"
          >
            <span className="block w-5 h-px bg-[#0a0a0a]" />
            <span className="block w-5 h-px bg-[#0a0a0a]" />
            <span className="block w-5 h-px bg-[#0a0a0a]" />
          </button>
        </div>
      </header>

      <MobileNav isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}

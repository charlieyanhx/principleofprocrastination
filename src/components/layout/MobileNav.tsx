"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { LangSwitch } from "./LangSwitch";

const navLinks = [
  { href: "/", key: "home" },
  { href: "/services", key: "services" },
  { href: "/resources", key: "resources" },
  { href: "/academy", key: "academy" },
  { href: "/case-studies", key: "caseStudies" },
  { href: "/about", key: "about" },
  { href: "/contact", key: "contact" },
] as const;

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const t = useTranslations("nav");

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
          className="fixed inset-0 z-50 bg-[#fafafa] flex flex-col"
        >
          {/* Close button */}
          <div className="flex justify-end px-6 py-4">
            <button
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center text-[#0a0a0a]"
              aria-label="Close menu"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <line x1="2" y1="2" x2="18" y2="18" />
                <line x1="18" y1="2" x2="2" y2="18" />
              </svg>
            </button>
          </div>

          {/* Nav links */}
          <nav className="flex-1 flex flex-col justify-center px-10 gap-6">
            {navLinks.map((link, i) => (
              <motion.div
                key={link.key}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.05, duration: 0.3 }}
              >
                <Link
                  href={link.href}
                  onClick={onClose}
                  className="text-2xl tracking-wide text-[#0a0a0a] hover:text-[#b98b55] transition"
                >
                  {t(link.key)}
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Bottom section */}
          <div className="px-10 pb-12 flex flex-col gap-6">
            <LangSwitch />
            <Link
              href="/contact"
              onClick={onClose}
              className="bg-[#0a0a0a] text-[#fafafa] px-5 py-3 rounded-lg text-sm font-medium text-center hover:opacity-90 transition"
            >
              {t("cta")}
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { FadeUp } from "@/components/motion/FadeUp";
import { StaggerGroup, StaggerItem } from "@/components/motion/StaggerGroup";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Divider } from "@/components/ui/Divider";
import { MarkdownBody } from "@/components/ui/MarkdownBody";

interface ResourceItem {
  slug: string;
  category: string;
  series: string;
  seriesOrder: number;
  title: string;
  subtitle: string;
  readMinutes: number;
  date: string;
  body: string;
}

interface ColumnInfo {
  title: string;
  description: string;
}

const COLUMN_IDS = [
  "papers",
  "tools",
  "management",
  "field",
  "fundamentals",
  "china",
  "us",
  "policy",
] as const;
type ColumnId = (typeof COLUMN_IDS)[number];

/* Column icons — minimal SVG line icons */
const columnIcons: Record<ColumnId, React.ReactNode> = {
  papers: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="2" width="14" height="16" rx="1.5" /><line x1="6.5" y1="6" x2="13.5" y2="6" /><line x1="6.5" y1="9" x2="13.5" y2="9" /><line x1="6.5" y1="12" x2="10.5" y2="12" />
    </svg>
  ),
  tools: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12.5 2.5L17.5 7.5L7.5 17.5L2.5 17.5L2.5 12.5Z" /><line x1="10" y1="5" x2="15" y2="10" />
    </svg>
  ),
  management: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="10" cy="5" r="2.5" /><circle cx="4" cy="14" r="2" /><circle cx="16" cy="14" r="2" /><line x1="10" y1="7.5" x2="10" y2="10" /><line x1="10" y1="10" x2="4" y2="12" /><line x1="10" y1="10" x2="16" y2="12" />
    </svg>
  ),
  field: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 17L3 6L10 2L17 6L17 17" /><line x1="7" y1="9" x2="7" y2="13" /><line x1="10" y1="7" x2="10" y2="13" /><line x1="13" y1="10" x2="13" y2="13" /><line x1="3" y1="17" x2="17" y2="17" />
    </svg>
  ),
  fundamentals: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="10" cy="10" r="7.5" /><line x1="10" y1="6.5" x2="10" y2="11" /><circle cx="10" cy="13.5" r="0.5" fill="currentColor" />
    </svg>
  ),
  china: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="16" height="12" rx="1.5" /><line x1="2" y1="8" x2="18" y2="8" /><line x1="10" y1="4" x2="10" y2="16" />
    </svg>
  ),
  us: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="16" height="12" rx="1.5" /><line x1="2" y1="7" x2="18" y2="7" /><line x1="2" y1="10" x2="18" y2="10" /><line x1="2" y1="13" x2="18" y2="13" /><rect x="2" y="4" width="7" height="6" rx="0.5" />
    </svg>
  ),
  policy: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="2,14 6,8 10,11 14,4 18,7" /><circle cx="14" cy="4" r="1.5" />
    </svg>
  ),
};

export default function ResourcesPage() {
  const t = useTranslations("resources");
  const locale = useLocale();
  const isZh = locale === "zh";
  const items = t.raw("items") as ResourceItem[];
  const [activeColumn, setActiveColumn] = useState<ColumnId | null>(null);
  const [expandedSlug, setExpandedSlug] = useState<string | null>(null);

  // Group by column
  const columnMap: Record<string, ResourceItem[]> = {};
  for (const item of items) {
    if (!columnMap[item.series]) columnMap[item.series] = [];
    columnMap[item.series].push(item);
  }
  for (const key of Object.keys(columnMap)) {
    columnMap[key].sort((a, b) => a.seriesOrder - b.seriesOrder);
  }

  const getColumnInfo = (id: string): ColumnInfo => {
    try {
      return {
        title: t(`columns.${id}.title`),
        description: t(`columns.${id}.description`),
      };
    } catch {
      return { title: id, description: "" };
    }
  };

  const categoryLabel = (cat: string) => {
    switch (cat) {
      case "essay": return t("filterEssay");
      case "framework": return t("filterFramework");
      case "technical": return t("filterTechnical");
      default: return cat;
    }
  };

  const activeArticles = activeColumn ? columnMap[activeColumn] || [] : [];
  const allByDate = [...items].sort((a, b) => (b.date || "").localeCompare(a.date || ""));

  return (
    <main>
      {/* Header */}
      <section className="pt-32 pb-8 max-w-5xl mx-auto px-6">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          body={t("intro")}
        />
      </section>

      {/* Column grid */}
      <section className="max-w-5xl mx-auto px-6 py-8">
        <FadeUp>
          <p className="text-xs uppercase tracking-[0.15em] text-accent font-medium mb-5">
            {t("columnsLabel")}
          </p>
        </FadeUp>
        <StaggerGroup className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {COLUMN_IDS.map((id) => {
            const info = getColumnInfo(id);
            const count = columnMap[id]?.length || 0;
            const isActive = activeColumn === id;

            return (
              <StaggerItem key={id}>
                <button
                  onClick={() => {
                    setActiveColumn(isActive ? null : id);
                    setExpandedSlug(null);
                  }}
                  className={`w-full text-left p-4 rounded-xl border transition-all group ${
                    isActive
                      ? "border-accent bg-accent/5"
                      : count > 0
                        ? "border-border hover:border-accent/40"
                        : "border-border/50 opacity-50"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`${isActive ? "text-accent" : "text-muted group-hover:text-accent"} transition-colors`}>
                      {columnIcons[id]}
                    </span>
                    {count > 0 && (
                      <span className="text-xs text-muted ml-auto">
                        {count}
                      </span>
                    )}
                  </div>
                  <h3 className="text-sm font-semibold tracking-tight leading-tight">
                    {info.title}
                  </h3>
                  <p className="text-muted text-xs mt-1 leading-relaxed line-clamp-2">
                    {info.description}
                  </p>
                </button>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </section>

      <Divider className="max-w-5xl mx-auto" />

      {/* Column detail view */}
      <AnimatePresence mode="wait">
        {activeColumn && (
          <motion.section
            key={activeColumn}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="max-w-5xl mx-auto px-6 pb-24"
          >
            <div className="flex items-baseline gap-4 pt-8 pb-4">
              <h2 className={`${isZh ? "text-2xl" : "text-xl"} font-semibold tracking-tight`}>
                {getColumnInfo(activeColumn).title}
              </h2>
              <span className="text-xs text-muted">
                {activeArticles.length} {t("articleCount")}
              </span>
            </div>

            {activeArticles.length === 0 ? (
              <p className="text-muted text-sm py-12">Coming soon.</p>
            ) : (
              activeArticles.map((item, i) => (
                <ArticleRow
                  key={item.slug}
                  item={item}
                  index={i}
                  isExpanded={expandedSlug === item.slug}
                  onToggle={() =>
                    setExpandedSlug(expandedSlug === item.slug ? null : item.slug)
                  }
                  categoryLabel={categoryLabel(item.category)}
                  readTimeLabel={t("readTime")}
                  nextArticle={activeArticles[i + 1]}
                  onNext={(slug) => setExpandedSlug(slug)}
                />
              ))
            )}
          </motion.section>
        )}
      </AnimatePresence>

      {/* Default: latest articles across all columns */}
      {!activeColumn && (
        <section className="max-w-5xl mx-auto px-6 pb-24">
          <p className="text-xs uppercase tracking-[0.15em] text-accent font-medium pt-8 pb-4">
            {t("latestLabel")}
          </p>
          {allByDate.map((item) => (
            <ArticleRow
              key={item.slug}
              item={item}
              isExpanded={expandedSlug === item.slug}
              onToggle={() =>
                setExpandedSlug(expandedSlug === item.slug ? null : item.slug)
              }
              categoryLabel={categoryLabel(item.category)}
              readTimeLabel={t("readTime")}
              columnTitle={getColumnInfo(item.series).title}
            />
          ))}
        </section>
      )}
    </main>
  );
}

/* --------------------------------------------------------- */
/*  ArticleRow — shared between column view and latest view  */
/* --------------------------------------------------------- */

function ArticleRow({
  item,
  index,
  isExpanded,
  onToggle,
  categoryLabel,
  readTimeLabel,
  columnTitle,
  nextArticle,
  onNext,
}: {
  item: ResourceItem;
  index?: number;
  isExpanded: boolean;
  onToggle: () => void;
  categoryLabel: string;
  readTimeLabel: string;
  columnTitle?: string;
  nextArticle?: ResourceItem;
  onNext?: (slug: string) => void;
}) {
  return (
    <article className="border-b border-border">
      <button onClick={onToggle} className="w-full text-left py-7 group">
        <div className="flex items-start gap-5">
          {/* Optional series number */}
          {index !== undefined && (
            <span className="text-2xl font-light text-border group-hover:text-accent transition-colors shrink-0 w-8 text-right">
              {String(index + 1).padStart(2, "0")}
            </span>
          )}

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-2">
              {columnTitle && (
                <span className="text-xs text-accent font-medium uppercase tracking-[0.1em]">
                  {columnTitle}
                </span>
              )}
              <span className="text-xs text-muted">{categoryLabel}</span>
              <span className="text-xs text-muted">
                {item.readMinutes} {readTimeLabel}
              </span>
              <span className="text-xs text-muted">{item.date}</span>
            </div>
            <h3 className="text-lg md:text-xl font-semibold tracking-tight group-hover:text-accent transition-colors">
              {item.title}
            </h3>
            <p className="text-muted text-sm mt-1 leading-relaxed">
              {item.subtitle}
            </p>
          </div>

          <motion.div
            animate={{ rotate: isExpanded ? 45 : 0 }}
            transition={{ duration: 0.2 }}
            className="w-5 h-5 flex items-center justify-center text-muted group-hover:text-accent transition-colors shrink-0 mt-2"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="6" y1="0.5" x2="6" y2="11.5" />
              <line x1="0.5" y1="6" x2="11.5" y2="6" />
            </svg>
          </motion.div>
        </div>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden"
          >
            <div className={`pb-10 ${index !== undefined ? "pl-13 md:pl-14" : ""} pr-10`}>
              <MarkdownBody text={item.body} />

              {nextArticle && onNext && (
                <div className="mt-8 pt-5 border-t border-border/40">
                  <button
                    onClick={() => onNext(nextArticle.slug)}
                    className="text-sm text-accent hover:text-accent-light transition-colors"
                  >
                    Next: <span className="font-medium">{nextArticle.title}</span> →
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
}

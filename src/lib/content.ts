import fs from "fs";
import path from "path";
import matter from "gray-matter";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface ArticleMeta {
  slug: string;
  locale: "en" | "zh";
  category: "essay" | "framework" | "technical" | "tutorial";
  series: string; // "coordination" | "architecture" | "playbook" | "china"
  seriesOrder: number; // 1-based position within series
  title: string;
  subtitle: string;
  date: string; // YYYY-MM-DD
  readMinutes: number;
  tags: string[];
  sources: string[]; // URLs used during research
  status: "draft" | "review" | "published";
}

export interface Article extends ArticleMeta {
  body: string; // raw markdown body
}

export interface CourseMeta {
  slug: string;
  locale: "en" | "zh";
  programId: string; // "operators" | "management" | "technical"
  moduleIndex: number;
  title: string;
  hours: number;
  status: "draft" | "review" | "published";
}

export interface CourseModule extends CourseMeta {
  body: string;
}

/* ------------------------------------------------------------------ */
/*  Paths                                                              */
/* ------------------------------------------------------------------ */

const CONTENT_ROOT = path.join(process.cwd(), "content");
const RESOURCES_DIR = path.join(CONTENT_ROOT, "resources");
const ACADEMY_DIR = path.join(CONTENT_ROOT, "academy");

/* ------------------------------------------------------------------ */
/*  Readers                                                            */
/* ------------------------------------------------------------------ */

function readMarkdownDir<T extends { status: string }>(
  dir: string,
  locale?: string,
): (T & { body: string })[] {
  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md"));
  const items: (T & { body: string })[] = [];

  for (const file of files) {
    const raw = fs.readFileSync(path.join(dir, file), "utf-8");
    const { data, content } = matter(raw);

    // Skip drafts in production builds
    if (data.status === "draft" && process.env.NODE_ENV === "production") {
      continue;
    }

    // Filter by locale if provided
    if (locale && data.locale !== locale) continue;

    items.push({
      ...(data as T),
      body: content.trim(),
    });
  }

  return items;
}

/* ------------------------------------------------------------------ */
/*  Public API                                                         */
/* ------------------------------------------------------------------ */

/**
 * Get all published resource articles for a locale, sorted by date desc.
 */
export function getArticles(locale: string): Article[] {
  return readMarkdownDir<ArticleMeta>(RESOURCES_DIR, locale)
    .filter((a) => a.status === "published" || a.status === "review")
    .sort((a, b) => b.date.localeCompare(a.date));
}

/**
 * Get a single article by slug + locale.
 */
export function getArticle(
  slug: string,
  locale: string,
): Article | undefined {
  const all = readMarkdownDir<ArticleMeta>(RESOURCES_DIR, locale);
  return all.find((a) => a.slug === slug);
}

/**
 * Get all article slugs (for generateStaticParams).
 */
export function getAllArticleSlugs(): { slug: string; locale: string }[] {
  const all = readMarkdownDir<ArticleMeta>(RESOURCES_DIR);
  return all
    .filter((a) => a.status === "published" || a.status === "review")
    .map((a) => ({ slug: a.slug, locale: a.locale }));
}

/**
 * Get all course modules for a locale, grouped by program.
 */
export function getCourseModules(
  locale: string,
): Record<string, CourseModule[]> {
  const modules = readMarkdownDir<CourseMeta>(ACADEMY_DIR, locale)
    .filter((m) => m.status === "published" || m.status === "review")
    .sort((a, b) => a.moduleIndex - b.moduleIndex);

  const grouped: Record<string, CourseModule[]> = {};
  for (const mod of modules) {
    if (!grouped[mod.programId]) grouped[mod.programId] = [];
    grouped[mod.programId].push(mod);
  }
  return grouped;
}

/**
 * Count all content pieces by status.
 */
export function getContentStats(): {
  articles: { published: number; draft: number; review: number };
  modules: { published: number; draft: number; review: number };
} {
  const articles = readMarkdownDir<ArticleMeta>(RESOURCES_DIR);
  const modules = readMarkdownDir<CourseMeta>(ACADEMY_DIR);

  const count = (items: { status: string }[]) => ({
    published: items.filter((i) => i.status === "published").length,
    draft: items.filter((i) => i.status === "draft").length,
    review: items.filter((i) => i.status === "review").length,
  });

  return {
    articles: count(articles),
    modules: count(modules),
  };
}

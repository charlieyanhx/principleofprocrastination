#!/usr/bin/env node

/**
 * Sync content from markdown files → messages/{locale}.json
 *
 * This script reads all markdown files in content/resources/ and content/academy/,
 * and writes the data into the JSON translation files so the Next.js static export
 * picks them up via next-intl.
 *
 * Run before build: node scripts/sync-content.mjs
 *
 * Flow:
 *   content/resources/*.md  →  messages/en.json resources.items[]
 *   content/resources/*.md  →  messages/zh.json resources.items[]
 *   content/academy/*.md    →  messages/en.json academy.programs[].modules[]
 *   content/academy/*.md    →  messages/zh.json academy.programs[].modules[]
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import matter from "gray-matter";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

function readMdFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => {
      const raw = fs.readFileSync(path.join(dir, f), "utf-8");
      const { data, content } = matter(raw);
      return { ...data, body: content.trim(), _file: f };
    });
}

/* ---- Load markdown content ---- */

const resourceFiles = readMdFiles(path.join(root, "content/resources"));
const academyFiles = readMdFiles(path.join(root, "content/academy"));

/* ---- Process per locale ---- */

for (const locale of ["en", "zh"]) {
  const msgPath = path.join(root, `messages/${locale}.json`);
  const messages = JSON.parse(fs.readFileSync(msgPath, "utf-8"));

  // --- Resources ---
  const articles = resourceFiles
    .filter((f) => f.locale === locale)
    .filter((f) => f.status === "published" || f.status === "review")
    .sort((a, b) => (b.date || "").localeCompare(a.date || ""))
    .map((f) => ({
      slug: f.slug,
      category: f.category,
      series: f.series || "",
      seriesOrder: f.seriesOrder || 0,
      title: f.title,
      subtitle: f.subtitle,
      readMinutes: f.readMinutes,
      date: f.date ? f.date.slice(0, 7) : "", // YYYY-MM for display
      body: f.body,
    }));

  if (articles.length > 0) {
    messages.resources.items = articles;
    console.log(`  ${locale}: synced ${articles.length} resource articles`);
  }

  // --- Academy ---
  // Group academy files by programId, then merge into existing program structure
  const modules = academyFiles
    .filter((f) => f.locale === locale)
    .filter((f) => f.status === "published" || f.status === "review")
    .sort((a, b) => (a.moduleIndex || 0) - (b.moduleIndex || 0));

  if (messages.academy.programs && modules.length > 0) {
    const grouped = {};
    for (const mod of modules) {
      if (!grouped[mod.programId]) grouped[mod.programId] = [];
      grouped[mod.programId].push({
        title: mod.title,
        body: mod.body,
        hours: mod.hours,
      });
    }

    for (const program of messages.academy.programs) {
      if (grouped[program.id]) {
        program.modules = grouped[program.id];
      }
    }
    console.log(
      `  ${locale}: synced ${modules.length} academy modules across ${Object.keys(grouped).length} programs`,
    );
  }

  // Write back
  fs.writeFileSync(msgPath, JSON.stringify(messages, null, 2) + "\n");
}

console.log("\n✅ Content synced to messages/*.json\n");

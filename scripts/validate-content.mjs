#!/usr/bin/env node

/**
 * Content validation script.
 * Checks all markdown files in content/ for schema compliance.
 *
 * Usage: node scripts/validate-content.mjs [--fix]
 *
 * --fix: auto-calculate readMinutes from body length
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import matter from "gray-matter";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const fix = process.argv.includes("--fix");

let errors = 0;
let warnings = 0;
let fileCount = 0;

function warn(file, msg) {
  console.log(`  ⚠  ${file}: ${msg}`);
  warnings++;
}
function err(file, msg) {
  console.log(`  ✗  ${file}: ${msg}`);
  errors++;
}
function ok(file) {
  console.log(`  ✓  ${file}`);
}

/* ---- Resource articles ---- */

const REQUIRED_ARTICLE_FIELDS = [
  "slug",
  "locale",
  "category",
  "series",
  "seriesOrder",
  "title",
  "subtitle",
  "date",
  "readMinutes",
  "status",
];
const VALID_CATEGORIES = ["essay", "framework", "technical", "tutorial"];
const VALID_SERIES = ["papers", "tools", "management", "field", "fundamentals", "china", "us", "policy"];
const VALID_LOCALES = ["en", "zh"];
const VALID_STATUSES = ["draft", "review", "published"];

function validateArticle(filePath) {
  const filename = path.basename(filePath);
  fileCount++;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  let hasError = false;

  // Check required fields
  for (const field of REQUIRED_ARTICLE_FIELDS) {
    if (data[field] === undefined || data[field] === "") {
      err(filename, `missing required field: ${field}`);
      hasError = true;
    }
  }

  // Validate values
  if (data.category && !VALID_CATEGORIES.includes(data.category)) {
    err(filename, `invalid category: "${data.category}". Must be: ${VALID_CATEGORIES.join(", ")}`);
    hasError = true;
  }
  if (data.series && !VALID_SERIES.includes(data.series)) {
    err(filename, `invalid series: "${data.series}". Must be: ${VALID_SERIES.join(", ")}`);
    hasError = true;
  }
  if (data.locale && !VALID_LOCALES.includes(data.locale)) {
    err(filename, `invalid locale: "${data.locale}"`);
    hasError = true;
  }
  if (data.status && !VALID_STATUSES.includes(data.status)) {
    err(filename, `invalid status: "${data.status}"`);
    hasError = true;
  }

  // Date format
  if (data.date && !/^\d{4}-\d{2}-\d{2}$/.test(data.date)) {
    err(filename, `date must be YYYY-MM-DD, got: "${data.date}"`);
    hasError = true;
  }

  // File naming convention
  const expectedSuffix = `.${data.locale}.md`;
  if (!filename.endsWith(expectedSuffix)) {
    err(filename, `filename should end with ${expectedSuffix}`);
    hasError = true;
  }
  const expectedSlug = filename.replace(expectedSuffix, "");
  if (data.slug && data.slug !== expectedSlug) {
    warn(filename, `slug "${data.slug}" doesn't match filename slug "${expectedSlug}"`);
  }

  // Body length check
  const body = content.trim();
  if (body.length < 200) {
    warn(filename, `body is very short (${body.length} chars). Min recommended: 500`);
  }

  // Read time estimate
  const wordCount =
    data.locale === "zh"
      ? body.replace(/[a-zA-Z0-9\s]/g, "").length // Chinese char count
      : body.split(/\s+/).length; // English word count
  const estimatedMinutes = Math.ceil(wordCount / (data.locale === "zh" ? 400 : 250));

  if (fix && data.readMinutes !== estimatedMinutes) {
    data.readMinutes = estimatedMinutes;
    const updated = matter.stringify(content, data);
    fs.writeFileSync(filePath, updated);
    warn(filename, `readMinutes auto-fixed to ${estimatedMinutes}`);
  } else if (
    data.readMinutes &&
    Math.abs(data.readMinutes - estimatedMinutes) > 5
  ) {
    warn(
      filename,
      `readMinutes (${data.readMinutes}) seems off. Estimated: ${estimatedMinutes} based on ${wordCount} ${data.locale === "zh" ? "chars" : "words"}`,
    );
  }

  // Sources check
  if (
    data.status === "published" &&
    (!data.sources || data.sources.length === 0)
  ) {
    warn(filename, "published article has no sources listed");
  }

  if (!hasError) ok(filename);
}

/* ---- Academy modules ---- */

const REQUIRED_MODULE_FIELDS = [
  "slug",
  "locale",
  "programId",
  "moduleIndex",
  "title",
  "hours",
  "status",
];
const VALID_PROGRAMS = ["operators", "management", "technical"];

function validateModule(filePath) {
  const filename = path.basename(filePath);
  fileCount++;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data } = matter(raw);
  let hasError = false;

  for (const field of REQUIRED_MODULE_FIELDS) {
    if (data[field] === undefined || data[field] === "") {
      err(filename, `missing required field: ${field}`);
      hasError = true;
    }
  }

  if (data.programId && !VALID_PROGRAMS.includes(data.programId)) {
    err(filename, `invalid programId: "${data.programId}"`);
    hasError = true;
  }

  if (!hasError) ok(filename);
}

/* ---- Run ---- */

console.log("\n📄 Validating resource articles...\n");
const resourcesDir = path.join(root, "content/resources");
if (fs.existsSync(resourcesDir)) {
  for (const file of fs.readdirSync(resourcesDir).filter((f) => f.endsWith(".md"))) {
    validateArticle(path.join(resourcesDir, file));
  }
}

console.log("\n📚 Validating academy modules...\n");
const academyDir = path.join(root, "content/academy");
if (fs.existsSync(academyDir)) {
  for (const file of fs.readdirSync(academyDir).filter((f) => f.endsWith(".md"))) {
    validateModule(path.join(academyDir, file));
  }
}

console.log(`\n────────────────────────────`);
console.log(`Files: ${fileCount}  Errors: ${errors}  Warnings: ${warnings}`);
if (errors > 0) {
  console.log("❌ Validation failed.\n");
  process.exit(1);
} else {
  console.log("✅ All content valid.\n");
}

// Seed script: converts existing JSON translation content into markdown files
// Run once: node scripts/seed-content.mjs

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const en = JSON.parse(fs.readFileSync(path.join(root, "messages/en.json"), "utf-8"));
const zh = JSON.parse(fs.readFileSync(path.join(root, "messages/zh.json"), "utf-8"));

const resourcesDir = path.join(root, "content/resources");
fs.mkdirSync(resourcesDir, { recursive: true });

// Write EN articles
for (const item of en.resources.items) {
  const frontmatter = `---
slug: "${item.slug}"
locale: "en"
category: "${item.category}"
title: "${item.title.replace(/"/g, '\\"')}"
subtitle: "${item.subtitle.replace(/"/g, '\\"')}"
date: "${item.date}-15"
readMinutes: ${item.readMinutes}
tags: []
sources: []
status: "published"
---

${item.body}
`;
  fs.writeFileSync(path.join(resourcesDir, `${item.slug}.en.md`), frontmatter);
  console.log(`  wrote ${item.slug}.en.md`);
}

// Write ZH articles
for (const item of zh.resources.items) {
  const frontmatter = `---
slug: "${item.slug}"
locale: "zh"
category: "${item.category}"
title: "${item.title.replace(/"/g, '\\"')}"
subtitle: "${item.subtitle.replace(/"/g, '\\"')}"
date: "${item.date}-15"
readMinutes: ${item.readMinutes}
tags: []
sources: []
status: "published"
---

${item.body}
`;
  fs.writeFileSync(path.join(resourcesDir, `${item.slug}.zh.md`), frontmatter);
  console.log(`  wrote ${item.slug}.zh.md`);
}

// Write academy modules
const academyDir = path.join(root, "content/academy");
fs.mkdirSync(academyDir, { recursive: true });

for (const program of en.academy.programs) {
  for (let i = 0; i < program.modules.length; i++) {
    const mod = program.modules[i];
    const filename = `${program.id}-${String(i + 1).padStart(2, "0")}.en.md`;
    const content = `---
slug: "${program.id}-${String(i + 1).padStart(2, "0")}"
locale: "en"
programId: "${program.id}"
moduleIndex: ${i}
title: "${mod.title.replace(/"/g, '\\"')}"
hours: ${mod.hours}
status: "published"
---

${mod.body}
`;
    fs.writeFileSync(path.join(academyDir, filename), content);
    console.log(`  wrote ${filename}`);
  }
}

for (const program of zh.academy.programs) {
  for (let i = 0; i < program.modules.length; i++) {
    const mod = program.modules[i];
    const filename = `${program.id}-${String(i + 1).padStart(2, "0")}.zh.md`;
    const content = `---
slug: "${program.id}-${String(i + 1).padStart(2, "0")}"
locale: "zh"
programId: "${program.id}"
moduleIndex: ${i}
title: "${mod.title.replace(/"/g, '\\"')}"
hours: ${mod.hours}
status: "published"
---

${mod.body}
`;
    fs.writeFileSync(path.join(academyDir, filename), content);
    console.log(`  wrote ${filename}`);
  }
}

console.log("\nDone! Content seeded.");

"use client";

import React from "react";

/**
 * Minimal markdown renderer for resource/academy article bodies.
 * Handles the subset actually used by the editorial content:
 *   ## / ### headings, **bold**, *italic*, [text](url) links,
 *   - bullets, 1. numbered, `inline code`, ```fenced code blocks```,
 *   blank-line paragraphs.
 *
 * Deliberately not a full CommonMark implementation — just what the corpus
 * needs, with no third-party deps so the bundle stays tight.
 */

interface Props {
  text: string;
  className?: string;
}

type Block =
  | { kind: "h2" | "h3"; text: string }
  | { kind: "p"; text: string }
  | { kind: "ul" | "ol"; items: string[] }
  | { kind: "code"; lang: string; code: string };

function parseBlocks(text: string): Block[] {
  const lines = text.split("\n");
  const blocks: Block[] = [];

  let i = 0;
  while (i < lines.length) {
    const line = lines[i];

    // skip blank lines between blocks
    if (line.trim() === "") {
      i++;
      continue;
    }

    // fenced code block: ```lang\n...\n```
    const fence = line.match(/^```(\w*)\s*$/);
    if (fence) {
      const lang = fence[1];
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !/^```\s*$/.test(lines[i])) {
        codeLines.push(lines[i]);
        i++;
      }
      // skip closing fence
      if (i < lines.length) i++;
      blocks.push({ kind: "code", lang, code: codeLines.join("\n") });
      continue;
    }

    // headings
    const h3 = line.match(/^###\s+(.+)$/);
    if (h3) {
      blocks.push({ kind: "h3", text: h3[1].trim() });
      i++;
      continue;
    }
    const h2 = line.match(/^##\s+(.+)$/);
    if (h2) {
      blocks.push({ kind: "h2", text: h2[1].trim() });
      i++;
      continue;
    }

    // unordered list
    if (/^[-*]\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^[-*]\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^[-*]\s+/, "").trim());
        i++;
      }
      blocks.push({ kind: "ul", items });
      continue;
    }

    // ordered list
    if (/^\d+\.\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^\d+\.\s+/, "").trim());
        i++;
      }
      blocks.push({ kind: "ol", items });
      continue;
    }

    // paragraph: gather contiguous non-blank, non-special lines
    const para: string[] = [line];
    i++;
    while (i < lines.length) {
      const next = lines[i];
      if (
        next.trim() === "" ||
        /^#{1,6}\s/.test(next) ||
        /^[-*]\s/.test(next) ||
        /^\d+\.\s/.test(next) ||
        /^```/.test(next)
      ) {
        break;
      }
      para.push(next);
      i++;
    }
    blocks.push({ kind: "p", text: para.join(" ") });
  }

  return blocks;
}

/**
 * Render inline tokens in priority order:
 *   `code` → [text](url) → **bold** → *italic* → plain text
 *
 * Order matters because we strip already-matched ranges before falling
 * through to weaker tokenizers (e.g. *italic* must NOT eat the asterisks
 * in **bold**, which we handle by matching bold first).
 */
function renderInline(text: string, keyPrefix: string): React.ReactNode[] {
  type Tok = {
    kind: "text" | "bold" | "italic" | "code" | "link";
    value: string;
    href?: string;
  };

  // Combined matcher; checked in this order via alternation. Bold must come
  // before italic so `**x**` doesn't get partially consumed by `*x*`.
  const re =
    /(`[^`]+`)|(\[[^\]]+\]\([^)]+\))|(\*\*[^*]+\*\*)|(\*[^*\n]+\*)/g;

  const tokens: Tok[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) tokens.push({ kind: "text", value: text.slice(last, m.index) });
    const raw = m[0];
    if (m[1]) {
      tokens.push({ kind: "code", value: raw.slice(1, -1) });
    } else if (m[2]) {
      const linkMatch = raw.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (linkMatch) tokens.push({ kind: "link", value: linkMatch[1], href: linkMatch[2] });
      else tokens.push({ kind: "text", value: raw });
    } else if (m[3]) {
      tokens.push({ kind: "bold", value: raw.slice(2, -2) });
    } else if (m[4]) {
      tokens.push({ kind: "italic", value: raw.slice(1, -1) });
    }
    last = m.index + raw.length;
  }
  if (last < text.length) tokens.push({ kind: "text", value: text.slice(last) });

  return tokens.map((tok, idx) => {
    const k = `${keyPrefix}-${idx}`;
    switch (tok.kind) {
      case "bold":
        return <strong key={k}>{tok.value}</strong>;
      case "italic":
        return (
          <em key={k} className="italic">
            {tok.value}
          </em>
        );
      case "code":
        return (
          <code
            key={k}
            className="px-1 py-0.5 rounded bg-foreground/[0.06] font-mono text-[0.92em]"
          >
            {tok.value}
          </code>
        );
      case "link": {
        const href = tok.href || "#";
        const isExternal = /^https?:\/\//.test(href);
        return (
          <a
            key={k}
            href={href}
            className="text-accent underline underline-offset-2 hover:text-accent-light transition-colors"
            {...(isExternal
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
          >
            {tok.value}
          </a>
        );
      }
      default:
        return <React.Fragment key={k}>{tok.value}</React.Fragment>;
    }
  });
}

export function MarkdownBody({ text, className = "" }: Props) {
  const blocks = parseBlocks(text);

  return (
    <div className={className}>
      {blocks.map((b, i) => {
        const key = `b-${i}`;
        if (b.kind === "h2") {
          return (
            <h3
              key={key}
              className="text-foreground font-semibold text-[18px] leading-[1.4] mt-7 mb-3 first:mt-0"
            >
              {renderInline(b.text, key)}
            </h3>
          );
        }
        if (b.kind === "h3") {
          return (
            <h4
              key={key}
              className="text-foreground font-medium text-[16px] leading-[1.45] mt-6 mb-2 first:mt-0"
            >
              {renderInline(b.text, key)}
            </h4>
          );
        }
        if (b.kind === "ul") {
          return (
            <ul
              key={key}
              className="list-disc pl-6 mb-5 space-y-2 text-foreground/80 text-[15px] leading-[1.85]"
            >
              {b.items.map((it, j) => (
                <li key={`${key}-${j}`}>{renderInline(it, `${key}-${j}`)}</li>
              ))}
            </ul>
          );
        }
        if (b.kind === "ol") {
          return (
            <ol
              key={key}
              className="list-decimal pl-6 mb-5 space-y-2 text-foreground/80 text-[15px] leading-[1.85]"
            >
              {b.items.map((it, j) => (
                <li key={`${key}-${j}`}>{renderInline(it, `${key}-${j}`)}</li>
              ))}
            </ol>
          );
        }
        if (b.kind === "code") {
          return (
            <pre
              key={key}
              className="mb-5 overflow-x-auto rounded bg-foreground/[0.05] border border-border/40 px-4 py-3 text-[13px] leading-[1.55] font-mono text-foreground/85"
            >
              <code>{b.code}</code>
            </pre>
          );
        }
        if (b.kind === "p") {
          return (
            <p
              key={key}
              className="text-foreground/80 text-[15px] leading-[1.85] mb-5 last:mb-0"
            >
              {renderInline(b.text, key)}
            </p>
          );
        }
        return null;
      })}
    </div>
  );
}

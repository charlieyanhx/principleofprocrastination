#!/bin/bash

# Content Agent Runner
#
# Launches a Claude agent that continuously researches and writes articles
# for the resource library. The agent reads the backlog, picks topics,
# researches online, and writes bilingual markdown files.
#
# Usage:
#   ./scripts/run-content-agent.sh              # write one article
#   ./scripts/run-content-agent.sh --loop 5     # write 5 articles
#   ./scripts/run-content-agent.sh --loop 0     # keep going until backlog empty
#
# Prerequisites:
#   - Claude Code CLI installed and authenticated
#   - Working directory: services/web-next/

set -euo pipefail

cd "$(dirname "$0")/.."

LOOP_COUNT="${2:-1}"
WRITTEN=0

write_one() {
  echo ""
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo "  Content Agent — Article $((WRITTEN + 1))"
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo ""

  claude --print "
You are a content research and writing agent. Your instructions are in content/AGENTS.md — read that file first.

Your task for this run:

1. Read content/.queue/backlog.md
2. Pick the NEXT unclaimed topic from the Queue section (first unchecked item)
3. Research the topic thoroughly:
   - Use WebSearch to find 3-5 high-quality sources (papers, practitioner posts, documentation)
   - Use WebFetch to read the most relevant sources in full
   - Take notes on key data points, examples, and arguments
4. Write the English article: content/resources/{slug}.en.md
   - Follow the exact frontmatter schema in AGENTS.md
   - Set status: \"review\"
   - Include sources in frontmatter
   - Target 1200-2000 words for essays, 1500-2500 for frameworks, 2000-3000 for technical
5. Write the Chinese article: content/resources/{slug}.zh.md
   - NOT a translation — write natively for Chinese industrial context
   - Same frontmatter schema
   - Adjust examples and terminology for Chinese enterprises
6. Update backlog.md: move the topic from Queue to In Progress, then to Done
7. Run: node scripts/validate-content.mjs to verify
8. Run: node scripts/sync-content.mjs to update the JSON files

IMPORTANT:
- Research FIRST, write SECOND. Every article must be grounded in real sources.
- Be specific. Use real numbers, real protocols, real system names.
- No marketing language. Write like a senior practitioner.
"
}

if [ "${1:-}" = "--loop" ]; then
  if [ "$LOOP_COUNT" = "0" ]; then
    echo "Running until backlog is empty..."
    while true; do
      # Check if queue has items
      if ! grep -q '^\- \[ \]' content/.queue/backlog.md 2>/dev/null; then
        echo "Backlog empty. Done."
        break
      fi
      write_one
      WRITTEN=$((WRITTEN + 1))
      echo ""
      echo "✅ Article $WRITTEN complete. Continuing..."
      echo ""
    done
  else
    echo "Running $LOOP_COUNT articles..."
    for i in $(seq 1 "$LOOP_COUNT"); do
      write_one
      WRITTEN=$((WRITTEN + 1))
    done
  fi
else
  write_one
  WRITTEN=1
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  Done. $WRITTEN article(s) written."
echo "  Run 'node scripts/sync-content.mjs' to update site."
echo "  Run 'npm run build' to rebuild."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

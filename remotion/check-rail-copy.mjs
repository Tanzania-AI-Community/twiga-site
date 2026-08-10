#!/usr/bin/env node
// Checks every chapter `description` against the rail-copy rules in
// REPLICA_BRIEF.md §5. Rail copy is read while the video plays, so the limits
// are hard: 2 sentences, 25 words, no dashes, no semicolons.
//
//   node remotion/check-rail-copy.mjs            # all videos
//   node remotion/check-rail-copy.mjs twiga-faq  # one or more videos
//
// Exits non-zero if anything fails.

import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const ROOT = new URL("./videos/", import.meta.url).pathname;
const only = process.argv.slice(2);
const MAX_WORDS = 25;
const MAX_SENTENCES = 2;

const targets = readdirSync(ROOT).filter(
  (dir) => only.length === 0 || only.includes(dir),
);

let failures = 0;
let checked = 0;

for (const dir of targets) {
  let source;
  try {
    source = readFileSync(join(ROOT, dir, "data.ts"), "utf8");
  } catch {
    continue;
  }

  // `description:` followed by a double-quoted string, possibly on the next
  // line and possibly containing escaped quotes.
  const pattern = /description:\s*\n?\s*"((?:[^"\\]|\\.)*)"/g;
  for (const match of source.matchAll(pattern)) {
    const text = match[1].replace(/\\"/g, '"');
    checked++;

    const problems = [];
    const words = text.split(/\s+/).filter(Boolean).length;
    const sentences = text
      .split(/(?<=[.!?])\s+/)
      .filter((s) => s.trim()).length;

    if (words > MAX_WORDS) problems.push(`${words} words (max ${MAX_WORDS})`);
    if (sentences > MAX_SENTENCES)
      problems.push(`${sentences} sentences (max ${MAX_SENTENCES})`);
    if (/[—–]/.test(text)) problems.push("contains a dash");
    // A spaced ASCII hyphen is a dash wearing a disguise. Hyphenated words
    // ("well-known", "3-question") are fine and must keep passing.
    if (/\s-+\s/.test(text)) problems.push("contains a spaced hyphen");
    if (/;/.test(text)) problems.push("contains a semicolon");

    if (problems.length) {
      failures++;
      console.log(`\n${dir}: ${problems.join(", ")}`);
      console.log(`  "${text}"`);
    }
  }
}

console.log(
  `\n${checked} descriptions checked, ${failures} failing.` +
    (failures ? "" : " All within the rail-copy limits."),
);
process.exit(failures ? 1 : 0);

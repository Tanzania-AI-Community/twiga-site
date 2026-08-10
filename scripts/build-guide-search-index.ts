/**
 * Builds the guide's content search index.
 *
 * Every written guide page is a React component, so the only honest way to
 * know what is *on* a page is to render it. This imports each one, renders it
 * to static HTML with react-dom/server, and slices the result at its section
 * headings — the same ids the table of contents and `#fragment` links use.
 * One record per section, plus one for whatever sits above the first heading,
 * so a page's intro is searchable too.
 *
 * Run it with `pnpm guide:index`. It is chained into `build` and `dev` rather
 * than into a `prebuild` hook, because pnpm does not run pre/post scripts
 * unless `enable-pre-post-scripts` is turned on — and a hook that silently
 * does not run is exactly how the index would go stale.
 */
import { createElement, type ComponentType } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

import { guidePageContent } from "@/components/guide/pages";
import { guidePages } from "@/lib/guide/navigation";
// Type only — importing the module itself would pull in the JSON this script
// is here to write.
import type { GuideSearchRecord } from "@/lib/guide/search";
import DevelopersIndexPage from "@/app/guide/developers/page";
import TeachersIndexPage from "@/app/guide/teachers/page";

const OUTPUT = fileURLToPath(
  new URL("../lib/guide/search-index.json", import.meta.url),
);

/**
 * Hard cap on the body text kept per section. The whole index ships to the
 * browser inside the sidebar bundle, so sections are indexed by their opening
 * rather than in full. Long enough to cover the paragraphs that actually say
 * what a section is about, and to cut a snippet out of.
 */
const MAX_TEXT = 700;

/**
 * Closing link lists are navigation, not content. Their whole body is other
 * pages' titles, so indexing them turned every page's "Where to go next" into a
 * false hit for whatever it links to: searching "necta mock" surfaced the three
 * pages that point at the mock exams page above the page itself.
 */
const NAV_HEADINGS = new Set(["where to go next", "related pages"]);

/**
 * The two track index pages live at their own static routes rather than in
 * `guidePageContent`, so they are listed here by hand. Their hrefs are in the
 * manifest like any other page, which is where their title and section come
 * from.
 */
const TRACK_INDEX_PAGES: Record<string, ComponentType> = {
  "/guide/teachers": TeachersIndexPage as ComponentType,
  "/guide/developers": DevelopersIndexPage as ComponentType,
};

const ENTITIES: Record<string, string> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
};

function decodeEntities(value: string): string {
  return value.replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (match, body: string) => {
    if (body.startsWith("#")) {
      const code = body[1]?.toLowerCase() === "x"
        ? Number.parseInt(body.slice(2), 16)
        : Number.parseInt(body.slice(1), 10);
      return Number.isFinite(code) ? String.fromCodePoint(code) : match;
    }
    return ENTITIES[body.toLowerCase()] ?? match;
  });
}

/** Tags out, entities decoded, whitespace collapsed to single spaces. */
function toText(html: string): string {
  return decodeEntities(
    html
      // Icons and other inline graphics carry no readable text.
      .replace(/<svg\b[\s\S]*?<\/svg>/gi, " ")
      .replace(/<(script|style)\b[\s\S]*?<\/\1>/gi, " ")
      .replace(/<[^>]+>/g, " "),
  )
    .replace(/\s+/g, " ")
    .trim();
}

function truncate(value: string, limit: number): string {
  if (value.length <= limit) return value;
  const cut = value.slice(0, limit);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > limit * 0.6 ? cut.slice(0, lastSpace) : cut).trimEnd()}…`;
}

type Heading = {
  id: string;
  text: string;
  /** Where the heading tag starts, and where its content ends. */
  start: number;
  end: number;
};

/** Identical to the slugifier in GuideToc, so the fallback ids agree with it. */
function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

/**
 * Section boundaries, in document order.
 *
 * A heading counts as a boundary when it carries an explicit id — the written
 * pages give every h2 and h3 one — or when it is a bare `<h2>`/`<h3>` the
 * author wrote straight into the prose. Headings that come from a component
 * are identified by their class attribute and skipped: a numbered <Step>
 * title renders as h3, and treating each step as its own section would shred
 * a page into fragments. Their text still lands in the section they sit in.
 *
 * Ids are assigned the way GuideToc assigns them at runtime — same slug, same
 * `-2` de-duplication, same document order over every h2 and h3 — so a link to
 * `#id` finds the heading the table of contents also points at.
 */
function findHeadings(html: string): Heading[] {
  const pattern = /<h([23])\b([^>]*)>([\s\S]*?)<\/h\1>/gi;
  const matches: {
    attributes: string;
    text: string;
    start: number;
    end: number;
  }[] = [];

  for (let match = pattern.exec(html); match; match = pattern.exec(html)) {
    const [full, , attributes, inner] = match;
    const text = toText(inner);
    if (!text) continue;
    matches.push({
      attributes,
      text,
      start: match.index,
      end: match.index + full.length,
    });
  }

  const explicitId = (attributes: string) =>
    /\bid="([^"]*)"/i.exec(attributes)?.[1];

  // Every id already in the markup is taken, wherever it sits in the document.
  const used = new Set<string>();
  for (const id of html.matchAll(/\bid="([^"]*)"/gi)) used.add(decodeEntities(id[1]));

  const headings: Heading[] = [];
  for (const match of matches) {
    const explicit = explicitId(match.attributes);
    let id = explicit ? decodeEntities(explicit) : "";

    if (!id) {
      const base = slugify(match.text) || "section";
      id = base;
      for (let n = 2; used.has(id); n += 1) id = `${base}-${n}`;
      used.add(id);
    }

    const fromComponent = /\bclass="/i.test(match.attributes) && !explicit;
    if (fromComponent) continue;

    headings.push({ id, text: match.text, start: match.start, end: match.end });
  }

  return headings;
}

function recordsForPage(
  href: string,
  Component: ComponentType,
): GuideSearchRecord[] {
  const page = guidePages.find((entry) => entry.href === href);
  if (!page) {
    console.warn(`  skipped ${href} — no manifest entry in lib/guide/navigation.ts`);
    return [];
  }

  const html = renderToStaticMarkup(createElement(Component));
  const headings = findHeadings(html);

  const base = {
    href,
    pageTitle: page.title,
    section: page.section,
    track: page.track,
  };

  const records: GuideSearchRecord[] = [];

  // Everything above the first heading: the title block, its description, and
  // any opening paragraphs. The eyebrow and the h1 are dropped — they repeat
  // the section and the title, which search already has as their own fields,
  // and leaving them in makes every intro snippet open by restating the title.
  const introEnd = headings[0]?.start ?? html.length;
  const intro = toText(
    html.slice(0, introEnd).replace(/^(\s*<header\b[^>]*>)[\s\S]*?<\/h1>/, "$1"),
  );
  if (intro) records.push({ ...base, text: truncate(intro, MAX_TEXT) });

  headings.forEach((heading, index) => {
    if (NAV_HEADINGS.has(heading.text.trim().toLowerCase())) return;
    const bodyEnd = headings[index + 1]?.start ?? html.length;
    records.push({
      ...base,
      headingId: heading.id,
      headingText: heading.text,
      text: truncate(toText(html.slice(heading.end, bodyEnd)), MAX_TEXT),
    });
  });

  return records;
}

function build(): GuideSearchRecord[] {
  const pages: [string, ComponentType][] = [
    ...Object.entries(TRACK_INDEX_PAGES),
    ...Object.entries(guidePageContent),
  ];

  const records: GuideSearchRecord[] = [];
  for (const [href, Component] of pages) {
    try {
      const pageRecords = recordsForPage(href, Component);
      records.push(...pageRecords);
      console.log(`  ${String(pageRecords.length).padStart(3)} sections  ${href}`);
    } catch (error) {
      // One broken page should not cost the whole index. It just goes back to
      // being findable by title alone.
      console.error(`  FAILED ${href}:`, error);
    }
  }

  // Manifest order, so equal-scoring results come back in reading order.
  const order = new Map(guidePages.map((page, index) => [page.href, index]));
  return records.sort(
    (a, b) => (order.get(a.href) ?? 0) - (order.get(b.href) ?? 0),
  );
}

console.log("Building guide search index…");
const index = build();
const json = JSON.stringify(index);
writeFileSync(OUTPUT, `${json}\n`, "utf8");

const pageCount = new Set(index.map((record) => record.href)).size;
console.log(
  `\n${index.length} records from ${pageCount} pages → lib/guide/search-index.json (${(
    Buffer.byteLength(json) / 1024
  ).toFixed(1)} KB)`,
);

import rawIndex from "./search-index.json";
import {
  guidePages,
  type FlatGuidePage,
  type GuideTrackSlug,
} from "./navigation";

/**
 * One record per heading section of one guide page, generated from the
 * rendered pages by `scripts/build-guide-search-index.ts` (`pnpm guide:index`).
 * `headingId` is absent on the record covering everything above the first
 * heading, which is how a page's opening stays searchable.
 */
export type GuideSearchRecord = {
  href: string;
  pageTitle: string;
  section: string;
  track: GuideTrackSlug;
  headingId?: string;
  headingText?: string;
  text: string;
};

export type GuideSearchResult = {
  page: FlatGuidePage;
  /** Where the link goes — the page, or the section inside it. */
  href: string;
  headingId?: string;
  headingText?: string;
  /** Excerpt around the first matching word, or the page summary. */
  snippet: string;
  /** How many of the query's words this page carries. Ranked before `score`. */
  matched: number;
  score: number;
};

const index = rawIndex as unknown as GuideSearchRecord[];

const recordsByHref = new Map<string, GuideSearchRecord[]>();
for (const record of index) {
  const existing = recordsByHref.get(record.href);
  if (existing) existing.push(record);
  else recordsByHref.set(record.href, [record]);
}

/**
 * Field weights. A page title outranks a heading, which outranks body text, so
 * "architecture" lands on the Architecture page rather than on every page that
 * mentions the word.
 */
const WEIGHT = {
  title: 12,
  heading: 7,
  section: 4,
  summary: 3,
  text: 1.5,
} as const;

/** A hit that starts mid-word counts, but for much less than a whole word. */
const PARTIAL = 0.4;

const SNIPPET_LENGTH = 140;
const SNIPPET_LEAD = 36;

/**
 * Words carried by nearly every sentence in the guide. Requiring them would
 * make "how do I re-embed the textbook" score on "how", "do" and "the" instead
 * of on the words that mean something, so they are dropped — unless that would
 * leave nothing to search for.
 */
const STOPWORDS = new Set([
  "a", "about", "an", "and", "any", "are", "as", "at", "be", "by", "can",
  "do", "does", "for", "from", "get", "has", "have", "how", "i", "if", "in",
  "into", "is", "it", "its", "me", "my", "not", "of", "on", "or", "so",
  "that", "the", "then", "there", "this", "to", "up", "want", "was", "what",
  "when", "where", "which", "why", "will", "with", "you", "your",
]);

/**
 * Query words, in the same shape the scorer and the snippet highlighter both
 * expect, so what gets ranked is what gets marked.
 */
export function tokenize(query: string): string[] {
  const words = query
    .toLowerCase()
    .split(/[^\p{L}\p{N}]+/u)
    .filter(Boolean);

  const meaningful = words.filter(
    (word) => word.length > 1 && !STOPWORDS.has(word),
  );
  return meaningful.length > 0 ? meaningful : words;
}

function isWordBoundary(haystack: string, at: number): boolean {
  if (at === 0) return true;
  return !/[\p{L}\p{N}]/u.test(haystack[at - 1]);
}

/** 0 when absent, the full weight on a word start, a fraction mid-word. */
function fieldScore(haystack: string, token: string, weight: number): number {
  const at = haystack.indexOf(token);
  if (at === -1) return 0;
  return isWordBoundary(haystack, at) ? weight : weight * PARTIAL;
}

type Fields = {
  title: string;
  section: string;
  summary: string;
  heading: string;
  text: string;
};

/**
 * Every word has to appear somewhere, so "exit ticket geography" still finds
 * the exit ticket page even though no single field holds the whole phrase.
 * Each word then scores at its best field, and the whole phrase appearing
 * intact is worth a bonus on top.
 */
/**
 * How well one record answers the query.
 *
 * `matched` is how many of the query's words it contains at all, and it is
 * ranked ahead of `score` everywhere. That is what used to be a hard AND: a
 * record missing any word scored zero, so "twiga didnt reply" found nothing,
 * because the pages write "doesn't". Teachers type without apostrophes and
 * misspell things, and a search that answers those with a blank box is worse
 * than one that answers them with the right page ranked below an exact match.
 */
type Hit = { score: number; matched: number };

function scoreRecord(fields: Fields, tokens: string[], phrase: string): Hit {
  let score = 0;
  let matched = 0;

  for (const token of tokens) {
    const best = Math.max(
      fieldScore(fields.title, token, WEIGHT.title),
      fieldScore(fields.heading, token, WEIGHT.heading),
      fieldScore(fields.section, token, WEIGHT.section),
      fieldScore(fields.summary, token, WEIGHT.summary),
      fieldScore(fields.text, token, WEIGHT.text),
    );
    if (best === 0) continue;
    matched += 1;
    score += best;
  }

  if (matched === 0) return { score: 0, matched: 0 };

  if (phrase.includes(" ")) {
    if (fields.title.includes(phrase)) score += 8;
    else if (fields.heading.includes(phrase)) score += 5;
    else if (fields.text.includes(phrase)) score += 3;
  }

  return { score, matched };
}

/** Coverage first, then score. Used to pick a page's best section and to rank. */
function better(a: Hit, b: Hit): boolean {
  if (a.matched !== b.matched) return a.matched > b.matched;
  return a.score > b.score;
}

/** A window of `text` around the first matching word, with ellipses. */
function buildSnippet(text: string, tokens: string[]): string {
  if (!text) return "";

  // Longest word first: "re-embed the textbook" should centre the excerpt on
  // "textbook", not on the "re" inside "in review".
  const lower = text.toLowerCase();
  let at = -1;
  for (const token of [...tokens].sort((a, b) => b.length - a.length)) {
    at = lower.indexOf(token);
    if (at !== -1) break;
  }

  if (at === -1) {
    return text.length > SNIPPET_LENGTH
      ? `${text.slice(0, SNIPPET_LENGTH).trimEnd()}…`
      : text;
  }

  let start = Math.max(0, at - SNIPPET_LEAD);
  if (start > 0) {
    const space = text.indexOf(" ", start);
    if (space !== -1 && space < at) start = space + 1;
  }

  let end = Math.min(text.length, start + SNIPPET_LENGTH);
  if (end < text.length) {
    const space = text.lastIndexOf(" ", end);
    if (space > at) end = space;
  }

  return `${start > 0 ? "…" : ""}${text.slice(start, end).trim()}${
    end < text.length ? "…" : ""
  }`;
}

/**
 * Searches page titles, sidebar sections and summaries from the manifest
 * alongside the generated content index, scoped to one track.
 *
 * Results are one per page: a page whose every section mentions "WhatsApp"
 * appears once, at its best-matching section, with a small bump for the
 * others. Pages with no written content yet are still matched on their
 * manifest entry, so the sidebar never loses a route it lists.
 */
export function searchGuide(
  query: string,
  track: GuideTrackSlug,
  limit = 12,
): GuideSearchResult[] {
  const phrase = query.trim().toLowerCase();
  const tokens = tokenize(query);
  if (tokens.length === 0) return [];

  const results: GuideSearchResult[] = [];

  for (const page of guidePages) {
    if (page.track !== track) continue;

    const shared = {
      title: page.title.toLowerCase(),
      section: page.section.toLowerCase(),
      summary: (page.summary ?? "").toLowerCase(),
    };

    const records = recordsByHref.get(page.href);
    let best: { record?: GuideSearchRecord } & Hit = { score: 0, matched: 0 };
    let matches = 0;

    if (records) {
      for (const record of records) {
        const hit = scoreRecord(
          {
            ...shared,
            heading: (record.headingText ?? "").toLowerCase(),
            text: record.text.toLowerCase(),
          },
          tokens,
          phrase,
        );
        if (hit.matched === 0) continue;
        matches += 1;
        // Strictly better, so ties keep the earlier section — and the
        // record above the first heading, which is a page's own opening.
        if (better(hit, best)) best = { record, ...hit };
      }
    } else {
      // No written content yet. The manifest entry is all there is.
      const hit = scoreRecord(
        { ...shared, heading: "", text: shared.summary },
        tokens,
        phrase,
      );
      if (hit.matched > 0) {
        matches = 1;
        best = hit;
      }
    }

    if (best.matched === 0) continue;

    const record = best.record;
    results.push({
      page,
      href: record?.headingId ? `${page.href}#${record.headingId}` : page.href,
      headingId: record?.headingId,
      headingText: record?.headingText,
      snippet: buildSnippet(record?.text ?? page.summary ?? "", tokens),
      matched: best.matched,
      // Several matching sections is weak evidence the page is about the
      // query, but never enough to outrank a better single match.
      score: best.score + Math.min(matches - 1, 3) * 0.75,
    });
  }

  // Coverage first: a page carrying every word the teacher typed always sits
  // above one carrying only some of them, however high the partial page scores.
  return results
    .sort((a, b) => b.matched - a.matched || b.score - a.score)
    .slice(0, limit);
}

/**
 * Splits text into alternating plain and matching runs so the caller can mark
 * the query terms without dangling HTML through the component.
 */
export function highlightParts(
  text: string,
  tokens: string[],
): { text: string; hit: boolean }[] {
  if (tokens.length === 0 || !text) return [{ text, hit: false }];

  const lower = text.toLowerCase();
  const spans: [number, number][] = [];

  // Only whole-word starts are marked. "re" from "re-embed" otherwise lights
  // up the middle of "already", which reads as a rendering bug.
  for (const token of tokens) {
    let from = 0;
    for (
      let at = lower.indexOf(token, from);
      at !== -1;
      at = lower.indexOf(token, from)
    ) {
      if (isWordBoundary(lower, at)) spans.push([at, at + token.length]);
      from = at + token.length;
    }
  }

  if (spans.length === 0) return [{ text, hit: false }];
  spans.sort((a, b) => a[0] - b[0]);

  const parts: { text: string; hit: boolean }[] = [];
  let cursor = 0;

  for (const [start, end] of spans) {
    if (end <= cursor) continue;
    const from = Math.max(start, cursor);
    if (from > cursor) parts.push({ text: text.slice(cursor, from), hit: false });
    parts.push({ text: text.slice(from, end), hit: true });
    cursor = end;
  }

  if (cursor < text.length) parts.push({ text: text.slice(cursor), hit: false });
  return parts;
}

import React, { type CSSProperties, type ReactNode } from "react";
import { COLOR } from "./tokens";

/**
 * WhatsApp's inline markup, rendered.
 *
 * Every script in this guide is derived from a real WhatsApp transcript, so
 * every one of them carries `_italic_`, `*bold*` and `~strikethrough~` — the bot
 * uses italics for the section headings of a lesson plan, which is most of what
 * makes a structured reply read as a document rather than a paragraph.
 *
 * Before this existed each video stripped the markers independently, because a
 * raw string renders them as literal underscores. That is 26 separate decisions
 * about how a lesson plan should look, which is exactly the drift the shared
 * system is here to prevent.
 *
 * Deliberately NOT a markdown parser. It handles the three inline marks
 * WhatsApp actually has, on a single line, with no nesting — anything more and
 * scripts start carrying formatting the source transcript never had.
 */

const STYLE: Record<string, CSSProperties> = {
  "*": { fontWeight: 600 },
  _: { fontStyle: "italic" },
  "~": { textDecoration: "line-through" },
};

/** A marker only opens/closes at a word boundary, so `snake_case` is safe. */
const BOUNDARY = /[\s.,;:!?()"'[\]{}<>/\\—–-]/;
const isBoundary = (char: string | undefined) =>
  char === undefined || BOUNDARY.test(char);

/** A quoted line, WhatsApp's `> ` prefix. */
const QUOTE = /^> ?/;
const HAS_QUOTE = /^> /m;

/**
 * Render a bubble's text.
 *
 * Fast path — and the overwhelmingly common one — is inline only: the bubble
 * has `white-space: pre-wrap`, so newlines need no markup at all. A message
 * containing a `> ` line switches to block mode, where each line becomes its own
 * element so the quote can carry a rule down its left edge.
 *
 * Block mode reproduces `pre-wrap` exactly: one line per element at the bubble's
 * own line-height, blank lines held open by a non-breaking space. That matters
 * because the hidden measuring layer renders through this same function — if the
 * two modes disagreed about height, long copy would be cropped.
 */
export function formatText(text: string): ReactNode {
  return HAS_QUOTE.test(text) ? formatBlocks(text) : formatInline(text);
}

function formatBlocks(text: string): ReactNode {
  const out: ReactNode[] = [];
  const lines = text.split("\n");
  let i = 0;
  let key = 0;

  while (i < lines.length) {
    if (QUOTE.test(lines[i])) {
      const quoted: string[] = [];
      while (i < lines.length && QUOTE.test(lines[i])) {
        quoted.push(lines[i].replace(QUOTE, ""));
        i++;
      }
      out.push(
        <span
          key={key++}
          style={{
            display: "block",
            borderLeft: `4px solid ${COLOR.quoteRule}`,
            paddingLeft: "0.75em",
            margin: "0.25em 0",
          }}
        >
          {quoted.map((line, n) => (
            <Line key={n} text={line} />
          ))}
        </span>,
      );
      continue;
    }
    out.push(<Line key={key++} text={lines[i]} />);
    i++;
  }

  return out;
}

/** One rendered line. Empty lines keep their height, as `pre-wrap` would. */
const Line: React.FC<{ text: string }> = ({ text }) => (
  <span style={{ display: "block" }}>
    {text === "" ? " " : formatInline(text)}
  </span>
);

function formatInline(text: string): ReactNode {
  const out: ReactNode[] = [];
  let buffer = "";
  let key = 0;
  let i = 0;

  const flush = () => {
    if (buffer) {
      out.push(buffer);
      buffer = "";
    }
  };

  while (i < text.length) {
    const mark = text[i];
    const canOpen =
      STYLE[mark] !== undefined &&
      isBoundary(text[i - 1]) &&
      text[i + 1] !== undefined &&
      !/\s/.test(text[i + 1]) &&
      // A run of the same character is not markup. Worksheets are full of
      // `____` fill-in rules, and treating the first one as an opener ate two
      // of every four underscores.
      text[i + 1] !== mark;

    if (canOpen) {
      const close = findClose(text, i, mark);
      if (close > i + 1) {
        flush();
        out.push(
          <span key={key++} style={STYLE[mark]}>
            {text.slice(i + 1, close)}
          </span>,
        );
        i = close + 1;
        continue;
      }
    }

    buffer += text[i];
    i++;
  }

  flush();
  // A string, when there is no markup — keeps the common case allocation-free
  // and keeps the measuring layer identical to the rendered bubble.
  return out.length === 1 && typeof out[0] === "string" ? out[0] : out;
}

/**
 * Index of the closing marker, or -1. Emphasis never spans a line break: a
 * stray marker in one line would otherwise swallow the rest of the message.
 *
 * A marker inside a run of the same character is skipped for the same reason it
 * cannot open one: `_Total Score: __ / 6_` closes on the final underscore, not
 * on the blank in the middle of it.
 */
function findClose(text: string, open: number, mark: string): number {
  for (let i = open + 1; i < text.length; i++) {
    if (text[i] === "\n") return -1;
    if (text[i] !== mark) continue;
    if (text[i - 1] === mark || text[i + 1] === mark) continue;
    if (!/\s/.test(text[i - 1]) && isBoundary(text[i + 1])) return i;
  }
  return -1;
}

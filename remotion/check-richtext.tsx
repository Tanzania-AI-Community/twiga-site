// Regression guard for `shared/richText.tsx`, which parses the WhatsApp inline
// marks in every bubble of all 26 videos. A parsing change that eats a
// character is invisible in a typecheck and easy to miss in a still.
//
//   npx tsx remotion/check-richtext.tsx
//
// Exits non-zero if anything fails.

import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { formatText } from "./shared/richText";

type Case = {
  input: string;
  /** What the rendered markup must contain. */
  expect: string;
  why: string;
};

const CASES: Case[] = [
  {
    input: "_Topic:_ Longitudes and Latitudes",
    expect: "<span style=\"font-style:italic\">Topic:</span> Longitudes",
    why: "the section headings that make a reply read as a document",
  },
  {
    input: "*bold* and ~gone~",
    expect: "<span style=\"font-weight:600\">bold</span>",
    why: "the other two WhatsApp marks",
  },
  {
    input: "snake_case_name stays literal",
    expect: "snake_case_name stays literal",
    why: "a marker only opens at a word boundary",
  },
  {
    input: "1. Arusha, Tanzania  ________",
    expect: "________",
    why: "a worksheet fill-in rule is not markup",
  },
  {
    input: "_Total Score: __ / 6_",
    expect: "<span style=\"font-style:italic\">Total Score: __ / 6</span>",
    why: "a run of markers inside emphasis must not close it early",
  },
  {
    input: "Name: ____  Date: ____",
    expect: "Name: ____  Date: ____",
    why: "two blanks on one line",
  },
  {
    input: "a _dangling marker",
    expect: "a _dangling marker",
    why: "an unclosed marker stays literal",
  },
  {
    input: "_spans\nlines_",
    expect: "_spans\nlines_",
    why: "emphasis never crosses a line break",
  },
  {
    input: "> quoted line\n> and another",
    expect: "border-left:4px solid",
    why: "consecutive quote lines become one block with a rule",
  },
];

const render = (text: string) =>
  renderToStaticMarkup(
    React.createElement(React.Fragment, null, formatText(text)),
  );

let failures = 0;

for (const { input, expect, why } of CASES) {
  const html = render(input);

  const problems: string[] = [];
  if (!html.includes(expect)) problems.push(`missing ${JSON.stringify(expect)}`);

  // Nothing may vanish: every marker character in the input is either rendered
  // or consumed by exactly one emphasis span it opened and closed.
  for (const mark of ["_", "*", "~"]) {
    const inCount = input.split(mark).length - 1;
    const outCount = html.split(mark).length - 1;
    const style = { _: "font-style:italic", "*": "font-weight:600", "~": "text-decoration:line-through" }[mark];
    const spans = html.split(`<span style="${style}">`).length - 1;
    if (outCount !== inCount - spans * 2)
      problems.push(
        `${mark} accounting: ${inCount} in, ${spans * 2} consumed, ${outCount} out`,
      );
  }

  if (problems.length) {
    failures++;
    console.log(`\nFAIL ${JSON.stringify(input)}  (${why})`);
    console.log(`  ${problems.join("; ")}`);
    console.log(`  rendered: ${html}`);
  }
}

console.log(
  `\n${CASES.length} cases checked, ${failures} failing.` +
    (failures ? "" : " richText renders every mark and eats nothing."),
);
process.exit(failures ? 1 : 0);

// The conversation and its timing for /guide/teachers/lesson-plans/anatomy.
//
// Source: content/video-scripts/teachers/lesson-plans/anatomy.md, which is
// itself cut from the WhatsApp log (Geography Form 1 plan at L1088–L1158,
// assessment follow-up at L214–L217, worksheet at L1780–L1790).
//
// The arc is the page's goal in six turns: a plan arrives, the teacher reads it
// against their own plan book, names the column that is missing, asks for it in
// the same thread, and gets it — then turns a stage of the plan into a
// worksheet and is told plainly that there is no file to download.
//
// Everything else — the look, the camera, the bubble motion — comes from
// `remotion/shared`.

import { buildScript, LONG_MESSAGE, type Message } from "../../shared";

/**
 * The returned plan, trimmed to fit the bubble. Every line survives from the
 * script; nothing is added.
 *
 * The `_italic_` markers are the script's own and are rendered as italics by
 * `shared/richText.tsx`. They matter here more than anywhere: the section
 * headings are the point of this beat, and a teacher should be able to run a
 * finger down them and notice there is no assessment row.
 */
const LESSON_PLAN = [
  "_Form 1 Geography – Lesson Plan_",
  "_Topic:_ Longitudes and Latitudes",
  "_Duration:_ 45 minutes",
  "",
  "_Learning Objectives:_",
  "1. Define latitude and longitude and explain their importance in locating places.",
  "",
  "_Key Concepts:_",
  "- The Earth rotates 360° in 24 hours → 15° = 1 hour.",
  "",
  "_Materials Needed:_",
  "- Globe or world map with grid lines",
  "",
  "_Lesson Flow:_",
  "1. _Introduction (10 minutes)_ — show a globe",
  "2. _Direct Instruction (15 minutes)_ — writing coordinates, 15° = 1 hour",
  "3. _Class Activity (15 minutes)_ — coordinates of Arusha, London, Sydney",
  "4. _Closure (5 minutes)_ — recap, assign homework",
  "",
  "_Homework:_",
  "1. Find the latitude and longitude of your hometown.",
  "2. Pick a country in the Southern Hemisphere — warmer or colder than Tanzania, and why?",
  "",
  "_Teacher Notes:_",
  "- Common mistake: students reverse the order or forget directions (N/S, E/W).",
].join("\n");

/** The section the plan book wanted and the plan did not have. */
const ASSESSMENT = [
  "_Assessment Methods — Longitudes and Latitudes_",
  "",
  "- Check group answers during the class activity against the map.",
  "- Compare written coordinates to the textbook examples for correct order and direction.",
  "- Use the homework as evidence of understanding: does the student write latitude first?",
  "",
  "Would you like a short quiz on this topic as well?",
].join("\n");

/**
 * The worksheet. It ends on the refusal, and that last line stays: Twiga cannot
 * send a file on WhatsApp, and the page must not imply otherwise.
 */
const WORKSHEET = [
  "_📄 PRINTABLE WORKSHEET_",
  "_Subject: Geography | Form 1_",
  "_Topic: Longitudes and Latitudes_",
  "",
  "_A. Write the approximate coordinates_",
  "1. Arusha, Tanzania  ________",
  "2. London, United Kingdom  ________",
  "3. Sydney, Australia  ________",
  "",
  "_B. Short answer_",
  "4. Why does latitude affect climate?",
  "5. Why does longitude affect time?",
  "",
  "Copy this into Word or Google Docs to print — I can't send files on WhatsApp directly.",
].join("\n");

export const MESSAGES: Message[] = [
  {
    side: "right",
    kind: "text",
    text: "i am teaching geography, form 1, map reading. the title is longitudes and latitudes",
    time: "20:41",
    typingDur: 1.4,
    dwell: 1.7,
    chapter: {
      id: "ask-with-the-title",
      title: "Ask with the title",
      description:
        "Form, subject, topic and title in one message. Twiga never asks how long your period is, so say it here.",
    },
  },
  {
    side: "left",
    kind: "text",
    text: LESSON_PLAN,
    ...LONG_MESSAGE,
    time: "20:42",
    typingDur: 1.4,
    dwell: 6.0,
    chapter: {
      id: "the-plan-arrives",
      title: "The plan arrives",
      description:
        "Objectives, key concepts, materials, a timed flow, homework and notes. The stage minutes add up to the stated 45.",
    },
  },
  {
    side: "right",
    kind: "text",
    text: "this is good but my plan book has an assessment column and theres nothing for it here",
    time: "20:45",
    typingDur: 1.4,
    dwell: 1.9,
    chapter: {
      id: "read-it-against-your-plan-book",
      title: "Read it against your plan book",
      description:
        "No two plans have the same sections. Only the lesson flow and homework always show up, so check what is missing.",
    },
  },
  {
    side: "left",
    kind: "text",
    text: ASSESSMENT,
    time: "20:46",
    typingDur: 1.2,
    dwell: 4.2,
    chapter: {
      id: "ask-for-the-missing-section",
      title: "Ask for the missing section",
      description:
        "Ask in the same chat and the section comes back written for this topic. Nothing generic, nothing to retype.",
    },
  },
  {
    side: "right",
    kind: "text",
    text: "and turn the class activity into a worksheet i can print for them",
    time: "20:47",
    typingDur: 1.2,
    dwell: 1.7,
    chapter: {
      id: "reuse-a-stage-of-the-plan",
      title: "Reuse a stage of the plan",
      description:
        "Point at one stage and ask for it in a new shape. The class activity becomes a worksheet.",
    },
  },
  {
    side: "left",
    kind: "text",
    text: WORKSHEET,
    time: "20:48",
    typingDur: 1.3,
    dwell: 5.3,
    chapter: {
      id: "printable-but-not-a-file",
      title: "Printable, but not a file",
      description:
        "The worksheet comes as text you copy into Word or Google Docs. Twiga cannot send files on WhatsApp, so there is no attachment.",
    },
  },
];

export const SCRIPT = buildScript(MESSAGES);

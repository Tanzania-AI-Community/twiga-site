// The conversation and its timing. This file is the single source of truth:
// the scene animates against SCRIPT.schedule and video.ts places the
// follow-along chapters off the same schedule, so retiming a message moves the
// bubble and its rail entry together.
//
// Everything else — the look, the camera, the bubble motion — comes from
// `remotion/shared`.

import { buildScript, LONG_MESSAGE, type Message } from "../../shared";

const LONG = [
  "This lesson plan was built following TIE guidelines and the approach for teaching algebra to Form 1, as described in the official Mathematics textbooks.",
  "",
  "I took the topic Introduction to Algebra from the TIE Form 1 Mathematics textbook, then structured it as a step-by-step process that supports:",
  "•  Starting from prior knowledge (activating prior knowledge)",
  "•  Explaining the topic clearly with real-life examples",
  "•  Having students work together (collaborative learning)",
  "•  Connecting it to everyday life",
  "•  Reviewing through self-checks (assessment for learning)",
  "",
  "I have also made sure that:",
  "•  The terminology matches what is used in the TIE textbooks",
  "•  The examples suit the age of secondary school students",
  "•  The plan fits the lesson time (40 minutes)",
  "•  There is room for students to participate fully",
  "",
  "Would you like a PDF version of this lesson plan? Or should I prepare one for another topic?",
].join("\n");

/** The skeleton rows for the "ANDALIO LA SOMO" card, kept as authored. */
const CARD_ROWS = [
  { label: 72, lineA: 90, lineB: 62 },
  { label: 58, lineA: 84, lineB: 70 },
  { label: 66, lineA: 92, lineB: 54 },
  { label: 50, lineA: 80, lineB: 66 },
  { label: 62, lineA: 88, lineB: 48 },
];

export const MESSAGES: Message[] = [
  {
    side: "right",
    kind: "text",
    text: "i'd like to prepare a lesson plan for teaching Algebra Form 1",
    time: "12:30",
    typingDur: 0.9,
    dwell: 1.7,
    chapter: {
      id: "ask-in-plain-language",
      title: "Ask in plain language",
      description:
        "No commands and no special syntax. Name the subject and the form level the way you would tell a colleague.",
    },
  },
  {
    side: "left",
    kind: "card",
    card: {
      title: "LESSON PLAN",
      subtitle: "Mathematics · Algebra · Form 1",
      rows: CARD_ROWS,
    },
    time: "12:31",
    typingDur: 1.2,
    dwell: 2.9,
    chapter: {
      id: "the-plan-arrives",
      title: "The plan arrives",
      description:
        "A structured lesson plan comes straight back into the chat, ready to open, adapt and print.",
    },
  },
  {
    side: "right",
    kind: "text",
    text: "how is the lesson plan made?",
    time: "13:17",
    typingDur: 0.9,
    dwell: 1.7,
    chapter: {
      id: "ask-a-follow-up",
      title: "Ask a follow-up",
      description:
        "The thread remembers what you asked, so you can question an answer instead of starting over.",
    },
  },
  {
    side: "left",
    kind: "text",
    text: LONG,
    ...LONG_MESSAGE,
    time: "13:18",
    typingDur: 1.4,
    dwell: 5.6,
    chapter: {
      id: "grounded-in-the-syllabus",
      title: "Grounded in the syllabus",
      description:
        "Twiga shows its work. It names the TIE guidance, the textbook topic and the teaching approach behind the plan.",
    },
  },
];

export const SCRIPT = buildScript(MESSAGES);

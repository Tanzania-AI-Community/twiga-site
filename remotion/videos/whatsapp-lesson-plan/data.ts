// Content + constants for the "Chat Demo Scene" design.
//
// This file is the single source of truth for the timeline: the scene reads
// SCHEDULE to animate, and video.ts reads it to place the follow-along
// chapters. Change a `typingDur` or `dwell` and both move together.

export const FPS = 30;
export const DURATION = 18; // seconds
export const INTRO = 1.2; // dead air before the first message is typed
export const ENTER_DUR = 0.5; // bubble entrance, in seconds

// WhatsApp palette: outgoing (sent) green, incoming (received) white.
export const ACCENT = "#d9fdd3"; // outgoing bubble
export const GRAY = "#ffffff"; // incoming bubble

/** Rail copy for the beat a message opens. */
export type MessageChapter = {
  id: string;
  title: string;
  description: string;
};

export type Message = {
  side: "left" | "right";
  kind: "text" | "image";
  text?: string;
  time: string;
  typingDur: number;
  dwell: number;
  fontSize?: string;
  maxWidth?: string;
  lineHeight?: string;
  chapter: MessageChapter;
};

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
        "No commands and no special syntax — name the subject and the form level the way you would tell a colleague.",
    },
  },
  {
    side: "left",
    kind: "image",
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
        "The thread keeps its context, so you can question an answer instead of starting the request over.",
    },
  },
  {
    side: "left",
    kind: "text",
    text: LONG,
    time: "13:18",
    typingDur: 1.4,
    dwell: 5.6,
    fontSize: "21px",
    maxWidth: "780px",
    lineHeight: "1.4",
    chapter: {
      id: "grounded-in-the-syllabus",
      title: "Grounded in the syllabus",
      description:
        "Twiga shows its work: the TIE guidance, the textbook topic and the teaching approach behind the plan.",
    },
  },
];

/**
 * When each message starts typing and when its bubble lands, in seconds.
 * Derived from the list above so the scene and the chapters never drift.
 */
export const SCHEDULE: { typingStart: number; bubbleStart: number }[] = (() => {
  let cursor = INTRO;
  return MESSAGES.map((message) => {
    const typingStart = cursor;
    const bubbleStart = typingStart + message.typingDur;
    cursor = bubbleStart + message.dwell;
    return { typingStart, bubbleStart };
  });
})();

// The skeleton rows for the "ANDALIO LA SOMO" lesson-plan card image.
export const CARD_ROWS = [
  { label: 72, lineA: 90, lineB: 62 },
  { label: 58, lineA: 84, lineB: 70 },
  { label: 66, lineA: 92, lineB: 54 },
  { label: 50, lineA: 80, lineB: 66 },
  { label: 62, lineA: 88, lineB: 48 },
];

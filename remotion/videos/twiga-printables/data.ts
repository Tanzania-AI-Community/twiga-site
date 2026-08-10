// The conversation and its timing for /guide/teachers/improvisation/printables.
//
// Source: content/video-scripts/teachers/improvisation/printables.md, cut from
// the WhatsApp log (printable plan at L1084–L1164, the PDF refusal and the six
// steps at L1165–L1176, the worksheet at L1787–L1938).
//
// The arc is the page's goal in seven turns: "printable version" is a real
// instruction and it changes the reply, a file is asked for and does not come,
// the six steps that make one anyway are given, and the same trick is run again
// on a worksheet until forty copies come off the office printer.
//
// Two things this file is careful about:
//
//   1. No attachment ever lands. The lesson plan and the worksheet arrive as
//      chat text, which is what the log shows. The refusal keeps the script's
//      trimmed wording — "I can't turn this lesson plan into a PDF file for
//      you" — and not the bot's own blanket claim that it cannot send files at
//      all, which is false: it sent two exam PDFs earlier in the same log. The
//      rail copy carries the true constraint instead.
//   2. The worksheet keeps its raw markdown pipes. They look broken in
//      WhatsApp and that is the point of the beat, so the closing turn is the
//      teacher confirming they came out fine once pasted into Docs.
//
// Everything else — the look, the camera, the bubble motion — comes from
// `remotion/shared`.

import { buildScript, LONG_MESSAGE, type Message } from "../../shared";

/**
 * The printable lesson plan, trimmed to fit the bubble. Every line survives
 * from the script; nothing is added.
 *
 * The shape is the whole argument of the first beat. The plain plan is a
 * paragraph with a lesson flow; the printable one has a title block, a
 * materials list, teacher notes, a rule across the page and an explicit
 * copy-print-share line. The `_italic_` markers are the script's own and are
 * rendered by `shared/richText.tsx`.
 */
const PRINTABLE_PLAN = [
  "_Form 1 Geography – Lesson Plan (Printable)_",
  "_Topic:_ Longitudes and Latitudes",
  "_Duration:_ 45 minutes",
  "",
  "_Learning Objectives:_",
  "1. Define latitude and longitude and explain their importance in locating places.",
  "",
  "_Materials Needed:_",
  "- Globe or world map with grid lines",
  "- Map of Tanzania, colored pencils, flashcards, chalkboard",
  "",
  "_Lesson Flow:_",
  "1. _Introduction (10 minutes)_",
  "2. _Direct Instruction (15 minutes)_",
  "3. _Class Activity (15 minutes)_",
  "4. _Closure (5 minutes)_",
  "",
  "_Teacher Notes:_",
  "- Common mistake: students reverse the order or forget directions (N/S, E/W).",
  "",
  "---",
  "",
  "📄 You can copy and paste this into a document, print it, or share it with colleagues.",
].join("\n");

/**
 * The deliverable of the whole page: no file, and the six steps that produce
 * one anyway. Left at the default bubble size rather than `LONG_MESSAGE` — it
 * is the poster beat and a teacher has to be able to read the steps off a
 * still.
 */
const SAVE_AS_PDF = [
  "I'm sorry, I can't turn this lesson plan into a PDF file for you. But you can make one from the printable version in a minute:",
  "",
  "_Here's how to save it as a PDF:_",
  "1. _Copy_ the entire lesson plan text.",
  "2. Open _Google Docs_, _Word_, or your phone's _Notes_ app.",
  "3. _Paste_ the text there.",
  "4. Go to _File > Print_ (or the share/export option).",
  '5. Choose _"Save as PDF"_ instead of printing.',
  "6. Tap _Save_ and choose where to store it (Downloads or Drive).",
  "",
  "📱 On Android or iPhone, this works great with Google Docs!",
].join("\n");

/**
 * The worksheet. The markdown table rows are kept exactly as WhatsApp shows
 * them, pipes and all, because a teacher who judges this by how it looks in
 * the chat will throw away something usable.
 */
const WORKSHEET = [
  "_📄 PRINTABLE WORKSHEET_",
  "_Subject: Geography | Form 1_",
  "_Topic: Longitudes and Latitudes_",
  "",
  "---",
  "",
  "_A. Write the approximate coordinates_",
  "",
  "| Place | Latitude | Longitude |",
  "|-------|----------|-----------|",
  "| Arusha | ____ | ____ |",
  "| London | ____ | ____ |",
  "| Sydney | ____ | ____ |",
  "",
  "_B. Short answer_",
  "1. Why does latitude affect climate? _________",
  "2. Why does longitude affect time? _________",
  "",
  "_Student Name:_ _____________",
  "_Date:_ _____________",
  "_Class:_ _____________",
].join("\n");

export const MESSAGES: Message[] = [
  {
    side: "right",
    kind: "text",
    text: "yes give me the printable version",
    time: "13:59",
    typingDur: 0.9,
    dwell: 1.5,
    chapter: {
      id: "ask-for-the-printable-version",
      title: "Ask for the printable version",
      description:
        "Those three words change the reply. You get a title block, a materials list and teacher notes you can hand out.",
    },
  },
  {
    side: "left",
    kind: "text",
    text: PRINTABLE_PLAN,
    ...LONG_MESSAGE,
    time: "14:00",
    typingDur: 1.3,
    dwell: 5.6,
    chapter: {
      id: "a-plan-shaped-like-a-page",
      title: "A plan shaped like a page",
      description:
        "Twiga lays it out as a document with headings and a rule. It ends by telling you to copy and print it.",
    },
  },
  {
    side: "right",
    kind: "text",
    text: "i need a pdf document",
    time: "14:00",
    typingDur: 0.8,
    dwell: 1.9,
    chapter: {
      id: "asking-for-a-pdf",
      title: "Asking for a PDF",
      description:
        "Say you want a file. Only exams come back as a PDF, so a lesson plan will not.",
    },
  },
  {
    side: "left",
    kind: "text",
    text: SAVE_AS_PDF,
    time: "14:00",
    typingDur: 1.2,
    dwell: 5.4,
    chapter: {
      id: "no-file-six-steps",
      title: "No file, six steps",
      description:
        "Lesson plans always come as chat text. Twiga gives you six steps to make the PDF yourself.",
    },
  },
  {
    side: "right",
    kind: "text",
    text: "ok pasted it in google docs and saved the pdf 👍 can i get a worksheet for the exercise the same way",
    time: "14:07",
    typingDur: 1.6,
    dwell: 1.6,
    chapter: {
      id: "same-trick-for-a-worksheet",
      title: "Same trick, worksheet",
      description:
        "Paste, save, print. Then ask for the exercise as a worksheet and run it through the same steps.",
    },
  },
  {
    side: "left",
    kind: "text",
    text: WORKSHEET,
    ...LONG_MESSAGE,
    time: "14:08",
    typingDur: 1.3,
    dwell: 5.0,
    chapter: {
      id: "tables-arrive-as-pipes",
      title: "Tables arrive as pipes",
      description:
        "The table looks broken in chat, full of straight lines. It becomes a real table once you paste it into Docs.",
    },
  },
  {
    side: "right",
    kind: "text",
    text: "printed 40 copies at the office. the tables came out fine in docs",
    time: "14:31",
    typingDur: 1.2,
    dwell: 2.6,
    chapter: {
      id: "forty-copies-printed",
      title: "Forty copies, printed",
      description:
        "The worksheet reaches the class on paper. The tables came out fine once it was in Google Docs.",
    },
  },
];

export const SCRIPT = buildScript(MESSAGES);

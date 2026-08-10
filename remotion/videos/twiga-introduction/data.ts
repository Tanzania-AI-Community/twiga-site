// The conversation and its timing for /guide/teachers — the landing video for
// the whole teachers track.
//
// Source: content/video-scripts/teachers/getting-started/introduction.md,
// itself cut from the WhatsApp log (L591–L599, L827–L908, L736–L826).
//
// This one has a different job from every other video in the track. The rest
// answer "how do I get X out of Twiga"; this one has to answer "what is Twiga"
// for someone who has never heard of it, and it plays on the page a teacher
// lands on first. So it deliberately does NOT retell "ask for a lesson plan" —
// that is the whatsapp-lesson-plan fallback's job on every other page.
//
// The arc is the page's goal in six turns: the teacher asks the blunt question
// with no manual and no menu, gets back what Twiga is *and where it stops*
// (Form 1–2, three subjects), then asks the better question — how do I actually
// use this in a lesson — and gets three capabilities each paired with the exact
// sentence to type. The last pair proves it: one of those sentences goes in,
// the syllabus comes back with the textbook it came from.
//
// What is deliberately NOT here:
//   - Registration. Approval is a human step with a real wait (L3, L10–L14);
//     it gets its own page and its own video.
//   - Mock exams and step-by-step problem solving. They are real, and they are
//     in the long L828–L908 reply, but the very next request the same teacher
//     sent hung on "Generating exercises..." and errored out twice (L910, L922).
//     Promising them in the opening pitch would be showing the bot succeeding
//     at something the transcript shows it failing.
//
// Everything else — the look, the camera, the bubble motion — comes from
// `remotion/shared`.

import { buildScript, type Message } from "../../shared";

/**
 * Twiga's own answer to "who are you", verbatim from the script.
 *
 * The scope sentence is the reason this bubble is first and long: the real
 * teacher only found the edges by being refused (L432–L441, "I currently
 * support only _secondary school_ teachers"). Here the limits arrive in the
 * same breath as the pitch, so a Form 3 or primary teacher learns it before
 * signing up rather than after.
 *
 * No emphasis markers: the transcript line (L592) has none. The two replies
 * below do, and restoring them there is faithful — inventing them here would
 * not be.
 */
const WHO_I_AM = [
  "I'm Twiga, your friendly teaching assistant bot developed by the Tanzania AI Community. I'm here to help secondary school teachers like you with curriculum-aligned support in subjects like Book Keeping, Mathematics and Physics for Form 1 and 2.",
  "",
  "I can:",
  "•  Explain concepts from the official TIE textbooks",
  "•  Create NECTA-style practice questions",
  "•  Provide teaching tips and lesson ideas",
  "",
  "Just let me know what topic or subject you're teaching. 📚➗🚀",
].join("\n");

/**
 * The payoff bubble: three capabilities, each with the sentence that gets it.
 *
 * The script collapses the transcript's six-section reply to three, and that
 * cut is the honest one — see the file header on why mock exams are not here.
 *
 * The `_italic_` markers are restored from the transcript, which writes these
 * headings as `_1. Get Accurate Topic Explanations_ 📘` and the field list as
 * `_Subject_ / _Form_ / _Topic_ / _What you want_`. `shared/richText.tsx`
 * renders them. They matter: italic headings with a quoted line under each is
 * what makes this read as three things you can copy rather than a paragraph
 * about features. Every word survives from the script.
 */
const HOW_TO_USE = [
  "Great question, Teacher! 🌟 Here's how to use me in your lessons:",
  "",
  "_1. Get accurate topic explanations_ 📘",
  '"Explain double entry system for Form 1 Book Keeping"',
  "",
  "_2. Generate NECTA-aligned practice questions_ ✍️",
  '"Create 5 short questions on petty cash book for Form 2"',
  "",
  "_3. Prepare step-by-step lesson support_ 🧭",
  '"How should I teach the trial balance to Form 1?"',
  "",
  "All you need to tell me is the _subject_, the _form_, the _topic_, and _what you want_.",
].join("\n");

/**
 * The syllabus answer, and the last thing the viewer sees.
 *
 * Italics on the header and every topic name are the transcript's own
 * (L780–L808). Trimmed to a single source line: the citation is the point —
 * topics come back with the TIE textbook they were read out of, so a teacher
 * can check a claim instead of trusting it — and one line makes that point as
 * well as two while keeping the video inside 30s.
 */
const TOPICS = [
  "_Book Keeping – Form 2_",
  "📘 _Core topics:_",
  "",
  "1. _Two-Column Cash Book_",
  "2. _Petty Cash Book_",
  "3. _Bank Reconciliation_",
  "4. _Bank Transactions and Records_",
  "5. _Types of Book Keeping Errors_",
  "6. _Financial Statements (Introduction)_",
  "7. _Control Accounts (Personal Records)_",
  "",
  "Sources:",
  "[3] Book-Keeping for Secondary Schools Student's Book Form Two, Two Column Cash Book",
].join("\n");

export const MESSAGES: Message[] = [
  {
    side: "right",
    kind: "text",
    text: "who are you",
    time: "10:44",
    // 0.5 + 0.011 × 11 chars = 0.62s, raised to the 0.8s thumb-typing floor.
    typingDur: 0.8,
    // 1 rendered line = 0.35s → the 1.5s floor, plus 0.3s because it ends on a
    // question and the viewer needs a beat to register that one was asked.
    dwell: 1.8,
    chapter: {
      id: "no-manual-just-ask",
      title: "No manual, just ask",
      description:
        "Nothing to install and no menu to learn. Twiga is a contact in WhatsApp, so you just ask.",
    },
  },
  {
    side: "left",
    kind: "text",
    text: WHO_I_AM,
    time: "10:44",
    // Twiga is an AI: fast and constant, whatever the reply length.
    typingDur: 1.2,
    // 13 rendered lines × 0.35s = 4.55s, taken up to 4.9: this is the bubble
    // that has to land the scope, and "Form 1 and 2" arrives at the end of a
    // five-line paragraph where a skimming viewer will miss it first pass.
    dwell: 4.9,
    chapter: {
      id: "what-it-is-and-where-it-stops",
      title: "What it is, and where it stops",
      description:
        "It covers Book Keeping, Mathematics and Physics, Form 1 and Form 2 only. Primary and Form 3 upwards are not supported.",
    },
  },
  {
    side: "right",
    kind: "text",
    text: "how can a teacher use you to enhance their teaching?",
    time: "10:46",
    // 0.5 + 0.011 × 51 chars = 1.06s.
    typingDur: 1.1,
    // 1 rendered line = 0.35s → the 1.5s floor, plus 0.4s of question silence.
    dwell: 1.9,
    chapter: {
      id: "ask-for-the-how",
      title: "Ask for the how, not the what",
      description:
        "Asking how to use Twiga in a lesson beats asking what it can do. The answer comes back with instructions.",
    },
  },
  {
    side: "left",
    kind: "text",
    text: HOW_TO_USE,
    time: "10:47",
    typingDur: 1.3,
    // 16 rendered lines × 0.35s = 5.6s. The payoff of the page, and the viewer
    // is reading three sentences they may be about to send, not skimming prose.
    dwell: 5.6,
    chapter: {
      id: "three-asks-that-work",
      title: "Three asks that work",
      description:
        "Explanations, NECTA-style questions, teaching tips. Each one comes with the exact sentence to send, so copy a line and swap in your topic.",
    },
  },
  {
    side: "right",
    kind: "text",
    text: "we are going to explore book keeping form 1&2. can you tell me what topics are covered",
    time: "10:48",
    // 0.5 + 0.011 × 86 chars = 1.45s.
    typingDur: 1.4,
    // 2 rendered lines = 0.7s → the 1.5s floor, plus 0.4s of question silence.
    dwell: 1.9,
    chapter: {
      id: "subject-and-form-first",
      title: "Subject and form first",
      description:
        "Name the subject and the form. That is the smallest ask Twiga can work with, and your own words are fine.",
    },
  },
  {
    side: "left",
    kind: "text",
    text: TOPICS,
    time: "10:48",
    typingDur: 1.2,
    // 14 rendered lines × 0.35s = 4.9s, taken at 5.0 because this is the
    // ending — the tail after it is only 0.7s.
    dwell: 5.0,
    chapter: {
      id: "it-cites-the-textbook",
      title: "It cites the textbook",
      description:
        "The topics come back with the TIE Student's Book they were taken from. You can go and check it before you teach.",
    },
  },
];

export const SCRIPT = buildScript(MESSAGES);

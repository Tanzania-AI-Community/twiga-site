// The conversation and its timing for /guide/teachers/assessment/mock-exams.
//
// Source: content/video-scripts/teachers/assessment/mock-exams.md
//
// Two things this page turns on, and both are in the timing rather than in any
// extra copy:
//
// 1. The NECTA mock is the only generation job in the whole transcript whose
//    holding message names a wait time and then actually delivers. The measured
//    run was 8m23s. That gap lives in the clock labels (21:05 → 21:13), never in
//    dwell — nobody watches eight minutes of nothing, and the clock jump tells
//    it in one glance. The holding bubble still gets a long-ish dwell (3.0s)
//    because "send nothing until the files arrive" is the technique this page
//    teaches, and the viewer has to feel the held silence for one beat.
//
// 2. Two files arrive, in order, five seconds apart: the paper, then the
//    marking scheme. A teacher who saves the first attachment and closes
//    WhatsApp does not have the key. So both are separate `card` messages with
//    different titles, different subtitles and different body layouts, and the
//    poster frame is the beat where both are on screen at once.
//
// Nothing on the exam card claims a form level: Form 1 was asked for and Twiga
// confirmed it in chat, but the printed header carries only subject, time and
// year. Putting "Form 1" on the card would show the product doing something the
// evidence says it does not do.
//
// The script carries no `_italic_`, `*bold*` or `> ` quoted lines, so there is
// no inline markup to preserve here; the two attachments are what makes this
// exchange read as documents.
//
// Everything else — the look, the camera, the bubble motion — comes from
// `remotion/shared`.

import { buildScript, type Message } from "../../shared";

export const MESSAGES: Message[] = [
  {
    side: "right",
    kind: "text",
    text: "ok help me create NECTA style final exam for my students for their year end. this exam is for form 1",
    time: "21:04",
    // 0.5 + 0.011 × 100 chars = 1.6s.
    typingDur: 1.6,
    // ~2 rendered lines = 0.7s → floor 1.5, raised because this one line is the
    // whole brief and the viewer is reading subject, class and purpose out of it.
    dwell: 2.0,
    chapter: {
      id: "ask-in-one-message",
      title: "Ask in one message",
      description:
        "Subject, class and what the paper is for, all in the first line. Twiga starts from this.",
    },
  },
  {
    side: "left",
    kind: "text",
    text: "I can create a NECTA-style final exam for your Form 1 Geography students.\n\nPlease confirm the topics you'd like included in the exam, or let me know if you'd like it to cover the full syllabus.",
    time: "21:04",
    // Twiga is an AI: fast and constant, whatever the reply length.
    typingDur: 1.2,
    // ~6 rendered lines = 2.1s, plus a beat because it ends on a question.
    dwell: 2.9,
    chapter: {
      id: "twiga-asks-the-scope",
      title: "Twiga asks the scope",
      description:
        "This is the one request Twiga scopes first. It asks which topics you want before it starts.",
    },
  },
  {
    side: "right",
    kind: "text",
    // The teacher's own spelling, from the log. Two words became the entire
    // brief, and the paper that came back skipped map reading, the solar system,
    // weather instruments, rocks and soil.
    text: "full sylabus",
    time: "21:05",
    // 0.5 + 0.011 × 12 chars = 0.63s, floored to 0.8.
    typingDur: 0.8,
    // 1 line = floor 1.5, plus a touch so the shortness of it registers.
    dwell: 1.6,
    chapter: {
      id: "two-words-is-thin",
      title: "Two words is thin",
      description:
        "Two words is the whole brief Twiga gets. List the topics you taught and you get a better paper.",
    },
  },
  {
    side: "left",
    kind: "text",
    text: "📝 Generating a NECTA-style exam. This takes around 10 minutes, so please be patient and wait for the message with your exam and solution.",
    time: "21:05",
    // A holding message is Twiga speaking: short typing indicator.
    typingDur: 0.9,
    // ~3 lines = 1.05s → floor 1.5, held to 3.0. The real eight minutes are in
    // the clock label on the next bubble, not here.
    dwell: 3.0,
    chapter: {
      id: "wait-it-out",
      title: "Wait it out",
      description:
        "Twiga says around ten minutes. Send nothing until the files come or the job dies and you start again.",
    },
  },
  {
    side: "left",
    kind: "card",
    card: {
      // The printed header calls it a practice exam, not a NECTA paper, and
      // every page is footed "Twiga Generated Practice Exam". Keep that
      // wording. "GENERATED PRACTICE EXAM" ellipsises in the card header, and
      // the caption bubble below says "practice exam" too, so this is the
      // longest honest label that fits.
      //
      // Marks and pages are printed on the file. The form level is not, on the
      // paper or in its filename, so it is not on the card either.
      title: "PRACTICE EXAM",
      subtitle: "Geography · 100 marks · 7 pages",
      badge: "PDF",
      rows: 5,
    },
    // 21:05 → 21:13 is the eight minutes and twenty three seconds the job took.
    time: "21:13",
    typingDur: 1.2,
    // Short: the marking scheme is five seconds behind it in the log, and the
    // pair is what the viewer is meant to read, not the paper alone.
    dwell: 1.6,
    chapter: {
      id: "the-paper-arrives",
      title: "The paper arrives",
      description:
        "Eight minutes later the exam lands as a PDF. This is the only Twiga output that comes as a file.",
    },
  },
  {
    side: "left",
    kind: "card",
    card: {
      title: "MARKING SCHEME",
      subtitle: "Solution key · answers in red · 12 pages",
      badge: "PDF",
      // A different row count and a prose body, so the second card reads as a
      // different document rather than a duplicate of the first.
      rows: 6,
      layout: "prose",
    },
    time: "21:13",
    typingDur: 0.9,
    // The payoff: both cards on screen, two headers to read.
    dwell: 3.0,
    chapter: {
      id: "marking-scheme-follows",
      title: "Marking scheme follows",
      description:
        "A second file arrives seconds later with the answers. Save both or you will have the paper and no key.",
    },
  },
  {
    side: "left",
    kind: "text",
    text: "Here is your practice exam in Geography on topics: all.",
    time: "21:14",
    typingDur: 1.0,
    // The ending: the tail after this is only 0.7s.
    dwell: 3.4,
    chapter: {
      id: "check-before-you-print",
      title: "Check before you print",
      description:
        "It is a draft, not a finished paper. Check the questions and the answer key before you photocopy it.",
    },
  },
];

export const SCRIPT = buildScript(MESSAGES);

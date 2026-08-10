// The conversation and its timing for /guide/teachers/lesson-plans/requesting.
//
// This page is only about what goes into the request LINE. The plain-language
// ask and the "how was this made?" follow-up belong to the twiga-lesson-plan
// video on the overview page and are deliberately not repeated here.
//
// Source: content/video-scripts/teachers/lesson-plans/requesting.md
//
// Trimmed from five turns to four: the script's "📋 Creating a lesson plan,
// please hold..." turn is dropped. The engine keeps two messages on screen, so
// keeping it would have put the plan beside the holding bubble instead of
// beside the request — and the request sitting next to the plan it produced is
// the whole argument of this page. The wait it represented survives in the
// clock labels (16:40 → 16:41), which is where a real gap belongs.
//
// Everything else — the look, the camera, the bubble motion — comes from
// `remotion/shared`.

import { buildScript, LONG_MESSAGE, type Message } from "../../shared";

/**
 * Twiga's plan, as a long text bubble rather than a DocCard — on purpose.
 *
 * The payoff of this page is *what is inside* the plan: the teaching aids are a
 * hand-drawn chalkboard grid and the students' own arms, because the request
 * said there were no teaching aids. A skeleton card would show grey bars, and
 * the one thing the viewer needs to notice would be invisible. The printable
 * turn below is a real attachment and does get a card.
 *
 * The `_italic_` markers are the script's own; `shared/richText.tsx` renders
 * them. Every line survives from the script verbatim.
 */
const PLAN = [
  "_Lesson Title:_ Longitudes and Latitudes",
  "_Class:_ Form 1  •  _Subject:_ Geography",
  "_Topic:_ Map Reading  •  _Time:_ 40 minutes",
  "",
  "_Teaching Aids:_",
  "•  Chalkboard grid drawn by hand",
  "•  Students' own arms as the two axes",
  "•  The classroom floor as the globe",
  "",
  "_Lesson Flow:_",
  "1.  _Introduction (8 min)_ — ask which way is north from the door, then draw one horizontal and one vertical line on the board",
  "2.  _Development (22 min)_ — latitude runs east–west, longitude runs north–south; label the equator and the prime meridian as 0°; write three coordinates as (latitude, longitude)",
  "3.  _Conclusion (10 min)_ — students give the coordinates of two towns from the board grid",
  "",
  "_Assessment:_ each student writes one pair of coordinates and reads it aloud",
  "_Homework:_ find Dar es Salaam's latitude and longitude in the textbook",
].join("\n");

export const MESSAGES: Message[] = [
  {
    side: "right",
    kind: "text",
    text: "im teaching geography form 1 tomorrow, map reading, title is longitudes and latitudes. 40 min period, short plan pls. i have no teaching aids at all, just a chalkboard",
    time: "16:40",
    // 0.5 + 0.011 × 168 chars = 2.35s, capped at the 2.2s thumb-typing ceiling.
    typingDur: 2.2,
    // ~4 rendered lines = 1.4s, floored to 1.5 — then raised: this line is the
    // page, and the viewer has to read five separate fields out of it.
    dwell: 2.4,
    chapter: {
      id: "all-five-fields-in-one-line",
      title: "All five fields, one line",
      description:
        "Class, subject, topic, title, and what the room has. Saying chalkboard only is what shapes the plan.",
    },
  },
  {
    side: "left",
    kind: "text",
    text: PLAN,
    ...LONG_MESSAGE,
    time: "16:41",
    // Twiga is an AI: fast and constant, whatever the reply length.
    typingDur: 1.2,
    // ~22 rendered lines at the long-message preset; the brief's 5–7s band for
    // a structured reply, taken at the top.
    dwell: 6.5,
    chapter: {
      id: "class-context-changes-the-plan",
      title: "Class context has teeth",
      description:
        "The teaching aids are a hand drawn grid and the students' own arms. No globe, no projector.",
    },
  },
  {
    side: "right",
    kind: "text",
    text: "thats it, no globe needed 🙌 can i get the printable version",
    time: "16:43",
    // 0.5 + 0.011 × 58 chars = 1.14s.
    typingDur: 1.1,
    // 2 lines = 0.7s → floor 1.5, plus a beat because it ends on a question.
    dwell: 1.9,
    chapter: {
      id: "nothing-to-correct",
      title: "Nothing to correct",
      description:
        "Nothing to fix here. The plan is ready to teach, so the only thing left is a copy to print.",
    },
  },
  {
    side: "left",
    kind: "card",
    card: {
      title: "ANDALIO LA SOMO",
      // Subject · topic · form, as on the reference video's card. The lesson
      // title is longer than the header can hold on one line, and the bubble
      // above has already carried it.
      subtitle: "Geography · Map Reading · Form 1",
      badge: "PDF",
      rows: 5,
    },
    time: "16:44",
    typingDur: 1.2,
    // The ending: the tail after this is only 0.7s.
    dwell: 3.2,
    chapter: {
      id: "printable-version",
      title: "The printable copy",
      description:
        "The same plan, laid out for printing. Still read it through before you take it to class.",
    },
  },
];

export const SCRIPT = buildScript(MESSAGES);

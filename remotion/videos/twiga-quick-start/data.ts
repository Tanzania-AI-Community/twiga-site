// The conversation and its timing for /guide/teachers/getting-started/quick-start.
//
// Source: content/video-scripts/teachers/getting-started/quick-start.md, cut
// from the WhatsApp log (fractions panic at L442–L458, physics switch at
// L488–L489).
//
// Trimmed from six turns to four: the script's pawpaw/ugali/football answer to
// "why do we even need fractions" (L459–L476) is dropped, and the clock carries
// the gap it left (10:42 → 10:45). Two reasons. The page's own premise is a
// teacher with twelve minutes, and a quick-start video that runs 31 seconds
// argues against itself. And the kept pair is the stronger proof of the same
// point: a request that names a format ("1-line") gets that format back, which
// you can only *see* by putting the one-line reply next to the fifteen-line one
// the request without a format produced. The pawpaw script and the chained exit
// ticket both belong in the page prose, where the notes already put the latter.
//
// Everything else — the look, the camera, the bubble motion — comes from
// `remotion/shared`.

import { buildScript, LONG_MESSAGE, type Message } from "../../shared";

/**
 * Twiga's default shape, and that is exactly why it is here at full length.
 *
 * The request that produced it named a form level and a topic but no format, so
 * back came the topic, its four subtopics and three offers of what to do next.
 * Trimming the bullets would make this bubble prettier and destroy the beat: the
 * viewer has to feel it as more than they can read in twelve minutes, so that
 * the one-line reply four turns later reads as something they asked for rather
 * than something they got lucky with.
 *
 * The `*bold*` markers are the script's own; `shared/richText.tsx` renders them.
 * Every line survives from the script verbatim.
 */
const FRACTIONS = [
  "Mambo! No worries — I've got you covered. 😊",
  "",
  "After *Integers*, the next topic in *Form 1 Mathematics* is *Fractions*.",
  "",
  "This includes:",
  "- Meaning and types of fractions (proper, improper, mixed)",
  "- Converting between improper fractions and mixed numbers",
  "- Operations on fractions (add, subtract, multiply, divide)",
  "- Solving problems involving fractions",
  "",
  "Let me know if you'd like:",
  "- A quick 2-minute summary for students?",
  "- One practice question to start the lesson?",
  "- Tips for teaching common misconceptions?",
].join("\n");

export const MESSAGES: Message[] = [
  {
    side: "right",
    kind: "text",
    text: "Mambo! I have my Form 1 maths class in 12 minutes and I just realised I forgot what topic comes after integers. Help!!",
    time: "10:42",
    // 0.5 + 0.011 × 118 chars = 1.80s, inside the 2.2s thumb-typing ceiling.
    typingDur: 1.8,
    // ~3 rendered lines at 29px = 1.05s, floored to 1.5 — then a beat more,
    // because it ends on a plea and because four separate facts (form, subject,
    // deadline, the thing he forgot) have to land before the answer does.
    dwell: 2.2,
    chapter: {
      id: "form-topic-deadline",
      title: "Form, subject, deadline",
      description:
        "Write it the way you would text a colleague. Just name the form level, because the answer changes between Form 1 and Form 2.",
    },
  },
  {
    side: "left",
    kind: "text",
    text: FRACTIONS,
    ...LONG_MESSAGE,
    time: "10:42",
    // Twiga is an AI: fast and constant, whatever the reply length. This landed
    // in about ten seconds in the real thread, which is why the clock has not
    // moved.
    typingDur: 1.1,
    // 15 rendered lines at the long-message preset. 0.35s/line would be 5.2s;
    // 5.0 is deliberately a shade under, because this bubble is meant to be
    // scanned for its shape, not read to the end.
    dwell: 5.0,
    chapter: {
      id: "the-default-shape",
      title: "The default shape",
      description:
        "Ask without saying what you want back and you get all of this. Fine in a free period, too much in twelve minutes.",
    },
  },
  {
    side: "right",
    kind: "text",
    text: "ok recap im now going to physics form 2. give me a 1-line intro for newtons first law that 14 year olds will actually remember",
    time: "10:45",
    // 0.5 + 0.011 × 126 chars = 1.89s.
    typingDur: 1.9,
    // ~3 rendered lines = 1.05s → floor 1.5, plus a beat: the viewer has to
    // read "1-line" before the reply lands, or the next bubble is just short.
    dwell: 2.0,
    chapter: {
      id: "chain-the-next-ask",
      title: "Chain the next ask",
      description:
        "New subject, new form, same thread. Nothing is restated, and words like \"1-line\" tell Twiga the shape you want back.",
    },
  },
  {
    side: "left",
    kind: "text",
    text: '"An object will stay still or keep moving in a straight line unless a force — like a push, pull, or stop — makes it change!"',
    time: "10:45",
    // Short, like every other Twiga turn. A one-line reply that took longer to
    // "type" than the fifteen-line one would undo the point of the beat.
    typingDur: 1.0,
    // The ending: ~3 lines is 1.05s of reading, but the tail after it is only
    // 0.7s, so it holds long enough to be read twice and copied down.
    dwell: 3.0,
    chapter: {
      id: "exactly-one-line",
      title: "Exactly one line",
      description:
        "You asked for one line, so one line comes back. Check it against your scheme of work before you use it.",
    },
  },
];

export const SCRIPT = buildScript(MESSAGES);

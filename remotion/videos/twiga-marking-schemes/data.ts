// The conversation and its timing for /guide/teachers/assessment/marking-schemes.
//
// Source: content/video-scripts/teachers/assessment/marking-schemes.md
//
// This page is about the KEY, not about generating a paper. The neighbouring
// twiga-mock-exams video owns the request, the ten-minute wait and the pair of
// PDFs, so the script's "📝 Generating a NECTA-style exam…" holding turn is
// dropped here and its wait lives in the clock labels (20:38 → 20:47), which is
// where a real gap belongs. What is left is the three things this page has to
// teach: the key arrives free with a full exam, everywhere else you have to ask
// for it by name, and you read it against the paper before you mark.
//
// WHY THE KEY IS A TEXT BUBBLE AND NOT A DocCard
//
// The script marks it `[pdf: …_solution.pdf]`, and REPLICA_BRIEF §6 would
// normally make that a card. It is a text bubble on purpose, and this is the
// one judgement call in the file:
//
//   1. The whole value of a marking scheme is the mark allocation — "(2 marks)"
//      beside a marking point. A skeleton card renders that as a grey bar, which
//      is to say it renders the payoff as nothing.
//   2. The last message is the teacher catching mountains and plateaus swapped
//      in question 2. That beat is meaningless unless the viewer has actually
//      read those two lines earlier. A card cannot show them, so the ending
//      would land on a claim the video never showed.
//
// The exam paper's own card was cut for the same reason in reverse: its
// skeleton says nothing this page needs, it duplicated the mock-exams video's
// opening, and the 3.6s it cost is spent on reading time instead. That leaves
// this video with no document bubble at all, which is a deliberate trade and
// noted in the report.
//
// Everything else — the look, the camera, the bubble motion — comes from
// `remotion/shared`. Nothing here computes a frame number.

import { buildScript, LONG_MESSAGE, type Message } from "../../shared";

/**
 * The solution PDF, as the teacher reads it on the phone. Trimmed from the
 * script's turn 4; every line survives from the original, including the
 * generic `Marking scheme:` sentence, which is there to be compared against the
 * specific `Marking points:` line under it.
 *
 * The two matching rows are the ones that are wrong: mountains carry the
 * plateau's description and plateaus carry the mountain's. They are printed
 * here exactly as the generated key printed them, because the last message
 * depends on the viewer having seen them.
 */
const SOLUTION_KEY = [
  "_GENERATED PRACTICE EXAM — MARKING SCHEME / SOLUTION KEY_",
  "_GEOGRAPHY_",
  "",
  "_1. (v)_ Answer: B",
  "",
  "_2. Suggested matching answers:_",
  "| Mountains | Elevated flatlands that rise sharply above surrounding areas |",
  "| Plateaus | High, rugged landforms created by folding, faulting, or volcanic activity |",
  "",
  "_3. Suggested answer:_ a(i) A tectonic plate boundary is a region where two or more lithospheric plates meet and interact…",
  "_Marking scheme:_ Award marks based on accuracy, completeness and clarity.",
  "_Marking points:_ a(i) Correct definition (2 marks) · a(ii) Correct naming of two boundaries (2 marks)",
].join("\n");

/**
 * The speaking activity, from the real L1470–L1484 reply, cut to its shape with
 * its closing offer intact. The checklist has no marks anywhere on it — that
 * absence is the beat, so all four ticks stay.
 */
const SPEAKING_ACTIVITY = [
  "_Speaking Practice — Short Prepared Talks_",
  "",
  "Prompts:",
  "- What should we do during a fire drill at school?",
  "- Why is punctuality important for students?",
  "",
  "_Assessment Checklist (for marking):_",
  "- ✅ Clear greeting and introduction",
  "- ✅ Logical flow of ideas",
  "- ✅ Eye contact with the audience",
  "- ✅ Confident closing statement",
  "",
  "Would you like me to adjust the difficulty level, add more scenarios, or create a marking scheme for this activity?",
].join("\n");

export const MESSAGES: Message[] = [
  {
    side: "right",
    kind: "text",
    text: "geography form 4 mock next week. full paper, whole syllabus",
    time: "20:38",
    // 0.5 + 0.011 × 58 chars = 1.14s.
    typingDur: 1.1,
    // 2 rendered lines = 0.7s → floor 1.5, plus a beat: nothing in this line
    // asks for a key, and that is the point of the next one.
    dwell: 1.8,
    chapter: {
      id: "ask-for-the-paper",
      title: "Ask for the paper",
      description:
        "One line, and the key comes with it. You never have to ask for a marking scheme on a full exam.",
    },
  },
  {
    side: "left",
    kind: "text",
    text: SOLUTION_KEY,
    ...LONG_MESSAGE,
    // Nine minutes later. The wait is mock-exams' story, so it is carried in
    // the clock rather than in dwell.
    time: "20:47",
    // Twiga is an AI: fast and constant, whatever the reply length.
    typingDur: 1.2,
    // ~17 rendered lines at the long-message preset = 5.95s, taken to 6.2 so
    // the two matching rows can actually be read. The last message depends on
    // it.
    dwell: 6.2,
    chapter: {
      id: "the-key-comes-free",
      title: "Marks per point",
      description:
        "The key lands with the paper, unasked. It shows the model answer and how many marks each point is worth.",
    },
  },
  {
    side: "right",
    kind: "text",
    text: "different thing — form 2 english, a speaking practice activity for friday. put a marking scheme on it, i need marks per point",
    time: "20:49",
    // 0.5 + 0.011 × 124 chars = 1.86s.
    typingDur: 1.9,
    // 3 lines = 1.05 → floor 1.5, plus a beat because it names what it wants.
    dwell: 1.9,
    chapter: {
      id: "ask-by-name",
      title: "Ask by name",
      description:
        "For anything that is not a full exam you have to ask. Say marking scheme, and say marks per point.",
    },
  },
  {
    side: "left",
    kind: "text",
    text: SPEAKING_ACTIVITY,
    ...LONG_MESSAGE,
    time: "20:50",
    typingDur: 1.2,
    // ~14 rendered lines = 4.9s. The viewer has to get far enough down to see
    // that not one of the four ticks carries a mark.
    dwell: 5.0,
    chapter: {
      id: "a-checklist-not-marks",
      title: "A checklist, not marks",
      description:
        "Twiga sends a tick list with no marks on it. It offers to build a marking scheme instead of just doing it.",
    },
  },
  {
    side: "right",
    kind: "text",
    text: "thats a checklist, no marks on it. yes — marking scheme for the talks, 2 marks per criterion. and a rubric with the three levels for my own notes",
    time: "20:51",
    // 0.5 + 0.011 × 143 chars = 2.07s.
    typingDur: 2.1,
    // 3 lines = 1.05 → floor 1.5, raised: this line names all three artefacts
    // and says what each has to do.
    dwell: 2.3,
    chapter: {
      id: "name-what-you-need",
      title: "Name what you need",
      description:
        "A checklist ticks boxes and a rubric gives levels. Ask for a marking scheme when you want marks.",
    },
  },
  {
    side: "right",
    kind: "text",
    // The video never shows a standalone marking scheme being delivered,
    // because five months of transcript contain no such case. The teacher's
    // last word is a check, not a thank-you.
    text: "wait. back to the exam key — q2 says mountains = \"elevated flatlands\", plateaus = \"high, rugged\". thats backwards, and the paper's own answer to 1(v) says plateaus are the elevated ones. swapping those two lines before i touch 40 scripts",
    time: "20:56",
    // 234 chars → over the ceiling, so the 2.2s thumb-typing cap.
    typingDur: 2.2,
    // The ending: ~5 dense lines, and the tail after it is only 0.7s.
    dwell: 4.2,
    chapter: {
      id: "check-before-you-mark",
      title: "Check before you mark",
      description:
        "Two lines in the key are swapped. One bad line is one bad mark on every script in the pile.",
    },
  },
];

export const SCRIPT = buildScript(MESSAGES);

// The conversation and its timing for
// /guide/teachers/teaching-practice/common-mistakes.
//
// Source: content/video-scripts/teachers/teaching-practice/common-mistakes.md,
// itself cut from the WhatsApp log (L34, L452–L458, L478–L487, L810–L820,
// L845–L895, L1150–L1164).
//
// The page is about the mistakes STUDENTS make, not mistakes the teacher makes
// with Twiga. The whole point is that Twiga advertised this six times across
// five months and the real teacher never once asked for it, so the video's job
// is to put the sentence in his mouth:
//
//   "before i teach this tomorrow, where do students usually go wrong?
//    trial balance, book keeping form 1"
//
// and then show the follow-up that makes it usable in a classroom.
//
// The script's turn 1 — Twiga's menu with "_Lesson tips or common student
// misconceptions_" buried in it — is deliberately NOT here. REPLICA_BRIEF §7.1
// requires MESSAGES[0] to be an outgoing text message, because it is what the
// WhatsApp CTA prefills, and an incoming menu cannot be that. Nothing is lost
// in the video: the "Twiga offered and nobody took it" evidence is page prose
// (see the script's Notes for the page author), and Twiga's own closing offer
// inside message 2 gives turn 3 the open offer it needs to answer properly.
//
// Turn 3 is not a bare "yes" on purpose. A bare "Yes" to one of these menus
// cost the real teacher a full round-trip — Twiga came back asking which
// subtopic he meant (L944–L950) — so the teacher here names the thing.
//
// Book Keeping is the subject because it is Twiga's own worked example of a
// misconception (L889, debit vs credit), and because it is inside the supported
// set: Book Keeping, Mathematics and Physics, Form 1 and Form 2 only (L480).
//
// Everything else — the look, the camera, the bubble motion — comes from
// `remotion/shared`.

import { buildScript, LONG_MESSAGE, type Message } from "../../shared";

/**
 * The payoff: where the class goes wrong, why they are confused, and a fix.
 *
 * The three-part shape is Twiga's own description of what a good misconception
 * answer contains (L890–L892): identify why they are confused, give a simple
 * analogy or example, offer targeted exercises. Reading it as three labelled
 * parts rather than a paragraph is most of the value, which is why the
 * `_italic_` heads from the script are kept — `shared/richText.tsx` renders
 * them.
 *
 * The `> ` line is the named mistake itself. The engine renders it as a real
 * WhatsApp quote block with a rule down its left edge, so the one thing the
 * teacher has to carry into the classroom is the one thing set apart.
 *
 * Every line survives from the script; nothing is added.
 */
const WHERE_THEY_GO_WRONG = [
  "_Trial Balance — Form 1_",
  "_Where students usually go wrong_ 🤔",
  "",
  "> _Common mistake:_ they enter balances on the wrong side — expenses and assets end up in the credit column, income and liabilities in the debit column.",
  "",
  '_Why they\'re confused:_ they memorise "debit left, credit right" as a rule about the page, not about what the account actually does.',
  "",
  "_How to correct it:_",
  "- _Simple analogy:_ debit is what the business _has or has spent_; credit is where the money _came from_.",
  '- _Reinforce:_ make them name the account type out loud before writing it — "rent is an expense, expenses are debit".',
  "- _Real-life example:_ an M-Pesa statement — money in one column, money out the other.",
  "",
  "Want 2 questions that catch this mistake?",
].join("\n");

/**
 * The ending: two questions built to expose that exact error, and what a wrong
 * answer to each one tells you.
 *
 * Both questions are quoted so they read as things to copy onto a board rather
 * than as more prose about teaching. The last line is the reason this turn
 * exists at all — questions without a marking rule are just more questions.
 *
 * Kept as a hypothesis, not a diagnosis: the transcript never shows a
 * misconception claim being checked against a real class, and the 40,000/= rent
 * figure is the teacher's to confirm. The script says so, the page says so, and
 * the video does not pretend otherwise — it only ever claims what a wrong
 * answer suggests.
 */
const TWO_QUESTIONS = [
  "Two questions designed to expose that exact error:",
  "",
  "> 1. Rent paid, 40,000/=. Which column does it go in — debit or credit? Say why in one sentence.",
  ">",
  "> 2. Here is a trial balance with _Capital_ placed under debit. Is it correct? If not, move it and explain.",
  "",
  '_What a wrong answer tells you:_ if they get Q1 wrong they are guessing sides; if they get Q2 wrong they have not connected capital to "where the money came from".',
].join("\n");

export const MESSAGES: Message[] = [
  {
    side: "right",
    kind: "text",
    // Verbatim from the script, and the exact string the WhatsApp CTA prefills.
    // Lowercase, no capital at the front: that is how the real teacher typed.
    text: "before i teach this tomorrow, where do students usually go wrong? trial balance, book keeping form 1",
    time: "07:44",
    // 0.5 + 0.011 × 100 chars = 1.6s.
    typingDur: 1.6,
    // 2 rendered lines × 0.35s = 0.7s → the 1.5s floor, plus 0.4s because it
    // ends on a question and the viewer needs a beat to register it.
    dwell: 1.9,
    chapter: {
      id: "ask-before-you-teach",
      title: "Ask before you teach",
      description:
        "One sentence with the topic, the subject and the form. Send it the night before you teach the class.",
    },
  },
  {
    side: "left",
    kind: "text",
    text: WHERE_THEY_GO_WRONG,
    ...LONG_MESSAGE,
    time: "07:44",
    // Twiga is an AI: fast and constant, whatever the reply length.
    typingDur: 1.3,
    // 19 rendered lines × 0.35s = 6.65s, plus a quarter-beat because it closes
    // on an offer the teacher is about to answer. This is the bubble the page
    // exists for, and it is read in three parts, not skimmed.
    dwell: 6.9,
    chapter: {
      id: "where-they-go-wrong",
      title: "Where they go wrong",
      description:
        "Twiga names the mistake, why the class is confused and how to fix it. That is the shape every time.",
    },
  },
  {
    side: "right",
    kind: "text",
    text: "yes, 2 questions that catch exactly that",
    time: "07:46",
    // 0.5 + 0.011 × 40 chars = 0.94s.
    typingDur: 0.9,
    // 1 rendered line → the 1.5s floor, plus a touch. It is a short line and
    // the viewer only has to notice that it says more than "yes".
    dwell: 1.6,
    chapter: {
      id: "never-just-say-yes",
      title: "Never just say yes",
      description:
        "A bare yes makes Twiga ask what you meant. Name the thing you want and you get it first time.",
    },
  },
  {
    side: "left",
    kind: "text",
    text: TWO_QUESTIONS,
    ...LONG_MESSAGE,
    time: "07:46",
    typingDur: 1.2,
    // 11 rendered lines × 0.35s = 3.85s, taken to 5.2 because this is the
    // ending — the tail after it is only 0.7s, and the last line is the one a
    // teacher will want to finish reading.
    dwell: 5.2,
    chapter: {
      id: "questions-that-catch-it",
      title: "Questions that catch it",
      description:
        "Two questions built to expose that exact error. Twiga also says what a wrong answer tells you.",
    },
  },
];

export const SCRIPT = buildScript(MESSAGES);

// The conversation and its timing for /guide/teachers/getting-started/checking-answers.
//
// Source: content/video-scripts/teachers/getting-started/checking-answers.md,
// itself cut from the WhatsApp log (Trial Balance plan and its citation at
// L500–L566, the Form 1 map-reading answer and its five Form Three citations at
// L942–L981).
//
// Both of Twiga's replies here are WRONG in the same way and the video shows
// them wrong. That is the page: the content is fluent, well structured and
// immediately usable, and the only thing that gives the defect away is the
// `Sources:` block at the bottom. Softening either reply into a success would
// leave the page arguing for a check with nothing to catch.
//
// Six turns, in three pairs, because the engine keeps two messages on screen
// (VISIBLE = 2 in shared/ChatScene.tsx) and message i leaves as message i+2
// lands. The pairing is deliberate: the bad citation is still beside the
// teacher who caught it in both cases —
//   0+1  the ordinary ask and the plan with the geography citation
//   1+2  that citation beside the teacher naming it
//   2+3  the catch beside the next, equally ordinary, request
//   3+4  that request beside a Form Three answer to it
//   4+5  the Form Three citations beside the teacher demoting them
//
// Everything else — the look, the camera, the bubble motion — comes from
// `remotion/shared`.

import { buildScript, LONG_MESSAGE, type Message } from "../../shared";

/**
 * The Trial Balance plan, quoted from the script.
 *
 * Trimmed to three of the five numbered stages — the numbering is left at 1, 3
 * and 5 rather than renumbered, so the bubble reads as an extract of a longer
 * plan rather than a plan that skips stages. Every surviving line is verbatim
 * apart from the script's `>` blockquote prefixes, which are dropped:
 * `richText.tsx` renders WhatsApp's three inline marks and has no block syntax,
 * so a literal "> " prints as stray punctuation. twiga-how-to-ask made the same
 * call, and the two videos should not disagree about it.
 *
 * The last two lines are the whole reason this bubble exists. The bookkeeping
 * content is correct; `[1]` sits on the core debit-equals-credit rule and then
 * resolves to a Geography agriculture chapter (L532 → L566). The `_italic_`
 * markers are the script's own and are rendered by `shared/richText.tsx`; the
 * headings are what make this read as a document you would hand to a class
 * without a second look.
 */
const TRIAL_BALANCE = [
  "_Trial Balance_ — Book Keeping, Form 2 (40 min)",
  "",
  "_1. Warm-up (5 min)_",
  "> After posting all the ledger accounts, what do we do to check every entry was recorded correctly?",
  "",
  "_3. New content (15 min)_",
  "- A Trial Balance lists the closing balances of every ledger account, debit on the left and credit on the right",
  "- The debit total must equal the credit total — if it is not equal, there is an error [1]",
  "",
  "_5. Class work (7 min)_",
  "> Bank 1,500,000 (debit) · Capital 2,000,000 (credit) · Furniture 800,000 (debit) · Creditors 300,000 (credit)",
  "",
  "Sources:",
  "- [1] Geography for Secondary Schools Student's Book Form Two, Chapter Two (Agriculture)",
].join("\n");

/**
 * The map-reading answer, quoted from the script.
 *
 * The defect is on the surface here rather than buried: the opening line names
 * _Form 3_ out loud, and both citations name Form Three, to a teacher who asked
 * for Form 1. Both source lines are kept even though they are identical, because
 * that is what the log shows (L976–L981) and because "every line says Form
 * Three" is the observation the next message makes.
 */
const TYPES_OF_MAPS = [
  "Based on the official TIE Geography textbook for _Form 3_, the two main types of maps are:",
  "",
  "- _Topographical Maps_",
  "These show both natural (physical) and man-made features of an area [1]",
  "",
  "- _Statistical Maps_",
  "These give quantitative information about the distribution of a phenomenon [4]",
  "",
  "Sources:",
  "- [1] Geography for Secondary Schools Student's Book Form Three, Elementary Surveying",
  "- [4] Geography for Secondary Schools Student's Book Form Three, Elementary Surveying",
].join("\n");

export const MESSAGES: Message[] = [
  {
    side: "right",
    kind: "text",
    text: "bookkeeping form 2 tomorrow. give me a short lesson plan on trial balance",
    time: "07:41",
    // 0.5 + 0.011 × 73 chars = 1.30s.
    typingDur: 1.3,
    // 2 rendered lines = 0.7s → floor 1.5, plus a touch: nothing here needs
    // studying, and the sooner the reply lands the sooner the check has a
    // subject.
    dwell: 1.6,
    chapter: {
      id: "an-ordinary-request",
      title: "An ordinary request",
      description:
        "Subject, form and topic in one line, on an ordinary day. Check every answer, not just the ones that look wrong.",
    },
  },
  {
    side: "left",
    kind: "text",
    text: TRIAL_BALANCE,
    ...LONG_MESSAGE,
    time: "07:42",
    // Twiga is an AI: fast and constant, whatever the reply length.
    typingDur: 1.2,
    // ~19 rendered lines at the long-message preset × 0.35s = 6.65s, taken at
    // 6.4 — the top of the brief's 5–7s band for a structured reply. The last
    // two lines are the ones that have to be read, and they are the ones a
    // viewer's eye reaches last.
    dwell: 6.4,
    chapter: {
      id: "scroll-to-the-sources-block",
      title: "Scroll to Sources",
      description:
        "A usable Form 2 plan, but its one source names a Geography agriculture chapter. Most answers show no sources at all.",
    },
  },
  {
    side: "right",
    kind: "text",
    text: "hold on. [1] is a geography agriculture chapter. thats not my subject — im checking that rule in the book keeping book before i teach it",
    time: "07:43",
    // 0.5 + 0.011 × 136 chars = 2.00s, just inside the 2.2s thumb-typing cap.
    typingDur: 2.0,
    // ~3 rendered lines = 1.05s → floor 1.5, raised: this is step two of the
    // check being done out loud, and it has to land against the bubble above it.
    dwell: 2.2,
    chapter: {
      id: "read-the-subject-name",
      title: "Read the subject name",
      description:
        "The debit and credit rule is right, but its source is from another subject. Look it up in the Book Keeping book first.",
    },
  },
  {
    side: "right",
    kind: "text",
    text: "and for my geography class — form 1 map reading, types of maps",
    time: "07:45",
    // 0.5 + 0.011 × 62 chars = 1.18s.
    typingDur: 1.2,
    // 2 rendered lines = 0.7s → floor 1.5, plus a beat for the class and form to
    // register — the whole next chapter turns on "form 1" having been asked for.
    dwell: 1.6,
    chapter: {
      id: "form-1-asked-for",
      title: "Form 1, asked for",
      description:
        "Another normal ask, and the form is stated plainly. That is what lets you check the next answer.",
    },
  },
  {
    side: "left",
    kind: "text",
    text: TYPES_OF_MAPS,
    ...LONG_MESSAGE,
    time: "07:46",
    typingDur: 1.3,
    // ~15 rendered lines × 0.35s = 5.25s → 5.4. The form number appears three
    // times in this bubble and the viewer needs to find all three.
    dwell: 5.4,
    chapter: {
      id: "then-read-the-form",
      title: "Then read the form",
      description:
        "It reads well, but the text and both sources say Form 3. The teacher asked for Form 1 and Twiga never mentions it.",
    },
  },
  {
    side: "right",
    kind: "text",
    text: "form three, every line. i asked form 1. keeping this as my own background reading, not as form 1 material",
    time: "07:47",
    // 0.5 + 0.011 × 105 chars = 1.66s.
    typingDur: 1.7,
    // The ending: the tail after this is only 0.7s, and the last clause is the
    // one the page wants a teacher to leave with.
    dwell: 3.3,
    chapter: {
      id: "demote-dont-discard",
      title: "Demote, don't discard",
      description:
        "Failing the check does not make an answer useless. Wrong subject or wrong form means background reading for you, not class material.",
    },
  },
];

export const SCRIPT = buildScript(MESSAGES);

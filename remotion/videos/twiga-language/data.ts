// The conversation and its timing for
// /guide/teachers/troubleshooting/language.
//
// Source: the WhatsApp log at research/whatsapp-twiga/_chat.txt — L500–L566 for
// the Kiswahili request and the Kiswahili lesson plan that came back, and
// L95–L108 for Twiga's own claim about its Kiswahili terminology.
//
// The page has two things to say and they are independent of each other:
//
//   1. Twiga works in Kiswahili. Write to it in Kiswahili and the whole reply
//      comes back in Kiswahili — here, a complete Form 2 Book Keeping lesson
//      plan on Trial Balance, headings and all. That is the payoff, and the
//      poster frame sits on it.
//   2. The Kiswahili it writes needs proofreading before it is photocopied.
//      Twiga states outright that every word matches the TIE textbooks (L108).
//      It does not: the plan above is headed _Waliozoea_, uses _Kupitisha_ for
//      two different sections, and labels the development stage _Matokeo_ while
//      the objectives are _Matokeo ya Kujifunza_. The viewer has just spent six
//      seconds looking at those headings when Twiga vouches for them.
//
// An earlier cut of this video was built around "Sorry, I currently support
// English only." That refusal was a product bug and has been fixed. It is not
// scripted here, and neither is the retype-in-English workaround it forced.
//
// Every line in every bubble is verbatim from the transcript. Nothing here is
// composed Kiswahili — this page is specifically about Kiswahili terminology
// being wrong, so inventing any would be the one unforgivable move.
//
// Trims (nothing added, only removed):
//   - The `---` rules between the plan's sections; blank lines carry the same
//     break without rendering as dashes.
//   - Section 1's second bullet, section 2's third objective, and the tail of
//     section 3's bullet after "_Ledger_".
//   - The plan's closing encouragement, its homework note and its Sources
//     footer (which cites a Geography textbook for a Book Keeping plan — real,
//     and a different page's problem).
//   - From the L96–L108 reply: everything before "Pia nimejitahidi…", because
//     that opening names Algebra and this thread is about Book Keeping.
//
// Everything else — the look, the camera, the bubble motion — comes from
// `remotion/shared`.

import { buildScript, LONG_MESSAGE, type Message } from "../../shared";

/**
 * The Kiswahili lesson plan, L501–L566, trimmed to the sections and kept
 * otherwise word for word.
 *
 * The `_italic_` markers are the transcript's own — Twiga italicises every
 * section heading — and `shared/richText.tsx` renders them. They are what makes
 * this read as a document rather than a paragraph, and they are also what puts
 * the suspect headings in italics where a viewer will look at them.
 *
 * The `> ` lines are the transcript's too, and become a WhatsApp quote block
 * with a green rule down the left.
 */
const PLAN = [
  "_Asante sana, mwalimu!_ Hapa kuna mpango fupi wa somo la _Trial Balance_ kwa _Book Keeping, Form 2_, unaoendelea na mada ya hesabu za kifedha:",
  "",
  "_Jina la Somo:_ _Uundaji wa Trial Balance_",
  "_Darasa:_ Form 2",
  "_Somo:_ Book Keeping",
  "_Muda:_ 40 dakika",
  "",
  "_1. Waliozoea (5 dakika)_",
  "- Uliza swali moja:",
  '> "Je, baada ya kulishe kadi za hesabu, hatimaye tunafanya nini ili kuhakikisha kuwa hesabu zote zimeandikwa vizuri?"',
  "",
  "_2. Matokeo ya Kujifunza (3 dakika)_",
  "Wanafunzi wataweza:",
  "- Eleza maana ya _Trial Balance_",
  "- Orodhesha madhumuni makuu mawili ya Trial Balance",
  "",
  "_3. Matokeo (15 dakika)_",
  "- Eleza kwamba _Trial Balance_ ni orodha ya salio zote za mwisho za kadi za hesabu katika _Ledger_",
  "",
  "_4. Mfano wa Haraka (7 dakika)_",
  "Toa mfano wa hesabu tatu kutoka Ledger (kama Rent, Capital, Bank) pamoja na salio zao za mwisho, kisha unda Trial Balance pamoja na wanafunzi.",
  "",
  "_5. Kazi ya Darasa / Kupitisha (7 dakika)_",
  "> Unda Trial Balance kwa kutumia hesabu zifuatazo kutoka kwenye Ledger ya Bi. Mwajuma:",
  "",
  "_6. Kupitisha (3 dakika)_",
  '> "Kwa nini Trial Balance inahitajika katika uhasibu wa biashara?"',
].join("\n");

/**
 * Twiga's quality claim, L106–L108 and the two bullets after it, verbatim.
 *
 * The first bullet is the false one: "all the words are Kiswahili as they are
 * used in the TIE books". The third bullet quietly disproves it in the same
 * breath — _mchango_ means contribution, not lesson flow.
 */
const CLAIM = [
  "Pia nimejitahidi kuhakikisha kwamba:",
  "",
  "- Maneno yote ni ya kiswahili kama yanavyotumika kwenye vitabu vya TIE",
  "- Mifano inafaa kwa umri wa wanafunzi wa sekondari",
  "- Mchango unafuatia muda wa somo (40 dakika)",
  "- Kuna mahali pa wanafunzi kushiriki kikamilifu",
].join("\n");

export const MESSAGES: Message[] = [
  {
    side: "right",
    kind: "text",
    // L500, exactly as typed — including "lesson plan" and "Form 2" sitting in
    // the middle of a Kiswahili sentence, which is how teachers actually write.
    text: "Asante sana! Sasa nataka kufundisha bookkeeping Form 2 kesho. Nipe lesson plan fupi ya somo la trial balance, kiswahili tafadhali.",
    time: "10:46",
    // 0.5 + 0.011 × 130 chars = 1.93s.
    typingDur: 1.9,
    // 3 rendered lines × 0.35s = 1.05s → the 1.5s floor, plus 0.5s so the
    // viewer registers which language this was sent in before the reply starts.
    dwell: 2.0,
    chapter: {
      id: "write-in-kiswahili",
      title: "Write in Kiswahili",
      description:
        "Ask in Kiswahili and name the subject and form you teach. Twiga reads it fine.",
    },
  },
  {
    side: "left",
    kind: "text",
    text: PLAN,
    ...LONG_MESSAGE,
    time: "10:46",
    // Twiga is an AI: fast and constant, whatever the reply's length. The real
    // gap here was 21 seconds for a full lesson plan.
    typingDur: 1.2,
    // Around 30 rendered lines. The brief caps a long structured reply at 5–7s,
    // and this one is the payoff, so it takes the top of that range — nobody
    // reads a lesson plan in a video, but they must see it is a whole one and
    // that every heading on it is Kiswahili.
    dwell: 6.6,
    chapter: {
      id: "kiswahili-comes-back",
      title: "Kiswahili comes back",
      description:
        "The whole lesson plan comes back in Kiswahili. You get the language you wrote in.",
    },
  },
  {
    side: "right",
    kind: "text",
    // L95, typo kept. The teacher's own follow-up, unchanged.
    text: "how is the leasson plan made?",
    time: "10:52",
    // 0.5 + 0.011 × 29 chars = 0.82s.
    typingDur: 0.9,
    // 1 rendered line = 0.35s → the 1.5s floor, plus 0.3s of silence, because a
    // question needs a beat before it is answered.
    dwell: 1.8,
    chapter: {
      id: "ask-how-it-was-made",
      title: "Ask how it was made",
      description:
        "Ask where a plan came from. Twiga answers in the same thread, about the plan above.",
    },
  },
  {
    side: "left",
    kind: "text",
    text: CLAIM,
    time: "10:52",
    typingDur: 1.1,
    // 7 rendered lines × 0.35s = 2.45s, taken to 3.8s because it is the ending
    // and the tail after it is only 0.7s. The plan slides out as this lands
    // (the engine keeps two messages on screen), so the first bullet has to be
    // read against a memory of the headings rather than against the headings —
    // which is exactly the position a teacher at the photocopier is in.
    dwell: 3.8,
    chapter: {
      id: "check-the-words-yourself",
      title: "Check the words yourself",
      description:
        "Twiga says every word matches the TIE books. Some do not, so read the headings before you print.",
    },
  },
];

export const SCRIPT = buildScript(MESSAGES);

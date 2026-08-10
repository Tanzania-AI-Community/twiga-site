// The conversation and its timing for /guide/teachers/assessment/quizzes-and-exercises.
//
// Source: content/video-scripts/teachers/assessment/quizzes-and-exercises.md
// (chat.txt L488–L499, L840–L847).
//
// This is the relief page, so the arc is deliberately short and lucky: a normal
// teaching question, a one-line answer, an interruption ("the headteacher just
// called an emergency meeting in 5"), one request that names a count, a format
// and a difficulty spread while leaning on the previous turn for the topic, and
// the whole exit ticket landing in the same minute. It closes on the teacher
// asking for the next format in the same shape, on a different subject.
//
// Not repeated from videos/twiga-how-to-ask, which also ends on an exit ticket:
// that video argues about what a request has to *name* before Twiga can answer
// at all, and its checklist turn is the page. Nothing here is about supplying
// missing fields. This one is about the assessment formats you can get and the
// verb that decides whether they arrive — the recipe is count, format,
// difficulty, and a topic inherited from the message above it.
//
// Honesty note. The exercise-generation tool failed on every attempt in the log
// (nine "📑 Generating exercises from the course content, please hold..."
// messages and then a refusal, L1424–L1432). The script's "Notes for the page
// author" rule that stall off this page on purpose and send it to
// /guide/teachers/troubleshooting/no-reply, so it is not scripted here. It is
// not hidden either: the last chapter says plainly that asking Twiga to
// *generate an exercise* often stalls while *write me* and *set me* come back
// inline. Nothing in this video shows the bot succeeding at something the
// transcript shows it failing.
//
// Everything else — the look, the camera, the bubble motion — comes from
// `remotion/shared`.

import { buildScript, type Message } from "../../shared";

/**
 * The one-line intro, verbatim from the script (L489). Twiga's own quotation
 * marks are kept: they are what makes it a line to read out, not a paragraph
 * about Newton. This line is also the topic the next request inherits, so it
 * has to still be legible while the exit ticket is being typed.
 */
const INTRO_LINE =
  '"An object will stay still or keep moving in a straight line unless a force — like a push, pull, or stop — makes it change!"';

/**
 * The exit ticket, six seconds after the request in the real log (L490 → L491).
 *
 * The three questions keep the script's `> ` prefixes, so `shared/richText.tsx`
 * renders them as one WhatsApp quote block with a green rule down the left. That
 * is what separates the questions a teacher copies onto the board from Twiga's
 * framing around them, and it is why the bare `>` separator lines are kept too.
 *
 * Left at the default 29px rather than the LONG_MESSAGE preset: nine authored
 * lines is the same weight as the exit ticket in twiga-how-to-ask, it is this
 * video's payoff and its poster frame, and the questions have to be readable
 * from the rail. `_True or False:_` is the script's own marker and stays.
 */
const EXIT_TICKET = [
  "Of course! Here's a quick 3-question exit ticket on Newton's First Law — easy, medium, and challenge — perfect for Form 2 students:",
  "",
  "> 1. What happens to a ball lying on the ground if no one kicks it? Explain using Newton's First Law.",
  ">",
  "> 2. A passenger in a moving car jerks forward when the car suddenly stops. Use Newton's First Law to explain why.",
  ">",
  "> 3. _True or False:_ An object in motion always needs a force to keep moving. Explain your answer.",
  "",
  "Let me know if you want the marking guide — I can send it in 10 seconds!",
].join("\n");

export const MESSAGES: Message[] = [
  {
    side: "right",
    kind: "text",
    text: "ok recap im now going to physics form 2. give me a 1-line intro for newtons first law that 14 year olds will actually remember",
    time: "10:44",
    // 0.5 + 0.011 × 126 chars = 1.89s.
    typingDur: 1.9,
    // ~3 rendered lines at 29px = 1.05s, floored to 1.5 and taken to 2.0: the
    // opener has to register as an ordinary teaching question before the
    // interruption arrives, because the interruption is the point.
    dwell: 2.0,
    chapter: {
      id: "one-line-first",
      title: "One line first",
      description:
        "The teacher asks for a one line intro for Form 2 physics. That line becomes the thing the exit ticket will test.",
    },
  },
  {
    side: "left",
    kind: "text",
    text: INTRO_LINE,
    time: "10:45",
    // Twiga is an AI: fast and constant, whatever the reply length.
    typingDur: 1.0,
    // ~3 rendered lines at 29px = 1.05s, floored to 1.5 and raised to 2.8. The
    // viewer has to actually read this sentence, because the next request points
    // back at it instead of naming the topic again.
    dwell: 2.8,
    chapter: {
      id: "the-line-lands",
      title: "The line lands",
      description:
        "Twiga answers in one sentence a Form 2 class can repeat. Check it against your book before you put it on the board.",
    },
  },
  {
    side: "right",
    kind: "text",
    text: "ugh the headteacher just called an emergency meeting in 5. im so tired. anyway can you set me a quick 3 question exit ticket for the law you just gave me? mixed difficulty",
    time: "10:45",
    // 0.5 + 0.011 × 171 chars = 2.38s, capped at the 2.2s thumb-typing ceiling.
    typingDur: 2.2,
    // ~4 rendered lines = 1.4s, floored to 1.5, then 2.8 — it ends on a question
    // and the viewer has to pick three separate things out of one tired
    // sentence: the count, the format and the difficulty spread.
    dwell: 2.8,
    chapter: {
      id: "count-format-difficulty",
      title: "Count, format, difficulty",
      description:
        "Three things in one message. Say how many questions, what format, and how hard, then let the thread carry the topic.",
    },
  },
  {
    side: "left",
    kind: "text",
    text: EXIT_TICKET,
    time: "10:45",
    typingDur: 1.2,
    // ~13 rendered lines at 29px = 4.6s, taken to 5.4. Three questions is real
    // reading, not scanning, and this is the payoff and the poster frame. Inside
    // the 5–7s band the brief sets for a structured reply.
    dwell: 5.4,
    chapter: {
      id: "back-in-seconds",
      title: "Back in seconds",
      description:
        "The full ticket arrives banded easy, medium and challenge. Question 3 asks them to explain, so a guess will not pass.",
    },
  },
  {
    side: "right",
    kind: "text",
    text: "thats going straight on the board. later for book keeping — write me 5 short questions on petty cash book for form 2",
    time: "10:47",
    // 0.5 + 0.011 × 116 chars = 1.78s.
    typingDur: 1.8,
    // The ending, and the tail after it is only 0.7s. ~3 rendered lines = 1.05s
    // floored to 1.5, held at 3.2 so the second format and the verb both land
    // before the loop fade comes up.
    dwell: 3.2,
    chapter: {
      id: "write-me-not-generate",
      title: "Write me, not generate",
      description:
        "Write me 5 short questions is the same recipe again. Asking Twiga to generate an exercise instead often stalls and sends nothing.",
    },
  },
];

export const SCRIPT = buildScript(MESSAGES);

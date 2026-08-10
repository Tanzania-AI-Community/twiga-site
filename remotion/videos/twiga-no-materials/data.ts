// The conversation and its timing for /guide/teachers/improvisation/no-materials.
//
// Source: content/video-scripts/teachers/improvisation/no-materials.md
//
// This is the before-and-after, not a request-writing lesson. The
// twiga-requesting-lesson-plan video shows a request that ALREADY carries the
// constraint ("no teaching aids at all, just a chalkboard") and gets a workable
// plan first time. This one shows what happens when the constraint is missing:
// the same bot, the same syllabus title, and a Materials Needed list demanding a
// globe, a wall map, flashcards and a projector — then, eleven days later, the
// constraint stated plainly and six strategies that run on the room itself.
// The failure has to be on screen or the recovery means nothing.
//
// Trimmed from five turns to five messages, one of which is a date divider:
// the script's closing offer menu ("would you like a practice exercise…") is
// dropped. It would have pushed the runtime past 30s and, with a sliding window
// of two, it would have stood beside the strategies instead of the constraint
// standing beside them — and that pairing is the whole argument of the page.
// The eleven-day gap the log actually has is carried by the date labels and the
// divider, not by dwell.
//
// Everything else — the look, the camera, the bubble motion — comes from
// `remotion/shared`.

import { buildScript, LONG_MESSAGE, type Message } from "../../shared";

/**
 * The first reply: a lesson plan costed for a school that owns equipment.
 *
 * A long text bubble rather than a DocCard, on purpose. The payoff of this page
 * is *what is inside* the Materials Needed list, and the Introduction opening
 * "Show a globe" is the line that proves nothing was ever checked against the
 * classroom. A skeleton card would show grey bars and the whole point would be
 * invisible.
 *
 * Trimmed to fit: every line survives verbatim from the script. The `_italic_`
 * markers are the transcript's own and `shared/richText.tsx` renders them.
 */
const GLOBE_PLAN = [
  "_Form 1 Geography – Lesson Plan_",
  "_Topic:_ Longitudes and Latitudes",
  "_Duration:_ 45 minutes",
  "",
  "_Materials Needed:_",
  "•  Globe or world map with latitude and longitude lines",
  "•  Map of Tanzania with grid lines",
  "•  Colored pencils or markers",
  "•  Flashcards with key terms",
  "•  Chalkboard or projector",
  "•  Protractor (optional, for demonstration)",
  "",
  "_Lesson Flow:_",
  "1.  _Introduction (10 minutes)_",
  '   •  Show a globe and ask: "How do we find a place like Dar es Salaam on a map?"',
].join("\n");

/**
 * The second reply, after the constraint is stated: six low-resource strategies.
 *
 * Three of them need nothing at all, one needs chalk, one needs a scrap of
 * paper. Sub-bullets are cut to one or two per strategy so the block fits the
 * column, but all six headings stay — "six strategies, no equipment list" is
 * the fact the viewer is meant to leave with.
 *
 * Two deliberate omissions, both flagged in the script's notes:
 *   • Strategy 3's "use a marker to draw the Equator" is dropped. The marker was
 *     on the original equipment list, so it is the one item that survived the
 *     constraint, and the page prose is where that belongs.
 *   • Strategy 1 is the script's corrected wording — the teacher leans to show
 *     the tilt, the ring of students stays flat. The original told the class the
 *     Equator was tilted. This is a correction the page makes explicitly; it is
 *     not an invention.
 */
const STRATEGIES = [
  "Let me share some practical, low-resource strategies you can use right now without physical materials:",
  "",
  "_1. Use Your Body as a Globe 🌍_",
  "•  Stand in the middle of the class as the _Earth's axis_ — lean slightly to show the tilt (23.5°).",
  "•  Ask students to form a circle around you: that circle is the _Equator_.",
  "_2. Draw on the Floor or Ground_",
  "•  Chalk on the floor, or tape/string. A circle for the Equator, parallel lines above and below for latitudes, vertical lines top to bottom for longitudes.",
  "_3. Use a Ball or Any Round Object_",
  "•  Any ball — _even a crumpled paper ball_ — can represent Earth.",
  "_4. Hand Gestures and Movement_",
  "•  Arms held horizontally = latitudes. Arms stretched head to feet = longitudes.",
  "_5. Storytelling Approach_",
  '•  _"Imagine Earth is an orange. The lines around it like rubber bands are latitudes. The lines from top to bottom like slices are longitudes."_',
  "•  Latitudes never meet; longitudes meet at the poles.",
  "_6. Simple Classroom Activity_",
  "•  Students draw a small circle on paper and label the Equator and Prime Meridian.",
].join("\n");

export const MESSAGES: Message[] = [
  {
    side: "right",
    kind: "text",
    text: "i am teaching geography form 1, map reading. the title is longitudes and latitudes",
    // Bare HH:MM, as in the real client. The eleven-day gap between the two
    // halves of this conversation is carried by the date divider below, not by
    // dwell and not by the clock.
    time: "13:51",
    // 0.5 + 0.011 × 82 chars = 1.40s.
    typingDur: 1.4,
    // 2 rendered lines × 0.35 = 0.7 → floor 1.5, plus a beat: the viewer has to
    // notice what is NOT in this line before the reply arrives.
    dwell: 1.8,
    chapter: {
      id: "ask-without-the-constraint",
      title: "Ask without the constraint",
      description:
        "The teacher names class, subject and topic. Nothing here tells Twiga what the classroom actually has.",
    },
  },
  {
    side: "left",
    kind: "text",
    text: GLOBE_PLAN,
    ...LONG_MESSAGE,
    time: "13:52",
    // Twiga is an AI: fast and constant, whatever the reply length.
    typingDur: 1.2,
    // 18 rendered lines at the long-message preset × 0.35 = 6.3s. The equipment
    // list is the thing to read, so it gets the full structured-reply band.
    dwell: 6.3,
    chapter: {
      id: "built-around-a-globe",
      title: "Built around a globe",
      description:
        "Twiga asks for a globe, a wall map, flashcards and a projector. It never checked what the room has.",
    },
  },
  {
    side: "center",
    kind: "system",
    text: "13 July",
    // A real date divider carries no clock label, and the engine drops the
    // timestamp row entirely when `time` is empty.
    time: "",
    // WhatsApp's own chrome, not a speaker. The engine shows no typing dots for
    // a system message, so this is a beat of silence before the seam appears.
    typingDur: 0.7,
    // One line = floor 1.5. Long enough to register the jump, short enough that
    // the gap is told rather than sat through.
    dwell: 1.5,
    chapter: {
      id: "eleven-days-later",
      title: "Eleven days later",
      description:
        "Same teacher, same topic, a new day. Twiga did not remember the empty cupboard, so it has to be told again.",
    },
  },
  {
    side: "right",
    kind: "text",
    text: "i'm looking for alternatives on how to explain to students longitudes and latitudes, as right now i dont have any materials to explain to them physically",
    time: "15:45",
    // 0.5 + 0.011 × 153 chars = 2.18s.
    typingDur: 2.2,
    // 3 rendered lines × 0.35 = 1.05 → floor 1.5, then raised: this one clause
    // is the whole page and it has to be read before the answer lands.
    dwell: 2.2,
    chapter: {
      id: "add-the-missing-clause",
      title: "Add the missing clause",
      description:
        "One clause says there are no materials. Put it in the same message as the topic, because Twiga never asks.",
    },
  },
  {
    side: "left",
    kind: "text",
    text: STRATEGIES,
    ...LONG_MESSAGE,
    time: "15:46",
    typingDur: 1.3,
    // The ending, and the tail after it is only 0.7s. 23 rendered lines × 0.35
    // = 8.05s, pulled back to 7.2 to hold the runtime under 30s: the six
    // headings are scannable before the sub-bullets are read.
    dwell: 7.2,
    chapter: {
      id: "strategies-not-equipment",
      title: "Strategies, not equipment",
      description:
        "Six ways to teach it using your body, chalk and a paper ball. The equipment list is gone.",
    },
  },
];

export const SCRIPT = buildScript(MESSAGES);

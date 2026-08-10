// The conversation and its timing for /guide/teachers/getting-started/subjects.
//
// Source: content/video-scripts/teachers/getting-started/subjects.md, itself cut
// from the WhatsApp log (settings command at L668–L695, the form and the silence
// at L926–L941, the read-back at L980–L985).
//
// The page's goal is not "here is the settings menu" — it is *prove the save
// worked*, because the product gives no confirmation. So the arc is deliberately
// front-loaded with cheap turns (the command, the menu, the button) and spends
// its screen time on the last three: the form goes back, nothing comes back, and
// the teacher gets the only feedback there is by asking for it.
//
// All seven script turns survive. None of them is padding: drop the menu and the
// bare word `settings` stops being demonstrated as the only way in; drop the
// submitted form and the silence has nothing to follow.
//
// Everything else — the look, the camera, the bubble motion — comes from
// `remotion/shared`.

import { buildScript, type Message } from "../../shared";

/**
 * The settings menu, verbatim from the script.
 *
 * The two buttons are written as a text line rather than as a card because they
 * are a *choice*, not a document — the viewer has to read both labels and see
 * which one this page is about. A DocCard skeleton would hide exactly the two
 * words that matter.
 */
const SETTINGS_MENU = [
  "Welcome to the Settings Menu, please select what you want to update.",
  "This is an automatic message 🦒",
  "",
  "[ Personal Info ]  [ Classes and Subjects ]",
].join("\n");

/**
 * The read-back — the payoff of the page.
 *
 * The `_italic_` markers are the script's own and are rendered by
 * `shared/richText.tsx`. They earn their place here: the italics are what turn
 * "Geography, Forms 1 to 4" from prose into a *list a teacher can check against
 * their own timetable*, which is the entire point of asking the question.
 */
const READ_BACK = [
  "You are teaching _Geography_ 🌎 for _Form 1, Form 2, Form 3,_ and _Form 4_.",
  "",
  "Let me know if you'd like support with lesson content, practice questions, or teaching tips for any of these classes!",
].join("\n");

export const MESSAGES: Message[] = [
  {
    side: "right",
    kind: "text",
    text: "settings",
    time: "12:17",
    // 0.5 + 0.011 × 8 chars = 0.59s, raised to the 0.8s thumb-typing floor.
    typingDur: 0.8,
    // 1 rendered line = 0.35s → floor 1.5, then +0.2: the whole page turns on
    // the viewer noticing this is one bare word and nothing else.
    dwell: 1.7,
    chapter: {
      id: "the-bare-word-settings",
      title: "Just the word settings",
      description:
        "Send just the word settings, with no slash and nothing else. That is the only way in.",
    },
  },
  {
    side: "left",
    kind: "text",
    text: SETTINGS_MENU,
    time: "12:17",
    // Twiga is an AI: fast and constant, whatever the reply length.
    typingDur: 1.0,
    // 5 rendered lines (the welcome line wraps to 2) × 0.35 = 1.75s, raised to
    // 2.4 because this is a decision point — the viewer reads two labels and
    // has to hold on to which one they want.
    dwell: 2.4,
    chapter: {
      id: "two-buttons",
      title: "Two buttons, one menu",
      description:
        "Personal Info is your name and school. Classes and Subjects decides which questions Twiga will answer.",
    },
  },
  {
    side: "right",
    kind: "text",
    text: "Classes and Subjects",
    time: "12:17",
    // 0.5 + 0.011 × 20 chars = 0.72s, raised to the 0.8s floor.
    typingDur: 0.8,
    // 1 rendered line = 0.35s → floor 1.5. A button tap; nothing to read.
    dwell: 1.5,
    chapter: {
      id: "pick-classes-and-subjects",
      title: "Pick the second button",
      description:
        "This opens a WhatsApp form. Forms only work in the phone app, not on Web or Desktop.",
    },
  },
  {
    side: "left",
    kind: "card",
    card: {
      title: "CLASSES AND SUBJECTS",
      // The card header carries the instruction the script's text lines gave;
      // the skeleton's label column plus field lines is what says "form".
      subtitle: "Select the classes you teach 📚",
      badge: "FORM",
      rows: 4,
    },
    time: "12:18",
    typingDur: 1.1,
    // Not a reading dwell — a *warning* dwell. The rail copy beside this beat
    // is the one thing that stops a teacher wiping three subjects off their
    // profile, so the card holds long enough to be read alongside it.
    dwell: 3.0,
    chapter: {
      id: "tick-everything-in-one-pass",
      title: "Tick everything, one pass",
      description:
        "The form replaces your whole profile. Tick everything you teach, including subjects already saved, or they are wiped.",
    },
  },
  {
    side: "right",
    kind: "card",
    card: {
      title: "CLASSES AND SUBJECTS",
      subtitle: "Geography · Form 1, 2, 3, 4",
      badge: "SENT",
      // Shorter than the blank form above it: a submitted receipt, not another
      // form to fill. The size difference is the only cue the shared card frame
      // gives — `imgVisual()` paints an outgoing card the same white as an
      // incoming one, so alignment and height do the work.
      rows: 3,
      height: 250,
    },
    time: "12:19",
    // Longer than any typing indicator in this video, and not derived from a
    // character count: it stands for ticking through a multi-select form, which
    // is the slowest thing the teacher does here. Still inside the 2.2s cap.
    typingDur: 1.6,
    // This dwell IS the beat. No left-hand typing indicator ever appears, and
    // 3.2s is long enough for the absence to register as absence rather than as
    // the video hanging.
    dwell: 3.2,
    chapter: {
      id: "the-save-is-silent",
      title: "Nothing comes back",
      description:
        "No reply comes back. The silence does not mean it failed, so do not wait for one.",
    },
  },
  {
    side: "right",
    kind: "text",
    text: "what subjects am i teaching?",
    time: "12:20",
    // 0.5 + 0.011 × 28 chars = 0.81s.
    typingDur: 0.9,
    // 1 rendered line = 0.35s → floor 1.5, +0.4 for the beat a question earns
    // before its answer.
    dwell: 1.9,
    chapter: {
      id: "check-by-asking",
      title: "Check by asking",
      description:
        "Ask Twiga what you teach. That question is the only way to see what the form saved.",
    },
  },
  {
    side: "left",
    kind: "text",
    text: READ_BACK,
    time: "12:20",
    typingDur: 1.2,
    // 6 rendered lines × 0.35 = 2.1s, raised to 3.9: this is the ending and the
    // tail after it is only 0.7s, so the reading has to finish inside the dwell.
    dwell: 3.9,
    chapter: {
      id: "the-list-read-back",
      title: "The list, read back",
      description:
        "Geography, Forms 1 to 4, and nothing else. Any subject missing here is one Twiga will refuse to answer.",
    },
  },
];

export const SCRIPT = buildScript(MESSAGES);

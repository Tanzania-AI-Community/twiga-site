import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { clamp01 } from "../shared/visuals";
import { CARET_OUT, TYPE_START } from "./timeline";

const FONT = "'Helvetica Neue',Helvetica,Arial,sans-serif";

// The closing line, typed out under the WhatsApp icon.
//
// Two segments so the payoff lands in brand green and heavier weight — the
// typing runs straight through both, the styling is just what each character
// wears once it's revealed.
const SEGMENTS = [
  { text: "for teachers, ", color: "#6e675c", weight: 400 },
  { text: "for you.", color: "#0d5c4c", weight: 700 },
] as const;

const FULL = SEGMENTS.map((s) => s.text).join("");

// Per-character cadence. A typewriter that ticks perfectly evenly reads as a
// progress bar; punctuation is where a real one breathes, so the comma buys a
// beat and the full stop lands late.
const CHAR = 0.072;
const PAUSE: Record<string, number> = { ",": 0.34, ".": 0.2 };

// Cumulative reveal time per character index — computed once, so the reveal is
// a pure function of the frame (no state, deterministic under Remotion).
const CHAR_TIME: number[] = (() => {
  const out: number[] = [];
  let acc = 0;
  for (const ch of FULL) {
    acc += CHAR;
    out.push(acc);
    acc += PAUSE[ch] ?? 0;
  }
  return out;
})();

export const TYPE_END = TYPE_START + CHAR_TIME[CHAR_TIME.length - 1];

export const ClosingLine: React.FC<{ opacity?: number }> = ({
  opacity = 1,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  const elapsed = t - TYPE_START;
  let shown = 0;
  while (shown < CHAR_TIME.length && elapsed >= CHAR_TIME[shown]) shown++;

  // Caret: solid while typing (a typewriter doesn't blink mid-word), blinking
  // once the line is finished, then faded out so the last frame is a clean
  // poster rather than a half-lit cursor.
  const typing = t < TYPE_END;
  const blink = typing ? 1 : ((t - TYPE_END) % 0.9 < 0.5 ? 1 : 0);
  const caretAlpha =
    blink * (1 - clamp01((t - CARET_OUT.start) / CARET_OUT.dur));

  // Each segment renders only the slice of itself that has been reached.
  let cursor = 0;

  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        top: 668,
        textAlign: "center",
        fontFamily: FONT,
        fontSize: 62,
        letterSpacing: "0.005em",
        lineHeight: 1.15,
        whiteSpace: "pre",
        opacity,
        pointerEvents: "none",
      }}
    >
      {/* The finished line, laid out invisibly, fixes the block's width and
          therefore where it sits on screen. The revealed text is drawn over it
          left-aligned, so characters append in place instead of the whole line
          creeping leftwards as a centred one would. */}
      <span style={{ position: "relative", display: "inline-block" }}>
        <span style={{ visibility: "hidden" }}>
          {SEGMENTS.map((seg) => (
            <span key={seg.text} style={{ fontWeight: seg.weight }}>
              {seg.text}
            </span>
          ))}
        </span>
        <span style={{ position: "absolute", left: 0, top: 0, whiteSpace: "pre" }}>
          {SEGMENTS.map((seg) => {
            const start = cursor;
            cursor += seg.text.length;
            return (
              <span
                key={seg.text}
                style={{ color: seg.color, fontWeight: seg.weight }}
              >
                {seg.text.slice(0, Math.min(seg.text.length, Math.max(0, shown - start)))}
              </span>
            );
          })}
          {caretAlpha > 0.001 && (
            <span
              style={{
                display: "inline-block",
                width: 4,
                height: 54,
                marginLeft: 6,
                transform: "translateY(8px)",
                background: "#0d5c4c",
                opacity: caretAlpha,
                borderRadius: 2,
              }}
            />
          )}
        </span>
      </span>
    </div>
  );
};

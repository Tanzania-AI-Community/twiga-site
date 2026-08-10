import React from "react";
import { COLOR } from "./tokens";

/**
 * The contents of a voice-note bubble: play triangle, waveform, duration.
 *
 * The bubble itself — background, radii, tail — comes from the engine like any
 * other message, so a voice note the teacher sends is green and one Twiga sends
 * would be white, without this component knowing anything about it.
 *
 * It earns its place because Twiga cannot hear. Several pages in the track turn
 * on a teacher speaking and being told "I only understand textual messages", and
 * that beat only lands if the thing being refused looks unmistakably like a
 * voice note. `DocCard` cannot express it: a voice note has no title, subtitle
 * or body to skeletonise, and a card headed "VOICE NOTE" would read as *Twiga
 * sent an attachment* when the point is *the teacher spoke and was not heard*.
 */

/**
 * Waveform bar heights in px. Hard-coded rather than generated: `Math.random()`
 * is banned so every frame stays byte-identical, and the shape is the point —
 * it should rise and fall like speech rather than read as a barcode.
 */
const BARS = [
  8, 13, 19, 26, 21, 14, 9, 12, 18, 25, 30, 24, 17, 11, 8, 10, 16, 23, 28, 22,
  15, 10, 7, 11, 17, 22, 27, 20, 14, 9, 7, 10,
];

export const VoiceNote: React.FC<{ duration: string }> = ({ duration }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
    <div
      style={{
        width: 0,
        height: 0,
        marginLeft: 2,
        borderStyle: "solid",
        borderWidth: "13px 0 13px 21px",
        borderColor: `transparent transparent transparent ${COLOR.bubbleText}`,
        opacity: 0.72,
      }}
    />
    <div style={{ display: "flex", alignItems: "center", gap: 5, height: 34 }}>
      {BARS.map((height, i) => (
        <div
          key={i}
          style={{
            width: 4,
            height,
            borderRadius: 2,
            background: COLOR.typingDot,
            opacity: 0.55,
          }}
        />
      ))}
    </div>
    <div
      style={{
        fontSize: 20,
        color: COLOR.timestamp,
        letterSpacing: "0.2px",
        whiteSpace: "nowrap",
      }}
    >
      {duration}
    </div>
  </div>
);

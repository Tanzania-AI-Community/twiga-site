import React, { type CSSProperties } from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";

import { COLOR } from "../shared/tokens";
import { clamp01, easeInOut, lerp } from "../shared/visuals";
import { ClosingLine } from "./ClosingLine";
import { WIDTH, HEIGHT } from "./data";
import { LogoIntroLandscape } from "./LogoIntroLandscape";
import { Stage } from "./Stage";
import { D, FADE_IN, HANDOFF, LIFT, TYPE_START } from "./timeline";

const FONT = "'Helvetica Neue',Helvetica,Arial,sans-serif";

/** How long the poster dissolves for when this runs ahead of a chat scene. */
export const HANDOVER = 0.5;

/**
 * The cinematic opener, 16:9.
 *
 * Twiga's logo reveals and grows into a hero app icon, shrinks into the corner
 * of the WhatsApp icon as an unread badge, then melts into it: the app swells,
 * blooms and takes the message. The icon lifts, and "for teachers, for you."
 * types itself out underneath.
 *
 * Flat throughout, no perspective tilt. The only camera move is a slow sway,
 * and it comes to rest as the hand-off lands so the closing frame is still.
 *
 * Ported from `videoing/projects/base-chat/chat-video/src/promo/landscape/`.
 * The choreography and its timings are unchanged; only the imports moved and
 * `fadeOut` was added.
 */
export const PromoIntro: React.FC<{
  /**
   * Dissolve the last half second to the chat scene's own backdrop. Standing
   * alone the promo ends ON the finished line, which is the right ending for a
   * poster. Running ahead of a conversation it has to hand over, and both sides
   * fade through the same colour so the seam reads as one dissolve rather than
   * as a cut.
   */
  fadeOut?: boolean;
}> = ({ fadeOut = false }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  const pe = easeInOut(clamp01(t / D));

  // Whole-scene drift: a gentle sway, no tilt. It settles to nothing over the
  // hand-off, so the last beat (the icon standing alone) is dead still.
  const still = easeInOut(clamp01((t - HANDOFF.start) / (HANDOFF.dur + 0.3)));
  const panX = Math.sin(t * 0.4) * 5 * (1 - still);
  const panY = (lerp(6, -8, pe) + Math.sin(t * 0.5) * 3) * (1 - still);

  const driftStyle: CSSProperties = {
    transform: `translate(${panX.toFixed(2)}px, ${panY.toFixed(2)}px)`,
    transformOrigin: "50% 50%",
  };

  // The badge leaves the icon's corner and melts into it.
  const morph = clamp01((t - HANDOFF.start) / HANDOFF.dur);
  // The icon rises, opening the space the line types into.
  const lift = clamp01((t - LIFT.start) / LIFT.dur);
  // The line fades up just before the first character lands, so the caret does
  // not blink into existence out of nowhere.
  const lineOpacity = clamp01((t - (TYPE_START - 0.35)) / 0.35);

  const fadeIn = 1 - clamp01(t / FADE_IN);
  const handover = fadeOut ? clamp01((t - (D - HANDOVER)) / HANDOVER) : 0;
  const overlay = Math.max(fadeIn, handover);

  return (
    <AbsoluteFill
      style={{ background: COLOR.canvas, overflow: "hidden", fontFamily: FONT }}
    >
      <Stage driftX={panX} driftY={panY} />

      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={driftStyle}>
          <div style={{ position: "relative", width: WIDTH, height: HEIGHT }}>
            <LogoIntroLandscape opacity={1} morph={morph} lift={lift} />
            {lineOpacity > 0.001 ? <ClosingLine opacity={lineOpacity} /> : null}
          </div>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background: COLOR.backdropFlat,
          opacity: Number(overlay.toFixed(3)),
        }}
      />
    </AbsoluteFill>
  );
};

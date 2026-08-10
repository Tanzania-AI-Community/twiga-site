"use client";

import React, {
  useLayoutEffect,
  useRef,
  useState,
  type ComponentType,
  type CSSProperties,
  type ReactNode,
} from "react";
import {
  AbsoluteFill,
  continueRender,
  delayRender,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { DocCard } from "./DocCard";
import { layoutProgress, track } from "./motion";
import { formatText } from "./richText";
import { VoiceNote } from "./VoiceNote";
import type { ChatScript, Message } from "./schedule";
import {
  CANVAS,
  COLOR,
  COLUMN,
  CONTENT_WIDTH,
  FONT_FAMILY,
  TYPING,
} from "./tokens";
import {
  bubbleVisual,
  clamp01,
  easeInOut,
  imgVisual,
  lerp,
  systemVisual,
  tsVisual,
} from "./visuals";

/** Bubble entrance, in seconds. */
const ENTER_DUR = 0.5;
/** How many messages stay on screen. Message i leaves as message i+2 lands. */
const VISIBLE = 2;
const ROW_GAP = 30;
/** Where the visible block is centred on the 1080-tall plane. */
const CENTER_Y = 540;
/** Above this the column dollies out rather than overflowing. */
const MAX_VISIBLE_HEIGHT = 900;

/**
 * The guide-video engine: a WhatsApp conversation filmed with a slow drifting
 * camera. Every video on the site is this component with different content.
 *
 * It owns the look and the motion. A video owns its script, its chapter copy
 * and any custom prop. If you find yourself wanting to change something in
 * here for one video, change it for all of them or do not change it — a track
 * of guide videos that each move slightly differently reads as sloppy, not
 * as variety.
 */
export const ChatScene: React.FC<{ script: ChatScript }> = ({ script }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  const { messages, schedule, duration } = script;

  // --- measure natural bubble heights once ---------------------------------
  // Heights cannot be derived from the text, so a hidden layer renders every
  // bubble at natural height and we measure it before the first paint.
  const measureRef = useRef<HTMLDivElement>(null);
  const typingRef = useRef<HTMLDivElement>(null);
  const [heights, setHeights] = useState<number[] | null>(null);
  const [typingHeight, setTypingHeight] = useState(70);

  // Refs, not lazy state: compositions run inside the site's React tree, and
  // Strict Mode invokes state initialisers twice — which would strand a handle
  // and leave the player buffering forever.
  //
  // `doneRef` is the other half of that guard, and it is the one the original
  // video was missing. Clearing the handle inside the effect is not enough:
  // `setHeights` schedules a re-render, whose render body then sees a null
  // handle and arms a SECOND delayRender — which the effect, having empty deps,
  // will never run again to clear. Headless renders died on a 28s timeout and
  // the player buffered forever. The latch makes arming a once-only event.
  const handleRef = useRef<number | null>(null);
  const doneRef = useRef(false);
  if (!doneRef.current && handleRef.current === null) {
    handleRef.current = delayRender("measuring chat bubbles");
  }

  useLayoutEffect(() => {
    if (measureRef.current) {
      setHeights(
        Array.from(measureRef.current.children).map(
          (child) => (child as HTMLElement).offsetHeight || 80,
        ),
      );
    }
    if (typingRef.current?.firstElementChild) {
      setTypingHeight(
        (typingRef.current.firstElementChild as HTMLElement).offsetHeight,
      );
    }
    doneRef.current = true;
    if (handleRef.current !== null) {
      continueRender(handleRef.current);
      handleRef.current = null;
    }
  }, []);

  // --- per-message progress -------------------------------------------------
  // Two separate notions of progress, and keeping them apart matters:
  //   `enterL` / `exitL` drive LAYOUT (row heights, depth, scroll) and must be
  //   monotonic, or the column jitters.
  //   `track()` drives APPEARANCE and runs alpha on its own shorter curve.
  const meta = messages.map((message, i) => {
    const { typingStart, bubbleStart } = schedule[i];
    const accent = message.side === "right";

    const tAppear = clamp01((t - typingStart) / 0.22);
    const tCollapse = clamp01((t - bubbleStart) / 0.3);
    const typingReveal = tAppear * (1 - tCollapse);

    // A message leaves when the one two behind it lands.
    const exitAt =
      i + VISIBLE < messages.length ? schedule[i + VISIBLE].bubbleStart : null;

    const enterL = layoutProgress(t, bubbleStart, ENTER_DUR);
    const exitL = exitAt === null ? 0 : layoutProgress(t, exitAt, ENTER_DUR);

    return { message, accent, tAppear, typingReveal, enterL, exitL, exitAt };
  });

  const rows: ReactNode[] = [];
  let columnHeight = 0;

  for (let i = 0; i < meta.length; i++) {
    const { message, accent, tAppear, enterL, exitL, exitAt } = meta[i];
    const align = rowAlign(message);
    const visible = 1 - exitL;
    // Nobody types WhatsApp's own chrome, so a date divider or a "can't be
    // displayed here" placeholder arrives without the dots. Its `typingDur`
    // still buys a beat of silence before it lands, which is the right feel.
    const typingReveal = message.kind === "system" ? 0 : meta[i].typingReveal;

    // Older messages sit further back: depth is the sum of every later
    // message's entrance, so the stack recedes as the thread advances.
    let depthRank = 0;
    for (let j = i + 1; j < meta.length; j++) depthRank += meta[j].enterL;
    const restZ = -depthRank * 30;
    const entryZ = (1 - enterL) * 52;

    const typingRowHeight = (typingHeight + ROW_GAP) * typingReveal;
    const natural = heights ? heights[i] : 90;
    const rowHeight = (natural + ROW_GAP) * enterL * visible;
    // Both rows are in the same flow, so both have to be counted. Counting only
    // the bubble left the block centred half a typing row too low, and a video
    // whose tallest reply ran past ~880px pushed the next message's dots clean
    // off the bottom of the plane.
    columnHeight += rowHeight + typingRowHeight;

    rows.push(
      <div
        key={`typing-${i}`}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: align,
          width: "100%",
          overflow: "hidden",
          height: `${typingRowHeight.toFixed(2)}px`,
          transformStyle: "preserve-3d",
          transform: `translateZ(${restZ.toFixed(1)}px)`,
        }}
      >
        <div
          style={{
            // Tinted to the sender. Real WhatsApp never shows your own typing
            // indicator, but this track does — it is how a teacher's hesitation
            // is staged — and a white pill on the green side read as Twiga
            // typing in the wrong column.
            ...bubbleVisual(accent),
            padding: TYPING.padding,
            whiteSpace: "normal",
            lineHeight: 0,
            opacity: typingReveal,
            transform: `translateY(${((1 - tAppear) * 14).toFixed(
              2,
            )}px) scale(${(0.86 + 0.14 * tAppear).toFixed(3)})`,
            transformOrigin: accent ? "bottom right" : "bottom left",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: TYPING.dotGap,
              alignItems: "center",
              padding: "2px 2px",
            }}
          >
            <TypingDot t={t} k={0} />
            <TypingDot t={t} k={1} />
            <TypingDot t={t} k={2} />
          </div>
        </div>
      </div>,
    );

    const motion = track(t, {
      in: { at: schedule[i].bubbleStart, dur: ENTER_DUR, from: { y: 26, scale: 0.9 } },
      out:
        exitAt === null
          ? undefined
          : { at: exitAt, dur: ENTER_DUR, to: { y: -52, scale: 0.9, blur: 3 } },
    });

    rows.push(
      <div
        key={`message-${i}`}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: align,
          width: "100%",
          overflow: "hidden",
          height: heights ? `${rowHeight.toFixed(2)}px` : "auto",
          transformStyle: "preserve-3d",
          transform: `translateZ(${(restZ + entryZ).toFixed(1)}px)`,
        }}
      >
        <div
          style={{
            ...bubbleStyle(message, accent),
            ...motion,
            transformOrigin:
              message.side === "center"
                ? "bottom center"
                : accent
                  ? "bottom right"
                  : "bottom left",
          }}
        >
          {bubbleContent(message)}
        </div>
        {message.time ? (
          <div
            style={{
              ...tsVisual(accent),
              opacity: motion.opacity,
              filter: motion.filter,
            }}
          >
            {message.time}
          </div>
        ) : null}
      </div>,
    );
  }

  // Centre the visible block, and dolly out rather than overflow if it grows.
  const columnScale = Math.max(
    0.55,
    Math.min(1, MAX_VISIBLE_HEIGHT / Math.max(columnHeight, 1)),
  );
  const scrollY = columnHeight / 2 - CENTER_Y;

  // --- camera ---------------------------------------------------------------
  // One easing curve over the whole duration drives every channel. The sine
  // terms are the handheld feel; they read off `t` only, so every frame is
  // reproducible.
  const pe = easeInOut(clamp01(t / duration));
  const zoom = 1.0 + 0.12 * pe;
  const rotY = lerp(11, 3.5, pe) + Math.sin(t * 0.5) * 0.6;
  const rotX = lerp(6.5, 2.4, pe);
  const panX = lerp(-22, 16, pe) + Math.sin(t * 0.4) * 5;
  const panY = lerp(10, -16, pe);

  // Loop fade: the video has no visible cut when it repeats.
  const overlay =
    1 - Math.min(clamp01(t / 0.5), clamp01((duration - t) / 0.7));

  return (
    <AbsoluteFill
      style={{
        background: COLOR.canvas,
        overflow: "hidden",
        fontFamily: FONT_FAMILY,
      }}
    >
      <Background panX={panX} panY={panY} />

      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            perspective: "1600px",
            perspectiveOrigin: "50% 48%",
            transform: `translate(${panX.toFixed(2)}px, ${panY.toFixed(
              2,
            )}px) scale(${zoom.toFixed(4)})`,
            transformOrigin: "50% 48%",
          }}
        >
          <div
            style={{
              position: "relative",
              width: COLUMN.width,
              height: CANVAS.height,
              transformStyle: "preserve-3d",
              transform: `rotateY(${rotY.toFixed(2)}deg) rotateX(${rotX.toFixed(
                2,
              )}deg)`,
            }}
          >
            <div
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                width: "100%",
                display: "flex",
                flexDirection: "column",
                padding: `0 ${COLUMN.padding}px`,
                transform: `translateY(${(-scrollY).toFixed(
                  2,
                )}px) scale(${columnScale.toFixed(4)})`,
                transformOrigin: "50% 50%",
                transformStyle: "preserve-3d",
                willChange: "transform",
              }}
            >
              {rows}
            </div>
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

      {/* Hidden measuring layer. Its width is CONTENT_WIDTH — exactly the
          rendered column's inner width — so a bubble wraps identically here and
          on screen. Measuring at a different width is how long copy gets
          silently cropped by the row's overflow. */}
      <div
        ref={measureRef}
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: CONTENT_WIDTH,
          visibility: "hidden",
          pointerEvents: "none",
          zIndex: -1,
        }}
      >
        {messages.map((message, i) => {
          const accent = message.side === "right";
          return (
            <div
              key={`measure-${i}`}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: rowAlign(message),
                width: "100%",
              }}
            >
              <div style={bubbleStyle(message, accent)}>
                {bubbleContent(message)}
              </div>
              {/* Mirrors the render exactly, including dropping the row when
                  `time` is empty — measuring a timestamp that never renders
                  would leave a gap under every divider. */}
              {message.time ? (
                <div style={tsVisual(accent)}>{message.time}</div>
              ) : null}
            </div>
          );
        })}
      </div>

      <div
        ref={typingRef}
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          visibility: "hidden",
          pointerEvents: "none",
          zIndex: -1,
        }}
      >
        <div
          style={{
            display: "inline-block",
            padding: TYPING.padding,
            borderRadius: 32,
            background: "#ececf1",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: TYPING.dotGap,
              alignItems: "center",
            }}
          >
            <Dot />
            <Dot />
            <Dot />
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

/**
 * Bind a script to the engine. A video's `video.ts` calls this for its
 * `component`, so a video is data and a manifest — no per-video scene file.
 */
export const makeChatScene = (
  script: ChatScript,
): ComponentType<Record<string, unknown>> => {
  const Scene: React.FC = () => <ChatScene script={script} />;
  Scene.displayName = "ChatScene";
  return Scene as ComponentType<Record<string, unknown>>;
};

/**
 * Which column the row sits in. WhatsApp's chrome sits between the two, which
 * is what makes a date divider read as the client speaking rather than as
 * either party.
 */
function rowAlign(message: Message) {
  if (message.side === "center") return "center";
  return message.side === "right" ? "flex-end" : "flex-start";
}

/** The bubble's own box: a text bubble, or the white frame around a card. */
function bubbleStyle(message: Message, accent: boolean): CSSProperties {
  switch (message.kind) {
    case "text":
      return bubbleVisual(accent, {
        fontSize: message.fontSize,
        maxWidth: message.maxWidth,
        lineHeight: message.lineHeight,
      });
    case "system":
      return systemVisual(message.side === "center");
    case "voice":
      // A normal bubble, sized to its contents rather than to wrapped text.
      return { ...bubbleVisual(accent), padding: "20px 26px", maxWidth: "none" };
    default:
      return imgVisual(accent);
  }
}

function bubbleContent(message: Message): ReactNode {
  switch (message.kind) {
    case "text":
    case "system":
      return formatText(message.text);
    case "card":
      return <DocCard spec={message.card} />;
    case "voice":
      return <VoiceNote duration={message.duration} />;
    default:
      return message.node;
  }
}

const Background: React.FC<{ panX: number; panY: number }> = ({
  panX,
  panY,
}) => (
  <div
    style={{
      position: "absolute",
      inset: "-6%",
      transform: `translate(${(-panX * 0.3).toFixed(2)}px, ${(
        -panY * 0.3
      ).toFixed(2)}px) scale(1.14)`,
    }}
  >
    <div
      style={{ position: "absolute", inset: 0, background: COLOR.backdrop }}
    />
    <div
      style={{
        position: "absolute",
        top: "-14%",
        left: "-6%",
        width: "55%",
        height: "62%",
        borderRadius: "50%",
        background: `radial-gradient(circle at 40% 40%,${COLOR.bloomTopLeft},rgba(37,211,102,0) 70%)`,
        filter: "blur(12px)",
      }}
    />
    <div
      style={{
        position: "absolute",
        bottom: "-18%",
        right: "-8%",
        width: "60%",
        height: "66%",
        borderRadius: "50%",
        background: `radial-gradient(circle at 60% 60%,${COLOR.bloomBottomRight},rgba(0,128,105,0) 70%)`,
        filter: "blur(12px)",
      }}
    />
  </div>
);

const Dot: React.FC = () => (
  <span
    style={{
      width: TYPING.dotSize,
      height: TYPING.dotSize,
      borderRadius: "50%",
      background: COLOR.typingDot,
      display: "inline-block",
    }}
  />
);

const TypingDot: React.FC<{ t: number; k: number }> = ({ t, k }) => (
  <span
    style={{
      width: TYPING.dotSize,
      height: TYPING.dotSize,
      borderRadius: "50%",
      background: COLOR.typingDot,
      display: "inline-block",
      transform: `translateY(${(
        -10 * Math.max(0, Math.sin(t * 6.5 - k * 0.9))
      ).toFixed(2)}px)`,
    }}
  />
);

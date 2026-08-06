"use client";

import React, {
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import {
  AbsoluteFill,
  continueRender,
  delayRender,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { DURATION, ENTER_DUR, MESSAGES, SCHEDULE } from "./data";
import {
  bubbleVisual,
  clamp01,
  easeInOut,
  easeOutCubic,
  imgVisual,
  lerp,
  tsVisual,
} from "./visuals";
import { LessonCard } from "./LessonCard";

const FONT_FAMILY = "'Helvetica Neue',Helvetica,Arial,sans-serif";

// --- background parallax layer ---
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
      style={{
        position: "absolute",
        inset: 0,
        background:
          "linear-gradient(155deg,#efeae2 0%,#e7e0d6 52%,#ded5c8 100%)",
      }}
    />
    <div
      style={{
        position: "absolute",
        top: "-14%",
        left: "-6%",
        width: "55%",
        height: "62%",
        borderRadius: "50%",
        background:
          "radial-gradient(circle at 40% 40%,rgba(37,211,102,0.18),rgba(37,211,102,0) 70%)",
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
        background:
          "radial-gradient(circle at 60% 60%,rgba(0,128,105,0.16),rgba(0,128,105,0) 70%)",
        filter: "blur(12px)",
      }}
    />
  </div>
);

export const ChatScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps; // seconds, 0..DURATION

  // --- measure natural bubble heights once (deterministic across frames) ---
  const measureRef = useRef<HTMLDivElement>(null);
  const typingRef = useRef<HTMLDivElement>(null);
  const [heights, setHeights] = useState<number[] | null>(null);
  const [typingHeight, setTypingHeight] = useState(70);

  // A ref rather than lazy state: React Strict Mode invokes state
  // initialisers twice, which would strand a delayRender handle and leave the
  // player buffering forever.
  const handleRef = useRef<number | null>(null);
  if (handleRef.current === null) {
    handleRef.current = delayRender("measuring chat bubbles");
  }

  useLayoutEffect(() => {
    if (measureRef.current) {
      const h = Array.from(measureRef.current.children).map(
        (c) => (c as HTMLElement).offsetHeight || 80,
      );
      setHeights(h);
    }
    if (typingRef.current?.firstElementChild) {
      setTypingHeight(
        (typingRef.current.firstElementChild as HTMLElement).offsetHeight,
      );
    }
    if (handleRef.current !== null) {
      continueRender(handleRef.current);
      handleRef.current = null;
    }
  }, []);

  const D = DURATION;
  const msgs = MESSAGES;
  const rowGap = 30;
  const centerY = 540;
  const VISIBLE = 2; // sliding window

  // reveal per message, against the shared schedule in data.ts
  const meta = msgs.map((m, i) => {
    const { typingStart, bubbleStart } = SCHEDULE[i];
    const accent = m.side === "right";
    const tAppear = clamp01((t - typingStart) / 0.22);
    const tCollapse = clamp01((t - bubbleStart) / 0.3);
    const typingReveal = tAppear * (1 - tCollapse);
    const enter = clamp01((t - bubbleStart) / ENTER_DUR);
    const enterE = easeOutCubic(enter);
    return { m, accent, tAppear, typingReveal, enter, enterE };
  });

  const rows: React.ReactNode[] = [];
  let msgTotalH = 0;
  for (let i = 0; i < meta.length; i++) {
    const { m, accent, tAppear, typingReveal, enter, enterE } = meta[i];
    const align = accent ? "flex-end" : "flex-start";

    const exitE = i + VISIBLE < meta.length ? meta[i + VISIBLE].enterE : 0;
    const vis = 1 - exitE;

    let depthRank = 0;
    for (let j = i + 1; j < meta.length; j++) depthRank += meta[j].enterE;
    const restZ = -depthRank * 30;
    const entryZ = (1 - enterE) * 52;

    const tH = (typingHeight + rowGap) * typingReveal;
    const nat = heights ? heights[i] : 90;
    const mH = (nat + rowGap) * enterE * vis;
    msgTotalH += mH;

    // typing-indicator row
    rows.push(
      <div
        key={"t" + i}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: align,
          width: "100%",
          overflow: "hidden",
          height: `${tH.toFixed(2)}px`,
          transformStyle: "preserve-3d",
          transform: `translateZ(${restZ.toFixed(1)}px)`,
        }}
      >
        <div
          style={{
            ...bubbleVisual(false),
            padding: "20px 26px",
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
              gap: 10,
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

    // message row (text or image)
    const exitTY = -exitE * 52;
    const exitScale = 1 - 0.1 * exitE;
    const blur = exitE > 0.001 ? `blur(${(exitE * 3).toFixed(2)}px)` : "none";
    const animTransform = `translateY(${((1 - enterE) * 26 + exitTY).toFixed(
      2,
    )}px) scale(${((0.9 + 0.1 * enterE) * exitScale).toFixed(3)})`;
    const tsStyle: CSSProperties = {
      ...tsVisual(accent),
      opacity: Number((enter * vis).toFixed(3)),
      filter: blur,
    };
    const wrapStyle: CSSProperties = {
      display: "flex",
      flexDirection: "column",
      alignItems: align,
      width: "100%",
      overflow: "hidden",
      height: heights ? `${mH.toFixed(2)}px` : "auto",
      transformStyle: "preserve-3d",
      transform: `translateZ(${(restZ + entryZ).toFixed(1)}px)`,
    };
    const transformOrigin = accent ? "bottom right" : "bottom left";

    if (m.kind === "image") {
      rows.push(
        <div key={"m" + i} style={wrapStyle}>
          <div
            style={{
              ...imgVisual(),
              opacity: enter * vis,
              transform: animTransform,
              transformOrigin,
              filter: blur,
            }}
          >
            <LessonCard />
          </div>
          <div style={tsStyle}>{m.time}</div>
        </div>,
      );
    } else {
      rows.push(
        <div key={"m" + i} style={wrapStyle}>
          <div
            style={{
              ...bubbleVisual(accent, {
                fontSize: m.fontSize,
                maxWidth: m.maxWidth,
                lineHeight: m.lineHeight,
              }),
              opacity: enter * vis,
              transform: animTransform,
              transformOrigin,
              filter: blur,
            }}
          >
            {m.text}
          </div>
          <div style={tsStyle}>{m.time}</div>
        </div>,
      );
    }
  }

  // center the visible block + dolly out if too tall to fit
  const maxVisH = 900;
  const cs = Math.max(0.55, Math.min(1, maxVisH / Math.max(msgTotalH, 1)));
  const scrollY = msgTotalH / 2 - centerY;
  const columnStyle: CSSProperties = {
    position: "absolute",
    left: 0,
    top: 0,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    padding: "0 70px",
    transform: `translateY(${(-scrollY).toFixed(2)}px) scale(${cs.toFixed(4)})`,
    transformOrigin: "50% 50%",
    transformStyle: "preserve-3d",
    willChange: "transform",
  };

  // camera
  const P = clamp01(t / D);
  const pe = easeInOut(P);
  const z = 1.0 + 0.12 * pe;
  const rotY = lerp(11, 3.5, pe) + Math.sin(t * 0.5) * 0.6;
  const rotX = lerp(6.5, 2.4, pe);
  const panX = lerp(-22, 16, pe) + Math.sin(t * 0.4) * 5;
  const panY = lerp(10, -16, pe);

  const camStyle: CSSProperties = {
    perspective: "1600px",
    perspectiveOrigin: "50% 48%",
    transform: `translate(${panX.toFixed(2)}px, ${panY.toFixed(
      2,
    )}px) scale(${z.toFixed(4)})`,
    transformOrigin: "50% 48%",
  };
  const planeStyle: CSSProperties = {
    position: "relative",
    width: 900,
    height: 1080,
    transformStyle: "preserve-3d",
    transform: `rotateY(${rotY.toFixed(2)}deg) rotateX(${rotX.toFixed(2)}deg)`,
  };

  // loop fade overlay
  const fadeIn = clamp01(t / 0.5);
  const fadeOut = clamp01((D - t) / 0.7);
  const ov = 1 - Math.min(fadeIn, fadeOut);
  const overlayStyle: CSSProperties = {
    position: "absolute",
    inset: 0,
    pointerEvents: "none",
    background: "linear-gradient(155deg,#efeae2,#ded5c8)",
    opacity: Number(ov.toFixed(3)),
  };

  return (
    <AbsoluteFill
      style={{
        background: "#e5ddd5",
        overflow: "hidden",
        fontFamily: FONT_FAMILY,
      }}
    >
      <Background panX={panX} panY={panY} />

      {/* scene / camera */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={camStyle}>
          <div style={planeStyle}>
            <div style={columnStyle}>{rows}</div>
          </div>
        </div>
      </div>

      {/* loop fade overlay */}
      <div style={overlayStyle} />

      {/* hidden measuring layer */}
      <div
        ref={measureRef}
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: 820,
          visibility: "hidden",
          pointerEvents: "none",
          zIndex: -1,
        }}
      >
        {msgs.map((m, i) => {
          const accent = m.side === "right";
          const align = accent ? "flex-end" : "flex-start";
          return (
            <div
              key={"me" + i}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: align,
                width: "100%",
              }}
            >
              {m.kind === "image" ? (
                <div style={imgVisual()}>
                  <div style={{ width: 330, height: 418 }} />
                </div>
              ) : (
                <div
                  style={bubbleVisual(accent, {
                    fontSize: m.fontSize,
                    maxWidth: m.maxWidth,
                    lineHeight: m.lineHeight,
                  })}
                >
                  {m.text}
                </div>
              )}
              <div style={tsVisual(accent)}>{m.time}</div>
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
            padding: "20px 26px",
            borderRadius: 32,
            background: "#ececf1",
          }}
        >
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <span
              style={{
                width: 19,
                height: 19,
                borderRadius: "50%",
                background: "#73737f",
              }}
            />
            <span
              style={{
                width: 19,
                height: 19,
                borderRadius: "50%",
                background: "#73737f",
              }}
            />
            <span
              style={{
                width: 19,
                height: 19,
                borderRadius: "50%",
                background: "#73737f",
              }}
            />
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const TypingDot: React.FC<{ t: number; k: number }> = ({ t, k }) => {
  const dy = -10 * Math.max(0, Math.sin(t * 6.5 - k * 0.9));
  return (
    <span
      style={{
        width: 19,
        height: 19,
        borderRadius: "50%",
        background: "#73737f",
        display: "inline-block",
        transform: `translateY(${dy.toFixed(2)}px)`,
      }}
    />
  );
};

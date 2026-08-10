import React from "react";
import { clamp01, lerp } from "../shared/visuals";

// WhatsApp app icon, drawn (no external asset) so it renders deterministically:
// green gradient squircle + white phone-in-bubble glyph.
// `size` in px; `scale`/`opacity` for entrance animation.
//
// `morph` (0→1) reshapes the green icon INTO a white received chat bubble:
// the tile shortens, the green wash + glyph fade, a tail sprouts bottom-left,
// and three typing dots fade in. Used for the intro→chat hand-off so the app
// icon feels like it becomes the conversation.
export const WhatsAppIcon: React.FC<{
  size: number;
  scale?: number;
  opacity?: number;
  morph?: number;
}> = ({ size, scale = 1, opacity = 1, morph = 0 }) => {
  const m = clamp01(morph);
  const glyphOut = clamp01(m / 0.55); // glyph gone by ~55%
  const dotsIn = clamp01((m - 0.42) / 0.5); // dots appear after
  // tail sprouts mid-morph, then retracts so the final shape is a clean pill
  // (the chat's typing indicator has no tail).
  const tailIn =
    clamp01((m - 0.5) / 0.28) * (1 - clamp01((m - 0.82) / 0.18));
  const whiteIn = clamp01((m - 0.15) / 0.55); // green → white wash

  const w = size;
  const h = lerp(size, size * 0.58, m); // squircle → shorter bubble
  const rBase = size * 0.225;
  const r = lerp(rBase, size * 0.29, m); // → fully rounded pill
  const rTail = lerp(r, size * 0.05, tailIn); // bottom-left flattens for tail

  const glyphSize = lerp(size * 0.62, size * 0.4, m);
  const tail = size * 0.14;

  return (
    <div
      style={{
        position: "relative",
        width: w,
        height: h,
        opacity,
        transform: `scale(${scale})`,
        transformOrigin: "center",
      }}
    >
      {/* base tile: white bubble underneath, green wash on top that fades out */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "#ffffff",
          borderRadius: r,
          borderBottomLeftRadius: rTail,
          boxShadow: `0 26px 62px -22px rgba(40,44,80,${(
            0.2 +
            0.24 * whiteIn
          ).toFixed(3)})`,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(160deg,#60fc7c 0%,#25d366 45%,#12b855 100%)",
          borderRadius: r,
          borderBottomLeftRadius: rTail,
          boxShadow: "0 30px 70px -24px rgba(18,140,88,0.55)",
          opacity: 1 - whiteIn,
        }}
      />

      {/* tail (received bubble), bottom-left */}
      {tailIn > 0.001 && (
        <div
          style={{
            position: "absolute",
            left: -tail * 0.32,
            bottom: h * 0.14,
            width: tail,
            height: tail,
            background: "#ffffff",
            borderBottomLeftRadius: tail * 0.4,
            transform: "rotate(45deg)",
            opacity: tailIn,
          }}
        />
      )}

      {/* content layer: glyph fades out, dots fade in */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {glyphOut < 1 && (
          <svg
            width={glyphSize}
            height={glyphSize}
            viewBox="0 0 24 24"
            style={{ display: "block", position: "absolute", opacity: 1 - glyphOut }}
          >
            <path
              fill="#ffffff"
              d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.359.101 11.892c0 2.096.549 4.14 1.595 5.945L0 24l6.335-1.652a11.882 11.882 0 005.71 1.454h.006c6.585 0 11.946-5.359 11.949-11.945a11.82 11.82 0 00-3.487-8.463z"
            />
          </svg>
        )}
        {dotsIn > 0.001 && (
          <div
            style={{
              position: "absolute",
              display: "flex",
              gap: size * 0.05,
              alignItems: "center",
              opacity: dotsIn,
              transform: `scale(${(0.7 + 0.3 * dotsIn).toFixed(3)})`,
            }}
          >
            <Dot size={size} />
            <Dot size={size} />
            <Dot size={size} />
          </div>
        )}
      </div>
    </div>
  );
};

const Dot: React.FC<{ size: number }> = ({ size }) => (
  <span
    style={{
      width: size * 0.066,
      height: size * 0.066,
      borderRadius: "50%",
      background: "#8b8b95",
      display: "inline-block",
    }}
  />
);

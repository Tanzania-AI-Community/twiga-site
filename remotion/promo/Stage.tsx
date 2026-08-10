import React from "react";

// Beige plane + two green brand glows, drifting slowly for parallax depth.
// Mirrors chat/ChatScene Background, re-framed for a 9:16 canvas.
export const Stage: React.FC<{ driftX: number; driftY: number }> = ({
  driftX,
  driftY,
}) => (
  <div
    style={{
      position: "absolute",
      inset: "-8%",
      transform: `translate(${(-driftX * 0.3).toFixed(2)}px, ${(
        -driftY * 0.3
      ).toFixed(2)}px) scale(1.16)`,
    }}
  >
    <div
      style={{
        position: "absolute",
        inset: 0,
        background:
          "linear-gradient(160deg,#efeae2 0%,#e7e0d6 52%,#ded5c8 100%)",
      }}
    />
    {/* top-left green glow */}
    <div
      style={{
        position: "absolute",
        top: "-6%",
        left: "-14%",
        width: "70%",
        height: "34%",
        borderRadius: "50%",
        background:
          "radial-gradient(circle at 40% 40%,rgba(37,211,102,0.18),rgba(37,211,102,0) 70%)",
        filter: "blur(14px)",
      }}
    />
    {/* bottom-right teal glow */}
    <div
      style={{
        position: "absolute",
        bottom: "-8%",
        right: "-14%",
        width: "72%",
        height: "36%",
        borderRadius: "50%",
        background:
          "radial-gradient(circle at 60% 60%,rgba(0,128,105,0.16),rgba(0,128,105,0) 70%)",
        filter: "blur(14px)",
      }}
    />
  </div>
);

/**
 * The shared guide-video system. A video imports from here and nowhere else in
 * `shared/`, so the surface stays small enough to keep 25+ videos consistent.
 */
export { ChatScene, makeChatScene } from "./ChatScene";
export { DocCard } from "./DocCard";
export { VoiceNote } from "./VoiceNote";
export { CURVE, layoutProgress, track, type Pose, type Track } from "./motion";
export { formatText } from "./richText";
export {
  buildSchedule,
  buildScript,
  chaptersFrom,
  durationInFrames,
  posterFrame,
  scheduleEnd,
  DEFAULT_INTRO,
  DEFAULT_TAIL,
  FPS,
  type Beat,
  type CardMessage,
  type ChatScript,
  type DocCardRow,
  type DocCardSpec,
  type Message,
  type MessageChapter,
  type NodeMessage,
  type SystemMessage,
  type VoiceMessage,
  type TextMessage,
} from "./schedule";
export {
  BUBBLE,
  CANVAS,
  COLOR,
  COLUMN,
  CONTENT_WIDTH,
  FONT_FAMILY,
  LONG_MESSAGE,
  TYPING,
} from "./tokens";
export {
  bubbleVisual,
  clamp01,
  easeInOut,
  easeOutCubic,
  imgVisual,
  lerp,
  systemVisual,
  tsVisual,
  type BubbleOpts,
} from "./visuals";

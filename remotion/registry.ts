import type { GuideVideo } from "./types";
import { whatsappLessonPlanVideo } from "./videos/whatsapp-lesson-plan/video";

/**
 * Every guide video. Adding one means dropping a folder under `videos/` and
 * appending it here — nothing under `app/` or `components/` needs to change.
 */
export const guideVideos: GuideVideo[] = [whatsappLessonPlanVideo];

/**
 * A route entry matches either exactly, or — with a `/**` suffix — that page
 * and everything beneath it.
 */
function matchesRoute(entry: string, path: string): boolean {
  if (!entry.endsWith("/**")) return entry === path;
  const base = entry.slice(0, -3);
  return path === base || path.startsWith(`${base}/`);
}

/** The video that plays on a guide route, if any. */
export function findGuideVideo(pathname: string): GuideVideo | undefined {
  const path =
    pathname.length > 1 && pathname.endsWith("/")
      ? pathname.slice(0, -1)
      : pathname;
  return guideVideos.find((video) =>
    video.routes.some((entry) => matchesRoute(entry, path)),
  );
}

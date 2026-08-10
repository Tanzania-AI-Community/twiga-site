import type { GuideVideo } from "./types";
import { twigaLessonPlanAnatomyVideo } from "./videos/twiga-lesson-plan-anatomy/video";
import { twigaRequestingLessonPlanVideo } from "./videos/twiga-requesting-lesson-plan/video";
import { twigaIntroductionVideo } from "./videos/twiga-introduction/video";
import { twigaRegistrationVideo } from "./videos/twiga-registration/video";
import { twigaChoosingSubjectsVideo } from "./videos/twiga-choosing-subjects/video";
import { twigaQuickStartVideo } from "./videos/twiga-quick-start/video";
import { twigaHowToAskVideo } from "./videos/twiga-how-to-ask/video";
import { twigaCheckingAnswersVideo } from "./videos/twiga-checking-answers/video";
import { twigaFaqVideo } from "./videos/twiga-faq/video";
import { twigaActivitiesAndGamesVideo } from "./videos/twiga-activities-and-games/video";
import { twigaCommonMistakesVideo } from "./videos/twiga-common-mistakes/video";
import { twigaDifficultQuestionsVideo } from "./videos/twiga-difficult-questions/video";
import { twigaHowNotWhatVideo } from "./videos/twiga-how-not-what/video";
import { twigaLanguageVideo } from "./videos/twiga-language/video";
import { twigaLimitsVideo } from "./videos/twiga-limits/video";
import { twigaNoReplyVideo } from "./videos/twiga-no-reply/video";
import { twigaFixingProfileVideo } from "./videos/twiga-fixing-profile/video";
import { twigaMarkingSchemesVideo } from "./videos/twiga-marking-schemes/video";
import { twigaMockExamsVideo } from "./videos/twiga-mock-exams/video";
import { twigaQuizzesAndExercisesVideo } from "./videos/twiga-quizzes-and-exercises/video";
import { twigaNoMaterialsVideo } from "./videos/twiga-no-materials/video";
import { twigaPrintablesVideo } from "./videos/twiga-printables/video";
import { twigaYourOwnNotesVideo } from "./videos/twiga-your-own-notes/video";
import { twigaTopicExplanationsVideo } from "./videos/twiga-topic-explanations/video";
import { twigaWhatToTeachVideo } from "./videos/twiga-what-to-teach/video";
import { whatsappLessonPlanVideo } from "./videos/whatsapp-lesson-plan/video";

/**
 * Every guide video. Adding one means dropping a folder under `videos/` and
 * appending it here — nothing under `app/` or `components/` needs to change.
 */
export const guideVideos: GuideVideo[] = [
  twigaLessonPlanAnatomyVideo,
  twigaRequestingLessonPlanVideo,
  twigaIntroductionVideo,
  twigaRegistrationVideo,
  twigaChoosingSubjectsVideo,
  twigaQuickStartVideo,
  twigaHowToAskVideo,
  twigaCheckingAnswersVideo,
  twigaFaqVideo,
  twigaActivitiesAndGamesVideo,
  twigaCommonMistakesVideo,
  twigaDifficultQuestionsVideo,
  twigaHowNotWhatVideo,
  twigaLanguageVideo,
  twigaLimitsVideo,
  twigaNoReplyVideo,
  twigaFixingProfileVideo,
  twigaMarkingSchemesVideo,
  twigaMockExamsVideo,
  twigaQuizzesAndExercisesVideo,
  twigaNoMaterialsVideo,
  twigaPrintablesVideo,
  twigaYourOwnNotesVideo,
  twigaTopicExplanationsVideo,
  twigaWhatToTeachVideo,
  whatsappLessonPlanVideo,
];

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

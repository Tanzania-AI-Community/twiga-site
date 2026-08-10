import type { ComponentType } from "react";

import AddingATool from "./developers/adding-a-tool";
import Architecture from "./developers/architecture";
import ConductAndSecurity from "./developers/conduct-and-security";
import Database from "./developers/database";
import DataModel from "./developers/data-model";
import Deployment from "./developers/deployment";
import Environment from "./developers/environment";
import HowToContribute from "./developers/how-to-contribute";
import LocalSetup from "./developers/local-setup";
import MockWhatsApp from "./developers/mock-whatsapp";
import Monitoring from "./developers/monitoring";
import Testing from "./developers/testing";
import Whatsapp from "./developers/whatsapp";

import ActivitiesAndGames from "./teachers/activities-and-games";
import CommonMistakes from "./teachers/common-mistakes";
import DifficultQuestions from "./teachers/difficult-questions";
import HowNotWhat from "./teachers/how-not-what";
import Language from "./teachers/language";
import LessonPlanAnatomy from "./teachers/anatomy";
import Limits from "./teachers/limits";
import MarkingSchemes from "./teachers/marking-schemes";
import MockExams from "./teachers/mock-exams";
import NoMaterials from "./teachers/no-materials";
import NoReply from "./teachers/no-reply";
import Printables from "./teachers/printables";
import Profile from "./teachers/profile";
import QuizzesAndExercises from "./teachers/quizzes-and-exercises";
import RequestingLessonPlan from "./teachers/requesting";
import TeacherCheckingAnswers from "./teachers/checking-answers";
import TeacherFaq from "./teachers/faq";
import TeacherHowToAsk from "./teachers/how-to-ask";
import TeacherQuickStart from "./teachers/quick-start";
import TeacherRegistration from "./teachers/registration";
import TeacherSubjects from "./teachers/subjects";
import TopicExplanations from "./teachers/topic-explanations";
import WhatToTeach from "./teachers/what-to-teach";
import YourOwnNotes from "./teachers/your-own-notes";

/**
 * Written pages, keyed by route. The catch-all renders one of these when the
 * path matches and falls back to the placeholder otherwise, so a page can be
 * added to the sidebar before its prose exists.
 *
 * Track index pages are not here. They have their own static routes.
 */
export const guidePageContent: Record<string, ComponentType> = {
  "/guide/developers/getting-started/local-setup": LocalSetup,
  "/guide/developers/getting-started/mock-whatsapp": MockWhatsApp,
  "/guide/developers/getting-started/whatsapp": Whatsapp,
  "/guide/developers/architecture/overview": Architecture,
  "/guide/developers/architecture/data-model": DataModel,
  "/guide/developers/architecture/adding-a-tool": AddingATool,
  "/guide/developers/operations/environment": Environment,
  "/guide/developers/operations/database": Database,
  "/guide/developers/operations/deployment": Deployment,
  "/guide/developers/operations/monitoring": Monitoring,
  "/guide/developers/contributing/how-to-contribute": HowToContribute,
  "/guide/developers/contributing/testing": Testing,
  "/guide/developers/contributing/conduct-and-security": ConductAndSecurity,

  // Teachers. Order follows the sidebar, not the alphabet, so this list can
  // be read against lib/guide/navigation.ts.
  "/guide/teachers/getting-started/registration": TeacherRegistration,
  "/guide/teachers/getting-started/subjects": TeacherSubjects,
  "/guide/teachers/getting-started/quick-start": TeacherQuickStart,
  "/guide/teachers/getting-started/how-to-ask": TeacherHowToAsk,
  "/guide/teachers/getting-started/checking-answers": TeacherCheckingAnswers,
  "/guide/teachers/getting-started/faq": TeacherFaq,
  "/guide/teachers/lesson-plans/requesting": RequestingLessonPlan,
  "/guide/teachers/lesson-plans/anatomy": LessonPlanAnatomy,
  "/guide/teachers/teaching-content/what-to-teach": WhatToTeach,
  "/guide/teachers/teaching-content/topic-explanations": TopicExplanations,
  "/guide/teachers/teaching-practice/how-not-what": HowNotWhat,
  "/guide/teachers/teaching-practice/common-mistakes": CommonMistakes,
  "/guide/teachers/teaching-practice/difficult-questions": DifficultQuestions,
  "/guide/teachers/teaching-practice/activities-and-games": ActivitiesAndGames,
  "/guide/teachers/assessment/quizzes-and-exercises": QuizzesAndExercises,
  "/guide/teachers/assessment/mock-exams": MockExams,
  "/guide/teachers/assessment/marking-schemes": MarkingSchemes,
  "/guide/teachers/improvisation/no-materials": NoMaterials,
  "/guide/teachers/improvisation/your-own-notes": YourOwnNotes,
  "/guide/teachers/improvisation/printables": Printables,
  "/guide/teachers/troubleshooting/no-reply": NoReply,
  "/guide/teachers/troubleshooting/limits": Limits,
  "/guide/teachers/troubleshooting/language": Language,
  "/guide/teachers/troubleshooting/profile": Profile,
};

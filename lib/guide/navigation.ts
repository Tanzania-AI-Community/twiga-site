import {
  BookOpen,
  ClipboardCheck,
  Code2,
  GraduationCap,
  HeartHandshake,
  LifeBuoy,
  Lightbulb,
  Network,
  NotebookPen,
  Rocket,
  ServerCog,
  Users,
  Wrench,
  type LucideIcon,
} from "lucide-react";

export type GuidePage = {
  title: string;
  href: string;
  /** Short blurb shown in search results and on landing cards. */
  summary?: string;
  badge?: string;
};

export type GuideSection = {
  title: string;
  icon: LucideIcon;
  items: GuidePage[];
};

export type GuideTrackSlug = "teachers" | "developers";

export type GuideTrack = {
  slug: GuideTrackSlug;
  title: string;
  /** Label used in the sidebar track switcher. */
  shortTitle: string;
  href: string;
  tagline: string;
  icon: LucideIcon;
  sections: GuideSection[];
};

export const guideRoot = "/guide";

/**
 * The guide is split into two tracks that never mix: /guide/teachers for
 * classroom use, /guide/developers for running and extending the project.
 * Sidebar, search, breadcrumbs and prev/next all derive from this tree.
 */
export const guideTracks: GuideTrack[] = [
  {
    slug: "teachers",
    title: "For Teachers",
    shortTitle: "Teachers",
    href: "/guide/teachers",
    tagline:
      "Get set up on WhatsApp and send your first real request to Twiga.",
    icon: GraduationCap,
    sections: [
      {
        // Setup, plus the two cross-cutting habits every later section relies
        // on: how to phrase a request, and how to check what comes back.
        title: "Getting Started",
        icon: Rocket,
        items: [
          {
            title: "Introduction",
            href: "/guide/teachers",
            summary:
              "What Twiga is, who it is for, and how this track is organised.",
          },
          {
            title: "Registering on WhatsApp",
            href: "/guide/teachers/getting-started/registration",
            summary:
              "Send your first message, wait for approval, and finish setup on your phone.",
          },
          {
            title: "Choosing Your Subjects",
            href: "/guide/teachers/getting-started/subjects",
            summary:
              "Pick your classes and forms, and check the change actually saved.",
          },
          {
            title: "Quick Start",
            href: "/guide/teachers/getting-started/quick-start",
            summary:
              "One real request, end to end, so you can see what good looks like.",
          },
          {
            title: "How to Ask Twiga",
            href: "/guide/teachers/getting-started/how-to-ask",
            summary:
              "Subject, form, topic, format, audience — the details that decide every answer.",
          },
          {
            title: "Checking Twiga's Answers",
            href: "/guide/teachers/getting-started/checking-answers",
            summary:
              "The sixty-second check that catches wrong forms, wrong sources and invented facts.",
          },
          {
            title: "Frequently Asked Questions",
            href: "/guide/teachers/getting-started/faq",
            summary: "Costs, data usage, offline behaviour and account questions.",
          },
        ],
      },
      {
        title: "Lesson Plans",
        icon: NotebookPen,
        items: [
          {
            title: "Requesting a Lesson Plan",
            href: "/guide/teachers/lesson-plans/requesting",
            summary:
              "The five details Twiga needs, in one message, to skip the back and forth.",
          },
          {
            title: "What's in a Twiga Lesson Plan",
            href: "/guide/teachers/lesson-plans/anatomy",
            summary:
              "The sections you get, the sections you don't, and what to add for your plan book.",
          },
        ],
      },
      {
        // The subject matter itself: what the syllabus contains and what the
        // textbook says about it.
        title: "Teaching Content",
        icon: BookOpen,
        items: [
          {
            title: "Finding What to Teach",
            href: "/guide/teachers/teaching-content/what-to-teach",
            summary:
              "Topics, subtopics and where a lesson sits in the syllabus for your form.",
          },
          {
            title: "Explaining Topics From the Textbook",
            href: "/guide/teachers/teaching-content/topic-explanations",
            summary:
              "Get an accurate account of a concept, with its source, before you teach it.",
          },
        ],
      },
      {
        // How to teach it, as opposed to what it is. The distinction is the
        // single biggest lever a teacher has over the quality of a reply.
        title: "Teaching Practice",
        icon: Users,
        items: [
          {
            title: "Ask How to Teach It, Not What It Is",
            href: "/guide/teachers/teaching-practice/how-not-what",
            summary:
              "Ask for the words you will say in class and you get a script, not a syllabus.",
          },
          {
            title: "Common Mistakes to Expect",
            href: "/guide/teachers/teaching-practice/common-mistakes",
            summary:
              "Ask where your class will go wrong on a topic, and what to do about it.",
          },
          {
            title: "Answering Difficult Student Questions",
            href: "/guide/teachers/teaching-practice/difficult-questions",
            summary:
              "Get a careful answer, and the reasoning behind it, for questions that need handling.",
          },
          {
            title: "Classroom Activities & Games",
            href: "/guide/teachers/teaching-practice/activities-and-games",
            summary:
              "Turn a topic into something students do, not something they copy.",
          },
        ],
      },
      {
        title: "Exams & Quizzes",
        icon: ClipboardCheck,
        items: [
          {
            title: "Quizzes, Exercises & Exit Tickets",
            href: "/guide/teachers/assessment/quizzes-and-exercises",
            summary:
              "Short assessment in the chat in seconds — say the count, format and difficulty.",
          },
          {
            title: "Full NECTA Mock Exams",
            href: "/guide/teachers/assessment/mock-exams",
            summary:
              "A complete paper and marking scheme as PDFs, and the ten minutes it takes.",
          },
          {
            title: "Marking Schemes & Answer Keys",
            href: "/guide/teachers/assessment/marking-schemes",
            summary:
              "When a key comes automatically, when to ask for one, and why to check it first.",
          },
        ],
      },
      {
        // Making do — no teaching aids, no printer, and a bot that sometimes
        // will not produce the artefact it promised.
        title: "Improvisation",
        icon: Lightbulb,
        items: [
          {
            title: "Teaching With No Materials",
            href: "/guide/teachers/improvisation/no-materials",
            summary:
              "Say you have no aids and Twiga stops assuming a globe and a projector.",
          },
          {
            title: "Working From Your Own Notes",
            href: "/guide/teachers/improvisation/your-own-notes",
            summary:
              "Paste the pages you teach from and get material built on your own examples.",
          },
          {
            title: "Turning Chat Text Into Printables",
            href: "/guide/teachers/improvisation/printables",
            summary:
              "Twiga replies in chat — here is how to get it onto paper for your class.",
          },
        ],
      },
      {
        title: "Troubleshooting & Limits",
        icon: LifeBuoy,
        items: [
          {
            title: "When Twiga Doesn't Reply",
            href: "/guide/teachers/troubleshooting/no-reply",
            summary:
              "Tell a slow reply from a lost one, and the sentence that gets your content anyway.",
          },
          {
            title: "What Twiga Cannot Do",
            href: "/guide/teachers/troubleshooting/limits",
            summary:
              "Voice notes, photos, file downloads, subject coverage and school levels.",
          },
          {
            title: "Language: English & Kiswahili",
            href: "/guide/teachers/troubleshooting/language",
            summary:
              "Which language to write in, and what to proofread in Swahili replies.",
          },
          {
            title: "Fixing Your Profile",
            href: "/guide/teachers/troubleshooting/profile",
            summary:
              "Change your subjects and school details, and confirm the change was saved.",
          },
        ],
      },
    ],
  },
  {
    slug: "developers",
    title: "For Developers",
    shortTitle: "Developers",
    href: "/guide/developers",
    tagline:
      "Run the Twiga backend yourself, understand how it works, and contribute upstream.",
    icon: Code2,
    sections: [
      {
        title: "Getting Started",
        icon: Wrench,
        items: [
          {
            title: "Overview",
            href: "/guide/developers",
            summary: "The stack at a glance and which setup path to take.",
          },
          {
            title: "Local Setup",
            href: "/guide/developers/getting-started/local-setup",
            summary: "Get the API, the database and sample data running.",
          },
          {
            title: "Mock WhatsApp",
            href: "/guide/developers/getting-started/mock-whatsapp",
            summary: "Chat with your local bot without a Meta account.",
          },
          {
            title: "Connecting Real WhatsApp",
            href: "/guide/developers/getting-started/whatsapp",
            summary: "Wire up Meta and ngrok to message the bot from your phone.",
          },
        ],
      },
      {
        title: "How Twiga Works",
        icon: Network,
        items: [
          {
            title: "Architecture",
            href: "/guide/developers/architecture/overview",
            summary: "What happens between an incoming message and a reply.",
          },
          {
            title: "Data Model",
            href: "/guide/developers/architecture/data-model",
            summary: "The tables, how they relate, and where embeddings live.",
          },
          {
            title: "Adding a Tool",
            href: "/guide/developers/architecture/adding-a-tool",
            summary: "Give the model a new capability, step by step.",
          },
        ],
      },
      {
        title: "Operations",
        icon: ServerCog,
        items: [
          {
            title: "Environment Variables",
            href: "/guide/developers/operations/environment",
            summary: "Every variable Twiga reads, and which ones are required.",
          },
          {
            title: "Database & Migrations",
            href: "/guide/developers/operations/database",
            summary: "Alembic migrations, seeding and textbook ingestion.",
          },
          {
            title: "Deployment",
            href: "/guide/developers/operations/deployment",
            summary: "How releases ship, and what production needs.",
          },
          {
            title: "Monitoring",
            href: "/guide/developers/operations/monitoring",
            summary: "Metrics, dashboards, logs and scheduled jobs.",
          },
        ],
      },
      {
        title: "Contributing",
        icon: HeartHandshake,
        items: [
          {
            title: "How to Contribute",
            href: "/guide/developers/contributing/how-to-contribute",
            summary: "Branches, commits, pull requests and review.",
          },
          {
            title: "Testing & Checks",
            href: "/guide/developers/contributing/testing",
            summary: "Run the suite and the hooks that CI runs.",
          },
          {
            title: "Conduct & Security",
            href: "/guide/developers/contributing/conduct-and-security",
            summary: "Community standards and how to report a vulnerability.",
          },
        ],
      },
    ],
  },
];

export type FlatGuidePage = GuidePage & {
  section: string;
  track: GuideTrackSlug;
  trackTitle: string;
};

/** Every page, in reading order, tagged with its track and section. */
export const guidePages: FlatGuidePage[] = guideTracks.flatMap((track) =>
  track.sections.flatMap((section) =>
    section.items.map((item) => ({
      ...item,
      section: section.title,
      track: track.slug,
      trackTitle: track.title,
    })),
  ),
);

export function normalizeGuidePath(pathname: string): string {
  if (pathname.length > 1 && pathname.endsWith("/")) {
    return pathname.slice(0, -1);
  }
  return pathname;
}

/** The track a path belongs to, or undefined on the /guide landing page. */
export function getGuideTrack(pathname: string): GuideTrack | undefined {
  const path = normalizeGuidePath(pathname);
  return guideTracks.find(
    (track) => path === track.href || path.startsWith(`${track.href}/`),
  );
}

export function findGuidePage(pathname: string): FlatGuidePage | undefined {
  const path = normalizeGuidePath(pathname);
  return guidePages.find((page) => page.href === path);
}

/** Prev/next stays inside the current track — the two never chain together. */
export function getGuidePager(pathname: string): {
  previous?: FlatGuidePage;
  next?: FlatGuidePage;
} {
  const path = normalizeGuidePath(pathname);
  const track = getGuideTrack(path);
  if (!track) return {};

  const pages = guidePages.filter((page) => page.track === track.slug);
  const index = pages.findIndex((page) => page.href === path);
  if (index === -1) return {};

  return {
    previous: index > 0 ? pages[index - 1] : undefined,
    next: index < pages.length - 1 ? pages[index + 1] : undefined,
  };
}

/**
 * Slugs for the catch-all route. Track index pages are excluded because they
 * have their own static routes (app/guide/teachers, app/guide/developers).
 */
export function getGuideSlugs(): string[][] {
  const trackHrefs = new Set(guideTracks.map((track) => track.href));
  return guidePages
    .filter((page) => !trackHrefs.has(page.href))
    .map((page) => page.href.replace(`${guideRoot}/`, "").split("/"));
}

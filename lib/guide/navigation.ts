import {
  Code2,
  GraduationCap,
  HeartHandshake,
  Rocket,
  ServerCog,
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
            title: "Quick Start",
            href: "/guide/teachers/getting-started/quick-start",
            summary: "Send your first message to Twiga in under five minutes.",
          },
          {
            title: "Registering on WhatsApp",
            href: "/guide/teachers/getting-started/registration",
            summary: "Link your phone number and verify your teaching profile.",
          },
          {
            title: "Choosing Your Subjects",
            href: "/guide/teachers/getting-started/subjects",
            summary: "Tell Twiga which classes and subjects you teach.",
          },
          {
            title: "Frequently Asked Questions",
            href: "/guide/teachers/getting-started/faq",
            summary: "Costs, data usage, offline behaviour and account questions.",
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
      "Run Twiga yourself — architecture, local setup, deployment and how to contribute upstream.",
    icon: Code2,
    sections: [
      {
        title: "Getting Started",
        icon: Wrench,
        items: [
          {
            title: "Overview",
            href: "/guide/developers",
            summary: "The stack at a glance and what you need to run it.",
          },
          {
            title: "Architecture",
            href: "/guide/developers/getting-started/architecture",
            summary:
              "How the WhatsApp webhook, retrieval layer and models fit together.",
          },
          {
            title: "Local Setup",
            href: "/guide/developers/getting-started/local-setup",
            summary: "Run the stack on your machine with Docker or pnpm.",
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
            title: "Deployment",
            href: "/guide/developers/operations/deployment",
            summary: "Ship to your own infrastructure with the standalone build.",
          },
          {
            title: "Database & Migrations",
            href: "/guide/developers/operations/database",
            summary: "Drizzle schema, migrations and seeding.",
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
            summary: "Good first issues, review expectations and release cadence.",
          },
          {
            title: "Code of Conduct",
            href: "/guide/developers/contributing/code-of-conduct",
            summary: "The standards we hold each other to.",
          },
          {
            title: "Roadmap",
            href: "/guide/developers/contributing/roadmap",
            summary: "What the community is building next.",
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

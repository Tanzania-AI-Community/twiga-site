import {
  Code2,
  GraduationCap,
  HeartHandshake,
  Network,
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

import type { Metadata } from "next";

import {
  Callout,
  CardGrid,
  GuideCard,
  GuideHeading,
  Step,
  Steps,
} from "@/components/guide/content";
import { guideTracks } from "@/lib/guide/navigation";

export const metadata: Metadata = {
  title: "Overview",
  description:
    "The Twiga stack at a glance, and what you need to run it yourself.",
};

export default function DevelopersOverviewPage() {
  const gettingStarted = guideTracks[1].sections[0].items.filter(
    (item) => item.href !== "/guide/developers",
  );

  return (
    <>
      <GuideHeading
        eyebrow="For Developers"
        title="Overview"
        description="Twiga is open source and self-hostable. This track covers the architecture, running it locally, deploying your own instance, and contributing changes back upstream."
      />

      <p>
        If you are here to use Twiga in a classroom rather than run it, the{" "}
        <a href="/guide/teachers">teachers track</a> is the one you want.
      </p>

      <h2>The stack</h2>
      <p>
        Twiga is two deployables: a WhatsApp-facing service that handles
        webhooks and model calls, and this Next.js site, which covers the
        landing page, teacher registration and the admin dashboard.
      </p>

      <table>
        <thead>
          <tr>
            <th>Layer</th>
            <th>Technology</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Web</td>
            <td>Next.js App Router, React 19, Tailwind CSS v4</td>
          </tr>
          <tr>
            <td>Data</td>
            <td>Postgres via Drizzle ORM</td>
          </tr>
          <tr>
            <td>Messaging</td>
            <td>WhatsApp Business Cloud API</td>
          </tr>
          <tr>
            <td>Packaging</td>
            <td>Docker, standalone Next.js output</td>
          </tr>
        </tbody>
      </table>

      <h2>Running it yourself</h2>
      <Steps>
        <Step title="Clone and install">
          The repo uses pnpm. <code>pnpm install</code> pulls both the site and
          its tooling.
        </Step>
        <Step title="Configure the environment">
          Copy <code>.env.example</code> to <code>.env</code> and fill in the
          database URL and WhatsApp credentials.
        </Step>
        <Step title="Start the stack">
          <code>pnpm dev</code> for the site alone, or{" "}
          <code>pnpm docker:start:dev</code> to bring up Postgres alongside it.
        </Step>
      </Steps>

      <Callout type="warning" title="Never commit secrets">
        <code>.env</code> is gitignored for a reason — WhatsApp tokens and
        database URLs belong in your deployment platform&apos;s secret store.
      </Callout>

      <h2>Start here</h2>
      <CardGrid>
        {gettingStarted.map((item) => (
          <GuideCard
            key={item.href}
            href={item.href}
            title={item.title}
            description={item.summary}
          />
        ))}
      </CardGrid>

      <Callout type="note" title="Contributions welcome">
        Issues labelled <code>good first issue</code> on{" "}
        <a
          href="https://github.com/Tanzania-AI-Community/twiga/issues"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>{" "}
        are the fastest way in. See{" "}
        <a href="/guide/developers/contributing/how-to-contribute">
          How to Contribute
        </a>{" "}
        for the workflow.
      </Callout>
    </>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  Callout,
  CardGrid,
  GuideCard,
  GuideHeading,
  Step,
  Steps,
} from "@/components/guide/content";
import {
  findGuidePage,
  getGuideSlugs,
  getGuideTrack,
  guideRoot,
  type GuidePage,
} from "@/lib/guide/navigation";

type PageParams = { params: Promise<{ slug: string[] }> };

export function generateStaticParams() {
  return getGuideSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageParams): Promise<Metadata> {
  const { slug } = await params;
  const page = findGuidePage(`${guideRoot}/${slug.join("/")}`);
  if (!page) return {};
  return { title: page.title, description: page.summary };
}

export default async function GuideContentPage({ params }: PageParams) {
  const { slug } = await params;
  const href = `${guideRoot}/${slug.join("/")}`;
  const page = findGuidePage(href);

  if (!page) notFound();

  const track = getGuideTrack(href);
  const section = track?.sections.find((entry) => entry.title === page.section);
  const siblings =
    section?.items.filter((item) => item.href !== page.href).slice(0, 4) ?? [];

  return (
    <>
      <GuideHeading
        eyebrow={page.section}
        title={page.title}
        description={page.summary}
      />

      <Callout type="note" title="Draft page">
        The guide shell is in place and this route is live — the written content
        for <strong>{page.title}</strong> is still being drafted.
      </Callout>

      {track?.slug === "developers" ? (
        <DeveloperPlaceholder title={page.title} />
      ) : (
        <TeacherPlaceholder title={page.title} />
      )}

      {siblings.length > 0 ? (
        <>
          <h2>Related pages</h2>
          <RelatedCards items={siblings} />
        </>
      ) : null}
    </>
  );
}

function RelatedCards({ items }: { items: GuidePage[] }) {
  return (
    <CardGrid>
      {items.map((item) => (
        <GuideCard
          key={item.href}
          href={item.href}
          title={item.title}
          description={item.summary}
        />
      ))}
    </CardGrid>
  );
}

function TeacherPlaceholder({ title }: { title: string }) {
  return (
    <>
      <h2>Overview</h2>
      <p>
        This section will explain {title.toLowerCase()} end to end: what it is
        for, when to reach for it, and what a good result looks like. Every page
        in this track follows the same shape, so you always know where to look.
      </p>

      <h2>Before you begin</h2>
      <ul>
        <li>A WhatsApp account on the phone number you teach with.</li>
        <li>A registered Twiga profile with your subjects selected.</li>
        <li>Five minutes and the topic you are teaching next.</li>
      </ul>

      <h3>What you will need</h3>
      <table>
        <thead>
          <tr>
            <th>Requirement</th>
            <th>Why it matters</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Subject &amp; form level</td>
            <td>Keeps every answer aligned to the right syllabus.</td>
          </tr>
          <tr>
            <td>Language preference</td>
            <td>Swahili, English, or a mix of both.</td>
          </tr>
          <tr>
            <td>A specific topic</td>
            <td>Narrow questions produce classroom-ready answers.</td>
          </tr>
        </tbody>
      </table>

      <h2>Walkthrough</h2>
      <Steps>
        <Step title="Open the conversation">
          Find the Twiga chat in WhatsApp and send your request in plain
          language — no commands or special syntax.
        </Step>
        <Step title="Add the details that matter">
          Mention the form level, the topic, and how many items you want.
        </Step>
        <Step title="Refine the reply">
          Ask for changes in the same thread. Twiga keeps the context of what it
          just produced.
        </Step>
      </Steps>

      <h3>Example request</h3>
      <pre>
        <code>{`Form 2 Biology — plan a 40 minute lesson on photosynthesis.
Include a starter activity, three key points, and an exit question.`}</code>
      </pre>

      <Callout type="tip" title="Be specific">
        Naming the form level and the length of the lesson is the single biggest
        improvement you can make to any request.
      </Callout>

      <h2>Troubleshooting</h2>
      <p>
        If a reply misses the mark, say so directly — <code>too advanced</code>{" "}
        or <code>make it Swahili</code> is usually enough. Twiga rewrites against
        the previous answer rather than starting over.
      </p>
    </>
  );
}

function DeveloperPlaceholder({ title }: { title: string }) {
  return (
    <>
      <h2>Overview</h2>
      <p>
        This section will document {title.toLowerCase()}: what it covers, the
        commands involved, and how to verify the result. Every page in this
        track follows the same shape, so you always know where to look.
      </p>

      <h2>Prerequisites</h2>
      <ul>
        <li>Node.js 20+ and pnpm installed locally.</li>
        <li>Docker, if you want Postgres managed for you.</li>
        <li>
          A populated <code>.env</code>, copied from <code>.env.example</code>.
        </li>
      </ul>

      <h3>Commands you will use</h3>
      <table>
        <thead>
          <tr>
            <th>Command</th>
            <th>What it does</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>pnpm dev</code>
            </td>
            <td>Runs the site with hot reload.</td>
          </tr>
          <tr>
            <td>
              <code>pnpm build</code>
            </td>
            <td>Produces the standalone production build.</td>
          </tr>
          <tr>
            <td>
              <code>pnpm test:db</code>
            </td>
            <td>Verifies the database connection resolves.</td>
          </tr>
        </tbody>
      </table>

      <h2>Walkthrough</h2>
      <Steps>
        <Step title="Set up your environment">
          Install dependencies and populate the variables this step depends on.
        </Step>
        <Step title="Run it">
          Start the stack and confirm the service comes up clean in the logs.
        </Step>
        <Step title="Verify">
          Check the behaviour end to end before moving on to the next step.
        </Step>
      </Steps>

      <h3>Example</h3>
      <pre>
        <code>{`pnpm install
cp .env.example .env
pnpm docker:start:dev`}</code>
      </pre>

      <Callout type="warning" title="Check your secrets">
        Missing or malformed WhatsApp credentials fail at request time, not at
        boot — validate them before deploying.
      </Callout>

      <h2>Troubleshooting</h2>
      <p>
        Start with <code>pnpm docker:logs</code>. Most failures at this stage are
        environment variables that were never set, or a database URL pointing at
        a host the container cannot reach.
      </p>
    </>
  );
}

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
import { guidePageContent } from "@/components/guide/pages";
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

  // Written pages own their whole layout, including the heading, so that they
  // can open with something other than a summary line where it reads better.
  const Content = guidePageContent[href];
  if (Content) return <Content />;

  return (
    <>
      <GuideHeading
        eyebrow={page.section}
        title={page.title}
        description={page.summary}
      />

      <Callout type="note" title="Draft page">
        The guide shell is in place and this route is live. The written content
        for <strong>{page.title}</strong> is still being drafted.
      </Callout>

      <TeacherPlaceholder title={page.title} />

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

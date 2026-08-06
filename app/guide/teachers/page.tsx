import type { Metadata } from "next";

import {
  Callout,
  CardGrid,
  ChatSample,
  GuideCard,
  GuideHeading,
  Step,
  Steps,
} from "@/components/guide/content";
import { guideTracks } from "@/lib/guide/navigation";

export const metadata: Metadata = {
  title: "Introduction",
  description:
    "What Twiga is, who it is for, and how the teachers' guide is organised.",
};

export default function TeachersIntroPage() {
  const gettingStarted =
    guideTracks[0].sections[0].items.filter(
      (item) => item.href !== "/guide/teachers",
    ) ?? [];

  return (
    <>
      <GuideHeading
        eyebrow="For Teachers"
        title="Introduction"
        description="Twiga is an AI teaching companion built for Tanzanian educators. It lives inside WhatsApp, speaks Swahili and English, and knows the TIE curriculum, so there is nothing new to install and nothing new to learn."
      />

      <p>
        This track covers what you need to get going as a teacher — registering
        on WhatsApp, telling Twiga what you teach, and sending your first real
        request. If you came here to run or extend the code instead, switch to
        the <a href="/guide/developers">developers track</a>.
      </p>

      <h2>What Twiga does</h2>
      <p>
        Twiga turns a question typed into WhatsApp into something you can take
        straight into a classroom: a lesson outline, a set of graded exercises,
        an explanation you can read aloud, or a worksheet to print.
      </p>

      <ChatSample
        messages={[
          {
            from: "teacher",
            text: "Generate 10 exercise questions on fractions for Grade 4 students.",
          },
          {
            from: "twiga",
            text: "Here are 10 fraction exercises for Grade 4:\n1) What is ½ + ¼?\n2) Simplify 4/8 to its lowest form\n3) Which is larger: ⅓ or ¼?",
          },
          {
            from: "teacher",
            text: "Perfect! Can you make word problems using these?",
          },
        ]}
      />

      <Callout type="tip" title="It works on the phone you already have">
        Twiga runs entirely over WhatsApp. No app download, no laptop, and no
        data bundle beyond what a normal chat costs.
      </Callout>

      <h2>What this track covers</h2>
      <ul>
        <li>
          <strong>Quick Start</strong> — one conversation, end to end, so you
          can see what a good request looks like.
        </li>
        <li>
          <strong>Registering on WhatsApp</strong> — linking the number you
          teach with and verifying your profile.
        </li>
        <li>
          <strong>Choosing Your Subjects</strong> — the classes and form levels
          Twiga keeps its answers aligned to.
        </li>
        <li>
          <strong>Frequently Asked Questions</strong> — costs, data usage and
          account questions.
        </li>
      </ul>

      <h2>How to get started</h2>
      <Steps>
        <Step title="Register your number">
          Send a message to the Twiga WhatsApp number and answer three short
          questions about the classes you teach.
        </Step>
        <Step title="Pick your subjects">
          Twiga uses your subjects and form levels to keep answers aligned with
          the syllabus you actually teach.
        </Step>
        <Step title="Ask for something real">
          Skip the test question. Ask for the lesson you are teaching tomorrow —
          the answers get sharper the more specific you are.
        </Step>
      </Steps>

      <h2>Continue reading</h2>
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

      <Callout type="note" title="This guide is open source">
        Spotted something out of date? The site and the bot both live on{" "}
        <a
          href="https://github.com/Tanzania-AI-Community/twiga"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
        , and pull requests are welcome.
      </Callout>
    </>
  );
}

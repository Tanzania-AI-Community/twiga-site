import type { Metadata } from "next";

import {
  Callout,
  CardGrid,
  ChatSample,
  GuideCard,
  GuideHeading,
} from "@/components/guide/content";
import { guideTracks } from "@/lib/guide/navigation";

export const metadata: Metadata = {
  title: "Introduction",
  description: "What Twiga is and how to start using it.",
};

export default function TeachersIntroPage() {
  const gettingStarted = guideTracks[0].sections[0].items.filter(
    (item) => item.href !== "/guide/teachers",
  );

  return (
    <>
      <GuideHeading
        eyebrow="For Teachers"
        title="Introduction"
        description="Twiga is a teaching assistant that lives inside WhatsApp."
      />

      <p>
        You send it a message. It sends back something you can use in class
        tomorrow. A lesson plan, an explanation, a set of questions, a marking
        scheme.
      </p>
      <p>
        It knows the Tanzanian secondary syllabus and the TIE textbooks, and it
        works in English and in Kiswahili. There is nothing to install and
        nothing new to learn. If you can send a WhatsApp message, you can use
        it.
      </p>

      <h2 id="what-it-looks-like">What it looks like</h2>
      <p>
        You write in your own words. You do not need commands or any special
        way of typing.
      </p>

      <ChatSample
        messages={[
          {
            from: "teacher",
            text: "im teaching geography form 1 tomorrow, map reading, title is longitudes and latitudes. 40 min period, short plan pls",
          },
          {
            from: "twiga",
            text: "Lesson Title: Longitudes and Latitudes\nClass: Form 1  •  Subject: Geography\nTime: 40 minutes\n\nLesson Flow:\n1. Introduction (8 min) ask which way is north from the door, then draw one horizontal and one vertical line on the board\n2. Development (22 min) latitude runs east to west, longitude runs north to south\n3. Conclusion (10 min) students give the coordinates of two towns from the board grid",
          },
        ]}
      />

      <Callout type="tip" title="It runs on the phone you already have">
        Everything happens in WhatsApp. No app to download, no laptop, and no
        more data than a normal chat costs.
      </Callout>

      <h2 id="what-to-check">What to check</h2>
      <p>
        Twiga is useful, and it is not always right. It can name the wrong form
        level, cite the wrong chapter, or say it saved something it did not
        save. Read what it sends before you take it to class. This guide shows
        you where it slips and what to do about it.
      </p>

      <h2 id="where-to-start">Where to start</h2>
      <p>
        If you have five minutes, read Quick Start. It shows one whole
        conversation from the first message to a finished lesson plan.
      </p>

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

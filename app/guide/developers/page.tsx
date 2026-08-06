import type { Metadata } from "next";

import {
  Callout,
  CardGrid,
  GuideCard,
  GuideHeading,
} from "@/components/guide/content";

export const metadata: Metadata = {
  title: "Overview",
  description:
    "The Twiga stack at a glance, and how to get it running on your machine.",
};

export default function DevelopersOverviewPage() {
  return (
    <>
      <GuideHeading
        eyebrow="For Developers"
        title="Overview"
        description="Twiga is an open source WhatsApp assistant for Tanzanian teachers. It is MIT licensed and you can run the whole thing yourself."
      />

      <p>
        Here to use Twiga in a classroom rather than run it? The{" "}
        <a href="/guide/teachers">teachers track</a> is the one you want.
      </p>

      <h2 id="what-it-is">What it is</h2>
      <p>
        A single Python service sits between the WhatsApp Cloud API and a
        language model. When a teacher sends a message, it works out who they
        are, retrieves relevant passages from Tanzanian Institute of Education
        textbooks, lets the model call tools such as lesson planning or exam
        generation, and sends the answer back as a WhatsApp message.
      </p>
      <p>
        Everything lives in one Postgres database, including the vector index.
        There is no separate search service to run.
      </p>

      <h2 id="the-stack">The stack</h2>
      <table>
        <thead>
          <tr>
            <th>Layer</th>
            <th>Technology</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>API</td>
            <td>FastAPI on Python 3.12, dependencies managed with uv</td>
          </tr>
          <tr>
            <td>Data</td>
            <td>Postgres with pgvector, SQLModel, Alembic migrations</td>
          </tr>
          <tr>
            <td>Models</td>
            <td>
              Together AI, OpenAI, Google, Modal or local Ollama, through
              LangChain
            </td>
          </tr>
          <tr>
            <td>Messaging</td>
            <td>WhatsApp Business Cloud API</td>
          </tr>
          <tr>
            <td>Rate limiting</td>
            <td>Redis, in production and staging only</td>
          </tr>
          <tr>
            <td>Observability</td>
            <td>Prometheus metrics with Grafana dashboards</td>
          </tr>
          <tr>
            <td>Packaging</td>
            <td>Docker, with Compose for local development</td>
          </tr>
        </tbody>
      </table>

      <h2 id="start-here">Start here</h2>
      <CardGrid>
        <GuideCard
          href="/guide/developers/getting-started/local-setup"
          title="Local Setup"
          description="Get the API, database and sample textbook running in about twenty minutes."
        />
        <GuideCard
          href="/guide/developers/getting-started/mock-whatsapp"
          title="Mock WhatsApp"
          description="Chat with your local bot in a browser, with no Meta account."
        />
        <GuideCard
          href="/guide/developers/architecture/overview"
          title="Architecture"
          description="What happens between an incoming message and a reply."
        />
        <GuideCard
          href="/guide/developers/contributing/how-to-contribute"
          title="How to Contribute"
          description="Branches, commits, pull requests and review."
        />
      </CardGrid>

      <h2 id="what-you-need">What you need</h2>
      <ul>
        <li>Docker, which supplies Postgres and pgvector.</li>
        <li>
          Python 3.12 and <code>uv</code> if you want to run anything outside a
          container.
        </li>
        <li>
          An API key from Together AI or OpenAI. You can avoid this by running
          models locally with Ollama.
        </li>
      </ul>
      <p>
        You do not need a WhatsApp Business account. The mock interface covers
        everyday development.
      </p>

      <Callout type="note" title="Where this guide comes from">
        These pages were written by reading the Twiga codebase alongside the
        documentation in its <code>docs/</code> folder. Where the two disagree,
        the code wins and the disagreement is called out on the page. Expect the
        occasional note explaining that a command in the repository README no
        longer matches what the code does.
      </Callout>

      <h2 id="getting-help">Getting help</h2>
      <p>
        The{" "}
        <a
          href="https://discord.gg/bCe2HfZY2C"
          target="_blank"
          rel="noopener noreferrer"
        >
          Twiga Discord
        </a>{" "}
        is where the community works, and <code>tech-support</code> is the
        channel for setup problems. For longer discussions use{" "}
        <a
          href="https://github.com/Tanzania-AI-Community/twiga/discussions"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub Discussions
        </a>
        . The source is at{" "}
        <a
          href="https://github.com/Tanzania-AI-Community/twiga"
          target="_blank"
          rel="noopener noreferrer"
        >
          Tanzania-AI-Community/twiga
        </a>
        .
      </p>
    </>
  );
}

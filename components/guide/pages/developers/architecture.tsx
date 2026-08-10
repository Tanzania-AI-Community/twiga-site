import { Callout, GuideHeading } from "@/components/guide/content";

export default function ArchitecturePage() {
  return (
    <>
      <GuideHeading
        eyebrow="How Twiga Works"
        title="Architecture"
        description="One FastAPI service sits between WhatsApp and a language model, with a Postgres database holding both the conversation and the textbook."
      />

      <p>
        Twiga is a single deployable. A message arrives from Meta, the service
        works out who sent it and what state they are in, asks a model for an
        answer, lets that model call tools if it needs to, and sends the reply
        back. Postgres holds users, conversation history and the textbook
        chunks the model retrieves from.
      </p>

      <h2 id="the-endpoints">The endpoints</h2>
      <table>
        <thead>
          <tr>
            <th>Route</th>
            <th>Purpose</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>GET /webhooks</code>
            </td>
            <td>Meta&apos;s verification handshake. Echoes the challenge.</td>
          </tr>
          <tr>
            <td>
              <code>POST /webhooks</code>
            </td>
            <td>
              Every incoming message. Guarded by an HMAC signature check.
            </td>
          </tr>
          <tr>
            <td>
              <code>POST /devhooks</code>
            </td>
            <td>
              The same handler with no signature check, for the mock interface.
              Disabled unless <code>MOCK_WHATSAPP</code> is on.
            </td>
          </tr>
          <tr>
            <td>
              <code>POST /flows</code>
            </td>
            <td>Encrypted WhatsApp Flows data exchange.</td>
          </tr>
          <tr>
            <td>
              <code>GET /health</code>
            </td>
            <td>
              Liveness only. It returns <code>OK</code> without touching the
              database.
            </td>
          </tr>
          <tr>
            <td>
              <code>GET /metrics</code>
            </td>
            <td>Prometheus metrics.</td>
          </tr>
        </tbody>
      </table>

      <h2 id="what-happens-to-a-message">What happens to a message</h2>
      <p>
        Following one text message from arrival to reply. File paths are
        relative to the repository root.
      </p>

      <h3 id="1-verify-and-classify">1. Verify and classify</h3>
      <p>
        <code>app/security.py</code> checks the{" "}
        <code>X-Hub-Signature-256</code> header against an HMAC of the raw body
        keyed with your app secret. A mismatch is a 403.
      </p>
      <p>
        <code>app/services/request_service.py</code> then classifies the
        payload. Status updates, flow events and malformed bodies each get their
        own handler. Anything with a timestamp more than ten seconds old is
        dropped, which matters when you are debugging with breakpoints.
      </p>

      <h3 id="2-find-the-user-and-check-their-state">2. Find the user and check their state</h3>
      <p>
        The sender&apos;s WhatsApp ID is looked up in the <code>users</code>{" "}
        table. An unknown number goes to registration. A known one has its
        message persisted, gets a rate limit check against Redis, and is then
        routed on <code>user.state</code>: blocked, in review, approved,
        inactive, onboarding or active. Only active users reach the model.
      </p>

      <h3 id="3-build-the-prompt">3. Build the prompt</h3>
      <p>
        <code>app/clients/client_base.py</code> assembles the request: the
        system prompt from <code>app/assets/prompts/</code>, the teacher&apos;s
        name and classes, then the last ten messages of history.
      </p>
      <p>
        History is filtered. Previous tool calls and tool results are stripped
        out, because some providers require a tool call to be immediately
        followed by its response. Only the current turn&apos;s tool results
        reach the model.
      </p>

      <h3 id="4-call-the-model-run-tools-call-it-again">4. Call the model, run tools, call it again</h3>
      <p>
        The first call includes the tool schemas. If the model asks for a tool,
        the user gets a short holding message, the tools run, and their results
        are appended for a second call that produces the final answer. The
        provider is chosen at runtime through LangChain, so Together, OpenAI,
        Google, Ollama and Modal all work behind the same interface. Failed
        calls retry with exponential backoff.
      </p>
      <p>
        Set <code>AGENTIC_MODE_ENABLED</code> to swap the single round trip for
        a loop that keeps thinking and acting until it has an answer, capped at
        eight iterations.
      </p>

      <h3 id="5-post-process-and-send">5. Post-process and send</h3>
      <p>
        Before anything is sent, the reply passes through several checks in{" "}
        <code>app/services/messaging_service.py</code>:
      </p>
      <ul>
        <li>
          If it mentions a tool name in plain text, it is discarded and replaced
          with a generic error. Leaking internals to teachers is treated as a
          failure.
        </li>
        <li>
          Exam markers are extracted and turned into generated PDFs sent as
          documents.
        </li>
        <li>
          Citation markers are expanded into readable references to the source
          textbook.
        </li>
        <li>
          If the answer looks like LaTeX, it is compiled to an image and sent as
          a picture, falling back to plain text if compilation fails.
        </li>
      </ul>
      <p>
        Whatever survives is sent to the Cloud API. Replies of three options or
        fewer become interactive buttons, and more than that becomes a list.
      </p>

      <h2 id="the-code">The code</h2>
      <table>
        <thead>
          <tr>
            <th>Directory</th>
            <th>What lives there</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>app/clients/</code>
            </td>
            <td>
              Outbound clients. The WhatsApp client, and the two LLM clients
              (single round trip and agent loop).
            </td>
          </tr>
          <tr>
            <td>
              <code>app/services/</code>
            </td>
            <td>
              Routing, the user state machine, reply post-processing, flows,
              exams, citations and rate limiting.
            </td>
          </tr>
          <tr>
            <td>
              <code>app/tools/</code>
            </td>
            <td>
              The tool registry and each tool implementation. See{" "}
              <a href="/guide/developers/architecture/adding-a-tool">
                Adding a Tool
              </a>
              .
            </td>
          </tr>
          <tr>
            <td>
              <code>app/database/</code>
            </td>
            <td>
              SQLModel tables, enums, queries and the async engine. Vector
              search lives here too.
            </td>
          </tr>
          <tr>
            <td>
              <code>app/models/</code>
            </td>
            <td>
              Shapes for outbound WhatsApp JSON. Not database models, despite
              the name.
            </td>
          </tr>
          <tr>
            <td>
              <code>app/utils/</code>
            </td>
            <td>
              Payload builders, the provider factory, the embedder and the
              prompt manager.
            </td>
          </tr>
          <tr>
            <td>
              <code>app/assets/</code>
            </td>
            <td>
              Prompts, model defaults and every user-facing string, as YAML.
              Loaded at import.
            </td>
          </tr>
          <tr>
            <td>
              <code>app/latex/</code>
            </td>
            <td>LaTeX to PDF to image rendering.</td>
          </tr>
          <tr>
            <td>
              <code>app/monitoring/</code>
            </td>
            <td>Prometheus metric definitions.</td>
          </tr>
          <tr>
            <td>
              <code>scripts/</code>
            </td>
            <td>
              Seeding, textbook ingestion, re-embedding and the scheduled jobs.
            </td>
          </tr>
        </tbody>
      </table>

      <h3 id="two-things-the-repository-docs-get-wrong">Two things the repository docs get wrong</h3>
      <p>
        <code>docs/en/ARCHITECTURE.md</code> points at{" "}
        <code>app/llm_service.py</code> and <code>app/database/model.py</code>.
        Neither exists. The real paths are{" "}
        <code>app/clients/llm_client.py</code> and{" "}
        <code>app/database/models.py</code>.
      </p>

      <Callout type="warning" title="Some files in app/services are dead copies">
        <code>app/services/</code> still holds older forks of{" "}
        <code>client_base.py</code>, <code>agent_client.py</code>,{" "}
        <code>llm_service.py</code>, <code>whatsapp_service.py</code> and{" "}
        <code>latex_image_service.py</code>. Nothing reachable from{" "}
        <code>app/main.py</code> imports them, but the test suite does, and they
        have drifted from the live versions in <code>app/clients/</code> and{" "}
        <code>app/latex/</code>. If an edit seems to have no effect at runtime,
        check which copy you changed.
      </Callout>

      <h2 id="configuration">Configuration</h2>
      <p>
        Everything is read through <code>app/config.py</code>. Import{" "}
        <code>settings</code> from there rather than reaching for{" "}
        <code>dotenv</code> or <code>os.environ</code>, which is a rule the
        project states explicitly.
      </p>
      <p>
        Seven variables are asserted at import time, so a missing one stops the
        process from starting rather than failing on the first request.
        Non-secret defaults come from{" "}
        <code>app/assets/config/base.yml</code>, not from the code.
      </p>

      <h2 id="behaviour-that-surprises-people">Behaviour that surprises people</h2>
      <ul>
        <li>
          <strong>
            <code>ENVIRONMENT</code> changes more than logging.
          </strong>{" "}
          Outside production, an unknown number is silently turned into a
          ready-made Geography Form 2 teacher. Redis and rate limiting only
          start in production and staging.
        </li>
        <li>
          <strong>A second message while the first is in flight gets no reply.</strong>{" "}
          Each user has a processing lock. The second message is buffered, then
          discarded when the first finishes.
        </li>
        <li>
          <strong>Rate limiting fails open.</strong> If Redis is unreachable
          every request passes, and users stuck in a limited state are reset to
          active.
        </li>
        <li>
          <strong>Importing the app has side effects.</strong> Prompts and
          strings are read from disk, an output directory is created, and an
          HTTP client is constructed, all at import time.
        </li>
        <li>
          <strong>
            The application package imports from <code>scripts/</code>.
          </strong>{" "}
          The flow service depends on a module there, which is why{" "}
          <code>PYTHONPATH</code> is set in the Makefile targets.
        </li>
      </ul>
    </>
  );
}

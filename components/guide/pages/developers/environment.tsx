import { Callout, GuideHeading } from "@/components/guide/content";

export default function EnvironmentPage() {
  return (
    <>
      <GuideHeading
        eyebrow="Operations"
        title="Environment Variables"
        description="Everything Twiga reads, what it does, and where to get it. The templates in the repository are a starting point, not a complete list."
      />

      <p>
        Configuration is loaded once, at import, by{" "}
        <code>app/config.py</code>. Import <code>settings</code> from there
        rather than reading the environment directly. Names are case
        insensitive, and unknown variables are ignored silently.
      </p>

      <h2 id="the-seven-that-are-mandatory">The seven that are mandatory</h2>
      <p>
        These are asserted when the module loads. Miss one and the process will
        not start, whatever else is configured.
      </p>
      <pre>
        <code>{`META_API_VERSION
META_APP_ID
META_APP_SECRET
WHATSAPP_CLOUD_NUMBER_ID
WHATSAPP_VERIFY_TOKEN
WHATSAPP_API_TOKEN
DATABASE_URL`}</code>
      </pre>
      <p>
        This is true even in mock mode, which is why{" "}
        <code>.env.template.simple</code> fills the Meta ones with the literal
        word <code>placeholder</code>. They exist to satisfy the check, and are
        never used.
      </p>

      <Callout type="warning" title="Blank is not the same as absent">
        A variable that is present with no value is read as an empty string, so{" "}
        <code>LLM_PROVIDER=</code> fails validation instead of falling back to
        the default. Both templates ship several variables this way. To get a
        default, delete the line.
      </Callout>

      <h2 id="whatsapp-and-meta">WhatsApp and Meta</h2>
      <table>
        <thead>
          <tr>
            <th>Variable</th>
            <th>Default</th>
            <th>Purpose</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>META_API_VERSION</code>
            </td>
            <td>required</td>
            <td>
              Graph API version used in outbound URLs. Templates use{" "}
              <code>v22.0</code>.
            </td>
          </tr>
          <tr>
            <td>
              <code>META_APP_ID</code>
            </td>
            <td>required</td>
            <td>From App settings, Basic in the Meta console.</td>
          </tr>
          <tr>
            <td>
              <code>META_APP_SECRET</code>
            </td>
            <td>required</td>
            <td>Verifies the signature on every incoming webhook.</td>
          </tr>
          <tr>
            <td>
              <code>WHATSAPP_CLOUD_NUMBER_ID</code>
            </td>
            <td>required</td>
            <td>The phone number ID messages are sent from.</td>
          </tr>
          <tr>
            <td>
              <code>WHATSAPP_VERIFY_TOKEN</code>
            </td>
            <td>required</td>
            <td>
              A string you invent, entered identically in the Meta console.
            </td>
          </tr>
          <tr>
            <td>
              <code>WHATSAPP_API_TOKEN</code>
            </td>
            <td>required</td>
            <td>Bearer token for the Cloud API.</td>
          </tr>
          <tr>
            <td>
              <code>MOCK_WHATSAPP</code>
            </td>
            <td>
              <code>False</code>
            </td>
            <td>
              Turns every outbound call into a no-op, disables signature
              checking and opens <code>/devhooks</code>. Development only.
            </td>
          </tr>
          <tr>
            <td>
              <code>WELCOME_TEMPLATE_ID</code>
            </td>
            <td>
              <code>twiga_registration_approved</code>
            </td>
            <td>Template sent when a user is approved.</td>
          </tr>
          <tr>
            <td>
              <code>MESSAGE_CHARACTER_LIMIT</code>
            </td>
            <td>
              <code>65000</code>
            </td>
            <td>Cap on the assembled prompt.</td>
          </tr>
        </tbody>
      </table>

      <h2 id="language-models">Language models</h2>
      <table>
        <thead>
          <tr>
            <th>Variable</th>
            <th>Default</th>
            <th>Purpose</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>LLM_API_KEY</code>
            </td>
            <td>none</td>
            <td>
              Needed for Together, OpenAI and Google. Not needed for Ollama.
            </td>
          </tr>
          <tr>
            <td>
              <code>LLM_PROVIDER</code>
            </td>
            <td>
              <code>ollama</code>
            </td>
            <td>
              One of <code>together</code>, <code>openai</code>,{" "}
              <code>ollama</code>, <code>modal</code>, <code>google</code>.
            </td>
          </tr>
          <tr>
            <td>
              <code>LLM_MODEL_NAME</code>
            </td>
            <td>a Qwen instruct model</td>
            <td>Chat model identifier.</td>
          </tr>
          <tr>
            <td>
              <code>AGENTIC_MODE_ENABLED</code>
            </td>
            <td>
              <code>false</code>
            </td>
            <td>Swaps the single tool round trip for an agent loop.</td>
          </tr>
          <tr>
            <td>
              <code>MAX_AGENT_ITERATIONS</code>
            </td>
            <td>
              <code>8</code>
            </td>
            <td>Cap on that loop.</td>
          </tr>
          <tr>
            <td>
              <code>OLLAMA_BASE_URL</code>
            </td>
            <td>
              <code>http://host.docker.internal:11434/v1</code>
            </td>
            <td>Reaches the Ollama daemon on your host from the container.</td>
          </tr>
          <tr>
            <td>
              <code>OLLAMA_MODEL_NAME</code>
            </td>
            <td>
              <code>llama3.2</code>
            </td>
            <td>
              Overrides <code>LLM_MODEL_NAME</code> for Ollama.
            </td>
          </tr>
          <tr>
            <td>
              <code>MODAL_BASE_URL</code>, <code>MODAL_MODEL_NAME</code>
            </td>
            <td>none</td>
            <td>For a self-hosted Modal deployment.</td>
          </tr>
        </tbody>
      </table>

      <Callout type="warning" title="Five variables with dangerously generic names">
        <p>
          <code>TIMEOUT</code>, <code>BASE_URL</code>, <code>MAX_TOKENS</code>,{" "}
          <code>TEMPERATURE</code> and <code>REASONING_EFFORT</code> configure
          the language model client, and they carry no prefix. They are read
          from the ambient environment, not only from your{" "}
          <code>.env</code>, so an unrelated <code>TIMEOUT</code> exported in a
          shell or set by a CI runner will quietly reconfigure Twiga.
        </p>
      </Callout>

      <h2 id="embeddings">Embeddings</h2>
      <table>
        <thead>
          <tr>
            <th>Variable</th>
            <th>Default</th>
            <th>Purpose</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>EMBEDDING_API_KEY</code>
            </td>
            <td>none</td>
            <td>
              Can be the same key as <code>LLM_API_KEY</code> if one provider
              serves both.
            </td>
          </tr>
          <tr>
            <td>
              <code>EMBEDDING_PROVIDER</code>
            </td>
            <td>
              <code>ollama</code>
            </td>
            <td>
              Together, OpenAI, Ollama or Modal. Google is not supported here.
            </td>
          </tr>
          <tr>
            <td>
              <code>EMBEDDING_MODEL</code>
            </td>
            <td>multilingual e5 large</td>
            <td>
              Must produce 1024 dimensions unless you migrate the column.
            </td>
          </tr>
          <tr>
            <td>
              <code>OLLAMA_EMBEDDING_MODEL</code>
            </td>
            <td>
              <code>mxbai-embed-large</code>
            </td>
            <td>Overrides the above for Ollama.</td>
          </tr>
        </tbody>
      </table>

      <h2 id="database">Database</h2>
      <table>
        <thead>
          <tr>
            <th>Variable</th>
            <th>Purpose</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>DATABASE_URL</code>
            </td>
            <td>
              The connection string. Use{" "}
              <code>postgresql+asyncpg://user:pass@db:5432/twiga_db</code> when
              the app runs in Docker. Alembic reuses this with the driver
              suffix stripped.
            </td>
          </tr>
          <tr>
            <td>
              <code>DATABASE_USER</code>, <code>DATABASE_PASSWORD</code>,{" "}
              <code>DATABASE_NAME</code>
            </td>
            <td>
              Read by Docker Compose to create the local Postgres container, not
              by the application. Required for local development all the same.
            </td>
          </tr>
        </tbody>
      </table>

      <h2 id="rate-limiting">Rate limiting</h2>
      <p>
        Active only when <code>ENVIRONMENT</code> is production or staging, and
        only when all four of these are set. If any is missing, rate limiting is
        skipped and a line is written to the log.
      </p>
      <table>
        <thead>
          <tr>
            <th>Variable</th>
            <th>Purpose</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>REDIS_URL</code>
            </td>
            <td>
              The counter store. Unreachable Redis disables limiting rather than
              blocking traffic.
            </td>
          </tr>
          <tr>
            <td>
              <code>USER_MESSAGE_LIMIT</code>
            </td>
            <td>Messages per user per window.</td>
          </tr>
          <tr>
            <td>
              <code>GLOBAL_MESSAGE_LIMIT</code>
            </td>
            <td>Messages across all users per window.</td>
          </tr>
          <tr>
            <td>
              <code>TIME_TO_LIVE</code>
            </td>
            <td>Window length in seconds. A day is 86400.</td>
          </tr>
        </tbody>
      </table>
      <p>
        Only <code>REDIS_URL</code> appears in the templates. The other three
        have to be added by hand, which is easy to miss when standing up
        production.
      </p>

      <h2 id="whatsapp-flows">WhatsApp Flows</h2>
      <p>
        Needed only for the onboarding and settings screens, which require a
        verified business account. Each is optional at startup and fails on the
        first request that needs it.
      </p>
      <pre>
        <code>{`WHATSAPP_BUSINESS_PRIVATE_KEY
WHATSAPP_BUSINESS_PRIVATE_KEY_PASSWORD
FLOW_TOKEN_ENCRYPTION_KEY
ONBOARDING_FLOW_ID
SUBJECTS_CLASSES_FLOW_ID`}</code>
      </pre>

      <h2 id="application-behaviour">Application behaviour</h2>
      <table>
        <thead>
          <tr>
            <th>Variable</th>
            <th>Default</th>
            <th>Purpose</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>ENVIRONMENT</code>
            </td>
            <td>
              <code>local</code>
            </td>
            <td>
              One of production, staging, development, local. Controls Redis,
              rate limiting, welcome templates and whether unknown numbers get a
              ready-made test account.
            </td>
          </tr>
          <tr>
            <td>
              <code>DEBUG</code>
            </td>
            <td>
              <code>True</code>
            </td>
            <td>Verbose logging.</td>
          </tr>
          <tr>
            <td>
              <code>USER_INACTIVITY_THRESHOLD_HOURS</code>
            </td>
            <td>
              <code>24</code>
            </td>
            <td>How long before a user is marked inactive.</td>
          </tr>
          <tr>
            <td>
              <code>TWIGA_ENV</code>
            </td>
            <td>
              <code>.env</code>
            </td>
            <td>
              Path to the environment file. Must be set in the real environment,
              since it is read before any file is opened.
            </td>
          </tr>
        </tbody>
      </table>

      <h2 id="tracing">Tracing</h2>
      <p>
        Optional. Tracing turns on only when the key is present{" "}
        <em>and</em> the flag is true.
      </p>
      <pre>
        <code>{`LANGSMITH_API_KEY=your_key
LANGSMITH_PROJECT=twiga-whatsapp-chatbot
LANGSMITH_TRACING=True
LANGSMITH_ENDPOINT=https://api.smith.langchain.com`}</code>
      </pre>

      <h2 id="notes-on-the-templates">Notes on the templates</h2>
      <ul>
        <li>
          <code>BUSINESS_ENV</code> appears in both templates and is read by
          nothing. Safe to delete.
        </li>
        <li>
          The comment claiming <code>LLM_MODEL_NAME</code> defaults to a Llama
          model is wrong on both counts. The default is a Qwen model, and
          leaving the line blank gives you an empty string rather than the
          default.
        </li>
        <li>
          The instruction to search the code for <code>XXX:</code> markers when
          using OpenAI is out of date. Those markers have moved.
        </li>
        <li>
          Several live variables appear in neither template, including the three
          rate limit settings, <code>EMBEDDING_MODEL</code>,{" "}
          <code>MESSAGE_CHARACTER_LIMIT</code> and{" "}
          <code>USER_INACTIVITY_THRESHOLD_HOURS</code>.
        </li>
      </ul>
    </>
  );
}

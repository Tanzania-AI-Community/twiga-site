import { Callout, GuideHeading, Step, Steps } from "@/components/guide/content";

export default function LocalSetupPage() {
  return (
    <>
      <GuideHeading
        eyebrow="Getting Started"
        title="Local Setup"
        description="Get the API, a Postgres database and sample textbook data running on your machine. Budget about twenty minutes, most of it waiting on the first Docker build."
      />

      <h2 id="what-you-need">What you need</h2>
      <table>
        <thead>
          <tr>
            <th>Requirement</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Python 3.12</td>
            <td>
              Pinned in <code>.python-version</code>. Only needed on the host if
              you run outside Docker.
            </td>
          </tr>
          <tr>
            <td>
              <a
                href="https://docs.astral.sh/uv/"
                target="_blank"
                rel="noopener noreferrer"
              >
                uv
              </a>
            </td>
            <td>The package manager. No version is pinned.</td>
          </tr>
          <tr>
            <td>Docker</td>
            <td>Runs Postgres 17 with pgvector, and the API itself.</td>
          </tr>
          <tr>
            <td>An LLM API key</td>
            <td>
              Together AI or OpenAI. You can skip this entirely by running
              models locally with Ollama.
            </td>
          </tr>
        </tbody>
      </table>

      <p>
        You do <strong>not</strong> need a Meta or WhatsApp Business account to
        develop. Everything below works without one.
      </p>

      <h2 id="install-and-create-your-environment-file">Install and create your environment file</h2>
      <Steps>
        <Step title="Clone and sync dependencies">
          <pre>
            <code>{`git clone https://github.com/Tanzania-AI-Community/twiga.git
cd twiga
uv sync
source .venv/bin/activate`}</code>
          </pre>
          On Windows the last command is <code>.venv\\Scripts\\activate</code>.
        </Step>
        <Step title="Create .env from a template">
          <pre>
            <code>cp .env.template.simple .env</code>
          </pre>
          Use <code>.env.template.simple</code> for local work. It ships
          placeholder Meta credentials that exist purely to satisfy startup
          checks. Use the longer <code>.env.template</code> only when you need
          WhatsApp Flows, Redis or LangSmith.
        </Step>
        <Step title="Fill in the values that matter">
          Set your LLM key and provider, and point the database at the Docker
          service named <code>db</code>:
          <pre>
            <code>{`LLM_API_KEY=your_key_here
LLM_PROVIDER=together
EMBEDDING_API_KEY=your_key_here
EMBEDDING_PROVIDER=together

DATABASE_USER=postgres
DATABASE_PASSWORD=your_password
DATABASE_NAME=twiga_db
DATABASE_URL=postgresql+asyncpg://postgres:your_password@db:5432/twiga_db`}</code>
          </pre>
          The same key works for both <code>LLM_API_KEY</code> and{" "}
          <code>EMBEDDING_API_KEY</code> if one provider serves both.
        </Step>
      </Steps>

      <Callout type="warning" title="Two ways the .env file will bite you">
        <p>
          <strong>Delete every comment and blank value.</strong> The{" "}
          <code>Makefile</code> starts with <code>include .env</code>, so the
          section headers in the template are not valid make syntax and every{" "}
          <code>make</code> target will fail. Separately, a variable that is
          present but empty is read as an empty string, not as missing, so{" "}
          <code>LLM_PROVIDER=</code> crashes at startup instead of falling back
          to a default. Delete the line to get the default.
        </p>
        <p>
          <strong>
            Use <code>db</code> as the database host, not{" "}
            <code>127.0.0.1</code>.
          </strong>{" "}
          The API runs inside the Docker network, where{" "}
          <code>127.0.0.1</code> is the API container itself. The value shipped
          in <code>.env.template.simple</code> only works if you run uvicorn
          directly on your host.
        </p>
      </Callout>

      <h2 id="build-and-run">Build and run</h2>
      <p>
        One command builds the images, resets the database, applies migrations,
        loads a Form 2 Geography textbook with pre-computed embeddings, and
        starts everything:
      </p>
      <pre>
        <code>make setup-env</code>
      </pre>
      <p>
        This takes a while. It builds with <code>--no-cache</code>. After that,
        start and stop with:
      </p>
      <pre>
        <code>{`make run     # start in the background
make stop    # stop and remove containers
make restart # both`}</code>
      </pre>

      <h3 id="check-that-it-worked">Check that it worked</h3>
      <pre>
        <code>{`curl http://localhost:8000/health
# OK`}</code>
      </pre>
      <p>
        Interactive API docs are at{" "}
        <code>http://localhost:8000/docs</code>, and Prometheus metrics at{" "}
        <code>/metrics</code>.
      </p>

      <Callout type="tip" title="Now send it a message">
        A running API with no way to talk to it is not much use. Next, either
        run the <a href="/guide/developers/getting-started/mock-whatsapp">
          mock WhatsApp interface
        </a>{" "}
        in your browser, or{" "}
        <a href="/guide/developers/getting-started/whatsapp">
          connect a real WhatsApp number
        </a>
        .
      </Callout>

      <h2 id="command-reference">Command reference</h2>
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
              <code>make setup-env</code>
            </td>
            <td>Build, seed and run. The one-shot bootstrap.</td>
          </tr>
          <tr>
            <td>
              <code>make build</code>
            </td>
            <td>Rebuild images from scratch.</td>
          </tr>
          <tr>
            <td>
              <code>make run</code> / <code>make stop</code>
            </td>
            <td>Start detached, or tear down.</td>
          </tr>
          <tr>
            <td>
              <code>make generate-local-data</code>
            </td>
            <td>
              Wipe the database and reload sample data. Destructive by design.
            </td>
          </tr>
          <tr>
            <td>
              <code>make ingest-book filename=book.json</code>
            </td>
            <td>Load your own parsed textbook.</td>
          </tr>
          <tr>
            <td>
              <code>PYTHONPATH=. pytest -v tests/</code>
            </td>
            <td>Run the test suite, exactly as CI does.</td>
          </tr>
        </tbody>
      </table>

      <h2 id="running-models-locally-with-ollama">Running models locally with Ollama</h2>
      <p>
        If you would rather not pay for inference, Ollama serves both chat and
        embeddings over an OpenAI-compatible API:
      </p>
      <pre>
        <code>{`ollama pull llama3.2
ollama pull mxbai-embed-large`}</code>
      </pre>
      <p>
        Then set <code>LLM_PROVIDER=ollama</code> and{" "}
        <code>EMBEDDING_PROVIDER=ollama</code> and drop the API keys. The
        defaults already point at{" "}
        <code>http://host.docker.internal:11434</code>, which is how the
        container reaches the daemon on your host.
      </p>
      <p>
        One catch: the sample embeddings that ship with the repo are 1024
        dimensions, and so is the database column. Switching embedding models
        changes the dimension and you will need to re-embed. See{" "}
        <a href="/guide/developers/operations/database">Database &amp; Migrations</a>.
      </p>

      <h2 id="when-it-does-not-work">When it does not work</h2>
      <table>
        <thead>
          <tr>
            <th>Symptom</th>
            <th>Cause</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>docker-compose: command not found</code>
            </td>
            <td>
              The Makefile calls the older hyphenated binary. Install the
              Compose v1 shim, or run the underlying{" "}
              <code>docker compose -f docker/dev/docker-compose.yml</code>{" "}
              commands directly.
            </td>
          </tr>
          <tr>
            <td>
              <code>missing separator</code> from make
            </td>
            <td>
              Comments or section headers are still in your <code>.env</code>.
            </td>
          </tr>
          <tr>
            <td>
              <code>ValidationError</code> on startup
            </td>
            <td>
              A variable is present but blank. Most often{" "}
              <code>LLM_PROVIDER</code> or <code>EMBEDDING_PROVIDER</code>.
            </td>
          </tr>
          <tr>
            <td>
              <code>type vector does not exist</code>
            </td>
            <td>
              You ran migrations against a fresh database without seeding. Run{" "}
              <code>make generate-local-data</code>, which creates the pgvector
              extension first.
            </td>
          </tr>
          <tr>
            <td>
              <code>X is required</code> at import time
            </td>
            <td>
              One of the seven mandatory variables is missing. See{" "}
              <a href="/guide/developers/operations/environment">
                Environment Variables
              </a>
              .
            </td>
          </tr>
          <tr>
            <td>
              <code>make migrate-up</code> fails
            </td>
            <td>
              It uses <code>exec</code>, so the container has to be running
              already. Run <code>make run</code> first.
            </td>
          </tr>
        </tbody>
      </table>

      <p>
        Still stuck? Ask in the{" "}
        <code>tech-support</code> channel on the{" "}
        <a
          href="https://discord.gg/bCe2HfZY2C"
          target="_blank"
          rel="noopener noreferrer"
        >
          Twiga Discord
        </a>
        .
      </p>
    </>
  );
}

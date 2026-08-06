import { Callout, GuideHeading } from "@/components/guide/content";

export default function DatabasePage() {
  return (
    <>
      <GuideHeading
        eyebrow="Operations"
        title="Database & Migrations"
        description="Postgres with pgvector, SQLModel for the tables, Alembic for the history. Plus the scripts that load a textbook into it."
      />

      <h2 id="everyday-commands">Everyday commands</h2>
      <p>
        The Make targets run Alembic inside the app container, which is where
        the database hostname resolves.
      </p>
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
              <code>make generate-migration message=&quot;add x&quot;</code>
            </td>
            <td>Autogenerate a revision from the models.</td>
          </tr>
          <tr>
            <td>
              <code>make migrate-up</code>
            </td>
            <td>Apply everything up to the latest revision.</td>
          </tr>
          <tr>
            <td>
              <code>make migrate-down version=abc123</code>
            </td>
            <td>Roll back to a specific revision.</td>
          </tr>
          <tr>
            <td>
              <code>make generate-local-data</code>
            </td>
            <td>Wipe, migrate and reload the sample textbook.</td>
          </tr>
        </tbody>
      </table>

      <Callout type="note" title="Two of these need a running container">
        <code>migrate-up</code> and <code>migrate-down</code> use{" "}
        <code>exec</code>, so run <code>make run</code> first.{" "}
        <code>generate-migration</code> and <code>generate-local-data</code>{" "}
        start their own throwaway container and work either way.
      </Callout>

      <p>
        There is no Make target for inspecting state, so run Alembic directly:
      </p>
      <pre>
        <code>{`uv run alembic current   # which revision is applied
uv run alembic history   # the full chain
uv run alembic heads     # should always be exactly one`}</code>
      </pre>

      <h2 id="writing-a-migration">Writing a migration</h2>
      <p>
        Autogenerate compares the models to the live database, so migrate up
        first, then change the model, then generate. Always read the generated
        file before committing it.
      </p>

      <h3 id="enum-values-are-never-detected">Enum values are never detected</h3>
      <p>
        Autogenerate sees new tables and columns. It does not see new values
        added to an existing enum type, and Twiga uses enums heavily for states,
        subjects and grade levels. Add them by hand:
      </p>
      <pre>
        <code>{`op.execute("ALTER TYPE subjectname ADD VALUE IF NOT EXISTS 'chemistry'")`}</code>
      </pre>

      <Callout type="warning" title="Never add an enum value and use it in the same migration">
        Alembic runs the whole upgrade in one transaction, and Postgres will not
        let a newly added enum value be used inside the transaction that added
        it. Split the schema change and the data change into two revisions.
      </Callout>

      <h3 id="downgrades-are-mostly-not-real">Downgrades are mostly not real</h3>
      <p>
        Postgres cannot drop an enum value, so most of the enum revisions have
        an empty downgrade. One of them deletes rows on the way down. Treat
        downgrade as a development convenience, not a production rollback plan.
      </p>

      <h2 id="loading-data">Loading data</h2>
      <p>
        A fresh database has no subjects, no classes and nothing to retrieve
        from. The seed script gives you a working one.
      </p>
      <pre>
        <code>{`uv run python -m scripts.database.seed \\
  --create --sample-data --vector-data chunks_multilingual.json`}</code>
      </pre>
      <p>The three flags do different jobs and are usually used together.</p>
      <table>
        <thead>
          <tr>
            <th>Flag</th>
            <th>Effect</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>--create</code>
            </td>
            <td>
              Drops every table and enum, enables the pgvector extension, then
              runs all migrations. Completely destructive.
            </td>
          </tr>
          <tr>
            <td>
              <code>--sample-data</code>
            </td>
            <td>
              Creates one subject, one class and one textbook resource:
              Geography, Form 2. No users.
            </td>
          </tr>
          <tr>
            <td>
              <code>--vector-data FILE</code>
            </td>
            <td>
              Loads 726 pre-embedded chunks of that textbook. Requires{" "}
              <code>--sample-data</code> to have run.
            </td>
          </tr>
        </tbody>
      </table>
      <p>Three chunk files ship with the repository:</p>
      <ul>
        <li>
          <code>chunks_multilingual.json</code> and{" "}
          <code>chunks_BAAI.json</code>, both 1024 dimensions, both fine.
        </li>
        <li>
          <code>chunks_OPENAI.json</code>, 1536 dimensions, which will not load
          against the default column.
        </li>
      </ul>

      <Callout type="warning" title="pgvector is enabled by the seed script, not by a migration">
        The initial migration creates a vector column but never creates the
        extension. On a brand new database, running{" "}
        <code>alembic upgrade head</code> on its own fails with{" "}
        <code>type vector does not exist</code>. Either seed first, or run{" "}
        <code>CREATE EXTENSION vector;</code> yourself.
      </Callout>

      <h3 id="your-own-textbook">Your own textbook</h3>
      <pre>
        <code>make ingest-book filename=your_book.json</code>
      </pre>
      <p>
        The file is read from <code>scripts/assets/books/</code>, a directory
        that does not exist until you create it. The JSON must already contain
        embeddings; ingestion does not compute them. Subject, class and resource
        rows are reused if they already exist, so re-running is safe.
      </p>

      <h3 id="changing-embedding-model">Changing embedding model</h3>
      <p>
        Two scripts exist for this. One re-embeds a JSON file offline, the other
        re-embeds chunks already in the database. The second one copies the
        table before touching anything, so the original survives a mistake.
        Both support <code>--dry-run</code>.
      </p>
      <p>
        Remember that a new model usually means a new dimension, which means
        editing the column definition and writing a migration to alter it.
      </p>

      <h2 id="sharp-edges">Sharp edges</h2>
      <ul>
        <li>
          Alembic prints the full database URL, password included, on every
          invocation. Redact before pasting output into an issue.
        </li>
        <li>
          <code>seed.py --create</code> wipes everything, including the Alembic
          version table. Never point it at a shared database.
        </li>
        <li>
          <code>alembic.ini</code> contains{" "}
          <code>sqlalchemy.url = placeholder</code> on purpose. It is replaced
          at runtime from your settings, so editing it has no effect.
        </li>
        <li>
          The revision chain is linear with a single head. If you see two heads,
          two branches added migrations in parallel and they need merging.
        </li>
        <li>
          One migration file has a docstring naming the wrong parent. The{" "}
          <code>down_revision</code> value is the one Alembic reads and it is
          correct.
        </li>
        <li>
          Nothing runs migrations on deploy. Neither the Dockerfile nor
          application startup applies them, despite what{" "}
          <code>docs/en/MIGRATIONS.md</code> suggests. Applying them in
          production is a manual step.
        </li>
      </ul>
    </>
  );
}

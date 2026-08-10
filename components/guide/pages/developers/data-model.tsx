import { Callout, GuideHeading } from "@/components/guide/content";

export default function DataModelPage() {
  return (
    <>
      <GuideHeading
        eyebrow="How Twiga Works"
        title="Data Model"
        description="Nine tables in Postgres, defined with SQLModel. The conversation, the curriculum and the vector index all live in the same database."
      />

      <p>
        Tables are declared in <code>app/database/models.py</code> and queried
        through <code>app/database/db.py</code>. The runtime uses an async
        driver; Alembic uses a synchronous one against the same URL.
      </p>

      <h2 id="the-tables">The tables</h2>
      <table>
        <thead>
          <tr>
            <th>Table</th>
            <th>What it holds</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>users</code>
            </td>
            <td>
              Teachers, keyed by WhatsApp ID. Carries the state machine
              (blocked, in review, approved, onboarding, active, inactive), the
              onboarding step, school, region and last activity.
            </td>
          </tr>
          <tr>
            <td>
              <code>subjects</code>
            </td>
            <td>One row per subject in use, from a fixed list of thirty.</td>
          </tr>
          <tr>
            <td>
              <code>classes</code>
            </td>
            <td>
              A subject paired with a grade level, for example Geography and
              Form 2. Unique on that pair.
            </td>
          </tr>
          <tr>
            <td>
              <code>teachers_classes</code>
            </td>
            <td>Which teacher teaches which class.</td>
          </tr>
          <tr>
            <td>
              <code>resources</code>
            </td>
            <td>A textbook or curriculum document.</td>
          </tr>
          <tr>
            <td>
              <code>classes_resources</code>
            </td>
            <td>Which documents belong to which class.</td>
          </tr>
          <tr>
            <td>
              <code>chunks</code>
            </td>
            <td>
              The retrieval unit. A passage of a document plus its embedding,
              page number and section.
            </td>
          </tr>
          <tr>
            <td>
              <code>messages</code>
            </td>
            <td>
              Every conversation turn, including tool calls and tool results.
            </td>
          </tr>
          <tr>
            <td>
              <code>generated_exams</code>
            </td>
            <td>Exams the model has produced, stored as JSON for redelivery.</td>
          </tr>
        </tbody>
      </table>

      <h3 id="how-they-relate">How they relate</h3>
      <pre>
        <code>{`subject  ──1:N──  class  ──N:M──  user      (via teachers_classes)
                   │
                   └──N:M──  resource  ──1:N──  chunk

user  ──1:N──  message
user  ──1:N──  generated_exam`}</code>
      </pre>
      <p>
        Deletes cascade throughout, with one exception noted at the bottom of
        this page.
      </p>

      <h2 id="messages-are-not-just-text">Messages are not just text</h2>
      <p>
        A single exchange can write several rows. The assistant message that
        requests a tool, one row per tool result, and the final answer are all
        stored.
      </p>
      <p>
        The column that decides what a teacher actually saw is{" "}
        <code>is_present_in_conversation</code>. The raw model output is stored
        with that flag off and a rendered copy is stored with it on, so
        citations and exam markers are expanded in what is displayed but the
        original is kept. Any interface reading this table should filter on that
        flag.
      </p>
      <p>
        <code>source_chunk_ids</code> records which textbook passages backed an
        answer, which is what makes citations possible.
      </p>

      <h2 id="retrieval">Retrieval</h2>
      <p>
        Embeddings are stored in the <code>chunks</code> table using pgvector,
        as a 1024 dimension column with an HNSW index using cosine distance.
        Search is an ordinary query ordered by cosine distance, so there is no
        separate vector database to run.
      </p>

      <Callout type="warning" title="The embedding dimension is hard-coded">
        <p>
          The column is fixed at 1024, which matches the multilingual and BAAI
          sample data. The repository also ships an OpenAI sample file at 1536
          dimensions, and it will not load.
        </p>
        <p>
          To change embedding model you have to edit the column definition in{" "}
          <code>app/database/models.py</code>, write a migration to alter the
          column, and re-embed every chunk. No such migration exists yet.
        </p>
      </Callout>

      <h2 id="enums-live-in-the-database">Enums live in the database</h2>
      <p>
        States, roles, subjects, grade levels and chunk types are all Postgres
        enum types rather than plain strings. This is worth knowing before you
        change one, because Alembic does not detect new enum values
        automatically. See{" "}
        <a href="/guide/developers/operations/database">
          Database &amp; Migrations
        </a>
        .
      </p>

      <h2 id="sharp-edges">Sharp edges</h2>
      <ul>
        <li>
          <code>generated_exams.class_id</code> is indexed but has no foreign
          key, so deleting a class leaves orphaned exam rows.
        </li>
        <li>
          <code>users.updated_at</code> is not nullable and has no database
          default. It is populated by the ORM, so raw SQL inserts must set it.
        </li>
        <li>
          A <code>Section</code> model exists in the file but is commented out.
          It is not part of the schema.
        </li>
        <li>
          The re-embedding script creates a <code>chunks_tmp_reembed</code>{" "}
          table that Alembic does not know about and a reset does not drop.
        </li>
      </ul>
    </>
  );
}

import { Callout, GuideHeading } from "@/components/guide/content";

export default function ConductAndSecurityPage() {
  return (
    <>
      <GuideHeading
        eyebrow="Contributing"
        title="Conduct & Security"
        description="How the community expects people to behave, and how to report a vulnerability without publishing it."
      />

      <h2 id="code-of-conduct">Code of conduct</h2>
      <p>
        Twiga adopts the{" "}
        <a
          href="https://www.contributor-covenant.org/version/2/0/code_of_conduct/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Contributor Covenant, version 2.0
        </a>
        . Contributing means agreeing to it. In short: be welcoming, accept
        criticism gracefully, and assume good faith.
      </p>
      <p>
        It applies in the repository, on Discord, and anywhere someone is
        representing the project in public.
      </p>

      <h3 id="reporting">Reporting</h3>
      <p>
        Email <code>dev@ai.or.tz</code>. Reports are handled privately and the
        maintainers are obliged to protect the identity of whoever reports.
      </p>
      <p>
        Enforcement escalates through four steps depending on severity and
        repetition: a private correction, a warning, a temporary ban, then a
        permanent one.
      </p>

      <h2 id="reporting-a-vulnerability">Reporting a vulnerability</h2>
      <Callout type="warning" title="Do not open a public issue">
        Security problems go by email, not through the issue tracker. Email{" "}
        <code>Victormag24@gmail.com</code> with the details.
      </Callout>

      <p>Include three things:</p>
      <table>
        <thead>
          <tr>
            <th>Field</th>
            <th>What to write</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Project</td>
            <td>The repository URL.</td>
          </tr>
          <tr>
            <td>Public</td>
            <td>
              Whether this has been discussed publicly anywhere, and if so
              where.
            </td>
          </tr>
          <tr>
            <td>Description</td>
            <td>
              Precise detail. What the flaw is, how to reproduce it, what it
              lets an attacker do.
            </td>
          </tr>
        </tbody>
      </table>

      <h3 id="what-to-expect">What to expect</h3>
      <ul>
        <li>A decision within a few weeks.</li>
        <li>
          You will be emailed at the same time as the public announcement.
        </li>
        <li>
          You can ask for a patched release before the announcement, though it
          is not guaranteed.
        </li>
        <li>Keep the report confidential until it is public.</li>
      </ul>
      <p>
        There is no supported versions policy and no private advisory route
        configured on GitHub, so email is the only channel.
      </p>

      <h2 id="handling-secrets">Handling secrets</h2>
      <p>
        Secret scanning runs in CI, but only on branches in the main repository,
        not on pull requests from forks. Do not rely on it to catch a mistake.
      </p>
      <ul>
        <li>
          <code>.env</code> is ignored by git. Keep it that way and never commit
          a filled-in copy.
        </li>
        <li>
          Alembic prints your database URL, password included, on every run.
          Redact command output before pasting it into an issue.
        </li>
        <li>
          If you do commit a credential, rotate it. Removing the commit does not
          help once it has been pushed.
        </li>
      </ul>
    </>
  );
}

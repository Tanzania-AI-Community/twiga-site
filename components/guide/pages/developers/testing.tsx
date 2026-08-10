import { Callout, GuideHeading } from "@/components/guide/content";

export default function TestingPage() {
  return (
    <>
      <GuideHeading
        eyebrow="Contributing"
        title="Testing & Checks"
        description="Two commands reproduce everything CI runs on your pull request."
      />

      <pre>
        <code>{`PYTHONPATH=. pytest -v tests/
pre-commit run --all-files`}</code>
      </pre>

      <h2 id="tests">Tests</h2>
      <p>
        The suite is plain pytest. Async mode is automatic, so async tests need
        no decorator.
      </p>
      <pre>
        <code>{`PYTHONPATH=. pytest -v tests/                              # everything
PYTHONPATH=. pytest -v tests/services/test_flow_service.py # one file
PYTHONPATH=. pytest -v tests/services/test_flow_service.py::test_name
PYTHONPATH=. pytest -v -k "flow"                           # by name`}</code>
      </pre>

      <h3 id="layout">Layout</h3>
      <table>
        <thead>
          <tr>
            <th>Directory</th>
            <th>Covers</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>tests/clients/</code>
            </td>
            <td>The WhatsApp client and both LLM clients.</td>
          </tr>
          <tr>
            <td>
              <code>tests/services/</code>
            </td>
            <td>
              Routing, state, messaging, flows, citations and exam delivery.
            </td>
          </tr>
          <tr>
            <td>
              <code>tests/database/</code>
            </td>
            <td>Message helpers, with the database mocked out.</td>
          </tr>
          <tr>
            <td>
              <code>tests/tools/</code>
            </td>
            <td>Individual tools.</td>
          </tr>
          <tr>
            <td>
              <code>tests/crons/</code>
            </td>
            <td>The reminder job.</td>
          </tr>
        </tbody>
      </table>

      <Callout type="note" title="You need a .env even though no test touches a database">
        Configuration is validated when the application is imported, so a
        missing required variable fails collection before any test runs. Any
        syntactically valid <code>DATABASE_URL</code> satisfies it. There are no
        fixtures that create a schema and no test database anywhere.
      </Callout>

      <h2 id="formatting-and-linting">Formatting and linting</h2>
      <p>
        Handled entirely by pre-commit. There is no <code>make lint</code> and
        no separate format command.
      </p>
      <table>
        <thead>
          <tr>
            <th>Hook</th>
            <th>Enforces</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>black</td>
            <td>Formatting, on defaults.</td>
          </tr>
          <tr>
            <td>ruff</td>
            <td>Lint plus import ordering, with autofix.</td>
          </tr>
          <tr>
            <td>check-toml, check-yaml</td>
            <td>Those files parse.</td>
          </tr>
          <tr>
            <td>detect-private-key</td>
            <td>No committed private keys.</td>
          </tr>
          <tr>
            <td>end-of-file-fixer, trailing-whitespace</td>
            <td>Whitespace hygiene.</td>
          </tr>
        </tbody>
      </table>
      <p>
        Both black and ruff rewrite files, and a rewritten file fails the
        commit. Stage the changes and commit again. The configuration stops at
        the first failing hook, so fixing one may reveal another.
      </p>
      <p>
        There is no type checking in this project. No mypy, no pyright, no CI
        step.
      </p>

      <h2 id="things-that-look-like-tests-and-are-not">Things that look like tests and are not</h2>
      <ul>
        <li>
          <code>tests/llm_client_tests.py</code> does not match the naming
          pattern pytest collects, so it never runs despite containing real
          tests.
        </li>
        <li>
          Several files named <code>test_*.py</code> live under{" "}
          <code>scripts/</code>. They are outside the configured test paths and
          are development utilities rather than suite members.
        </li>
        <li>
          <code>docs/en/CONTRIBUTING.md</code> says running the tests is not yet
          possible. It is; that line predates the suite.
        </li>
      </ul>
    </>
  );
}

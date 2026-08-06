import { Callout, GuideHeading, Step, Steps } from "@/components/guide/content";

export default function HowToContributePage() {
  return (
    <>
      <GuideHeading
        eyebrow="Contributing"
        title="How to Contribute"
        description="Twiga is built by volunteers. The workflow is a standard fork and pull request, with two conventions worth reading first."
      />

      <h2 id="before-you-write-code">Before you write code</h2>
      <p>
        There is no curated list of starter issues and no{" "}
        <code>good first issue</code> label. The fastest way in is the{" "}
        <code>tech-support</code> channel on the{" "}
        <a
          href="https://discord.gg/bCe2HfZY2C"
          target="_blank"
          rel="noopener noreferrer"
        >
          Discord
        </a>
        , where you can ask what needs doing. For anything larger, open a{" "}
        <a
          href="https://github.com/Tanzania-AI-Community/twiga/discussions"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub discussion
        </a>{" "}
        before building it.
      </p>

      <h2 id="the-workflow">The workflow</h2>
      <Steps>
        <Step title="Fork the repository">
          When forking, <strong>uncheck the option to copy only the main
          branch</strong>. Work happens on <code>development</code>, and without
          it you will not have that branch.
        </Step>
        <Step title="Branch from development">
          <pre>
            <code>{`git checkout development
git checkout -b feature/your-feature-name`}</code>
          </pre>
        </Step>
        <Step title="Set up the hooks">
          <pre>
            <code>{`uv sync
source .venv/bin/activate
pre-commit install`}</code>
          </pre>
          This is what keeps formatting arguments out of code review.
        </Step>
        <Step title="Commit in the house style">
          <pre>
            <code>git commit -m &quot;feat(tools): add exam export tool&quot;</code>
          </pre>
        </Step>
        <Step title="Open the pull request against development">
          Never against <code>main</code>. Pull requests to{" "}
          <code>main</code> are not accepted.
        </Step>
      </Steps>

      <h2 id="branch-names">Branch names</h2>
      <table>
        <thead>
          <tr>
            <th>Prefix</th>
            <th>For</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>feature/</code>
            </td>
            <td>New functionality.</td>
          </tr>
          <tr>
            <td>
              <code>fix/</code>
            </td>
            <td>Bug fixes.</td>
          </tr>
          <tr>
            <td>
              <code>refactor/</code>
            </td>
            <td>Changes with no behaviour difference.</td>
          </tr>
          <tr>
            <td>
              <code>chore/</code>
            </td>
            <td>Maintenance, dependencies, tooling.</td>
          </tr>
          <tr>
            <td>
              <code>hotfix/</code>
            </td>
            <td>Urgent production fixes. Branched from main, maintainers only.</td>
          </tr>
          <tr>
            <td>
              <code>release/</code>
            </td>
            <td>
              Version branches, named <code>release/0.3.0</code> with no{" "}
              <code>v</code>.
            </td>
          </tr>
        </tbody>
      </table>
      <p>
        Nothing enforces this, and the history contains plenty of exceptions.
        Follow it anyway.
      </p>

      <h2 id="commit-messages">Commit messages</h2>
      <p>Conventional Commits:</p>
      <pre>
        <code>{`type(scope): description

[optional body]

[optional footer]`}</code>
      </pre>
      <p>
        Types are <code>feat</code>, <code>fix</code>, <code>docs</code>,{" "}
        <code>style</code>, <code>refactor</code>, <code>test</code> and{" "}
        <code>chore</code>. The description is a short imperative phrase. Real
        examples from the repository:
      </p>
      <pre>
        <code>{`feat(knowledge-graph): implement new node linking algorithm
fix(api): resolve race condition in concurrent request handling
docs(readme): update API usage examples
feat(api)!: revise authentication mechanism`}</code>
      </pre>
      <p>
        A <code>!</code> after the scope marks a breaking change, and should be
        paired with a <code>BREAKING CHANGE:</code> footer explaining what
        breaks.
      </p>

      <Callout type="note" title="Two documents disagree on this">
        <code>docs/en/CONTRIBUTING.md</code> shows{" "}
        <code>[type]: message</code> with square brackets. Follow{" "}
        <code>docs/en/GIT_GUIDELINES.md</code> instead, which is the detailed
        specification, matches the tooling configuration, and matches actual
        commit history. Nothing lints the format either way.
      </Callout>

      <h2 id="what-ci-checks">What CI checks</h2>
      <p>On every pull request:</p>
      <table>
        <thead>
          <tr>
            <th>Check</th>
            <th>What runs</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>pre-commit</td>
            <td>
              Every hook against the whole repository, not just your changes.
            </td>
          </tr>
          <tr>
            <td>tests</td>
            <td>
              <code>PYTHONPATH=. pytest -v tests/</code> on Python 3.12.
            </td>
          </tr>
          <tr>
            <td>secret scan</td>
            <td>
              Skipped on pull requests from forks, which is the normal
              contributor path.
            </td>
          </tr>
        </tbody>
      </table>
      <p>
        Because the hooks run repository-wide in CI, a pull request can fail on
        a file you never touched. Run <code>pre-commit run --all-files</code>{" "}
        locally to reproduce it. See{" "}
        <a href="/guide/developers/contributing/testing">Testing &amp; Checks</a>
        .
      </p>

      <h2 id="review">Review</h2>
      <ul>
        <li>Every pull request needs at least one other developer to approve.</li>
        <li>CI has to pass before merge.</li>
        <li>
          Keep pull requests small and single purpose. Describe what changed and
          link the issue.
        </li>
        <li>
          Rebase your branch on <code>development</code> to stay current, but
          never rebase a branch someone else is working from.
        </li>
        <li>The branch is deleted after merge.</li>
      </ul>

      <Callout type="tip" title="Stale documentation is a real contribution">
        This guide was written by reading the code and the repository
        documentation side by side, and they disagree in a dozen places. Those
        are small, self-contained pull requests, and they save the next person
        the same confusion.
      </Callout>
    </>
  );
}

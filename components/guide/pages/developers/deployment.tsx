import { Callout, GuideHeading, Step, Steps } from "@/components/guide/content";

export default function DeploymentPage() {
  return (
    <>
      <GuideHeading
        eyebrow="Operations"
        title="Deployment"
        description="How code reaches production upstream, and what you need to get right if you run your own instance."
      />

      <h2 id="the-shape-of-it">The shape of it</h2>
      <p>
        One container running the FastAPI app on port 8000. Postgres is managed
        elsewhere, Redis is optional and external. There is no production
        Compose file; the deploy image is{" "}
        <code>docker/deploy/Dockerfile</code>, which is the development image
        without hot reload.
      </p>

      <h2 id="how-a-release-ships">How a release ships</h2>
      <Steps>
        <Step title="Merge to development">
          Pull requests target <code>development</code>. When one merges, CI
          runs and then calls a deploy hook for the staging service.
        </Step>
        <Step title="Cut a release branch">
          <pre>
            <code>./scripts/ci/create-release.sh 0.3.0</code>
          </pre>
          This branches from <code>development</code>, bumps the version in{" "}
          <code>pyproject.toml</code>, optionally updates the contributor list,
          and opens a pull request back into <code>development</code>.
        </Step>
        <Step title="Merge the release pull request">
          Merging a branch named <code>release/*</code> triggers automation that
          merges <code>development</code> into <code>main</code>, generates a
          changelog, tags the version and publishes a GitHub release.
        </Step>
        <Step title="Production deploys itself">
          The push to <code>main</code> fires the production deploy hook.
        </Step>
      </Steps>
      <p>
        Name release branches <code>release/0.3.0</code>, without a{" "}
        <code>v</code>. The tag is created by adding one, so{" "}
        <code>release/v0.3.0</code> would produce a tag of{" "}
        <code>vv0.3.0</code>.
      </p>

      <Callout type="note" title="The hosting configuration is not in the repository">
        The deploy step is a single call to a deploy hook. Which Dockerfile is
        built, what environment variables are set, and how migrations are
        applied are all configured in the hosting dashboard, not in version
        control. There is no <code>render.yaml</code> or equivalent. Cloning
        the repository is not enough to reproduce the production environment.
      </Callout>

      <h2 id="running-your-own-instance">Running your own instance</h2>
      <p>
        The application is MIT licensed and self-hostable. Anything that can run
        a container will do. Work through this list before you point a real
        phone number at it.
      </p>

      <h3 id="security">Security</h3>
      <ul>
        <li>
          <strong>
            <code>MOCK_WHATSAPP</code> must be false.
          </strong>{" "}
          Both templates ship it as true. Left on, it disables webhook signature
          verification and exposes an unauthenticated endpoint that accepts
          messages claiming to be from any user. This is the single most
          important line in your configuration.
        </li>
        <li>
          <strong>Terminate TLS in front of the app.</strong> It serves plain
          HTTP and the repository contains no proxy or certificate handling.
          Meta requires HTTPS.
        </li>
        <li>
          <strong>
            <code>/metrics</code> has no authentication.
          </strong>{" "}
          If the service is public, so are your metrics. Restrict it at the
          proxy.
        </li>
        <li>
          <strong>Inject secrets as real environment variables</strong> or point{" "}
          <code>TWIGA_ENV</code> at a mounted file. Do not bake an{" "}
          <code>.env</code> into an image.
        </li>
      </ul>

      <h3 id="configuration">Configuration</h3>
      <ul>
        <li>
          Set <code>ENVIRONMENT=production</code>. Below that value, Redis never
          connects, rate limiting is skipped, welcome templates are not sent,
          and unknown numbers are turned into test accounts.
        </li>
        <li>
          Set all four rate limit variables. Three of them are in neither
          template, and missing any one silently disables enforcement.
        </li>
        <li>
          Enable pgvector on the managed database. The extension is not created
          by any migration.
        </li>
        <li>
          If you are not using the provided Dockerfile, install{" "}
          <code>fontconfig</code> and <code>libgraphite2-3</code>, which LaTeX
          rendering needs.
        </li>
      </ul>

      <h3 id="migrations">Migrations</h3>
      <p>
        Nothing applies them for you. Neither the image nor application startup
        runs Alembic, so <code>alembic upgrade head</code> is a deliberate step
        in your deploy process. Startup only checks that the database answers.
      </p>

      <h3 id="scheduled-jobs">Scheduled jobs</h3>
      <p>
        Three jobs in <code>scripts/crons/</code> approve users, mark them
        inactive and send re-engagement reminders. Nothing in the repository
        schedules them; you need an external scheduler. Without one, approvals
        never complete. See{" "}
        <a href="/guide/developers/operations/monitoring">Monitoring</a>.
      </p>

      <Callout type="warning" title="Rate limiting fails open">
        If Redis is unreachable, requests are not blocked. They pass through,
        and any user currently limited is reset to active. Model inference costs
        money, so do not treat rate limiting as your only spend control.
      </Callout>

      <h3 id="before-you-scale-out">Before you scale out</h3>
      <p>
        The repository assumes one process. There is no worker count, no
        gunicorn, no autoscaling configuration. Two things break or degrade with
        multiple replicas:
      </p>
      <ul>
        <li>
          Prometheus counters are per process, so each replica reports its own
          series and the scrape configuration expects a single target.
        </li>
        <li>
          The scheduled jobs take no lock. Two schedulers means duplicate
          messages to real teachers.
        </li>
      </ul>
      <p>
        Rate limiting itself is Redis backed and scales fine, as does the
        request path.
      </p>
    </>
  );
}

import { Callout, GuideHeading } from "@/components/guide/content";

export default function MonitoringPage() {
  return (
    <>
      <GuideHeading
        eyebrow="Operations"
        title="Monitoring"
        description="What the service reports about itself, the dashboards that read it, and the scheduled jobs that keep accounts moving."
      />

      <h2 id="metrics">Metrics</h2>
      <p>
        The app exposes Prometheus metrics at <code>/metrics</code>. Alongside
        the standard HTTP request counters and latency histograms, it records
        five of its own:
      </p>
      <table>
        <thead>
          <tr>
            <th>Metric</th>
            <th>Labels</th>
            <th>Records</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>twiga_whatsapp_webhook_requests_total</code>
            </td>
            <td>event</td>
            <td>
              Incoming webhooks by classification, including the ones dropped as
              outdated.
            </td>
          </tr>
          <tr>
            <td>
              <code>twiga_llm_calls_total</code>
            </td>
            <td>provider, model, outcome</td>
            <td>Model calls and whether they succeeded.</td>
          </tr>
          <tr>
            <td>
              <code>twiga_llm_latency_seconds</code>
            </td>
            <td>provider, model</td>
            <td>
              How long inference takes, bucketed from a quarter second to
              sixteen.
            </td>
          </tr>
          <tr>
            <td>
              <code>twiga_ratelimit_hits_total</code>,{" "}
              <code>twiga_ratelimit_blocks_total</code>
            </td>
            <td>scope</td>
            <td>Rate limit checks and blocks, per user and globally.</td>
          </tr>
          <tr>
            <td>
              <code>twiga_messages_generated_total</code>
            </td>
            <td>feature</td>
            <td>Replies sent, split by what produced them.</td>
          </tr>
        </tbody>
      </table>

      <h3 id="health">Health</h3>
      <p>
        <code>GET /health</code> returns <code>OK</code> and nothing else. It
        does not check the database, Redis or the model provider, so it is a
        liveness probe only. A healthy response does not mean the service can
        answer a message.
      </p>

      <h2 id="running-the-dashboards-locally">Running the dashboards locally</h2>
      <pre>
        <code>docker compose -f monitoring/docker-compose.monitoring.yml up</code>
      </pre>
      <table>
        <thead>
          <tr>
            <th>Service</th>
            <th>Address</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Prometheus</td>
            <td>
              <code>localhost:9090</code>
            </td>
            <td>Scrapes the app every thirty seconds.</td>
          </tr>
          <tr>
            <td>Grafana</td>
            <td>
              <code>localhost:4000</code>
            </td>
            <td>
              Log in with <code>admin</code> and <code>admin</code> locally.
            </td>
          </tr>
        </tbody>
      </table>
      <p>
        Two dashboards are provisioned: <strong>FastAPI Overview</strong> for
        request rate, latency quantiles and error rate, and{" "}
        <strong>LLM Performance</strong> for call rate by outcome, inference
        latency and messages generated.
      </p>
      <p>
        Two alert rules ship as well, on sustained 5xx rate and on slow
        requests. There is no Alertmanager in the compose file, so they
        evaluate but have nowhere to send anything.
      </p>

      <Callout type="warning" title="The monitoring README is out of date in four places">
        <ul>
          <li>
            It tells you to edit{" "}
            <code>monitoring/prometheus/prometheus.yml</code>. That file does
            not exist. The configuration is generated at container start, so
            edits would be overwritten. To retarget, set{" "}
            <code>TWIGA_LOCAL_TARGET</code>, or set{" "}
            <code>ENVIRONMENT=production</code> along with{" "}
            <code>TWIGA_INTERNAL_HOST</code>.
          </li>
          <li>
            It cites a checked-in Grafana datasource file. That is also
            generated at startup.
          </li>
          <li>
            It says anonymous viewing is enabled. The compose file disables it.
          </li>
          <li>
            The root README promises three dashboards including one for Redis.
            There are two, and no Redis dashboard exists.
          </li>
        </ul>
      </Callout>

      <h2 id="logs">Logs</h2>
      <p>
        There is no central logging configuration and no log level variable.
        Every module uses a standard logger and output goes to stdout through
        uvicorn.
      </p>
      <p>Startup tells you most of what you want to know:</p>
      <pre>
        <code>{`Database initialized successfully
Redis initialized successfully        (production and staging only)
Starting with mock whatsapp enabled   (a warning, and a red flag in production)
Using LLM Provider: ...
Application startup completed`}</code>
      </pre>

      <h2 id="scheduled-jobs">Scheduled jobs</h2>
      <p>
        Three standalone scripts, each runnable by hand and each writing to its
        own log file in <code>/tmp</code>. Nothing in the repository schedules
        them. The suggested timings below come from comments in the scripts
        themselves.
      </p>
      <table>
        <thead>
          <tr>
            <th>Script</th>
            <th>Suggested</th>
            <th>What it does</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>approve_users_cron.py</code>
            </td>
            <td>every 5 minutes</td>
            <td>
              Sends the welcome template to newly approved users and activates
              them.
            </td>
          </tr>
          <tr>
            <td>
              <code>mark_inactive_users_cron.py</code>
            </td>
            <td>hourly</td>
            <td>Marks users inactive after a day of silence by default.</td>
          </tr>
          <tr>
            <td>
              <code>send_reminder_messages_cron.py</code>
            </td>
            <td>daily at 09:00</td>
            <td>
              Sends a re-engagement template to users quiet for a week, with a
              week of cooldown.
            </td>
          </tr>
        </tbody>
      </table>
      <pre>
        <code>uv run python scripts/crons/approve_users_cron.py</code>
      </pre>
      <p>
        Each exits with a non-zero status if any individual item failed, so a
        failure means at least one user was not processed, not that nothing
        happened.
      </p>

      <Callout type="note" title="Reminder settings are hard-coded">
        The seven day silence threshold, the seven day cooldown and the two
        message templates are constants in the script rather than
        configuration. The templates are English only, and both must be
        approved by Meta for your number or every send fails.
      </Callout>
    </>
  );
}

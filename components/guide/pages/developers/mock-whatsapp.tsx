import { Callout, GuideHeading, Step, Steps } from "@/components/guide/content";

export default function MockWhatsAppPage() {
  return (
    <>
      <GuideHeading
        eyebrow="Getting Started"
        title="Mock WhatsApp"
        description="Chat with your local bot in a browser tab. No Meta account, no phone number, no tunnel."
      />

      <p>
        Getting a WhatsApp Business account approved takes time you probably do
        not want to spend before your first commit. The mock interface is a
        small web app that looks like WhatsApp and talks to your local API
        instead of Meta.
      </p>

      <h2 id="how-it-works">How it works</h2>
      <p>Two pieces, wired in opposite directions.</p>
      <ul>
        <li>
          <strong>You to the bot:</strong> the mock app posts a hand-built
          webhook payload to <code>POST /devhooks</code> on your API. That
          endpoint exists only when <code>MOCK_WHATSAPP</code> is on.
        </li>
        <li>
          <strong>The bot to you:</strong> nothing is sent over HTTP. With the
          mock flag on, every outbound call to Meta becomes a no-op. Replies
          reach the interface because the API writes them to the{" "}
          <code>messages</code> table, and the mock app polls that table
          directly every two seconds.
        </li>
      </ul>
      <p>
        That is why the mock app needs your database URL as well as your API
        URL. It is a reader of Twiga&apos;s own database, not a WhatsApp
        emulator.
      </p>

      <h2 id="set-it-up">Set it up</h2>
      <Steps>
        <Step title="Turn on mock mode in Twiga">
          In your <code>.env</code>:
          <pre>
            <code>MOCK_WHATSAPP=True</code>
          </pre>
          Then restart the API. Settings are read once at import, so an edit
          without a restart does nothing. You should see{" "}
          <code>Starting with mock whatsapp enabled</code> in the logs.
        </Step>
        <Step title="Clone and install the mock interface">
          It lives in its own repository.
          <pre>
            <code>{`git clone https://github.com/Tanzania-AI-Community/mock-whatsapp.git
cd mock-whatsapp
pnpm install`}</code>
          </pre>
          It is a Next.js app and needs Node 18 or newer.
        </Step>
        <Step title="Point it at your stack">
          Create a <code>.env</code> in the mock repository:
          <pre>
            <code>{`DATABASE_URL=postgresql://postgres:your_password@localhost:5432/twiga_db
CHATBOT_CALLBACK_URL=http://0.0.0.0:8000/devhooks`}</code>
          </pre>
          Note the differences from Twiga&apos;s own <code>.env</code>: the host
          is <code>localhost</code>, because this app runs outside Docker, and
          the callback path is <code>/devhooks</code>, not{" "}
          <code>/webhooks</code>.
        </Step>
        <Step title="Run it">
          <pre>
            <code>pnpm run dev</code>
          </pre>
          Open <code>http://localhost:3000</code> and send a message.
        </Step>
      </Steps>

      <Callout type="note" title="The README in the mock repo has a stale URL">
        It shows a placeholder callback of{" "}
        <code>http://localhost:3001/api/webhook</code>, which is not a Twiga
        endpoint. Use the value above, which matches the{" "}
        <code>.example.env</code> in that repository and the route in{" "}
        <code>app/main.py</code>.
      </Callout>

      <h2 id="your-first-message-creates-a-teacher-for-you">Your first message creates a teacher for you</h2>
      <p>
        When an unknown number messages Twiga outside production, the app skips
        onboarding and creates a ready-made user: an active teacher who teaches
        Geography, Form 2. This is keyed on <code>ENVIRONMENT</code>, not on the
        mock flag.
      </p>
      <p>
        That dummy user depends on the Geography class existing, which is what{" "}
        <code>make generate-local-data</code> creates. If you skipped seeding,
        your first message fails.
      </p>

      <h2 id="what-the-mock-cannot-do">What the mock cannot do</h2>
      <p>
        Worth knowing before you file a bug against something that is not
        broken.
      </p>
      <table>
        <thead>
          <tr>
            <th>Not available</th>
            <th>Why</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>WhatsApp Flows</td>
            <td>
              Flow messages are no-ops, so onboarding and the{" "}
              <code>settings</code> menu options dead-end.
            </td>
          </tr>
          <tr>
            <td>Images and PDFs</td>
            <td>
              Exam and LaTeX delivery report success but send nothing. Rendered
              images are written to local disk instead.
            </td>
          </tr>
          <tr>
            <td>Template messages</td>
            <td>Approval and reminder templates cannot be exercised.</td>
          </tr>
          <tr>
            <td>Buttons and list replies</td>
            <td>
              The mock only sends plain text. To test interactive replies, post
              JSON to <code>/devhooks</code> yourself.
            </td>
          </tr>
          <tr>
            <td>Multiple users</td>
            <td>
              Every message is sent as the same number, and the view is not
              filtered by user, so all conversations appear in one thread.
            </td>
          </tr>
          <tr>
            <td>Rate limiting</td>
            <td>Redis only starts in production and staging.</td>
          </tr>
          <tr>
            <td>Signature verification</td>
            <td>
              Skipped entirely in mock mode, so a broken HMAC implementation
              will not show up here.
            </td>
          </tr>
        </tbody>
      </table>
      <p>
        The interface also hides some rows on purpose. It shows only user and
        assistant messages that are marked as visible, so it is a view of the
        conversation, not a debugger for the model transcript. Read the{" "}
        <code>messages</code> table directly for that.
      </p>

      <Callout type="warning" title="Never enable this in a deployment">
        <code>MOCK_WHATSAPP=True</code> does more than redirect traffic. It
        disables signature verification on <code>/webhooks</code> and{" "}
        <code>/flows</code> as well, and it opens{" "}
        <code>/devhooks</code>, which has no authentication of any kind. Anyone
        who can reach the service could send messages as any user. Both{" "}
        <code>.env</code> templates ship with the flag on, so check it before
        you deploy.
      </Callout>
    </>
  );
}

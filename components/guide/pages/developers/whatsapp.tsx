import { Callout, GuideHeading, Step, Steps } from "@/components/guide/content";

export default function ConnectWhatsAppPage() {
  return (
    <>
      <GuideHeading
        eyebrow="Getting Started"
        title="Connecting Real WhatsApp"
        description="Message your local bot from your own phone, using a free Meta test number and a tunnel."
      />

      <p>
        Meta gives every new app a test number that can message up to five
        recipients. That is enough to develop against the real API. Your machine
        needs to be reachable from the internet, which is what ngrok is for.
      </p>

      <Callout type="note" title="You may not need this">
        For everyday development the{" "}
        <a href="/guide/developers/getting-started/mock-whatsapp">
          mock interface
        </a>{" "}
        is faster and has no approval step. Come here when you are working on
        webhook handling, media delivery, templates or Flows, which the mock
        cannot exercise.
      </Callout>

      <h2 id="create-the-meta-app">Create the Meta app</h2>
      <Steps>
        <Step title="Make a developer account and a business app">
          Sign up at{" "}
          <a
            href="https://developers.facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            developers.facebook.com
          </a>{" "}
          and create an app of type <strong>Business</strong>. On the dashboard,
          press <strong>Set up</strong> under the WhatsApp box to attach the
          WhatsApp and Webhooks products.
        </Step>
        <Step title="Copy the app credentials">
          From <strong>App settings, Basic</strong>:
          <pre>
            <code>{`META_APP_ID=your_app_id
META_APP_SECRET=your_app_secret
META_API_VERSION=v22.0`}</code>
          </pre>
          The app secret is what verifies that incoming webhooks really came
          from Meta.
        </Step>
        <Step title="Copy the number and generate a token">
          From <strong>WhatsApp, API Setup</strong>, select the test number and
          copy its phone number ID. Press{" "}
          <strong>Generate access token</strong> for a 24 hour token.
          <pre>
            <code>{`WHATSAPP_CLOUD_NUMBER_ID=your_phone_number_id
WHATSAPP_API_TOKEN=your_access_token`}</code>
          </pre>
          A 24 hour token is fine for an afternoon. For anything longer, create
          a system user token instead.
        </Step>
        <Step title="Add your phone as a recipient">
          Still on the API Setup page, add your own number, then send yourself
          the test template message.
          <strong>
            {" "}
            You must reply to that message from your phone.
          </strong>{" "}
          Until you do, Meta only lets the app send templates, not ordinary
          replies.
        </Step>
      </Steps>

      <h2 id="expose-your-local-server">Expose your local server</h2>
      <p>
        Meta needs a public HTTPS URL. Create a free static domain in the ngrok
        dashboard under <strong>Domains</strong>, then:
      </p>
      <pre>
        <code>{`ngrok config add-authtoken YOUR_AUTHTOKEN
ngrok http 8000 --domain your-domain.ngrok-free.app`}</code>
      </pre>
      <p>
        Leave that running. Port 8000 is what the API container publishes.
      </p>

      <h2 id="point-meta-at-your-tunnel">Point Meta at your tunnel</h2>
      <Steps>
        <Step title="Invent a verify token">
          Any string will do. It is a shared secret used once, during the
          handshake.
          <pre>
            <code>{`WHATSAPP_VERIFY_TOKEN=some_random_string
MOCK_WHATSAPP=False`}</code>
          </pre>
          Restart the API so it picks up the changes.
        </Step>
        <Step title="Fill in the webhook">
          In the Meta dashboard go to{" "}
          <strong>WhatsApp, Configuration, Webhook</strong> and set:
          <table>
            <thead>
              <tr>
                <th>Field</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Callback URL</td>
                <td>
                  <code>https://your-domain.ngrok-free.app/webhooks</code>
                </td>
              </tr>
              <tr>
                <td>Verify token</td>
                <td>
                  Exactly your <code>WHATSAPP_VERIFY_TOKEN</code>
                </td>
              </tr>
            </tbody>
          </table>
          The <code>/webhooks</code> suffix is easy to forget and is required.
        </Step>
        <Step title="Verify and subscribe">
          Press <strong>Verify and save</strong>. Meta sends a GET request with
          a challenge, and you should see it in both the ngrok and API logs.
          Then scroll down to <strong>Webhook Fields</strong> and subscribe to{" "}
          <strong>messages</strong>. Without that subscription, verification
          succeeds and no messages ever arrive.
        </Step>
      </Steps>

      <p>Message the test number from your phone. You should get a reply.</p>

      <h2 id="reading-the-failures">Reading the failures</h2>
      <table>
        <thead>
          <tr>
            <th>What you see</th>
            <th>What it means</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>403</code> during verification
            </td>
            <td>
              The verify token in the dashboard does not match your{" "}
              <code>.env</code>. Restarting the API after editing it is a common
              miss.
            </td>
          </tr>
          <tr>
            <td>
              <code>400</code> during verification
            </td>
            <td>
              Meta did not send the expected parameters. Usually a malformed
              callback URL.
            </td>
          </tr>
          <tr>
            <td>
              <code>403 Invalid signature</code> on messages
            </td>
            <td>
              <code>META_APP_SECRET</code> is wrong. Every incoming webhook is
              checked against it.
            </td>
          </tr>
          <tr>
            <td>Verification passes, no messages arrive</td>
            <td>
              You did not subscribe to the <strong>messages</strong> field.
            </td>
          </tr>
          <tr>
            <td>Messages arrive but nothing happens</td>
            <td>
              Anything older than ten seconds is dropped on purpose. Breakpoints
              and slow tunnels trigger this.
            </td>
          </tr>
          <tr>
            <td>Only template messages get through</td>
            <td>You have not replied to the test template from your phone.</td>
          </tr>
        </tbody>
      </table>

      <Callout type="tip" title="WhatsApp Flows need more than this">
        The onboarding and settings screens use WhatsApp Flows, which require a
        verified business account, an RSA key pair registered with Meta, and the
        flow IDs in your environment. The test number alone will not get you
        there. See{" "}
        <a href="/guide/developers/operations/environment">
          Environment Variables
        </a>{" "}
        for the full list.
      </Callout>
    </>
  );
}

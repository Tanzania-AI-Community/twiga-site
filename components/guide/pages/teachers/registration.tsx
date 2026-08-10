import {
  Callout,
  CardGrid,
  ChatSample,
  GuideCard,
  GuideHeading,
} from "@/components/guide/content";

export default function TeacherRegistrationPage() {
  return (
    <>
      <GuideHeading
        eyebrow="Getting Started"
        title="Registering on WhatsApp"
        description="How to get a Twiga account. You send one message, a person approves you, then you fill two short forms. All of it happens inside WhatsApp."
      />

      <p>
        There is no website and no app to download. You register by sending a
        message to the Twiga WhatsApp number. The number you send from becomes
        your account, so there is no username and no password to remember.
      </p>

      <Callout type="tip" title="Do this on your phone">
        <p>
          Setup uses WhatsApp forms, and forms open in the WhatsApp app. Start
          on your phone and the whole thing takes a couple of minutes.
        </p>
      </Callout>

      <h2 id="send-one-word">Send one word</h2>
      <p>
        Save the Twiga number in your contacts, open the chat and send anything
        at all. One teacher typed a single greeting and that was the whole
        sign-up.
      </p>

      <pre>
        <code>Hello</code>
      </pre>

      <ChatSample
        messages={[
          { from: "teacher", text: "Hello" },
          {
            from: "twiga",
            text: "Thank you for registering! Your account is being reviewed by our team. You'll receive a message once approved. Thank you for your patience!",
          },
        ]}
      />

      <p>
        You are now registered. Nothing else is asked of you at this point.
      </p>

      <h2 id="then-you-wait">Then you wait</h2>
      <p>
        A person on the Twiga team reads your request and approves it. This is
        not automatic, so it is not instant. For the teacher above, the request
        went at 13:50 and the approval came back at 21:37 the same day. That is
        close to eight hours. Plan for hours rather than minutes.
      </p>
      <p>
        The approval arrives as a WhatsApp message. Close the chat and carry on
        with your day. Your phone will tell you when it lands.
      </p>

      <Callout type="note" title="Messaging again does not move you up the queue">
        <p>
          A person still has to approve you, and more messages will not reach
          that person any faster. You also cannot sign up twice, because your
          phone number is the account. Until setup is finished, anything you
          send comes back as the same standard reply.
        </p>
      </Callout>

      <h2 id="reply-with-ok">Reply with ok</h2>
      <p>
        The approval message asks you to reply with one word. It means that word
        exactly.
      </p>

      <ChatSample
        messages={[
          {
            from: "twiga",
            text: "You have been approved 🥳\n\nCongratulations! We approved your request to use Twiga 🦒, your artificially intelligent teaching companion. We support educators teaching the TIE (NECTA) curriculum in Tanzania.\n\nTo get started, please respond to this message with 'ok'.",
          },
          { from: "teacher", text: "ok" },
        ]}
      />

      <pre>
        <code>ok</code>
      </pre>

      <p>
        Two letters, on their own. A greeting or a question here goes to the
        normal chat instead, and setup never starts. Send this reply from your
        phone, because the forms come next.
      </p>

      <h2 id="finish-the-two-forms">Finish the two forms</h2>
      <p>
        Twiga sends two forms, one after the other. The first asks for your
        personal details. The second asks which classes and subjects you teach.
        There is nothing else to fill in.
      </p>

      <ChatSample
        messages={[
          {
            from: "twiga",
            text: "Select the classes you teach 📚\nSelect the classes you teach from each of the subjects below\nPlease follow the instructions.",
          },
        ]}
      />

      <p>
        Tap the form, tick every class and subject you teach, and send it. Twiga
        uses that list to decide which questions it will answer, so it is worth
        a careful minute.
      </p>

      <Callout type="tip" title="Do this part in the WhatsApp app">
        <p>
          The picker is a form, and forms open in the WhatsApp app on your
          phone. If you started on a laptop, open the same chat on your phone
          and tap the form there. Nothing is lost and nothing needs sending
          again.
        </p>
      </Callout>

      <h2 id="you-are-in">You are in</h2>
      <p>
        When the forms are done, Twiga introduces itself and you can start
        asking.
      </p>

      <ChatSample
        messages={[
          {
            from: "twiga",
            text: "Welcome! I'm here to help you with your teaching journey. I'm Twiga 🦒, your teaching assistant. I can help you with questions related to the classes you teach, search the content, and generate exercises you can use in your classes.\n\nTo update your personal or subject information, type 'settings' in the chat.\n\nLet's get started! Just talk to me like a colleague.",
          },
        ]}
      />

      <p>
        That last line is the best advice on this page. You do not need special
        wording. Type the way you would text a colleague in the staff room.
      </p>

      <h2 id="changing-your-details-later">Changing your details later</h2>
      <p>
        Both forms stay open to you. Send the bare word <code>settings</code> in
        the chat at any time. Two buttons come back, one for your personal
        details and one for your classes and subjects.
      </p>

      <pre>
        <code>settings</code>
      </pre>

      <p>
        Teachers change subjects between terms, so you will use this again. The
        subjects form has one trap worth knowing about before you open it, and
        the next page covers it.
      </p>

      <h2 id="if-it-goes-wrong">If it goes wrong</h2>
      <table>
        <thead>
          <tr>
            <th>What you see</th>
            <th>What to do</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Nothing at all after your first message</td>
            <td>
              Check you sent it to the right number. If the chat shows the
              review notice, you are registered and waiting. Approval can take
              hours.
            </td>
          </tr>
          <tr>
            <td>The form bubble says it cannot be displayed</td>
            <td>Open the chat on the WhatsApp phone app and tap it again.</td>
          </tr>
          <tr>
            <td>You replied with something other than ok</td>
            <td>
              Send <code>ok</code> on its own. Nothing is broken.
            </td>
          </tr>
          <tr>
            <td>You finished setup but Twiga refuses your subject</td>
            <td>
              Your profile is probably wrong. Send <code>settings</code> and fix
              the class list.
            </td>
          </tr>
        </tbody>
      </table>

      <CardGrid>
        <GuideCard
          href="/guide/teachers/getting-started/subjects"
          title="Choosing Your Subjects"
          description="Set the classes and forms on your profile, and check that the change actually saved."
        />
        <GuideCard
          href="/guide/teachers/getting-started/quick-start"
          title="Quick Start"
          description="Your first real request, sent between lessons, and the one that follows it."
        />
      </CardGrid>
    </>
  );
}

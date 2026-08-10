import {
  Callout,
  CardGrid,
  ChatSample,
  GuideCard,
  GuideHeading,
  Step,
  Steps,
} from "@/components/guide/content";

export default function TeacherSubjectsPage() {
  return (
    <>
      <GuideHeading
        eyebrow="Getting Started"
        title="Choosing Your Subjects"
        description="Twiga only answers for the subjects and forms saved on your profile. Here is how to set that list, and how to prove it saved."
      />

      <p>
        Your profile holds the classes you teach. Twiga checks it before every
        answer. Ask about a subject that is not on the list and it will refuse,
        politely, and tell you what it does have for you.
      </p>

      <ChatSample
        messages={[
          { from: "teacher", text: "Do you have teaching materials for primary schools?" },
          {
            from: "twiga",
            text: "I currently support only secondary school teachers, specifically for Form 1 and Form 2 subjects in the Tanzanian National Curriculum.\n\nUnfortunately, I do not have materials for primary school levels at this time.",
          },
        ]}
      />

      <p>
        That is why a wrong profile feels like a broken Twiga. The content may be
        there. Twiga just does not think it is yours.
      </p>

      <h2 id="open-the-settings-menu">Open the settings menu</h2>
      <p>
        Send one word. Not a slash, not a sentence, just the word on its own.
      </p>

      <pre>
        <code>settings</code>
      </pre>

      <ChatSample
        messages={[
          { from: "teacher", text: "settings" },
          {
            from: "twiga",
            text: "Welcome to the Settings Menu, please select what you want to update.\nThis is an automatic message 🦒\n\n[ Personal Info ]  [ Classes and Subjects ]",
          },
          { from: "teacher", text: "Classes and Subjects" },
        ]}
      />

      <p>
        Two buttons come back. <strong>Personal Info</strong> is your name and
        school. <strong>Classes and Subjects</strong> is the one that decides
        which questions get answered. Tap the second one and a form opens.
      </p>

      <Callout type="tip" title="Send settings from your phone">
        <p>
          The form opens in the WhatsApp app, so send <code>settings</code> from
          your phone rather than from a laptop. The picker then opens where you
          can tap it.
        </p>
      </Callout>

      <h2 id="tick-everything-you-teach">Tick everything you teach</h2>
      <p>
        This is the part that catches people. The form does not add to your
        profile. It <strong>replaces</strong> it. Whatever you tick becomes the
        whole list, and anything you leave unticked is dropped, even if it was
        saved last term.
      </p>
      <p>
        One teacher had three subjects saved across Form 1 and Form 2. He opened
        the form, ticked Geography for Forms 1 to 4, and sent it. Afterwards his
        profile held Geography and nothing else. The other three subjects were
        gone.
      </p>

      <Callout type="tip" title="Do it in one pass">
        <p>
          Before you send the form, look down the whole list. Tick every subject
          and every form level you teach this term, including the ones that were
          already there.
        </p>
      </Callout>

      <h2 id="nothing-comes-back">Nothing comes back</h2>
      <p>
        When you send the form, Twiga replies with nothing at all. No
        confirmation, no summary, no error. This is a known fault.
      </p>
      <p>
        Silence here does not mean the save failed. Do not sit waiting for a
        reply and do not fill the form again. Check it instead.
      </p>

      <h2 id="check-by-asking">Check by asking</h2>
      <p>
        Asking is the only feedback there is. Type the question in your own
        words and read the answer against your timetable.
      </p>

      <pre>
        <code>what subjects am i teaching?</code>
      </pre>

      <ChatSample
        messages={[
          { from: "teacher", text: "what subjects am i teaching?" },
          {
            from: "twiga",
            text: "You are teaching Geography 🌎 for Form 1, Form 2, Form 3, and Form 4.\n\nLet me know if you'd like support with lesson content, practice questions, or teaching tips for any of these classes!",
          },
        ]}
      />

      <p>
        Read the subjects and read the form levels. Anything missing from that
        sentence is something Twiga will refuse to help you with tomorrow.
      </p>

      <h2 id="if-the-list-is-wrong">If the list is wrong</h2>
      <Steps>
        <Step title="Send settings again">
          There is no limit on how many times you can change it.
        </Step>
        <Step title="Tap Classes and Subjects">
          On your phone, so the form opens.
        </Step>
        <Step title="Tick the full list, not the missing part">
          Remember that it replaces. Ticking only the subject you forgot will
          wipe the ones that were already right.
        </Step>
        <Step title="Ask what you teach">
          Then read it back. Repeat until the sentence matches your timetable.
        </Step>
      </Steps>

      <Callout type="note" title="Which subjects can you pick?">
        <p>
          The form itself is the only reliable answer, and what it offers has
          changed over time. Do not plan around a list you read somewhere else.
          Open the form and look, then confirm with the question above.
        </p>
      </Callout>

      <h2 id="the-other-button">The other button</h2>
      <p>
        Personal Info opens a different form, for your name and school details.
        It has one oddity of its own: Twiga may greet you by a name you never
        typed.
      </p>

      <CardGrid>
        <GuideCard
          href="/guide/teachers/troubleshooting/profile"
          title="Fixing Your Profile"
          description="Change your name and school details, and confirm the change was saved."
        />
        <GuideCard
          href="/guide/teachers/getting-started/quick-start"
          title="Quick Start"
          description="Your profile is set. Now send a request you can use in class today."
        />
      </CardGrid>
    </>
  );
}

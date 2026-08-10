import {
  Callout,
  CardGrid,
  ChatSample,
  GuideCard,
  GuideHeading,
} from "@/components/guide/content";

export default function TeacherFaqPage() {
  return (
    <>
      <GuideHeading
        eyebrow="Getting Started"
        title="Frequently Asked Questions"
        description="Costs, devices, accounts, what it remembers and where to write when it breaks. The questions you will be asked in the staff room before anyone else signs up."
      />

      <h2 id="do-i-need-to-install-anything">Do I need to install anything?</h2>
      <p>
        No. Everything happens in a WhatsApp chat, in the app you already have.
        There is nothing to download and no website to sign in to.
      </p>

      <ChatSample
        messages={[
          {
            from: "teacher",
            text: "hi. before i tell the other teachers about this, do i need to download anything?",
          },
          {
            from: "twiga",
            text: "I'm Twiga, your teaching assistant bot developed by the Tanzania AI Community. Everything happens right here in this chat, there's nothing to install.\n\nI can:\n- Explain concepts from the official TIE textbooks\n- Create NECTA-style practice questions\n- Provide teaching tips and lesson ideas\n\nJust tell me the subject and topic.",
          },
        ]}
      />

      <p>
        One exception. The setup forms only open in the WhatsApp phone app, not
        in WhatsApp Web or Desktop. Everything after setup works anywhere.
      </p>

      <h2 id="what-does-it-cost">What does it cost?</h2>
      <p>
        There is no fee and no subscription. In five months of one
        teacher&apos;s real use there was never a payment prompt or a trial that
        ran out.
      </p>
      <p>
        What you spend is WhatsApp data, at your normal rate. Almost everything
        both ways is text, so it is small. The only heavy items are PDF files,
        such as a mock exam and its marking scheme. Those download only when you
        tap them.
      </p>

      <h2 id="do-i-need-an-account">Do I need an account?</h2>
      <p>
        Your phone number is your account. There is no email address, no
        username and no password. You register by sending one message, and then
        a person on the Twiga team approves you.
      </p>

      <h2 id="can-i-send-a-voice-note">Can I send a voice note or a photo?</h2>
      <p>No. Twiga reads text only. Anything else comes back the same way.</p>

      <ChatSample
        messages={[
          { from: "teacher", text: "[8 second voice note]" },
          { from: "twiga", text: "Sorry, I only understand textual messages." },
        ]}
      />

      <Callout type="warning" title="Do not type your question as a photo caption">
        <p>
          One teacher sent a photo with his question typed in the caption. The
          photo was refused and the caption went with it. Twiga never saw the
          question. Type your question as a message of its own.
        </p>
      </Callout>

      <p>
        Media you send can also sit unread in the chat and get refused much
        later. If a &quot;textual messages&quot; reply turns up out of nowhere,
        it is probably answering an old photo or voice note, not what you just
        typed.
      </p>

      <h2 id="can-i-write-in-kiswahili">Can I write in Kiswahili?</h2>
      <p>
        Yes. Twiga reads English and Kiswahili. Ask in Kiswahili and the answer
        comes back in Kiswahili. One teacher asked for a Book Keeping lesson
        plan on the trial balance in Kiswahili and got the whole plan in
        Kiswahili. Write in whichever language you are quicker in.
      </p>

      <h2 id="does-it-remember">Does it remember what I asked before?</h2>
      <p>
        Inside a conversation, yes. Ask what your last question was and it tells
        you, along with the one before it. That is what lets you say &quot;the
        law you just gave me&quot; instead of typing it all again.
      </p>
      <p>
        It is not a record of your term. Asked for the very first question ever
        sent to it, it failed twice with an error. Treat the chat as a
        conversation, not an archive.
      </p>

      <Callout type="tip" title="Keep what you want to reuse">
        <p>
          Star the message in WhatsApp, or save the PDF to your phone. A lesson
          plan or an exam paper you want again next term should be saved by you,
          not looked up later by asking.
        </p>
      </Callout>

      <h2 id="does-it-know-my-name-and-school">
        Does it know my name and my school?
      </h2>
      <p>
        It knows what is in your profile, and that is what you typed into the
        setup forms. Ask it directly and it will tell you it does not hold your
        personal details, then point you at <code>settings</code>.
      </p>
      <p>
        In practice it may still greet you by a name. One teacher was called
        &quot;Teacher Edgar&quot; and &quot;Mr. Edgar&quot; in a chat where his
        WhatsApp name was something else entirely. If it uses a name that is not
        yours, send <code>settings</code>, open Personal Info and correct it.
      </p>

      <h2 id="which-subjects-and-forms">Which subjects and forms does it cover?</h2>
      <p>
        Secondary school only. Asked directly, it says it covers Book Keeping,
        Mathematics and Physics for Form 1 and Form 2. It has refused a request
        for primary school materials, and another for English Literature.
      </p>
      <p>
        In practice it has also answered Geography requests in full, including
        lesson plans and a whole mock exam. So what it says it covers and what
        it will actually answer do not fully agree. The list on your own profile
        is what governs your chat.
      </p>

      <h2 id="is-it-ever-wrong">Is it ever wrong?</h2>
      <p>
        Yes, and it never sounds wrong. The most common problem is an answer
        drawn from a different form level than the one you asked for.{" "}
        <a href="/guide/teachers/getting-started/checking-answers">
          Checking Twiga&apos;s Answers
        </a>{" "}
        is the one minute check that catches it.
      </p>

      <h2 id="what-if-it-stops-replying">What if it stops replying?</h2>
      <p>
        Some jobs really are slow. A full mock exam takes about ten minutes and
        Twiga tells you so while it works. A reply that never arrives is a
        different thing, and{" "}
        <a href="/guide/teachers/troubleshooting/no-reply">
          When Twiga Doesn&apos;t Reply
        </a>{" "}
        covers how to tell them apart.
      </p>

      <h2 id="is-there-a-command-i-should-know">
        Is there a command I should know?
      </h2>
      <p>
        One. <code>settings</code>, sent on its own, opens your profile. Every
        other thing you send is plain language.
      </p>

      <pre>
        <code>settings</code>
      </pre>

      <h2 id="where-do-i-get-help">Where do I get help?</h2>
      <p>
        Write to <code>dev@ai.or.tz</code>. That address only ever appears
        inside an error message, so copy it down now rather than waiting to be
        shown it.
      </p>
      <p>Include three things so they can find what went wrong:</p>
      <ul>
        <li>The date and time it happened.</li>
        <li>The exact message you sent.</li>
        <li>The phone number you use with Twiga.</li>
      </ul>

      <CardGrid>
        <GuideCard
          href="/guide/teachers/getting-started/checking-answers"
          title="Checking Twiga's Answers"
          description="The one minute check that catches a wrong form level or a source from another subject."
        />
        <GuideCard
          href="/guide/teachers/troubleshooting/no-reply"
          title="When Twiga Doesn't Reply"
          description="Tell a slow reply from a lost one, and what to send to get your content anyway."
        />
        <GuideCard
          href="/guide/teachers/troubleshooting/limits"
          title="What Twiga Cannot Do"
          description="Voice notes, photos, file types, subject coverage and school levels."
        />
        <GuideCard
          href="/guide/teachers/getting-started/registration"
          title="Registering on WhatsApp"
          description="The one message that signs you up, and the approval wait that follows it."
        />
      </CardGrid>
    </>
  );
}

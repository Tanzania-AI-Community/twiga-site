import {
  Callout,
  CardGrid,
  ChatSample,
  GuideCard,
  GuideHeading,
} from "@/components/guide/content";

export default function LimitsPage() {
  return (
    <>
      <GuideHeading
        eyebrow="Troubleshooting & Limits"
        title="What Twiga Cannot Do"
        description="The things Twiga will tell you it cannot do, and the one thing it does instead of saying no. The second half is the part that can put wrong content in front of your class."
      />

      <p>
        Most of Twiga&rsquo;s limits cost you one message. You send it, you get
        one flat line back, and you know for next time. Those are on the first
        half of this page.
      </p>
      <p>
        Then there is the limit that does not announce itself. Ask about a
        subject Twiga does not cover and it answers anyway, at length and with
        confidence. That is the second half, and it is the reason this page
        exists.
      </p>
      <p>If you want the current list from Twiga itself, send this:</p>
      <pre>
        <code>which subjects and forms do you support right now?</code>
      </pre>

      <h2 id="text-only-no-voice-notes-no-photos">
        Text only, no voice notes, no photos
      </h2>
      <p>
        Twiga reads typed text and nothing else. Send a voice note, a photo of
        your scheme of work, a pupil&rsquo;s exercise book or a scan of an exam
        paper. They all come back with the same line.
      </p>

      <ChatSample
        messages={[
          {
            from: "teacher",
            text: "Can you tell the contents from this message?\n[photo of a scheme of work]",
          },
          { from: "twiga", text: "Sorry, I only understand textual messages." },
        ]}
      />

      <Callout type="warning" title="Never put your question in a caption">
        In that exchange the teacher typed his question as the caption on the
        photo. The caption was thrown away with the picture, even though it was
        plain readable English. If you want to attach something, send your
        question first, as its own message.
      </Callout>

      <p>
        There is one more trap here. A voice note or photo Twiga has not read
        yet can pull that refusal out much later. The &ldquo;only textual
        messages&rdquo; line then looks like an answer to the wrong question.
        Check what you sent before it.
      </p>

      <h2 id="only-exams-come-as-files">Only exams come as files</h2>
      <p>
        Twiga can send you a NECTA-style exam paper and its solution key as two
        PDF files. That is the only thing it sends as a file.
      </p>
      <p>
        Everything else arrives as chat text: lesson plans, notes, worksheets,
        exercises, anything you asked to be &ldquo;printable&rdquo;. Asking for a
        PDF of those does not work, whatever reason Twiga gives you for it. Copy
        the text into a document on your phone and print from there.
      </p>

      <h2 id="secondary-form-1-and-form-2">Secondary, Form 1 and Form 2</h2>
      <p>
        Twiga is built for secondary school teachers. Ask it for primary school
        material and it says plainly that it does not have any. If a colleague
        sent you this guide and you teach primary, that is the answer.
      </p>
      <p>
        The subject list it gives you is short: Mathematics, Physics and Book
        Keeping, for Form 1 and Form 2. That list does not settle the question.
        Read <a href="#the-limit-that-does-not-say-no">the limit that does not
        say no</a>, further down this page.
      </p>

      <h2 id="it-does-not-remember-old-conversations">
        It does not remember old conversations
      </h2>
      <p>
        Inside one conversation, Twiga follows what you said. Ask it what your
        last question was and it answers correctly, and often the one before
        that too.
      </p>
      <p>
        Your older chats are a different matter. Asked to remember the first
        question the teacher ever sent it, Twiga errored out. Treat it as having
        no memory of past months.
      </p>
      <p>
        The practical consequence: <strong>anything you want in October, save in
        August.</strong> Star the message in WhatsApp, or paste it into a
        document. You cannot ask Twiga to find it again.
      </p>

      <h2 id="it-does-not-know-who-you-are">It does not know who you are</h2>
      <p>
        Ask Twiga your name or your school and it declines. It calls this
        privacy. It works from the profile you filled in, not from anything it
        can look up.
      </p>
      <p>
        It may still greet you by a name you never typed in the chat. That name
        comes from the Personal Info form in your settings. If it is wrong, see{" "}
        <a href="/guide/teachers/troubleshooting/profile">Fixing Your Profile</a>
        .
      </p>

      <h2 id="it-is-not-a-general-chatbot">It is not a general chatbot</h2>
      <p>
        Ask it to make tea, or to talk about new phone prices, and it turns you
        down with a joke. It gives you a moment of chat, then steers back to
        teaching. It holds that line politely. It is a work tool, and it behaves
        like one.
      </p>

      <h2 id="the-limit-that-does-not-say-no">The limit that does not say no</h2>
      <p>
        Now the important part. Twiga declined English Literature in May, in
        clear terms. In July it produced a full Form 1 English topic list, tidy
        and confident, and offered to build lesson plans on it.
      </p>

      <ChatSample
        messages={[
          {
            from: "teacher",
            text: "ok typing it out then. do you also help with english literature? i cover that on tuesdays",
          },
          {
            from: "twiga",
            text: "Right now, I support Mathematics, Physics, and Book Keeping for Form 1 and Form 2, so unfortunately, I can't assist with English Literature just yet.\n\nBut hey, if you're teaching Maths, Physics, or Book Keeping, I've got your back with:\n- Clear explanations (straight from the TIE textbook)\n- Practice questions (NECTA-style)",
          },
          {
            from: "teacher",
            text: "in form one english, what topics are there?",
          },
          {
            from: "twiga",
            text: "Hi! 👋 I can help with Form 1 English topics. Here are the main topics typically covered in the Form 1 English curriculum:\n\n1. Listening and Speaking\n- Listening to short stories, dialogues and announcements\n- Pronunciation and word stress\n\n2. Reading\n- Reading comprehension (passages, stories, poems)\n- Skimming and scanning\n\nWould you like me to create practice questions, or a lesson plan for a specific topic?",
          },
        ]}
      />

      <p>
        Look at the two replies together. The first one says its explanations
        come straight from the TIE textbook. The second one names no book, no
        syllabus and no page. It is the same subject it had just turned down.
      </p>
      <p>
        The same thing happened with Biology. Twiga produced a whole Form 1
        Biology breakdown, term by term, with topics, subtopics, how many periods
        each takes and teaching notes. It opened with{" "}
        <em>kulingana na silabasi ya TIE</em>, meaning &ldquo;according to the
        TIE syllabus&rdquo;. Biology is not on its subject list, and the reply
        named no book and no page anywhere in it.
      </p>

      <Callout type="warning" title="The sentence to remember">
        Asking outside the subjects Twiga covers does not get you a refusal. It
        gets you a confident answer that may be invented. The refusal is the
        safe outcome. The fluent answer is the dangerous one, because nothing in
        the way it is written tells you which one you are holding.
      </Callout>

      <h2 id="the-check-that-catches-it">The check that catches it</h2>
      <p>
        Look at the bottom of the reply. An answer that came from a textbook
        carries a <code>Sources:</code> line naming your subject and your form.
        An invented one has nothing there.
      </p>
      <p>Then the rule, in two lines:</p>
      <ul>
        <li>
          <strong>Inside its subjects,</strong> check the answer before you teach
          it.
        </li>
        <li>
          <strong>Outside its subjects,</strong> assume it is invented until your
          own TIE book agrees.
        </li>
      </ul>
      <p>
        Answers from outside its subjects are not useless. Teachers have used
        them. They are a first draft you rewrite, never material you take into a
        classroom as it is.
      </p>

      <h2 id="related-pages">Related pages</h2>
      <CardGrid>
        <GuideCard
          href="/guide/teachers/getting-started/checking-answers"
          title="Checking Twiga's Answers"
          description="The sixty-second check for wrong forms, missing sources and invented facts."
        />
        <GuideCard
          href="/guide/teachers/assessment/mock-exams"
          title="Full NECTA Mock Exams"
          description="The one place files do come from: a paper and its marking scheme as PDFs."
        />
        <GuideCard
          href="/guide/teachers/improvisation/printables"
          title="Turning Chat Text Into Printables"
          description="How to get a chat answer onto paper when no file is coming."
        />
        <GuideCard
          href="/guide/teachers/troubleshooting/no-reply"
          title="When Twiga Doesn't Reply"
          description="If nothing came back at all, that is a broken tool, not a limit."
        />
      </CardGrid>
    </>
  );
}

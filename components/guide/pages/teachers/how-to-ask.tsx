import {
  Callout,
  CardGrid,
  ChatSample,
  GuideCard,
  GuideHeading,
} from "@/components/guide/content";

export default function TeacherHowToAskPage() {
  return (
    <>
      <GuideHeading
        eyebrow="Getting Started"
        title="How to Ask Twiga"
        description="Five things go in one message. Put them all in and the first answer is usable, so you do not spend a turn being asked for them."
      />

      <p>
        A vague request costs you a message. Twiga writes back asking for the
        details it needed, you send them, and only then do you get your answer.
        Between lessons that is a minute you did not have.
      </p>

      <ChatSample
        messages={[
          { from: "teacher", text: "i would like to have a practice activity" },
          {
            from: "twiga",
            text: "Happy to help with a practice activity! 📑\n\nTo make one you can actually use, just tell me:\n- Subject\n- Form (e.g. Form 1 or 2)\n- Topic (e.g. map reading, forces)\n- What you want (questions, activity, lesson tips)\n\nAnd I'll send it right away!",
          },
        ]}
      />

      <p>
        That list is Twiga&apos;s own. It asks for the same four things every
        time. So send them first.
      </p>

      <h2 id="the-five-ingredients">The five ingredients</h2>
      <table>
        <thead>
          <tr>
            <th>Put in</th>
            <th>Looks like</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <strong>Subject</strong>
            </td>
            <td>geography, book keeping, physics</td>
          </tr>
          <tr>
            <td>
              <strong>Form</strong>
            </td>
            <td>form 1, form 2</td>
          </tr>
          <tr>
            <td>
              <strong>Topic</strong>
            </td>
            <td>
              map reading, longitudes and latitudes, trial balance. For a lesson
              plan, give the lesson title too.
            </td>
          </tr>
          <tr>
            <td>
              <strong>What you want, and how many</strong>
            </td>
            <td>
              a practice activity, 5 questions, a 1-line intro, mixed difficulty
            </td>
          </tr>
          <tr>
            <td>
              <strong>Anything about your class</strong>
            </td>
            <td>
              i have no materials, only 30 minutes, they are weak on fractions
            </td>
          </tr>
        </tbody>
      </table>

      <p>
        The fifth one is the one teachers leave out, and it is the one that
        changes the answer most. Twiga never asks for it.
      </p>

      <h2 id="all-five-in-one-line">All five in one line</h2>
      <p>
        You do not need neat sentences. This is one lowercase line typed on a
        phone, and it answers every item on the list.
      </p>

      <pre>
        <code>
          geography form 1, map reading, longitudes and latitudes. i need a
          practice activity, 5 questions mixed difficulty. i have no materials
          to show them physically
        </code>
      </pre>

      <ChatSample
        messages={[
          {
            from: "teacher",
            text: "geography form 1, map reading, longitudes and latitudes. i need a practice activity, 5 questions mixed difficulty. i have no materials to show them physically",
          },
          {
            from: "twiga",
            text: "Practice Activity: Longitudes and Latitudes\nGeography, Form 1, no materials needed\n\n1. In your own words, what is a line of latitude?\n\n2. Which line divides the Earth into Northern and Southern hemispheres?\n\n3. Use your arms to show the class the direction longitudes run. Explain why.\n\n4. Dar es Salaam is near 7°S, 39°E. Which number is the latitude?\n\n5. Challenge: Why do we need both longitude and latitude to find one place?\n\nWant the marking guide or a printable version? Just say which.",
          },
        ]}
      />

      <p>
        Look at question 3. Students use their arms because the message said
        there was nothing to show them. That is the clause a teacher would think
        to leave out. It is also the reason the activity works in a room with no
        globe and no projector.
      </p>

      <h2 id="words-that-set-the-shape">Words that set the shape</h2>
      <p>
        Say how much and in what form, and you get that. Leave it out and you
        get Twiga&apos;s long default answer with a menu of offers at the end.
        All of these are real and all of them worked:
      </p>
      <ul>
        <li>
          <code>5 questions</code> and <code>3 question</code> set the count.
        </li>
        <li>
          <code>mixed difficulty</code> gets you an easy one, a medium one and a
          hard one.
        </li>
        <li>
          <code>1-line</code> gets you one line, not a paragraph.
        </li>
        <li>
          <code>without sounding like a robot</code> changes the language it
          uses.
        </li>
        <li>
          <code>short lesson plan</code> keeps a plan down to one period.
        </li>
      </ul>

      <h2 id="one-request-per-message">One request per message</h2>
      <p>
        Send one thing, wait for the answer, then send the next. This sounds
        fussy. It is not.
      </p>
      <p>
        One teacher sent a request about the two-column cash book. Twenty-one
        seconds later, before any answer came, he sent a second unrelated
        question. Both were lost. The only replies were two error messages.
      </p>

      <Callout type="warning" title="Do not stack messages">
        <p>
          If you have two things to ask, ask the first, read the answer, then
          ask the second. Twiga follows the thread, so the second one can be
          short.
        </p>
      </Callout>

      <h2 id="answering-an-offer">Answering an offer</h2>
      <p>
        Most replies end with two or three offers. &quot;Want the marking guide
        or a printable version?&quot; Do not answer those with a bare{" "}
        <code>yes</code>. Twiga cannot tell which one you meant, so it asks, and
        you have lost a turn.
      </p>
      <p>Name the thing instead.</p>

      <pre>
        <code>yes give me the printable version</code>
      </pre>

      <p>
        Short follow-ups are fine once the chat has context. This one carries a
        count, a format, a difficulty and the topic, in one line, without naming
        the topic at all:
      </p>

      <ChatSample
        messages={[
          {
            from: "teacher",
            text: "can you set me a quick 3 question exit ticket on this? mixed difficulty",
          },
          {
            from: "twiga",
            text: "Of course! A 3-question exit ticket on Longitudes and Latitudes, easy, medium, challenge:\n\n1. Latitude lines run in which direction, east to west or north to south?\n\n2. Name the 0° line of longitude.\n\n3. True or False: All longitudes are the same length. Explain.\n\nLet me know if you want the marking guide, I can send it in 10 seconds! 💪",
          },
        ]}
      />

      <p>
        <code>on this</code> does the work of the subject, the form and the
        topic together. That only holds inside one conversation. If you come
        back tomorrow, name them again.
      </p>

      <h2 id="write-in-the-language-you-teach-in">
        Write in the language you teach in
      </h2>
      <p>
        Twiga reads English and Kiswahili. Ask in Kiswahili and it answers in
        Kiswahili. One teacher asked for a Book Keeping lesson plan on the trial
        balance in Kiswahili, and the whole plan came back in Kiswahili. The
        five ingredients are the same in either language, so pick the one you
        are quicker in.
      </p>

      <h2 id="then-check-it">Then check it</h2>
      <p>
        A usable answer is not a checked answer. Before any of this goes to a
        class, read the numbers and read the form level. Then look at the bottom
        of the reply, where it says which book the content came from.
      </p>

      <CardGrid>
        <GuideCard
          href="/guide/teachers/getting-started/checking-answers"
          title="Checking Twiga's Answers"
          description="The one minute check on any reply before it goes into a classroom."
        />
        <GuideCard
          href="/guide/teachers/lesson-plans/requesting"
          title="Requesting a Lesson Plan"
          description="What a lesson plan request needs on top of these five, including the lesson title."
        />
      </CardGrid>
    </>
  );
}

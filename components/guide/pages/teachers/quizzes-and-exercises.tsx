import {
  Callout,
  CardGrid,
  ChatSample,
  GuideCard,
  GuideHeading,
} from "@/components/guide/content";

export default function QuizzesAndExercisesPage() {
  return (
    <>
      <GuideHeading
        eyebrow="Exams & Quizzes"
        title="Quizzes, Exercises & Exit Tickets"
        description="Get a short set of questions back in the chat in seconds. Name the count, the format and the difficulty, and the questions arrive before the bell."
      />

      <p>
        You have five minutes. The lesson is nearly over and you want three
        questions to see who understood. This is the fastest thing Twiga does.
        The questions come back inside the chat, as text you read off your
        phone or copy onto the board. There is no file to download and nothing
        to open.
      </p>

      <h2 id="name-three-things">Name three things and send</h2>
      <p>
        A good request names how many questions you want, what format they
        should take, and how hard they should be. The topic is the fourth
        thing, and it is often free. If you just asked Twiga about a topic, you
        can point back at it instead of typing it again.
      </p>

      <table>
        <thead>
          <tr>
            <th>Part</th>
            <th>What to type</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>How many</td>
            <td>
              <code>3 question</code>, <code>5 short questions</code>
            </td>
          </tr>
          <tr>
            <td>What format</td>
            <td>
              <code>exit ticket</code>, <code>practice activity</code>,{" "}
              <code>short questions</code>
            </td>
          </tr>
          <tr>
            <td>How hard</td>
            <td>
              <code>mixed difficulty</code>, <code>easy</code>,{" "}
              <code>challenge</code>
            </td>
          </tr>
          <tr>
            <td>On what</td>
            <td>
              The topic, or a pointer back: <code>the law you just gave me</code>
            </td>
          </tr>
        </tbody>
      </table>

      <p>Here is the whole thing in one line. Send it as it is.</p>

      <pre>
        <code>{`set me a quick 3 question exit ticket on Newton's First Law for Form 2, mixed difficulty`}</code>
      </pre>

      <p>
        Write it in English or in Kiswahili. The reply comes back in the
        language you used. See{" "}
        <a href="/guide/teachers/troubleshooting/language">
          Language: English &amp; Kiswahili
        </a>{" "}
        for what to proofread in a Kiswahili reply.
      </p>

      <h2 id="what-comes-back">What comes back</h2>
      <p>
        This is a real exchange. A moment earlier the teacher had asked for a
        one line intro to Newton&apos;s First Law. So this request never names
        the topic again. It says &quot;the law you just gave me&quot;, and Twiga
        picks it up.
      </p>

      <ChatSample
        messages={[
          {
            from: "teacher",
            text: "ugh the headteacher just called an emergency meeting in 5. im so tired. anyway can you set me a quick 3 question exit ticket for the law you just gave me? mixed difficulty",
          },
          {
            from: "twiga",
            text: "Of course! Here's a quick 3-question exit ticket on Newton's First Law with easy, medium and challenge levels, perfect for Form 2 students:\n\n1. What happens to a ball lying on the ground if no one kicks it? Explain using Newton's First Law.\n\n2. A passenger in a moving car jerks forward when the car suddenly stops. Use Newton's First Law to explain why.\n\n3. True or False: An object in motion always needs a force to keep moving. Explain your answer.\n\nLet me know if you want the marking guide. I can send it in 10 seconds!",
          },
        ]}
      />

      <p>
        That reply came back six seconds after the request. Two things in it
        are worth looking at.
      </p>
      <ul>
        <li>
          <strong>The three questions are banded.</strong> Easy, then medium,
          then challenge. Saying <code>mixed difficulty</code> is what produced
          that spread.
        </li>
        <li>
          <strong>Question 3 asks them to explain.</strong> A bare true or
          false question is a coin toss. Adding{" "}
          <code>explain your answer</code> turns it into a check on what the
          class actually believes.
        </li>
      </ul>

      <h2 id="formats-that-work">Formats that work</h2>
      <p>These three have all come back in full, inside the chat.</p>
      <ul>
        <li>
          <strong>An exit ticket.</strong> Two or three questions for the last
          minutes of a lesson, banded easy to challenge.
        </li>
        <li>
          <strong>Short questions in exam style.</strong> Twiga suggests this
          wording itself: &quot;Create 5 short questions on petty cash book for
          Form 2&quot;. It says these come with marking points.
        </li>
        <li>
          <strong>A full practice activity.</strong> One request produced
          role-play scenarios in pairs, one minute speech prompts and group
          discussion tasks. A five point assessment checklist came at the end of
          the same reply.
        </li>
      </ul>

      <p>
        The same shape works on other subjects. Here is Twiga&apos;s own
        suggested wording for Book Keeping, with the verb that brings it back in
        the chat.
      </p>

      <pre>
        <code>{`write me 5 short questions on petty cash book for form 2`}</code>
      </pre>

      <h2 id="write-me-not-generate">Say write me, not generate an exercise</h2>
      <p>
        The verb decides whether the questions arrive. Asking Twiga to{" "}
        <strong>write</strong> or <strong>set</strong> questions brings them
        back in the chat in seconds. Asking it to{" "}
        <strong>generate an exercise</strong> hands the job to a separate tool.
        That tool failed every time it ran in five months of use. It sends
        &quot;Generating exercises from the course content, please hold...&quot;
        over and over, then gives up.
      </p>

      <Callout type="tip" title="If it starts holding, send this line">
        A teacher found the way out. Ask for the same thing again and tell Twiga
        to skip the tool. The full activity came back fifteen seconds later.
      </Callout>

      <pre>
        <code>{`just write it here, no need to generate the exercise`}</code>
      </pre>

      <p>
        So adding the word <em>exercise</em> to a request makes it less likely
        to arrive, not more. If it keeps stalling, see{" "}
        <a href="/guide/teachers/troubleshooting/no-reply">
          When Twiga Doesn&apos;t Reply
        </a>
        .
      </p>

      <h2 id="before-it-goes-to-the-class">Before it goes to the class</h2>
      <p>
        Read the questions once before you use them. Two things are worth a
        moment.
      </p>
      <ul>
        <li>
          <strong>Check the facts against your book.</strong> Twiga lists its
          own coverage as Mathematics, Physics and Book Keeping for Form 1 and
          Form 2. Ask outside that list and it usually writes the questions
          anyway. They come back reading just as well, right or wrong. Read
          them the way you would read a colleague&apos;s handout. There is more
          on this in{" "}
          <a href="/guide/teachers/troubleshooting/limits">
            What Twiga Cannot Do
          </a>
          .
        </li>
        <li>
          <strong>Ask for the answers.</strong> Twiga offers a marking guide at
          the end of a quiz and offers to build a marking scheme after an
          activity. It does not send one unless you say yes. That is one more
          message.
        </li>
      </ul>

      <Callout type="note" title="Quizzes stay in the chat">
        Everything on this page arrives as chat text. Only a full mock exam
        comes back as a file you can save.
      </Callout>

      <h2 id="where-to-go-next">Where to go next</h2>
      <CardGrid>
        <GuideCard
          href="/guide/teachers/assessment/marking-schemes"
          title="Marking Schemes & Answer Keys"
          description="How to ask for the answers to a quiz, and the three different things Twiga sends when you do."
        />
        <GuideCard
          href="/guide/teachers/assessment/mock-exams"
          title="Full NECTA Mock Exams"
          description="When you need a whole paper instead of three questions, and the ten minutes it takes."
        />
        <GuideCard
          href="/guide/teachers/improvisation/printables"
          title="Turning Chat Text Into Printables"
          description="Getting a quiz out of WhatsApp and onto paper for the class."
        />
      </CardGrid>
    </>
  );
}

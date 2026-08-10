import {
  Callout,
  CardGrid,
  ChatSample,
  GuideCard,
  GuideHeading,
  Step,
  Steps,
} from "@/components/guide/content";

export default function MarkingSchemesPage() {
  return (
    <>
      <GuideHeading
        eyebrow="Exams & Quizzes"
        title="Marking Schemes & Answer Keys"
        description="A key sometimes comes on its own, sometimes hides at the bottom of a reply, and sometimes only comes if you ask. Here is how to get the right one, and the check to do before you mark forty scripts."
      />

      <p>
        A wrong line in an answer key is not one wrong mark. It is one wrong
        mark on every script in the pile. This page is about getting a key out
        of Twiga and reading it before you start marking.
      </p>

      <h2 id="three-ways-a-key-reaches-you">Three ways a key reaches you</h2>
      <Steps>
        <Step title="Free, with a full exam">
          Ask for a mock exam and the marking scheme comes with it as a second
          PDF. You never ask for it. Twiga says up front that it will send
          &quot;your exam and solution&quot;, and both files land seconds apart.
          This is the only route that is guaranteed.
        </Step>
        <Step title="Hidden inside a reply">
          Lesson plans, activities and worksheets often carry a key at the
          bottom that you did not ask for. Scroll to the end before you decide
          there is none.
        </Step>
        <Step title="On request">
          Twiga offers to make one constantly. &quot;Let me know if you want the
          marking guide&quot;. &quot;Create a marking scheme for this
          activity?&quot; &quot;Add an answer key for the teacher&quot;. Say yes
          and see what comes.
        </Step>
      </Steps>

      <Callout type="note" title="Route three is untested">
        In five months of real use, the teacher turned down or ignored every one
        of those offers. So nobody has yet seen a key arrive that way. Twiga
        says it can send one in ten seconds. That is Twiga&apos;s own claim, and
        nobody has timed it.
      </Callout>

      <p>
        Ask for a mock exam and the paper and the key come back together, about
        ten minutes later.{" "}
        <a href="/guide/teachers/assessment/mock-exams">Full NECTA Mock Exams</a>{" "}
        shows the message to send.
      </p>

      <h2 id="what-the-exam-key-contains">What the exam key contains</h2>
      <p>
        The second PDF is titled GENERATED PRACTICE EXAM - MARKING SCHEME /
        SOLUTION KEY. It is the whole paper reprinted, same header, same
        instructions, same questions in order, with the answers printed in red.
        For each question you get:
      </p>
      <ul>
        <li>
          Multiple choice: a bare answer letter, like{" "}
          <code>1. (v) Answer: B</code>.
        </li>
        <li>
          Matching: a two column table headed &quot;Suggested matching
          answers&quot;.
        </li>
        <li>
          Long questions: three blocks. <strong>Suggested answer</strong> is
          prose covering every part. <strong>Marking scheme</strong> is usually
          one generic sentence, such as &quot;Award marks based on accuracy,
          completeness and clarity&quot;. <strong>Marking points</strong> is a
          bullet per part, sometimes with the marks attached.
        </li>
      </ul>
      <p>
        Marking scheme and solution key are the same file. Both names are on its
        title page.
      </p>

      <h2 id="everywhere-else-look-at-the-bottom">
        Everywhere else, look at the bottom
      </h2>
      <p>
        Outside a full exam, the key comes buried in the reply itself, under a
        different name every time. All four of these turned up at the end of
        something else, without being asked for.
      </p>
      <ul>
        <li>
          <strong>Suggested Answers</strong>, under the class exercise in a
          lesson plan.
        </li>
        <li>
          <strong>Assessment Checklist (for marking)</strong>, under a speaking
          activity.
        </li>
        <li>
          <strong>Quick Assessment Rubric</strong>, under a pronunciation game.
        </li>
        <li>
          <strong>Assessment Rubric</strong>, as a real table of four criteria
          across three levels, with a total score line, inside a printable
          worksheet.
        </li>
      </ul>

      <h2 id="ask-by-name">Ask by name</h2>
      <p>
        Those three words mean three different things, and Twiga swaps them
        around. Two of the four examples above call themselves a rubric and only
        one of them actually has levels. So ask by name, and say what you need
        it to do.
      </p>

      <table>
        <thead>
          <tr>
            <th>Ask for</th>
            <th>You get</th>
            <th>Use it when</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Marking scheme</td>
            <td>A model answer with marks allocated to each point</td>
            <td>You are putting a number on a script</td>
          </tr>
          <tr>
            <td>Checklist</td>
            <td>A tick list, no marks</td>
            <td>You are watching a class do something</td>
          </tr>
          <tr>
            <td>Rubric</td>
            <td>Levels of quality, such as needs work, good, excellent</td>
            <td>You are grading speaking, writing or a project</td>
          </tr>
        </tbody>
      </table>

      <p>
        Here is what asking looks like, and what to do when the reply is not
        what you asked for.
      </p>

      <ChatSample
        messages={[
          {
            from: "teacher",
            text: "different thing. form 2 english, a speaking practice activity for friday. put a marking scheme on it, i need marks per point",
          },
          {
            from: "twiga",
            text: "Speaking Practice: Short Prepared Talks\n\nPrompts:\n- What should we do during a fire drill at school?\n- Why is punctuality important for students?\n\nAssessment Checklist (for marking):\n- ✅ Clear greeting and introduction\n- ✅ Logical flow of ideas\n- ✅ Eye contact with the audience\n- ✅ Confident closing statement\n\nWould you like me to adjust the difficulty level, add more scenarios, or create a marking scheme for this activity?",
          },
          {
            from: "teacher",
            text: "thats a checklist, no marks on it. yes, marking scheme for the talks, 2 marks per criterion. and a rubric with the three levels for my own notes",
          },
        ]}
      />

      <p>
        The teacher asked for marks per point. Twiga sent a tick list with no
        marks on it, then offered to build the marking scheme it had just been
        asked for. Saying the number of marks leaves it less room to send you
        something else.
      </p>

      <pre>
        <code>{`marking scheme for the talks, 2 marks per criterion`}</code>
      </pre>

      <h2 id="read-the-key-against-the-paper">Read the key against the paper</h2>
      <p>
        A generated key can contradict the paper it came with. In the exam key
        checked for this guide, two answers in the matching question are
        swapped.
      </p>

      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>What the key printed</th>
            <th>What is correct</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Mountains</td>
            <td>Elevated flatlands that rise sharply above surrounding areas</td>
            <td>
              B, high rugged landforms created by folding, faulting or volcanic
              activity
            </td>
          </tr>
          <tr>
            <td>Plateaus</td>
            <td>
              High, rugged landforms created by folding, faulting, or volcanic
              activity
            </td>
            <td>G, elevated flatlands that rise sharply</td>
          </tr>
        </tbody>
      </table>

      <p>
        The paper contradicts itself here. Its own answer to question 1(v) says
        plateaus are the elevated flatlands. That is the description it has just
        handed to mountains. Mark straight from that key and every pupil loses 2
        of the 5 marks on that question. The other three matching answers were
        right.
      </p>

      <Callout type="warning" title="Two more things to expect in an exam key">
        <p>
          <strong>The matching key gives sentences, not letters.</strong> The
          paper asks pupils to write a letter. Write the letters onto the key
          before you mark. That is the step that catches a swap.
        </p>
        <p>
          <strong>About half the marking points carry no mark values.</strong>{" "}
          Some break down properly, such as one mark for sunlight and one for
          the link to the food web. Others are bare bullets, and the long
          Section C questions list content points for 15 marks with nothing tied
          to the parts. Two teachers marking that will not agree.
        </p>
      </Callout>

      <h2 id="the-check-before-you-mark">The check before you mark</h2>
      <ol>
        <li>
          Read the key&apos;s answers against the paper&apos;s own questions and
          options. A key that contradicts its own paper is what you are looking
          for.
        </li>
        <li>
          Check every marking point has a mark value, and that the values add up
          to the stated total.
        </li>
        <li>
          Where marks are missing, copy them across from the question on the
          paper.
        </li>
        <li>
          If more than one teacher is marking the class set, agree the
          allocation for the long questions before anyone starts.
        </li>
        <li>Fix the key on paper before the first script, not after the tenth.</li>
      </ol>

      <p>
        This is not a warning against the key. It arrives free with every exam
        and it saves real hours. Give it the same minute of reading you would
        give a photocopied key handed to you by a colleague.
      </p>

      <h2 id="where-to-go-next">Where to go next</h2>
      <CardGrid>
        <GuideCard
          href="/guide/teachers/assessment/mock-exams"
          title="Full NECTA Mock Exams"
          description="How to request the paper the key comes with, and what to fix on the paper itself."
        />
        <GuideCard
          href="/guide/teachers/assessment/quizzes-and-exercises"
          title="Quizzes, Exercises & Exit Tickets"
          description="Short questions in the chat, and asking for the marking guide Twiga offers at the end."
        />
        <GuideCard
          href="/guide/teachers/getting-started/checking-answers"
          title="Checking Twiga's Answers"
          description="The wider habit: what to look at before anything generated reaches your class."
        />
      </CardGrid>
    </>
  );
}

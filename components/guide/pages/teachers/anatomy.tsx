import {
  Callout,
  CardGrid,
  ChatSample,
  GuideCard,
  GuideHeading,
} from "@/components/guide/content";

export default function LessonPlanAnatomyPage() {
  return (
    <>
      <GuideHeading
        eyebrow="Lesson Plans"
        title="What's in a Twiga Lesson Plan"
        description="Twiga does not return the same sections every time. Here is what you can count on, what goes missing, and how to get the missing part without typing it yourself."
      />

      <p>
        A plan arrives. Before you copy it into your plan book, check which
        sections it has.
      </p>
      <p>
        You need to check, because no two plans come back the same. Three real
        plans from the same bot, three different sets of sections.
      </p>

      <h2 id="what-a-plan-looks-like">What a plan looks like</h2>
      <p>
        This is a Form 1 Geography plan, shortened. The teacher gave the form,
        the subject, the topic and the title.
      </p>

      <ChatSample
        messages={[
          {
            from: "teacher",
            text: "i am teaching geography, form 1, map reading. the title is longitudes and latitudes",
          },
          {
            from: "twiga",
            text: "Form 1 Geography Lesson Plan\nTopic: Longitudes and Latitudes\nDuration: 45 minutes\n\nLearning Objectives:\n1. Define latitude and longitude and explain their importance in locating places.\n\nKey Concepts:\n- The Earth rotates 360° in 24 hours → 15° = 1 hour.\n\nMaterials Needed:\n- Globe or world map with grid lines\n\nLesson Flow:\n1. Introduction (10 minutes): show a globe\n2. Direct Instruction (15 minutes): writing coordinates, 15° = 1 hour\n3. Class Activity (15 minutes): coordinates of Arusha, London, Sydney\n4. Closure (5 minutes): recap, assign homework\n\nHomework:\n1. Find the latitude and longitude of your hometown.\n\nTeacher Notes:\n- Common mistake: students reverse the order or forget directions (N/S, E/W).",
          },
        ]}
      />

      <p>
        Run your eye down the headings, not the text. This one has no assessment
        section. The next plan you get may have one and no teacher notes.
      </p>

      <h2 id="the-two-sections-you-always-get">
        The two sections you always get
      </h2>
      <p>
        A <strong>timed lesson flow</strong> and <strong>homework</strong>.
        Those two were in every plan. Count on them. Treat every other section
        as a bonus you may have to ask for.
      </p>

      <h2 id="what-changes-between-plans">What changes between plans</h2>
      <p>
        Here are the three plans side by side. Three subjects, three shapes.
      </p>

      <table>
        <thead>
          <tr>
            <th>Section</th>
            <th>Geography, Form 1</th>
            <th>Biology, Form 1</th>
            <th>Book Keeping, Form 2</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Learning objectives</td>
            <td>Yes, first</td>
            <td>Yes, first</td>
            <td>Yes, but second, with 3 minutes of the lesson given to them</td>
          </tr>
          <tr>
            <td>Key concepts</td>
            <td>Yes</td>
            <td>No</td>
            <td>No</td>
          </tr>
          <tr>
            <td>Teaching aids or materials</td>
            <td>Yes</td>
            <td>Yes</td>
            <td>No</td>
          </tr>
          <tr>
            <td>Timed lesson flow</td>
            <td>Yes, 4 stages</td>
            <td>Yes, 5 stages</td>
            <td>Yes, 6 stages</td>
          </tr>
          <tr>
            <td>Assessment</td>
            <td>No</td>
            <td>Yes</td>
            <td>No</td>
          </tr>
          <tr>
            <td>Homework</td>
            <td>Yes</td>
            <td>Yes</td>
            <td>Yes, but only if it is allowed</td>
          </tr>
          <tr>
            <td>Teacher notes</td>
            <td>Yes</td>
            <td>No</td>
            <td>No</td>
          </tr>
          <tr>
            <td>Duration</td>
            <td>45 minutes</td>
            <td>40 minutes</td>
            <td>40 minutes</td>
          </tr>
        </tbody>
      </table>

      <p>
        The order moves as well. Two plans opened with objectives. The Book
        Keeping plan opened with a starter question and put the learning
        outcomes second. If your plan book has a fixed set of rows, you will be
        reordering as you copy.
      </p>

      <h2 id="the-minutes-add-up">The minutes add up</h2>
      <p>
        One thing never broke. In all three plans the stage minutes add to the
        stated duration. 10 plus 15 plus 15 plus 5 is the 45 minutes above. The
        other two plans add to 40.
      </p>
      <p>
        But Twiga chose those durations itself. It picked 40, 40 and 45 without
        being asked. Its own questions never ask how long your period is. If you
        teach an 80 minute period or a double, say so when you ask. See{" "}
        <a href="/guide/teachers/lesson-plans/requesting">
          Requesting a Lesson Plan
        </a>{" "}
        for the rest of what belongs in that first message.
      </p>

      <h2 id="ask-for-the-section-that-is-missing">
        Ask for the section that is missing
      </h2>
      <p>
        The Geography plan above has no assessment section. You do not need a new
        request. Say what is missing in the same chat, and name your plan book.
      </p>

      <ChatSample
        messages={[
          {
            from: "teacher",
            text: "this is good but my plan book has an assessment column and theres nothing for it here",
          },
          {
            from: "twiga",
            text: "Assessment Methods: Longitudes and Latitudes\n\n- Check group answers during the class activity against the map.\n- Compare written coordinates to the textbook examples for correct order and direction.\n- Use the homework as evidence of understanding: does the student write latitude first?\n\nWould you like a short quiz on this topic as well?",
          },
        ]}
      />

      <p>
        The section comes back written for your topic, not as a general rule. It
        refers to the class activity that was already in the plan.
      </p>

      <h3 id="teacher-notes-is-worth-asking-for">
        Teacher notes is worth asking for by name
      </h3>
      <p>
        The Geography plan warned that students reverse the order of coordinates
        or forget the directions, N and S, E and W. That is the kind of line a
        textbook will not give you. It appeared in one plan out of three, so ask
        for it.
      </p>
      <pre>
        <code>{`add teacher notes with common student mistakes to watch for`}</code>
      </pre>

      <Callout type="warning" title="Twiga promises a section it never sends">
        <p>
          Ask Twiga to describe its own lesson plans and it lists Competences
          first. Competences appeared in none of the plans it actually sent.
        </p>
        <p>
          Do not assume any section will be there because Twiga said so. If your
          form needs a row, ask for that row by name.
        </p>
      </Callout>

      <h2 id="turning-a-stage-into-a-worksheet">
        Turning a stage into a worksheet
      </h2>
      <p>
        You can point at one stage of the plan and ask for it in a different
        shape.
      </p>

      <ChatSample
        messages={[
          {
            from: "teacher",
            text: "and turn the class activity into a worksheet i can print for them",
          },
          {
            from: "twiga",
            text: "📄 PRINTABLE WORKSHEET\nSubject: Geography | Form 1\nTopic: Longitudes and Latitudes\n\nA. Write the approximate coordinates\n1. Arusha, Tanzania  ________\n2. London, United Kingdom  ________\n3. Sydney, Australia  ________\n\nB. Short answer\n4. Why does latitude affect climate?\n5. Why does longitude affect time?\n\nCopy this into Word or Google Docs to print. I can't send files on WhatsApp directly.",
          },
        ]}
      />

      <p>Quizzes and group activities work the same way. Ask in the same chat.</p>

      <Callout type="note" title="Printable does not mean a file">
        <p>
          Twiga cannot send a PDF or any other attachment on WhatsApp. Ask for
          one and it says so, then gives you steps instead. Copy the text, paste
          it into Google Docs, Word or your notes app, then print or save as PDF
          from there.
        </p>
        <p>
          <a href="/guide/teachers/improvisation/printables">
            Turning Chat Text Into Printables
          </a>{" "}
          walks through that on a phone.
        </p>
      </Callout>

      <h2 id="before-you-copy-it-into-your-plan-book">
        Before you copy it into your plan book
      </h2>
      <ul>
        <li>
          Read the section headings first. Note anything your plan book needs
          that is not there.
        </li>
        <li>Ask for each missing section by name, in the same chat.</li>
        <li>
          Check the duration matches your period, and check the stage minutes
          against it.
        </li>
        <li>
          Read the content itself, not just the shape. A plan can be laid out
          perfectly and still cite the wrong book.
        </li>
      </ul>

      <h2 id="where-to-go-next">Where to go next</h2>
      <CardGrid>
        <GuideCard
          href="/guide/teachers/lesson-plans/requesting"
          title="Requesting a Lesson Plan"
          description="The five details to put in the first message so the plan comes back ready to teach."
        />
        <GuideCard
          href="/guide/teachers/assessment/quizzes-and-exercises"
          title="Quizzes & Exercises"
          description="Turning a lesson into practice questions your class can answer."
        />
        <GuideCard
          href="/guide/teachers/improvisation/printables"
          title="Turning Chat Text Into Printables"
          description="Getting a worksheet out of WhatsApp and onto paper."
        />
        <GuideCard
          href="/guide/teachers/troubleshooting/no-reply"
          title="When Twiga Doesn't Reply"
          description="What to do when a follow-up goes quiet or Twiga claims it already sent something."
        />
      </CardGrid>
    </>
  );
}

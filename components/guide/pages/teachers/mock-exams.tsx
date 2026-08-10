import {
  Callout,
  CardGrid,
  ChatSample,
  GuideCard,
  GuideHeading,
  Step,
  Steps,
} from "@/components/guide/content";

export default function MockExamsPage() {
  return (
    <>
      <GuideHeading
        eyebrow="Exams & Quizzes"
        title="Full NECTA Mock Exams"
        description="Ask once and a complete practice paper arrives as a PDF, with its marking scheme behind it. It takes about ten minutes. What comes back is a draft you check, not a paper you photocopy."
      />

      <p>
        End of term is coming and you need a whole paper, not three questions.
        This is the one request that gives you files you can save and forward.
        Everything else Twiga makes stays in the chat as text.
      </p>

      <h2 id="what-to-send">What to send</h2>
      <p>
        One message starts it. Say the class and say what the paper is for. Name
        the subject too, unless it is already on your profile.
      </p>

      <pre>
        <code>{`please create a NECTA style final exam for my form 1 students for their year end`}</code>
      </pre>

      <p>
        Below is how that went in the chat. This teacher&apos;s profile said
        Geography, so Twiga filled the subject in itself and asked about the
        topics instead.
      </p>

      <ChatSample
        messages={[
          {
            from: "teacher",
            text: "ok help me create NECTA style final exam for my students for their year end. this exam is for form 1",
          },
          {
            from: "twiga",
            text: "I can create a NECTA-style final exam for your Form 1 Geography students.\n\nPlease confirm the topics you'd like included in the exam, or let me know if you'd like it to cover the full syllabus.",
          },
          { from: "teacher", text: "full sylabus" },
          {
            from: "twiga",
            text: "📝 Generating a NECTA-style exam. This takes around 10 minutes, so please be patient and wait for the message with your exam and solution.",
          },
        ]}
      />

      <p>
        An exam is the one thing Twiga scopes before it starts working. Your
        answer to that topics question is the whole brief, so it is worth more
        than two words. If Twiga does not ask, name the topics yourself in the
        next message.
      </p>

      <h2 id="do-not-say-full-syllabus">Do not say full syllabus</h2>
      <p>
        In the exchange above the teacher answered &quot;full sylabus&quot;. The
        paper that came back was not the full syllabus. It covered relief
        features, the Earth&apos;s internal structure, latitude and climate,
        weathering and erosion, natural vegetation and solar radiation. Core
        Form 1 Geography was missing: map reading, the solar system and the
        Earth&apos;s movements, weather recording and instruments, and rocks
        and soil.
      </p>
      <p>
        At the same time, some parts sat well above Form 1. One question asked
        about the Hadley Cell and the ITCZ. Another asked about subduction and
        crustal density. Another asked about carbonation, karst landscapes and
        inselbergs.
      </p>
      <p>
        So list the topics you actually taught this term. Put your own topics in
        place of these ones and send it as your first message.
      </p>

      <pre>
        <code>{`form 1 geography necta style mock exam for the year end. topics: map reading, weather instruments, rocks and soil, relief features`}</code>
      </pre>

      <h2 id="wait-and-send-nothing">Then wait, and send nothing</h2>
      <p>
        After the &quot;Generating&quot; message, do not touch the chat. This is
        the technique, and it is not a suggestion. In the transcript a teacher
        sent one unrelated question three minutes into the wait. The job died
        with two errors. Nothing arrived, and the whole request had to start
        again. That one message cost eleven minutes.
      </p>
      <p>
        The clean run took <strong>8 minutes 23 seconds</strong> from the
        confirmation to the first file. Budget ten minutes and put the phone
        down.
      </p>

      <h2 id="two-files-arrive">Two files arrive, five seconds apart</h2>
      <Steps>
        <Step title="The paper">
          A PDF of the exam itself. In the run above it was 7 pages, Geography,
          100 marks.
        </Step>
        <Step title="The marking scheme">
          A second PDF, five seconds later. 12 pages, the same paper reprinted
          with the answers in red.
        </Step>
        <Step title="A one line caption">
          Last of all, a short message: &quot;Here is your practice exam in
          Geography on topics: all.&quot;
        </Step>
      </Steps>

      <Callout type="warning" title="Save both files">
        If you save the first attachment and close WhatsApp, you have a paper
        and no answers. Wait for the second PDF.
      </Callout>

      <h2 id="what-is-on-the-paper">What is on the paper</h2>
      <p>
        The header reads THE UNITED REPUBLIC OF TANZANIA, PRESIDENT&apos;S
        OFFICE, REGIONAL ADMINISTRATION AND LOCAL GOVERNMENT, then GENERATED
        PRACTICE EXAM and the subject. Below that is Time: 3:00 Hrs on the left
        and the year on the right. The bottom of every page says &quot;Twiga
        Generated Practice Exam&quot;, with the page number. So the paper calls
        itself a generated practice exam, not a NECTA paper. That is the honest
        description of it.
      </p>
      <p>
        There are four instructions. Three sections. Answer all of A and B and
        one question from C. No calculators or phones. Write your examination
        number on every page.
      </p>

      <table>
        <thead>
          <tr>
            <th>Section</th>
            <th>Marks</th>
            <th>What is in it</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>A</td>
            <td>15</td>
            <td>
              Ten multiple choice items with five options each, then one
              matching question worth 5.
            </td>
          </tr>
          <tr>
            <td>B</td>
            <td>70</td>
            <td>
              Five compulsory questions, 14 marks each, split into parts with
              marks printed on every sub-question.
            </td>
          </tr>
          <tr>
            <td>C</td>
            <td>15</td>
            <td>Two long questions. The student picks one.</td>
          </tr>
        </tbody>
      </table>

      <p>
        The marks add up: 15 plus 70 plus 15 is 100, in three hours. The
        arithmetic is the most reliable thing on the paper.
      </p>

      <h2 id="fix-these-before-you-photocopy">Fix these before you photocopy</h2>
      <p>
        These faults were all in the paper that came back. Treat the file as a
        first draft from a keen but careless colleague.
      </p>
      <ul>
        <li>
          <strong>The question count is wrong.</strong> Instruction 1 says the
          paper has &quot;a total of 18 questions&quot;. It has 9, and a student
          following the instructions answers 8 of them. The same wrong sentence
          is copied into the marking scheme. Correct it by hand. It is the first
          thing your head of department will query.
        </li>
        <li>
          <strong>The form level is nowhere on the paper.</strong> The teacher
          asked for Form 1 and Twiga confirmed Form 1 in the chat. The printed
          header still carries only the subject, the time and the year, and the
          filename says nothing either. Write the form and the stream on the
          master copy the day it arrives. In two weeks you will not be able to
          tell two of these papers apart.
        </li>
        <li>
          <strong>Some multiple choice questions repeat.</strong> In the paper
          that came back, three of the ten were near copies of an earlier
          question. Worse, the two on why the equator is hot were keyed to
          different answers. A student who reasons the same way twice loses a
          mark on one of them. Expect to rewrite or drop about three of them.
        </li>
        <li>
          <strong>Check the marking scheme too.</strong> In the same run, two
          answers in the matching question were swapped. Marking straight from
          that key marks correct work wrong, on every script.{" "}
          <a href="/guide/teachers/assessment/marking-schemes">
            Marking Schemes &amp; Answer Keys
          </a>{" "}
          gives the check to do before you mark.
        </li>
      </ul>

      <h2 id="what-it-cannot-do">What it cannot do</h2>
      <ul>
        <li>
          <strong>No maps, diagrams, graphs or data tables.</strong> All seven
          pages were prose. For Geography that is a real gap, because scale,
          bearings, gradient and reading rainfall figures cannot be tested
          without them. Treat what arrives as the written half of a paper and
          add your own map or data question. Twiga cannot draw one.
        </li>
        <li>
          <strong>One paper at a time.</strong> Nobody has yet tested asking for
          Paper 1 and Paper 2. Nor for a set number of questions, a different
          mark total, or a different duration. Twiga chose 100 marks and three
          hours by itself. If you need something else, plan to edit the file.
        </li>
      </ul>

      <Callout type="note" title="Files are the exception">
        A mock exam is the only Twiga output that arrives as a PDF. Lesson
        plans, notes and worksheets come back as chat text. Ask for one of those
        as a PDF and Twiga says it cannot send files, then tells you how to make
        the PDF yourself.
      </Callout>

      <h2 id="where-to-go-next">Where to go next</h2>
      <CardGrid>
        <GuideCard
          href="/guide/teachers/assessment/marking-schemes"
          title="Marking Schemes & Answer Keys"
          description="What is inside the second PDF, and the check to do before you mark a class set."
        />
        <GuideCard
          href="/guide/teachers/assessment/quizzes-and-exercises"
          title="Quizzes, Exercises & Exit Tickets"
          description="When you need a few questions now instead of a whole paper in ten minutes."
        />
        <GuideCard
          href="/guide/teachers/getting-started/checking-answers"
          title="Checking Twiga's Answers"
          description="How to read a generated answer before it reaches your students."
        />
      </CardGrid>
    </>
  );
}

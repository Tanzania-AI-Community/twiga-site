import {
  Callout,
  CardGrid,
  ChatSample,
  GuideCard,
  GuideHeading,
  Step,
  Steps,
} from "@/components/guide/content";

export default function PrintablesPage() {
  return (
    <>
      <GuideHeading
        eyebrow="Improvisation"
        title="Turning Chat Text Into Printables"
        description="Twiga answers in chat, not in files. Here is how to get a lesson plan or a worksheet off your phone and onto paper for tomorrow."
      />

      <p>
        The reply is good. The class is tomorrow. Now you need forty copies, and
        what you have is a wall of text in WhatsApp.
      </p>
      <p>
        Two things get you from there to paper. First you ask Twiga to lay it
        out as a page. Then you move it into Google Docs yourself. A teacher in
        the transcript did both from a phone and printed forty copies the same
        afternoon.
      </p>

      <h2 id="ask-for-the-printable-version">Ask for the printable version</h2>
      <p>Send this after any answer you want to hand out.</p>
      <pre>
        <code>give me the printable version</code>
      </pre>
      <p>
        Those words change the answer. They do not just fetch the same text
        again. The plain lesson plan ends with &ldquo;You can copy and use it
        directly in your class!&rdquo; and stops there. The printable version
        comes back laid out like a page. Title block, learning objectives,
        materials list, a timed lesson flow, homework, teacher notes. It even
        draws lines across the page between the sections.
      </p>
      <p>
        Twiga often offers it before you ask. If it does, just say yes to that
        offer.
      </p>

      <ChatSample
        messages={[
          { from: "teacher", text: "yes give me the printable version" },
          {
            from: "twiga",
            text: "Form 1 Geography Lesson Plan (Printable)\nTopic: Longitudes and Latitudes\nDuration: 45 minutes\n\nLearning Objectives:\n1. Define latitude and longitude and explain their importance in locating places.\n\nMaterials Needed:\n- Globe or world map with grid lines\n- Map of Tanzania, colored pencils, flashcards, chalkboard\n\nLesson Flow:\n1. Introduction (10 minutes)\n2. Direct Instruction (15 minutes)\n3. Class Activity (15 minutes)\n4. Closure (5 minutes)\n\nTeacher Notes:\n- Common mistake: students reverse the order or forget directions (N/S, E/W).\n\n---\n\n📄 You can copy and paste this into a document, print it, or share it with colleagues.",
          },
        ]}
      />

      <Callout type="note" title="It reformats, it does not rethink">
        Look at the materials list above. It still wants a globe. Asking for the
        printable version changes the layout, not the content. If the plan
        assumes equipment your school does not have, fix that when you first
        ask. See{" "}
        <a href="/guide/teachers/improvisation/no-materials">
          Teaching With No Materials
        </a>
        .
      </Callout>

      <h2 id="there-is-no-file-except-for-exams">
        There is no file, except for exams
      </h2>
      <p>
        Ask for a PDF of a lesson plan and you will not get one. This is not
        about the wording of your request. Only the exam path can produce a
        file. Everything else comes back as chat text, however you ask for it.
      </p>

      <table>
        <thead>
          <tr>
            <th>What you ask for</th>
            <th>What arrives</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Mock exam</td>
            <td>
              A PDF attachment in the chat after about ten minutes, and the
              solutions as a second attachment.
            </td>
          </tr>
          <tr>
            <td>Lesson plan</td>
            <td>Chat text.</td>
          </tr>
          <tr>
            <td>Worksheet</td>
            <td>Chat text.</td>
          </tr>
          <tr>
            <td>Quiz or exercises</td>
            <td>Chat text.</td>
          </tr>
        </tbody>
      </table>

      <p>
        So stop waiting for an attachment that is not coming. Make the file
        yourself. It takes about a minute.
      </p>

      <h2 id="six-steps-to-a-pdf-on-your-phone">
        Six steps to a PDF on your phone
      </h2>
      <Steps>
        <Step title="Copy the whole reply">
          Press and hold the message in WhatsApp, then choose Copy.
        </Step>
        <Step title="Open Google Docs, Word or your Notes app">
          Google Docs works best on both Android and iPhone. Make a new blank
          document.
        </Step>
        <Step title="Paste the text">
          Paste it all in. Do not retype anything.
        </Step>
        <Step title="Go to File, then Print">
          On a phone this may be under the share or export option instead.
        </Step>
        <Step title='Choose "Save as PDF" instead of a printer'>
          The phone offers this in the same list where printers appear.
        </Step>
        <Step title="Save it">
          Pick Downloads or Drive. Now you have a file you can send to the
          office to print, or share with another teacher.
        </Step>
      </Steps>

      <h2 id="tables-arrive-as-straight-lines">
        Tables arrive as straight lines
      </h2>
      <p>
        This is the part that makes teachers throw away something usable. Twiga
        writes tables with the <code>|</code> character. WhatsApp cannot draw
        tables, so a worksheet arrives looking like this.
      </p>

      <ChatSample
        messages={[
          {
            from: "twiga",
            text: "📄 PRINTABLE WORKSHEET\nSubject: Geography | Form 1\nTopic: Longitudes and Latitudes\n\n---\n\nA. Write the approximate coordinates\n\n| Place | Latitude | Longitude |\n|-------|----------|-----------|\n| Arusha | ____ | ____ |\n| London | ____ | ____ |\n| Sydney | ____ | ____ |\n\nB. Short answer\n1. Why does latitude affect climate? _________\n2. Why does longitude affect time? _________\n\nStudent Name: _____________\nDate: _____________\nClass: _____________",
          },
          {
            from: "teacher",
            text: "printed 40 copies at the office. the tables came out fine in docs",
          },
        ]}
      />

      <p>
        It looks broken in the chat. It is not broken. Those lines become a real
        table once the text is in a document.
      </p>
      <ul>
        <li>
          <strong>Google Docs:</strong> paste it and let Docs convert it, or
          select the rows and use Format, then Table.
        </li>
        <li>
          <strong>Word:</strong> select the rows, then Insert, Table, Convert
          Text to Table.
        </li>
      </ul>
      <p>
        Never judge a worksheet by how it looks in WhatsApp. Judge it after the
        paste.
      </p>

      <h2 id="what-a-printable-worksheet-contains">
        What a printable worksheet contains
      </h2>
      <p>
        The best one in the transcript was genuinely ready for the class. It is
        fair to expect this shape:
      </p>
      <ul>
        <li>A header block with subject, form and topic.</li>
        <li>Seven numbered activities, each with its own instruction line.</li>
        <li>Fill in the blank lines for students to write on.</li>
        <li>Cards to cut out for a memory game.</li>
        <li>A marking rubric, four criteria by three levels, scored out of 12.</li>
        <li>Student Name, Date and Class fields at the foot.</li>
      </ul>

      <h2 id="if-you-see-a-tool-failure-keep-reading">
        If you see a tool failure, keep reading
      </h2>
      <p>
        That worksheet only exists because something broke. Twiga said it was
        generating exercises from the course content. Then it said the exercise
        tool had an issue. Then it wrote the whole printable worksheet straight
        into the chat instead. The best worksheet in the whole transcript
        arrived that way, after a failure message.
      </p>

      <Callout type="warning" title="Do not resend the request">
        A holding message followed by a failure message is not the end of the
        reply. Read what comes after it before you ask again. Sending the same
        request a second time can land on the same broken tool.
      </Callout>

      <h2 id="ask-for-the-layout-you-want">Ask for the layout you want</h2>
      <p>
        Twiga also offers to format an answer with headings, bullet points and
        spacing set up for PDF. Nobody in the transcript took that offer, so
        this page cannot promise what it returns. It costs one message, so it is
        worth trying when the layout matters.
      </p>

      <h2 id="where-to-go-next">Where to go next</h2>
      <CardGrid>
        <GuideCard
          href="/guide/teachers/assessment/mock-exams"
          title="Mock Exams"
          description="The one request that does come back as a PDF file, plus the wait to expect and the separate solutions attachment."
        />
        <GuideCard
          href="/guide/teachers/improvisation/your-own-notes"
          title="Working From Your Own Notes"
          description="Where the worksheet on this page came from: paste your own pages and ask for what to build on them."
        />
      </CardGrid>
    </>
  );
}

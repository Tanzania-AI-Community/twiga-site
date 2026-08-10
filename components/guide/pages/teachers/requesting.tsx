import {
  Callout,
  CardGrid,
  ChatSample,
  GuideCard,
  GuideHeading,
} from "@/components/guide/content";

export default function RequestingLessonPlanPage() {
  return (
    <>
      <GuideHeading
        eyebrow="Lesson Plans"
        title="Requesting a Lesson Plan"
        description="One message with five details gets a plan you can teach as it is. Here is what to put in that message, and what you get back when you leave something out."
      />

      <p>
        It is evening. You teach the lesson tomorrow morning, and you do not
        want to answer three questions from a bot before you see anything.
      </p>
      <p>
        You do not have to. Twiga can build the whole plan from your first
        message, as long as that message carries five details.
      </p>

      <h2 id="the-message-to-send">The message to send</h2>
      <p>
        Copy this line, swap in your own lesson, and send it. Type it the way
        you normally type on your phone. Lowercase and short words are fine.
      </p>
      <pre>
        <code>{`im teaching geography form 1 tomorrow, map reading, title is longitudes and latitudes. 40 min period, short plan pls. i have no teaching aids at all, just a chalkboard`}</code>
      </pre>

      <p>
        That one line names the class, the subject, the topic, the lesson title,
        the length of your period, and what your room has. Here is what comes
        back.
      </p>

      <ChatSample
        messages={[
          {
            from: "teacher",
            text: "im teaching geography form 1 tomorrow, map reading, title is longitudes and latitudes. 40 min period, short plan pls. i have no teaching aids at all, just a chalkboard",
          },
          {
            from: "twiga",
            text: "Lesson Title: Longitudes and Latitudes\nClass: Form 1 • Subject: Geography\nTopic: Map Reading • Time: 40 minutes\n\nTeaching Aids:\n• Chalkboard grid drawn by hand\n• Students' own arms as the two axes\n• The classroom floor as the globe\n\nLesson Flow:\n1. Introduction (8 min): ask which way is north from the door, then draw one horizontal and one vertical line on the board\n2. Development (22 min): latitude runs east to west, longitude runs north to south; label the equator and the prime meridian as 0°; write three coordinates as (latitude, longitude)\n3. Conclusion (10 min): students give the coordinates of two towns from the board grid\n\nAssessment: each student writes one pair of coordinates and reads it aloud\nHomework: find Dar es Salaam's latitude and longitude in the textbook",
          },
        ]}
      />

      <p>
        Look at the teaching aids. A hand drawn grid, the students' own arms,
        the classroom floor. No globe, no wall map, no projector. The request
        said the room had none, so the plan asked for none.
      </p>

      <h2 id="the-five-details">The five details Twiga needs</h2>
      <p>
        Ask Twiga what it needs to build a plan and it lists exactly these five.
      </p>

      <table>
        <thead>
          <tr>
            <th>Detail</th>
            <th>In the example</th>
            <th>What it decides</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Class</td>
            <td>form 1</td>
            <td>How hard the content is.</td>
          </tr>
          <tr>
            <td>Subject</td>
            <td>geography</td>
            <td>
              Already on your profile, so Twiga treats it as confirmed. Say it
              anyway if you registered more than one subject.
            </td>
          </tr>
          <tr>
            <td>Topic and subtopic</td>
            <td>map reading</td>
            <td>Which part of the syllabus the plan is built from.</td>
          </tr>
          <tr>
            <td>Lesson title</td>
            <td>longitudes and latitudes</td>
            <td>The title at the top of the plan, and what it focuses on.</td>
          </tr>
          <tr>
            <td>Class context</td>
            <td>40 min period, no teaching aids, just a chalkboard</td>
            <td>
              Period length, what your room has, and whether the class is new to
              the topic.
            </td>
          </tr>
        </tbody>
      </table>

      <Callout type="warning" title="Twiga's own question asks for only three">
        <p>
          Send a short request and Twiga writes back with questions. It asks
          which form, which topic or subtopic, and whether you have a lesson
          title. It never asks about your room. The shorter list is the
          incomplete one. Answer it and you get a plan built for a room you do
          not have.
        </p>
      </Callout>

      <h2 id="class-context-has-teeth">
        Class context is the detail with teeth
      </h2>
      <p>
        One teacher asked for the same Geography lesson without saying what he
        had. The plan came back with a Materials Needed list: a globe or world
        map with grid lines, a map of Tanzania with grid lines, coloured
        pencils, flashcards, a chalkboard or projector, and a protractor.
      </p>
      <p>
        Nothing in that plan is wrong. It just could not be taught in his room.
        He had no physical materials at all.
      </p>
      <p>
        When he said so, Twiga answered in seconds with low resource ideas. Use
        your body as a globe. Stand in front of the class as the Earth's axis.
        Same topic, same bot, one extra line in the request.
      </p>

      <Callout type="tip" title="The line to add">
        <p>
          <code>i have no teaching aids at all, just a chalkboard</code>
        </p>
        <p>
          Or say what you do have. A textbook and one wall map is different from
          nothing, and Twiga will use whichever you name.
        </p>
      </Callout>

      <h2 id="what-a-short-request-gets-you">What a short request gets you</h2>
      <p>Here is the same job done in five words.</p>

      <ChatSample
        messages={[
          {
            from: "teacher",
            text: "nitengenezee kwa ajili ya biolojia",
          },
          {
            from: "twiga",
            text: "Lesson Plan: Biolojia (Fomu 1)\nWakati: Somo la 40 Dakika\nMada: Ukuaji (Growth)",
          },
        ]}
      />

      <p>
        No form, no topic, no length. Twiga chose all three on its own: Form 1,
        the topic Ukuaji, a 40 minute period. It did not ask first, and it did
        not say it was guessing.
      </p>
      <p>
        This is the trap. The plan looks finished. It is just not the lesson you
        are teaching.
      </p>

      <h2 id="check-it-before-you-teach-it">Check it before you teach it</h2>
      <p>
        A full plan can come back in seconds. The most complete request in our
        chat logs named the subject, the form, the topic and the language in one
        line. The plan came back 21 seconds later.
      </p>
      <p>Fast is not the same as correct. Two things to read before class.</p>
      <ul>
        <li>
          <strong>The class and topic in the header.</strong> If Twiga guessed a
          form or a topic you did not name, it will be sitting right at the top.
        </li>
        <li>
          <strong>The sources footer.</strong> One Form 2 Book Keeping plan on
          trial balance ended with a source line pointing at a Geography book,
          Form Two, Chapter Two, on Agriculture. That is the wrong book
          altogether.
        </li>
      </ul>

      <h2 id="if-nothing-comes-back">If nothing comes back</h2>
      <p>
        Sometimes Twiga sends <code>Creating a lesson plan, please hold...</code>{" "}
        and then sends nothing at all. This is a real fault. One teacher waited
        eight minutes and asked again. Twiga replied that it had already sent
        the full plan above. It had not.
      </p>
      <p>Do not keep waiting. Do one of these two things.</p>
      <ul>
        <li>
          Send <code>can i get the printable version</code>. That is what the
          teacher did, and the missing plan arrived.
        </li>
        <li>Send your original one line request again, word for word.</li>
      </ul>

      <h2 id="swahili-works-too">Kiswahili works too</h2>
      <p>
        Twiga works in Kiswahili and in English. The five details are the same
        in either language. Add <code>kiswahili tafadhali</code> if you want the
        plan itself in Kiswahili.
      </p>
      <p>
        That 21 second plan was asked for in Kiswahili. The teacher wrote in
        Kiswahili, asked for a Kiswahili plan, and got one.
      </p>

      <h2 id="where-to-go-next">Where to go next</h2>
      <CardGrid>
        <GuideCard
          href="/guide/teachers/lesson-plans/anatomy"
          title="What's in a Twiga Lesson Plan"
          description="The sections you get, the ones that go missing, and how to ask for the rest in the same chat."
        />
        <GuideCard
          href="/guide/teachers/improvisation/no-materials"
          title="Teaching With No Materials"
          description="More on the low resource ideas Twiga gives once you say what your room has."
        />
        <GuideCard
          href="/guide/teachers/troubleshooting/language"
          title="Language: English & Kiswahili"
          description="Which language to write in, and what to proofread in a Swahili reply."
        />
        <GuideCard
          href="/guide/teachers/getting-started/checking-answers"
          title="Checking Twiga's Answers"
          description="The quick check that catches wrong forms, wrong sources and invented facts."
        />
      </CardGrid>
    </>
  );
}

import {
  Callout,
  CardGrid,
  ChatSample,
  GuideCard,
  GuideHeading,
} from "@/components/guide/content";

export default function NoMaterialsPage() {
  return (
    <>
      <GuideHeading
        eyebrow="Improvisation"
        title="Teaching With No Materials"
        description="One line in your message stops Twiga asking for a globe you do not have. Here is the line to add, and what comes back instead."
      />

      <p>
        No globe. No wall map. No projector, no printer, and the flashcards were
        never bought. You are still teaching the topic tomorrow.
      </p>
      <p>
        Twiga never asks what your classroom has. It fills the gap with a normal
        equipment list. So you have to say it, in the same message as the topic,
        every time.
      </p>

      <h2 id="the-line-to-add">The line to add</h2>
      <p>
        This is the line a real teacher sent, and it is the one to copy. Change
        the topic to yours and leave the rest.
      </p>
      <pre>
        <code>
          i&apos;m looking for alternatives on how to explain to students
          longitudes and latitudes, as right now i dont have any materials to
          explain to them physically
        </code>
      </pre>
      <p>
        The short version works too. Add{" "}
        <code>i dont have any materials</code> to the end of a request you were
        already going to send. Use it on lesson plan requests too, not only on
        requests for an explanation.
      </p>

      <Callout type="warning" title="It has to be in the same message">
        Twiga does not remember your empty cupboard from last week, and it will
        not ask. Saying it once does not cover the next request. Add the line to
        every request that could come back needing equipment.
      </Callout>

      <h2 id="what-comes-back">What comes back</h2>
      <p>
        You get a completely different answer. Instead of a plan built around
        equipment, you get ways to teach it with the room you are standing in.
      </p>

      <ChatSample
        messages={[
          {
            from: "teacher",
            text: "i'm looking for alternatives on how to explain to students longitudes and latitudes, as right now i dont have any materials to explain to them physically",
          },
          {
            from: "twiga",
            text: "Let me share some practical, low-resource strategies you can use right now without physical materials:\n\n1. Use Your Body as a Globe 🌍\nStand in the middle of the class as the Earth's axis. Lean slightly to show the tilt (23.5°). Ask students to form a circle around you: that circle is the Equator.\n\n2. Draw on the Floor or Ground\nChalk on the floor, or tape/string. A circle for the Equator, parallel lines above and below for latitudes, vertical lines top to bottom for longitudes.\n\n3. Use a Ball or Any Round Object\nAny ball, even a crumpled paper ball, can represent Earth. Mark the Equator and Prime Meridian on it.\n\n4. Hand Gestures and Movement\nArms held horizontally = latitudes. Arms stretched head to feet = longitudes.\n\n5. Storytelling Approach\n\"Imagine Earth is an orange. The lines around it like rubber bands are latitudes. The lines from top to bottom like slices are longitudes.\"\n\n6. Simple Classroom Activity\nStudents draw a small circle on paper and label the Equator and Prime Meridian.",
          },
        ]}
      />

      <h2 id="sort-them-by-what-your-room-has">
        Sort them by what your room has
      </h2>
      <p>
        Twiga numbers the six strategies in its own order. This order is more
        useful. Read down the table and stop at the first row your classroom can
        manage.
      </p>

      <table>
        <thead>
          <tr>
            <th>Strategy</th>
            <th>What it costs you</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Your body as the globe</td>
            <td>Nothing.</td>
          </tr>
          <tr>
            <td>Hand gestures for the two kinds of line</td>
            <td>Nothing.</td>
          </tr>
          <tr>
            <td>The orange story</td>
            <td>Nothing. Just your voice.</td>
          </tr>
          <tr>
            <td>Draw the lines on the floor</td>
            <td>Chalk, and a clear patch of floor.</td>
          </tr>
          <tr>
            <td>Students draw and label a small circle</td>
            <td>One scrap of paper each.</td>
          </tr>
          <tr>
            <td>A ball as the Earth</td>
            <td>A ball, plus something to mark it with.</td>
          </tr>
        </tbody>
      </table>

      <p>
        Three of the six need nothing at all. That is the part worth noticing.
        You can teach the lesson standing in front of the class with empty
        hands.
      </p>

      <h2 id="the-orange-word-for-word">The orange, word for word</h2>
      <p>
        This is the strongest line in the whole reply, and it is safe to read
        straight out to the class:
      </p>
      <blockquote>
        <p>
          &ldquo;Imagine Earth is an orange. The lines around it like rubber
          bands are latitudes. The lines from top to bottom like slices are
          longitudes.&rdquo;
        </p>
      </blockquote>
      <p>
        Then give the payoff. Latitudes never meet. Longitudes meet at the
        poles. Every student has held an orange, so nothing has to be imagined
        from scratch.
      </p>

      <h2 id="leave-the-line-out-and-you-get-a-shopping-list">
        Leave the line out and you get a shopping list
      </h2>
      <p>
        Same teacher, same topic, nothing said about materials. This is what
        came back.
      </p>

      <ChatSample
        messages={[
          {
            from: "teacher",
            text: "i am teaching geography form 1, map reading. the title is longitudes and latitudes",
          },
          {
            from: "twiga",
            text: "Form 1 Geography Lesson Plan\nTopic: Longitudes and Latitudes\nDuration: 45 minutes\n\nMaterials Needed:\n• Globe or world map with latitude and longitude lines\n• Map of Tanzania with grid lines\n• Colored pencils or markers\n• Flashcards with key terms\n• Chalkboard or projector\n• Protractor (optional, for demonstration)\n\nLesson Flow:\n1. Introduction (10 minutes)\n   • Show a globe and ask: \"How do we find a place like Dar es Salaam on a map?\"",
          },
        ]}
      />

      <p>
        The plan is not wrong. It was written for a school that owns all of
        that. Notice that the very first activity is &ldquo;Show a globe&rdquo;,
        so the whole introduction falls apart if you do not have one.
      </p>
      <p>
        <strong>Check the Materials Needed list first.</strong> That is where
        you see what Twiga has assumed. If it lists something your school does
        not own, send the line above and ask again.
      </p>

      <h2 id="read-the-activity-before-you-run-it">
        Read the activity before you run it
      </h2>
      <p>
        The strategies are good. Nobody has checked them for you. Strategy 1
        arrived with a real mistake in it, and this page has already fixed it in
        the message above.
      </p>

      <Callout type="warning" title="The tilt belongs to you, not to the circle">
        Twiga wrote that the students forming the circle should tilt slightly to
        show the Earth&apos;s tilt. That is backwards. The circle of students is
        the Equator and it stays flat. You are the axis, standing in the middle,
        and you are the one who leans. Run it the way Twiga wrote it and the
        class leaves believing the Equator is tilted.
      </Callout>

      <p>
        Two smaller things to fix as you read:
      </p>
      <ul>
        <li>
          <strong>The ball strategy still asks you to mark the ball.</strong> In
          the original reply it said to use a marker, and markers were on the
          equipment list it had just dropped. Use chalk on the paper ball
          instead, or fold the paper once and let the crease be the Equator.
        </li>
        <li>
          <strong>The floor drawing assumes a floor.</strong> Chalk does not
          hold on packed earth, and a class of sixty at shared desks may have no
          clear space. The same diagram works scratched in the dust outside, or
          drawn once on the board.
        </li>
      </ul>

      <Callout type="note" title="What this page does not claim">
        These strategies are what Twiga returns. The teacher in the transcript
        never reported back on how the lesson went, so nothing here is a promise
        about what works in class. Read them, fix what is wrong, then decide.
      </Callout>

      <h2 id="what-twiga-offers-next">What Twiga offers next</h2>
      <p>
        After the strategies, Twiga offers three follow-ups in its own words. A
        short practice exercise. A simple diagram description you can draw on
        the board. A fun quiz or game.
      </p>
      <p>
        The board diagram is the useful one when you have nothing to show. Ask
        for it by name instead of replying &ldquo;yes&rdquo;, so it is clear
        which one you mean. Nobody in the transcript took any of the three, so
        this page cannot show you what comes back.
      </p>

      <Callout type="tip" title="It answers subjects you did not register">
        In the transcript this teacher was registered for Computer Science, and
        Twiga still answered the Geography question and called it &ldquo;your
        Geography class&rdquo;. So a subject you did not list at sign up will
        still get an answer.
      </Callout>

      <h2 id="where-to-go-next">Where to go next</h2>
      <CardGrid>
        <GuideCard
          href="/guide/teachers/improvisation/your-own-notes"
          title="Working From Your Own Notes"
          description="No textbook to hand out either? Paste the pages you are teaching from and get activities built on your own examples."
        />
        <GuideCard
          href="/guide/teachers/improvisation/printables"
          title="Turning Chat Text Into Printables"
          description="Get the strategies or a worksheet onto paper for tomorrow, using a phone and Google Docs."
        />
        <GuideCard
          href="/guide/teachers/getting-started/subjects"
          title="Choosing Your Subjects"
          description="What the subjects on your profile actually change, and what they do not."
        />
      </CardGrid>
    </>
  );
}

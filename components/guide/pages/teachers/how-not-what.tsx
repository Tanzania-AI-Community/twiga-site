import {
  Callout,
  CardGrid,
  ChatSample,
  GuideCard,
  GuideHeading,
} from "@/components/guide/content";

export default function HowNotWhatPage() {
  return (
    <>
      <GuideHeading
        eyebrow="Teaching Practice"
        title="Ask How to Teach It, Not What It Is"
        description="One topic can give you two very different answers. Ask what the topic is and you get the syllabus. Ask how to teach it and you get sentences you can say to the class."
      />

      <p>
        You already know the topic. It is on the scheme of work and you are
        teaching it in the morning. What you do not have is the first thing to
        say when you are standing in front of forty students.
      </p>
      <p>
        That is a different question, and Twiga answers it only if you ask it.
        Send the topic name and you get the curriculum. Ask how to teach it and
        you get words you can say.
      </p>

      <h2 id="the-same-topic-asked-two-ways">The same topic, asked two ways</h2>
      <p>
        Here is one teacher, one topic, two minutes apart. Watch what changes in
        the reply when the question changes.
      </p>

      <ChatSample
        messages={[
          {
            from: "teacher",
            text: "fractions maths form 1, what does the syllabus cover",
          },
          {
            from: "twiga",
            text: "Based on the official TIE curriculum for Mathematics Form 1:\n\n3. Fractions and Decimals\n - Conversion between fractions and decimals\n - Operations on fractions and decimals\n - Rounding off numbers and decimals\n\n4. Ratios, Proportions and Percentages\n - Meaning and application of ratios\n - Converting between fractions, decimals and percentages\n\nWould you like detailed notes or practice questions on any of these? 📚➗",
          },
          {
            from: "teacher",
            text: "ok wait one of my students just asked why we even need fractions in real life. how do i answer that without sounding like a robot?",
          },
          {
            from: "twiga",
            text: 'Great question from your student, many learners wonder this. Here\'s a natural way to respond:\n\n"Imagine you\'re at the market with a friend, and you buy one big pawpaw for 1,000/= to share. You cut it into two equal parts, each of you gets ½. That half? That\'s a fraction!\n\nOr think about ugali, if your mum cooks for four people, she uses ¼ of the flour for each plate.\n\nEven in football, if a match is 90 minutes, halftime is at 45 minutes, which is ½ of the game."\n\nYou can turn it into a quick class activity:\nAsk: "Who here has shared a soda, a piece of cake, or airtime?"',
          },
        ]}
      />

      <p>
        The first reply is correct. It is also nothing you can say out loud.
        The second reply comes back inside quote marks, and the examples are a
        market, a plate of ugali and a football match. Nobody asked for the
        class activity at the end. It arrived because the question was about
        teaching.
      </p>

      <h2 id="four-things-to-name">Four things to name</h2>
      <p>
        Four things move the answer. The teacher named them across this chat
        without thinking about it, and each one changed what came back.
      </p>
      <ul>
        <li>
          <strong>Your own words.</strong> &quot;how do i answer&quot; asks for
          speech, not for a summary of the topic.
        </li>
        <li>
          <strong>The class.</strong> &quot;form 1&quot;, &quot;14 year
          olds&quot;. This sets the vocabulary.
        </li>
        <li>
          <strong>The format.</strong> &quot;1-line&quot;, &quot;a short
          paragraph&quot;, &quot;three bullet points&quot;. Twiga follows this
          literally.
        </li>
        <li>
          <strong>The tone.</strong> &quot;without sounding like a robot&quot;.
          Say how it should sound and it changes how it sounds.
        </li>
      </ul>
      <p>You can put all four in one message:</p>
      <pre>
        <code>
          {`a student asked me why we even need fractions in real life. how do i answer that in 3 sentences without sounding like a robot? maths form 1`}
        </code>
      </pre>

      <h2 id="twigas-own-template">Twiga&apos;s own template for this</h2>
      <p>
        Twiga describes this pattern itself. Send a message shaped like this
        one:
      </p>
      <pre>
        <code>{`How should I teach the trial balance to Form 1?`}</code>
      </pre>
      <p>It says that shape gets you three things:</p>
      <ul>
        <li>A simple lesson flow</li>
        <li>Common student mistakes to watch for</li>
        <li>Tips to make the topic clear and engaging</li>
      </ul>
      <p>
        Swap in your topic and your form. &quot;How should I teach map reading
        to Form 1?&quot; works the same way.
      </p>

      <h2 id="name-the-format-and-it-obeys">Name the format and it obeys</h2>
      <p>
        Of the four, the format is the strongest. Ask for one line and you get
        one line.
      </p>

      <ChatSample
        messages={[
          {
            from: "teacher",
            text: "ok im now going to physics form 2. give me a 1-line intro for newtons first law that 14 year olds will actually remember",
          },
          {
            from: "twiga",
            text: '"An object will stay still or keep moving in a straight line unless a force, like a push, pull, or stop, makes it change!"',
          },
        ]}
      />

      <p>
        One sentence. No bullets, no headings, and no offer of anything more.
        Almost every other reply ends with a menu of follow-ups. This one does
        not. A tight instruction about length shuts that menu off too. When it
        is missing, you know the instruction landed.
      </p>

      <h2 id="check-it-before-students-write-it-down">
        Check it before students write it down
      </h2>
      <p>
        That Newton sentence is built to be remembered, not to be marked. It
        drops &quot;constant speed&quot; and &quot;net force&quot;, and it
        lists &quot;a stop&quot; as a kind of force. That is a fair trade for a
        hook at the start of a lesson. It is not the wording you mark an answer
        against.
      </p>

      <Callout type="warning" title="Two requests, not one">
        Use the memorable version to open the lesson. Then send a second
        message asking for the exact syllabus wording. Use that one for the
        notes students copy and for your answer key. Do the same with the
        friendly examples. Check &quot;¼ of the flour per plate&quot; against
        your own textbook before it becomes the definition.
      </Callout>

      <h2 id="when-you-have-nothing-to-teach-with">
        When you have nothing to teach with
      </h2>
      <p>
        Saying what you do not have changes the answer too. Add{" "}
        <code>i dont have any materials</code> to a request and the answer
        stops assuming a globe and a projector. It comes back built around the
        room, your voice and the students already sitting in it.
      </p>
      <p>
        That one line is worth its own page, and it has one:{" "}
        <a href="/guide/teachers/improvisation/no-materials">
          Teaching With No Materials
        </a>
        .
      </p>

      <h2 id="where-to-go-next">Where to go next</h2>
      <CardGrid>
        <GuideCard
          href="/guide/teachers/teaching-practice/common-mistakes"
          title="Common Mistakes to Expect"
          description="Ask where the class will go wrong before you teach the topic, and get questions that catch it."
        />
        <GuideCard
          href="/guide/teachers/teaching-practice/difficult-questions"
          title="Answering Difficult Student Questions"
          description="The same move applied to a sensitive question a student has already asked you."
        />
        <GuideCard
          href="/guide/teachers/improvisation/no-materials"
          title="Teaching With No Materials"
          description="More on getting answers that fit a classroom with chalk, a board and nothing else."
        />
        <GuideCard
          href="/guide/teachers/getting-started/checking-answers"
          title="Checking Twiga's Answers"
          description="How to check wording against the syllabus before it reaches your students."
        />
      </CardGrid>
    </>
  );
}

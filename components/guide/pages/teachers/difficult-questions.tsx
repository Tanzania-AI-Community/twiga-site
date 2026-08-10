import {
  Callout,
  CardGrid,
  ChatSample,
  GuideCard,
  GuideHeading,
} from "@/components/guide/content";

export default function DifficultQuestionsPage() {
  return (
    <>
      <GuideHeading
        eyebrow="Teaching Practice"
        title="Answering Difficult Student Questions"
        description="A student asks something you were not ready for. Ask Twiga for the words to say, and for the reasoning behind them, so you can keep going when the discussion does not stop there."
      />

      <p>
        A Form 2 teacher wanted to know what to say if a student asked why
        girls were never taught in the past. He did not want to upset the rest
        of the class. This page is what he sent and what came back.
      </p>

      <h2 id="end-the-message-with-what-do-i-say">
        End the message with &quot;what do i respond with?&quot;
      </h2>
      <p>
        That ending is the whole trick. Ask Twiga to explain the topic
        and you get history. Ask what to respond with and you get a paragraph
        you can speak.
      </p>
      <p>Copy this and put your own question in it:</p>
      <pre>
        <code>
          {`a student asked me why girls where never taught in the early days. what do i respond with? form 2 civics`}
        </code>
      </pre>
      <p>
        The same ending works for anything else a class throws at you:
      </p>
      <pre>
        <code>
          {`a student asked me why some families cannot pay school fees. what do i say? form 2 civics
a student asked me about something they heard on the news last night. what do i respond with? form 1`}
        </code>
      </pre>
      <p>
        Always add the subject and the form. That keeps the answer at the level
        of the class in front of you.
      </p>

      <h2 id="what-comes-back">What comes back</h2>

      <ChatSample
        messages={[
          {
            from: "teacher",
            text: "what if students ask me why girls where never taught in the early days, what do i respond with?",
          },
          {
            from: "twiga",
            text: "Here's a balanced and curriculum-aligned way you can respond:\n\nHistorically, in many societies, including some communities in Tanzania before and during the colonial period, education was mainly given to boys. This was because of cultural beliefs that saw boys as future leaders, breadwinners, or representatives of the family, while girls were expected to focus on home and family roles.\n\nHowever, these views have changed over time. Today we understand that both boys and girls have equal rights to education, and educating girls strengthens families, communities, and the whole nation.\n\nIt's also important to know that some communities always valued learning for girls, and there were women who broke barriers to get educated even when it was difficult.",
          },
        ]}
      />

      <p>
        It is a script, not an essay. Three short parts: what happened, what
        changed, and a reminder that some communities always valued learning
        for girls.
      </p>

      <h2 id="keep-the-reasoning-not-just-the-words">
        Keep the reasoning, not just the words
      </h2>
      <p>
        The second half of the reply is the half teachers should save. Twiga
        listed four reasons that wording is safe to use in a Tanzanian
        classroom:
      </p>

      <ChatSample
        messages={[
          {
            from: "twiga",
            text: "This response:\n- Explains the historical context without blaming any group.\n- Aligns with civic education and social values in the Tanzanian curriculum.\n- Promotes gender equality, which is supported by TIE and NECTA.\n- Keeps the focus on progress and national development.\n\nYou can add a short example like:\nThink of leaders like Samia Suluhu Hassan, her education helped her rise to serve our country. That shows why every girl's education matters.\n\nLet me know if you'd like a simple class discussion activity or a short reading passage on this topic!",
          },
        ]}
      />

      <p>
        A paragraph runs out after thirty seconds. Then a student asks the
        follow-up nobody scripted. Those four rules are what you steer by:
        explain, do not blame, stay with the curriculum, keep the focus on
        progress. If a reply arrives without them, ask{" "}
        <code>why is this the right way to answer it?</code>
      </p>

      <h2 id="ask-about-the-room">
        Ask about the room. It does not come on its own
      </h2>
      <p>
        This is the gap. The teacher&apos;s real worry was answering{" "}
        <em>without upsetting others in the class</em>. Twiga answered the
        question and said nothing at all about the class. Nothing about a
        student who argues back. Nothing about a boy who feels accused or a
        girl who feels singled out. Nothing about how long to let it run.
      </p>
      <p>Ask for that separately. It will not arrive by itself.</p>
      <pre>
        <code>
          {`if a student argues back or the boys feel accused, what do i say? and how long should i spend on this before going back to the lesson?`}
        </code>
      </pre>

      <h2 id="turn-it-into-class-time">Turn it into class time</h2>
      <p>
        Replies like this usually end with an offer of an activity or a reading
        passage. Take it, and say the form, the subject and the minutes you
        actually have.
      </p>

      <ChatSample
        messages={[
          {
            from: "teacher",
            text: "yes the class discussion activity please, form 2 civics. i have about 10 minutes",
          },
          {
            from: "twiga",
            text: 'Class Discussion: 10 minutes\nCivics, Form 2. Education and equal rights\n\n1. In pairs (3 min): Name one thing that is easier for a learner today than it was for your grandmother.\n\n2. Whole class (5 min): What does a community gain when every learner finishes school? Take three answers.\n\n3. Closing (2 min): Each learner writes one sentence, "Education matters to me because…"\n\nWant this as a short reading passage instead? Just say so.',
          },
        ]}
      />

      <p>
        Ten minutes, split three ways, with the last two minutes on paper so
        the class ends quietly instead of in an argument. For activities in
        general, and how to mark them, see{" "}
        <a href="/guide/teachers/teaching-practice/activities-and-games">
          Classroom Activities &amp; Games
        </a>
        .
      </p>

      <h2 id="before-you-say-it-in-class">Before you say it in class</h2>
      <ul>
        <li>
          <strong>Do not read it word for word.</strong> The script is written
          for a general secondary class. Say it in your own words, at the level
          of the form in front of you.
        </li>
        <li>
          <strong>Check any name or claim.</strong> Twiga offered Samia Suluhu
          Hassan as an example. Names, dates and anything that sounds like a
          statistic need a check before you say them to a class.
        </li>
        <li>
          <strong>Read it once before the lesson.</strong> If a sentence would
          land badly in your school or your community, cut it. You know the
          room and Twiga does not.
        </li>
      </ul>

      <Callout type="warning" title="Some questions do not belong here">
        Twiga did well on this history question in a civics lesson. It is not
        a counsellor. If a student tells you something about their own home,
        their safety or their health, do not put it into a chat. That goes to
        your school&apos;s own channels and the people trained for it.
      </Callout>

      <h2 id="where-to-go-next">Where to go next</h2>
      <CardGrid>
        <GuideCard
          href="/guide/teachers/teaching-practice/how-not-what"
          title="Ask How to Teach It, Not What It Is"
          description="The wider version of the same move: ask for the words you will say, not for the topic."
        />
        <GuideCard
          href="/guide/teachers/teaching-practice/activities-and-games"
          title="Classroom Activities & Games"
          description="Turn the discussion into something students do, and get a way to mark it."
        />
        <GuideCard
          href="/guide/teachers/troubleshooting/language"
          title="Language: English & Kiswahili"
          description="Twiga answers in both. What to proofread in a Swahili reply before you use it."
        />
        <GuideCard
          href="/guide/teachers/getting-started/checking-answers"
          title="Checking Twiga's Answers"
          description="The sixty-second check for names, dates and invented facts."
        />
      </CardGrid>
    </>
  );
}

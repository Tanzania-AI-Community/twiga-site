import {
  Callout,
  CardGrid,
  ChatSample,
  GuideCard,
  GuideHeading,
} from "@/components/guide/content";

export default function ActivitiesAndGamesPage() {
  return (
    <>
      <GuideHeading
        eyebrow="Teaching Practice"
        title="Classroom Activities & Games"
        description="Three messages turn a topic into something students do. Ask for an activity, ask for a game version of it, then ask how to mark it."
      />

      <p>
        Copying notes off the board fills the period. It does not tell you who
        understood. An activity does both. Twiga will build one that needs
        nothing but your voice, the board and the students already sitting
        there.
      </p>

      <h2 id="say-the-class-and-what-you-do-not-have">
        Say the class and what you do not have
      </h2>
      <p>
        What you do not have is the important half of the message. Leave it out
        and you get a suggestion that assumes a projector.
      </p>
      <p>Put three things in one message:</p>
      <ul>
        <li>the topic, with the subject and the form</li>
        <li>the kind of activity you want</li>
        <li>your class size and what you do not have</li>
      </ul>
      <p>So the message looks like this:</p>
      <pre>
        <code>
          {`form 2 physics, forces. i need a practice activity they can actually do, not copy. 45 students and no materials`}
        </code>
      </pre>
      <p>Here is the same shape from a real chat, and what came back.</p>

      <ChatSample
        messages={[
          {
            from: "teacher",
            text: "form 1 english, producing short and coherent oral messages. i need a practice activity they can actually do, not copy. 40 students and no materials",
          },
          {
            from: "twiga",
            text: "Practice Activity: Producing Short and Coherent Oral Messages\nForm 1 English, no materials needed\n\n1. Role-play in pairs: each pair picks one scenario and delivers a 1 to 2 minute message:\n- You lost your school bag during break. Announce it to the class.\n- A new student asks the way to the school library.\n\n2. One-minute speech: each student stands and speaks on a favourite hobby, clean water in our community, or a memorable day at school.\nStructure: opening (greet + state the topic) → body (2 to 3 clear points) → closing (summarise, end politely).\n\n3. Group discussion: groups of 4 to 5 discuss one question for 5 minutes, then the spokesperson summarises to the class in under 2 minutes.\n\nWant a marking scheme for this?",
          },
        ]}
      />

      <p>
        Two things to notice. The second line repeats your limit back to you,
        which is how you know it was heard. And every activity carries a number
        you can act on: one to two minutes, groups of four or five, five
        minutes, under two minutes. An activity without minutes on it falls
        apart in a real period.
      </p>

      <h2 id="ask-for-a-game-version">Ask for a game version</h2>
      <p>
        The same lesson content comes back as something students play, for the
        cost of one more message.
      </p>

      <ChatSample
        messages={[
          {
            from: "teacher",
            text: "can you make this part into fun short game quizes, interactive and memorable",
          },
          {
            from: "twiga",
            text: 'Seven game quizzes for this part 🎯\n\n1. Minimal Pair Showdown: two teams. You say one word of a pair, students shout the match. First correct team scores.\nRounds: crowd → ? · rice → ? · seal → ? · air → ? · fine → ?\n\n2. Odd One Out 🔍: read three words; two are a minimal pair. Pray, play, table → odd one: table.\n\n3. Stress Detective 🕵️: write sentences on the board with the stress capitalised: "...helps to proDUCE fresh vegetables." Students read it aloud, then give PROduce.\n\n4. Minimal Pair Pelmanism 🃏: cards face down; flip two to find the pair. rice/lice, glow/grow, writer/rider.',
          },
        ]}
      />

      <p>
        Seven came back in the real chat. The first four are shown here. Games
        one to three need nothing but your voice and the board. Game four is
        the first one that needs something made the night before.
      </p>

      <h2 id="which-games-need-nothing">Which games need nothing</h2>
      <p>
        Here are all seven and what each one needs. Five of them run on nothing
        you have to prepare.
      </p>
      <table>
        <thead>
          <tr>
            <th>Game</th>
            <th>What you need</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Minimal Pair Showdown</td>
            <td>Your voice</td>
          </tr>
          <tr>
            <td>Odd One Out</td>
            <td>Three words read aloud</td>
          </tr>
          <tr>
            <td>Stress Detective</td>
            <td>The board</td>
          </tr>
          <tr>
            <td>Sentence Sprint</td>
            <td>Sixty seconds counted out loud</td>
          </tr>
          <tr>
            <td>Stress Clap Challenge</td>
            <td>Two hands</td>
          </tr>
          <tr>
            <td>Minimal Pair Pelmanism</td>
            <td>Cards written out beforehand</td>
          </tr>
          <tr>
            <td>Stress Shift Charades</td>
            <td>Slips of paper</td>
          </tr>
        </tbody>
      </table>
      <p>
        If you have no printer and no spare paper, skip the last two and run
        the other five as they are.
      </p>

      <h2 id="ask-how-to-mark-it">Ask how to mark it</h2>
      <p>
        Twiga often adds marking criteria you never asked for. Often is not
        always. You want to know what you are marking before the class starts,
        not after. So ask.
      </p>

      <ChatSample
        messages={[
          { from: "teacher", text: "and how do i mark it? something simple" },
          {
            from: "twiga",
            text: "Quick Assessment Rubric for the games\n- ✅ Correct pronunciation of minimal pairs\n- ✅ Accurate identification of stressed syllables\n- ✅ Clear and coherent sentence construction\n- ✅ Active participation and teamwork\n\nFor the speaking activity, mark on:\n- ✅ Clear greeting and introduction\n- ✅ Logical flow of ideas\n- ✅ Confident closing statement\n\nWant me to turn this into a marking scheme out of 10?",
          },
        ]}
      />

      <p>
        Ticks are enough for a game. If you need a number for your records, say
        yes to that last offer and name it:{" "}
        <code>yes, turn this into a marking scheme out of 10</code>. For
        anything heavier, see{" "}
        <a href="/guide/teachers/assessment/marking-schemes">
          Marking Schemes &amp; Answer Keys
        </a>
        .
      </p>

      <h2 id="check-the-word-pairs-first">Check the word pairs first</h2>
      <p>
        The sample rounds mix different things. Some are the pairs
        Swahili-speaking students really do trip on, like pray and play, glow
        and grow, rice and lice. Others test a different sound, like air and
        hair, or ten and pen.
      </p>
      <p>
        Pick the rows that match the errors you actually hear in your class,
        and say every pair out loud yourself before the lesson. A pair that
        does not sound different in your own accent will not work as a game.
      </p>
      <p>
        The stress words are all real noun and verb pairs. Use them straight
        off the reply: record, increase, desert, reject, refund, permit.
      </p>

      <Callout type="tip" title="Paste your notes first and the games use them">
        Two of these game names came from the teacher&apos;s own textbook
        pages. He had pasted them into the chat a minute earlier. Paste your
        notes first and the activities come back in your own words, so the
        class recognises them. See{" "}
        <a href="/guide/teachers/improvisation/your-own-notes">
          Working From Your Own Notes
        </a>
        .
      </Callout>

      <h2 id="if-you-ask-for-a-worksheet">If you ask for a worksheet</h2>
      <p>
        These replies often end by offering a printable worksheet. The tool
        that builds the file does not always work, so ask for the text in the
        chat instead:
      </p>
      <pre>
        <code>{`just write it here, no need to generate the exercise`}</code>
      </pre>
      <p>
        To get that text onto paper for your class, see{" "}
        <a href="/guide/teachers/improvisation/printables">
          Turning Chat Text Into Printables
        </a>
        .
      </p>

      <h2 id="where-to-go-next">Where to go next</h2>
      <CardGrid>
        <GuideCard
          href="/guide/teachers/improvisation/no-materials"
          title="Teaching With No Materials"
          description="More ways to get answers that fit a room with no globe, no charts and no projector."
        />
        <GuideCard
          href="/guide/teachers/assessment/marking-schemes"
          title="Marking Schemes & Answer Keys"
          description="When to turn a tick list into marks out of ten, and what to check in the key."
        />
        <GuideCard
          href="/guide/teachers/teaching-practice/common-mistakes"
          title="Common Mistakes to Expect"
          description="Find out what the class will get wrong before you build the game around it."
        />
        <GuideCard
          href="/guide/teachers/improvisation/printables"
          title="Turning Chat Text Into Printables"
          description="What to do when the file you asked for does not arrive."
        />
      </CardGrid>
    </>
  );
}

import {
  Callout,
  CardGrid,
  ChatSample,
  GuideCard,
  GuideHeading,
} from "@/components/guide/content";

export default function CommonMistakesPage() {
  return (
    <>
      <GuideHeading
        eyebrow="Teaching Practice"
        title="Common Mistakes to Expect"
        description="Send one sentence the night before you teach a topic. You get back where the class will go wrong, why they get confused, and two questions that catch it."
      />

      <p>
        You find out where students go wrong when you mark their books. That is
        a week too late. Twiga will tell you the night before, but only if you
        ask.
      </p>

      <h2 id="twiga-offers-this-and-nobody-asks">
        Twiga offers this, and nobody asks
      </h2>
      <p>
        Over four months of real use, Twiga offered to explain where students
        go wrong six separate times. It offered in its welcome menu. It offered
        at the end of a fractions answer. It offered at the end of a list of
        Book Keeping topics. It offered while turning down a subject it could
        not help with. It offered twice inside its own guide to itself.
      </p>
      <p>
        The teacher never took it up once. Not because it is hidden, but because
        nobody thinks to ask a machine what a class will find hard. This page
        gives you the sentence and what to do with the reply.
      </p>

      <h2 id="the-sentence-to-send">The sentence to send</h2>
      <p>Copy this and change the last part to your topic, subject and form.</p>
      <pre>
        <code>
          {`before i teach this tomorrow, where do students usually go wrong? trial balance, book keeping form 1`}
        </code>
      </pre>
      <p>
        Say the topic, the subject and the form together. Without the form,
        Twiga has to guess which class you mean. A Form 1 class does not go
        wrong in the same places as a Form 2 class.
      </p>

      <h2 id="what-comes-back">What comes back</h2>

      <ChatSample
        messages={[
          {
            from: "teacher",
            text: "before i teach this tomorrow, where do students usually go wrong? trial balance, book keeping form 1",
          },
          {
            from: "twiga",
            text: 'Trial Balance: Form 1\nWhere students usually go wrong 🤔\n\nCommon mistake: they enter balances on the wrong side, expenses and assets end up in the credit column, income and liabilities in the debit column.\n\nWhy they\'re confused: they memorise "debit left, credit right" as a rule about the page, not about what the account actually does.\n\nHow to correct it:\n- Simple analogy: debit is what the business has or has spent; credit is where the money came from.\n- Reinforce: make them name the account type out loud before writing it, "rent is an expense, expenses are debit".\n- Real-life example: an M-Pesa statement, money in one column, money out the other.\n\nWant 2 questions that catch this mistake?',
          },
        ]}
      />

      <p>The answer comes back in three parts, and all three are useful:</p>
      <ul>
        <li>
          <strong>The mistake itself.</strong> One sentence naming the wrong
          thing students actually do.
        </li>
        <li>
          <strong>Why they are confused.</strong> This is the part that changes
          how you teach. Here the class has memorised a rule about the page
          instead of a rule about the account.
        </li>
        <li>
          <strong>How to correct it.</strong> An analogy, something to make
          them say out loud, and an example from life outside school.
        </li>
      </ul>
      <p>
        Twiga describes this shape itself: find why they are confused, suggest
        a simple analogy or example, then offer exercises that correct the
        error. If a reply gives you only the first part, ask{" "}
        <code>why are they confused, and how do i correct it?</code>
      </p>

      <h2 id="then-ask-for-questions-that-catch-it">
        Then ask for questions that catch it
      </h2>
      <p>
        Knowing the mistake is not the same as knowing whether your class is
        making it. Ask for questions built to expose it.
      </p>

      <ChatSample
        messages={[
          { from: "teacher", text: "yes, 2 questions that catch exactly that" },
          {
            from: "twiga",
            text: 'Two questions designed to expose that exact error:\n\n1. Rent paid, 40,000/=. Which column does it go in, debit or credit? Say why in one sentence.\n\n2. Here is a trial balance with Capital placed under debit. Is it correct? If not, move it and explain.\n\nWhat a wrong answer tells you: if they get Q1 wrong they are guessing sides; if they get Q2 wrong they have not connected capital to "where the money came from".',
          },
        ]}
      />

      <p>
        The last line is the one to keep. It tells you what a wrong answer
        means. Two questions on the board then become a quick check of the
        whole class before you carry on.
      </p>

      <Callout type="tip" title="Name it, do not just say yes">
        <code>yes, 2 questions that catch exactly that</code> gets you the
        questions. A bare <code>yes</code> gets you a question back about what
        you meant. More on that in{" "}
        <a href="/guide/teachers/getting-started/how-to-ask">
          How to Ask Twiga
        </a>
        .
      </Callout>

      <h2 id="lesson-plans-carry-three-lines-of-this">
        Lesson plans carry three lines of this too
      </h2>
      <p>
        Ask for a lesson plan and some of this often arrives at the bottom,
        under Teacher Notes. A Form 1 Geography plan on latitude and longitude
        ended with exactly three lines:
      </p>
      <ul>
        <li>Reinforce correct order: latitude first, then longitude.</li>
        <li>
          Common mistake: students reverse the order or forget directions (N/S,
          E/W).
        </li>
        <li>Use real-life examples: GPS, weather reports, flight paths.</li>
      </ul>
      <p>
        Three lines is what you get for free. Ask the question on its own and
        you get the full answer, with the reasons and the corrections. If you
        are writing the plan anyway, put the question inside that request
        instead of sending two messages. See{" "}
        <a href="/guide/teachers/teaching-practice/how-not-what">
          Ask How to Teach It, Not What It Is
        </a>{" "}
        for the wording.
      </p>

      <h2 id="treat-it-as-a-warning-not-a-diagnosis">
        Treat it as a warning, not a diagnosis
      </h2>
      <p>
        Twiga has never met your class. What it gives you is the mistake
        students usually make on that topic. That is something to watch for,
        not a report on the thirty students in front of you. Your own marking
        still decides.
      </p>
      <p>Two things to check before the lesson:</p>
      <ul>
        <li>
          <strong>The numbers in the questions.</strong> Twiga made up the
          40,000/= rent figure for the example. Work both questions yourself
          before you write them on the board.
        </li>
        <li>
          <strong>The subject.</strong> Twiga answers within the subjects it
          covers for your form. One of those six offers came while it was
          turning down English Literature. An offer of teaching tips does not
          mean it covers everything you teach. See{" "}
          <a href="/guide/teachers/troubleshooting/limits">
            What Twiga Cannot Do
          </a>
          .
        </li>
      </ul>

      <h2 id="where-to-go-next">Where to go next</h2>
      <CardGrid>
        <GuideCard
          href="/guide/teachers/teaching-practice/difficult-questions"
          title="Answering Difficult Student Questions"
          description="For the question a student asks you in the middle of the lesson, not the mistake you expected."
        />
        <GuideCard
          href="/guide/teachers/assessment/quizzes-and-exercises"
          title="Quizzes, Exercises & Exit Tickets"
          description="Turn two catching questions into a full exit ticket for the end of the lesson."
        />
        <GuideCard
          href="/guide/teachers/lesson-plans/requesting"
          title="Requesting a Lesson Plan"
          description="Where the free three lines of Teacher Notes come from, and what else the plan contains."
        />
        <GuideCard
          href="/guide/teachers/getting-started/checking-answers"
          title="Checking Twiga's Answers"
          description="The quick check to run on any worked example before your class copies it."
        />
      </CardGrid>
    </>
  );
}

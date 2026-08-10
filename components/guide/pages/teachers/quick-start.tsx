import {
  Callout,
  CardGrid,
  ChatSample,
  GuideCard,
  GuideHeading,
} from "@/components/guide/content";

export default function TeacherQuickStartPage() {
  return (
    <>
      <GuideHeading
        eyebrow="Getting Started"
        title="Quick Start"
        description="One real conversation, start to finish. A teacher with twelve minutes before class gets what he needs in one message, then gets the next thing without starting over."
      />

      <p>
        Do not test Twiga with a made-up question. Ask it for the lesson you are
        actually teaching next. The answers get sharper the more real the
        request is, and you end up with something you can carry into the room.
      </p>

      <h2 id="the-first-message">The first message</h2>
      <p>
        Here is a real one. A teacher had a Form 1 maths class starting in
        twelve minutes and could not remember what came after integers.
      </p>

      <ChatSample
        messages={[
          {
            from: "teacher",
            text: "Mambo! I have my Form 1 maths class in 12 minutes and I just realised I forgot what topic comes after integers. Help!!",
          },
          {
            from: "twiga",
            text: "Mambo! No worries, I've got you covered. 😊\n\nAfter Integers, the next topic in Form 1 Mathematics is Fractions.\n\nThis includes:\n- Meaning and types of fractions (proper, improper, mixed)\n- Converting between improper fractions and mixed numbers\n- Operations on fractions (add, subtract, multiply, divide)\n- Solving problems involving fractions\n\nLet me know if you'd like:\n- A quick 2-minute summary for students?\n- One practice question to start the lesson?\n- Tips for teaching common misconceptions?",
          },
        ]}
      />

      <p>
        Notice what the message is. It is a panic, with a greeting on the front
        and two exclamation marks on the end. None of that matters. What matters
        is that it names the <strong>subject</strong>, the{" "}
        <strong>form</strong> and the{" "}
        <strong>thing he wants to know</strong>. The reply came back thirteen
        seconds later.
      </p>

      <h2 id="the-shape-you-get-by-default">The shape you get by default</h2>
      <p>
        That answer is long. It gives the topic, four subtopics, and three
        offers of what to do next. That is Twiga&apos;s default shape when you
        do not say what you want back.
      </p>
      <p>
        It is a good answer in a free period. With twelve minutes it is more
        than you can read. So say the shape you want, in the message itself.
      </p>

      <h2 id="say-the-shape-you-want">Say the shape you want</h2>
      <p>
        Three minutes later the same teacher moved on to a different class, a
        different subject and a different form level. He said so in the same
        chat, and he said exactly how much he wanted.
      </p>

      <ChatSample
        messages={[
          {
            from: "teacher",
            text: "ok recap im now going to physics form 2. give me a 1-line intro for newtons first law that 14 year olds will actually remember",
          },
          {
            from: "twiga",
            text: '"An object will stay still or keep moving in a straight line unless a force, like a push, pull, or stop, makes it change!"',
          },
        ]}
      />

      <p>
        One line asked for, one line back. The words that did the work were{" "}
        <code>1-line</code> and <code>that 14 year olds will actually
        remember</code>. Small words like those change the whole answer.
      </p>

      <h2 id="keep-going-in-the-same-chat">Keep going in the same chat</h2>
      <p>
        You never have to start again. The chat remembers what you have been
        talking about, so the next request can lean on the last one.
      </p>
      <p>
        Five minutes from an emergency staff meeting, the same teacher sent
        this:
      </p>

      <ChatSample
        messages={[
          {
            from: "teacher",
            text: "can you set me a quick 3 question exit ticket for the law you just gave me? mixed difficulty",
          },
          {
            from: "twiga",
            text: "Of course! Here's a quick 3-question exit ticket on Newton's First Law, easy, medium, and challenge:\n\n1. What happens to a ball lying on the ground if no one kicks it? Explain using Newton's First Law.\n\n2. A passenger in a moving car jerks forward when the car suddenly stops. Use Newton's First Law to explain why.\n\n3. True or False: An object in motion always needs a force to keep moving. Explain your answer.",
          },
        ]}
      />

      <p>
        <strong>The law you just gave me</strong> is the whole trick. He did not
        retype Newton&apos;s First Law and he did not say Physics or Form 2
        again. The chat carried it. Three graded questions came back six seconds
        later.
      </p>

      <Callout type="tip" title="The pattern to copy">
        <p>
          Ask a full question once. Then chain short follow-ups onto it. When
          you switch subject, say so in a few words and carry on in the same
          chat.
        </p>
      </Callout>

      <h2 id="read-it-before-you-teach-it">Read it before you teach it</h2>
      <p>
        Twiga&apos;s content comes from the TIE textbooks. Even so, a topic
        order, an intro line and an exit ticket are all worth one look against
        your own scheme of work. You are not proofreading a document. You are
        checking that it says what you expected. That is thirty seconds, and you
        have twelve minutes.
      </p>

      <h2 id="if-your-subject-is-not-covered">If your subject is not covered</h2>
      <p>
        Twiga does not cover everything. In this same session the teacher asked
        about English Literature and was told no. It answers for secondary
        school only, and only for the subjects and forms on your profile.
      </p>
      <p>
        So make your first real request one it can answer. If you are not sure
        what is on your profile, ask it.
      </p>

      <pre>
        <code>what subjects am i teaching?</code>
      </pre>

      <h2 id="what-to-send-today">What to send today</h2>
      <p>
        Pick your next lesson and send one message that names the subject, the
        form, the topic and what you want back. For example:
      </p>

      <pre>
        <code>
          I have my Form 1 maths class in 15 minutes. What topic comes after
          integers?
        </code>
      </pre>

      <CardGrid>
        <GuideCard
          href="/guide/teachers/getting-started/how-to-ask"
          title="How to Ask Twiga"
          description="The five things to put in a message so the first answer is the one you wanted."
        />
        <GuideCard
          href="/guide/teachers/getting-started/checking-answers"
          title="Checking Twiga's Answers"
          description="The one minute check that catches a wrong form level or a source from another subject."
        />
      </CardGrid>
    </>
  );
}

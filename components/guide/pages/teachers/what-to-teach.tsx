import {
  Callout,
  CardGrid,
  ChatSample,
  GuideCard,
  GuideHeading,
} from "@/components/guide/content";

export default function WhatToTeachPage() {
  return (
    <>
      <GuideHeading
        eyebrow="Teaching Content"
        title="Finding What to Teach"
        description="Ask Twiga what topic comes next, get the topic and subtopic list for your form, and check it against your printed syllabus before it goes in your scheme of work."
      />

      <p>
        You are ten minutes from class and you cannot remember what topic comes
        after the one you just finished. Or you are writing a scheme of work and
        you want the whole form in front of you. Twiga answers both from the TIE
        curriculum, on your phone, in under a minute.
      </p>
      <p>
        It is fastest at the small question. Ask where you are in the sequence,
        not for the whole syllabus.
      </p>

      <h2 id="ask-what-comes-next">Ask what comes next</h2>
      <p>
        Name three things: the subject, the form, and the topic you have just
        finished. That is the whole message.
      </p>

      <ChatSample
        messages={[
          {
            from: "teacher",
            text: "Mambo! I have my Form 1 maths class in 12 minutes and I just realised I forgot what topic comes after integers. Help!!",
          },
          {
            from: "twiga",
            text: "Mambo! No worries, I've got you covered. 😊\n\nAfter Integers, the next topic in Form 1 Mathematics is Fractions.\n\nThis includes:\n- Meaning and types of fractions (proper, improper, mixed)\n- Converting between improper fractions and mixed numbers\n- Operations on fractions (addition, subtraction, multiplication, division)\n- Solving problems involving fractions\n\nLet me know if you'd like a quick 2-minute summary for students, or one practice question to start the lesson.",
          },
        ]}
      />

      <p>
        That is the right size for a corridor. One topic name and its subtopics.
        You can walk into class with it.
      </p>
      <p>Here is the same question as one line you can copy:</p>
      <pre>
        <code>
          I teach Form 1 Mathematics. What topic comes after Integers, and what
          are its subtopics?
        </code>
      </pre>
      <p>The same shape works two other ways:</p>
      <ul>
        <li>
          <code>what topic comes before Algebra in Form 2 Mathematics?</code>
        </li>
        <li>
          <code>
            where does Statistics sit in the Form 1 Mathematics sequence?
          </code>
        </li>
      </ul>

      <Callout type="tip" title="Write in the language you think in">
        Twiga reads and answers in both English and Kiswahili. Ask in whichever
        one is faster for you. See{" "}
        <a href="/guide/teachers/troubleshooting/language">
          Language: English &amp; Kiswahili
        </a>
        .
      </Callout>

      <h2 id="ask-for-the-whole-form">Ask for the whole form</h2>
      <p>
        When you have time to sit down, ask for the full list. Say why you want
        it. Telling Twiga you are writing a scheme of work gets you the whole
        form instead of one topic.
      </p>

      <ChatSample
        messages={[
          {
            from: "teacher",
            text: "asante. and the full topic list for form 1 maths? im writing my scheme of work",
          },
          {
            from: "twiga",
            text: "Based on the official Tanzanian Institute of Education (TIE) curriculum for Mathematics Form 1, the main topics covered are:\n\n1. Numbers and Operations: whole numbers, integers, fractions, decimals; BODMAS [1]\n2. Factors and Multiples: prime factors, GCF, LCM\n3. Fractions and Decimals: conversion, operations, rounding off [2]\n4. Ratios, Proportions and Percentages [3]\n5. Algebra: expressions, substitution, simple linear equations [4]\n6. Geometry: angles, triangles, quadrilaterals, perimeter and area [5]\n7. Coordinate Geometry\n8. Measurement\n9. Approximations\n10. Statistics\n\nSources:\n[1] Methematics for Secondary Schools Student's Book Form One, Concept of Mathematics\n[2] Methematics for Secondary Schools Student's Book Form One, Coordinate Geometry\n[3] Methematics for Secondary Schools Student's Book Form One, Ratios and proportions\n[4] Methematics for Secondary Schools Student's Book Form One, Algebraic Expressions\n[5] Methematics for Secondary Schools Student's Book Form One, Coordinate Geometry",
          },
        ]}
      />

      <p>
        Look at the bottom. The stronger replies end with a{" "}
        <strong>Sources</strong> block that names the TIE Student&apos;s Book and
        the chapter. The little numbers in the list point at it. That block is
        how you check the answer. Read it every time.
      </p>
      <p>
        The block is rough. The book title above is misspelled, and two topics
        point at the same chapter. It still tells you which book to open, and
        that is what it is for.{" "}
        <a href="/guide/teachers/teaching-content/topic-explanations">
          Explaining Topics From the Textbook
        </a>{" "}
        goes through how to read one.
      </p>

      <h2 id="open-one-topic-at-a-time">Open one topic at a time</h2>
      <p>
        Once a topic list is on the screen, you do not have to repeat yourself.
        Name the topic and ask for its subtopics.
      </p>

      <ChatSample
        messages={[
          { from: "teacher", text: "what are the subtopics for statistics" },
          {
            from: "twiga",
            text: "The subtopics for Statistics in Form 1 Mathematics are:\n\n- Data collection and presentation (tables, bar graphs, pie charts)\n- Measures of central tendency (mean, median, mode)\n\nWould you like a brief explanation of any of these from the textbook, or practice questions for your students?",
          },
        ]}
      />

      <p>
        Right after a reply about one topic, even{" "}
        <code>what are the subtopics for it</code> is enough. Take the topics one
        at a time. Asking for every subtopic in the whole form at once gives you
        a wall of text you will not read on a phone.
      </p>

      <h2 id="two-more-questions-that-work">Two more questions that work</h2>
      <p>
        <strong>Two forms in one message.</strong> Do you carry the same subject
        across two classes? Ask for both together. You get one reply with both
        lists in it, one after the other, and a Sources block naming both books.
      </p>
      <pre>
        <code>
          we are going to explore book keeping form 1&amp;2. can you tell me
          what topics are covered for those 2 classes
        </code>
      </pre>
      <p>
        <strong>Which topic to start with.</strong> Twiga will also answer
        planning questions about the order you teach in.
      </p>
      <pre>
        <code>what topic in form one is the easiest to teach?</code>
      </pre>
      <p>
        The reply names one topic from the subject on your profile. Better, it
        gives the reasons: students need no prior knowledge for it, it is close
        to everyday life, and it is easy to run activities around. Treat that as
        a colleague&apos;s opinion, not as an instruction. The order you teach in
        is still yours.
      </p>

      <h2 id="check-the-list-before-you-use-it">
        Check the list before you use it
      </h2>
      <p>
        Twiga is a good way to find your place in the sequence. It is not the
        authority on what the sequence is. Your printed syllabus is.
      </p>

      <Callout type="warning" title="Topic counts are not reliable">
        <p>
          Asked how many topics Mathematics Form 1 has, Twiga answered six in
          March and ten in May. The two lists do not line up with each other. In
          another chat it said Biology Form 1 has seven topics. Less than a
          minute later it said three of those seven are really Form 2 content.
          Nothing new had been said in between.
        </p>
        <p>
          So never copy a Twiga topic count into a document as fact. If the count
          matters, ask again in a fresh message and compare the two answers. Then
          settle it with the book.
        </p>
      </Callout>

      <p>Before a list goes into your scheme of work:</p>
      <ul>
        <li>
          Tick every topic off against your printed syllabus. Add what is
          missing, drop what is not there.
        </li>
        <li>
          Check the form. A topic can be real and still belong to a different
          class.
        </li>
        <li>
          Read the Sources block. If there is no Sources block, no textbook was
          used for that answer.
        </li>
      </ul>

      <h2 id="ask-your-school-not-twiga">Ask your school, not Twiga</h2>

      <Callout type="warning" title="Never ask Twiga about terms or dates">
        <p>
          Every calendar answer in the chat log came back wrong. Twiga has said
          Term 1 runs August to October. It put Term 2 at November to March of
          the next year, with April as a holiday carrying the end of year exams.
          The Tanzanian academic year runs January to December. It also said
          there are three terms, then two terms, less than a minute apart.
        </p>
        <p>
          Term dates, exam weeks and the school calendar come from your head of
          department and the school notice board. Use Twiga for the content of
          the syllabus, not for when you teach it.
        </p>
      </Callout>

      <h2 id="when-you-get-the-wrong-subject">When you get the wrong subject</h2>
      <p>
        Twiga answers against the subjects and forms saved on your profile. If
        you ask about Mathematics and get Geography back, that is your profile
        talking, not a broken answer. Fix the profile and ask again. See{" "}
        <a href="/guide/teachers/getting-started/subjects">
          Choosing Your Subjects
        </a>
        .
      </p>
      <p>
        If the reply is vague or gives you the wrong form, add the missing
        details and send it again. Subject, form and topic in one message get you
        further than three short messages do.
      </p>

      <h2 id="where-to-go-next">Where to go next</h2>
      <CardGrid>
        <GuideCard
          href="/guide/teachers/teaching-content/topic-explanations"
          title="Explaining Topics From the Textbook"
          description="You have the topic name. Now get the textbook account of it, and learn to read the Sources block properly."
        />
        <GuideCard
          href="/guide/teachers/getting-started/checking-answers"
          title="Checking Twiga's Answers"
          description="The sixty-second check that catches wrong forms, wrong sources and invented facts."
        />
        <GuideCard
          href="/guide/teachers/lesson-plans/requesting"
          title="Requesting a Lesson Plan"
          description="Turn the topic you just found into a plan for one period."
        />
        <GuideCard
          href="/guide/teachers/getting-started/how-to-ask"
          title="How to Ask Twiga"
          description="The details that decide every answer you get back."
        />
      </CardGrid>
    </>
  );
}

import {
  Callout,
  CardGrid,
  ChatSample,
  GuideCard,
  GuideHeading,
  Step,
  Steps,
} from "@/components/guide/content";

export default function TeacherCheckingAnswersPage() {
  return (
    <>
      <GuideHeading
        eyebrow="Getting Started"
        title="Checking Twiga's Answers"
        description="A one minute check on any answer before it goes into a classroom. It is mostly right, and the check catches the times it is confidently wrong."
      />

      <p>
        Twiga writes well. Every answer arrives tidy, structured and ready to
        use, whether it is correct or not. So a bad answer does not look bad. It
        looks exactly like a good one.
      </p>
      <p>
        The one thing that gives it away is at the bottom. Some answers end with
        a <code>Sources:</code> block naming the TIE books behind each claim.
        Read that block and you catch most of the trouble.
      </p>

      <h2 id="the-check">The check</h2>
      <Steps>
        <Step title="Scroll to the bottom">
          Look for a <code>Sources:</code> list. Not every answer has one.
        </Step>
        <Step title="Read the subject in each line">
          It should be your subject. Not a related one, not another one.
        </Step>
        <Step title="Read the form">
          Form One, Form Two, Form Three, Form Four. It should be the form you
          asked for.
        </Step>
        <Step title="Match the numbers to the claims">
          Find where the little bracketed numbers sit in the answer, and see
          whether that source could really be about that sentence.
        </Step>
      </Steps>

      <p>
        If any of those fail, keep the answer as your own background reading.
        Just do not hand it to a class as textbook material.
      </p>

      <h2 id="a-source-from-the-wrong-subject">
        A source from the wrong subject
      </h2>
      <p>
        A teacher asked for a Book Keeping lesson plan on the trial balance. The
        plan that came back was good. Its one source was not.
      </p>

      <ChatSample
        messages={[
          {
            from: "teacher",
            text: "bookkeeping form 2 tomorrow. give me a short lesson plan on trial balance",
          },
          {
            from: "twiga",
            text: "Trial Balance, Book Keeping, Form 2 (40 min)\n\n3. New content (15 min)\n- A Trial Balance lists the closing balances of every ledger account, debit on the left and credit on the right\n- The debit total must equal the credit total, and if it is not equal there is an error [1]\n\nSources:\n- [1] Geography for Secondary Schools Student's Book Form Two, Chapter Two (Agriculture)",
          },
          {
            from: "teacher",
            text: "hold on. [1] is a geography agriculture chapter. thats not my subject",
          },
        ]}
      />

      <p>
        The accounting rule itself is correct. The source is a geography chapter
        about agriculture, cited as the authority for it. That takes a second to
        spot, and only if you look.
      </p>

      <h2 id="a-source-from-the-wrong-form">A source from the wrong form</h2>
      <p>
        This one is harder to catch. The answer names the wrong form out loud,
        in its first line, and the eye still slides past it.
      </p>

      <ChatSample
        messages={[
          {
            from: "teacher",
            text: "and for my geography class, form 1 map reading, types of maps",
          },
          {
            from: "twiga",
            text: "Based on the official TIE Geography textbook for Form 3, the two main types of maps are:\n\nTopographical Maps\nThese show both natural (physical) and man-made features of an area [1]\n\nStatistical Maps\nThese give quantitative information about the distribution of a phenomenon [4]\n\nSources:\n- [1] Geography for Secondary Schools Student's Book Form Three, Elementary Surveying\n- [4] Geography for Secondary Schools Student's Book Form Three, Elementary Surveying",
          },
          {
            from: "teacher",
            text: "form three, every line. i asked form 1. keeping this as my own background reading, not as form 1 material",
          },
        ]}
      />

      <p>
        The teacher asked for Form 1. The answer opens with Form 3 and every
        source says Form Three. Twiga does not treat this as a problem and never
        warns him. It had said a moment earlier that it could not find the
        content for his class, then answered from another form instead.
      </p>

      <Callout type="note" title="Twiga does tell you when content is missing">
        <p>
          You may see &quot;I could not find this information in the textbook
          content for your class.&quot; Take that at face value. What to watch
          for is what comes next, because the answer that follows may quietly
          come from a different form.
        </p>
      </Callout>

      <h2 id="when-there-are-no-sources">When there are no sources</h2>
      <p>
        Most answers have none. In five months of one teacher&apos;s real use,
        only four answers out of roughly thirty carried a{" "}
        <code>Sources:</code> block.
      </p>
      <p>
        So a missing block is not a warning sign. It just means you are reading
        general knowledge that happens to be about your topic. Useful, often
        right, and worth a look in the book before you teach it as what the
        textbook says.
      </p>
      <p>And a block that is there is not a guarantee either. Read it.</p>

      <h2 id="look-at-the-chapter-names-too">Look at the chapter names too</h2>
      <p>
        Sources can be sloppy inside a single answer. In one Form 1 Mathematics
        reply, all five sources misspelled the book as{" "}
        <em>Methematics for Secondary Schools</em>. In the same list, a chapter
        called Coordinate Geometry was cited twice. Once for rounding off
        decimals, and once for the perimeter and area of basic shapes.
      </p>
      <p>
        You do not have to study the block. Just ask yourself whether that
        chapter could really hold the fact it is being used to prove.
      </p>

      <h2 id="what-a-good-block-looks-like">What a good block looks like</h2>
      <p>
        Good ones exist, and they are what you are comparing against. One Book
        Keeping answer covering Form 1 and Form 2 topics cited{" "}
        <em>Book-Keeping for Secondary Schools Student&apos;s Book Form One</em>{" "}
        and <em>Form Two</em>. The chapter names matched the topics they sat
        under. Right subject, right forms, sensible chapters.
      </p>

      <h2 id="when-the-check-fails">When the check fails</h2>
      <ul>
        <li>
          <strong>Demote it, do not delete it.</strong> A Form 3 answer to a
          Form 1 question is still good reading for you. It is just not class
          material.
        </li>
        <li>
          <strong>Ask again, with the form level first.</strong> Start the
          message with the form you teach, then the subject and the topic.
        </li>
        <li>
          <strong>Check the rule in the book.</strong> If a claim carries a
          source from another subject, open your own textbook for that one line
          before you teach it.
        </li>
        <li>
          <strong>Check your profile.</strong> If answers keep coming back for
          the wrong form, your saved class list may be wrong.
        </li>
      </ul>

      <Callout type="tip" title="It is a habit, not a warning">
        <p>
          Twiga is useful and mostly right. This check costs a minute and it
          catches the small number of times it is confidently wrong. Do it the
          same way every time and you stop thinking about it.
        </p>
      </Callout>

      <CardGrid>
        <GuideCard
          href="/guide/teachers/getting-started/subjects"
          title="Choosing Your Subjects"
          description="If answers keep coming back for the wrong form, start with your saved class list."
        />
        <GuideCard
          href="/guide/teachers/troubleshooting/limits"
          title="What Twiga Cannot Do"
          description="The subjects, forms and file types that are outside what Twiga handles at all."
        />
      </CardGrid>
    </>
  );
}

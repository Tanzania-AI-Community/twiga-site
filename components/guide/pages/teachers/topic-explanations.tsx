import {
  Callout,
  CardGrid,
  ChatSample,
  GuideCard,
  GuideHeading,
} from "@/components/guide/content";

export default function TopicExplanationsPage() {
  return (
    <>
      <GuideHeading
        eyebrow="Teaching Content"
        title="Explaining Topics From the Textbook"
        description="Ask Twiga to explain one concept from the TIE textbook, so you can check your own understanding the night before you teach it. Then read the Sources block to see which book, and which form, the answer came from."
      />

      <p>
        You are teaching a topic tomorrow. You know it, mostly. You would still
        like to see it written down the way the textbook writes it, before you
        stand in front of thirty students.
      </p>
      <p>
        That is what this page is for. It is about{" "}
        <strong>what the content is</strong>, not how to deliver it. Do you want
        the words to say in class, the activity, the board work? Ask for that
        instead, and see{" "}
        <a href="/guide/teachers/teaching-practice/how-not-what">
          Ask How to Teach It, Not What It Is
        </a>
        .
      </p>

      <h2 id="the-message-to-send">The message to send</h2>
      <p>
        One line. The word <em>explain</em>, the topic, the form, the subject.
      </p>
      <pre>
        <code>explain types of maps for form 3 geography</code>
      </pre>
      <p>
        Twiga suggests this one itself. Asked how a teacher should use it, it put
        this first on the list. Here is the pattern in its own words:
      </p>
      <blockquote>
        <p>
          Need to clarify a concept before teaching? Just say: &ldquo;Explain
          double entry system for Form 1 Book Keeping&rdquo;. I&apos;ll give you
          a textbook-accurate explanation using content from the official TIE
          syllabus, so you&apos;re always aligned with what students need to
          know.
        </p>
      </blockquote>
      <p>
        Saying why you are asking helps too. &ldquo;im teaching it tomorrow and i
        want to check what i know is right first&rdquo; tells Twiga you want the
        content, not a lesson.
      </p>

      <h2 id="when-it-says-it-cannot-find-the-topic">
        When it says it cannot find the topic
      </h2>
      <p>
        Sometimes the first ask returns nothing. Twiga says so plainly instead of
        making something up. That message is honest, and it is where the fix
        starts.
      </p>

      <ChatSample
        messages={[
          {
            from: "teacher",
            text: "explain map reading for form 1 geography. im teaching it tomorrow and i want to check what i know is right first",
          },
          {
            from: "twiga",
            text: "I could not find this information in the textbook content for your class. If you want, I can help with a related topic that is covered.",
          },
          {
            from: "teacher",
            text: "yes, which subtopics under map reading are covered?",
          },
          {
            from: "twiga",
            text: "Could you please clarify which specific topic or subtopic under Map Reading you'd like materials for? For example:\n\n- Types of maps\n- Map scales\n- Grid references\n- Compass directions\n- Features on topographic maps\n\nLet me know so I can provide accurate, curriculum-aligned support!",
          },
          { from: "teacher", text: "types of maps" },
        ]}
      />

      <p>
        Two things to copy here. First, do not retype the same request in other
        words. Narrow it instead. Second, do not answer that offer with a bare{" "}
        <code>yes</code>. A bare yes costs you a whole turn, because Twiga comes
        back asking which subtopic you meant. Ask the useful question straight
        away:
      </p>
      <pre>
        <code>which subtopics under map reading are covered?</code>
      </pre>
      <p>
        Once the subject, form and topic are in the thread above, two words are
        enough to pick from the menu.
      </p>

      <Callout type="note" title="A gap can be a settings problem">
        <p>
          &ldquo;the textbook content for your class&rdquo; means the subjects
          and forms saved on your profile. If a topic you definitely teach comes
          back as missing, check your profile before you conclude the book is not
          there. See{" "}
          <a href="/guide/teachers/getting-started/subjects">
            Choosing Your Subjects
          </a>
          .
        </p>
      </Callout>

      <h2 id="read-the-sources-block">Read the Sources block</h2>
      <p>
        A narrowed ask gets a real answer. Look at what arrives with it. There
        are little numbers inside the text, and a Sources list at the bottom
        naming the book and the chapter.
      </p>

      <ChatSample
        messages={[
          {
            from: "twiga",
            text: "Based on the official TIE Geography textbook for Form 3, the two main types of maps are:\n\n- Topographical Maps\nThese show both natural (physical) and man-made (cultural) features of an area [1]. Natural features include mountains, valleys, rivers, lakes and forests [2].\n\n- Statistical Maps\nThese give quantitative information about the distribution of a phenomenon [4]. They are also called distribution maps, and dot maps are a common example [5].\n\nWould you like me to create a practice exercise or a lesson plan on Types of Maps for Form 3?\n\nSources:\n- [1] Geography for Secondary Schools Student's Book Form Three, Elementary Surveying\n- [2] Geography for Secondary Schools Student's Book Form Three, Elementary Surveying\n- [4] Geography for Secondary Schools Student's Book Form Three, Elementary Surveying\n- [5] Geography for Secondary Schools Student's Book Form Three, Elementary Surveying",
          },
          {
            from: "teacher",
            text: "hold on, every source here says form three. i asked for form 1",
          },
        ]}
      />

      <p>
        Make reading that block a habit. It is the one part of the reply that
        tells you where the words came from.
      </p>

      <Callout type="warning" title="No Sources block, no textbook">
        Twiga answers confidently about subjects it has no book for, and it does
        not tell you when it is doing that. In the chat log, a Form 1 English
        topic list came back fluent and well organised, with no numbers and no
        Sources block at all. A run of Biology lesson plans did the same. When
        the teacher then asked for the actual Biology syllabus document, it
        failed outright. An answer with no Sources block is a colleague&apos;s
        recollection. Useful, but check it yourself.
      </Callout>

      <h2 id="check-the-form-it-came-from">Check the form it came from</h2>
      <p>
        This is the trap on this page, and it is easy to miss. The teacher above
        asked about <strong>Form 1</strong>. The answer opens &ldquo;for Form
        3&rdquo;, and every source line reads &ldquo;Student&apos;s Book Form
        Three&rdquo;. Twiga never flagged the change of level. The closing offer
        says &ldquo;for Form 3?&rdquo;, and that is the only other hint you get.
      </p>
      <p>So the check is one question:</p>
      <p>
        <strong>
          Does the Sources line name the book for the form I teach?
        </strong>
      </p>
      <p>
        A Form 3 explanation is not wrong. It is just above your Form 1 class,
        and it can carry content the syllabus does not ask of them. If you teach
        it as it stands, you teach too much.
      </p>
      <p>When the form does not match, do this:</p>
      <ol>
        <li>
          Ask again and name the form in the message itself. For example:{" "}
          <code>
            explain types of maps using the Form 1 Geography textbook only
          </code>
          .
        </li>
        <li>
          Read the new Sources block. If it now names the Form One book, you have
          what you wanted.
        </li>
        <li>
          If you get the gap message again, accept it. The concept sits in a
          later form. Keep the Form 3 account as background for yourself, and
          teach your class from your own form&apos;s book.
        </li>
      </ol>

      <h2 id="what-a-citation-does-not-prove">What a citation does not prove</h2>
      <p>
        The Sources block is a pointer, not proof. The book and chapter names are
        real, but they are rough:
      </p>
      <ul>
        <li>
          In the Types of Maps answer, every number points at the same chapter,
          &ldquo;Elementary Surveying&rdquo;.
        </li>
        <li>
          In a Mathematics answer, two unrelated topics both point at a chapter
          called &ldquo;Coordinate Geometry&rdquo;. The book title is misspelled
          &ldquo;Methematics&rdquo; in every line of that block.
        </li>
      </ul>
      <p>
        So a Sources block tells you two things and no more: the answer came from
        a textbook, and which form&apos;s book it was. It does not give you a
        page number. It is not a promise that the sentence above it is correct.
        Open the book.
      </p>

      <h2 id="where-to-go-next">Where to go next</h2>
      <CardGrid>
        <GuideCard
          href="/guide/teachers/teaching-content/what-to-teach"
          title="Finding What to Teach"
          description="Not sure which topic to explain? Find where you are in the syllabus sequence first."
        />
        <GuideCard
          href="/guide/teachers/teaching-practice/how-not-what"
          title="Ask How to Teach It, Not What It Is"
          description="You understand the content. Now ask for the words, the examples and the board work."
        />
        <GuideCard
          href="/guide/teachers/getting-started/how-to-ask"
          title="How to Ask Twiga"
          description="How to phrase a request so you do not spend three turns getting to the answer."
        />
        <GuideCard
          href="/guide/teachers/getting-started/checking-answers"
          title="Checking Twiga's Answers"
          description="The short check that catches a wrong form, a wrong source or an invented fact."
        />
      </CardGrid>
    </>
  );
}

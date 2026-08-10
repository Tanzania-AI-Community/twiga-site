import {
  Callout,
  CardGrid,
  ChatSample,
  GuideCard,
  GuideHeading,
} from "@/components/guide/content";

export default function LanguagePage() {
  return (
    <>
      <GuideHeading
        eyebrow="Troubleshooting & Limits"
        title="Language: English & Kiswahili"
        description="Twiga works in both languages, and you get back the one you wrote in. The part that needs your attention is the Kiswahili it writes for you, because some of its teaching words are wrong."
      />

      <p>
        Write to Twiga in English and the reply comes in English. Write in
        Kiswahili and the whole reply comes in Kiswahili, headings and all. You
        do not have to choose one language for good, and you do not have to set
        anything.
      </p>

      <h2 id="ask-in-kiswahili">Ask in Kiswahili</h2>
      <p>
        This is a real request from a teacher, sent the day before the lesson.
        It names the subject, the form and the topic. It ends by asking for
        Kiswahili.
      </p>
      <pre>
        <code>{`Sasa nataka kufundisha bookkeeping Form 2 kesho. Nipe lesson plan
fupi ya somo la trial balance, kiswahili tafadhali.`}</code>
      </pre>

      <ChatSample
        messages={[
          {
            from: "teacher",
            text: "Asante sana! Sasa nataka kufundisha bookkeeping Form 2 kesho. Nipe lesson plan fupi ya somo la trial balance, kiswahili tafadhali.",
          },
          {
            from: "twiga",
            text: "Asante sana, mwalimu! Hapa kuna mpango fupi wa somo la Trial Balance kwa Book Keeping, Form 2:\n\nJina la Somo: Uundaji wa Trial Balance\nDarasa: Form 2\nSomo: Book Keeping\nMuda: 40 dakika\n\n1. Waliozoea (5 dakika)\n\n2. Matokeo ya Kujifunza (3 dakika)\nWanafunzi wataweza:\n- Eleza maana ya Trial Balance\n\n3. Matokeo (15 dakika)\n\n4. Mfano wa Haraka (7 dakika)\n\n5. Kazi ya Darasa / Kupitisha (7 dakika)\n\n6. Kupitisha (3 dakika)",
          },
        ]}
      />

      <p>
        A full lesson plan came back in about twenty seconds, in Kiswahili, with
        timings for every stage. Keep those six headings in mind. Further down
        this page you will see what is wrong with them.
      </p>

      <h2 id="mixing-the-two-languages">Mixing the two languages is fine</h2>
      <p>
        Look at the teacher&rsquo;s message again. It is Kiswahili, but{" "}
        <em>bookkeeping</em>, <em>Form 2</em>, <em>lesson plan</em> and{" "}
        <em>trial balance</em> are all English, sitting in the middle of it. That
        is how teachers really write, and Twiga handled it.
      </p>
      <p>
        So write the way you would write to a colleague. Twiga answers in the
        language you wrote in. If you want the other one, ask for it in the
        message.
      </p>

      <Callout type="tip" title="Asking for a language">
        End your message with <code>kiswahili tafadhali</code> and the reply
        comes in Kiswahili. Write the message in English and it comes in
        English. You can ask for the same material again in the other language.
      </Callout>

      <h2 id="pasting-your-own-material">Pasting your own material</h2>
      <p>
        Text you paste goes through as you typed it. Paste a Kiswahili passage,
        a set of notes or an exam question, then say what you want done with it.
        You can say it in either language. Nothing gets translated unless you ask
        for a translation.
      </p>

      <h2 id="check-the-kiswahili-before-you-print">
        Check the Kiswahili before you print
      </h2>
      <p>
        This is the part of the page that matters most. Twiga&rsquo;s Kiswahili
        reads well, and some of its teaching words are still wrong. Every
        example below came out of material a teacher was about to use in class.
      </p>

      <table>
        <thead>
          <tr>
            <th>Twiga wrote</th>
            <th>The problem</th>
            <th>Use instead</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>ujia wa Hisabati</td>
            <td>
              <em>ujia</em> is not a Swahili word
            </td>
            <td>utangulizi, or dhana</td>
          </tr>
          <tr>
            <td>Waliozoea (as the starter heading)</td>
            <td>
              means &ldquo;those who are used to it&rdquo;, and is not a lesson
              plan section
            </td>
            <td>Utangulizi, or Kuanzia</td>
          </tr>
          <tr>
            <td>Mchango wa Somo (for lesson flow)</td>
            <td>
              <em>mchango</em> means contribution
            </td>
            <td>mtiririko wa somo</td>
          </tr>
          <tr>
            <td>Kupitisha (used for classwork and for closure)</td>
            <td>means to pass or approve, and it labels two different sections</td>
            <td>Kupitia for review, Hitimisho for closure</td>
          </tr>
          <tr>
            <td>Matokeo (for the development stage)</td>
            <td>the same word as the objectives heading, Matokeo ya Kujifunza</td>
            <td>Ufafanuzi, or Maendeleo ya Somo</td>
          </tr>
          <tr>
            <td>soko la kwanza la Biolojia</td>
            <td>
              <em>soko</em> means market, which makes no sense here
            </td>
            <td>name the theme or the term directly</td>
          </tr>
          <tr>
            <td>vipengele vya kimapokeo (for biotic and abiotic)</td>
            <td>
              <em>kimapokeo</em> means traditional or customary, not living
            </td>
            <td>viumbe hai, and visivyo hai</td>
          </tr>
          <tr>
            <td>atasemweza</td>
            <td>a garbled word</td>
            <td>ataweza</td>
          </tr>
        </tbody>
      </table>

      <h2 id="where-the-mistakes-land">Where the mistakes land</h2>
      <p>
        Notice what kind of words those are. They are section headings and
        subject terms. They are the words you copy onto the board and hand to a
        class. They are also the words your head of department reads first in
        your plan book.
      </p>
      <p>
        Good Kiswahili around a wrong heading is more dangerous than Kiswahili
        that is obviously broken, because it reads as correct. So do this before
        you photocopy anything:
      </p>
      <ul>
        <li>Read the headings first, against your own TIE copy.</li>
        <li>Then read the subject terms in the body.</li>
        <li>Fix them in your own words. The rest of the prose is usually fine.</li>
      </ul>

      <h2 id="twiga-says-its-kiswahili-is-right">
        Twiga says its Kiswahili is right
      </h2>
      <p>
        Ask how a plan was made and Twiga tells you its Kiswahili matches the TIE
        textbooks. It says so in as many words.
      </p>

      <ChatSample
        messages={[
          { from: "teacher", text: "how is the leasson plan made?" },
          {
            from: "twiga",
            text: "Pia nimejitahidi kuhakikisha kwamba:\n\n- Maneno yote ni ya kiswahili kama yanavyotumika kwenye vitabu vya TIE\n- Mifano inafaa kwa umri wa wanafunzi wa sekondari\n- Mchango unafuatia muda wa somo (40 dakika)\n- Kuna mahali pa wanafunzi kushiriki kikamilifu",
          },
        ]}
      />

      <p>
        The first bullet claims every word is Kiswahili as the TIE books use it.
        The third bullet breaks that claim in the same breath: <em>mchango</em>{" "}
        means contribution, not the flow of a lesson. Read the claim as a
        promise, not as proof. Check the words yourself.
      </p>

      <Callout type="note" title="The English answer was sharper once">
        One teacher asked the same sensitive classroom question in both
        languages. The English answer came back sharper. The Kiswahili one used
        a phrase that meant very little. That is one case, not a rule. Write in
        the language you teach in, and read what comes back either way.
      </Callout>

      <h2 id="there-is-no-language-setting">There is no language setting</h2>
      <p>
        You cannot switch Twiga to one language and leave it there. The only
        thing that decides the language is the language you type in.
      </p>
      <p>
        If a reply in the chat ever offers you a language setting to save, it is
        making that up. See{" "}
        <a href="/guide/teachers/troubleshooting/profile">Fixing Your Profile</a>{" "}
        for how to tell an invented settings form from the real one.
      </p>

      <h2 id="related-pages">Related pages</h2>
      <CardGrid>
        <GuideCard
          href="/guide/teachers/getting-started/checking-answers"
          title="Checking Twiga's Answers"
          description="The sixty-second check to run on anything before it reaches your class."
        />
        <GuideCard
          href="/guide/teachers/troubleshooting/limits"
          title="What Twiga Cannot Do"
          description="Text only, no files except exams, and the subjects it covers."
        />
      </CardGrid>
    </>
  );
}

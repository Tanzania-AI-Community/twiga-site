import {
  Callout,
  CardGrid,
  ChatSample,
  GuideCard,
  GuideHeading,
} from "@/components/guide/content";

export default function YourOwnNotesPage() {
  return (
    <>
      <GuideHeading
        eyebrow="Improvisation"
        title="Working From Your Own Notes"
        description="Paste the pages you are actually teaching from, then ask for what you want built on them. In five months of real chats, this is the request that worked best."
      />

      <p>
        You already have the content. It is in your exercise book, in the
        textbook on the desk, in the notes you typed last term. The problem is
        never finding it. The problem is turning it into something students will
        do on a Tuesday afternoon.
      </p>
      <p>
        So do not ask Twiga to go and find the topic. Hand it the pages and ask
        for the activity.
      </p>

      <h2 id="the-shape-of-the-message">The shape of the message</h2>
      <p>Three parts, all in one message. Notes in the middle.</p>
      <pre>
        <code>{`i have these summary notes

[paste the pages you are teaching from]

help me create fun short game quizzes that are interactive and memorable for the students to learn this part`}</code>
      </pre>
      <p>
        The last line is your ask. Swap it for whatever you need: practice
        questions, a worksheet, a quiz, an explanation in simpler words. What
        matters is that the notes sit above it, in the same message.
      </p>

      <h2 id="what-a-real-paste-looked-like">What a real paste looked like</h2>
      <p>
        A Form 1 English teacher pasted about 175 lines of their own notes. Ten
        minimal pairs. A Column A and Column B matching table. The six game
        names the textbook told them to revise. The whole word stress section.
        Then one line at the bottom saying what to do with it all.
      </p>

      <ChatSample
        messages={[
          {
            from: "teacher",
            text: "i have these summary notes\n\nPRODUCING SHORT AND COHERENT ORAL MESSAGES\nPronounce the following pair of words:\nPray - play\nCrowd - cloud\nRice - lice\nAir - hair\n...\n\nCOLUMN A / COLUMN B\nSick, Flesh, Gate, Glow, Road, Ten...\nseek, fresh, get, grow, load, pen...\n\nNOTE: Revise Minimal pairs games in topic two. Such games are:\nIs it a pair? / Odd one out / Minimal pair up ...\n\nPRACTISING PRONUNCIATION WITH PROPER WORD STRESS\nproDUCE - He works on a farm and helps to proDUCE fresh vegetables.\nPROduce - The local store sells a variety of fresh PROduce.\nreCORD / REcord / DEsert / deSERT / PERmit / perMIT ...\n\nhelp me create fun short game quizes that are interactive and memorable for the students to learn this part",
          },
          {
            from: "twiga",
            text: "Here are some fun, interactive, and memorable game quizzes for your Form 1 English class on Producing Short and Coherent Oral Messages:\n\nGame 1: Minimal Pair Showdown 🎯\nTwo teams. Teacher says one word of a pair (\"pray\"), students shout the match (\"play\").\nRounds: Crowd → ? · Rice → ? · Air → ?\n\nGame 2: Odd One Out 🔍\nRead three words. Two are a minimal pair, one is not.\nPray, play, table → table\n\nGame 3: Stress Detective 🕵️\n\"He works on a farm and helps to proDUCE fresh vegetables.\" Students say it aloud, then give the other meaning: PROduce.\n\nGame 4: Minimal Pair Pelmanism 🃏\nCards face down: sick/seek, flesh/fresh, gate/get, glow/grow, road/load, ten/pen.\n\nAlso: Stress Shift Charades 🎭 · Sentence Sprint 🏃 · Stress Clap Challenge 👏\n\nWould you like me to turn any of these into a printable worksheet, or add more rounds for a longer lesson activity?",
          },
        ]}
      />

      <p>
        Seven complete games, twenty six seconds after the paste. Every practice
        word in Game 1 and Game 4 came out of the teacher&apos;s own list.
      </p>

      <h2 id="why-a-paste-cannot-stall">Why a paste cannot stall</h2>
      <p>
        The same teacher, four days earlier, asked for the same thing with the
        topic name only. It did not go well.
      </p>

      <ChatSample
        messages={[
          { from: "teacher", text: "i would like to have a practice activity" },
          {
            from: "twiga",
            text: "📑 Generating exercises from the course content, please hold...\n📑 Generating exercises from the course content, please hold...\n📑 Generating exercises from the course content, please hold...\n…",
          },
          {
            from: "twiga",
            text: "Sorry, I can't help with that request. If you have another question or need help with a different topic, I'm happy to assist.",
          },
        ]}
      />

      <p>
        That holding message names the reason. Twiga was{" "}
        <strong>generating exercises from the course content</strong>. So it had
        to go and find the content first. That search is the step that can hang,
        repeat itself and then give up. It held for twenty seconds and returned
        nothing.
      </p>
      <p>
        When the content is already inside your message, Twiga skips that step.
        There is nothing left to find, so there is nothing left to fail. In five
        months of chats, a paste is the only kind of request with no search step
        in it.
      </p>

      <Callout type="tip" title="Nothing was wrong with the short question">
        The bare request was not badly written. Twiga simply could not find the
        content behind it. If a request of yours stalls or gets refused, do not
        rephrase it ten times. Paste the pages and ask again.
      </Callout>

      <h2 id="name-the-part-you-are-teaching">Name the part you are teaching</h2>
      <p>
        The paste covered two full sections. The last line said &ldquo;this
        part&rdquo;, and the games that came back covered minimal pairs and word
        stress only. The theory above them was left alone.
      </p>
      <p>
        Those two words control how much comes back. Name the part you are
        teaching tomorrow, not the whole topic. Otherwise you get a little of
        everything and not enough of the thing you need.
      </p>

      <h2 id="it-picks-up-the-books-own-words">
        It picks up the book&apos;s own words
      </h2>
      <p>
        The teacher&apos;s notes listed six games the textbook wanted revised,
        including &ldquo;Odd one out&rdquo; and &ldquo;Minimal pair up&rdquo;.
        Twiga&apos;s Game 2 came back as Odd One Out and Game 4 as Minimal Pair
        Pelmanism.
      </p>
      <p>
        This matters in the room. Students hear a game name they already know
        from the book, so you spend no time explaining the format. Paste the
        book&apos;s vocabulary and you get the book&apos;s vocabulary back.
      </p>

      <h2 id="what-still-needs-a-look">What still needs a look</h2>
      <p>
        Because the examples are yours, you do not have to check them against
        the syllabus. That is most of the usual checking gone. Two things are
        still worth one read.
      </p>
      <ul>
        <li>
          <strong>It adds words you did not give it.</strong> The later games
          used <em>beautiful</em>, <em>government</em>, <em>advertisement</em>,{" "}
          <em>present</em>, <em>contest</em> and <em>object</em>. None of those
          were in the notes. They are fine words. They are Twiga&apos;s choice
          though, not the book&apos;s, so read them before you use them in
          class.
        </li>
        <li>
          <strong>Your typos travel.</strong> The pasted notes contained
          &ldquo;INincrease&rdquo; where the teacher meant INcrease. A paste
          carries that forward exactly. Whatever is wrong in your notes will be
          wrong in the activity.
        </li>
      </ul>

      <h2 id="paste-plain-text">Paste plain text</h2>
      <p>
        Do not worry about formatting. The Column A and Column B table arrived
        as two flat lists of words, with nothing left to show which word went
        with which. Twiga still rebuilt all ten pairs correctly for the memory
        game.
      </p>
      <p>
        The words are what has to survive, not the layout. Every success in the
        transcript is typed or pasted text. Nowhere in it does a photographed
        page or an attached document work. So if your notes are on paper, type
        the key lines instead of sending a picture.
      </p>

      <h2 id="when-it-offers-a-worksheet">When it offers a worksheet</h2>
      <p>
        Twiga often ends a reply like this with an offer. Here it offered to
        turn a game into a printable worksheet, or to add more rounds.
      </p>

      <Callout type="warning" title="Do not answer with a bare yes">
        The teacher in the transcript replied &ldquo;yes&rdquo;, and it landed
        back on the same exercise tool that had failed before. Name what you
        want instead: <code>make game 4 into a printable worksheet</code>.
        Twiga recovered and wrote the worksheet into the chat anyway, and that
        worksheet is the subject of the next page.
      </Callout>

      <h2 id="where-to-go-next">Where to go next</h2>
      <CardGrid>
        <GuideCard
          href="/guide/teachers/improvisation/printables"
          title="Turning Chat Text Into Printables"
          description="What happened to that worksheet next, and how to get it onto paper from a phone."
        />
        <GuideCard
          href="/guide/teachers/teaching-practice/activities-and-games"
          title="Activities and Games"
          description="What makes a good classroom activity, and how to ask for one when you have no notes to paste."
        />
      </CardGrid>
    </>
  );
}

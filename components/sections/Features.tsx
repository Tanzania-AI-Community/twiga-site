import { BookOpen, FolderOpen, MessageCircle } from "lucide-react";

const features = [
  {
    num: "01",
    title: "Plan Lessons Faster",
    body: "Get instant lesson outlines aligned with the Tanzanian curriculum. Create engaging activities in minutes, not hours.",
    icon: BookOpen,
  },
  {
    num: "02",
    title: "Answer Student Questions",
    body: "Quick, accurate explanations in Swahili or English. Help your students understand complex concepts with ease.",
    icon: MessageCircle,
  },
  {
    num: "03",
    title: "Access Teaching Resources",
    body: "Download worksheets, quizzes, and learning aids. All content follows TIE curriculum standards, always relevant.",
    icon: FolderOpen,
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="bg-white px-6 py-20 md:px-8 md:py-24"
    >
      <div className="mx-auto max-w-[1100px]">
        <header className="mb-14 max-w-2xl md:mb-16">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-twiga-red-dark">
            What Twiga Does
          </p>
          <h2 className="font-display text-[clamp(1.8rem,3vw,2.5rem)] font-normal leading-tight text-twiga-forest">
            Designed for Tanzanian
            <br />
            classrooms, powered by AI
          </h2>
          <p className="mt-4 max-w-[520px] font-light leading-relaxed text-twiga-text-muted">
            Every feature is built around the realities of teaching in Tanzania:
            the TIE curriculum, Swahili, and the constraints teachers actually
            face.
          </p>
        </header>

        <div className="grid overflow-hidden rounded-2xl border-2 border-twiga-cream-dark md:grid-cols-3">
          {features.map((f) => (
            <article
              key={f.num}
              className="border-b border-twiga-cream-dark bg-white px-8 py-10 transition-colors last:border-b-0 hover:bg-twiga-forest-pale md:border-b-0 md:border-r md:last:border-r-0"
            >
              <div className="mb-6 flex size-12 items-center justify-center rounded-xl bg-twiga-forest-pale text-twiga-forest">
                <f.icon className="size-[22px]" strokeWidth={1.75} />
              </div>
              <p className="font-display text-xs font-semibold tracking-wider text-twiga-forest-light">
                {f.num}
              </p>
              <h3 className="mt-3 font-display text-xl font-normal text-twiga-forest">
                {f.title}
              </h3>
              <p className="mt-3 text-sm font-light leading-relaxed text-twiga-text-muted">
                {f.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

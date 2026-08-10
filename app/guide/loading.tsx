/**
 * Shown while a guide page is being fetched. It only replaces the article —
 * the shell, the sidebar and the video stage are outside this boundary, so
 * navigation keeps its chrome and the video is already playable while the
 * prose is still on its way.
 *
 * Guide pages are statically generated, so in practice this appears only on a
 * cold or slow connection.
 */
export default function GuideLoading() {
  return (
    <div className="animate-pulse" role="status" aria-label="Loading page">
      <div className="mb-2.5 h-3 w-24 rounded bg-twiga-cream-mid" />
      <div className="mb-4 h-9 w-2/3 rounded-md bg-twiga-cream-mid" />
      <div className="mb-10 h-4 w-1/2 rounded bg-twiga-cream-mid/70" />

      {[0, 1, 2].map((block) => (
        <div key={block} className="mb-9">
          <div className="mb-4 h-5 w-40 rounded bg-twiga-cream-mid" />
          <div className="space-y-2.5">
            <div className="h-3.5 w-full rounded bg-twiga-cream-mid/70" />
            <div className="h-3.5 w-[92%] rounded bg-twiga-cream-mid/70" />
            <div className="h-3.5 w-[70%] rounded bg-twiga-cream-mid/70" />
          </div>
        </div>
      ))}
    </div>
  );
}

# Guide videos

Every video on the site is a [Remotion](https://remotion.dev) composition — React
code, not an mp4. Nothing is uploaded, nothing is stored in `public/`, and a
change to a video is a normal code review.

## Layout

```
remotion/
  index.ts        Remotion Studio entry (registerRoot)
  Root.tsx        Registers every video in the registry as a <Composition>
  registry.ts     The list of videos + route lookup used by the site
  types.ts        GuideVideo / VideoChapter and the helpers around them
  videos/
    whatsapp-lesson-plan/
      video.ts        The manifest: routes, chapters, dimensions, component
      ChatScene.tsx   The composition
      data.ts         Copy + timeline (the single source of truth for timings)
      visuals.ts      Shared inline styles
      LessonCard.tsx  A prop used by the scene
```

Everything a video owns lives in its own folder under `videos/`. The site never
imports a scene directly — it goes through `registry.ts`, so a video can be
rewritten, retimed or renamed without touching `app/` or `components/`.

## Adding a video

1. Create `videos/<your-video>/` and write the composition. Keep styles inline:
   the site's Tailwind stylesheet is not loaded when Remotion renders headlessly.
2. Export a `GuideVideo` from `videos/<your-video>/video.ts` — the manifest tells
   the site where the video plays (`routes`) and how to label its segments
   (`chapters`). A route ending in `/**` covers a whole subtree, so
   `"/guide/teachers/**"` puts one video on every page of the teachers track;
   list exact paths instead to target individual pages. The first video whose
   routes match a page wins, so put narrower entries earlier in the registry.
3. Add one line to `guideVideos` in `registry.ts`.

That is the whole integration. The player, the follow-along rail, the mobile
segment list and the Remotion Studio entry all read from the manifest.

## Chapters

`chapters` drives the rail beside the player. Each entry is a frame plus the
title and description shown for that segment; clicking one seeks the player.

Derive the frames from the same data the scene animates against rather than
hard-coding them. `whatsapp-lesson-plan` does this: `data.ts` exports a
`SCHEDULE` computed from each message's `typingDur`/`dwell`, the scene animates
off it, and `video.ts` places the chapters off it. Retiming a message moves the
animation and its chapter marker together.

## Working on a video

```bash
pnpm video          # Remotion Studio — scrub, edit, hot reload
pnpm video:render ChatDemoScene out/chat.mp4   # only if you need a file
```

The site itself needs neither: `@remotion/player` renders the composition in the
browser at runtime.

## Notes

- Compositions run inside the site's React tree, so they must be Strict Mode
  safe. In particular, guard `delayRender` with a ref rather than lazy state —
  a state initialiser runs twice in development and would strand a handle,
  leaving the player buffering forever.
- Remotion is licensed separately from the site; check
  [remotion.dev/license](https://remotion.dev/license) before shipping.

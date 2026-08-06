import { Composition } from "remotion";

import { guideVideos } from "./registry";

/**
 * Remotion Studio entry. Every video in the registry shows up automatically,
 * so `pnpm video` always previews exactly what the site ships.
 */
export const RemotionRoot: React.FC = () => {
  return (
    <>
      {guideVideos.map((video) => (
        <Composition
          key={video.id}
          id={video.id}
          component={video.component}
          durationInFrames={video.durationInFrames}
          fps={video.fps}
          width={video.width}
          height={video.height}
        />
      ))}
    </>
  );
};

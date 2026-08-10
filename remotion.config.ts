import { Config } from "@remotion/cli/config";

/**
 * Remotion CLI config. Applies to `pnpm video` (studio) and `pnpm video:render`
 * only — the site itself renders compositions through `@remotion/player`, which
 * does no bundling and ignores this file.
 */

Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);

/**
 * Disable webpack's on-disk cache.
 *
 * The cache lives at `node_modules/.cache/webpack` and is shared by every
 * Remotion process in the repo. Two of them running at once — a studio beside a
 * render, or several renders in parallel while videos are being written —
 * corrupt it, and every subsequent render dies with an opaque
 * `TypeError: Cannot read properties of undefined (reading 'length')` from
 * webpack's wasm hasher. The only recovery is deleting the directory.
 *
 * With 26 videos under active development that trade is one-sided: a cold
 * bundle costs a few seconds, a corrupted cache costs a confusing failure and a
 * manual `rm -rf`. Memory caching keeps hot-reload in the studio fast.
 */
Config.overrideWebpackConfig((config) => ({
  ...config,
  cache: { type: "memory" },
}));

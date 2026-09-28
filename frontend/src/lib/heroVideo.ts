/**
 * Two hero backgrounds are authored in Sanity as animated GIFs — 29MB and 26MB
 * of video wearing an image's clothes. Serving the GIF is untenable, and the
 * CDN's `frame=1` fallback freezes motion the design depends on, so each has
 * been re-encoded to h264 and is served from /public instead: 1.39MB and 1.09MB.
 *
 * Keyed by the Sanity asset hash so that replacing the hero in Sanity with an
 * ordinary photo simply falls through to the image path. Re-encode and add an
 * entry here if a new animated hero is uploaded.
 */
const HERO_VIDEOS: Record<string, string> = {
  '852f4f61e673cbaf5759790b8fe3157b097147f9': '/video/hero-home.mp4',
  '809eb2daf02e606394beb12262347fdf0e4d25bb': '/video/hero-about.mp4',
};

/** Returns the local video for a Sanity image URL, or '' when there is none. */
export function heroVideoFor(imageUrl?: string | null): string {
  if (!imageUrl) return '';
  const hash = imageUrl.match(/\/([0-9a-f]{40})-/)?.[1];
  return (hash && HERO_VIDEOS[hash]) || '';
}

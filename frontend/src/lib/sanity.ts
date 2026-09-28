import { createClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

if (!projectId || !dataset) {
  throw new Error(
    'Missing Sanity config: set NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET ' +
      '(frontend/.env.local for local dev, Vercel > Settings > Environment Variables for deploys).'
  );
}

// Server-only, and deliberately without a literal fallback: this module is also
// imported by client components, so any default value would be inlined into the
// browser bundle and served publicly.
const isServer = typeof window === 'undefined';
const sanityToken = isServer
  ? process.env.SANITY_API_READ_TOKEN || process.env.SANITY_API_TOKEN
  : undefined;

if (isServer && !sanityToken) {
  throw new Error(
    'Missing Sanity read token: set SANITY_API_READ_TOKEN ' +
      '(frontend/.env.local for local dev, Vercel > Settings > Environment Variables for deploys).'
  );
}

export const sanityConfig = {
  projectId,
  dataset,
  hasReadToken: Boolean(sanityToken),
};

export const client = createClient({
  projectId: sanityConfig.projectId,
  dataset: sanityConfig.dataset,
  apiVersion: '2026-07-19',
  useCdn: true,
  token: sanityToken,
  perspective: 'published',
});

const builder = createImageUrlBuilder(client);

export function urlFor(source: any) {
  if (!source) return builder.image(source);
  const image = source.asset ? source : source.image?.asset ? source.image : null;
  return builder.image(image || source);
}

const DEFAULT_IMAGE_WIDTH = 1600;
const DEFAULT_IMAGE_QUALITY = 75;

// Sanity's `asset.url` is the untouched original. For this dataset that means
// camera-resolution files — several over 3MB, one 13MB — going straight into a
// CSS background-image. Always ask the CDN for a sized, re-encoded copy.
function withTransform(url: string): string {
  if (!url.includes('cdn.sanity.io') || url.includes('?')) return url;
  // `auto=format` on an animated GIF re-encodes to animated webp and can come
  // back several times larger than the original, so flatten those to one frame.
  const format = url.toLowerCase().endsWith('.gif') ? 'fm=webp&frame=1' : 'auto=format';
  return `${url}?w=${DEFAULT_IMAGE_WIDTH}&q=${DEFAULT_IMAGE_QUALITY}&${format}`;
}

/** A Sanity asset ref encodes the format, e.g. `image-abc123-1728x960-gif`. */
export function isGifSource(source: any): boolean {
  if (!source) return false;
  if (typeof source === 'string') return source.split('?')[0].toLowerCase().endsWith('.gif');
  const asset = source.asset ?? source;
  if (typeof asset?.extension === 'string') return asset.extension.toLowerCase() === 'gif';
  if (typeof asset?.url === 'string') return asset.url.split('?')[0].toLowerCase().endsWith('.gif');
  if (typeof asset?._ref === 'string') return asset._ref.toLowerCase().endsWith('-gif');
  return false;
}

/**
 * Sized builder that never asks for `auto=format` on a GIF — see withTransform.
 * Animated sources are flattened to their first frame.
 */
export function buildImageUrl(source: any, width = DEFAULT_IMAGE_WIDTH, quality = DEFAULT_IMAGE_QUALITY): string {
  try {
    const builder = urlFor(source).width(width).quality(quality);
    return (isGifSource(source) ? builder.format('webp').frame(1) : builder.auto('format')).url() || '';
  } catch (e) {
    return '';
  }
}

export function getImageUrl(source: any): string {
  if (!source) return '';
  if (typeof source === 'string') return withTransform(source);
  if (source.asset?.url) return withTransform(source.asset.url);
  if (source.url) return withTransform(source.url);
  return buildImageUrl(source);
}

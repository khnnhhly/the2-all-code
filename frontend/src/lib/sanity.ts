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
  useCdn: false,
  token: sanityToken,
  perspective: 'published',
});

const builder = createImageUrlBuilder(client);

export function urlFor(source: any) {
  if (!source) return builder.image(source);
  const image = source.asset ? source : source.image?.asset ? source.image : null;
  return builder.image(image || source);
}

export function getImageUrl(source: any): string {
  if (!source) return '';
  if (typeof source === 'string') return source;
  if (source.asset?.url) return source.asset.url;
  if (source.url) return source.url;
  try {
    return urlFor(source).url() || '';
  } catch (e) {
    return '';
  }
}

import { createClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';

const sanityToken = process.env.SANITY_API_READ_TOKEN || process.env.SANITY_API_TOKEN;

export const sanityConfig = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'quhr7leo',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
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

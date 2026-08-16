import { createClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';

export const client = createClient({
  projectId: 'quhr7leo',
  dataset: 'production',
  apiVersion: '2026-07-19',
  useCdn: false, // set to false for server revalidation or fresh data
  token: process.env.SANITY_API_READ_TOKEN || process.env.SANITY_API_TOKEN,
  perspective: (process.env.SANITY_API_READ_TOKEN || process.env.SANITY_API_TOKEN) ? 'previewDrafts' : 'published',
});

const builder = createImageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}

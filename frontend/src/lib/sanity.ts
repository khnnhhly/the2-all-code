import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: 'quhr7leo',
  dataset: 'production',
  apiVersion: '2026-07-19',
  useCdn: false, // set to false for server revalidation or fresh data
});

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}

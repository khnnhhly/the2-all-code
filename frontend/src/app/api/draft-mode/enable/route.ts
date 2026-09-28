import { createClient } from 'next-sanity';
import { defineEnableDraftMode } from 'next-sanity/draft-mode';
import { sanityConfig } from '../../../../lib/sanity';

/**
 * Entry point for Sanity's Presentation tool. It calls this route with a
 * one-time secret it stored in the dataset; next-sanity validates that secret
 * against the dataset before turning Next's draft mode on, so the route cannot
 * be used to read unpublished content without studio access.
 *
 * Built with next-sanity's own createClient rather than the site's shared
 * client: the two resolve different @sanity/client copies and their types are
 * not interchangeable.
 */
export const { GET } = defineEnableDraftMode({
  client: createClient({
    projectId: sanityConfig.projectId,
    dataset: sanityConfig.dataset,
    apiVersion: '2026-07-19',
    useCdn: false,
    token: process.env.SANITY_API_READ_TOKEN,
  }),
});

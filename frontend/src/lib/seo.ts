import type { Metadata } from 'next';
import { buildImageUrl } from './sanity';

type LocaleString = { en?: string; vi?: string } | string | null | undefined;

export type SeoDefaults = {
  title: string;
  description: string;
  path: string;
};

function plain(value: LocaleString): string {
  if (!value) return '';
  if (typeof value === 'string') return value.trim();
  return (value.en || value.vi || '').trim();
}

/**
 * Page metadata comes from Sanity when an editor has filled it in, and falls
 * back to the values below when they have not. The schema has carried
 * seoTitle/seoDescription/seoImage on every page type all along, but nothing
 * read them, so editing them changed nothing on the site.
 *
 * Both languages share one URL, so the English value is used — see the note in
 * the README about what a per-language URL would take.
 */
export function pageMetadata(doc: any, defaults: SeoDefaults): Metadata {
  const title = plain(doc?.seoTitle) || defaults.title;
  const description = plain(doc?.seoDescription) || defaults.description;
  const image = doc?.seoImage ? buildImageUrl(doc.seoImage, 1200, 80) : '';

  return {
    title,
    description,
    alternates: { canonical: defaults.path },
    openGraph: {
      title,
      description,
      url: defaults.path,
      type: 'website',
      ...(image ? { images: [{ url: image, width: 1200 }] } : {}),
    },
    ...(image ? { twitter: { card: 'summary_large_image', images: [image] } } : {}),
  };
}

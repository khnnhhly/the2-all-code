export const revalidate = 300;

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Works | The Two Planner',
  description: 'A portfolio of weddings and events planned by The Two Planner across Vietnam and beyond.',
  alternates: { canonical: '/works' },
  openGraph: {
    title: 'Our Works | The Two Planner',
    description: 'A portfolio of weddings and events planned by The Two Planner across Vietnam and beyond.',
    url: '/works',
    type: 'website',
  },
};


import App from '../../App';
import { getWorksData } from '../../lib/sanityFetch';

export default async function WorksRoute() {
  const sanityData = await getWorksData();

  if (!sanityData || !sanityData.works) {
    console.warn("WARNING: Sanity returned null/empty data for worksPage. Using local fallbackData instead.");
  }

  return (
    <App sanityData={sanityData} initialPage="showcase" />
  );
}

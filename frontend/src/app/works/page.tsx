import type { Metadata } from 'next';
export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  const data = await getWorksData();
  return pageMetadata(data?.works, {
    title: 'Our Works | The Two Planner',
    description: 'A portfolio of weddings and events planned by The Two Planner across Vietnam and beyond.',
    path: '/works',
  });
}


import { pageMetadata } from '../../lib/seo';
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

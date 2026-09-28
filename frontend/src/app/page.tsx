import type { Metadata } from 'next';
export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  const data = await getHomeData();
  return pageMetadata(data?.home, {
    title: 'The Two Planner | Premium Wedding & Event Planning',
    description: 'At The Two Planner, we believe every great wedding begins with two souls in love and two planners who truly care.',
    path: '/',
  });
}

import { pageMetadata } from '../lib/seo';
import App from '../App';
import { getHomeData } from '../lib/sanityFetch';

export default async function Home() {
  const sanityData = await getHomeData();

  if (!sanityData || !sanityData.home) {
    console.warn("WARNING: Sanity returned null/empty data for homePage. Using local fallbackData instead.");
  }

  return (
    <App sanityData={sanityData} initialPage="home" />
  );
}

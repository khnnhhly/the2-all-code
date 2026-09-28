import type { Metadata } from 'next';
export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  const data = await getAboutData();
  return pageMetadata(data?.about, {
    title: 'About Us | The Two Planner',
    description: 'Meet the planners behind The Two Planner — our mission, our team, and the couples we have walked beside.',
    path: '/about',
  });
}


import { pageMetadata } from '../../lib/seo';
import App from '../../App';
import { getAboutData } from '../../lib/sanityFetch';

export default async function AboutRoute() {
  const sanityData = await getAboutData();

  if (!sanityData || !sanityData.about) {
    console.warn("WARNING: Sanity returned null/empty data for aboutPage. Using local fallbackData instead.");
  }

  return (
    <App sanityData={sanityData} initialPage="about" />
  );
}

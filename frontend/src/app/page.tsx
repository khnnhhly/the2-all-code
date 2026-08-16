// Build trigger comment
export const dynamic = 'force-dynamic';
export const revalidate = 0;

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

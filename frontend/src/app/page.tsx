export const dynamic = 'force-dynamic';
export const revalidate = 0;

import App from '../App';
import { getSanityData } from '../lib/sanityFetch';

export default async function Home() {
  const sanityData = await getSanityData();

  console.log("=== SANITY DATA FETCH LOG ===");
  console.log(JSON.stringify(sanityData, null, 2));
  console.log("=============================");

  if (!sanityData || !sanityData.home) {
    console.warn("WARNING: Sanity returned null/empty data for homePage. Using local fallbackData instead.");
  }

  return (
    <App sanityData={sanityData} initialPage="home" />
  );
}

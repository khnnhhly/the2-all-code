export const dynamic = 'force-dynamic';
export const revalidate = 0;

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

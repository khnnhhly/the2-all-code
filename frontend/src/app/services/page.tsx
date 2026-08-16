export const dynamic = 'force-dynamic';
export const revalidate = 0;

import App from '../../App';
import { getSanityData } from '../../lib/sanityFetch';

export default async function ServicesRoute() {
  const sanityData = await getSanityData();

  if (!sanityData || !sanityData.services) {
    console.warn("WARNING: Sanity returned null/empty data for servicesPage. Using local fallbackData instead.");
  }

  return (
    <App sanityData={sanityData} initialPage="services" />
  );
}

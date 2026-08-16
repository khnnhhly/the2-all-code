export const dynamic = 'force-dynamic';
export const revalidate = 0;

import App from '../../App';
import { getServicesData } from '../../lib/sanityFetch';

export default async function ServicesRoute() {
  const sanityData = await getServicesData();

  if (!sanityData || !sanityData.services) {
    console.warn("WARNING: Sanity returned null/empty data for servicesPage. Using local fallbackData instead.");
  }

  return (
    <App sanityData={sanityData} initialPage="services" />
  );
}

import type { Metadata } from 'next';
export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  const data = await getServicesData();
  return pageMetadata(data?.services, {
    title: 'Wedding & Event Services | The Two Planner',
    description: 'Wedding planning, coordination, decoration and destination weddings, plus proposals and private celebrations.',
    path: '/services',
  });
}


import { pageMetadata } from '../../lib/seo';
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

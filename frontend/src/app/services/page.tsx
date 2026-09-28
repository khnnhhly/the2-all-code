export const revalidate = 300;

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Wedding & Event Services | The Two Planner',
  description: 'Wedding planning, coordination, decoration and destination weddings, plus proposals and private celebrations.',
  alternates: { canonical: '/services' },
  openGraph: {
    title: 'Wedding & Event Services | The Two Planner',
    description: 'Wedding planning, coordination, decoration and destination weddings, plus proposals and private celebrations.',
    url: '/services',
    type: 'website',
  },
};


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

export const revalidate = 300;

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact | The Two Planner',
  description: 'Tell us about your day. Share your story and we will come back to you with a tailored plan.',
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact | The Two Planner',
    description: 'Tell us about your day. Share your story and we will come back to you with a tailored plan.',
    url: '/contact',
    type: 'website',
  },
};


import App from '../../App';
import { getContactData } from '../../lib/sanityFetch';

export default async function ContactRoute() {
  const sanityData = await getContactData();

  if (!sanityData || !sanityData.contact) {
    console.warn("WARNING: Sanity returned null/empty data for contactPage. Using local fallbackData instead.");
  }

  return (
    <App sanityData={sanityData} initialPage="contact" />
  );
}

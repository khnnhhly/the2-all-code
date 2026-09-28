import type { Metadata } from 'next';
export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  const data = await getContactData();
  return pageMetadata(data?.contact, {
    title: 'Contact | The Two Planner',
    description: 'Tell us about your day. Share your story and we will come back to you with a tailored plan.',
    path: '/contact',
  });
}


import { pageMetadata } from '../../lib/seo';
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

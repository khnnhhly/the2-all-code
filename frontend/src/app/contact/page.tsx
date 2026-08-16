export const dynamic = 'force-dynamic';
export const revalidate = 0;

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

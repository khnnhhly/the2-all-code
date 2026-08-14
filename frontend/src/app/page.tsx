import { client } from '../lib/sanity';
import App from '../App';

async function getHeroData() {
  const query = `
    *[_type == "homePage" && _id == "site.home"][0] {
      heroSection {
        backgroundImage,
        overlayOpacity,
        smallSubheading,
        mainHeadline,
        description,
        ctaButtons
      }
    }
  `;
  try {
    const data = await client.fetch(query);
    return data?.heroSection || null;
  } catch (error) {
    console.error("Error fetching homepage data from Sanity:", error);
    return null;
  }
}

export default async function Home() {
  const heroData = await getHeroData();

  return (
    <App heroData={heroData} />
  );
}

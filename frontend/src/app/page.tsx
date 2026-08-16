export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { client } from '../lib/sanity';
import App from '../App';

async function getSanityData() {
  const query = `{
    "settings": *[_type == "siteSettings"] | order(_id == "site.settings" desc, _updatedAt desc)[0] {
      ...,
      logo { asset-> },
      footerBrandLogo { asset-> },
      headerNavigation[] {
        ...,
        label { en, vi },
      },
      exploreLinks[] {
        ...,
        label { en, vi },
      },
      servicesLinks[] {
        ...,
        label { en, vi },
      },
      copyright { en, vi },
      seoTitle { en, vi },
      seoDescription { en, vi },
      seoImage { asset-> }
    },
    "home": *[_type in ["homePage", "page"] && (_id == "site.home" || _id == "drafts.site.home" || slug.current == "home" || title match "Home*")] | order(_id == "site.home" desc, _updatedAt desc)[0] {
      ...,
      heroSection {
        ...,
        backgroundImage { asset->, alt { en, vi } },
        smallSubheading { en, vi },
        mainHeadline { en, vi },
        description { en, vi },
        ctaButtons[] {
          ...,
          label { en, vi }
        }
      },
      letterSection {
        ...,
        scriptTitle { en, vi },
        subheading { en, vi },
        paragraphs[] {
          ...,
          paragraphText { en, vi }
        },
        closingSignOff { en, vi }
      },
      weddingServicesSection {
        ...,
        mainHeader { en, vi },
        categoryLabel { en, vi },
        servicesList[] {
          ...,
          title { en, vi },
          shortDescription { en, vi },
          bgImage { asset->, alt { en, vi } },
          scopeItems[] { en, vi }
        }
      },
      eventServicesSection {
        ...,
        headerTitle { en, vi },
        eventItems[] {
          ...,
          title { en, vi },
          description { en, vi }
        }
      },
      statsAndPartnersSection {
        ...,
        partnerHeader { en, vi },
        stats[] {
          ...,
          label { en, vi }
        },
        partnerLogos[] { asset->, alt { en, vi } }
      },
      showcaseSection {
        ...,
        categoryTag { en, vi },
        mainTitle { en, vi },
        instructionText { en, vi },
        gallery[] { asset->, alt { en, vi } },
        ctaButton {
          ...,
          label { en, vi }
        }
      },
      testimonialVideoSection {
        ...,
        quoteTitle { en, vi },
        coupleDetails { en, vi },
        coverImage { asset->, alt { en, vi } }
      },
      preFooterCtaSection {
        ...,
        backgroundImage { asset->, alt { en, vi } },
        bannerHeadline { en, vi },
        bannerSubtext { en, vi },
        ctaButtonText { en, vi }
      }
    },
    "about": *[_type in ["aboutPage", "page"] && (_id in ["site.about", "drafts.site.about"] || slug.current == "about" || title match "About*")] | order(_id == "site.about" desc, _updatedAt desc)[0] {
      ...,
      heroSection {
        ...,
        backgroundImage { asset->, alt { en, vi } },
        headline { en, vi },
        subheading { en, vi }
      },
      missionVisionSection {
        ...,
        mission {
          ...,
          title { en, vi },
          content { en, vi }
        },
        vision {
          ...,
          title { en, vi },
          content { en, vi }
        }
      },
      testimonialsSection {
        ...,
        categoryTag { en, vi },
        mainHeadline { en, vi },
        testimonialCards[]-> {
          ...,
          cardImage { asset-> },
          heroImage { asset-> },
          gallery[] { asset-> }
        }
      },
      teamSection {
        ...,
        categoryTag { en, vi },
        mainHeadline { en, vi },
        members[] {
          ...,
          role { en, vi },
          portrait { asset->, alt { en, vi } },
          stats { en, vi },
          strengths { en, vi },
          bio1 { en, vi },
          bio2 { en, vi },
          bio3 { en, vi },
          quote { en, vi }
        }
      },
      preFooterCtaSection {
        ...,
        backgroundImage { asset->, alt { en, vi } },
        headline { en, vi },
        ctaButton {
          ...,
          label { en, vi }
        }
      }
    },
    "services": *[_type in ["servicesPage", "page"] && (_id == "site.services" || slug.current == "services" || title match "Services*")] | order(_id == "site.services" desc, _updatedAt desc)[0] {
      ...,
      heroSection {
        ...,
        heroImage { asset->, alt { en, vi } },
        headline { en, vi },
        subheading { en, vi }
      },
      weddingCarouselSection {
        ...,
        sectionCategory { en, vi },
        sectionHeadline { en, vi },
        weddingServices[]-> {
          ...,
          title { en, vi },
          shortDescription { en, vi },
          cardImage { asset-> },
          modalDetails {
            ...,
            tagline { en, vi },
            fullDescription { en, vi },
            whoThisIsFor[] { en, vi },
            scopeOfWork[] { en, vi },
            benefits[] { en, vi }
          }
        }
      },
      eventCarouselSection {
        ...,
        sectionCategory { en, vi },
        sectionHeadline { en, vi },
        eventServices[]-> {
          ...,
          title { en, vi },
          shortDescription { en, vi },
          cardImage { asset-> },
          modalDetails {
            ...,
            tagline { en, vi },
            fullDescription { en, vi },
            whoThisIsFor[] { en, vi },
            scopeOfWork[] { en, vi },
            benefits[] { en, vi }
          }
        }
      },
      faqSection {
        ...,
        categoryTag { en, vi },
        mainHeadline { en, vi },
        subheading { en, vi },
        weddingFaqs[] {
          ...,
          question { en, vi },
          answer { en, vi }
        },
        eventFaqs[] {
          ...,
          question { en, vi },
          answer { en, vi }
        }
      },
      preFooterCtaSection {
        ...,
        backgroundImage { asset->, alt { en, vi } },
        headline { en, vi },
        ctaButton {
          ...,
          label { en, vi }
        }
      }
    },
    "works": *[_type in ["worksPage", "page"] && (_id == "site.works" || slug.current == "works" || title match "Works*")] | order(_id == "site.works" desc, _updatedAt desc)[0] {
      ...,
      heroSection {
        ...,
        heroImage { asset->, alt { en, vi } },
        headline { en, vi },
        subheading { en, vi },
        regions[] {
          ...,
          regionName { en, vi },
          venues[] { en, vi }
        }
      },
      portfolioSection {
        ...,
        featuredProjects[]-> {
          ...,
          thumbnailImage { asset-> },
          heroDetailImage { asset-> },
          galleryImages[] { asset-> },
          serviceType { en, vi },
          summaryQuote { en, vi },
          highlightFeedback { en, vi },
          closingThought { en, vi },
          ctaText { en, vi }
        }
      },
      preFooterCtaSection {
        ...,
        backgroundImage { asset->, alt { en, vi } },
        headline { en, vi },
        ctaButton {
          ...,
          label { en, vi }
        }
      }
    },
    "contact": *[_type in ["contactPage", "page"] && (_id == "site.contact" || slug.current == "contact" || title match "Contact*")] | order(_id == "site.contact" desc, _updatedAt desc)[0] {
      ...,
      heroSection {
        ...,
        heroImage { asset->, alt { en, vi } },
        title { en, vi },
        subtitle { en, vi },
        tagline { en, vi }
      },
      formConfig {
        ...,
        formGreetingTitle { en, vi },
        formGreetingText { en, vi },
        eventTypeOptions[] { en, vi },
        formFields {
          ...,
          fullNameLabel { en, vi },
          partnerNameLabel { en, vi },
          emailLabel { en, vi },
          phoneLabel { en, vi },
          eventDateLabel { en, vi },
          eventDatePlaceholder { en, vi },
          guestCountLabel { en, vi },
          guestCountPlaceholder { en, vi },
          locationLabel { en, vi },
          budgetLabel { en, vi },
          budgetPlaceholder { en, vi },
          referralLabel { en, vi },
          storyLabel { en, vi },
          storyPlaceholder { en, vi }
        },
        responseNotice { en, vi },
        submitButtonLabel { en, vi }
      },
      bottomBanner {
        ...,
        bgImage { asset->, alt { en, vi } },
        headline { en, vi },
        subtext { en, vi }
      }
    },
    "testimonials": *[_type == "testimonial"] {
      ...,
      cardImage { asset-> },
      heroImage { asset-> },
      gallery[] { asset-> }
    },
    "projects": *[_type == "projectItem"] {
      ...,
      thumbnailImage { asset-> },
      heroDetailImage { asset-> },
      galleryImages[] { asset-> },
      serviceType { en, vi },
      summaryQuote { en, vi },
      highlightFeedback { en, vi },
      closingThought { en, vi },
      ctaText { en, vi }
    }
  }`;

  try {
    const data = await client.fetch(query);
    return data;
  } catch (error) {
    console.error("Error fetching data from Sanity:", error);
    return null;
  }
}

export default async function Home() {
  const sanityData = await getSanityData();

  console.log("=== SANITY DATA FETCH LOG ===");
  console.log(JSON.stringify(sanityData, null, 2));
  console.log("=============================");

  if (!sanityData || !sanityData.home || !sanityData.settings) {
    return (
      <div style={{
        padding: '80px 24px',
        textAlign: 'center',
        color: '#d9534f',
        backgroundColor: '#f9f9f9',
        border: '1px solid #d9534f',
        borderRadius: '6px',
        maxWidth: '800px',
        margin: '60px auto',
        fontFamily: 'monospace',
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
      }}>
        <h1 style={{ fontSize: '1.8rem', marginBottom: '16px' }}>LỖI FETCH SANITY</h1>
        <p style={{ fontSize: '1rem', color: '#333', lineHeight: 1.6 }}>
          Không thể kết nối hoặc không tìm thấy dữ liệu trang chủ (`site.home`) hoặc cài đặt chung (`site.settings`) trong Sanity Studio.
        </p>
        <div style={{ marginTop: '24px', textAlign: 'left', backgroundColor: '#eaeaea', padding: '16px', borderRadius: '4px', overflowX: 'auto' }}>
          <strong>Dữ liệu trả về từ Sanity:</strong>
          <pre style={{ fontSize: '0.82rem', marginTop: '8px', color: '#555' }}>
            {JSON.stringify(sanityData, null, 2)}
          </pre>
        </div>
      </div>
    );
  }

  return (
    <App sanityData={sanityData} />
  );
}

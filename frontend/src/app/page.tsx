import { client } from '../lib/sanity';
import App from '../App';

async function getSanityData() {
  const query = `{
    "settings": *[_type == "siteSettings" && _id == "site.settings"][0] {
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
    "home": *[_type == "homePage" && _id == "site.home"][0] {
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
    "about": *[_type == "aboutPage" && _id in ["site.about", "drafts.site.about"]] | order(_id desc)[0] {
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
    "services": *[_type == "servicesPage" && _id == "site.services"][0] {
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
    "works": *[_type == "worksPage" && _id == "site.works"][0] {
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
    "contact": *[_type == "contactPage" && _id == "site.contact"][0] {
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

  return (
    <App sanityData={sanityData} />
  );
}

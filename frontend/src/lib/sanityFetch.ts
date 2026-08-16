import { client } from './sanity';

const settingsFields = `
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
`;

export async function getHomeData() {
  const query = `{
    "settings": *[_type in ["siteSettings", "settings"] && (_id in ["site.settings", "drafts.site.settings", "settings"])] | order((_id == "site.settings") desc, _updatedAt desc)[0] {
      ...,
      ${settingsFields}
    },
    "home": *[(_type in ["homePage", "page", "home"] || _id in ["site.home", "drafts.site.home", "home"]) && (_id in ["site.home", "drafts.site.home", "home"] || slug.current == "home" || title match "*Home*" || title match "*Trang chủ*")] | order((_id == "site.home") desc, _updatedAt desc)[0] {
      ...,
      heroSection {
        ...,
        backgroundImage { asset->, alt { en, vi } },
        smallSubheading { en, vi },
        mainHeadline { en, vi },
        description { en, vi },
        ctaButtons[] { ..., label { en, vi } }
      },
      letterSection {
        ...,
        scriptTitle { en, vi },
        subheading { en, vi },
        paragraphs[] { ..., paragraphText { en, vi } },
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
        eventItems[] { ..., title { en, vi }, description { en, vi } }
      },
      statsAndPartnersSection {
        ...,
        partnerHeader { en, vi },
        stats[] { ..., label { en, vi } },
        partnerLogos[] { asset->, alt { en, vi } }
      },
      showcaseSection {
        ...,
        categoryTag { en, vi },
        mainTitle { en, vi },
        instructionText { en, vi },
        gallery[] { asset->, alt { en, vi } },
        ctaButton { ..., label { en, vi } }
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
    return await client.fetch(query);
  } catch (err) {
    console.warn("Error fetching home data:", err);
    return null;
  }
}

export async function getAboutData() {
  const query = `{
    "settings": *[_type in ["siteSettings", "settings"] && (_id in ["site.settings", "drafts.site.settings", "settings"])] | order((_id == "site.settings") desc, _updatedAt desc)[0] {
      ...,
      ${settingsFields}
    },
    "about": *[(_type in ["aboutPage", "page", "about"] || _id in ["site.about", "drafts.site.about", "about"]) && (_id in ["site.about", "drafts.site.about", "about"] || slug.current == "about" || title match "*About*" || title match "*Giới thiệu*")] | order((_id == "site.about") desc, _updatedAt desc)[0] {
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
    }
  }`;
  try {
    return await client.fetch(query);
  } catch (err) {
    console.warn("Error fetching about data:", err);
    return null;
  }
}

export async function getServicesData() {
  const query = `{
    "settings": *[_type in ["siteSettings", "settings"] && (_id in ["site.settings", "drafts.site.settings", "settings"])] | order((_id == "site.settings") desc, _updatedAt desc)[0] {
      ...,
      ${settingsFields}
    },
    "services": *[(_type in ["servicesPage", "page", "services"] || _id in ["site.services", "drafts.site.services", "services"]) && (_id in ["site.services", "drafts.site.services", "services"] || slug.current == "services" || title match "*Service*" || title match "*Dịch vụ*")] | order((_id == "site.services") desc, _updatedAt desc)[0] {
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
    }
  }`;
  try {
    return await client.fetch(query);
  } catch (err) {
    console.warn("Error fetching services data:", err);
    return null;
  }
}

export async function getWorksData() {
  const query = `{
    "settings": *[_type in ["siteSettings", "settings"] && (_id in ["site.settings", "drafts.site.settings", "settings"])] | order((_id == "site.settings") desc, _updatedAt desc)[0] {
      ...,
      ${settingsFields}
    },
    "works": *[(_type in ["worksPage", "page", "works"] || _id in ["site.works", "drafts.site.works", "works"]) && (_id in ["site.works", "drafts.site.works", "works"] || slug.current == "works" || slug.current == "our-works" || title match "*Work*" || title match "*Dự án*")] | order((_id == "site.works") desc, _updatedAt desc)[0] {
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
    return await client.fetch(query);
  } catch (err) {
    console.warn("Error fetching works data:", err);
    return null;
  }
}

export async function getContactData() {
  const query = `{
    "settings": *[_type in ["siteSettings", "settings"] && (_id in ["site.settings", "drafts.site.settings", "settings"])] | order((_id == "site.settings") desc, _updatedAt desc)[0] {
      ...,
      ${settingsFields}
    },
    "contact": *[(_type in ["contactPage", "page", "contact"] || _id in ["site.contact", "drafts.site.contact", "contact"]) && (_id in ["site.contact", "drafts.site.contact", "contact"] || slug.current == "contact" || title match "*Contact*" || title match "*Liên hệ*")] | order((_id == "site.contact") desc, _updatedAt desc)[0] {
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
    }
  }`;
  try {
    return await client.fetch(query);
  } catch (err) {
    console.warn("Error fetching contact data:", err);
    return null;
  }
}
